import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const outputDirectory = path.resolve('dist')

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath]
    }),
  )

  return files.flat()
}

const files = (await listFiles(outputDirectory)).filter(
  (file) => path.basename(file) !== 'sw.js',
)
const relativeFiles = files.map((file) =>
  path.relative(outputDirectory, file).replaceAll(path.sep, '/'),
)
const fingerprint = createHash('sha256')

for (const file of files) {
  fingerprint.update(await readFile(file))
}

const cacheName = `framecheck-${fingerprint.digest('hex').slice(0, 12)}`
const precache = ['./', ...relativeFiles.map((file) => `./${file}`)]
const serviceWorker = `const CACHE_NAME = ${JSON.stringify(cacheName)}
const PRECACHE = ${JSON.stringify(precache, null, 2)}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return

  if (event.request.cache === 'no-store') {
    event.respondWith(fetch(event.request))
    return
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')))
    return
  }

  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ??
        fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          }
          return response
        }),
    ),
  )
})
`

await writeFile(path.join(outputDirectory, 'sw.js'), serviceWorker, 'utf8')
console.log(
  `Generated offline worker ${cacheName} with ${precache.length} files`,
)

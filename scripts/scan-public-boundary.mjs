import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('.')
const ignoredDirectories = new Set(['.git', 'dist', 'node_modules', 'coverage'])
const forbiddenDependencyNames = [
  ['fire', 'base'].join(''),
  ['fire', 'base-admin'].join(''),
  ['fire', 'base-functions'].join(''),
  ['stripe'].join(''),
]
const riskyFileName =
  /(^|\/)(\.env($|\.)|\.dev\.vars($|\.)|[^/]*(secret|credential|service-account)[^/]*|[^/]+\.(pem|key|p12))$/i
const riskyText = [
  new RegExp(['AI', 'za[0-9A-Za-z_-]{20,}'].join(''), 'g'),
  new RegExp(
    ['-----BEGIN ', '(RSA |EC |OPENSSH )?', 'PRIVATE KEY-----'].join(''),
    'g',
  ),
  /\b100\.(?:\d{1,3}\.){2}\d{1,3}\b/g,
  /[A-Z]:\\Users\\[^\\\s]+/g,
]

const files = await listFiles(root)
const findings = []
for (const file of files) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/')
  if (riskyFileName.test(relative))
    findings.push(`Risky file name: ${relative}`)
  if (isBinary(relative)) continue
  const content = await readFile(file, 'utf8')
  for (const pattern of riskyText) {
    pattern.lastIndex = 0
    if (pattern.test(content)) findings.push(`Risky text pattern: ${relative}`)
  }
}

const lock = JSON.parse(
  await readFile(path.join(root, 'package-lock.json'), 'utf8'),
)
for (const dependencyName of Object.keys(lock.packages ?? {})) {
  if (
    forbiddenDependencyNames.some(
      (forbidden) =>
        dependencyName === `node_modules/${forbidden}` ||
        dependencyName.startsWith(`node_modules/${forbidden}/`),
    )
  ) {
    findings.push(`Excluded dependency: ${dependencyName}`)
  }
}

if (findings.length) {
  throw new Error(`Public-boundary scan failed:\n${findings.join('\n')}`)
}
console.log(
  `Public-boundary scan passed across ${files.length} repository files`,
)

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries
      .filter((entry) => !ignoredDirectories.has(entry.name))
      .map(async (entry) => {
        const entryPath = path.join(directory, entry.name)
        return entry.isDirectory() ? listFiles(entryPath) : [entryPath]
      }),
  )
  return nested.flat()
}

function isBinary(file) {
  return /\.(png|jpg|jpeg|gif|webp|woff2?|ico)$/i.test(file)
}

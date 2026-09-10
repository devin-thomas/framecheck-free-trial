# FrameCheck

FrameCheck is a browser-local fighting-game assessment prototype and polished vertical slice by Devin Thomas.

**Live demo:** [framecheck.devthomas.site](https://framecheck.devthomas.site)

## What it demonstrates

- A complete assessment loop: choose a trial, answer questions, recover progress, submit, score, and review rationales.
- Eleven focused 10-question trials and two randomized 30-question mixed trials drawn without replacement from a validated 164-question catalog.
- Responsive, keyboard-accessible interaction with install, offline, update, and reduced-motion behavior.
- Explicit public boundaries: no account, backend, analytics, payment flow, privileged route, or personal-data collection.

Progress and results stay in the learner's browser. The typed question catalog includes source references, review dates, and demo-rights status, and generates the downloadable question bank at `public/questions-and-answers.md`.

## Architecture

FrameCheck uses React, TypeScript, Vite, and a generated service worker. Session parsing and scoring are isolated from the UI, damaged browser storage fails visibly and resets safely, and the production build is deployed as a Cloudflare static-assets Worker.

## Development

Requires Node.js 24 and npm 11.

```bash
npm ci
npm run dev
```

Run the complete local quality gate with:

```bash
npm run verify
```

The gate covers formatting, linting, type safety, unit/component tests, question-export synchronization, the public-boundary scan, and the production build.

## Public boundary

`npm run scan:public` rejects private keys, likely credential files, local Windows user paths, private-network addresses, and excluded backend/payment dependencies. See `SECURITY.md` for vulnerability reporting and `THIRD_PARTY_NOTICES.md` for attribution.

Unofficial demonstration content. No affiliation with or endorsement by any game publisher.

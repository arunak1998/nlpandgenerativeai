// Inserts the server-rendered HTML into dist/index.html so crawlers (NotebookLM, search engines) can read the content.
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
const pagePath = resolve('dist/index.html')
const page = readFileSync(pagePath, 'utf8')

writeFileSync(pagePath, page.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
console.log('Pre-rendered dist/index.html')

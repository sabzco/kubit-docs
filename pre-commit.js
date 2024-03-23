import notifier from 'node-notifier'
import {readFile, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import * as path from 'path'
import prettier from 'prettier'

// noinspection JSUnusedGlobalSymbols
export default async function preCommit(files) {
  await prettyFiles(files)
}

async function prettyFiles(files) {
  if (!files.length) return console.info('No file to be checked by Prettier.')

  console.group('>> Checking if files are pretty:')
  const results = await Promise.all(
    files.map(async (file) => {
      const {ignored, inferredParser: parser} = await prettier.getFileInfo(file, {
        ignorePath: '.prettierignore', // "getFileInfo() use .prettierignore as default": https://github.com/prettier/prettier/issues/13518
        resolveConfig: false,
      })
      if (ignored || !parser) return {ignored: true}
      const configPromise = prettier.resolveConfig(file)
      const fullFilePath = resolve(file)
      const source = await readFile(file, 'utf-8')
      const formatted = await prettier.format(source, {...(await configPromise), parser})
      if (formatted === source) {
        console.info('✅', fullFilePath)
        return true
      }
      console.error('❌', fullFilePath)
      await writeFile(file, formatted)
      console.info('🔧', fullFilePath)
      return false
    }),
  )
  console.groupEnd()
  if (results.filter((wasPretty) => !wasPretty).length) {
    const title = 'Pre-commit checks failed.'
    const message = `Some files weren't well-formatted.\nWe formatted them for you.\nYou should "amend commit" them yourself.`
    console.info(title)
    console.info(message)
    notifier.notify({
      title: title,
      message: message,
      appID: 'pre-commit.js',
      icon: 'git.svg',
    })
  }
}

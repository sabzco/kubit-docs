import notifier from 'node-notifier'
import {exec as legacyExec} from 'node:child_process'
import {readFile, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {setTimeout} from 'node:timers/promises'
import {promisify} from 'node:util'
import prettier from 'prettier'

const exec = promisify(legacyExec)

console.info(process.cwd())

const {stdout, stderr} = await exec(
  'git diff-tree -r --name-only --diff-filter=ACMRTUXB --no-commit-id HEAD', // https://stackoverflow.com/a/78214581/5318303
)
if (stderr) console.error(stderr)

const trimmedOutput = stdout.trimEnd()
const files = trimmedOutput ? trimmedOutput.split('\n') : [] // Avoid `['']`

if (!files.length) {
  console.info('No new/modified file to commit.')
  process.exit()
}

const NOTIFIER_APP_ID = 'Commit on kubit-docs'

await prettyFiles(files)

async function prettyFiles(files: string[]) {
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

  if (!results.filter((wasPretty) => !wasPretty).length) {
    console.info('\n')
    const title = 'Post-commit checks ✅\xA0\xA0'
    console.info(title)
    notifier.notify({
      title,
      message: 'Prettier 👌',
      appID: NOTIFIER_APP_ID,
      icon: './.husky/git.svg',
    })
  }

  const title = 'Post-commit checks failed.'
  const message = `Some files weren't well-formatted.\nWe formatted them for you.\nYou should "amend commit" them yourself.`
  console.info('\n', title)
  console.info(message)
  notifier.notify({
    title: title,
    message: message,
    appID: NOTIFIER_APP_ID,
    icon: './.husky/git.svg',
  })
}

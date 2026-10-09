import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import * as OpenCC from 'opencc-js'

import {
  ZH_TW_CONTEXT_RULES,
  ZH_TW_KEY_OVERRIDES,
  ZH_TW_TERM_OVERRIDES
} from './locale-zh-tw-overrides.mjs'

// Why: zh-TW is derived from the maintained Simplified catalog instead of being
// translated separately, so every upstream zh.json update reaches Taiwan users
// by rerunning `pnpm run sync:localization-zh-tw`.
const LOCALES_DIR = path.join('src', 'renderer', 'src', 'i18n', 'locales')
const SOURCE_FILE = 'zh.json'
const ENGLISH_FILE = 'en.json'
const TARGET_FILE = 'zh-TW.json'

// `twp` = Taiwan standard characters plus Taiwan phrasing (软件→軟體, 默认→預設).
const convertToTaiwan = OpenCC.Converter({ from: 'cn', to: 'twp' })

export function convertZhTwValue(value, englishValue = '') {
  let converted = convertToTaiwan(value)
  for (const [from, to] of ZH_TW_TERM_OVERRIDES) {
    converted = converted.split(from).join(to)
  }
  for (const rule of ZH_TW_CONTEXT_RULES) {
    if (rule.english.test(englishValue) && !rule.unlessEnglish?.test(englishValue)) {
      converted = converted.split(rule.from).join(rule.to)
    }
  }
  return converted
}

export function buildZhTwCatalog(
  source,
  english = {},
  keyOverrides = ZH_TW_KEY_OVERRIDES,
  prefix = ''
) {
  const result = {}
  for (const [key, value] of Object.entries(source)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const englishValue = english?.[key]
    if (value !== null && typeof value === 'object') {
      result[key] = buildZhTwCatalog(value, englishValue, keyOverrides, fullKey)
    } else if (typeof value === 'string') {
      result[key] = Object.hasOwn(keyOverrides, fullKey)
        ? keyOverrides[fullKey]
        : convertZhTwValue(value, typeof englishValue === 'string' ? englishValue : '')
    } else {
      result[key] = value
    }
  }
  return result
}

export async function main(root = process.cwd(), argv = process.argv.slice(2)) {
  const check = argv.includes('--check')
  const localesDir = path.join(root, LOCALES_DIR)
  const targetPath = path.join(localesDir, TARGET_FILE)
  const sourceText = await fs.readFile(path.join(localesDir, SOURCE_FILE), 'utf8')
  const english = JSON.parse(await fs.readFile(path.join(localesDir, ENGLISH_FILE), 'utf8'))
  const catalog = buildZhTwCatalog(JSON.parse(sourceText), english)
  const generated = `${JSON.stringify(catalog, null, 2)}\n`

  if (check) {
    const existing = await fs.readFile(targetPath, 'utf8').catch(() => '')
    // Why: compare without line endings so Windows autocrlf checkouts still pass.
    if (existing.replace(/\r\n/g, '\n') !== generated) {
      console.error(
        `${TARGET_FILE} is out of date with ${SOURCE_FILE}. Run \`pnpm run sync:localization-zh-tw\`.`
      )
      return 1
    }
    console.log(`Verified ${TARGET_FILE} matches ${SOURCE_FILE}.`)
    return 0
  }

  const eol = sourceText.includes('\r\n') ? '\r\n' : '\n'
  await fs.writeFile(targetPath, generated.replace(/\n/g, eol))
  console.log(`Generated ${TARGET_FILE} from ${SOURCE_FILE}.`)
  return 0
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(await main())
}

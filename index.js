import * as Sentry from '@sentry/node'

import { loadConfig } from './config'
import { validToken } from './util'

import leetbot from './leetbot'

const version = '<version_number>'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://4f836faef7194e01aab78b7c1dcf37d8:dd43773e5b10458ead71162febb9cad9@sentry.marvelous.systems/3',
    release: `telegram-bots@${version}`
  })
  console.log('Production environment detected, Sentry connection established.')
} else {
  console.log('Development environment detected.')
}
console.log(`Running version ${version}`)

const config = loadConfig()

const registeredBots = [
  {
    name: 'leetbot',
    bot: leetbot
  }
  // Uncomment this and import the examplebot to see it in action.
  // {
  //  name: 'examplebot',
  //  bot: examplebot
  // }
]

for (const bot of registeredBots) {
  const botConfig = config[bot.name]
  if (validToken(botConfig.token)) {
    console.log(`Valid token found for ${bot.name}. Starting...`)
    bot.bot(
      botConfig.token,
      {
        ...botConfig.config,
        version
      },
      {
        username: botConfig.username
      },
      version
    )
  } else {
    console.error(`No valid token provided for ${bot.name}. It will not start!`)
  }
}

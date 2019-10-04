const { dirname } = require("path");
const { writeFileSync, readFileSync, existsSync, mkdirSync } = require("fs");

const { createStore } = require("redux");
const { migrations } = require("@yeldirium/redux-migrations");
const moment = require("moment-timezone");
const scheduler = require("node-schedule");
const Telegraf = require("telegraf");

const { countDown, dailyReporter, reminder, reOrUnpin } = require("./leet");
const { crashHandler, translationMiddleware } = require("../util/telegram");
const {
  enableCommand,
  debugCommand,
  disableCommand,
  getUserScoreCommand,
  infoCommand,
  resetCommand,
  setLanguageCommand,
  startCommand,
  watchLeetCommand
} = require("./commands");
const { getters } = require("./store/getters");
const { helpCommand } = require("./commands/help");
const i18n = require("./i18n");
const migrationDefinitions = require("./migrations");
const { leetBot: rootReducer } = require("./store/reducer");

const { enabledChats, languageOrDefault } = getters;

/**
 * Load a startup state = require(a dump file, if it exists.)
 * Otherwise return undefined.
 *
 * @param String fileName
 * @return {*} state
 */
const loadState = dumpFile => {
  if (existsSync(dumpFile)) {
    console.info(`loading state from ${dumpFile}`);
    return JSON.parse(readFileSync(dumpFile));
  }
  console.info(`${dumpFile} doesn't exist; starting with empty state`);
  return undefined;
};

/**
 * Dump a given state object into a dump file.
 * @param String dumpFile
 * @param {*} state
 */
const dumpState = (dumpFile, state) => {
  mkdirSync(dirname(dumpFile), { recursive: true });
  writeFileSync(dumpFile, JSON.stringify(state), { flag: "w+" });
};

/**
 * Creates a redux store, optionally hydrating = require(a dumpfile and running)
 * migrations.
 * @param {Function} rootReducer
 * @param {String} dumpFile Path to dumpFile.
 */
const createStoreFromState = (rootReducer, dumpFile) => {
  const previousState = loadState(dumpFile);
  try {
    const store = createStore(
      rootReducer,
      previousState,
      migrations(migrationDefinitions)
    );
    return store;
  } catch (error) {
    return createStore(rootReducer);
  }
};

const scheduleJobs = ({
  bot,
  store,
  i18n,
  config: { dumpCron, dumpFile, leetHours, leetMinutes }
}) => {
  scheduler.scheduleJob(dumpCron, () => {
    console.log("dumping state");
    dumpState(dumpFile, store.getState());
  });
  scheduler.scheduleJob(`${leetMinutes - 1} ${leetHours} * * *`, async () => {
    const chats = await reminder(bot, store, i18n);
    console.log("reminding chats resulted in following pins/repins:", chats);
    scheduler.scheduleJob(
      moment()
        .seconds(0)
        .minutes(leetMinutes + 1)
        .toDate(),
      () => reOrUnpin(bot, chats)
    );
  });
  scheduler.scheduleJob(`57 ${leetMinutes - 1} ${leetHours} * * *`, () => {
    countDown(bot, store);
  });
  scheduler.scheduleJob(`${leetMinutes + 1} ${leetHours} * * *`, () => {
    dailyReporter(bot, store, i18n);
  });
};

module.exports = (token, config, telegramOptions) => {
  // Set up the bot and its store and i18n.
  const bot = new Telegraf(token, telegramOptions);
  const store = createStoreFromState(rootReducer, config.dumpFile);

  // Register telegram bot middlewares.
  const commandParams = { bot, store, i18n, config };

  // Schedule all constant bot-initiated workflows.
  scheduleJobs(commandParams);

  bot.use(crashHandler);
  bot.use(translationMiddleware({ store, i18n }));
  bot.start(startCommand(commandParams));
  bot.help(helpCommand(commandParams));
  bot.command("enable", enableCommand(commandParams));
  bot.command("disable", disableCommand(commandParams));
  bot.command("info", infoCommand(commandParams));
  bot.command("setLanguage", setLanguageCommand(commandParams));
  bot.command("debug", debugCommand(commandParams));
  bot.command("reset", resetCommand(commandParams));
  bot.command("score", getUserScoreCommand(commandParams));
  bot.hears(/.*/, watchLeetCommand(commandParams));

  // Start the bot.
  bot.startPolling();

  // Notify the admin about the start.
  enabledChats(store).forEach(chatId => {
    const lng = languageOrDefault(chatId, store);
    bot.telegram.sendMessage(
      chatId,
      i18n.t("deployed", { version: config.version, lng })
    );
  });
  if (config.admin) {
    bot.telegram.sendMessage(
      config.admin,
      i18n.t("deployed", { version: config.version })
    );
  }
};
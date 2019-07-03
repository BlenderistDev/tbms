// Фикс для библиотеки node-telegram-bot-api
process.env.NTBA_FIX_319 = true;
const path = require('path');
const Telegram = require('node-telegram-bot-api');
const BotModulesManager = require(path.join(global.ROOT_DIR, 'BotModulesManager', 'BotModulesManager'));

/**
 * Класс отвечает за работу с ботом телеграма
 */
class TelegramBot {
  /**
   * @param {object} oBotConfig
   * конструктор создает и настраивает бота
   */
  constructor(oBotConfig) {
    let oBot = new Telegram(oBotConfig.token, oBotConfig);
    oBot.startPolling();
    oBot.id = oBotConfig.id;
    oBot = BotModulesManager.addModules(oBot);
  }
}

module.exports = TelegramBot;

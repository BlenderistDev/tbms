// Фикс для библиотеки node-telegram-bot-api
process.env.NTBA_FIX_319 = true;
const Telegram = require('node-telegram-bot-api');
const BotModulesManager = require(ROOT_DIR+
  '/BotModulesManager/BotModulesManager.js');


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
    // oBot.sendMessage('133773580', 'azaza');

    // oBot.on('message', (msg) => {
    //   const chatId = msg.chat.id;
    //   oBot.sendMessage(chatId, 'Received your message');
    //   console.log(msg);
    // });
  }
}

module.exports = TelegramBot;

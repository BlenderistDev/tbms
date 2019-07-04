const path = require('path');
const BotTable = require('./model/bots');
const BotConfigurator = require(path.join(global.ROOT_DIR, 'Components', 'BotConfigurator', 'BotConfigurator'));

/**
 * Класс для работы со списком ботов
 */
class BotManager {
  /**
   * @return {promise}
   * возвращает список ботов с полной конфигурацией
   */
  getBots() {
    const pBots = BotTable.getTable()
      .then((oBotTableList) => {
        const aPromiseList = [];
        oBotTableList.forEach((oBot) => {
          aPromiseList.push(this.getBotConfig(oBot));
        });
        const pBotList = Promise.all(aPromiseList).then((values) => {
          return values;
        });
        return pBotList;
      });
    return pBots;
  }

  /**
   * @return {promise}
   * Возвращает список ботов
   */
  getBotList() {
    return BotTable.getTable();
  }

  /**
   * @return {promise}
   * @param {array} aBotList
   * добавляет списку ботов конфигурацию
   */
  addBotsConfig(aBotList) {
    const aBotConfigPromises = aBotList.map(this.getConfig);
    return Promise.all(aBotConfigPromises);
  }

  /**
   * @return {promise}
   * @param {object} oBot
   * возвращает конфиг бота
   */
  getBotConfig(oBot) {
    const Configurator = new BotConfigurator(oBot);
    return Configurator.getBotConfig();
  }

  /**
   * Возвращает информацию о боте по id
   * @return {promise}
   * @param {integer} iBotId
   */
  getBotById(iBotId) {
    return BotTable.getBotById(iBotId);
  }

  /**
   * Добавляет бота
   * @param {string} sToken
   * @return {promose}
   */
  addBot(oBotData) {
    return BotTable.addBot(oBotData);
  }

  /**
   * удаляет бота
   * @param {integer} iBotId
   * @return {promise}
   */
  deleteBot(iBotId) {
    return BotTable.deleteBot(iBotId);
  }
}

module.exports = new BotManager();

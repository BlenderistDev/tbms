const BotTable = require('./model/bots.js');
const BotConfigurator = require('../BotConfigurator/BotConfigurator');

/**
 * Класс используется для того, чтобы собрать список ботов для запуска.
 */
class BotManager {
  /**
   * @return {promise}
   * возвращает список ботов с полной конфигурацией
   */
  getBots() {
    const pBots = BotTable.getTable()
        .then((oBotTableList)=>{
          const aPromiseList = [];
          oBotTableList.forEach((oBot)=>{
            aPromiseList.push(this.getBotConfig(oBot));
          });

          const pBotList = Promise.all(aPromiseList).then((values)=>{
            return values;
          });

          return pBotList;
        });

    return pBots;
  }

  /**
   * @return {promise}
   * @param {array} aBotList
   * добавляет списку ботов конфигурацию
   */
  addBotsConfig(aBotList) {
    const aBotConfigPromises = aBotList.map(this.getConfig);
    return promiseAll(aBotConfigPromises);
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
}

module.exports = new BotManager();

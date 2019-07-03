const BotModules = require('./model/BotModules');
const path = require('path');

/**
 * класс отвечает за подключение к боту необходимых модулей
 */
class BotModulesManager {
  /**
   * подключает к боту модули
   * @param {object} oBot
   */
  async addModules(oBot) {
    const aBotModules = await this.getBotModules(oBot.id);
    aBotModules.forEach((oModuleConfig) => {
      const oModule = require(path.join(global.ROOT_DIR, '/BotModules', oModuleConfig.module_name, 'Module'));
      oModule.addHandler(oBot, oModuleConfig.id);
    });
  }

  /**
   * вызывает обработчик модуля
   * @param {integer} iModuleId
   */
  async callHandler(iModuleId) {
    const oModule = await this.getModule(iModuleId);
    const sHandlerPath = this.getHandlerPath(oModule.handler_name);
    const oHandler = require(sHandlerPath);
    oHandler.execute(iModuleId);
  }

  /**
   * возвращает массив модулей для бота
   * @param {integer} iBotId
   * @return {promise}
   */
  getBotModules(iBotId) {
    return BotModules.getByBotId(iBotId);
  }

  /**
   * возвращает модуль по id
   * @param {integer} iModuleId
   * @return {promise}
   */
  getModule(iModuleId) {
    return BotModules.findByPk(iModuleId);
  }

  /**
   * возвращает путь до модуля
   * @param {string} sModuleName
   * @return {string}
   */
  getModulePath(sModuleName) {
    return '../BotModules/' + sModuleName + '/module.js';
  }

  /**
   * возвращает путь до обработчика
   * @param {string} sHandlerName
   * @return {string}
   */
  getHandlerPath(sHandlerName) {
    return '../BotHandlers/' + sHandlerName + '/module.js';
  }
}

module.exports = new BotModulesManager();

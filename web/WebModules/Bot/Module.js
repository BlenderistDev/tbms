const path = require('path');
const ModulePrototype = require('../ModulePrototype');
const BotManager = require(path.join(global.ROOT_DIR, 'Components', 'BotManager', 'BotManager.js'));
const BotModulesManager = require(path.join(global.ROOT_DIR, 'BotModulesManager', 'BotModulesManager'));

/**
 * фасад api для действий с ботом.
 */
class Module extends ModulePrototype {
  /**
   * возвращает список модулей для бота
   */
  cmdGetBotModules() {
    const mBotId = this.getBotIdFromData();
    if (mBotId) {
      return BotModulesManager.getBotModules(mBotId);
    }
  }

  /**
   * возвращает данные по боту
   */
  cmdGetBot() {
    const mBotId = this.getBotIdFromData();
    if (mBotId) {
      return BotManager.getBotById(mBotId);
    }
  }

  /**
   * проверяет наличие id бота в теле запроса
   * возвращает id бота при его наличии
   * отправляет ответ с ошибкой в случае отсуствия
   */
  getBotIdFromData() {
    if (this.data.bot_id === undefined) {
      this.sendError('Undefined bot id');
      return false;
    }
    return this.data.bot_id;
  }
}

module.exports = Module;

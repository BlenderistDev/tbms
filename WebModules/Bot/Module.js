const path = require('path');
const ModulePrototype = require(path.join(global.ROOT_DIR, 'WebModules', 'Main', 'ModulePrototype'));
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
    const iBotId = this.request.body.bot_id;
    if (iBotId === undefined) {
      this.response.status('400').send('Undefined bot id');
    }
    return BotModulesManager.getBotModules(iBotId);
  }

  /**
   * возвращает данные по боту
   */
  cmdGetBot() {
    const iBotId = this.request.body.bot_id;
    if (iBotId === undefined) {
      this.response.status('400').send('Undefined bot id');
    }
    return BotManager.getBotById(iBotId);
  }
}

module.exports = Module;

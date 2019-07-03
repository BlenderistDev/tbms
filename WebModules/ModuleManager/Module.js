const path = require('path');
const ModulePrototype = require(path.join(global.ROOT_DIR, 'WebModules', 'Main', 'ModulePrototype'));
const BotModulesManager = require(path.join(global.ROOT_DIR, 'BotModulesManager', 'BotModulesManager'));

class Module extends ModulePrototype {
  /**
   * возвращает список модулей для бота
   * @return {array in promise}
   */
  cmdGetBotModules() {
    const iBotId = this.request.body.bot_id;
    if (iBotId === undefined) {
      this.response.status(400).send('Undefined bot id');
    }
    return BotModulesManager.getBotModules(iBotId);
  }
}

module.exports = Module;

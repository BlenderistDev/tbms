const path = require('path');
const ModulePrototype = require(path.join(global.ROOT_DIR, 'WebModules', 'Main', 'ModulePrototype'));
const BotManager = require(path.join(global.ROOT_DIR, 'Components', 'BotManager', 'BotManager'));

/**
 * фасад api для работы со списком ботов
 */
class Module extends ModulePrototype {
  /**
   * возвращает список ботов
   */
  async cmdGetBotList() {
    const aBotList = await BotManager.getBotList();
    this.response.send(aBotList);
  }

  /**
   * добавляет бота
   * @return {promise}
   */
  cmdAddBot() {
    const aData = this.request.body;
    return BotManager.addBot(aData.token);
  }
}

module.exports = Module;

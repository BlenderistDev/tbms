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

  /**
   * удаляет бота
   * @return {promise}
   */
  cmdDeleteBot() {
    const iBotId = this.request.body.bot_id;
    if (iBotId === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return BotManager.deleteBot(iBotId);
  }
}

module.exports = Module;

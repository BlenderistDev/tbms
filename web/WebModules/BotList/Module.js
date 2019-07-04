const path = require('path');
const ModulePrototype = require('../ModulePrototype');
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
    const aBotData = this.data;
    return BotManager.addBot(aBotData);
  }

  /**
   * удаляет бота
   * @return {promise}
   */
  cmdDeleteBot() {
    const iBotId = this.data.bot_id;
    if (iBotId === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return BotManager.deleteBot(iBotId);
  }
}

module.exports = Module;

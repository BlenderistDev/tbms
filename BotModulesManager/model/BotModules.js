const path = require('path');
const Sequelize = require('sequelize');
const ModelPrototype = require(path.join(global.ROOT_DIR, 'Components', 'Database', 'ModelPrototype'));

const sequelize = ModelPrototype.sequelize;

/**
 * модель для таблицы связи ботов с модулями
 * В таблице содержатся модули, необходимые для подключения,
 * а так же id конфигурации модуля.
 */
class BotModules extends ModelPrototype {
  /**
   * @param {int} iBotId
   * @return {promise}
  */
  getByBotId(iBotId) {
    const pResult = BotModules.findAll({ where: { bot_id: iBotId } })
      .then(this.convertTableDAtaToArray);
    return pResult;
  }
}

BotModules.init({
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  bot_id: Sequelize.INTEGER,
  module_name: Sequelize.STRING
}, { sequelize, modelName: 'bot_modules' });

module.exports = new BotModules();

const path = require('path');
const Sequelize = require('sequelize');
const ModelPrototype = require(path.join(global.ROOT_DIR, 'Components', 'Database', 'ModelPrototype'));
const sequelize = ModelPrototype.sequelize;

/**
 * Модель для таблицы bots
 */
class Bots extends ModelPrototype {
  /**
   * возвращает запись о боте по id
   * @param {integer} iBotId
   * @return {promise}
   */
  getBotById(iBotId) {
    const pResult = Bots.findAll({ where: { id: iBotId } })
      .then(this.convertTableDAtaToArray);
    return pResult;
  }

  /**
   * Добавляет запись о боте
   * @param {string} sTokenж
   * @return {promise}
   */
  addBot(sToken) {
    return Bots.create({ token: sToken }).then((data) => {
      data.save();
      return data.dataValues;
    });
  }
}

Bots.init({
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  token: Sequelize.STRING
}, { sequelize, modelName: 'bots' });

module.exports = new Bots();

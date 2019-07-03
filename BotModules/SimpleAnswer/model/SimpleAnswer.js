const path = require('path');
const Sequelize = require('sequelize');
const ModelPrototype = require(path.join(global.ROOT_DIR, 'Components', 'Database', 'ModelPrototype'));

const sequelize = ModelPrototype.sequelize;

/**
 * модель для таблицы конфигурации модуля простых ответов
 */
class SimpleAnswer extends ModelPrototype {
  /**
   * @param {int} iBotId
   * @return {promise}
  */
  getByBotId(iBotId) {
    const pResult = SimpleAnswer.findAll({ where: { bot_id: iBotId } })
      .then(this.convertTableDataToArray);
    return pResult;
  }

  /**
   * возвращает запись по Primary key
   * @param {integer} id
   */
  findByPk(id) {
    return SimpleAnswer.findByPk(id);
  }

  /**
   * Создает запись конфига
   * @param {integer} iBotId
   */
  create(iBotId) {
    return SimpleAnswer.create({ bot_id: iBotId }).then((data) => {
      data.save();
      return data.dataValues;
    });
  }

  /**
   * удаляет конфиг
   * @param {integer} iConfigId
   */
  deleteConfig(iConfigId) {
    this.findByPk(iConfigId).then((oConfig) => {
      return oConfig.destroy();
    });
  }

  /**
   * обновляет шаблон конфига
   * @param {object} oConfigData
   */
  updateTemplate(oConfigData) {
    return this.findByPk(oConfigData.id)
      .then((oConfig) => {
        oConfig.template = oConfigData.template;
        oConfig.save();
        return [oConfig];
      })
      .then(this.convertTableDataToArray);
  }

  /**
   * обновляет шаблон ответа
   * @param {object} oConfigData
   */
  updateAnswer(oConfigData) {
    return this.findByPk(oConfigData.id)
      .then((oConfig) => {
        oConfig.answer = oConfigData.answer;
        oConfig.save();
        return [oConfig];
      })
      .then(this.convertTableDataToArray);
  }
}

SimpleAnswer.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  bot_id: { type: Sequelize.INTEGER },
  template: Sequelize.STRING,
  answer: Sequelize.STRING
}, { sequelize, modelName: 'bm_simple_answers' });

module.exports = new SimpleAnswer();

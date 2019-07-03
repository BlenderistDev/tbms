const SimpleAnswer = require('./model/SimpleAnswer');
/**
 * Класс для обработки простых ответов
 */
class Module {
  /**
   * Устанавливает обработчик с ответом
   * в случае совпадения сообщения по маске
   * @param {object} oBot
   * @param {integer} iBotId
   */
  async addHandler(oBot, iBotId) {
    const aConfig = await this.getBotConfig(iBotId);
    aConfig.forEach((oConfig) => {
      const pattern = new RegExp(oConfig.template);
      oBot.onText(pattern, (msg, match) => {
        const iChatId = msg.chat.id;
        oBot.sendMessage(iChatId, oConfig.answer);
      });
    });
  }

  /**
   * Возвращает конфигурацию модуля
   * @param {integer} iBotId
   * @return {promise}
   */
  getBotConfig(iBotId) {
    return SimpleAnswer.getByBotId(iBotId);
  }

  /**
   * обновляет конфиг бота
   * @param {array} aConfigList
   */
  updateBotConfig(aConfigList) {
    const aUpdatePromiseList = [];
    aConfigList.forEach((oConfig) => {
      aUpdatePromiseList.push(this.updateConfig(oConfig));
    });
    return Promise.all(aUpdatePromiseList);
  }

  /**
   * обновляет конфиг
   * @param {object} oConfig
   */
  async updateConfig(oConfig) {
    console.log(oConfig);
    return SimpleAnswer.findByPk(oConfig.id).then((oBotConfig) => {
      oBotConfig.template = oConfig.template;
      oBotConfig.answer = oConfig.answer;
      oBotConfig.save();
    });
  }

  /**
   * создает конфиг
   * @param {integer} iBotId
   */
  createConfig(iBotId) {
    return SimpleAnswer.create(iBotId);
  }

  /**
   * удаляет конфиг
   * @param {integer} iConfigId
   */
  deleteConfig(iConfigId) {
    return SimpleAnswer.deleteConfig(iConfigId);
  }

  /**
   * Обновляет шаблон конфига
   * @param {object} oConfigData
   */
  updateTemplate(oConfigData) {
    return SimpleAnswer.updateTemplate(oConfigData);
  }

  /**
   * Обновляет ответ конфига
   * @param {object} oConfigData
   */
  updateAnswer(oConfigData) {
    return SimpleAnswer.updateAnswer(oConfigData);
  }
}

module.exports = new Module();

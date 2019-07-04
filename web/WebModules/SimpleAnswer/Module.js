const path = require('path');
const ModulePrototype = require('../ModulePrototype');
const SimpleAnswer = require(path.join(global.ROOT_DIR, 'BotModules', 'SimpleAnswer', 'Module'));
/**
 * фасад для Api
 * модуль простых ответов
 */
class Module extends ModulePrototype {
  /**
   * возвращает список конфигов модуля для бота
   */
  cmdGetConfig() {
    const iBotId = this.data.bot_id;
    if (iBotId === undefined) {
      this.sendError('Undefined bot id');
    }
    return SimpleAnswer.getBotConfig(iBotId);
  }

  /**
   * добавляет новый конфиг для модуля
   */
  cmdAddConfig() {
    const iBotId = this.data.bot_id;
    if (iBotId === undefined) {
      this.sendError('Undefined bot id');
    }
    return SimpleAnswer.createConfig(iBotId);
  }

  /**
   * удаляет конфиг модуля
   */
  cmdDeleteConfig() {
    const iConfigId = this.data.id;
    if (iConfigId === undefined) {
      this.sendError('Undefined bot id');
    }
    return SimpleAnswer.deleteConfig(iConfigId);
  }

  /**
   * обновляет шаблон конфига модуля
   */
  cmdUpdateTemplate() {
    const oConfig = this.data.config;
    if (oConfig === undefined) {
      this.sendError('Undefined config');
    }
    return SimpleAnswer.updateTemplate(oConfig);
  }

  /**
   * обновляет ответ конфига модуля
   */
  cmdUpdateAnswer() {
    const oConfig = this.data.config;
    if (oConfig === undefined) {
      this.sendError('Undefined bot config');
    }
    return SimpleAnswer.updateAnswer(oConfig);
  }
}

module.exports = Module;

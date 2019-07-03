const path = require('path');
const ModulePrototype = require(path.join(global.ROOT_DIR, 'WebModules', 'Main', 'ModulePrototype'));
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
    const iBotId = this.request.body.bot_id;
    if (iBotId === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return SimpleAnswer.getBotConfig(iBotId);
  }

  /**
   * добавляет новый конфиг для модуля
   */
  cmdAddConfig() {
    const iBotId = this.request.body.bot_id;
    if (iBotId === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return SimpleAnswer.createConfig(iBotId);
  }

  /**
   * удаляет конфиг модуля
   */
  cmdDeleteConfig() {
    const iConfigId = this.request.body.id;
    if (iConfigId === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return SimpleAnswer.deleteConfig(iConfigId);
  }

  /**
   * обновляет шаблон конфига модуля
   */
  cmdUpdateTemplate() {
    const oConfig = this.request.body.config;
    if (oConfig === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return SimpleAnswer.updateTemplate(oConfig);
  }

  /**
   * обновляет ответ конфига модуля
   */
  cmdUpdateAnswer() {
    const oConfig = this.request.body.config;
    if (oConfig === undefined) {
      this.response.status(400);
      return 'Undefined bot id';
    }
    return SimpleAnswer.updateAnswer(oConfig);
  }
}

module.exports = Module;

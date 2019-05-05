const ModulePrototype = require(ROOT_DIR + '/WebModules/Main/ModulePrototype');
const BotManager = require(ROOT_DIR+'/Components/BotManager/BotManager.js');

/**
 * класс модуль
 */
class Module extends ModulePrototype {
  /**
   * Действие по умолчанию
   */
  async actionIndex() {
    const aBotList = await BotManager.getBotList();
    this.render(__dirname+'/view/body', {aBotList: aBotList});
  }

  actionAzaza() {
    console.log("azaza1");
  }

}

module.exports = Module;

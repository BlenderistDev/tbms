const ModulePrototype = require(ROOT_DIR + '/WebModules/Main/ModulePrototype');
/**
 * контроллер для левого меню
 */
class Module extends ModulePrototype {
  /**
   * геттер пути до шаблона
   * @return {string}
   */
  get sTemplatePath() {
    return __dirname+'/view/left_menu';
  }

  /**
   * геттер параметров шаблона
   * @return {string}
   */
  get oParams() {
    const oParams = {};

    oParams.aLinkList = [
      {
        text: 'Список ботов',
        href: '/index/',
      },
    ];

    return oParams;
  }

  /**
   * @return {promise}
   * рендерит левое меню и отдает HTML
   */
  getHtml() {
    return this.renderTemplate(this.sTemplatePath, this.oParams);
  }
}

module.exports = Module;

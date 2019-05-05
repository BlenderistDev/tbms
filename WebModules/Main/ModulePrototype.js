const path = require('path');
const AssetManager = require('./AssetManager');
/**
 * Прототип контроллеров
 */
class ModulePrototype {
  /**
   * Конструктор контроллера.
   * Устанавливает объекты request и response
   * для последущего использования в контроллерах
   * @param {object} request
   * @param {object} response
   */
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this._requiredModules = [];
  }

  /**
   * производит подключение header и footer
   * рендеринг страницы
   * и отправку ее клиенту
   * @param {string} sTemplatePath
   * @param {object} oParams
   */
  async render(sTemplatePath, oParams) {
    let sResultHtml = '';
    sResultHtml += await this.renderHeader();
    sResultHtml += await this.renderTemplate(sTemplatePath, oParams);
    sResultHtml += await this.renderTemplate(__dirname+'/view/footer');
    this.response.send(sResultHtml);
  }

  /**
   * производит рендеринг шаблона
   * @param {string} sTemplatePath
   * @param {object} oParams
   * @return {promise}
   */
  renderTemplate(sTemplatePath, oParams = {}) {
    return new Promise((resolve, reject)=>{
      this.response.render(sTemplatePath, oParams, (error, html)=>{
        resolve(html);
      });
    });
  }

  /**
   * @return {promise}
   * Рендерит header для страницы
   */
  async renderHeader() {

    const oLeftMenu = this.getModule('LeftMenu');
    const sLeftMenuHtml = await oLeftMenu.getHtml();

    const oAssetManager = new AssetManager(this.request, this._requiredModules);
    const aСssAssetList = oAssetManager.getCssAssetList();
    const aJsAssetList = oAssetManager.getJsAssetList();

    const oParams = {
      aCssAssetList: aСssAssetList,
      aJsAssetList: aJsAssetList,
      sLeftMenuHtml: sLeftMenuHtml,
    };

    return this.renderTemplate(__dirname+'/view/header', oParams);
  }

  /**
   * @return {object}
   * @param {string} sModuleName
   */
  getModule(sModuleName) {
    this._requiredModules.push(sModuleName);
    const Module = require(path.join(ROOT_DIR, 'WebModules', sModuleName, 'Module'));
    const oModule = new Module(this.request, this.response);
    return oModule;
  }
}

module.exports = ModulePrototype;

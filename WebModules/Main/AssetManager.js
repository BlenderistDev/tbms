const path = require('path');

/**
 * Класс отвечает за сбор необходимых статических файлов
 */
class AssetManager {
  /**
   * конструктор AssetManager
   * @param {object} request
   * @param {array} requiredModules
   */
  constructor(request, requiredModules = []) {
    this.request = request;
    this.requiredModules = requiredModules;
  }

  /**
   * @return {array}
   * взвращает список необходимых js ресурсов
   */
  getJsAssetList() {
    let aJsAssetList = [];
    aJsAssetList = aJsAssetList.concat(this.getModuleJsAssets('Main'));
    aJsAssetList = aJsAssetList.concat(this.getModuleJsAssets(this.request.params.module));
    this.requiredModules.forEach((sModuleName)=>{
      aJsAssetList = aJsAssetList.concat(this.getModuleJsAssets(sModuleName));
    });
    return aJsAssetList;
  }

  /**
   * @return {array}
   * взвращает список необходимых css ресурсов
   */
  getCssAssetList() {
    let aCssAssetList = [];
    aCssAssetList = aCssAssetList.concat(this.getModuleCssAssets('Main'));
    aCssAssetList = aCssAssetList.concat(this.getModuleCssAssets(this.request.params.module));
    this.requiredModules.forEach((sModuleName)=>{
      aCssAssetList = aCssAssetList.concat(this.getModuleCssAssets(sModuleName));
    });
    return aCssAssetList;
  }

  /**
   * @param {string} sModuleName
   * @return {array}
   * взвращает список необходимых css ресурсов для модуля
   */
  getModuleCssAssets(sModuleName) {
    const sAssetPath = path.join(ROOT_DIR, 'WebModules', sModuleName, 'Asset');
    const oModuleAsset = require(sAssetPath);
    let aAssetList = oModuleAsset.css;
    aAssetList = aAssetList.map((sAsset) => {
      return path.join(sModuleName, 'stylesheets', sAsset);
    });
    return aAssetList;
  }

  /**
   * @param {string} sModuleName
   * @return {array}
   * взвращает список необходимых js ресурсов для модуля
   */
  getModuleJsAssets(sModuleName) {
    const sAssetPath = path.join(ROOT_DIR, 'WebModules', sModuleName, 'Asset');
    const oModuleAsset = require(sAssetPath);
    let aAssetList = oModuleAsset.js;
    aAssetList = aAssetList.map((sAsset) => {
      return path.join(sModuleName, 'js', sAsset);
    });
    return aAssetList;
  }
}

module.exports = AssetManager;

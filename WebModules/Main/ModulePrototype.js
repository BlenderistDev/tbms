const path = require('path');

/**
 * Прототип контроллеров Api
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
   * возвращает созданный объект модуля
   * необходим для инкапсуляции создания модулей
   * в одном месте
   * @return {object}
   * @param {string} sModuleName
   */
  getModule(sModuleName) {
    this._requiredModules.push(sModuleName);
    const Module = require(path.join(global.ROOT_DIR, 'WebModules', sModuleName, 'Module'));
    const oModule = new Module(this.request, this.response);
    return oModule;
  }
}

module.exports = ModulePrototype;

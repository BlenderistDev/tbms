const path = require('path');
const AssetPrototype = require(path.join(ROOT_DIR, 'WebModules', 'Main', 'AssetPrototype'));
/**
 * Класс для загрузки ресурсов
 */
class Asset extends AssetPrototype {
  /**
   * геттер для необходимых модулю css
   */
  get css() {
    return [
      'style.css',
      'style1.css',
    ];
  }

  /**
   * геттер для необходимых модулю js
   */
  get js() {
    return [
      'azaza.js',
    ];
  }
}

module.exports = new Asset();

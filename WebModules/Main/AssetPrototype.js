/**
 * прототип для Asset классов модулей
 */
class AssetPrototype {
  /**
   * абстрактный геттер для необходимых css ресурсов
   */
  get css() {
    return [];
  }

  /**
   * абстрактный геттер для необходимых js ресурсов
   */
  get js() {
    return [];
  }
}

module.exports = AssetPrototype;

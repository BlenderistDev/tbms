const path = require('path');
const ModelPrototype = require(path.join(global.ROOT_DIR, 'Components', 'Database', 'ModelPrototype'));

/**
 * abstract class
 * prototype for bot options models
 */
class OptionsPrototype extends ModelPrototype {
  /**
   * @param {int} iBotId
     * @return {Promise}
     * returns row by id
     */
  getById(iBotId) {
    const pResult = this.constructor.findCreateFind({ where: { bot_id: iBotId },
      default: {
        bot_id: iBotId
      } })
      .then(([oBotOptions, created]) => {
        return oBotOptions.get();
      });

    return pResult;
  }
}

module.exports = OptionsPrototype;

const Sequelize = require('sequelize');
const OptionsPrototype = require('./OptionsPrototype');

const sequelize = OptionsPrototype.sequelize;

/**
 * polling options model
 */
class PollingOptions extends OptionsPrototype {

}

PollingOptions.init({
  bot_id: {
    type: Sequelize.INTEGER, primaryKey: true,
  },
  autoStart: {
    type: Sequelize.INTEGER, defaultValue: 1,
  },
  timeout: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },
}, {sequelize, modelName: 'polling_options'});

module.exports = new PollingOptions();

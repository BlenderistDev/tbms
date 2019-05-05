const Sequelize = require('sequelize');
const ModelPrototype = require(ROOT_DIR+'/Components/Database/ModelPrototype');

const sequelize = ModelPrototype.sequelize;

/**
 * model for bots table
 */
class Bots extends ModelPrototype {

}

Bots.init({
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  token: Sequelize.STRING,
}, {sequelize, modelName: 'bots'});

module.exports = new Bots();


const Sequelize = require('sequelize');
const OptionsPrototype = require('./OptionsPrototype');

const sequelize = OptionsPrototype.sequelize;

/**
 * bot options model
 */
class BotOptions extends OptionsPrototype 
{

}

BotOptions.init({
    bot_id: { type: Sequelize.INTEGER, primaryKey:true, unique: true, allowNull: false },
    webhook: {type: Sequelize.INTEGER, defaultValue: 0 },
    polling: {type: Sequelize.INTEGER, defaultValue: 1 },
    onlyFirstMatch: {type: Sequelize.INTEGER, defaultValue: 0 },
    baseAppUrl: {type: Sequelize.TEXT, defaultValue: "https://api.telegram.org"},
    filepath: {type: Sequelize.INTEGER, defaultValue: 1},
    badRejection: {type: Sequelize.INTEGER, defaultValue: 0},

}, { sequelize, modelName: 'bot_options' });

module.exports = new BotOptions();





const Sequelize = require('sequelize');
const OptionsPrototype = require('./OptionsPrototype');

const sequelize = OptionsPrototype.sequelize;

/**
 * webhook options model
 */
class WebhookOptions extends OptionsPrototype 
{
  
}

WebhookOptions.init({
    bot_id: { type: Sequelize.INTEGER, primaryKey:true },
    host: { type: Sequelize.TEXT, defaultValue: "0.0.0.0" }, 
    port: { type: Sequelize.INTEGER, defaultValue: 8443 }, 
    key: Sequelize.TEXT,
    cert: Sequelize.TEXT,
    pfx: Sequelize.TEXT,
    autoOpen: { type: Sequelize.INTEGER, defaultValue: 1 }, 
    https: Sequelize.INTEGER,
    healthEndpoint: { type: Sequelize.TEXT, defaultValue: "/healthz" }, 

}, { sequelize, modelName: 'webhook_options' });

module.exports = new WebhookOptions();
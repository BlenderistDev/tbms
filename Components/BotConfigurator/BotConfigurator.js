const PollingOptions = require('./model/pollingOptions');
const WebhookOptions = require('./model/webhookOptions');
const BotOptions = require('./model/botOptions');

/**
 * Bot configurator
 */
class BotConfigurator {
  /**
  * @param {object} oBot
  */
  constructor(oBot) {
    this._oBot = oBot;
  }

  /**
     * @return {Promise}
     * return bot config
     */
  getBotConfig() {
    const pBotConfig = this.getBotOptions().then((oBotOptions)=>{
      oBotOptions.id = this._oBot.id;
      oBotOptions.token = this._oBot.token;
      const aAditionalConfig = [];

      if (oBotOptions.polling === 1) {
        const pPollingOptions = this.getPollingConfig()
            .then((oPollingOptions)=>{
              oBotOptions.polling = oPollingOptions;
            });
        aAditionalConfig.push(pPollingOptions);
      }

      if (oBotOptions.webhook === 1) {
        const pWebhookOptions = this.getWebhookOptions()
            .then((oWebhookOptions)=>{
              oBotOptions.webhook = oWebhookOptions;
            });
        aAditionalConfig.push(pWebhookOptions);
      }

      const pConfig = Promise.all(aAditionalConfig).then((values)=>{
        return oBotOptions;
      });

      return pConfig;
    }).catch((err)=>{
      console.error(err);
    });

    return pBotConfig;
  }

  /**
     * @return {Promise}
     * return polling config
     */
  getPollingConfig() {
    const pPollingOptions = PollingOptions.getById(this._oBot.id)
        .then((oPollingConfig)=>{
          this._botOptions.polling = oPollingConfig;
          return oPollingConfig;
        });
    return pPollingOptions;
  }

  /**
     * @return {Promise}
     * return webhook config
     */
  getWebhookOptions() {
    const pWebhookOptions = WebhookOptions.getById(this._oBot.id)
        .then((oWebhookOptions)=>{
          this._botOptions.webhook = oWebhookOptions;
          return oWebhookOptions;
        });
    return pWebhookOptions;
  }

  /**
     * @return {Promise}
     * return bot options
     */
  getBotOptions() {
    const pBotOptions = BotOptions.getById(this._oBot.id)
        .then((oBotOptions)=>{
          this._botOptions = oBotOptions;
          return oBotOptions;
        });
    return pBotOptions;
  }
}

module.exports = BotConfigurator;

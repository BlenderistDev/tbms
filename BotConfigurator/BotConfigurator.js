const PollingOptions = require ('./model/pollingOptions.js');
const WebhookOptions = require ('./model/webhookOptions.js');
const BotOptions = require ('./model/botOptions.js');

/**
 * Bot configurator
 */
class BotConfigurator{
    
    /**
     * @param {int} iBotId 
     */
    constructor(iBotId){

        this._iBotId = iBotId;
        this._botOptions = {};
    }

    /**
     * @returns {Promise}
     * return bot config
     */
    getBotConfig(){

        let pBotConfig = this.getBotOptions().then((oBotOptions)=>{

            let aAditionalConfig = [];

            if (oBotOptions.polling === 1){
                let pPollingOptions = this.getPollingConfig().then((oPollingOptions)=>{
                    oBotOptions.polling = oPollingOptions;
                });
                aAditionalConfig.push(pPollingOptions);
            }

            if (oBotOptions.webhook === 1){
                let pWebhookOptions = this.getWebhookOptions().then((oWebhookOptions)=>{
                    oBotOptions.webhook = oWebhookOptions;
                });
                aAditionalConfig.push(pWebhookOptions);
            }

            let pConfig = Promise.all(aAditionalConfig).then((values)=>{
                return oBotOptions;
            });

            return pConfig;
        }).catch((err)=>{console.error(err);});

        return pBotConfig;
    }

    /**
     * @returns {Promise}
     * return polling config
     */
    getPollingConfig(){

        let pPollingOptions = PollingOptions.getById(this._iBotId).then((oPollingConfig)=>{
            this._botOptions.polling = oPollingConfig;
            return oPollingConfig;
        });

        return pPollingOptions;
    }

    /**
     * @returns {Promise}
     * return webhook config
     */
    getWebhookOptions(){

        let pWebhookOptions = WebhookOptions.getById(this._iBotId).then((oWebhookOptions)=>{
            this._botOptions.webhook = oWebhookOptions;
            return oWebhookOptions;
        });

        return pWebhookOptions;
    }

    /**
     * @returns {Promise}
     * return bot options
     */
    getBotOptions(){
        
        let pBotOptions = BotOptions.getById(this._iBotId).then((oBotOptions)=>{
            this._botOptions = oBotOptions;
            return oBotOptions;
        });

        return pBotOptions;
    }

}

module.exports = BotConfigurator;
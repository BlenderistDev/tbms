const ModelPrototype = require('../../Database/ModelPrototype');

/**
 * abstract class
 * prototype for bot options models
 */
class OptionsPrototype extends ModelPrototype 
{

    /**
     * 
     * @param {int} iBotId
     * @returns {Promise}
     * returns row by id 
     */
    getById(iBotId){

        let pResult = this.constructor.findCreateFind({where: {bot_id: iBotId}, default:{
            bot_id: iBotId,
        }}).then(([oBotOptions,created])=>{
            return oBotOptions.get();
        });

        return pResult;
    }

}

module.exports = OptionsPrototype;





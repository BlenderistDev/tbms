const Sequelize = require('sequelize');
const sequelize = require('./DatabaseConnection');

/**
 * Database model protoype
 */
class ModelPrototype extends Sequelize.Model {

    /**
     * @param {bool} asArray 
     * @returns {Promise}
     * return all table data
     */
    getTable(asArray = false){
        if (typeof asArray !== "boolean"){
            throw new Error("type of asArray flag mast be bool");
        }
        let pTableData = this.constructor.findAll();
        if (asArray){
            pTableData = pTableData.then((aData)=>{
                let aResult = [];
                aData.forEach((oBot)=>{
                    let aBotData = oBot.get();
                    aResult.push(aBotData);
                });
                return aResult;
            }); 
        }

        return pTableData;
    }

}

module.exports = ModelPrototype;
module.exports.sequelize = sequelize;
const Sequelize = require('sequelize');
const sequelize = require('./DatabaseConnection');

/**
 * Database model protoype
 */
class ModelPrototype extends Sequelize.Model {
  /**
   * @param {bool} asArray
   * @return {Promise}
   * return all table data
   */
  getTable(asArray = false) {
    if (typeof asArray !== 'boolean') {
      throw new Error('type of asArray flag mast be bool');
    }
    let pTableData = this.constructor.findAll();
    if (asArray) {
      pTableData = pTableData.then(this.convertTableDAtaToArray);
    }

    return pTableData;
  }

  /**
   * Конветирует полученные из базы данные в массив объектов
   * @param {array} aTableData
   * @return {array}
   */
  convertTableDAtaToArray(aTableData) {
    const aDataArray = [];
    aTableData.forEach((oData)=>{
      const aData = oData.get();
      aDataArray.push(aData);
    });
    return aDataArray;
  }
}

module.exports = ModelPrototype;
module.exports.sequelize = sequelize;

const express = require('express');
const path = require('path');
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * обработка маршрутов api
 */
router.post('/ajax', async function(req, res, next) {
  const sModuleName = toUpperCaseFirstLetter(req.body.module);
  const sCmd = 'cmd' + toUpperCaseFirstLetter(req.body.cmd);
  const Controller = require(path.join(global.ROOT_DIR, 'WebModules', sModuleName, 'Module'));
  const oController = new Controller(req, res);
  const result = await oController[sCmd]();
  res.send(result);
  next();
});

/**
 * Переводит первую букву строки в верхний регистр
 * @param {string} sStr
 * @return {string}
 */
function toUpperCaseFirstLetter(sStr) {
  return sStr[0].toUpperCase() + sStr.substr(1);
}

module.exports = router;

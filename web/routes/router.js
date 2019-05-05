const express = require('express');
const path = require('path');
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * обработка маршрута
 * /модуль/действие
 */
router.get('/:module/:action', function(req, res, next) {
  const sModuleName = req.params.module;
  req.params.module = sModuleName[0].toUpperCase()+sModuleName.substr(1);

  const Controller = require(path.join(ROOT_DIR, 'WebModules', req.params.module, 'Module'));
  const oController = new Controller(req, res);
  const sActionName = req.params.action;
  const sAction = 'action'+ sActionName[0].toUpperCase()+sActionName.substr(1);
  oController[sAction]();
});

/**
 * обработка маршрута
 * /модуль
 */
router.get('/:module', function(req, res, next) {
  const sModuleName = req.params.module;
  req.params.module = sModuleName[0].toUpperCase()+sModuleName.substr(1);

  const Controller = require(path.join(ROOT_DIR, 'WebModules', req.params.module, 'Module'));
  const oController = new Controller(req, res);
  oController.actionIndex();
});

/**
 * обработка маршрута главной страницы
 */
router.get('/', function(req, res, next) {
  req.params.module = 'Index';
  const Controller = require(path.join(ROOT_DIR, 'WebModules', req.params.module, 'Module'));
  const oController = new Controller(req, res);
  oController.actionIndex();
});

module.exports = router;

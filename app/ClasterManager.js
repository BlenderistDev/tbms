const path = require('path');
const TelegramBot = require(path.join(global.ROOT_DIR, 'Components', 'BotManager', 'TelegramBot'));
const cluster = require('cluster');
const BotManager = require(path.join(global.ROOT_DIR, 'Components', 'BotManager', 'BotManager'));

/**
 * Класс отвечает за работу с кластером процессов
 */
class BotClusterManager {
  /**
   * конструктор менеджера кластера
   */
  constructor() {
    this._oBot = {};
  }

  /**
   * Производит запуск всех ботов
   */
  launchBots() {
    BotManager.getBots()
      .then((aBots) => this.startForks(aBots));
  }

  /**
   * запускает форк процессы. Передает им данные о ботах
   * @param {array} aBots
   */
  startForks(aBots) {
    aBots.forEach(this.startFork);
  }

  /**
   * запускает форк процесс с ботом
   * @param {object} oBot
   */
  startFork(oBot) {
    const worker = cluster.fork();
    worker.send(oBot);
  }

  /**
   * @param {object} oBot
   * запускает бота в форк процессе
   * из процесса master передается конфиг бота
   */
  createTelegramBot(oBot) {
    this._oBot = new TelegramBot(oBot);
  }
}

const oBotCluster = new BotClusterManager();
if (cluster.isMaster) {
  oBotCluster.launchBots();
  require(path.join(global.ROOT_DIR, 'web', 'init'));
} else {
  process.on('message', (msg) => {
    oBotCluster.createTelegramBot(msg);
  });
}

module.exports = BotClusterManager;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const lessMiddleware = require('less-middleware');
const fs = require('fs');
const router = require('./routes/router');

const app = express();

app.set('view engine', 'twig');
// cсоздаем поток для логгера
const accessLogStream = fs.createWriteStream(path.join(ROOT_DIR, 'web', 'log', 'access.log'), {flags: 'a'});
// запускаем логгер
app.use(logger('combined', {stream: accessLogStream}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/**
 * обработчик запросов на css файлы.
 * Находит необходимый less файл модуля
 * и рендерит его в папку public
 * в подпапку с соответствующим модулем
 */
app.use(lessMiddleware(path.join(__dirname, 'public'), {
  preprocess: {
    path: function(pathname, req) {
      const sFileName = path.basename(req.path, 'css')+'less';
      const sModuleName = req.path.split(path.sep)[1];
      return path.join(ROOT_DIR, 'WebModules', sModuleName, 'web', 'stylesheets', sFileName);
    },
  },
}));

/**
 * обработчик запросов на js файлы.
 * Находит необходимый js файл модуля
 * и копирует его в папку public
 * в подпапку с соответствующим модулем
 */
app.use('/:module/js/:filename', (req, res, next)=>{
  const sDestPath = path.join(ROOT_DIR, 'web', 'public', req.params.module, 'js');
  // если дериктория для файла отсутствует, создаем
  if (!fs.existsSync(sDestPath)) {
    fs.mkdirSync(sDestPath, {
      recursive: true,
    });
  }

  // копируем файл в директорию
  fs.copyFile(
      path.join(ROOT_DIR, 'WebModules', req.params.module, 'web', 'js', req.params.filename),
      path.join(ROOT_DIR, 'web', 'public', req.baseUrl),
      (error)=>{
        if (error) {
          console.error(error);
        }
        next();
      }
  );
});

// подключаем папку для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// подключаем обработчик маршрутов
app.use('/', router);

// подключаем обработчик для 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(__dirname+'/view/error');
});

module.exports = app;

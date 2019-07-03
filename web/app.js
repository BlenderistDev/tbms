const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const router = require('./routes/router');
const cors = require('cors');

const app = express();

app.set('view engine', 'twig');
// cсоздаем поток для логгера
const accessLogStream = fs.createWriteStream(path.join(global.ROOT_DIR, 'web', 'log', 'access.log'), { flags: 'a' });
// запускаем логгер
app.use(logger('combined', { stream: accessLogStream }));
// обработка
app.use(express.json());
// urlencodим данные
app.use(express.urlencoded({ extended: false }));
// куки
app.use(cookieParser());
// для обработки запросов не с localhost
app.use(cors());
// подключаем папку для статических файлов
app.use(express.static(path.join(__dirname, 'public')));
// подключаем обработчик маршрутов
app.use('/', router);

module.exports = app;

const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./cliente'));
app.use(require('./consulta'));
app.use(require('./fichaAcupuntura'));
app.use(require('./tratamiento'));

module.exports = app;
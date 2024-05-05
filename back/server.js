require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const indexRoute = require('./src/index');
const helloRoute = require('./src/hello');
const freeRoute = require('./src/free');
const mintRoute = require('./src/mint');
const moveRoute = require('./src/move');
const acceptRoute = require('./src/accept');
const dbTestRoute = require('./src/dbtest');

app.use('/', indexRoute);
app.use('/hello', helloRoute);
app.use('/free', freeRoute);
app.use('/mint', mintRoute);
app.use('/move', moveRoute);
app.use('/accept', acceptRoute);
app.use('/dbtest', dbTestRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
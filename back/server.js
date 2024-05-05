require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');
const freeRoute = require('./routes/free');
const mintRoute = require('./routes/mint');
const moveRoute = require('./routes/move');
const acceptRoute = require('./routes/accept');

app.use('/', indexRoute);
app.use('/hello', helloRoute);
app.use('/free', freeRoute);
app.use('/mint', mintRoute);
app.use('/move', moveRoute);
app.use('/accept', acceptRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
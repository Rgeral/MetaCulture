require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5173;

const tokenVerificationRoute = require('./src/verify-jwt');
const indexRoute = require('./src/index');
const helloRoute = require('./src/hello');
const freeRoute = require('./src/free');
const mintRoute = require('./src/mint');
const moveRoute = require('./src/move');
const acceptRoute = require('./src/accept');
const dbTestRoute = require('./src/dbtest');

app.use(cors());
app.use('/', indexRoute);
app.use('/hello', helloRoute);
app.use('/verify-jwt', tokenVerificationRoute);

app.use('/free', freeRoute);
app.use('/mint', mintRoute);
app.use('/move', moveRoute);
app.use('/accept', acceptRoute);
app.use('/dbtest', dbTestRoute);

const routes = app._router.stack.filter((r) => r.route).map((r) => r.route.path);
console.log(routes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
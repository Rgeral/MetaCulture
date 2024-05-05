const express = require('express');
const app = express();
const PORT = process.env.PORT || 5173;

const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');

app.use('/', indexRoute);
app.use('/hello', helloRoute);

const routes = app._router.stack.filter((r) => r.route).map((r) => r.route.path);
console.log(routes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');

app.use('/', indexRoute);
app.use('/hello', helloRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
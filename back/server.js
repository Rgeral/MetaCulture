const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const indexRoute = require('./routes/index');

app.use('/', indexRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');
const tokenVerificationRoute = require('./routes/verify-jwt');

app.use(cors());
app.use('/', indexRoute);
app.use('/hello', helloRoute);
app.use('/verify-jwt', tokenVerificationRoute);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
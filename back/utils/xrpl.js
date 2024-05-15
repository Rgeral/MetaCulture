const xrpl = require('xrpl');

const xrplClient = new xrpl.Client(process.env.XRPL_SERVER);

module.exports = xrplClient;

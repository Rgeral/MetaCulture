const { Xumm } = require('xumm');

function getXumm() {
    const xumm = new Xumm(
        process.env.XAMAN_API_KEY || '',
        process.env.XAMAN_SECRET_KEY || '',
    );
    return xumm;
}

module.exports = getXumm;

const crypto = require('crypto');
const util = require('util');

// Generate unique hash
function generateUniqueHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

// Asynchrone db query
function createQueryAsync(db) {
    return util.promisify(db.query).bind(db);
}

// Transform URL to HEX
function urlToHex(url) {
    return Buffer.from(url).toString('hex');
}

// Transform HEX to URL
function hexToUrl(hex) {
    return Buffer.from(hex, 'hex').toString('utf8');
}

// Transform IPFS to Url
function ipfsToUrl(ipfsUrl) {
    const prefix = "https://ipfs.io/ipfs/";
    const ipfsPrefix = "ipfs://";
    if (ipfsUrl.startsWith(ipfsPrefix)) {
        return prefix + ipfsUrl.slice(ipfsPrefix.length);
    }
    return ipfsUrl;
}

module.exports = {
    generateUniqueHash,
    createQueryAsync,
    urlToHex,
    hexToUrl,
    ipfsToUrl
};

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

module.exports = {
    generateUniqueHash,
    createQueryAsync,
    urlToHex
};

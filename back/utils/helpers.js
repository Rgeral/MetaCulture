const crypto = require('crypto');
const util = require('util');

// Créer un hash unique
function generateUniqueHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

// Créer une version asynchrone de `db.query`
function createQueryAsync(db) {
    return util.promisify(db.query).bind(db);
}

// Exporter les fonctions
module.exports = {
    generateUniqueHash,
    createQueryAsync
};

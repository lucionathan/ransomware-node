"use strict";
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const Provider = require('../utils/EncryptionManager');

const decipher = (privateKey) => {
    const provider = new Provider();
    provider.importPrivateKey(privateKey);
    const { IV, KEY } = provider.loadSymetricKey();
    return crypto.createCipheriv(algorithm, KEY, IV);
};

module.exports = decipher;
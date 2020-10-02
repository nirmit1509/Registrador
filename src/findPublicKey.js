"use strict"

const Wallet = require('ethereumjs-wallet');

const FindPublicKey = (privateKey) => {
    const privKeyBuf = Buffer.from(privateKey, "hex");
    const wallet = Wallet.fromPrivateKey(privKeyBuf);
    return wallet.getPublicKey();
}


module.exports = {
    findPublicKey: FindPublicKey,
};
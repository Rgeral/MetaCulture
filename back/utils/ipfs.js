const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_API_KEY });

async function uploadToIPFS(name, path) {

    const readableStreamForFile = fs.createReadStream(path);
    const options = {
        pinataMetadata: {
            name: name,
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        console.log(result.IpfsHash);
        return result.IpfsHash;
    }).catch((err) => {
        console.log(err);
        return ('Error');
    });
}

module.exports = uploadToIPFS;

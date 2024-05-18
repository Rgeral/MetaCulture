const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_API_KEY });

async function uploadToIpfs(name, path) {

    const readableStreamForFile = fs.createReadStream(path);
    const options = {
        pinataMetadata: {
            name: name,
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    try {
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        return (result.IpfsHash);
    } catch (err) {
        console.log(err);
        return ('Error');
    }
}

module.exports = uploadToIpfs;

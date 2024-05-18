const fs = require("fs");

async function uploadToIPFS(fileName, path) {
    try {
        const formData = new FormData();

        const file = fs.createReadStream(path);
        formData.append("file", file);

        const pinataMetadata = JSON.stringify({
            name: fileName,
        });
        formData.append("pinataMetadata", pinataMetadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);

        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ` + process.env.PINATA_API_KEY,
            },
            body: formData,
        });
        const resData = await res.json();
        console.log(resData);
        return ("Success");
    } catch (error) {
        console.log(error);
        return ("Error");
    }
}

module.exports = uploadToIPFS;

const express = require('express');
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMmFiYWMzMi1jOTIzLTRmZWMtODJiOC0wMzliZDFhYjQ5NDEiLCJlbWFpbCI6InZhbGlrcHAwNDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMzc5ODJlNGM1OWVmNDAzM2I1YiIsInNjb3BlZEtleVNlY3JldCI6IjFmZjNkNDhkYzQwZWVlNTIxMTA1YWY0NmMyYmU1OGU2YmVkNWUwYTUzNGRkYWJiYzFjNmNmMzU0ZDE1ZTMwNGEiLCJpYXQiOjE3MTQ5MDU1MzF9.Wo9P4F8iEN9GQXs_fktbMpMfHCqHOfdMCaYTwy3rfEo"
const sketch = require('./sketch')
const router = express.Router();

const pushIpfs = async() => {
    const src  = sketch();
    const formData = new FormData();
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'meta culture nft',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log("Result");
      console.log(res.data);
      const url = "https://ipfs.io/ipfs/" + res.data['IpfsHash'];
      return url;

      console.log(url);
    } catch (error) {
      console.log(error);
    }
};
// Route GET pour la racine
router.get('/', async (req,res) => {
        const ipfs_url = await pushIpfs();
        res.send(ipfs_url);
        console.log(ipfs_url);
    });

module.exports = router;

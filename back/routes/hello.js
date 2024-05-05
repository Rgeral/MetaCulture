const express = require('express');
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMmFiYWMzMi1jOTIzLTRmZWMtODJiOC0wMzliZDFhYjQ5NDEiLCJlbWFpbCI6InZhbGlrcHAwNDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMzc5ODJlNGM1OWVmNDAzM2I1YiIsInNjb3BlZEtleVNlY3JldCI6IjFmZjNkNDhkYzQwZWVlNTIxMTA1YWY0NmMyYmU1OGU2YmVkNWUwYTUzNGRkYWJiYzFjNmNmMzU0ZDE1ZTMwNGEiLCJpYXQiOjE3MTQ5MDU1MzF9.Wo9P4F8iEN9GQXs_fktbMpMfHCqHOfdMCaYTwy3rfEo"

const router = express.Router();

// const app = express();
//const upload = multer({ dest: 'uploads/' }); // Set up multer for handling file uploads
//ipfs = ipfsAPI('localhost', '5173', { protocol: 'http' }); // Connect to IPFS daemon

// Route GET pour la racine
router.get('/', async (req, res) => {
        const formData = new FormData();
        const src = "./apple.jpg";
        
        const file = fs.createReadStream(src)
        formData.append('file', file)
        
        const pinataMetadata = JSON.stringify({
          name: 'Apple nft',
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
          console.log(url);
        } catch (error) {
          console.log(error);
        }
    });
// router.post('/',upload.single('image'), async (req, res) => {
//     try {
//       // Upload the image to IPFS
//       const file = req.file;
//       const ipfsResponse = await ipfs.add(fs.createReadStream(file.path));
//       const ipfsHash = ipfsResponse[0].hash;
  
//       // Delete the temporary file
//       fs.unlinkSync(file.path);
  
//       // Return the IPFS URL to the client
//       const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
//       res.json({ ipfsUrl });
//     } catch (error) {
//       console.error('Error uploading image to IPFS:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = router;

const express = require('express');
const router = express.Router();
const xrpl = require('xrpl');
const xrplClient = require('../utils/xrpl');
const auth = require('../utils/auth');
const db = require('../utils/db');
const { createQueryAsync } = require('../utils/helpers');

// Query asynchrone
const queryAsync = createQueryAsync(db);

async function createNFT() {

  // Connect to the XRPL
  await xrplClient.connect();

  // Get wallet
  const wallet = xrpl.Wallet.fromSeed(process.env.XRP_WALLET_SEED);

  // Create a transaction to mint an NFT
  const nftMintTx = {
    "TransactionType": "NFTokenMint",
    "Account": wallet.address,
    "Flags": 8,
    "NFTokenTaxon": 0,  // Zero means no special taxonomy
    "Fee": "10",
    "URI":  urlToHex("https://test.com"),
  };

  console.log("Submitting NFT mint transaction...");
  const tx = await client.submitAndWait(nftMintTx, { wallet });

  // Output the results
  console.log(JSON.stringify(tx, null, 2));

  // Disconnect from the client
  await client.disconnect();
}

// Magic link path
router.get('/get', auth, async (req, res) => {

  try {
    // Prepared SQL query to prevent SQL injection
    const query1 = 'SELECT * FROM nft WHERE userId = ?';
    const result1 = await queryAsync(query1, [req.decoded.userId]);

    if (result1.length === 0) {
      await createNFT();
    }

    console.log(result1);

    console.log(req.decoded);
    res.status(200).json({ message: 'Hello user:' + req.decoded.userId });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }


});



async function createNFT() {

  await xrplClient.connect();

  // Your wallet seed - replace with your actual testnet wallet seed
  const wallet = xrplClient.Wallet.fromSeed(process.env.XRP_WALLET_SEED);

  const ipfs_url = await pushIpfs();

  // Create a transaction to mint an NFT
  const nftMintTx = {
    "TransactionType": "NFTokenMint",
    "Account": wallet.address,
    "Flags": 8,
    "NFTokenTaxon": 0,  // Zero means no special taxonomy
    "Fee": "10",
    "URI": urlToHex(ipfs_url),
  };

  console.log("Submitting NFT mint transaction...");
  const tx = await client.submitAndWait(nftMintTx, { wallet });

  // Output the results
  console.log(JSON.stringify(tx, null, 2));

  // Disconnect from the client
  await client.disconnect();
}


module.exports = router;

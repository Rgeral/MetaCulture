const express = require('express');
const router = express.Router();
const xrpl = require('xrpl');
const xrplClient = require('../utils/xrpl');
const auth = require('../utils/auth');
const db = require('../utils/db');
const { createQueryAsync, urlToHex } = require('../utils/helpers');

// Query asynchrone
const queryAsync = createQueryAsync(db);

async function createNFT(url) {

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
    "URI":  urlToHex(url),
  };

  console.log("Creation of the NFT is currently in progress...");
  const tx = await xrplClient.submitAndWait(nftMintTx, { wallet });

  const transactionResult = tx.result.meta.TransactionResult;
  const nftAddress = tx.result.meta.nftoken_id;

  // Disconnect from the client
  await xrplClient.disconnect();

  if (transactionResult === "tesSUCCESS") {
    return (nftAddress);
  } else {
    return ("Error");
  }
}

// Magic link path
router.get('/get', auth, async (req, res) => {

  try {
    let nftAddress = 0;

    // Prepared SQL query to prevent SQL injection
    const query1 = 'SELECT * FROM nft WHERE userId = ?';
    const result1 = await queryAsync(query1, [req.decoded.userId]);

    if (result1.length === 0) {
      nftAddress = await createNFT("https://www.pifgadget.fr/");

      const query2 = `
      INSERT INTO nft (userId, address)
      VALUES (?, ?)
      `;
      const result2 = await queryAsync(query2, [req.decoded.userId, nftAddress]);
    } else {
      nftAddress = result1[0].address;
    }

    // Connect to the XRPL
    await xrplClient.connect();

    const nftResult = await xrplClient.request({
      "command": "nft_info",
      "nft_id": nftAddress
    });

    // Disconnect from the client
    await xrplClient.disconnect();

    console.log(nftResult);

    res.status(200).json({ address: nftAddress });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;

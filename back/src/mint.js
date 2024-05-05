const xrpl = require('xrpl');
const express = require('express');
const router = express.Router();

function urlToHex(url) {
  return Buffer.from(url).toString('hex');
}

async function createNFT() {
  // Connect to the XRPL testnet server
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  // Your wallet seed - replace with your actual testnet wallet seed
  const wallet = xrpl.Wallet.fromSeed(process.env.XRP_WALLET_SEED);

  // Create a transaction to mint an NFT
  const nftMintTx = {
    "TransactionType": "NFTokenMint",
    "Account": wallet.address,
    "Flags": 8,
    "NFTokenTaxon": 0,  // Zero means no special taxonomy
    "Fee": "10",
    "URI": urlToHex("https://42.fr")
  };

  console.log("Submitting NFT mint transaction...");
  const tx = await client.submitAndWait(nftMintTx, { wallet });

  // Output the results
  console.log(JSON.stringify(tx, null, 2));

  // Disconnect from the client
  await client.disconnect();
}


router.get('/', (req, res) => {
  createNFT().catch(console.error);
  res.send('NFT minted ?!');
});

module.exports = router;

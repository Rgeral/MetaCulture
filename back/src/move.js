const xrpl = require('xrpl');
const express = require('express');
const router = express.Router();


async function createSellOffer(nftId) {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    try {
        await client.connect();

        const wallet = xrpl.Wallet.fromSeed(process.env.XRP_WALLET_SEED);

        const sellOfferTx = {
            "TransactionType": "NFTokenCreateOffer",
            "Account": wallet.address, // Votre adresse, vous vendez le NFT
            "NFTokenID": nftId, // ID du NFT que vous vendez
            "Amount": "0", // Montant de l'offre, ici 0 XRP
            "Flags": xrpl.NFTokenCreateOfferFlags.tfSellNFToken // Flag indiquant que c'est une offre de vente
          };

        console.log("Submitting buy offer for NFT...");
        const response = await client.submitAndWait(sellOfferTx, { wallet });
        console.log("Transaction result:", JSON.stringify(response, null, 2));

        // Check if the transaction was successful
        if (response.result.meta.TransactionResult === "tesSUCCESS") {
            console.log("Buy offer submitted successfully.");
        } else {
            console.error("Failed to submit buy offer:", response.result.meta.TransactionResult);
        }
    } catch (error) {
        console.error("Error creating buy offer:", error);
    } finally {
        // Always disconnect the client when done
        await client.disconnect();
    }
}

router.get('/', (req, res) => {

    createSellOffer("0008000044FE7CB1B3249BDDAFB2486A8F5A02C74EA85190616D60AF00060314")
    res.send('move ?!');
});

module.exports = router;

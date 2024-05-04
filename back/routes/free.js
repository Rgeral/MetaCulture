require('dotenv').config();
const xrpl = require('xrpl');
const express = require('express');
const router = express.Router();

async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(process.env.XRP_WALLET_SEED);
  console.log(`Adresse: ${wallet.address}`);
  console.log(`Clé publique: ${wallet.publicKey}`);

  // Récupérer l'état du compte pour obtenir le numéro de séquence
  const account_info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "current"
  });
  const sequence = account_info.result.account_data.Sequence;

  console.log(`Current Sequence: ${sequence}`);  // Débogage

  const serverInfo = await client.request({
    command: "server_info"
  });
  const ledgerIndex = serverInfo.result.info.validated_ledger.seq;
  const lastLedgerSequence = ledgerIndex + 10;

  console.log(`LastLedgerSequence: ${lastLedgerSequence}`);

  const transaction = {
    "TransactionType": "Payment",
    "Account": wallet.address,
    "Sequence": sequence,  // Ajout du numéro de séquence
    "Amount": xrpl.xrpToDrops(1),  // 1 XRP
    "Destination": "rEDMA71k8zYSp2qjQfmQZhnTvsPWFyc39N",
    "LastLedgerSequence": lastLedgerSequence,
    "Fee": "12"
  };

  const signedTransaction = wallet.sign(transaction);
  console.log(`Signed Transaction: ${signedTransaction.tx_blob}`); // Afficher la transaction signée pour débogage

  const result = await client.submitAndWait(signedTransaction.tx_blob);
  console.log(JSON.stringify(result, null, 2));

  await client.disconnect();
}

router.get('/', (req, res) => {
  main().catch(console.error);
  res.send('Transaction endpoint is ready!');
});

module.exports = router;

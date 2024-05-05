const xrpl = require('xrpl');
const express = require('express');
const router = express.Router();
const { Xumm } = require('xumm');

function getXumm() {
    const xumm = new Xumm(
        process.env.XAMAN_API_KEY || '',
        process.env.XAMAN_SECRET_KEY || '',
    );
    return xumm;
}

async function acceptOffer() {
    // Extraire les paramètres `userToken` et `offerId` de la requête
    // const query = getQuery(event);
    //const userToken = query.userToken;
    const offerId = "A4578ED83E87BD10E9FB43626D7AE24AB974852EFF3D69E00C12F51509065E78";

    // Vérifier la présence des paramètres requis
    // if (!userToken) {
    //     throw createError({
    //         status: 400,
    //         statusMessage: 'missing user token',
    //     });
    // }
    if (!offerId) {
        throw createError({
            status: 400,
            statusMessage: 'missing offer id',
        });
    }

    try {
        // Récupérer une instance de Xumm
        let xumm = getXumm();

        // Ping pour vérifier la connexion à Xumm
        const pong = await xumm?.ping();
        //console.log(userToken);

        // Créer le payload pour accepter l'offre
        const payload = await xumm.payload?.create({
            txjson: {
                TransactionType: "NFTokenAcceptOffer",
                NFTokenSellOffer: offerId,
            },
        });

        // Afficher le payload dans la console et le retourner
        console.log(payload);
        return payload;

    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        throw createError({
            status: 500,
            statusMessage: error.toString(),
        });
    }
}

router.get('/', async (req, res) => {

    const payload = await acceptOffer();
    console.log(payload);
    res.send('accept');
});

module.exports = router;

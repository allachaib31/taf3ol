import React, { useState } from 'react';
import axios from 'axios';
import crypto from "crypto";

const CryptomusPayment = () => {
    const [amount, setAmount] = useState('');
    const [paymentUrl, setPaymentUrl] = useState(null);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const createPayment = async () => {
        try {
            const apiKey = 'VOTRE_API_KEY'; // Remplacez par votre clé API
            const apiSecret = 'VOTRE_SECRET_KEY'; // Remplacez par votre clé secrète
            const endpoint = 'https://api.cryptomus.com/v1/payment';

            // Données de la requête
            const paymentData = {
                amount: amount,
                currency: 'USDT', // Vous pouvez changer la devise en fonction de vos besoins
                order_id: '123456', // Un identifiant unique pour la commande
                payment_type: 'crypto', // Type de paiement
                callback_url: 'https://d271-41-97-85-12.ngrok-free.app/client/support', // URL de rappel après le paiement
                //success_url: 'https://votresite.com/success', // URL de succès après le paiement
                //cancel_url: 'https://votresite.com/cancel', // URL d'annulation
            };
            const bufferData = Buffer.from(JSON.stringify(paymentData)).toString("base64").concat();
            // Configuration des en-têtes
            const headers = {
                'Content-Type': 'application/json',
                'mercent': "79774849-0b67-4b08-a776-c3b64a2b4669",
                'sign': crypto.createHash("md5").update(bufferData).digest("hex"),
            };

            // Envoi de la requête pour créer un paiement
            const response = await axios.post(endpoint, paymentData, { headers });

            // Récupérer l'URL du paiement
            if (response.data && response.data.url) {
                setPaymentUrl(response.data.url);
            } else {
                alert('Erreur lors de la création du paiement.');
            }
        } catch (error) {
            console.error('Erreur lors de la création du paiement :', error);
            alert('Une erreur est survenue. Vérifiez votre configuration.');
        }
    };

    return (
        <div>
            <h2>Paiement Cryptomus</h2>
            <input
                type="number"
                placeholder="Montant"
                value={amount}
                onChange={handleAmountChange}
            />
            <button onClick={createPayment}>Payer</button>

            {paymentUrl && (
                <div>
                    <p>Pour effectuer le paiement, cliquez sur le lien ci-dessous :</p>
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                        Lien de paiement
                    </a>
                </div>
            )}
        </div>
    );
};

export default CryptomusPayment;

import React, { useEffect } from 'react';

function GooglePayButton() {
  useEffect(() => {
    // Load Google Pay script
    const loadGooglePayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = initializeGooglePay;
      document.body.appendChild(script);
    };

    const initializeGooglePay = () => {
      if (window.google && window.google.payments && window.google.payments.api) {
        const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });

        const paymentDataRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'], // Add more networks if needed
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example', // Replace with actual gateway name in production
                gatewayMerchantId: 'exampleMerchantId' // Replace with merchant ID in production
              }
            }
          }],
          merchantInfo: {
            merchantName: 'Test Business',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '100.00',
            currencyCode: 'USD',
            countryCode: 'US',
          }
        };

        paymentsClient.isReadyToPay({ allowedPaymentMethods: paymentDataRequest.allowedPaymentMethods })
          .then(response => {
            if (response.result) {
              const button = paymentsClient.createButton({
                onClick: () => onGooglePayButtonClick(paymentsClient, paymentDataRequest)
              });
              document.getElementById('google-pay-button').appendChild(button);
            }
          })
          .catch(err => console.error('Error checking readiness for Google Pay:', err));
      } else {
        console.error('Google Pay API is not loaded.');
      }
    };

    const onGooglePayButtonClick = (paymentsClient, paymentDataRequest) => {
      paymentsClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
          console.log('Payment data received:', paymentData);
        })
        .catch(err => {
          console.error('Payment failed:', err);
        });
    };

    // Load Google Pay script
    loadGooglePayScript();
  }, []);

  return (
    <div>
      <h2>Google Pay Payment (Test Environment)</h2>
      <div id="google-pay-button"></div>
    </div>
  );
}

export default GooglePayButton;

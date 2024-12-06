import React, { useState } from 'react';

function PerfectMoneyPayment() {
    const [paymentData, setPaymentData] = useState({
        PAYEE_ACCOUNT: '73707108',  // Your Perfect Money account ID
        PAYEE_NAME: 'alaa eddine',  // Your business name
        PAYMENT_AMOUNT: '100.00',          // Amount to be paid
        PAYMENT_UNITS: 'USD',              // Currency (e.g., USD)
        PAYMENT_ID: '1',                   // Unique payment ID
        PAYMENT_URL: 'https://yourwebsite.com/success',  // URL to redirect on success
        PAYMENT_URL_METHOD: 'POST',
        NOPAYMENT_URL: 'https://yourwebsite.com/fail',   // URL to redirect on failure
        NOPAYMENT_URL_METHOD: 'POST',
        STATUS_URL: 'https://yourwebsite.com/status',    // URL for payment status callback
        SUGGESTED_MEMO: 'Order Payment',   // Description or memo
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://perfectmoney.is/api/step1.asp';

        // Append all payment data as hidden inputs
        for (const [key, value] of Object.entries(paymentData)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div>
            <h2>Perfect Money Payment Form</h2>
            <button onClick={handleSubmit}>Pay with Perfect Money</button>
            <form action="https://perfectmoney.com/api/step1.asp" method="POST">
                <input type="hidden" name="PAYEE_ACCOUNT" value="U39898094" />
                <input type="hidden" name="PAYEE_NAME" value="amine" />
                <input type="hidden" name="PAYMENT_ID" value="test" />
                <input type="hidden" name="PAYMENT_AMOUNT" value="1" />
                <input type="hidden" name="PAYMENT_UNITS" value="USD" />
                <input type="hidden" name="STATUS_URL" value="mailto:user@server.com" />
                <input type="hidden" name="PAYMENT_URL" value="mailto:user@server.com" />
                <input type="hidden" name="PAYMENT_URL_METHOD" value="POST" />
                <input type="hidden" name="NOPAYMENT_URL" value="mailto:user@server.com" />
                <input type="hidden" name="NOPAYMENT_URL_METHOD" value="POST" />
                <input type="hidden" name="SUGGESTED_MEMO" value="" />
                <input type="hidden" name="BAGGAGE_FIELDS" value="" />
                <input type="submit" name="PAYMENT_METHOD" value="Pay Now!" />
            </form>
        </div>
    );
}

export default PerfectMoneyPayment;

import React, { useState } from 'react';

function PayeerPayment() {
    const [paymentData, setPaymentData] = useState({
        m_shop: 'P1125286240',
        m_orderid: '1',
        m_amount: '100.00',
        m_curr: 'USD',
        m_desc: btoa('Test'), // Encodes 'Test' in Base64
    });

    const m_key = 'Your secret key';

    // Helper function to generate SHA-256 hash
    async function generateHash(dataString) {
        const encoder = new TextEncoder();
        const data = encoder.encode(dataString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { m_shop, m_orderid, m_amount, m_curr, m_desc } = paymentData;
        const hashString = `${m_shop}:${m_orderid}:${m_amount}:${m_curr}:${m_desc}:${m_key}`;
        const m_sign = await generateHash(hashString);

        // Update form data with generated m_sign
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://payeer.com/merchant/';

        // Append required fields to the form
        form.appendChild(createHiddenInput('m_shop', m_shop));
        form.appendChild(createHiddenInput('m_orderid', m_orderid));
        form.appendChild(createHiddenInput('m_amount', m_amount));
        form.appendChild(createHiddenInput('m_curr', m_curr));
        form.appendChild(createHiddenInput('m_desc', m_desc));
        form.appendChild(createHiddenInput('m_sign', m_sign));

        document.body.appendChild(form);
        form.submit();
    };

    // Utility to create hidden form inputs
    const createHiddenInput = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        return input;
    };

    return (
        <div>
            <h2>Payeer Payment Form</h2>
            <button onClick={handleSubmit}>Pay with Payeer</button>
        </div>
    );
}

export default PayeerPayment;

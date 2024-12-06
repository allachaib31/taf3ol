import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function PayPalPayment() {
    return (
        <div>
            <h2>Complete Your Payment</h2>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "10.00", // Set the amount here
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        // Handle successful payment capture here
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                    });
                }}
                onError={(err) => {
                    console.error("PayPal Checkout error:", err);
                    alert("Payment could not be processed.");
                }}
            />
        </div>
    );
}

export default PayPalPayment;

import React, { useEffect, useState } from "react";

function Alert({ msg }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (msg) {
            setVisible(true); // Show the alert when the `msg` changes
            const timer = setTimeout(() => {
                setVisible(false); // Hide the alert after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [msg]);

    if (!visible || !msg) return null; // Don't render the alert if it's not visible or there's no message

    return (
        <div
            className={`fixed z-[999] top-4 right-4 max-w-xs w-full shadow-lg rounded-lg p-4 flex items-center space-x-3 transition-transform transform hover:scale-105 ${
                msg.status ? "bg-green-500" : "bg-red-500"
            }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                {msg.status ? (
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4.5-4.5a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                ) : (
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.366-.446.976-.446 1.342 0l6 7.5a1 1 0 01-.671 1.601H3.07a1 1 0 01-.671-1.601l6-7.5zM10 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                        clipRule="evenodd"
                    />
                )}
            </svg>
            <div className="flex-1">
                <p className="font-bold">{msg.status ? "تم بنجاح" : "يرجى اعادة المحاولة"}</p>
                <p className="text-sm">{msg.text}</p>
            </div>
        </div>
    );
}

export default Alert;

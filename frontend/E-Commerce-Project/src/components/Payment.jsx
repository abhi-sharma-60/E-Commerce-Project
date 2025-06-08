import { useEffect, useState } from "react";

const Payment = ({ buyerId, amount, cartId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRazorpay = () => {
      setLoading(false);

      const options = {
        key: "rzp_test_Yf39QmdXw0QA0W", // Replace with your actual key
        amount: amount * 100, // in paise
        currency: "INR",
        name: "DigiMart",
        description: "Complete your purchase",
        handler: async function (response) {
          setLoading(true);
          setError(null);

          try {
            const paymentData = {
              razorpayPaymentId: response.razorpay_payment_id,
              buyerId,
              cartId,
              amount,
            };

            const res = await fetch("/api/verifyPayment", {
              // or SummaryApi.verifyPayment.url
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentData),
            });

            const result = await res.json();

            if (result.success) {
              onClose();
            } else {
              setError(result.message || "Payment verification failed");
              setLoading(false);
            }
          } catch (err) {
            setError("Network error occurred during payment verification.");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            onClose();
          },
        },
        prefill: {
          name: "Customer Name", // You can pass actual name/email as props here
          email: "email@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    if (window.Razorpay) {
      loadRazorpay();
    } else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = loadRazorpay;
      document.body.appendChild(script);

      // Optional cleanup on unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [amount, buyerId, cartId, onClose]);

  // UI while loading Razorpay or processing payment
  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg max-w-xs">
            <svg
              className="animate-spin h-10 w-10 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-gray-700 font-semibold">Processing payment...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-100 text-red-700 rounded-lg p-4 shadow max-w-sm mx-4 text-center">
            <p className="mb-4 font-semibold">Payment Error</p>
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;

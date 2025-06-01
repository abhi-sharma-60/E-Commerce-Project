// payment.jsx
import { useEffect } from "react";
import SummaryApi from "../common/index.js";

const Payment = ({ buyerId, amount, onClose }) => {
  useEffect(() => {
    const loadRazorpay = () => {
      const options = {
        key: 'rzp_test_Yf39QmdXw0QA0W', // Replace with your actual key
        amount: amount * 100, // Razorpay works in paise
        currency: "INR",
        name: "DigiMart",
        description: "Complete your purchase",
        handler: async function (response) {
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            buyerId,
            cartId,
            amount
          };

          await fetch(SummaryApi.verifyPayment.url, {
            method: SummaryApi.verifyPayment.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          onClose(); // close window on success
        },
        modal: {
          ondismiss: function () {
            onClose(); // close window on cancel
          },
        },
        prefill: {
          name: "Customer Name",
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
    }
  }, [amount, buyerId, onClose]);

  return null; // no visible component
};

export default Payment;

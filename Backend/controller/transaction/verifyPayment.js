// controllers/payment.controller.js
const Payment = require("../../models/transactionModel");
const Order = require("../../models/orderModel");
const addToCartModel = require("../../models/addToCartModel")

const verifyPayment = async (req, res) => {
  try {
    const { razorpayPaymentId, buyerId, amount } = req.body;

    // Step 1: Save the payment
    const newPayment = new Payment({
      razorpayPaymentId,
      buyerId,
      amount,
      status: "success",
    });

    const savedPayment = await newPayment.save();

    // Step 2: Get all cart items for user
    const cartItems = await addToCartModel.find({ userId: buyerId });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Step 3: Create Order
    const products = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const newOrder = new Order({
      userId: buyerId,
      products,
      status: "payment done",
      paymentId: savedPayment._id,
    });

    await newOrder.save();


    res.status(200).json({ message: "Payment success & order created" });
  } catch (error) {
    console.error("Payment verify error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyPayment

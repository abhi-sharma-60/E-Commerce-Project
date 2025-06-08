import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import Payment from "../components/Payment";
import { useSelector } from "react-redux";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const [showPayment, setShowPayment] = useState(false);
  const loadingCart = new Array(4).fill(null);
  const buyerId = useSelector((state) => state.user.user?._id);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 flex items-center justify-center p-6 overflow-auto z-20">
      <div className="w-full max-w-7xl backdrop-blur-md bg-white/70 rounded-2xl shadow-2xl p-8 flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Your Cart
          </h1>

          {data.length === 0 && !loading && (
            <p className="text-center text-gray-600 bg-white rounded-xl shadow p-8">
              No Data
            </p>
          )}

          {loading
            ? loadingCart.map((_, idx) => (
                <div
                  key={`loading-cart-${idx}`}
                  className="h-32 bg-slate-200 rounded mb-4 animate-pulse border border-slate-300"
                />
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="bg-white rounded-lg shadow p-4 mb-4 grid grid-cols-[128px,1fr] gap-6 items-center border border-gray-200"
                >
                  <div className="w-32 h-32 bg-slate-200 rounded overflow-hidden">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => deleteCartProduct(product?._id)}
                      className="absolute top-0 right-0 p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition"
                      aria-label="Delete product"
                    >
                      <MdDelete size={20} />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800 truncate">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-gray-500 mb-2">
                      {product?.productId?.category}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-red-600 font-semibold text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-gray-700 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          decraseQty(product?._id, product?.quantity)
                        }
                        className="w-8 h-8 rounded border border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center font-bold transition"
                      >
                        -
                      </button>
                      <span className="text-gray-700 font-medium">
                        {product?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="w-8 h-8 rounded border border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <aside className="w-full max-w-sm bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl p-8 flex flex-col">
          {loading ? (
            <div className="h-36 bg-gray-200 rounded-2xl animate-pulse" />
          ) : (
            <>
              <h2 className="text-gray-900 font-extrabold text-2xl mb-8 text-center tracking-wide">
                Summary
              </h2>
              <div className="flex justify-between text-gray-700 font-semibold text-lg mb-5">
                <span>Quantity</span>
                <span>{totalQty}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-semibold text-lg mb-10 border-b border-gray-300 pb-5">
                <span>Total Price</span>
                <span>{displayINRCurrency(totalPrice)}</span>
              </div>
              <button
                onClick={() => setShowPayment(true)}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-pink-400/50"
                aria-label="Proceed to payment"
              >
                Proceed to Payment
              </button>

              {showPayment && (
                <Payment
                  amount={totalPrice} // raw number in rupees
                  buyerId={buyerId} // seller’s user ID
                  onClose={() => setShowPayment(false)}
                />
              )}
            </>
          )}
        </aside>
      </div>
    </section>
  );
};

export default Cart;

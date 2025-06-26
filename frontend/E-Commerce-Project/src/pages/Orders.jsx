import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.user?._id);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();

      if (result.success) {
        setOrders(result.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 p-6 flex justify-center items-start overflow-auto">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Your Orders
        </h1>

        {loading ? (
          <div className="space-y-4">
            {Array(4)
              .fill(null)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="h-40 bg-slate-200 rounded-2xl animate-pulse"
                />
              ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 bg-white rounded-xl shadow p-8">
            You have no past orders.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6 border border-gray-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <span className="px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600">
                  {order.status}
                </span>
              </div>

              {order.products.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item?.productId?.productImage[0]}
                    alt={item?.productId?.productName}
                    className="w-20 h-20 object-contain rounded bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item?.productId?.productName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-1 capitalize">
                      {item?.productId?.category}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Qty: {item.quantity}</span>
                      <span>
                        Price:{" "}
                        {displayINRCurrency(
                          item.quantity * item?.productId?.sellingPrice
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right font-bold text-lg text-gray-800 mt-4">
                Total:{" "}
                {displayINRCurrency(
                  order.products.reduce(
                    (total, p) =>
                      total + p.quantity * p?.productId?.sellingPrice,
                    0
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Orders;

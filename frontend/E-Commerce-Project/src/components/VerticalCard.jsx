import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(8).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 justify-center max-w-7xl mx-auto px-6">
      {loading
        ? loadingList.map((_, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg animate-pulse flex flex-col"
            >
              <div className="h-48 rounded-t-2xl bg-rose-200"></div>
              <div className="p-4 space-y-3 flex flex-col flex-grow">
                <div className="h-6 rounded bg-rose-200 w-full"></div>
                <div className="h-5 rounded bg-rose-100 w-1/2"></div>
                <div className="flex gap-3">
                  <div className="h-6 rounded bg-rose-200 flex-1"></div>
                  <div className="h-6 rounded bg-rose-100 flex-1"></div>
                </div>
                <div className="h-10 rounded bg-rose-200"></div>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              onClick={scrollTop}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col max-w-[300px] mx-auto"
            >
              <div className="h-48 rounded-t-2xl bg-rose-50 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.productName}
                </h2>
                <p className="capitalize text-rose-600 text-sm mb-2">
                  {product.category}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-rose-600 font-semibold text-lg">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-gray-400 line-through">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button
                  onClick={(e) => handleAddToCart(e, product._id)}
                  className="mt-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full py-2 text-sm font-semibold shadow transition transform hover:scale-[1.02]"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;

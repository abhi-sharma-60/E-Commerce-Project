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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-center max-w-7xl mx-auto px-6">
      {loading
        ? loadingList.map((_, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-soft animate-pulse flex flex-col border border-neutral-200/50 dark:border-neutral-700/50"
            >
              <div className="h-48 rounded-t-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
              <div className="p-6 space-y-4 flex flex-col flex-grow">
                <div className="h-6 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 w-full"></div>
                <div className="h-5 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 w-1/2"></div>
                <div className="flex gap-3">
                  <div className="h-6 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 flex-1"></div>
                  <div className="h-6 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 flex-1"></div>
                </div>
                <div className="h-12 rounded-xl bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600"></div>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              onClick={scrollTop}
              className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 flex flex-col max-w-[300px] mx-auto border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 group animate-slide-up hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 rounded-t-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center p-4 overflow-hidden relative">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-400 to-accent-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-medium">
                  New
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 truncate mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {product.productName}
                </h2>
                <p className="capitalize text-primary-600 dark:text-primary-400 text-sm mb-4 font-medium">
                  {product.category}
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <p className="text-primary-600 dark:text-primary-400 font-bold text-xl">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-neutral-400 dark:text-neutral-500 line-through text-sm">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button
                  onClick={(e) => handleAddToCart(e, product._id)}
                  className="mt-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl py-3 text-sm font-bold shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
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
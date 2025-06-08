import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);

  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-6 my-8 relative max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-rose-500 inline-block pb-2">
        {heading}
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute top-1/2 -left-4 transform -translate-y-1/2 items-center justify-center bg-white shadow-lg rounded-full w-10 h-10 text-rose-600 hover:bg-rose-50 transition"
        aria-label="Scroll Left"
      >
        <FaAngleLeft size={20} />
      </button>
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 items-center justify-center bg-white shadow-lg rounded-full w-10 h-10 text-rose-600 hover:bg-rose-50 transition"
        aria-label="Scroll Right"
      >
        <FaAngleRight size={20} />
      </button>

      {/* Cards Container */}
      <div
        ref={scrollElement}
        className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-rose-400 scrollbar-track-gray-100 py-2 scroll-smooth"
      >
        {loading
          ? loadingList.map((_, i) => (
              <div
                key={i}
                className="w-[300px] flex-shrink-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg animate-pulse"
              >
                <div className="h-48 bg-rose-200 rounded-t-2xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 rounded bg-rose-200"></div>
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
                className="w-[300px] flex-shrink-0 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
              >
                <div className="h-48 rounded-t-2xl overflow-hidden bg-rose-50 flex items-center justify-center p-4">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.productName}
                  </h3>
                  <p className="capitalize text-sm text-rose-600 mb-2">
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
    </div>
  );
};

export default VerticalCardProduct;

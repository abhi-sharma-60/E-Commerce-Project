import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
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
    scrollElement.current.scrollBy({ left: 320, behavior: "smooth" });
  };
  const scrollLeft = () => {
    scrollElement.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-6 my-10 relative max-w-7xl">
      <h2 className="text-3xl font-extrabold text-rose-700 mb-6 border-b-4 border-gradient-to-r from-pink-500 via-rose-600 to-pink-500 inline-block pb-2">
        {heading}
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll Left"
        className="hidden md:flex absolute top-1/2 -left-6 transform -translate-y-1/2 items-center justify-center bg-gradient-to-r from-pink-500 to-rose-600 shadow-2xl rounded-full w-12 h-12 text-white hover:brightness-110 transition"
      >
        <FaAngleLeft size={22} />
      </button>
      <button
        onClick={scrollRight}
        aria-label="Scroll Right"
        className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 items-center justify-center bg-gradient-to-r from-pink-500 to-rose-600 shadow-2xl rounded-full w-12 h-12 text-white hover:brightness-110 transition"
      >
        <FaAngleRight size={22} />
      </button>

      {/* Cards Container */}
      <div
        ref={scrollElement}
        className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-rose-400 scrollbar-track-pink-100 py-2 scroll-smooth"
      >
        {loading
          ? loadingList.map((_, i) => (
              <div
                key={i}
                className="w-[300px] flex-shrink-0 rounded-3xl bg-pink-50 shadow-2xl animate-pulse"
              >
                <div className="h-40 bg-rose-200 rounded-t-3xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 rounded bg-rose-300"></div>
                  <div className="h-4 rounded bg-rose-100 w-1/2"></div>
                  <div className="flex gap-3">
                    <div className="h-5 rounded bg-rose-300 flex-1"></div>
                    <div className="h-5 rounded bg-rose-100 flex-1"></div>
                  </div>
                  <div className="h-10 rounded bg-rose-300"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="w-[300px] flex-shrink-0 rounded-3xl bg-white shadow-2xl hover:shadow-rose-400/50 transition-shadow flex flex-col"
              >
                <div className="h-40 rounded-t-3xl overflow-hidden bg-pink-50 flex items-center justify-center p-4">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="max-h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-extrabold text-rose-700 truncate">
                    {product.productName}
                  </h3>
                  <p className="capitalize text-sm text-rose-500 mb-2">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-3 mb-5">
                    <p className="text-pink-600 font-semibold text-lg">
                      {displayINRCurrency(product.sellingPrice)}
                    </p>
                    <p className="text-rose-300 line-through">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className="mt-auto bg-gradient-to-r from-pink-500 to-rose-600 hover:brightness-110 text-white rounded-full py-3 text-sm font-semibold transition"
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

export default HorizontalCardProduct;

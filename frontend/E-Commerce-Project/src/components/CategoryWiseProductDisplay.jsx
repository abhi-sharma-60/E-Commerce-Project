import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);

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
    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-6 my-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">{heading}</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 py-2">
        {loading
          ? loadingList.map((_, i) => (
              <div
                key={i}
                className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow-md p-5 animate-pulse flex flex-col gap-4"
              >
                <div className="h-48 bg-gray-200 rounded-md"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                <div className="flex gap-4">
                  <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-full"></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product?._id}
                to={"/product/" + product?._id}
                onClick={scrollTop}
                className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow-lg p-5 flex flex-col gap-4 transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300"
              >
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 truncate">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category}
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-red-600 font-semibold">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-gray-400 line-through">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button
                  onClick={(e) => handleAddToCart(e, product?._id)}
                  className="mt-auto bg-red-600 text-white text-sm py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  Add to Cart
                </button>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;

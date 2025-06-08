import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-6  justify-between overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                key={"categoryLoading" + index}
                className="h-20 w-20 rounded-full bg-slate-200 animate-pulse shrink-0"
              ></div>
            ))
          : categoryProduct.map((product) => (
              <Link
                to={"/product-category?category=" + product?.category}
                key={product?.category}
                className="flex  flex-col items-center flex-shrink-0 cursor-pointer transition-transform hover:scale-110"
              >
                <div className="w-20 h-20 rounded-full p-3 bg-white shadow-md flex items-center justify-center overflow-hidden border-2 border-pink-500">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-contain transition-transform duration-300 ease-in-out hover:scale-125"
                    loading="lazy"
                  />
                </div>

                <p className="mt-2 text-center text-sm md:text-base capitalize font-medium text-gray-700">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;

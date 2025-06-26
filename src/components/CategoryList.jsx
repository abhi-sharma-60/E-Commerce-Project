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
      <div className="flex items-center gap-8 justify-between overflow-x-auto scrollbar-thin scrollbar-thumb-primary-300 dark:scrollbar-thumb-primary-600 scrollbar-track-neutral-100 dark:scrollbar-track-neutral-800 pb-4">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                key={"categoryLoading" + index}
                className="h-24 w-24 rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 animate-pulse shrink-0 shadow-soft"
              ></div>
            ))
          : categoryProduct.map((product, index) => (
              <Link
                to={"/product-category?category=" + product?.category}
                key={product?.category}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-110 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 rounded-2xl p-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-soft hover:shadow-strong flex items-center justify-center overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 group-hover:border-primary-300 dark:group-hover:border-primary-600 transition-all duration-300">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <p className="mt-3 text-center text-sm md:text-base capitalize font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
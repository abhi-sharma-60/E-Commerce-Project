import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse.data || []);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <section className="h-screen mt-10 w-full bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 fixed top-0 left-0 flex items-center justify-center p-4 overflow-hidden z-10">
      <div className="w-full  h-full max-w-7xl backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-6 md:p-10 flex flex-col">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Search Results
        </h2>

        {/* Total Products or Loading */}
        {loading ? (
          <p className="text-lg text-center text-gray-600">Loading...</p>
        ) : (
          <p className="text-lg font-medium text-center text-gray-700 mb-2">
            Total Products Found: {data.length}
          </p>
        )}

        {/* No Results */}
        {!loading && data.length === 0 && (
          <p className="text-lg text-center text-gray-600 bg-white p-6 rounded-xl shadow">
            No products found.
          </p>
        )}

        {/* Scrollable Results */}
        {!loading && data.length !== 0 && (
          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            <VerticalCard data={data} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchProduct;

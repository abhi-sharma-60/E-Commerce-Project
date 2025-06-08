import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 p-4">
      <div className="w-full  bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
          <button
            className="py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:scale-105 transition-transform"
            onClick={() => setOpenUploadProduct(true)}
          >
            Upload Product
          </button>
        </div>

        <div className="grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[calc(100vh-230px)]">
          {allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + 'allProduct'}
              fetchdata={fetchAllProduct}
            />
          ))}
        </div>
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </section>
  );
};

export default AllProducts;

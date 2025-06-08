import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
      <div className="w-36 h-36 mb-4 flex justify-center items-center rounded-lg overflow-hidden border border-gray-200">
        <img
          src={data?.productImage[0]}
          alt={data.productName}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 text-center line-clamp-2 mb-3">
        {data.productName}
      </h2>

      <p className="text-lg font-bold text-red-600 mb-6">
        {displayINRCurrency(data.sellingPrice)}
      </p>

      <button
        onClick={() => setEditProduct(true)}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200"
        aria-label="Edit product"
      >
        <MdModeEditOutline size={22} />
        <span>Edit Product</span>
      </button>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;

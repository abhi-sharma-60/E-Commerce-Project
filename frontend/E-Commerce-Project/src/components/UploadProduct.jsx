import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData();
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Upload Product</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-600"
            aria-label="Close"
          >
            <CgClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-4 space-y-4 flex-1"
        >
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block mb-1 font-semibold text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              placeholder="Enter product name"
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Brand Name */}
          <div>
            <label
              htmlFor="brandName"
              className="block mb-1 font-semibold text-gray-700"
            >
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              placeholder="Enter brand name"
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block mb-1 font-semibold text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="">Select a category</option>
              {productCategory.map((el, idx) => (
                <option value={el.value} key={el.value + idx}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div>
            <label
              htmlFor="uploadImageInput"
              className="block mb-1 font-semibold text-gray-700"
            >
              Product Image
            </label>
            <label
              htmlFor="uploadImageInput"
              className="cursor-pointer"
              aria-label="Upload product image"
            >
              <div className="flex flex-col items-center justify-center h-32 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                <FaCloudUploadAlt className="text-4xl text-gray-500" />
                <p className="text-sm text-gray-500">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  accept="image/*"
                />
              </div>
            </label>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.productImage.length > 0 ? (
                data.productImage.map((el, index) => (
                  <div
                    key={index}
                    className="relative group w-20 h-20 rounded-md overflow-hidden border border-gray-300 cursor-pointer"
                  >
                    <img
                      src={el}
                      alt={`product-${index}`}
                      className="w-full h-full object-cover"
                      onClick={() => {
                        setFullScreenImage(el);
                        setOpenFullScreenImage(true);
                      }}
                    />
                    <div
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-red-600">
                  *Please upload product image
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block mb-1 font-semibold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              placeholder="Enter price"
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              min={0}
            />
          </div>

          {/* Selling Price */}
          <div>
            <label
              htmlFor="sellingPrice"
              className="block mb-1 font-semibold text-gray-700"
            >
              Selling Price
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnChange}
              placeholder="Enter selling price"
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              min={0}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-1 font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={data.description}
              onChange={handleOnChange}
              placeholder="Enter product description"
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg shadow hover:from-rose-600 hover:to-pink-600 transition-all"
            >
              Upload Product
            </button>
          </div>
        </form>

        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;

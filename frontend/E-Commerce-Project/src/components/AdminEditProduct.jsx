import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productImage: productData?.productImage || [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
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
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90%] overflow-hidden border border-pink-200">
        <div className="flex justify-between items-center p-4 border-b border-pink-200">
          <h2 className="text-2xl font-extrabold text-rose-600">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 hover:text-red-500"
          >
            <IoCloseSharp />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto h-[80vh] px-6 py-4 space-y-4"
        >
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              placeholder="Enter Product Name"
              className="w-full p-2 rounded-lg bg-pink-50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              placeholder="Enter Brand Name"
              className="w-full p-2 rounded-lg bg-pink-50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="w-full p-2 rounded-lg bg-pink-50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            >
              <option value="">Select a Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Product Image
            </label>
            <label htmlFor="uploadImageInput" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center h-32 bg-pink-50 border border-pink-200 rounded-lg">
                <MdCloudUpload className="text-4xl text-rose-400" />
                <p className="text-sm text-rose-500">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.productImage.length > 0 ? (
                data.productImage.map((el, index) => (
                  <div key={index} className="relative group w-20 h-20">
                    <img
                      src={el}
                      alt="product"
                      className="w-full h-full object-cover rounded-md border cursor-pointer"
                      onClick={() => {
                        setFullScreenImage(el);
                        setOpenFullScreenImage(true);
                      }}
                    />
                    <div
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hidden group-hover:block cursor-pointer"
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

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              placeholder="Enter Price"
              className="w-full p-2 rounded-lg bg-pink-50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Selling Price
            </label>
            <input
              type="number"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnChange}
              placeholder="Enter Selling Price"
              className="w-full p-2 rounded-lg bg-pink-50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              placeholder="Enter Product Description"
              rows={4}
              className="w-full p-2 rounded-lg bg-pink-50 border border-pink-200 resize-none focus:outline-none focus:ring-2 focus:ring-rose-400"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg shadow hover:from-rose-600 hover:to-pink-600 transition-all"
            >
              Update Product
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

export default AdminEditProduct;

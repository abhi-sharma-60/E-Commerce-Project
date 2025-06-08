import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: params?.id }),
    });
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => setActiveImage(imageURL);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    setZoomImageCoordinate({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <section className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 flex items-center justify-center p-6 overflow-auto z-10">
      <div className="w-full max-w-7xl backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12">
        {/* Left: Product Image and Thumbnails */}
        <div className="flex flex-col w-full md:w-1/2 relative">
          <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center rounded-xl overflow-hidden shadow-inner">
            <img
              src={activeImage}
              alt="product"
              className="h-full w-full object-contain"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute right-[-520px] top-0 w-[500px] h-[400px] bg-white border shadow-xl z-20 overflow-hidden rounded-xl">
                <div
                  className="w-full h-full bg-no-repeat bg-contain scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-5 overflow-x-auto">
            {data.productImage.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumbnail"
                className={`h-24 w-24 object-contain border rounded-lg cursor-pointer transition-shadow duration-200 ${
                  img === activeImage
                    ? "border-rose-600 shadow-md"
                    : "border-gray-300"
                }`}
                onMouseEnter={() => handleMouseEnterProduct(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col w-full md:w-1/2 justify-between">
          <div>
            <span className="inline-block px-4 py-1 bg-rose-100 text-rose-600 text-sm rounded-full font-semibold mb-4">
              {data.brandName}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {data.productName}
            </h1>
            <p className="text-gray-600 capitalize mb-4">{data.category}</p>

            <div className="flex items-center gap-2 text-rose-600 mb-5 text-xl">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-4 text-3xl font-semibold text-rose-700 mb-8">
              <p>{displayINRCurrency(data.sellingPrice)}</p>
              <p className="line-through text-gray-400 text-xl">
                {displayINRCurrency(data.price)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-6">
            <button
              onClick={(e) => handleBuyProduct(e, data?._id)}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg py-3 font-semibold transition-colors duration-300"
            >
              Buy Now
            </button>
            <button
              onClick={(e) => handleAddToCart(e, data?._id)}
              className="flex-1 border border-rose-600 text-rose-600 rounded-lg py-3 font-semibold hover:bg-rose-600 hover:text-white transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {data.category && (
        <div className="w-full max-w-7xl mt-12">
          <CategoryWiseProductDisplay
            category={data?.category}
            heading="Recommended Products"
          />
        </div>
      )}
    </section>
  );
};

export default ProductDetails;

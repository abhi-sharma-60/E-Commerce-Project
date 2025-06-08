import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ category: filterCategoryList }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
  }, [filterCategoryList]);

  useEffect(() => {
    const selected = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(selected);

    const urlFormat = selected.map((el, index) =>
      index === selected.length - 1 ? `category=${el}` : `category=${el}&&`
    );

    navigate("/product-category?" + urlFormat.join(""), { replace: true });
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    setData((prevData) => {
      const sortedData = [...prevData];
      if (value === "asc") {
        sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (value === "dsc") {
        sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }
      return sortedData;
    });
  };

  return (
    <div className=" w-full p-6 min-h-screen bg-rose-50">
      <div className="hidden lg:grid grid-cols-[260px_1fr] gap-8">
        {/* Sidebar: Filters + Sort */}
        <aside className="bg-white backdrop-blur-md rounded-2xl shadow-2xl p-6 sticky top-16 max-h-[calc(100vh-96px)] overflow-y-auto">
          {/* Sort By */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-slate-700 border-b border-pink-300 pb-2 mb-4 uppercase tracking-wide">
              Sort By
            </h3>
            <form className="flex flex-col gap-4 text-sm text-slate-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="asc"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  className="accent-pink-500 w-5 h-5"
                />
                Price - Low to High
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  className="accent-pink-500 w-5 h-5"
                />
                Price - High to Low
              </label>
            </form>
          </section>

          {/* Filter By Category */}
          <section>
            <h3 className="text-lg font-semibold text-slate-700 border-b border-pink-300 pb-2 mb-4 uppercase tracking-wide">
              Category
            </h3>
            <form className="flex flex-col gap-3 text-sm text-slate-700 max-h-[300px] overflow-y-auto px-4 py-3 shadow-md rounded-lg border border-slate-200 bg-white">
              {productCategory.map((cat) => (
                <label
                  key={cat.value}
                  htmlFor={cat.value}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id={cat.value}
                    name="category"
                    value={cat.value}
                    checked={selectCategory[cat.value] || false}
                    onChange={handleSelectCategory}
                    className="accent-pink-500 w-5 h-5 rounded"
                  />
                  {cat.label}
                </label>
              ))}
            </form>
          </section>
        </aside>

        {/* Main content: Products */}
        <main className="bg-white rounded-2xl shadow-2xl p-6 min-h-[calc(100vh-96px)] overflow-y-auto">
          <p className="text-gray-800 font-semibold text-xl mb-6">
            Search Results: {data.length}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {!loading && data.length > 0 ? (
              <VerticalCard data={data} loading={loading} />
            ) : loading ? (
              <p className="text-center text-pink-500">Loading...</p>
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryProduct;

import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* Categories and Banner */}
      <div className="container mx-auto p-6 space-y-8">
        {/* Category List */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <CategoryList />
        </section>

        {/* Banner */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <BannerProduct />
        </section>

        {/* Horizontal Cards (Specials) */}
        <section className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <HorizontalCardProduct
              category={"airpodes"}
              heading={"Top's Airpodes"}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <HorizontalCardProduct
              category={"watches"}
              heading={"Popular's Watches"}
            />
          </div>
        </section>

        {/* Vertical Cards (Categories) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct
              category={"televisions"}
              heading={"Televisions"}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct
              category={"camera"}
              heading={"Camera & Photography"}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct
              category={"earphones"}
              heading={"Wired Earphones"}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct
              category={"speakers"}
              heading={"Bluetooth Speakers"}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct
              category={"refrigerator"}
              heading={"Refrigerator"}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

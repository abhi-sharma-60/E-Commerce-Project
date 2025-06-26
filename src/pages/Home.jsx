import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 transition-colors duration-300">
      <div className="container mx-auto p-6 space-y-12">
        {/* Hero Section with Categories */}
        <section className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent mb-4 font-display">
              Discover Premium Electronics
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Explore our curated collection of cutting-edge digital products and electronics
            </p>
          </div>
          <CategoryList />
        </section>

        {/* Banner Section */}
        <section className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
          <BannerProduct />
        </section>

        {/* Featured Products */}
        <section className="space-y-8">
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <HorizontalCardProduct
              category={"airpodes"}
              heading={"Premium Airpods Collection"}
            />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <HorizontalCardProduct
              category={"watches"}
              heading={"Smart Watches & Wearables"}
            />
          </div>
        </section>

        {/* Product Categories Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"mobiles"} heading={"Latest Smartphones"} />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"Mouse"} heading={"Gaming Mice"} />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"televisions"} heading={"Smart TVs"} />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"camera"} heading={"Photography Gear"} />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"earphones"} heading={"Audio Essentials"} />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"speakers"} heading={"Sound Systems"} />
          </div>
        </section>

        {/* Additional Categories */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"refrigerator"} heading={"Home Appliances"} />
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-200/50 dark:border-neutral-700/50 p-8 animate-slide-up">
            <VerticalCardProduct category={"trimmers"} heading={"Personal Care"} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
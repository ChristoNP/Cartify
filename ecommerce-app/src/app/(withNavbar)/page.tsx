'use client'
import Link from "next/link";
import { ProductType } from "@/db/models/product";
import { useEffect, useState } from "react";
import FeaturedCard from "../../components/FeaturedCard";

export default function Landing() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error, '<<<<< Error landing page');
        throw new Error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 5);

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
      <header className="relative overflow-hidden bg-gray-100">
        <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center min-h-screen text-gray-800">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 text-center leading-tight max-w-4xl font-outfit">
            Elevate Your Lifestyle with <span className="text-[#4AC419] font-montserrat-alternates">Cartify</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 max-w-2xl text-center font-light font-outfit">
            Immerse yourself in a selection of expertly chosen items meant to upgrade your shopping and lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 font-outfit w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-gray-100 text-gray-800 hover:shadow-inner transition-shadow duration-300 font-semibold py-3 px-8 rounded-full text-base sm:text-lg shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] text-center"
            >
              Explore Collection
            </Link>
            <Link
              href="#info"
              className="w-full sm:w-auto bg-gray-100 text-gray-800 hover:shadow-inner transition-shadow duration-300 font-semibold py-3 px-8 rounded-full text-base sm:text-lg shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] text-center"
            >
              Why Choose Us
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 sm:py-24 bg-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-16 text-gray-800 font-outfit">
            <span className="bg-clip-text text-[#4AC419]">
              Featured Items
            </span>
          </h2>
          <div className="relative font-outfit">
            <div className="overflow-hidden">
              <div className="flex animate-carousel">
                {featuredProducts.map((product, index) => (
                  <FeaturedCard key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-16 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 text-gray-800 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-inner transition-shadow duration-300 focus:outline-none"
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <span className="text-xs sm:text-sm font-medium transition-all group-hover:me-4">
              Explore All Products
            </span>
          </Link>
        </div>
      </section>

      <section id="info" className="py-12 sm:py-16 bg-gray-100 font-outfit">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Wide Product Range", icon: "🛍️" },
              { title: "Fast & Free Shipping", icon: "🚚" },
              { title: "24/7 Customer Support", icon: "🎧" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-gray-100 rounded-2xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">Experience the best in online shopping with our extensive selection, convenient delivery options, and round-the-clock customer assistance.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

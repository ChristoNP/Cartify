"use client"
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/db/models/product";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const fetchProducts = async (pageNum: number, query: string = "") => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${pageNum}&limit=9&query=${query}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data: ProductType[] = await response.json();
            if (data.length < 9) {
                setHasMore(false);
            }
            return data;
        } catch (error) {
            console.log(error, '<<<<< Error products page');
            throw new Error('Failed to fetch products');
        }
    };

    useEffect(() => {
        const loadInitialProducts = async () => {
            const initialProducts = await fetchProducts(1, searchQuery);
            setProducts(initialProducts);
            setPage(1);
            setHasMore(initialProducts.length === 9);
        };
        loadInitialProducts();
    }, [searchQuery]);

    const loadMoreProducts = async () => {
        const nextPage = page + 1;
        const newProducts = await fetchProducts(nextPage, searchQuery);
        setProducts((prevProducts) => {
            const filteredNewProducts = newProducts.filter((product) => !prevProducts.some((prevProduct) => prevProduct.slug === product.slug));
            return [...prevProducts, ...filteredNewProducts];
        });
        setPage(nextPage);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

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
            <div className="bg-gray-100 flex flex-col md:flex-row">

                <aside className="font-outfit flex flex-col w-full md:w-72 h-auto md:h-screen px-4 py-8 overflow-y-auto bg-gray-100 border-b md:border-r border-gray-200 sticky top-0">
                    <div className="relative mt-6">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] placeholder-gray-400::placeholder"
                            placeholder="Search products"
                        />
                    </div>
                    <div className="flex flex-col flex-1 mt-8">
                        <nav>
                            <hr className="my-3 border-gray-200" />
                            <div className="relative">
                                <button
                                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                                    className="flex items-center w-full px-4 py-2 text-gray-700 transition-colors duration-300 transform rounded-full hover:bg-gray-200 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]"
                                >
                                    <Image
                                        className="object-cover mx-2 rounded-full h-9 w-9 border-2 border-gray-200"
                                        src="/bart.png"
                                        width={400}
                                        height={400}
                                        alt="avatar"
                                    />
                                    <span className="mx-2 font-medium">
                                        Bart Simpson
                                    </span>
                                    <svg
                                        className={`w-4 h-4 ml-auto transition-transform duration-200 ${isAccountOpen ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isAccountOpen && (
                                    <div className="absolute left-0 w-full mt-2 origin-top-right rounded-md shadow-lg">
                                        <div className="px-2 py-2 bg-gray-100 rounded-md shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
                                            <Link className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-transparent rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-200 transition-colors duration-300"
                                                href="/wishlist">
                                                Wishlist
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </aside>

                <div className="flex flex-col w-full bg-gray-100">
                    <InfiniteScroll
                        dataLength={products.length}
                        next={loadMoreProducts}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center items-center p-4 mb-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
                            </div>
                        }
                        endMessage={<p className="text-center text-gray-400 p-5 font-outfit text-2xl tracking-wide font-bold">You&apos;ve seen it all!</p>}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                            {products.map((product) => (
                                <ProductCard key={product.slug} product={product} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}
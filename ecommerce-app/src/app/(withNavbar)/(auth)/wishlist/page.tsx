"use client"
import { useEffect, useState } from "react";
import WishlistCard from "../../../../components/WishlistCard";
import { WishlistId, WishlistType } from "@/db/models/wishlist";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishlistId[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: WishlistId[] = await response.json();
                setWishlistItems(data);
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                setIsLoading(false);
            }
        }
        fetchWishlist()
    }, [])

    const handleRemove =  (_id: string) => {
        const updatedWishlist = wishlistItems.filter((item) => item._id.toString() !== _id);
        setWishlistItems(updatedWishlist);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#4AC419]"></div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-200 bg-opacity-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-outfit">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-[#4AC419] mb-8 text-center">Your Wishlist</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        wishlistItems.length > 0 ? (
                            wishlistItems.map((product, index) => (
                                <WishlistCard key={index} product={product} onRemove={handleRemove} />
                        ))
                    ) : (
                        <p className="text-xl text-gray-600 font-semibold text-center col-span-full">Your wishlist is empty.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
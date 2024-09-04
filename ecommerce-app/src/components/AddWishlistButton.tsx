"use client"
import { ProductType } from "@/db/models/product"
import Swal from "sweetalert2"

type Props = {
    product: ProductType
}

export default function AddWishlistButton({ product }: Props) {
    const handleAddToWishlist = async (productId: string) => {
        const form = {
            productId,
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                const errorBody = await response.json() as { message: string }
                throw new Error(errorBody.message)
            }
            const responseBody = await response.json()
            Swal.fire({
                title: 'Yay!',
                text: responseBody.message,
                icon: 'success',
                confirmButtonText: 'OK',
            })
        } catch (error: any) {
            Swal.fire({
                title: 'Whoops!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    }
    return (
        <button 
            onClick={(e) => {
                e.preventDefault()
                handleAddToWishlist(product._id.toString())
            }}
            title="Add to Wishlist"
            className="text-gray-600 hover:text-red-500 transition-colors duration-300 focus:outline-none active:text-red-500"
            aria-label="Add to Wishlist"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    )
}
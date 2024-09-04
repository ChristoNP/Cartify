import Link from "next/link";
import { ProductType } from "@/db/models/product"
import { currencyFormat } from "@/helpers/currencyFormat";
import AddWishlistButton from "./AddWishlistButton";
import Image from "next/image";

type ProductCardProps = {
    product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="w-full font-outfit max-w-sm mx-auto bg-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] border border-gray-200">
            <Link href={`/products/${product.slug}`} className="block relative">
                <div className="relative overflow-hidden">
                    <Image 
                        src={product.thumbnail} 
                        width={400}
                        height={400}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">View Details</span>
                    </div>
                </div>
            </Link>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3 truncate">
                    {product.slug}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-extrabold text-[#4AC419]">{currencyFormat(product.price)}</span>
                    <AddWishlistButton product={product} />
                </div>
                
            </div>
        </div>
    )
}
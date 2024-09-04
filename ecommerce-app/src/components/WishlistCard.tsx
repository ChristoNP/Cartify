import { WishlistId, WishlistType } from "@/db/models/wishlist";
import { currencyFormat } from "@/helpers/currencyFormat";
import DeleteWishlist from "./DeleteWishlist";
import Image from "next/image";

type Props = {
    product: WishlistId,
    onRemove: (_id: string) => void
}

export default function WishlistCard({product, onRemove}: Props) {  
    return (
        <div className="bg-white rounded-2xl shadow-[5px_5px_15px_#d9d9d9,-5px_-5px_15px_#ffffff] overflow-hidden transition-all duration-300 hover:shadow-[inset_5px_5px_15px_#d9d9d9,inset_-5px_-5px_15px_#ffffff]">
            <Image 
                src={product.product.thumbnail} 
                alt="Product" 
                width={400}
                height={400}
                className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.product.name}</h2>
                <p className="text-[#4AC419] font-bold mb-4">{currencyFormat(product.product.price)}</p>
                <div className="flex justify-between items-center">
                    <button className="bg-white text-[#4AC419] px-6 py-3 border-2 border-[#4AC419] rounded-full shadow-[3px_3px_6px_#d9d9d9,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d9d9d9,inset_-3px_-3px_6px_#ffffff] transition-all duration-300">
                        Add to Cart
                    </button>
                    <DeleteWishlist product={product} onRemove={onRemove}/>
                </div>
            </div>
        </div>
    )
}
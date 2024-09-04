import { ProductType } from "@/db/models/product";
import { currencyFormat } from "@/helpers/currencyFormat";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({ product }: {product: ProductType}) {
    return (
        <div key={`${product.slug}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex-shrink-0 px-4 mb-8">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <Image src={product.thumbnail} alt={product.name} width={400} height={400} className="w-full h-48 object-cover rounded-t-3xl" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{currencyFormat(product.price)}</p>
                    <Link href='/wishlist' className="bg-[#4AC419] text-white px-3 py-1 rounded-full hover:bg-[#3DA114] transition duration-300 text-sm">
                        Add to Wishlist
                    </Link>
                </div>
            </div>
        </div>
    )
}
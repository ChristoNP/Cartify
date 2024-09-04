import { ProductType } from "@/db/models/product";
import { currencyFormat } from "@/helpers/currencyFormat";
import { ResolvingMetadata } from "next";
import AddWishlistButton from "@/components/AddWishlistButton";
import Image from "next/image";

type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata) {
    const data = await getProductBySlug(props.params.slug)
    const parentTitle = (await parent).title?.absolute
    return {
        title: parentTitle + " - " + data?.slug,
        openGraph: {
            images: [data?.thumbnail]
        }
    }
}
async function getProductBySlug(slug: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)        
        if (!response.ok) {
            throw new Error(`Response failed with status ${response.status}`)
        }
        const data = await response.json() as ProductType
        return data
    } catch (error) {
        console.log(error)
    }
}

export default async function ProductDetail(props: Props) {
    const data = await getProductBySlug(props.params.slug)
    return (
        <div className="w-screen h-[40rem] p-10 mt-5">
            <div className="flex justify-center gap-x-4">
                <div className="h-[10rem] w-[10rem] flex flex-wrap justify-center items-center">
                    {
                        data?.images.map((image, index) => {
                            return (
                                <div key={index} className="flex h-[7rem] w-[7rem] justify-center items-center rounded-md">
                                    <Image className="h-[5rem] w-[5rem] object-cover rounded-lg"
                                        width={400}
                                        height={400}
                                        src={image} alt={`product-detail-${index}`} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="h-[35rem] w-[35rem] flex justify-center items-center rounded-md">
                    <Image width={400} height={400} className="h-[35rem] w-[35rem] object-cover rounded-lg" src={data?.thumbnail as string} alt="product-detail" />
                </div>



                <div className="h-[37rem] w-[18rem] rounded-md">
                    <div className="ml-2">
                        <h1 className="font-outfit font-bold text-3xl tracking-normal">
                            {data?.name}
                        </h1>
                        <h3 className="font-outfit text-gray-500 font-normal text-xl tracking-normal">
                            {data?.slug}
                        </h3>
                        <div className="mt-8 flex justify-between items-center">
                            <h3 className="font-outfit font-semibold text-2xl text-black">
                                {currencyFormat(data?.price)}
                            </h3>
                            <AddWishlistButton product={data as ProductType} />
                        </div>
                        <p className="font-outfit max-h-[20rem] overflow-y-auto font-normal text-md text-justify tracking-normal mt-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
                            {data?.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
import { Product } from '@/db/models/product'

type SecondParam = {
    params: {
        slug: string
    }
}

// GET /api/products/[slug]
export async function GET(request: Request, { params }: SecondParam) {
    try {
        const product = await Product.findOne({ slug: params.slug });
        if (!product) {
            return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}

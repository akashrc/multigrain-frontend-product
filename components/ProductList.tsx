"use client";

import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      imageUrl
      weight
      stock
    }
  }
`;

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    weight: string;
    stock: number;
}

export default function ProductList() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-500 py-4">
            <p>Error loading products: {error.message}</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

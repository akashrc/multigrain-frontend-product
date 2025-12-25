import React from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    weight?: string;
    stock?: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        const event = new CustomEvent('add-to-cart', {
            detail: { ...product, quantity: 1 }
        });
        window.dispatchEvent(event);
        // Simple visual feedback
        const btn = document.getElementById(`btn-${product.id}`);
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Added!";
            btn.classList.add('bg-green-600');
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-green-600');
            }, 1000);
        }
    };

    return (
        <div className="border rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 p-4 bg-white flex flex-col h-full group">
            <div className="h-48 w-full relative mb-4 bg-gray-50 rounded-md overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>

            <div className="mt-auto">
                <div className="flex justify-between items-center mb-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{product.weight || '1kg'}</span>
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                </div>
                <button
                    id={`btn-${product.id}`}
                    onClick={handleAddToCart}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors shadow-sm"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

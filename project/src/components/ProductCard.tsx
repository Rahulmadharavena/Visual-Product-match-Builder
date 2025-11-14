import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          {product.similarity_score !== undefined && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">
              {product.similarity_score.toFixed(0)}% match
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        {product.description && (
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}
        {product.price && (
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

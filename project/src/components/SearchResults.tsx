import { useState, useMemo } from 'react';
import { Product } from '../lib/supabase';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

interface SearchResultsProps {
  searchImageUrl: string;
  products: Product[];
  onReset: () => void;
}

export function SearchResults({ searchImageUrl, products, onReset }: SearchResultsProps) {
  const [minSimilarity, setMinSimilarity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSimilarity = (product.similarity_score || 0) >= minSimilarity;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSimilarity && matchesCategory;
    });
  }, [products, minSimilarity, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <img
                src={searchImageUrl}
                alt="Search query"
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Your Search</h3>
                <button
                  onClick={onReset}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  New Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Similarity: {minSimilarity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minSimilarity}
                    onChange={(e) => setMinSimilarity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} results
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">
                  No products match your current filters
                </p>
                <button
                  onClick={() => {
                    setMinSimilarity(0);
                    setSelectedCategory('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

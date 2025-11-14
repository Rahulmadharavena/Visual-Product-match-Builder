import { useState } from 'react';
import { Search, Database } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { SearchResults } from './components/SearchResults';
import { supabase, Product } from './lib/supabase';
import { extractImageFeatures, calculateSimilarity } from './utils/imageAnalysis';

type AppState = 'idle' | 'searching' | 'results';

function App() {
  const [state, setState] = useState<AppState>('idle');
  const [searchImageUrl, setSearchImageUrl] = useState<string>('');
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelected = async (imageUrl: string) => {
    setIsLoading(true);
    setError('');
    setSearchImageUrl(imageUrl);

    try {
      const { data: products, error: fetchError } = await supabase
        .from('products')
        .select('*');

      if (fetchError) throw fetchError;

      if (!products || products.length === 0) {
        setError('No products in database. Please add some products first.');
        setIsLoading(false);
        return;
      }

      setState('searching');

      const searchFeatures = await extractImageFeatures(imageUrl);

      const productsWithSimilarity = await Promise.all(
        products.map(async (product) => {
          try {
            const productFeatures = await extractImageFeatures(product.image_url);
            const similarity = calculateSimilarity(searchFeatures, productFeatures);

            return {
              ...product,
              similarity_score: similarity
            };
          } catch (err) {
            console.error(`Failed to process product ${product.id}:`, err);
            return {
              ...product,
              similarity_score: 0
            };
          }
        })
      );

      const sortedProducts = productsWithSimilarity
        .sort((a, b) => (b.similarity_score || 0) - (a.similarity_score || 0))
        .filter(p => (p.similarity_score || 0) > 10);

      await supabase.from('search_history').insert({
        search_image_url: imageUrl,
        results_count: sortedProducts.length
      });

      setSimilarProducts(sortedProducts);
      setState('results');
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to search for similar products');
      setState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setState('idle');
    setSearchImageUrl('');
    setSimilarProducts([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Search className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Visual Product Matcher</h1>
          </div>
          <p className="mt-2 text-gray-600">Find similar products by uploading an image</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium text-gray-900">
                  {state === 'searching' ? 'Analyzing image...' : 'Loading...'}
                </p>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Finding visually similar products
                </p>
              </div>
            </div>
          </div>
        )}

        {state === 'idle' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Start Your Search
              </h2>
              <p className="text-gray-600">
                Upload an image or provide a URL to find similar products
              </p>
            </div>
            <ImageUpload onImageSelected={handleImageSelected} disabled={isLoading} />

            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">How It Works</h3>
              </div>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <span>Upload an image or provide an image URL</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <span>Our algorithm analyzes visual features like colors, brightness, and patterns</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <span>View similar products ranked by visual similarity</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </span>
                  <span>Filter results by similarity score and category</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {state === 'results' && (
          <SearchResults
            searchImageUrl={searchImageUrl}
            products={similarProducts}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Visual Product Matcher - Technical Assessment Project
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

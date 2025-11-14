import { useState } from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (imageUrl: string, file?: File) => void;
  disabled?: boolean;
}

export function ImageUpload({ onImageSelected, disabled }: ImageUploadProps) {
  const [mode, setMode] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onImageSelected(result, file);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    const img = new Image();
    img.onload = () => {
      onImageSelected(urlInput);
      setError('');
    };
    img.onerror = () => {
      setError('Failed to load image from URL');
    };
    img.crossOrigin = 'anonymous';
    img.src = urlInput;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('file')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'file'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={disabled}
        >
          <Upload className="inline-block w-4 h-4 mr-2" />
          Upload File
        </button>
        <button
          onClick={() => setMode('url')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'url'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={disabled}
        >
          <LinkIcon className="inline-block w-4 h-4 mr-2" />
          Image URL
        </button>
      </div>

      {mode === 'file' ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={disabled}
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer ${disabled ? 'opacity-50' : ''}`}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium text-gray-700 mb-1">
              Click to upload an image
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={disabled}
          />
          <button
            onClick={handleUrlSubmit}
            disabled={disabled || !urlInput.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load Image
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Sparkles, Copy, RotateCcw, AlertCircle } from 'lucide-react';

interface ContentOptimizerProps {
  content: string;
  optimizedContent: string;
  isOptimizing: boolean;
  error: string | null;
  onContentChange: (content: string) => void;
  onOptimize: () => void;
}

export function ContentOptimizer({
  content,
  optimizedContent,
  isOptimizing,
  error,
  onContentChange,
  onOptimize,
}: ContentOptimizerProps) {
  const maxLength = 3000;
  const currentLength = content.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 transition-colors duration-200">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4 dark:text-white">Original Content</h2>
          <textarea
            className="w-full h-48 sm:h-64 p-3 sm:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Paste your LinkedIn content here..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            maxLength={maxLength}
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>{currentLength} / {maxLength} characters</span>
            <button
              onClick={() => onContentChange('')}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <button
          onClick={onOptimize}
          disabled={!content || isOptimizing}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            !content || isOptimizing
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
        >
          <Sparkles className="h-5 w-5" />
          <span>{isOptimizing ? 'Optimizing...' : 'Optimize Content'}</span>
        </button>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4 flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 transition-colors duration-200">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Optimized Content</h2>
          {optimizedContent && (
            <button
              onClick={() => navigator.clipboard.writeText(optimizedContent)}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </button>
          )}
        </div>
        <div className="h-48 sm:h-64 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 overflow-y-auto touch-pan-y">
          {optimizedContent ? (
            <p className="whitespace-pre-wrap dark:text-white">{optimizedContent}</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-16 sm:mt-24">
              Your optimized content will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
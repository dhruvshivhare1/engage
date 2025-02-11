import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ContentOptimizer } from './components/ContentOptimizer';
import { Analytics } from './components/Analytics';
import { optimizeContent } from './lib/gemini';

function App() {
  const [content, setContent] = useState('');
  const [optimizedContent, setOptimizedContent] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    try {
      setIsOptimizing(true);
      setError(null);
      const result = await optimizeContent(content);
      setOptimizedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <Layout>
      <ContentOptimizer
        content={content}
        optimizedContent={optimizedContent}
        isOptimizing={isOptimizing}
        error={error}
        onContentChange={setContent}
        onOptimize={handleOptimize}
      />
      <Analytics content={optimizedContent || content} />
    </Layout>
  );
}

export default App;
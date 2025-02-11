import { GoogleGenerativeAI } from '@google/generative-ai';

// Using the API key directly since it's already exposed
const genAI = new GoogleGenerativeAI('AIzaSyD006AuuBuma7u2TRCAB38e55Fy0Ga7dj0');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const LINKEDIN_PROMPT = `You are a professional LinkedIn content optimizer. Your task is to rewrite the given content to maximize engagement while maintaining authenticity and professionalism. Follow these guidelines:

1. Maintain the original message and intent
2. Use natural, conversational language
3. Add appropriate line breaks for readability
4. Include 2-3 relevant hashtags at the end
5. Optimize for LinkedIn's algorithm by:
   - Starting with a hook
   - Using short paragraphs
   - Including a call-to-action
   - Adding relevant emojis sparingly
6. Keep the professional tone
7. Ensure content is unique and engaging

Original content:`;

export async function optimizeContent(content: string): Promise<string> {
  try {
    const prompt = `${LINKEDIN_PROMPT}\n\n${content}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error optimizing content:', error);
    throw new Error('Failed to optimize content. Please try again.');
  }
}
import instance from '@api';
import { mapSearchParamToValue, generatePrompt } from './completion.utils';

interface CompletionApiProps {
  searchParams: URLSearchParams;
  question: string;
  transcript: string;
}

const fetchOpenRouterCompletion = async ({
  searchParams,
  question,
  transcript,
}: CompletionApiProps) => {
  const { field, experience, lang } = mapSearchParamToValue(searchParams);

  const prompt = generatePrompt(field, experience, lang, question, transcript);

  const options = {
    model: 'deepseek/deepseek-v3-base:free', // DeepSeek-R1 model name as per OpenRouter
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  };

  const config = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://localhost:3000', // REQUIRED — use your real domain or localhost for testing
      'X-Title': 'fyp app', // Optional but helpful
    },
  };

  const { data } = await instance.post(
    'https://openrouter.ai/api/v1/chat/completions',
    options,
    config
  );

  const response = data.choices?.[0]?.message?.content?.trim();

  return {
    id: data.id,
    response,
  };
};

export default fetchOpenRouterCompletion;

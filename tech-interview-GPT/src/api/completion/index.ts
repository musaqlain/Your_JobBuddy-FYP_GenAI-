import type { FormValues } from '@@types/form';
import { mapSearchParamToValue, generatePrompt } from './completion.utils';

interface CompletionApiProps extends Omit<FormValues, 'editedTranscript'> {
  searchParams: URLSearchParams;
}

const fetchGroqCompletion = async ({
  searchParams,
  question,
  transcript,
}: CompletionApiProps) => {
  const { field, experience, lang } = mapSearchParamToValue(searchParams);
  const prompt = generatePrompt(field, experience, lang, question, transcript);

  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const VITE_GROQ_API_KEY = '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'; // Ensure this is set in your environment variables

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192', // Choose the model that fits your needs
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    id: Date.now(),
    response: data?.choices?.[0]?.message?.content?.trim() ?? 'No response received',
  };
};

export default fetchGroqCompletion;

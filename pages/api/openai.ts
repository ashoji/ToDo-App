// pages/api/openai.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const apiKey = process.env.AZURE_OPENAI_API_KEY;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const url = `${endpoint}openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { taskDescription } = req.body;

    try {
      const response = await axios.post(
        url,
        {
          messages: [
            {
              role: 'system',
              content: [
                {
                  type: 'text',
                  text: '日本語で100文字程度のテキストで回答をしてください。タスクが入力されますが、タスクを遂行する上で役に立つヒントを返信してください。'
                }
              ]
            },
            {
              role: 'user',
              content: taskDescription
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
          }
        }
      );
      res.status(200).json({ hint: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error fetching hint from OpenAI:', error);
      res.status(500).json({ error: 'ヒントを取得できませんでした。' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
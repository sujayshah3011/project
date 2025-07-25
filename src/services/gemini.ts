interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface CodeModificationResult {
  updatedCode: string;
  description: string;
  success: boolean;
  error?: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Hello, can you respond with just "Hello back"?',
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 50,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        return {
          success: false,
          error: `API error: ${response.status} ${response.statusText}. ${errorData}`,
        };
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        return {
          success: false,
          error: 'No response candidates from API',
        };
      }
      
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async modifyComponent(
    componentCode: string,
    componentTitle: string,
    userRequest: string
  ): Promise<CodeModificationResult> {
    try {
      const prompt = `You are an expert React/TypeScript developer. Please help me modify this component.

Component: ${componentTitle}
User Request: ${userRequest}

Current code:
\`\`\`tsx
${componentCode}
\`\`\`

Please respond in valid JSON format with exactly this structure:
{
  "updatedCode": "complete modified component code here",
  "description": "explanation of changes made"
}

Important: Return only valid JSON, no markdown formatting or extra text.`;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API Error Response:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}. Details: ${errorData}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini API');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      
      // Try to extract JSON from the response, looking for the most complete JSON object
      let result;
      try {
        // First try to parse the entire response as JSON
        result = JSON.parse(responseText);
      } catch {
        // If that fails, try to extract JSON from markdown code blocks
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/```\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            result = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          } catch {
            // If JSON parsing fails completely, return a formatted response
            return {
              updatedCode: componentCode,
              description: responseText,
              success: false,
              error: 'Could not parse JSON response, but got text response',
            };
          }
        } else {
          // No JSON found, return the text as description
          return {
            updatedCode: componentCode,
            description: responseText,
            success: false,
            error: 'No JSON format found in response',
          };
        }
      }

      return {
        updatedCode: result.updatedCode || componentCode,
        description: result.description || 'Code has been modified based on your request.',
        success: true,
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        updatedCode: componentCode,
        description: 'Sorry, I encountered an error while processing your request. Please try again.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const createGeminiService = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }
  return new GeminiService(apiKey);
};

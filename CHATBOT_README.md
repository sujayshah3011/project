# AI Chatbot Integration with Gemini API

This chatbot component integrates with Google's Gemini API to provide intelligent code modification suggestions.

## Setup

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Set your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

## Features

### Code Analysis & Modification
- **Component Code Awareness**: The chatbot receives the complete component code when opened
- **Contextual Responses**: AI responses are based on the actual component structure
- **Code Generation**: Provides complete, updated component code based on user requests

### User Interface
- **Syntax Highlighting**: Code blocks are properly formatted with language detection
- **Copy Functionality**: Individual copy buttons for code blocks
- **Markdown Support**: Bold text (**bold**), italic (*italic*), and inline code (`code`)
- **Loading States**: Visual feedback while AI processes requests

### API Integration
- **Gemini Pro Model**: Uses Google's latest Gemini Pro model for code analysis
- **Error Handling**: Graceful error handling with user-friendly messages
- **Rate Limiting**: Respects API rate limits and provides appropriate feedback

## Usage Examples

### Basic Component Modifications
- "Make the button larger"
- "Change the color scheme to blue"
- "Add hover effects"

### Advanced Features
- "Add loading state functionality"
- "Convert to use TypeScript generics"
- "Add prop validation"
- "Implement dark mode support"

### Code Structure Changes
- "Refactor to use custom hooks"
- "Add error boundary"
- "Convert to use Context API"

## Response Format

The AI provides responses in this format:
1. **Description**: Explanation of what changes were made
2. **Updated Code**: Complete component code with modifications
3. **Copy Button**: Easy copying of the updated code

## Error Handling

Common issues and solutions:

- **"API key not configured"**: Set `VITE_GEMINI_API_KEY` in your `.env` file
- **"API request failed"**: Check your internet connection and API key validity
- **"No response from AI"**: The API might be experiencing issues, try again

## Technical Details

### Files Structure
```
src/
  services/
    gemini.ts          # Gemini API service
  components/
    Modal/
      ChatbotModal.tsx # Main chatbot component
```

### Environment Variables
- `VITE_GEMINI_API_KEY`: Your Gemini API key (required)

### Dependencies
- React 18+
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Headless UI (for modal)

## Security Notes

- API keys are handled client-side (suitable for development/demo)
- For production, consider server-side API calls to protect your API key
- The `.env` file is gitignored to prevent accidental key exposure

## Limitations

- API calls are made directly from the browser
- Requires internet connection
- Subject to Gemini API rate limits
- Code modifications are suggestions and should be reviewed before use

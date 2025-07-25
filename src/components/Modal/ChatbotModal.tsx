import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Send, Bot, User, Sparkles, Copy } from 'lucide-react';
import { createGeminiService } from '../../services/gemini';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  componentTitle: string;
  componentCode: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  componentTitle,
  componentCode,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi! I can help you modify the "${componentTitle}" component. I can see the current code and can suggest improvements or help you make specific changes. What would you like me to help you with?

Current component code:
\`\`\`tsx
${componentCode}
\`\`\``,
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Reset messages when modal opens with current component code
      setMessages([
        {
          id: '1',
          content: `Hi! I can help you modify the "${componentTitle}" component. I can see the current code and can suggest improvements or help you make specific changes. What would you like me to help you with?

Current component code:
\`\`\`tsx
${componentCode}
\`\`\``,
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, componentTitle, componentCode]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Use Gemini API to process the request
      const geminiService = createGeminiService();
      
      // First test the connection
      console.log('Testing API connection...');
      const connectionTest = await geminiService.testConnection();
      if (!connectionTest.success) {
        throw new Error(`API Connection Failed: ${connectionTest.error}`);
      }
      
      console.log('Processing request with Gemini...');
      const result = await geminiService.modifyComponent(
        componentCode,
        componentTitle,
        userInput
      );

      let responseContent = '';
      if (result.success && result.updatedCode) {
        responseContent = `${result.description}

**Updated Code:**
\`\`\`tsx
${result.updatedCode}
\`\`\`

You can copy the code above and use it to replace your existing component.`;
      } else {
        responseContent = result.description;
        if (result.error) {
          responseContent += `\n\n*Error: ${result.error}*`;
        }
      }

      const aiResponse: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      
      let errorMessage = 'Sorry, I encountered an error while processing your request.';
      
      if (error instanceof Error) {
        if (error.message.includes('API key not found')) {
          errorMessage = 'Please configure your Gemini API key in the .env file. Check CHATBOT_README.md for setup instructions.';
        } else if (error.message.includes('400')) {
          errorMessage = 'There was an issue with the API request format. This might be due to an invalid API key or request structure.';
        } else if (error.message.includes('403')) {
          errorMessage = 'API access denied. Please check your Gemini API key permissions.';
        } else if (error.message.includes('429')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }

      const errorResponse: Message = {
        id: Date.now().toString(),
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // TODO: Add toast notification for copy feedback
  };

  const formatMessageContent = (content: string) => {
    // Handle code blocks first
    if (content.includes('```')) {
      return content.split(/(```[\s\S]*?```)/g).map((part, index) => {
        if (part.startsWith('```')) {
          const lines = part.split('\n');
          const language = lines[0].replace('```', '');
          const code = lines.slice(1, -1).join('\n');
          return (
            <div key={index} className="my-3">
              <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-3 py-2 text-xs rounded-t">
                <span>{language || 'code'}</span>
                <button
                  onClick={() => copyMessage(code)}
                  className="flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-xs font-mono rounded-b">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        // Handle regular text with markdown formatting
        return (
          <span key={index} 
            dangerouslySetInnerHTML={{
              __html: part
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
            }}
          />
        );
      });
    }
    
    // Handle regular text without code blocks
    return (
      <span 
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
        }}
      />
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full h-[600px] bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Assistant
                </Dialog.Title>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Remixing: {componentTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`group relative ${
                    message.role === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  } px-4 py-2 max-w-full`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {formatMessageContent(message.content)}
                    </div>
                    <button
                      onClick={() => copyMessage(message.content)}
                      className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                        message.role === 'user'
                          ? 'text-purple-200 hover:text-white'
                          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                      }`}
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user'
                        ? 'text-purple-200'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Analyzing with AI...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Try: 'Make the button larger', 'Add hover effects', 'Change colors to blue'..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Press Enter to send, Shift+Enter for new line
              </p>
              <button
                onClick={async () => {
                  try {
                    const geminiService = createGeminiService();
                    const test = await geminiService.testConnection();
                    const testMessage: Message = {
                      id: Date.now().toString(),
                      content: test.success 
                        ? '✅ API connection successful!' 
                        : `❌ API connection failed: ${test.error}`,
                      role: 'assistant',
                      timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, testMessage]);
                  } catch (error) {
                    const testMessage: Message = {
                      id: Date.now().toString(),
                      content: `❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                      role: 'assistant',
                      timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, testMessage]);
                  }
                }}
                className="text-xs text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Test API
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ChatbotModal;

import React, { useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const RemixAIPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleImportFigma = () => {
    // Placeholder for Figma import logic
    console.log('Importing from Figma...');
  };

  const handleImportDrive = () => {
    // Placeholder for Google Drive import logic
    console.log('Importing from Drive...');
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputText,
      sender: 'user',
    };

    // Mock bot response
    const botMessage: Message = {
      text: `I received your message: "${inputText}"`,
      sender: 'bot',
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputText('');
  };

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Remix with AI</h1>
        
        {/* Import Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleImportFigma}
            className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Import from Figma</h3>
            <p className="text-gray-600 dark:text-gray-300">Import your designs directly from Figma</p>
          </button>
          
          <button
            onClick={handleImportDrive}
            className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Import from Drive</h3>
            <p className="text-gray-600 dark:text-gray-300">Import files from Google Drive</p>
          </button>
        </div>

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
          <div className="h-96 overflow-y-auto mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemixAIPage;

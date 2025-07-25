import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Copy, Sparkles, Eye, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '../Button/Button';

interface ComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  component: React.ReactNode;
  htmlCode: string;
  reactCode: string;
}

export const ComponentModal: React.FC<ComponentModalProps> = ({
  isOpen,
  onClose,
  title,
  component,
  htmlCode,
  reactCode,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [codeType, setCodeType] = useState<'html' | 'react'>('react');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleRemixWithAI = () => {
    // This would integrate with an AI service
    alert('AI Remix feature would be integrated here!');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white dark:bg-gray-800 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                Code
              </button>
            </div>

            {activeTab === 'preview' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRemixWithAI}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 hover:from-purple-600 hover:to-blue-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Remix with AI
              </Button>
            )}

            {activeTab === 'code' && (
              <div className="flex items-center space-x-2">
                <select
                  value={codeType}
                  onChange={(e) => setCodeType(e.target.value as 'html' | 'react')}
                  className="px-3 py-1 border border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="react">React</option>
                  <option value="html">HTML</option>
                </select>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(codeType === 'html' ? htmlCode : reactCode)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'preview' ? (
              <div className="flex items-center justify-center min-h-[300px] bg-gray-50 dark:bg-gray-900">
                {component}
              </div>
            ) : (
              <div className="max-h-[500px] overflow-auto">
                <SyntaxHighlighter
                  language={codeType === 'html' ? 'html' : 'jsx'}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                  }}
                >
                  {codeType === 'html' ? htmlCode : reactCode}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
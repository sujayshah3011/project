import React from 'react';
import { Palette, Book, FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">injala</span>
          </div>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-gray-600 dark:text-gray-300 font-medium">Product Design Bible</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
            Design System
          </button>
          <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors">
            Product Style Guide
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
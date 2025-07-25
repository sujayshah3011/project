import React from 'react';
import { Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {

  const navigate = useNavigate();
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {/* navigaate to home page  on click*/}

            <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" onClick={() => navigate('/')} />
            <span className="text-xl font-bold text-gray-900 dark:text-white" onClick={() => navigate('/')}>injala</span>
          </div>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-gray-600 dark:text-gray-300 font-medium">Product Design Bible</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link 
            to="/remix-ai"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors rounded-lg"
          >
            Remix with AI
          </Link>
          <Link 
            to="/design-system"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors rounded-lg"
          >
            Design System
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
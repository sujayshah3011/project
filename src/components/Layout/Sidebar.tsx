import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Mouse, 
  Type, 
  Grid3x3, 
  BarChart3, 
  User, 
  List, 
  Palette, 
  Layers, 
  Zap,
  ChevronRight
} from 'lucide-react';

const sidebarItems = [
  { 
    title: 'Buttons', 
    path: '/buttons', 
    icon: Mouse,
    
  },
  { 
    title: 'Input & Selection', 
    path: '/input', 
    icon: Type,
    items: ['Checkbox', 'Radio', 'Input', 'File Upload', 'Select Dropdown']
  },
  { 
    title: 'Header & Navigation', 
    path: '/navigation', 
    icon: List
  },
  { 
    title: 'Typography', 
    path: '/typography', 
    icon: Type 
  },
  { 
    title: 'Grid', 
    path: '/grid', 
    icon: Grid3x3 
  },
  { 
    title: 'Status', 
    path: '/status', 
    icon: BarChart3 
  },
  { 
    title: 'Table', 
    path: '/table', 
    icon: Grid3x3 
  },
  { 
    title: 'Avatar', 
    path: '/avatar', 
    icon: User 
  },
  { 
    title: 'Module Listing', 
    path: '/module-listing', 
    icon: List 
  },
  { 
    title: 'Product Colors', 
    path: '/colors', 
    icon: Palette 
  },
  { 
    title: 'Popups & Modal', 
    path: '/modal', 
    icon: Layers 
  },
  { 
    title: 'Accordion', 
    path: '/accordion', 
    icon: Zap 
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = React.useState<string | null>('Buttons');

  const toggleExpanded = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="sticky top-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"></div>
      <div className="p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isExpanded = expandedItem === item.title;
            const hasSubItems = item.items && item.items.length > 0;

            return (
              <div key={item.title}>
                <div
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => hasSubItems ? toggleExpanded(item.title) : null}
                >
                  <Link to={item.path} className="flex items-center space-x-3 flex-1">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                  {hasSubItems && (
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`} 
                    />
                  )}
                </div>
                
                {hasSubItems && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.items?.map((subItem) => {
                      // Create navigation paths for sub-items
                      const getSubItemPath = (subItem: string) => {
                        switch (subItem.toLowerCase()) {
                          case 'checkbox':
                            return '/checkbox';
                          case 'radio':
                            return '/radio';
                          case 'input':
                            return '/input';
                          case 'file upload':
                            return '/file-upload';
                          case 'select dropdown':
                            return '/select-dropdown';
                          default:
                            return item.path;
                        }
                      };

                      const subItemPath = getSubItemPath(subItem);
                      const isSubItemActive = location.pathname === subItemPath;

                      return (
                        <Link
                          key={subItem}
                          to={subItemPath}
                          className={`block px-3 py-1 text-sm transition-colors cursor-pointer ${
                            isSubItemActive
                              ? 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          }`}
                        >
                          {subItem}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
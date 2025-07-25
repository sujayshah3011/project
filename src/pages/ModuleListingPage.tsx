import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Search, Filter, Grid, List as ListIcon, MoreVertical, Eye, Download, Star, Calendar, User, Tag, ChevronDown, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '../components/Button/Button';

const ModuleListingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  // Sample module data
  const modules = [
    {
      id: 1,
      title: 'Button Component',
      description: 'Reusable button component with multiple variants and states',
      author: 'Design Team',
      status: 'active',
      category: 'Components',
      downloads: 1250,
      rating: 4.8,
      lastUpdated: '2 days ago',
      tags: ['UI', 'Interactive', 'Core'],
      version: '2.1.0'
    },
    {
      id: 2,
      title: 'Input Fields',
      description: 'Complete set of form input components with validation',
      author: 'Frontend Team',
      status: 'active',
      category: 'Forms',
      downloads: 987,
      rating: 4.6,
      lastUpdated: '5 days ago',
      tags: ['Forms', 'Validation', 'UI'],
      version: '1.8.2'
    },
    {
      id: 3,
      title: 'Modal System',
      description: 'Flexible modal and popup components for overlays',
      author: 'UI Team',
      status: 'beta',
      category: 'Overlays',
      downloads: 543,
      rating: 4.4,
      lastUpdated: '1 week ago',
      tags: ['Modal', 'Popup', 'Overlay'],
      version: '1.5.0-beta'
    },
    {
      id: 4,
      title: 'Data Table',
      description: 'Advanced data table with sorting, filtering, and pagination',
      author: 'Data Team',
      status: 'active',
      category: 'Data Display',
      downloads: 2150,
      rating: 4.9,
      lastUpdated: '3 days ago',
      tags: ['Table', 'Data', 'Sorting'],
      version: '3.2.1'
    },
    {
      id: 5,
      title: 'Navigation Menu',
      description: 'Responsive navigation components with breadcrumbs',
      author: 'UX Team',
      status: 'active',
      category: 'Navigation',
      downloads: 1680,
      rating: 4.7,
      lastUpdated: '1 day ago',
      tags: ['Navigation', 'Menu', 'Responsive'],
      version: '2.0.3'
    },
    {
      id: 6,
      title: 'Chart Components',
      description: 'Interactive charts and data visualization components',
      author: 'Analytics Team',
      status: 'maintenance',
      category: 'Visualization',
      downloads: 756,
      rating: 4.3,
      lastUpdated: '2 weeks ago',
      tags: ['Charts', 'Data', 'Visualization'],
      version: '1.9.5'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'beta': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'maintenance': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3 h-3" />;
      case 'beta': return <Clock className="w-3 h-3" />;
      case 'maintenance': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  // Module Card Component
  const ModuleCard = ({ module }: { module: typeof modules[0] }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{module.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{module.description}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border ${getStatusColor(module.status)}`}>
          {getStatusIcon(module.status)}
          {module.status}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 px-2 py-1">{module.category}</span>
        <span className="text-xs text-gray-500">v{module.version}</span>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span>{module.author}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Download className="w-3 h-3" />
          <span>{module.downloads.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{module.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {module.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3" />
          <span>Updated {module.lastUpdated}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button variant="primary" size="sm">
            <Download className="w-3 h-3 mr-1" />
            Install
          </Button>
        </div>
      </div>
    </div>
  );

  // Module List Item Component
  const ModuleListItem = ({ module }: { module: typeof modules[0] }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{module.title}</h3>
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border ${getStatusColor(module.status)}`}>
              {getStatusIcon(module.status)}
              {module.status}
            </span>
            <span className="text-xs text-gray-500">v{module.version}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{module.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{module.author}</span>
            <span>{module.category}</span>
            <span>{module.downloads.toLocaleString()} downloads</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{module.rating}</span>
            </div>
            <span>Updated {module.lastUpdated}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="secondary" size="sm">
          <Eye className="w-3 h-3 mr-1" />
          View
        </Button>
        <Button variant="primary" size="sm">
          <Download className="w-3 h-3 mr-1" />
          Install
        </Button>
      </div>
    </div>
  );

  // Search and Filter Component
  const SearchAndFilter = () => (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="components">Components</option>
            <option value="forms">Forms</option>
            <option value="overlays">Overlays</option>
            <option value="data-display">Data Display</option>
            <option value="navigation">Navigation</option>
            <option value="visualization">Visualization</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
        
        <Button variant="secondary" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        
        <div className="flex border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Module Listing</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Browse and discover reusable components and modules for your design system.
        </p>
      </div>

      {/* Statistics Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">24</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Total Modules</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-green-600 mb-2">18</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Active Modules</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">8.4K</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Total Downloads</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">4.7</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Module Listing Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Modules</h2>
        
        <div 
          className="cursor-pointer"
          onClick={() => openModal(
            'Module Listing Interface',
            <div className="w-full">
              <SearchAndFilter />
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modules.slice(0, 3).map((module) => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {modules.slice(0, 3).map((module) => (
                    <ModuleListItem key={module.id} module={module} />
                  ))}
                </div>
              )}
            </div>,
            `<div class="space-y-6">
  <!-- Search and Filter -->
  <div class="flex items-center justify-between mb-6">
    <div class="relative max-w-md flex-1">
      <input type="text" placeholder="Search modules..." class="w-full pl-10 pr-4 py-2 border border-gray-300" />
    </div>
    <div class="flex items-center space-x-3">
      <select class="border border-gray-300 px-4 py-2">
        <option>All Categories</option>
      </select>
      <button class="px-4 py-2 border border-gray-300">Filter</button>
    </div>
  </div>
  
  <!-- Module Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="border border-gray-200 p-6">
      <h3 class="text-lg font-semibold mb-2">Button Component</h3>
      <p class="text-gray-600 text-sm mb-3">Reusable button component with multiple variants</p>
      <div class="flex items-center justify-between">
        <span class="text-xs bg-green-100 text-green-800 px-2 py-1">Active</span>
        <button class="px-4 py-2 bg-purple-600 text-white text-sm">Install</button>
      </div>
    </div>
  </div>
</div>`,
            `const ModuleListingInterface = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <SearchAndFilter />
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => (
            <ModuleListItem key={module.id} module={module} />
          ))}
        </div>
      )}
    </div>
  );
};`
          )}
        >
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
            <SearchAndFilter />
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module) => (
                  <ModuleListItem key={module.id} module={module} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Module Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Categories</h2>
        <div 
          className="cursor-pointer"
          onClick={() => openModal(
            'Module Categories',
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Components', count: 8, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' },
                { name: 'Forms', count: 5, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
                { name: 'Navigation', count: 4, color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' },
                { name: 'Data Display', count: 3, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' },
                { name: 'Overlays', count: 2, color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' },
                { name: 'Visualization', count: 2, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' }
              ].map((category) => (
                <div key={category.name} className={`p-4 text-center border border-gray-200 dark:border-gray-700 ${category.color}`}>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.count} modules</p>
                </div>
              ))}
            </div>,
            `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <div class="p-4 text-center border border-gray-200 bg-purple-100 text-purple-700">
    <h3 class="font-semibold">Components</h3>
    <p class="text-sm opacity-80">8 modules</p>
  </div>
  <div class="p-4 text-center border border-gray-200 bg-blue-100 text-blue-700">
    <h3 class="font-semibold">Forms</h3>
    <p class="text-sm opacity-80">5 modules</p>
  </div>
  <!-- More categories... -->
</div>`,
            `const ModuleCategories = () => {
  const categories = [
    { name: 'Components', count: 8, color: 'bg-purple-100 text-purple-700' },
    { name: 'Forms', count: 5, color: 'bg-blue-100 text-blue-700' },
    // ... more categories
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div key={category.name} className={\`p-4 text-center border \${category.color}\`}>
          <h3 className="font-semibold">{category.name}</h3>
          <p className="text-sm opacity-80">{category.count} modules</p>
        </div>
      ))}
    </div>
  );
};`
          )}
        >
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Components', count: 8, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' },
                { name: 'Forms', count: 5, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
                { name: 'Navigation', count: 4, color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' },
                { name: 'Data Display', count: 3, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' },
                { name: 'Overlays', count: 2, color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' },
                { name: 'Visualization', count: 2, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' }
              ].map((category) => (
                <div key={category.name} className={`p-4 text-center border border-gray-200 dark:border-gray-700 ${category.color}`}>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.count} modules</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Guidelines</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Installation</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Click "Install" to add module to your project
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Follow the integration documentation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Import components in your application
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Customize styling as needed
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Review module documentation before use
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Check compatibility with your design system
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Test modules in different environments
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Keep modules updated to latest versions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Component Modal */}
      {selectedComponent && (
        <ComponentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedComponent.title}
          component={selectedComponent.component}
          htmlCode={selectedComponent.htmlCode}
          reactCode={selectedComponent.reactCode}
        />
      )}
    </div>
  );
};

export default ModuleListingPage;

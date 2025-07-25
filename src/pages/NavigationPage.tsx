import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Home, User, Settings, ChevronRight, Menu } from 'lucide-react';

const NavigationPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  const Breadcrumb = () => (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            Home
          </a>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            Components
          </a>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <span className="text-gray-900 dark:text-white font-medium">Navigation</span>
        </li>
      </ol>
    </nav>
  );

  const TopNavigation = () => (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-gray-900 dark:text-white">Brand</div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium">
                Products
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium">
                Contact
              </a>
            </div>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </nav>
  );

  const SideNavigation = () => (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-96">
      <div className="p-4">
        <div className="space-y-2">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </a>
        </div>
      </div>
    </nav>
  );

  const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    
    return (
      <div>
        <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'tab1', label: 'Overview' },
            { id: 'tab2', label: 'Details' },
            { id: 'tab3', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="py-4">
          <p className="text-gray-600 dark:text-gray-300">Content for {activeTab}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Header & Navigation</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Navigation components help users move through your application and understand where they are.
        </p>
      </div>

      {/* Header */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Header</h2>
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Top Navigation Header',
              <TopNavigation />,
              `<nav style="background-color: white; border-bottom: 1px solid #e5e7eb;">
  <div style="padding: 1rem 1.5rem;">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 2rem;">
        <div style="font-size: 1.25rem; font-weight: 700; color: #111827;">Brand</div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="#" style="color: #374151; font-weight: 500; text-decoration: none;">Home</a>
          <a href="#" style="color: #374151; font-weight: 500; text-decoration: none;">Products</a>
          <a href="#" style="color: #374151; font-weight: 500; text-decoration: none;">About</a>
          <a href="#" style="color: #374151; font-weight: 500; text-decoration: none;">Contact</a>
        </div>
      </div>
    </div>
  </div>
</nav>`,
              `<TopNavigation />`
            )}
          >
            <TopNavigation />
          </div>
        </div>
      </section>

      {/* Side Navigation */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Side Navigation</h2>
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer inline-block"
            onClick={() => openModal(
              'Side Navigation',
              <SideNavigation />,
              `<nav style="width: 16rem; background-color: white; border-right: 1px solid #e5e7eb; height: 24rem;">
  <div style="padding: 1rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="#" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; background-color: #f3e8ff; color: #7c3aed; text-decoration: none; font-weight: 500;">
        <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Dashboard
      </a>
      <a href="#" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; color: #374151; text-decoration: none; font-weight: 500;">
        <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        Profile
      </a>
      <a href="#" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; color: #374151; text-decoration: none; font-weight: 500;">
        <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
        Settings
      </a>
    </div>
  </div>
</nav>`,
              `<SideNavigation />`
            )}
          >
            <SideNavigation />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Breadcrumb</h2>
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer inline-block"
            onClick={() => openModal(
              'Breadcrumb Navigation',
              <Breadcrumb />,
              `<nav style="display: flex;" aria-label="Breadcrumb">
  <ol style="display: flex; align-items: center; gap: 0.5rem;">
    <li>
      <a href="#" style="color: #6b7280; text-decoration: none;">Home</a>
    </li>
    <svg style="width: 1rem; height: 1rem; color: #9ca3af;" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
    </svg>
    <li>
      <a href="#" style="color: #6b7280; text-decoration: none;">Components</a>
    </li>
    <svg style="width: 1rem; height: 1rem; color: #9ca3af;" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
    </svg>
    <li>
      <span style="color: #111827; font-weight: 500;">Navigation</span>
    </li>
  </ol>
</nav>`,
              `<Breadcrumb />`
            )}
          >
            <Breadcrumb />
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tab Navigation</h2>
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Tab Navigation',
              <TabNavigation />,
              `<div>
  <nav style="display: flex; gap: 2rem; border-bottom: 1px solid #e5e7eb;">
    <button style="padding: 0.5rem 0.25rem; border-bottom: 2px solid #8b5cf6; font-weight: 500; font-size: 0.875rem; color: #7c3aed; background: none; border-top: none; border-left: none; border-right: none;">
      Overview
    </button>
    <button style="padding: 0.5rem 0.25rem; border-bottom: 2px solid transparent; font-weight: 500; font-size: 0.875rem; color: #6b7280; background: none; border-top: none; border-left: none; border-right: none;">
      Details
    </button>
    <button style="padding: 0.5rem 0.25rem; border-bottom: 2px solid transparent; font-weight: 500; font-size: 0.875rem; color: #6b7280; background: none; border-top: none; border-left: none; border-right: none;">
      Settings
    </button>
  </nav>
  <div style="padding: 1rem 0;">
    <p style="color: #4b5563;">Content for tab1</p>
  </div>
</div>`,
              `<TabNavigation />`
            )}
          >
            <TabNavigation />
          </div>
        </div>
      </section>

      <ComponentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedComponent?.title || ''}
        component={selectedComponent?.component || null}
        htmlCode={selectedComponent?.htmlCode || ''}
        reactCode={selectedComponent?.reactCode || ''}
      />
    </div>
  );
};

export default NavigationPage;
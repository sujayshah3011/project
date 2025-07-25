import React, { useState } from 'react';
import { Button } from '../components/Button/Button';
import { Tabs } from '../components/Tabs/Tabs';

const DesignSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('html');

  const codeExamples = {
    html: `<button class="btn btn-primary">Click me</button>`,
    react: `<Button variant="primary">Click me</Button>`,
    jsx: `const MyButton = () => (
  <button className="btn btn-primary">
    Click me
  </button>
)`
  };

  return (
    <div className="flex min-h-screen pt-16">
      {/* Sticky Sidebar */}
      <aside className="fixed w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-700 p-6">
        <nav className="space-y-4">
          <a href="#intro" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600">Introduction</a>
          <a href="#tokens" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600">Design Tokens</a>
          <a href="#components" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600">Components</a>
          <a href="#guidelines" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600">Guidelines</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Intro Section */}
        <section id="intro" className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Design System</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our design system provides a comprehensive set of reusable components, guidelines, and best practices
            to create consistent and high-quality user interfaces across our products.
          </p>
        </section>

        {/* Design Tokens Section */}
        <section id="tokens" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Design Tokens</h2>
          
          {/* Colors */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 bg-purple-600 rounded-lg"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-sm text-gray-500">#7C3AED</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-gray-900 rounded-lg"></div>
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-sm text-gray-500">#111827</p>
              </div>
              {/* Add more color tokens as needed */}
            </div>
          </div>

          {/* Typography */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <p className="text-sm text-gray-500">4xl / Bold</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Heading 2</h2>
                <p className="text-sm text-gray-500">3xl / Bold</p>
              </div>
              <div>
                <p className="text-base">Body Text</p>
                <p className="text-sm text-gray-500">base / Regular</p>
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spacing</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-purple-200"></div>
                <span className="text-sm">spacing-xs (1rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-4 bg-purple-200"></div>
                <span className="text-sm">spacing-sm (2rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-4 bg-purple-200"></div>
                <span className="text-sm">spacing-md (4rem)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Components</h2>
          
          <div className="space-y-8">
            {/* Buttons */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Buttons</h3>
              <div className="flex gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
              </div>
            </div>

            {/* Code Example */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="mb-4">
                <Tabs
                  tabs={[
                    { id: 'html', label: 'HTML' },
                    { id: 'react', label: 'React' },
                    { id: 'jsx', label: 'JSX' },
                  ]}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />
              </div>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Guidelines Section */}
        <section id="guidelines" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensure all interactive elements are keyboard accessible and have appropriate ARIA labels.
                Maintain sufficient color contrast ratios for text and interactive elements.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Naming Conventions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use meaningful and consistent names for components and props.
                Follow the BEM methodology for CSS classes when not using Tailwind.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystemPage;
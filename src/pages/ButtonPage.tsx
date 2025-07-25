import React from 'react';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Check, Mail, X, Calendar } from 'lucide-react';

const ButtonPage: React.FC = () => {
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

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Button</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Buttons are controls that let users take action, make choices, and move forward.
        </p>
      </div>

      {/* Anatomy Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Anatomy</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The most basic setup of a button includes only a single label or icon. Still, a button can also be customized to include a label with a leading icon and a trailing icon. Circle buttons can also support an additional label below the button's container.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-8">
          <div className="flex justify-center items-center space-x-16">
            {/* Basic Button */}
            <div className="text-center">
              <div className="relative inline-block">
                <Button variant="primary">Label</Button>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-red-500 font-medium">Label</span>
                  <br />
                  <span className="text-xs text-red-400">(Required)</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-red-500 font-medium">Container</span>
                  <br />
                  <span className="text-xs text-red-400">(Required)</span>
                </div>
              </div>
            </div>

            {/* Button with Icons */}
            <div className="text-center">
              <div className="relative inline-block">
                <Button variant="primary">
                  <Check className="w-4 h-4" />
                  Label
                  <Calendar className="w-4 h-4" />
                </Button>
                <div className="absolute -top-12 left-4">
                  <span className="text-xs text-red-500 font-medium">Leading Icon</span>
                  <br />
                  <span className="text-xs text-red-400">(Optional)</span>
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-red-500 font-medium">Label</span>
                  <br />
                  <span className="text-xs text-red-400">(Required)</span>
                </div>
                <div className="absolute -top-12 right-4">
                  <span className="text-xs text-red-500 font-medium">Trailing Icon</span>
                  <br />
                  <span className="text-xs text-red-400">(Optional)</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-red-500 font-medium">Container</span>
                  <br />
                  <span className="text-xs text-red-400">(Required)</span>
                </div>
              </div>
            </div>

            {/* Icon Button */}
            <div className="text-center">
              <div className="relative inline-block">
                <Button variant="primary" size="sm" className="w-10 h-10 p-0">
                  <Mail className="w-4 h-4" />
                </Button>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-red-500 font-medium">Label</span>
                  <br />
                  <span className="text-xs text-red-400">(Required)</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-red-500 font-medium">Container</span>
                  <br />
                  <span className="text-xs text-red-400">(Required)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hierarchy Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hierarchy</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Button hierarchy emphasizes which button is more important in the context so the user can take action immediately.
        </p>
        
        <div className="space-y-8">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Primary</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => openModal(
                  'Primary Small Button',
                  <Button variant="primary" size="sm">Small</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.375rem 0.75rem; font-size: 0.875rem; border: none; cursor: pointer;">Small</button>`,
                  `<Button variant="primary" size="sm">Small</Button>`
                )}
              >
                Small
              </Button>
              <Button 
                variant="primary" 
                size="md"
                onClick={() => openModal(
                  'Primary Medium Button',
                  <Button variant="primary" size="md">Medium</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: pointer;">Medium</button>`,
                  `<Button variant="primary" size="md">Medium</Button>`
                )}
              >
                Medium
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => openModal(
                  'Primary Large Button',
                  <Button variant="primary" size="lg">Large</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.75rem 1.5rem; font-size: 1rem; border: none; cursor: pointer;">Large</button>`,
                  `<Button variant="primary" size="lg">Large</Button>`
                )}
              >
                Large
              </Button>
              <Button 
                variant="primary" 
                disabled
                onClick={() => openModal(
                  'Disabled Primary Button',
                  <Button variant="primary" disabled>Disabled</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; opacity: 0.5; cursor: not-allowed;" disabled>Disabled</button>`,
                  `<Button variant="primary" disabled>Disabled</Button>`
                )}
              >
                Disabled
              </Button>
              <Button 
                variant="primary" 
                loading
                onClick={() => openModal(
                  'Loading Primary Button',
                  <Button variant="primary" loading>Loading</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: not-allowed;" disabled>
  <svg style="width: 1rem; height: 1rem; animation: spin 1s linear infinite;" fill="none" viewBox="0 0 24 24">
    <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Loading
</button>`,
                  `<Button variant="primary" loading>Loading</Button>`
                )}
              >
                Loading
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Secondary</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="secondary" loading>Loading</Button>
            </div>
          </div>

          {/* Danger Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danger</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="danger" size="sm">Small</Button>
              <Button variant="danger" size="md">Medium</Button>
              <Button variant="danger" size="lg">Large</Button>
              <Button variant="danger" disabled>Disabled</Button>
              <Button variant="danger" loading>Loading</Button>
            </div>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">States</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Default</span>
              <Button variant="primary">Button Text</Button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Hover</span>
              <Button variant="primary" className="hover:bg-primary-700">Button Text</Button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Focus</span>
              <Button variant="primary" className="ring-2 ring-primary-500 ring-offset-2">Button Text</Button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Loading</span>
              <Button variant="primary" loading>Button Text</Button>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium">Disabled</span>
              <Button variant="primary" disabled>Button Text</Button>
            </div>
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

export default ButtonPage;
import React from 'react';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { ComponentModal } from '../components/Modal/ComponentModal';
import Documentation from '../components/Documentation/Documentation';

const buttonDocumentation = {
  title: "Button Component",
  description: "Interactive button components with different variants and states. Buttons are clickable elements that trigger actions and provide user feedback.",
  components: [
    {
      name: "Button",
      purpose: "Primary interactive element for user actions and form submissions",
      props: [
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'danger'",
          default: "'primary'",
          description: "Defines the visual style and semantic meaning of the button"
        },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "Controls the button size and padding"
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables button interaction and applies disabled styling"
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading state with spinner and prevents interaction"
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Button content (text, icons, etc.)"
        },
        {
          name: "onClick",
          type: "(event: MouseEvent) => void",
          description: "Function called when button is clicked"
        }
      ],
      examples: [
        {
          title: "Primary Button",
          code: `<Button variant="primary">Save Changes</Button>`,
          description: "Main call-to-action buttons with blue background. Use for primary actions."
        },
        {
          title: "Secondary Button",
          code: `<Button variant="secondary">Cancel</Button>`,
          description: "Secondary actions with white background and border. Use for less important actions."
        },
        {
          title: "Danger Button",
          code: `<Button variant="danger">Delete</Button>`,
          description: "Destructive actions with red styling. Use for delete, remove, or warning actions."
        },
        {
          title: "Loading State",
          code: `<Button loading>Processing...</Button>`,
          description: "Shows loading spinner and prevents interaction during async operations."
        }
      ],
      notes: [
        "All buttons are keyboard accessible with Tab navigation",
        "Disabled buttons are excluded from tab order",
        "Loading buttons announce state changes to screen readers",
        "Buttons maintain proper contrast ratios in all states",
        "Focus indicators are clearly visible for keyboard users"
      ]
    }
  ],
  patterns: [
    {
      name: "Button Hierarchy",
      purpose: "Establish visual importance and guide user attention to primary actions",
      implementation: [
        "Use one primary button per view to establish clear hierarchy",
        "Secondary buttons support the primary action without competing",
        "Danger buttons are reserved for destructive or irreversible actions",
        "Group related buttons with consistent spacing"
      ],
      example: `<div className="flex gap-3">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>`
    },
    {
      name: "Disabled State Wrapper",
      purpose: "Enable modal functionality for disabled buttons while preserving accessibility",
      implementation: [
        "Wrap disabled buttons in clickable container div",
        "Add hover border to indicate clickability",
        "Preserve original button semantics and accessibility",
        "Apply pattern consistently across all disabled states"
      ],
      example: `<div 
  className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
  onClick={() => openModal(...)}
>
  <Button variant="primary" disabled>
    Disabled Button
  </Button>
</div>`,
      notes: [
        "Necessary because disabled buttons don't respond to click events",
        "Border appears on hover to indicate clickability",
        "Used consistently for all disabled and loading button states"
      ]
    }
  ]
};

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
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Disabled Primary Button',
                  <Button variant="primary" disabled>Disabled</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; opacity: 0.5; cursor: not-allowed;" disabled>Disabled</button>`,
                  `<Button variant="primary" disabled>Disabled</Button>`
                )}
              >
                <Button 
                  variant="primary" 
                  disabled
                >
                  Disabled
                </Button>
              </div>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
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
                <Button 
                  variant="primary" 
                  loading
                >
                  Loading
                </Button>
              </div>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Secondary</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => openModal(
                  'Secondary Small Button',
                  <Button variant="secondary" size="sm">Small</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #f3f4f6; color: #374151; padding: 0.375rem 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; cursor: pointer;">Small</button>`,
                  `<Button variant="secondary" size="sm">Small</Button>`
                )}
              >
                Small
              </Button>
              <Button 
                variant="secondary" 
                size="md"
                onClick={() => openModal(
                  'Secondary Medium Button',
                  <Button variant="secondary" size="md">Medium</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #f3f4f6; color: #374151; padding: 0.5rem 1rem; font-size: 0.875rem; border: 1px solid #d1d5db; cursor: pointer;">Medium</button>`,
                  `<Button variant="secondary" size="md">Medium</Button>`
                )}
              >
                Medium
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => openModal(
                  'Secondary Large Button',
                  <Button variant="secondary" size="lg">Large</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #f3f4f6; color: #374151; padding: 0.75rem 1.5rem; font-size: 1rem; border: 1px solid #d1d5db; cursor: pointer;">Large</button>`,
                  `<Button variant="secondary" size="lg">Large</Button>`
                )}
              >
                Large
              </Button>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Disabled Secondary Button',
                  <Button variant="secondary" disabled>Disabled</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #f3f4f6; color: #374151; padding: 0.5rem 1rem; font-size: 0.875rem; border: 1px solid #d1d5db; opacity: 0.5; cursor: not-allowed;" disabled>Disabled</button>`,
                  `<Button variant="secondary" disabled>Disabled</Button>`
                )}
              >
                <Button 
                  variant="secondary" 
                  disabled
                >
                  Disabled
                </Button>
              </div>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Loading Secondary Button',
                  <Button variant="secondary" loading>Loading</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #f3f4f6; color: #374151; padding: 0.5rem 1rem; font-size: 0.875rem; border: 1px solid #d1d5db; cursor: not-allowed;" disabled>
  <svg style="width: 1rem; height: 1rem; animation: spin 1s linear infinite;" fill="none" viewBox="0 0 24 24">
    <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Loading
</button>`,
                  `<Button variant="secondary" loading>Loading</Button>`
                )}
              >
                <Button 
                  variant="secondary" 
                  loading
                >
                  Loading
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danger</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => openModal(
                  'Danger Small Button',
                  <Button variant="danger" size="sm">Small</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #dc2626; color: white; padding: 0.375rem 0.75rem; font-size: 0.875rem; border: none; cursor: pointer;">Small</button>`,
                  `<Button variant="danger" size="sm">Small</Button>`
                )}
              >
                Small
              </Button>
              <Button 
                variant="danger" 
                size="md"
                onClick={() => openModal(
                  'Danger Medium Button',
                  <Button variant="danger" size="md">Medium</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #dc2626; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: pointer;">Medium</button>`,
                  `<Button variant="danger" size="md">Medium</Button>`
                )}
              >
                Medium
              </Button>
              <Button 
                variant="danger" 
                size="lg"
                onClick={() => openModal(
                  'Danger Large Button',
                  <Button variant="danger" size="lg">Large</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #dc2626; color: white; padding: 0.75rem 1.5rem; font-size: 1rem; border: none; cursor: pointer;">Large</button>`,
                  `<Button variant="danger" size="lg">Large</Button>`
                )}
              >
                Large
              </Button>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Disabled Danger Button',
                  <Button variant="danger" disabled>Disabled</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #dc2626; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; opacity: 0.5; cursor: not-allowed;" disabled>Disabled</button>`,
                  `<Button variant="danger" disabled>Disabled</Button>`
                )}
              >
                <Button 
                  variant="danger" 
                  disabled
                >
                  Disabled
                </Button>
              </div>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Loading Danger Button',
                  <Button variant="danger" loading>Loading</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #dc2626; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: not-allowed;" disabled>
  <svg style="width: 1rem; height: 1rem; animation: spin 1s linear infinite;" fill="none" viewBox="0 0 24 24">
    <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Loading
</button>`,
                  `<Button variant="danger" loading>Loading</Button>`
                )}
              >
                <Button 
                  variant="danger" 
                  loading
                >
                  Loading
                </Button>
              </div>
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
              <Button 
                variant="primary"
                onClick={() => openModal(
                  'Default Button State',
                  <Button variant="primary">Button Text</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: pointer;">Button Text</button>`,
                  `<Button variant="primary">Button Text</Button>`
                )}
              >
                Button Text
              </Button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Hover</span>
              <Button 
                variant="primary" 
                className="hover:bg-primary-700"
                onClick={() => openModal(
                  'Hover Button State',
                  <Button variant="primary" className="hover:bg-primary-700">Button Text</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #6d28d9; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: pointer;">Button Text</button>`,
                  `<Button variant="primary" className="hover:bg-primary-700">Button Text</Button>`
                )}
              >
                Button Text
              </Button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Focus</span>
              <Button 
                variant="primary" 
                className="ring-2 ring-primary-500 ring-offset-2"
                onClick={() => openModal(
                  'Focus Button State',
                  <Button variant="primary" className="ring-2 ring-primary-500 ring-offset-2">Button Text</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: pointer; box-shadow: 0 0 0 2px #7c3aed, 0 0 0 4px rgba(124, 58, 237, 0.2);">Button Text</button>`,
                  `<Button variant="primary" className="ring-2 ring-primary-500 ring-offset-2">Button Text</Button>`
                )}
              >
                Button Text
              </Button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium">Loading</span>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Loading Button State',
                  <Button variant="primary" loading>Button Text</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; cursor: not-allowed;" disabled>
  <svg style="width: 1rem; height: 1rem; animation: spin 1s linear infinite;" fill="none" viewBox="0 0 24 24">
    <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Button Text
</button>`,
                  `<Button variant="primary" loading>Button Text</Button>`
                )}
              >
                <Button 
                  variant="primary" 
                  loading
                >
                  Button Text
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium">Disabled</span>
              <div 
                className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
                onClick={() => openModal(
                  'Disabled Button State',
                  <Button variant="primary" disabled>Button Text</Button>,
                  `<button style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; background-color: #7c3aed; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; border: none; opacity: 0.5; cursor: not-allowed;" disabled>Button Text</button>`,
                  `<Button variant="primary" disabled>Button Text</Button>`
                )}
              >
                <Button 
                  variant="primary" 
                  disabled
                >
                  Button Text
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <Documentation 
        title={buttonDocumentation.title}
        description={buttonDocumentation.description}
        components={buttonDocumentation.components}
        patterns={buttonDocumentation.patterns}
      />

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

// ===========================
// DOCUMENTATION
// ===========================

/**
 * COMPONENTS USED IN BUTTONPAGE
 * 
 * This page demonstrates various button components and states, allowing users to preview
 * and copy code for different button variations. Each button opens a modal for detailed
 * inspection and AI-powered code modification.
 */

/**
 * 📛 Component: Button
 * 🧩 Purpose: Reusable button component with multiple variants, sizes, and states
 * 
 * ⚙️ Props:
 * - variant?: 'primary' | 'secondary' | 'danger' = 'primary'
 *   Controls the visual style and color scheme of the button
 * 
 * - size?: 'sm' | 'md' | 'lg' = 'md'
 *   Determines the padding and font size of the button
 * 
 * - loading?: boolean = false
 *   Shows a spinner icon and disables the button when true
 * 
 * - disabled?: boolean = false
 *   Disables button interaction and applies disabled styling
 * 
 * - children: React.ReactNode (required)
 *   The content displayed inside the button
 * 
 * - className?: string
 *   Additional CSS classes to apply to the button
 * 
 * - onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
 *   Click handler function
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Basic primary button
 * <Button variant="primary" size="md">
 *   Submit
 * </Button>
 * 
 * // Loading state with custom click handler
 * <Button 
 *   variant="secondary" 
 *   loading={isSubmitting}
 *   onClick={() => handleSubmit()}
 * >
 *   Save Changes
 * </Button>
 * 
 * // Disabled danger button
 * <Button variant="danger" disabled>
 *   Delete
 * </Button>
 * ```
 * 
 * 📌 Notes:
 * - Button automatically becomes disabled when loading=true
 * - Focus management and keyboard accessibility are built-in
 * - Supports all standard HTML button attributes via props spreading
 * - Loading state shows Loader2 icon from lucide-react
 * - Hover states provide visual feedback for all variants
 */

/**
 * 📛 Component: ComponentModal
 * 🧩 Purpose: Modal dialog for previewing components and viewing their code
 * 
 * ⚙️ Props:
 * - isOpen: boolean (required)
 *   Controls whether the modal is visible
 * 
 * - onClose: () => void (required)
 *   Function called when modal should be closed
 * 
 * - title: string (required)
 *   Title displayed in the modal header
 * 
 * - component: React.ReactNode (required)
 *   The component to preview in the modal
 * 
 * - htmlCode: string (required)
 *   HTML code representation of the component
 * 
 * - reactCode: string (required)
 *   React/JSX code representation of the component
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <ComponentModal
 *   isOpen={modalOpen}
 *   onClose={() => setModalOpen(false)}
 *   title="Primary Button"
 *   component={<Button variant="primary">Example</Button>}
 *   htmlCode="<button class='btn-primary'>Example</button>"
 *   reactCode="<Button variant='primary'>Example</Button>"
 * />
 * ```
 * 
 * 📌 Notes:
 * - Uses @headlessui/react Dialog for accessibility
 * - Includes tab navigation between Preview and Code views
 * - Code view supports both HTML and React syntax highlighting
 * - "Remix with AI" button opens ChatbotModal for AI-powered modifications
 * - Copy functionality for code snippets
 * - Responsive design with max-width constraints
 * - Backdrop click closes the modal
 */

/**
 * 📛 Component: React.useState Hook
 * 🧩 Purpose: Manages local component state for modal visibility and selected component
 * 
 * ⚙️ State Variables:
 * - modalOpen: boolean
 *   Controls ComponentModal visibility
 * 
 * - selectedComponent: object | null
 *   Stores data for the currently selected component including:
 *   - title: string - Component display name
 *   - component: React.ReactNode - Component instance
 *   - htmlCode: string - HTML representation
 *   - reactCode: string - React code representation
 * 
 * 🧪 Usage Example:
 * ```tsx
 * const [modalOpen, setModalOpen] = useState(false);
 * const [selectedComponent, setSelectedComponent] = useState(null);
 * 
 * const openModal = (title, component, htmlCode, reactCode) => {
 *   setSelectedComponent({ title, component, htmlCode, reactCode });
 *   setModalOpen(true);
 * };
 * ```
 * 
 * 📌 Notes:
 * - State is lifted to page level to coordinate between buttons and modal
 * - openModal function bundles all necessary data for modal display
 * - Modal state resets when component unmounts
 */

/**
 * 📛 Pattern: Clickable Wrapper for Disabled Elements
 * 🧩 Purpose: Makes disabled/loading buttons clickable for demo purposes
 * 
 * ⚙️ Implementation:
 * - Wrapper div with cursor-pointer and click handler
 * - Visual hover feedback with border styling
 * - Preserves original button appearance and behavior
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div 
 *   className="cursor-pointer inline-block border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-1 transition-colors"
 *   onClick={() => openModal(...)}
 * >
 *   <Button variant="primary" disabled>
 *     Disabled Button
 *   </Button>
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Necessary because disabled buttons don't respond to click events
 * - Border appears on hover to indicate clickability
 * - Used consistently for all disabled and loading button states
 * - Maintains accessibility by preserving original button semantics
 */

export default ButtonPage;
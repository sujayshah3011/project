import React from 'react';
import { useState } from 'react';
import { Input } from '../components/Input/Input';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Eye, EyeOff } from 'lucide-react';
import Documentation from '../components/Documentation/Documentation';

const InputPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
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

  // Documentation data
  const documentationData = {
    title: "Input Component Documentation",
    description: "This page showcases various input field variations and states, demonstrating different configurations like labels, prefixes, suffixes, error states, and interactive elements like password visibility toggles.",
    components: [
      {
        name: "Input",
        purpose: "Flexible input field component with label, validation, and prefix/suffix support",
        props: [
          {
            name: "label",
            type: "string",
            required: false,
            description: "Optional label text displayed above the input field"
          },
          {
            name: "error",
            type: "string",
            required: false,
            description: "Error message displayed below the input, also applies error styling"
          },
          {
            name: "prefix",
            type: "string",
            required: false,
            description: "Text prefix displayed inside the input on the left side (e.g., '$', 'https://')"
          },
          {
            name: "suffix",
            type: "React.ReactNode",
            required: false,
            description: "Element displayed inside the input on the right side (icons, buttons, etc.)"
          },
          {
            name: "type",
            type: "string",
            required: false,
            default: "'text'",
            description: "Input type (text, email, password, number, etc.)"
          },
          {
            name: "placeholder",
            type: "string",
            required: false,
            description: "Placeholder text shown when input is empty"
          },
          {
            name: "disabled",
            type: "boolean",
            required: false,
            default: "false",
            description: "Disables the input field and applies disabled styling"
          },
          {
            name: "className",
            type: "string",
            required: false,
            description: "Additional CSS classes for customization"
          }
        ],
        examples: [
          {
            title: "Basic Input",
            code: `<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
/>`,
            description: "Basic input field with label and email validation"
          },
          {
            title: "Input with Prefix",
            code: `<Input
  label="Price"
  type="number"
  prefix="$"
  placeholder="0.00"
/>`,
            description: "Currency input with dollar sign prefix"
          },
          {
            title: "Password with Toggle",
            code: `<Input
  label="Password"
  type={showPassword ? 'text' : 'password'}
  placeholder="Enter password"
  suffix={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  }
/>`,
            description: "Password field with visibility toggle functionality"
          },
          {
            title: "Error State",
            code: `<Input
  label="Username"
  placeholder="Enter username"
  error="Username is required"
/>`,
            description: "Input field displaying validation error"
          }
        ],
        notes: [
          "Automatically generates unique IDs for accessibility",
          "Error state overrides normal border colors with red theme",
          "Prefix adds left padding, suffix adds right padding automatically",
          "Focus states provide clear visual feedback",
          "Supports both light and dark themes",
          "Disabled state prevents interaction and applies muted styling",
          "Label is properly associated with input for screen readers"
        ]
      },
      {
        name: "Eye, EyeOff Icons",
        purpose: "Provides visual indicators for password visibility toggle functionality",
        props: [
          {
            name: "className",
            type: "string",
            required: false,
            description: "CSS classes for styling (typically for size and color)"
          }
        ],
        examples: [
          {
            title: "Password Toggle Button",
            code: `<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
</button>`,
            description: "Button with conditional icon display for password visibility"
          }
        ],
        notes: [
          "Eye icon indicates password is hidden (default state)",
          "EyeOff icon indicates password is visible",
          "Standard size is w-4 h-4 (16px)",
          "Usually colored with text-gray-400 or similar muted colors"
        ]
      }
    ],
    patterns: [
      {
        name: "Interactive Suffix Elements",
        purpose: "Demonstrates how to embed interactive elements within input fields",
        implementation: [
          "Button elements placed in suffix prop",
          "Click handlers manage state (e.g., password visibility)",
          "Icons provide visual feedback for current state"
        ],
        example: `const [showPassword, setShowPassword] = useState(false);

<Input
  type={showPassword ? 'text' : 'password'}
  suffix={
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-400 hover:text-gray-600"
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  }
/>`,
        notes: [
          "Button type='button' prevents form submission",
          "Hover states improve user experience",
          "State management keeps track of visibility toggle",
          "Can be extended for other interactive suffixes (clear button, dropdown, etc.)"
        ]
      },
      {
        name: "Input State Management",
        purpose: "Handles different input states and user interactions",
        implementation: [
          "useState hooks for dynamic state (password visibility, form values)",
          "Conditional rendering based on state",
          "Event handlers for user interactions"
        ],
        example: `const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
  email: '',
  password: '',
  price: ''
});

const handleInputChange = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};`,
        notes: [
          "Separate state for each interactive element",
          "Immutable state updates for React optimization",
          "Clear state management improves debugging",
          "State can be lifted up for form validation"
        ]
      }
    ]
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Input</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Input fields allow users to enter and edit text data.
        </p>
      </div>

      {/* State Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">State</h2>
        
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium w-24">Normal</span>
              <div className="flex-1 max-w-sm">
                <div
                  className="cursor-pointer"
                  onClick={() => openModal(
                    'Normal Input',
                    <Input
                      label="Label"
                      prefix="$"
                      suffix={<Eye className="w-4 h-4 text-gray-400" />}
                      placeholder=""
                    />,
                    `<div style="display: flex; flex-direction: column; gap: 0.25rem;">
  <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151;">Label</label>
  <div style="position: relative;">
    <div style="position: absolute; top: 0; left: 0; bottom: 0; padding-left: 0.75rem; display: flex; align-items: center; pointer-events: none;">
      <span style="color: #6b7280; font-size: 0.875rem;">$</span>
    </div>
    <input style="display: block; width: 100%; border: 1px solid #d1d5db; background-color: white; padding: 0.5rem 0.75rem; padding-left: 2rem; padding-right: 2.5rem; font-size: 0.875rem; color: #374151;" type="text" placeholder="" />
    <div style="position: absolute; top: 0; right: 0; bottom: 0; padding-right: 0.75rem; display: flex; align-items: center;">
      <svg style="width: 1rem; height: 1rem; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </div>
  </div>
</div>`,
                    `<Input
  label="Label"
  prefix="$"
  suffix={<Eye className="w-4 h-4 text-gray-400" />}
  placeholder=""
/>
`
                  )}
                >
                  <Input
                    label="Label"
                    prefix="$"
                    suffix={<Eye className="w-4 h-4 text-gray-400" />}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium w-24">Hover</span>
              <div className="flex-1 max-w-sm">
                <Input
                  label="Label"
                  prefix="$"
                  suffix={<Eye className="w-4 h-4 text-gray-400" />}
                  placeholder=""
                  className="hover:border-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium w-24">Focus</span>
              <div className="flex-1 max-w-sm">
                <Input
                  label="Label"
                  prefix="$"
                  suffix={<Eye className="w-4 h-4 text-gray-400" />}
                  placeholder="Label"
                  className="ring-2 ring-blue-500 border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium w-24">Filled</span>
              <div className="flex-1 max-w-sm">
                <Input
                  label="Label"
                  prefix="$"
                  suffix={<Eye className="w-4 h-4 text-gray-400" />}
                  value="Input Text"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium w-24">Disabled</span>
              <div className="flex-1 max-w-sm">
                <div
                  className="cursor-pointer"
                  onClick={() => openModal(
                    'Disabled Input',
                    <Input
                      label="Label"
                      prefix="$"
                      suffix={<Eye className="w-4 h-4 text-gray-400" />}
                      value="Input Text"
                      disabled
                    />,
                    `<div style="display: flex; flex-direction: column; gap: 0.25rem;">
  <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #9ca3af;">Label</label>
  <div style="position: relative;">
    <div style="position: absolute; top: 0; left: 0; bottom: 0; padding-left: 0.75rem; display: flex; align-items: center; pointer-events: none;">
      <span style="color: #9ca3af; font-size: 0.875rem;">$</span>
    </div>
    <input style="display: block; width: 100%; border: 1px solid #d1d5db; background-color: #f9fafb; padding: 0.5rem 0.75rem; padding-left: 2rem; padding-right: 2.5rem; font-size: 0.875rem; color: #9ca3af; cursor: not-allowed;" type="text" value="Input Text" disabled />
    <div style="position: absolute; top: 0; right: 0; bottom: 0; padding-right: 0.75rem; display: flex; align-items: center;">
      <svg style="width: 1rem; height: 1rem; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </div>
  </div>
</div>`,
                    `<Input
  label="Label"
  prefix="$"
  suffix={<Eye className="w-4 h-4 text-gray-400" />}
  value="Input Text"
  disabled
/>
`
                  )}
                >
                  <Input
                    label="Label"
                    prefix="$"
                    suffix={<Eye className="w-4 h-4 text-gray-400" />}
                    value="Input Text"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Input</h3>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Password Input</h3>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">With Prefix</h3>
            <Input
              label="Price"
              type="number"
              prefix="$"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">With Error</h3>
            <Input
              label="Username"
              placeholder="Enter username"
              error="Username is required"
            />
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

      {/* Documentation */}
      <Documentation {...documentationData} />
    </div>
  );
};

export default InputPage;
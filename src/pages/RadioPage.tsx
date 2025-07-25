import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

const RadioPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  // Local state for radio examples
  const [basicSelected, setBasicSelected] = useState('option1');
  const [colorSelected, setColorSelected] = useState('blue');
  const [sizeSelected, setSizeSelected] = useState('medium');
  const [disabledSelected, setDisabledSelected] = useState('enabled');

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  // Basic Radio Component
  const RadioButton = ({ 
    name, 
    value, 
    checked, 
    onChange, 
    label, 
    disabled = false,
    size = 'medium'
  }: { 
    name: string;
    value: string;
    checked: boolean; 
    onChange: (value: string) => void; 
    label: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
  }) => {
    const sizeClasses = {
      small: 'w-3 h-3',
      medium: 'w-4 h-4',
      large: 'w-5 h-5'
    };

    const dotSizeClasses = {
      small: 'w-1.5 h-1.5',
      medium: 'w-2 h-2',
      large: 'w-2.5 h-2.5'
    };

    return (
      <label className={`flex items-center space-x-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative">
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.value)}
            disabled={disabled}
            className="sr-only"
          />
          <div className={`${sizeClasses[size]} border-2 rounded-full flex items-center justify-center transition-colors ${
            checked 
              ? 'border-purple-600 bg-white dark:bg-gray-700' 
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
          } ${disabled ? '' : 'hover:border-purple-500'}`}>
            {checked && (
              <div className={`${dotSizeClasses[size]} bg-purple-600 rounded-full`} />
            )}
          </div>
        </div>
        <span className="text-sm text-gray-900 dark:text-white">{label}</span>
      </label>
    );
  };

  // Radio Group Component
  const RadioGroup = ({ 
    name,
    options, 
    value, 
    onChange, 
    label,
    disabled = false,
    direction = 'vertical'
  }: {
    name: string;
    options: { value: string; label: string; disabled?: boolean }[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    disabled?: boolean;
    direction?: 'vertical' | 'horizontal';
  }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
      <div className={`${direction === 'horizontal' ? 'flex space-x-6' : 'space-y-2'}`}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            label={option.label}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Radio Button</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Radio buttons allow users to select one option from a set of mutually exclusive choices.
        </p>
      </div>

      {/* Basic Radio */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Radio Button</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer inline-block"
            onClick={() => openModal(
              'Basic Radio Button',
              <RadioButton 
                name="basic"
                value="option1"
                checked={basicSelected === 'option1'} 
                onChange={setBasicSelected} 
                label="Option 1"
              />,
              `<label class="flex items-center space-x-2 cursor-pointer">
  <div class="relative">
    <input type="radio" name="basic" value="option1" class="sr-only" />
    <div class="w-4 h-4 border-2 rounded-full flex items-center justify-center transition-colors border-purple-600 bg-white">
      <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
    </div>
  </div>
  <span class="text-sm text-gray-900">Option 1</span>
</label>`,
              `const RadioButton = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <div className="relative">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
      <div className={\`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-colors \${
        checked 
          ? 'border-purple-600 bg-white' 
          : 'border-gray-300 bg-white'
      } hover:border-purple-500\`}>
        {checked && <div className="w-2 h-2 bg-purple-600 rounded-full" />}
      </div>
    </div>
    <span className="text-sm text-gray-900">{label}</span>
  </label>
);`
            )}
          >
            <RadioButton 
              name="basic"
              value="option1"
              checked={basicSelected === 'option1'} 
              onChange={setBasicSelected} 
              label="Option 1"
            />
          </div>
        </div>
      </section>

      {/* Radio Group */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Radio Group</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Radio Group',
              <RadioGroup
                name="colors"
                label="Choose your favorite color"
                options={[
                  { value: 'red', label: 'Red' },
                  { value: 'blue', label: 'Blue' },
                  { value: 'green', label: 'Green' },
                  { value: 'purple', label: 'Purple' }
                ]}
                value={colorSelected}
                onChange={setColorSelected}
              />,
              `<div class="space-y-3">
  <h4 class="text-sm font-medium text-gray-900">Choose your favorite color</h4>
  <div class="space-y-2">
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Red</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <span class="text-sm text-gray-900">Blue</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Green</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Purple</span>
    </label>
  </div>
</div>`,
              `const RadioGroup = ({ name, options, value, onChange, label }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-900">{label}</h4>
    <div className="space-y-2">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  </div>
);`
            )}
          >
            <RadioGroup
              name="colors"
              label="Choose your favorite color"
              options={[
                { value: 'red', label: 'Red' },
                { value: 'blue', label: 'Blue' },
                { value: 'green', label: 'Green' },
                { value: 'purple', label: 'Purple' }
              ]}
              value={colorSelected}
              onChange={setColorSelected}
            />
          </div>
        </div>
      </section>

      {/* Horizontal Radio Group */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Horizontal Layout</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Horizontal Radio Group',
              <RadioGroup
                name="size"
                label="Select size"
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' }
                ]}
                value={sizeSelected}
                onChange={setSizeSelected}
                direction="horizontal"
              />,
              `<div class="space-y-3">
  <h4 class="text-sm font-medium text-gray-900">Select size</h4>
  <div class="flex space-x-6">
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Small</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <span class="text-sm text-gray-900">Medium</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Large</span>
    </label>
  </div>
</div>`,
              `<RadioGroup
  name="size"
  label="Select size"
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]}
  value={sizeSelected}
  onChange={setSizeSelected}
  direction="horizontal"
/>`
            )}
          >
            <RadioGroup
              name="size"
              label="Select size"
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]}
              value={sizeSelected}
              onChange={setSizeSelected}
              direction="horizontal"
            />
          </div>
        </div>
      </section>

      {/* Radio Sizes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Radio Button Sizes</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Small</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Small Radio Button',
                  <RadioButton 
                    name="small-demo"
                    value="small"
                    checked={true} 
                    onChange={() => {}} 
                    label="Small size"
                    size="small"
                  />,
                  `<label class="flex items-center space-x-2">
  <div class="w-3 h-3 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
    <div class="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
  </div>
  <span class="text-sm text-gray-900">Small size</span>
</label>`,
                  `<RadioButton size="small" checked={true} label="Small size" />`
                )}
              >
                <RadioButton 
                  name="small-demo"
                  value="small"
                  checked={true} 
                  onChange={() => {}} 
                  label="Small size"
                  size="small"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Medium</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Medium Radio Button',
                  <RadioButton 
                    name="medium-demo"
                    value="medium"
                    checked={true} 
                    onChange={() => {}} 
                    label="Medium size"
                  />,
                  `<label class="flex items-center space-x-2">
  <div class="w-4 h-4 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
    <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
  </div>
  <span class="text-sm text-gray-900">Medium size</span>
</label>`,
                  `<RadioButton checked={true} label="Medium size" />`
                )}
              >
                <RadioButton 
                  name="medium-demo"
                  value="medium"
                  checked={true} 
                  onChange={() => {}} 
                  label="Medium size"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium w-24">Large</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Large Radio Button',
                  <RadioButton 
                    name="large-demo"
                    value="large"
                    checked={true} 
                    onChange={() => {}} 
                    label="Large size"
                    size="large"
                  />,
                  `<label class="flex items-center space-x-2">
  <div class="w-5 h-5 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
    <div class="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
  </div>
  <span class="text-sm text-gray-900">Large size</span>
</label>`,
                  `<RadioButton size="large" checked={true} label="Large size" />`
                )}
              >
                <RadioButton 
                  name="large-demo"
                  value="large"
                  checked={true} 
                  onChange={() => {}} 
                  label="Large size"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Radio States */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Radio Button States</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Unselected</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Unselected Radio',
                  <RadioButton name="state-demo" value="unselected" checked={false} onChange={() => {}} label="Unselected state" />,
                  `<label class="flex items-center space-x-2">
  <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
  <span class="text-sm text-gray-900">Unselected state</span>
</label>`,
                  `<RadioButton checked={false} label="Unselected state" />`
                )}
              >
                <RadioButton name="state-demo" value="unselected" checked={false} onChange={() => {}} label="Unselected state" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Selected</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Selected Radio',
                  <RadioButton name="state-demo2" value="selected" checked={true} onChange={() => {}} label="Selected state" />,
                  `<label class="flex items-center space-x-2">
  <div class="w-4 h-4 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
    <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
  </div>
  <span class="text-sm text-gray-900">Selected state</span>
</label>`,
                  `<RadioButton checked={true} label="Selected state" />`
                )}
              >
                <RadioButton name="state-demo2" value="selected" checked={true} onChange={() => {}} label="Selected state" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium w-24">Disabled</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Disabled Radio',
                  <RadioButton name="state-demo3" value="disabled" checked={false} onChange={() => {}} label="Disabled state" disabled={true} />,
                  `<label class="flex items-center space-x-2 opacity-50 cursor-not-allowed">
  <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
  <span class="text-sm text-gray-900">Disabled state</span>
</label>`,
                  `<RadioButton checked={false} label="Disabled state" disabled={true} />`
                )}
              >
                <RadioButton name="state-demo3" value="disabled" checked={false} onChange={() => {}} label="Disabled state" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disabled Group */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Disabled Radio Group</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Disabled Radio Group',
              <RadioGroup
                name="disabled-group"
                label="Disabled options (example)"
                options={[
                  { value: 'enabled', label: 'Enabled option' },
                  { value: 'disabled', label: 'Disabled option', disabled: true }
                ]}
                value={disabledSelected}
                onChange={setDisabledSelected}
              />,
              `<div class="space-y-3">
  <h4 class="text-sm font-medium text-gray-900">Disabled options (example)</h4>
  <div class="space-y-2">
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 rounded-full border-purple-600 bg-white flex items-center justify-center">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <span class="text-sm text-gray-900">Enabled option</span>
    </label>
    <label class="flex items-center space-x-2 opacity-50 cursor-not-allowed">
      <div class="w-4 h-4 border-2 rounded-full border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Disabled option</span>
    </label>
  </div>
</div>`,
              `<RadioGroup
  name="disabled-group"
  label="Disabled options (example)"
  options={[
    { value: 'enabled', label: 'Enabled option' },
    { value: 'disabled', label: 'Disabled option', disabled: true }
  ]}
  value={disabledSelected}
  onChange={setDisabledSelected}
/>`
            )}
          >
            <RadioGroup
              name="disabled-group"
              label="Disabled options (example)"
              options={[
                { value: 'enabled', label: 'Enabled option' },
                { value: 'disabled', label: 'Disabled option', disabled: true }
              ]}
              value={disabledSelected}
              onChange={setDisabledSelected}
            />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      {/* <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Guidelines</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Use Radio Buttons</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Single selection from 2-7 options
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Mutually exclusive choices
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  When all options should be visible
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Settings and preferences
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Always provide a default selection
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Use clear, descriptive labels
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Keep options concise and parallel
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Consider using dropdowns for 8+ options
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Radio vs Checkbox</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Use radio buttons for single selection from multiple options. Use checkboxes when users can select multiple options or toggle a single option on/off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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

// ===========================
// DOCUMENTATION
// ===========================

/**
 * COMPONENTS USED IN RADIOPAGE
 * 
 * This page showcases radio button implementations with various sizes, states,
 * and grouping patterns. Radio buttons enforce single selection within groups,
 * making them ideal for mutually exclusive choices.
 */

/**
 * 📛 Component: RadioButton
 * 🧩 Purpose: Individual radio button component with customizable appearance and behavior
 * 
 * ⚙️ Props:
 * - name: string (required)
 *   HTML name attribute for grouping radio buttons
 * 
 * - value: string (required)
 *   Unique value for this radio option
 * 
 * - checked: boolean (required)
 *   Whether this radio button is currently selected
 * 
 * - onChange: (value: string) => void (required)
 *   Callback function called when radio button is selected
 * 
 * - label: string (required)
 *   Text label displayed next to the radio button
 * 
 * - disabled?: boolean = false
 *   Disables interaction and applies disabled styling
 * 
 * - size?: 'small' | 'medium' | 'large' = 'medium'
 *   Controls the size of the radio button and inner dot
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Basic radio button
 * <RadioButton
 *   name="payment"
 *   value="credit"
 *   checked={selected === 'credit'}
 *   onChange={setSelected}
 *   label="Credit Card"
 * />
 * 
 * // Large disabled radio
 * <RadioButton
 *   name="plan"
 *   value="premium"
 *   checked={false}
 *   onChange={() => {}}
 *   label="Premium Plan (Coming Soon)"
 *   disabled={true}
 *   size="large"
 * />
 * ```
 * 
 * 📌 Notes:
 * - Uses sr-only input for accessibility with custom visual design
 * - Purple color scheme matches design system
 * - Size affects both outer circle and inner dot proportionally
 * - Hover states only apply when not disabled
 * - Label clicking selects the radio button
 * - Supports dark mode theming
 */

/**
 * 📛 Component: RadioGroup
 * 🧩 Purpose: Container component for managing groups of related radio buttons
 * 
 * ⚙️ Props:
 * - name: string (required)
 *   Shared name for all radio buttons in the group
 * 
 * - options: Array<{value: string, label: string, disabled?: boolean}> (required)
 *   Array of radio button options
 * 
 * - value: string (required)
 *   Currently selected value in the group
 * 
 * - onChange: (value: string) => void (required)
 *   Callback when selection changes
 * 
 * - label: string (required)
 *   Group label displayed above radio buttons
 * 
 * - direction?: 'vertical' | 'horizontal' = 'vertical'
 *   Layout direction for radio buttons
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <RadioGroup
 *   name="shipping"
 *   label="Shipping Method"
 *   options={[
 *     { value: 'standard', label: 'Standard (5-7 days)' },
 *     { value: 'express', label: 'Express (2-3 days)' },
 *     { value: 'overnight', label: 'Overnight' }
 *   ]}
 *   value={shippingMethod}
 *   onChange={setShippingMethod}
 *   direction="vertical"
 * />
 * ```
 * 
 * 📌 Notes:
 * - Manages radio button grouping and mutual exclusion
 * - Consistent spacing and alignment
 * - Supports both vertical and horizontal layouts
 * - Individual options can be disabled while maintaining group functionality
 */

/**
 * 📛 Icons: CheckCircle, Info, AlertCircle (from lucide-react)
 * 🧩 Purpose: Provide visual indicators for different types of content and messaging
 * 
 * ⚙️ Component Usage:
 * - CheckCircle: Used for feature highlights and positive indicators
 * - Info: Used for informational content and best practices
 * - AlertCircle: Used for warnings and important distinctions
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Feature highlight
 * <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
 * 
 * // Information point
 * <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
 * 
 * // Warning message
 * <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
 * ```
 * 
 * 📌 Notes:
 * - Color coding: green for success/features, blue for info, yellow for warnings
 * - flex-shrink-0 prevents distortion in flex layouts
 * - mt-0.5 aligns icons with first line of text
 * - Consistent sizing within content type (w-4 h-4 for lists, w-5 h-5 for callouts)
 */

/**
 * 📛 Pattern: Radio Button State Management
 * 🧩 Purpose: Demonstrates proper state management for single-selection scenarios
 * 
 * ⚙️ Implementation:
 * - String state variables for each group
 * - onChange handlers update selected value
 * - Checked state computed by comparing current value to selected value
 * 
 * 🧪 Usage Example:
 * ```tsx
 * const [selectedPayment, setSelectedPayment] = useState('credit');
 * 
 * const paymentOptions = [
 *   { value: 'credit', label: 'Credit Card' },
 *   { value: 'debit', label: 'Debit Card' },
 *   { value: 'paypal', label: 'PayPal' }
 * ];
 * 
 * {paymentOptions.map(option => (
 *   <RadioButton
 *     key={option.value}
 *     name="payment"
 *     value={option.value}
 *     checked={selectedPayment === option.value}
 *     onChange={setSelectedPayment}
 *     label={option.label}
 *   />
 * ))}
 * ```
 * 
 * 📌 Notes:
 * - Single source of truth for group selection
 * - Automatic mutual exclusion through shared name attribute
 * - Easy to validate and submit form data
 * - Scalable pattern for any number of options
 */

/**
 * 📛 Pattern: Responsive Radio Button Layouts
 * 🧩 Purpose: Adapts radio button groups to different screen sizes and contexts
 * 
 * ⚙️ Implementation:
 * - CSS Grid and Flexbox for responsive layouts
 * - Conditional classes based on screen size
 * - Proper spacing and alignment across devices
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 *   {options.map(option => (
 *     <RadioButton ... />
 *   ))}
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Mobile-first approach with progressive enhancement
 * - Maintains usability across all device sizes
 * - Consistent touch targets for mobile devices
 * - Readable labels and adequate spacing
 */

export default RadioPage;

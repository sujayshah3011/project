import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Check, Minus, Info, CheckCircle } from 'lucide-react';

const CheckboxPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  // Local state for checkbox examples
  const [basicChecked, setBasicChecked] = useState(false);
  const [multipleChecked, setMultipleChecked] = useState<{ [key: string]: boolean }>({
    option1: true,
    option2: false,
    option3: false
  });
  const [indeterminateChecked, setIndeterminateChecked] = useState<{ [key: string]: boolean }>({
    selectAll: false,
    item1: true,
    item2: false,
    item3: true
  });

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  // Basic Checkbox Component
  const BasicCheckbox = ({ checked, onChange, label, disabled = false }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void; 
    label: string;
    disabled?: boolean;
  }) => (
    <label className={`flex items-center space-x-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`w-4 h-4 border-2 flex items-center justify-center transition-colors ${
          checked 
            ? 'bg-purple-600 border-purple-600 text-white' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
        } ${disabled ? '' : 'hover:border-purple-500'}`}>
          {checked && <Check className="w-3 h-3" />}
        </div>
      </div>
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
    </label>
  );

  // Indeterminate Checkbox Component
  const IndeterminateCheckbox = ({ checked, indeterminate, onChange, label }: { 
    checked: boolean; 
    indeterminate: boolean;
    onChange: (checked: boolean) => void; 
    label: string;
  }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-4 h-4 border-2 flex items-center justify-center transition-colors ${
          checked || indeterminate
            ? 'bg-purple-600 border-purple-600 text-white' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
        } hover:border-purple-500`}>
          {indeterminate ? (
            <Minus className="w-3 h-3" />
          ) : checked ? (
            <Check className="w-3 h-3" />
          ) : null}
        </div>
      </div>
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
    </label>
  );

  // Checkbox Group Component
  const CheckboxGroup = ({ options, values, onChange, label }: {
    options: { value: string; label: string; disabled?: boolean }[];
    values: { [key: string]: boolean };
    onChange: (values: { [key: string]: boolean }) => void;
    label: string;
  }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <BasicCheckbox
            key={option.value}
            checked={values[option.value] || false}
            onChange={(checked) => onChange({ ...values, [option.value]: checked })}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </div>
    </div>
  );

  // Helper function to determine indeterminate state
  const getSelectAllState = () => {
    const childItems = ['item1', 'item2', 'item3'];
    const checkedItems = childItems.filter(item => indeterminateChecked[item]);
    
    if (checkedItems.length === 0) return { checked: false, indeterminate: false };
    if (checkedItems.length === childItems.length) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
  };

  const handleSelectAllChange = (checked: boolean) => {
    setIndeterminateChecked({
      selectAll: checked,
      item1: checked,
      item2: checked,
      item3: checked
    });
  };

  const handleIndeterminateItemChange = (item: string, checked: boolean) => {
    const newState = { ...indeterminateChecked, [item]: checked };
    const childItems = ['item1', 'item2', 'item3'];
    const checkedItems = childItems.filter(i => newState[i]);
    newState.selectAll = checkedItems.length === childItems.length;
    setIndeterminateChecked(newState);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Checkbox</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Checkboxes allow users to select one or more options from a set of choices.
        </p>
      </div>

      {/* Basic Checkbox */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Checkbox</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer inline-block"
            onClick={() => openModal(
              'Basic Checkbox',
              <BasicCheckbox 
                checked={basicChecked} 
                onChange={setBasicChecked} 
                label="I agree to the terms and conditions"
              />,
              `<label class="flex items-center space-x-2 cursor-pointer">
  <div class="relative">
    <input type="checkbox" class="sr-only" />
    <div class="w-4 h-4 border-2 flex items-center justify-center transition-colors bg-purple-600 border-purple-600 text-white">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
    </div>
  </div>
  <span class="text-sm text-gray-900">I agree to the terms and conditions</span>
</label>`,
              `const BasicCheckbox = ({ checked, onChange, label }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={\`w-4 h-4 border-2 flex items-center justify-center transition-colors \${
        checked 
          ? 'bg-purple-600 border-purple-600 text-white' 
          : 'border-gray-300 bg-white'
      } hover:border-purple-500\`}>
        {checked && <Check className="w-3 h-3" />}
      </div>
    </div>
    <span className="text-sm text-gray-900">{label}</span>
  </label>
);`
            )}
          >
            <BasicCheckbox 
              checked={basicChecked} 
              onChange={setBasicChecked} 
              label="I agree to the terms and conditions"
            />
          </div>
        </div>
      </section>

      {/* Checkbox States */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkbox States</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Unchecked</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Unchecked Checkbox',
                  <BasicCheckbox checked={false} onChange={() => {}} label="Unchecked state" />,
                  `<label class="flex items-center space-x-2">
  <div class="w-4 h-4 border-2 border-gray-300 bg-white"></div>
  <span class="text-sm text-gray-900">Unchecked state</span>
</label>`,
                  `<BasicCheckbox checked={false} onChange={() => {}} label="Unchecked state" />`
                )}
              >
                <BasicCheckbox checked={false} onChange={() => {}} label="Unchecked state" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Checked</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Checked Checkbox',
                  <BasicCheckbox checked={true} onChange={() => {}} label="Checked state" />,
                  `<label class="flex items-center space-x-2">
  <div class="w-4 h-4 border-2 bg-purple-600 border-purple-600 text-white flex items-center justify-center">
    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    </svg>
  </div>
  <span class="text-sm text-gray-900">Checked state</span>
</label>`,
                  `<BasicCheckbox checked={true} onChange={() => {}} label="Checked state" />`
                )}
              >
                <BasicCheckbox checked={true} onChange={() => {}} label="Checked state" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Indeterminate</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Indeterminate Checkbox',
                  <IndeterminateCheckbox checked={false} indeterminate={true} onChange={() => {}} label="Indeterminate state" />,
                  `<label class="flex items-center space-x-2">
  <div class="w-4 h-4 border-2 bg-purple-600 border-purple-600 text-white flex items-center justify-center">
    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
    </svg>
  </div>
  <span class="text-sm text-gray-900">Indeterminate state</span>
</label>`,
                  `<IndeterminateCheckbox checked={false} indeterminate={true} onChange={() => {}} label="Indeterminate state" />`
                )}
              >
                <IndeterminateCheckbox checked={false} indeterminate={true} onChange={() => {}} label="Indeterminate state" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium w-24">Disabled</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Disabled Checkbox',
                  <BasicCheckbox checked={false} onChange={() => {}} label="Disabled state" disabled={true} />,
                  `<label class="flex items-center space-x-2 opacity-50 cursor-not-allowed">
  <div class="w-4 h-4 border-2 border-gray-300 bg-white"></div>
  <span class="text-sm text-gray-900">Disabled state</span>
</label>`,
                  `<BasicCheckbox checked={false} onChange={() => {}} label="Disabled state" disabled={true} />`
                )}
              >
                <BasicCheckbox checked={false} onChange={() => {}} label="Disabled state" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkbox Group */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkbox Group</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Checkbox Group',
              <CheckboxGroup
                label="Select your interests"
                options={[
                  { value: 'option1', label: 'Design' },
                  { value: 'option2', label: 'Development' },
                  { value: 'option3', label: 'Marketing' }
                ]}
                values={multipleChecked}
                onChange={setMultipleChecked}
              />,
              `<div class="space-y-3">
  <h4 class="text-sm font-medium text-gray-900">Select your interests</h4>
  <div class="space-y-2">
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 bg-purple-600 border-purple-600 text-white flex items-center justify-center">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="text-sm text-gray-900">Design</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Development</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Marketing</span>
    </label>
  </div>
</div>`,
              `const CheckboxGroup = ({ options, values, onChange, label }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-900">{label}</h4>
    <div className="space-y-2">
      {options.map((option) => (
        <BasicCheckbox
          key={option.value}
          checked={values[option.value] || false}
          onChange={(checked) => onChange({ ...values, [option.value]: checked })}
          label={option.label}
        />
      ))}
    </div>
  </div>
);`
            )}
          >
            <CheckboxGroup
              label="Select your interests"
              options={[
                { value: 'option1', label: 'Design' },
                { value: 'option2', label: 'Development' },
                { value: 'option3', label: 'Marketing' }
              ]}
              values={multipleChecked}
              onChange={setMultipleChecked}
            />
          </div>
        </div>
      </section>

      {/* Indeterminate Checkbox Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select All with Indeterminate</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Select All Checkbox',
              <div className="space-y-3">
                <IndeterminateCheckbox
                  checked={getSelectAllState().checked}
                  indeterminate={getSelectAllState().indeterminate}
                  onChange={handleSelectAllChange}
                  label="Select All"
                />
                <div className="ml-6 space-y-2">
                  <BasicCheckbox
                    checked={indeterminateChecked.item1}
                    onChange={(checked) => handleIndeterminateItemChange('item1', checked)}
                    label="Item 1"
                  />
                  <BasicCheckbox
                    checked={indeterminateChecked.item2}
                    onChange={(checked) => handleIndeterminateItemChange('item2', checked)}
                    label="Item 2"
                  />
                  <BasicCheckbox
                    checked={indeterminateChecked.item3}
                    onChange={(checked) => handleIndeterminateItemChange('item3', checked)}
                    label="Item 3"
                  />
                </div>
              </div>,
              `<div class="space-y-3">
  <label class="flex items-center space-x-2 cursor-pointer">
    <div class="w-4 h-4 border-2 bg-purple-600 border-purple-600 text-white flex items-center justify-center">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
      </svg>
    </div>
    <span class="text-sm text-gray-900">Select All</span>
  </label>
  <div class="ml-6 space-y-2">
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 bg-purple-600 border-purple-600 text-white flex items-center justify-center">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="text-sm text-gray-900">Item 1</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 border-gray-300 bg-white"></div>
      <span class="text-sm text-gray-900">Item 2</span>
    </label>
    <label class="flex items-center space-x-2 cursor-pointer">
      <div class="w-4 h-4 border-2 bg-purple-600 border-purple-600 text-white flex items-center justify-center">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="text-sm text-gray-900">Item 3</span>
    </label>
  </div>
</div>`,
              `const SelectAllExample = () => {
  const [values, setValues] = useState({ item1: true, item2: false, item3: true });
  
  const getSelectAllState = () => {
    const checkedItems = Object.values(values).filter(Boolean);
    if (checkedItems.length === 0) return { checked: false, indeterminate: false };
    if (checkedItems.length === Object.keys(values).length) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
  };

  return (
    <div className="space-y-3">
      <IndeterminateCheckbox
        checked={getSelectAllState().checked}
        indeterminate={getSelectAllState().indeterminate}
        onChange={(checked) => setValues({ item1: checked, item2: checked, item3: checked })}
        label="Select All"
      />
      <div className="ml-6 space-y-2">
        {Object.entries(values).map(([key, checked]) => (
          <BasicCheckbox
            key={key}
            checked={checked}
            onChange={(c) => setValues(prev => ({ ...prev, [key]: c }))}
            label={key}
          />
        ))}
      </div>
    </div>
  );
};`
            )}
          >
            <div className="space-y-3">
              <IndeterminateCheckbox
                checked={getSelectAllState().checked}
                indeterminate={getSelectAllState().indeterminate}
                onChange={handleSelectAllChange}
                label="Select All"
              />
              <div className="ml-6 space-y-2">
                <BasicCheckbox
                  checked={indeterminateChecked.item1}
                  onChange={(checked) => handleIndeterminateItemChange('item1', checked)}
                  label="Item 1"
                />
                <BasicCheckbox
                  checked={indeterminateChecked.item2}
                  onChange={(checked) => handleIndeterminateItemChange('item2', checked)}
                  label="Item 2"
                />
                <BasicCheckbox
                  checked={indeterminateChecked.item3}
                  onChange={(checked) => handleIndeterminateItemChange('item3', checked)}
                  label="Item 3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      {/* <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Guidelines</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Use Checkboxes</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Multiple selection from a list of options
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Toggling settings on and off
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Accepting terms and conditions
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Filtering and sorting interfaces
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Use clear, descriptive labels
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Group related options logically
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Consider default checked states carefully
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Provide visual feedback for interactions
                </li>
              </ul>
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
 * COMPONENTS USED IN CHECKBOXPAGE
 * 
 * This page demonstrates various checkbox implementations including basic checkboxes,
 * indeterminate states, checkbox groups, and different styling variations.
 * All components are custom-built for consistent design system integration.
 */

/**
 * 📛 Component: BasicCheckbox
 * 🧩 Purpose: Core checkbox component with customizable states and styling
 * 
 * ⚙️ Props:
 * - checked: boolean (required)
 *   Current checked state of the checkbox
 * 
 * - onChange: (checked: boolean) => void (required)
 *   Callback function called when checkbox state changes
 * 
 * - label: string (required)
 *   Text label displayed next to the checkbox
 * 
 * - disabled?: boolean = false
 *   Disables interaction and applies disabled styling
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Basic checkbox
 * <BasicCheckbox
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   label="Accept terms and conditions"
 * />
 * 
 * // Disabled checkbox
 * <BasicCheckbox
 *   checked={false}
 *   onChange={() => {}}
 *   label="Disabled option"
 *   disabled={true}
 * />
 * ```
 * 
 * 📌 Notes:
 * - Uses sr-only input for accessibility while providing custom styling
 * - Purple color scheme matches design system
 * - Hover states only apply when not disabled
 * - Label clicking toggles checkbox state
 * - Supports dark mode theming
 */

/**
 * 📛 Component: IndeterminateCheckbox
 * 🧩 Purpose: Checkbox that supports indeterminate state (partially checked)
 * 
 * ⚙️ Props:
 * - checked: boolean (required)
 *   Whether checkbox is fully checked
 * 
 * - indeterminate: boolean (required)
 *   Whether checkbox is in indeterminate state (shows minus icon)
 * 
 * - onChange: (checked: boolean) => void (required)
 *   Callback when checkbox state changes
 * 
 * - label: string (required)
 *   Text label for the checkbox
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <IndeterminateCheckbox
 *   checked={allItemsSelected}
 *   indeterminate={someItemsSelected}
 *   onChange={handleSelectAll}
 *   label="Select All"
 * />
 * ```
 * 
 * 📌 Notes:
 * - Indeterminate state takes visual precedence over checked state
 * - Commonly used for "select all" functionality
 * - Minus icon indicates partial selection
 * - Check icon indicates full selection
 */

/**
 * 📛 Component: CheckboxGroup
 * 🧩 Purpose: Manages multiple related checkboxes as a group
 * 
 * ⚙️ Props:
 * - options: Array<{value: string, label: string, disabled?: boolean}> (required)
 *   Array of checkbox options with metadata
 * 
 * - values: {[key: string]: boolean} (required)
 *   Object mapping option values to their checked states
 * 
 * - onChange: (values: {[key: string]: boolean}) => void (required)
 *   Callback with updated values object when any checkbox changes
 * 
 * - label: string (required)
 *   Group label displayed above checkboxes
 * 
 * 🧪 Usage Example:
 * ```tsx
 * const [preferences, setPreferences] = useState({
 *   email: true,
 *   sms: false,
 *   push: true
 * });
 * 
 * <CheckboxGroup
 *   label="Notification Preferences"
 *   options={[
 *     { value: 'email', label: 'Email notifications' },
 *     { value: 'sms', label: 'SMS notifications' },
 *     { value: 'push', label: 'Push notifications' }
 *   ]}
 *   values={preferences}
 *   onChange={setPreferences}
 * />
 * ```
 * 
 * 📌 Notes:
 * - Handles individual checkbox state management internally
 * - Supports disabled individual options
 * - Maintains consistent spacing and alignment
 * - Integrates with parent component state management
 */

/**
 * 📛 Icons: Check, Minus, Info, CheckCircle (from lucide-react)
 * 🧩 Purpose: Provide visual indicators for various checkbox states and UI elements
 * 
 * ⚙️ Component Usage:
 * - Check: Indicates checked state in checkboxes
 * - Minus: Indicates indeterminate state
 * - Info: Used for informational bullet points
 * - CheckCircle: Used for feature/benefit listings
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Inside checkbox
 * {checked && <Check className="w-3 h-3" />}
 * 
 * // Indeterminate state
 * {indeterminate && <Minus className="w-3 h-3" />}
 * 
 * // Information lists
 * <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
 * ```
 * 
 * 📌 Notes:
 * - Consistent sizing: w-3 h-3 for checkbox icons, w-4 h-4 for list icons
 * - Color coding: purple for interactive states, blue for info, green for features
 * - flex-shrink-0 prevents icon distortion in flex layouts
 */

/**
 * 📛 Pattern: State Management for Complex Checkboxes
 * 🧩 Purpose: Demonstrates handling multiple checkbox states and indeterminate logic
 * 
 * ⚙️ Implementation:
 * - Individual state for basic examples
 * - Object state for grouped checkboxes
 * - Computed indeterminate states based on child selections
 * 
 * 🧪 Usage Example:
 * ```tsx
 * const [groupState, setGroupState] = useState({
 *   selectAll: false,
 *   item1: true,
 *   item2: false,
 *   item3: true
 * });
 * 
 * // Compute indeterminate state
 * const selectedItems = Object.entries(groupState)
 *   .filter(([key, value]) => key !== 'selectAll' && value)
 *   .length;
 * const totalItems = Object.keys(groupState).length - 1;
 * const isIndeterminate = selectedItems > 0 && selectedItems < totalItems;
 * ```
 * 
 * 📌 Notes:
 * - Separates UI state from business logic
 * - Handles parent-child checkbox relationships
 * - Maintains consistency across complex checkbox interactions
 * - Supports bulk operations (select all/none)
 */

/**
 * 📛 Pattern: Clickable Wrapper for Disabled Checkboxes
 * 🧩 Purpose: Enables demo functionality for disabled checkbox states
 * 
 * ⚙️ Implementation:
 * - Wrapper div intercepts clicks on disabled checkboxes
 * - Maintains visual disabled appearance
 * - Opens modal for code inspection
 * 
 * 📌 Notes:
 * - Similar pattern to buttons and inputs
 * - Preserves accessibility semantics
 * - Allows showcasing disabled states in component library
 */

export default CheckboxPage;

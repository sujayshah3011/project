import React, { useState, useRef, useEffect } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { ChevronDown, Check, Search, X, Info, AlertCircle } from 'lucide-react';

const SelectDropdownPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  // Local state for select examples
  const [basicSelected, setBasicSelected] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [searchableSelected, setSearchableSelected] = useState('');

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  // Basic Select Component
  const BasicSelect = ({ 
    options, 
    value, 
    onChange, 
    placeholder = "Select an option",
    disabled = false,
    error = false
  }: { 
    options: { value: string; label: string; disabled?: boolean }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(option => option.value === value);

    return (
      <div ref={selectRef} className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-3 py-2 text-left border transition-colors ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500'
          } ${
            disabled
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500'
          } focus:outline-none focus:ring-1`}
        >
          <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          } ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
                disabled={option.disabled}
                className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                  option.value === value 
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-900 dark:text-white'
                } ${
                  option.disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {option.value === value && <Check className="w-4 h-4" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Multi Select Component
  const MultiSelect = ({ 
    options, 
    values, 
    onChange, 
    placeholder = "Select options",
    disabled = false
  }: { 
    options: { value: string; label: string }[];
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (value: string) => {
      if (values.includes(value)) {
        onChange(values.filter(v => v !== value));
      } else {
        onChange([...values, value]);
      }
    };

    const removeValue = (value: string) => {
      onChange(values.filter(v => v !== value));
    };

    return (
      <div ref={selectRef} className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full min-h-[40px] px-3 py-2 border border-gray-300 dark:border-gray-600 cursor-pointer transition-colors ${
            disabled
              ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
          } focus:outline-none focus:ring-1 focus:ring-purple-500`}
        >
          {values.length === 0 ? (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {values.map((value) => {
                const option = options.find(opt => opt.value === value);
                return (
                  <span
                    key={value}
                    className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm"
                  >
                    {option?.label}
                    {!disabled && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeValue(value);
                        }}
                        className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          )}
          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          } ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = values.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    isSelected 
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Searchable Select Component
  const SearchableSelect = ({ 
    options, 
    value, 
    onChange, 
    placeholder = "Search and select...",
    disabled = false
  }: { 
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options.find(option => option.value === value);

    return (
      <div ref={selectRef} className="relative">
        <div
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }
          }}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 cursor-pointer transition-colors ${
            disabled
              ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
          } focus:outline-none focus:ring-1 focus:ring-purple-500`}
        >
          {isOpen ? (
            <div className="flex items-center">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white"
                disabled={disabled}
              />
            </div>
          ) : (
            <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          } ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    option.value === value 
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.value === value && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  // Sample data
  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' }
  ];

  const multiOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' }
  ];

  const searchableOptions = [
    { value: 'afghanistan', label: 'Afghanistan' },
    { value: 'albania', label: 'Albania' },
    { value: 'algeria', label: 'Algeria' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'australia', label: 'Australia' },
    { value: 'austria', label: 'Austria' },
    { value: 'bangladesh', label: 'Bangladesh' },
    { value: 'belgium', label: 'Belgium' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'canada', label: 'Canada' }
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Select Dropdown</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Select dropdowns allow users to choose one or multiple options from a list of choices.
        </p>
      </div>

      {/* Basic Select */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Select</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer max-w-xs"
            onClick={() => openModal(
              'Basic Select',
              <BasicSelect options={basicOptions} value={basicSelected} onChange={setBasicSelected} />,
              `<div class="relative">
  <button class="w-full px-3 py-2 text-left border border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500">
    <span>Select an option</span>
    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </button>
  
  <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg">
    <button class="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-900">Option 1</button>
    <button class="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-900">Option 2</button>
    <button class="w-full px-3 py-2 text-left text-gray-400 cursor-not-allowed">Option 3</button>
    <button class="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-900">Option 4</button>
  </div>
</div>`,
              `const BasicSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`
            )}
          >
            <BasicSelect options={basicOptions} value={basicSelected} onChange={setBasicSelected} />
          </div>
        </div>
      </section>

      {/* Multi Select */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Multi Select</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer max-w-xs"
            onClick={() => openModal(
              'Multi Select',
              <MultiSelect options={multiOptions} values={multiSelected} onChange={setMultiSelected} />,
              `<div class="relative">
  <div class="w-full min-h-[40px] px-3 py-2 border border-gray-300 cursor-pointer bg-white">
    <div class="flex flex-wrap gap-1">
      <span class="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm">
        Blue
        <button class="ml-1 text-purple-600">×</button>
      </span>
      <span class="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm">
        Red
        <button class="ml-1 text-purple-600">×</button>
      </span>
    </div>
    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </div>
</div>`,
              `const MultiSelect = ({ options, values, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOption = (value) => {
    if (values.includes(value)) {
      onChange(values.filter(v => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className="w-full min-h-[40px] px-3 py-2 border border-gray-300 cursor-pointer">
        <div className="flex flex-wrap gap-1">
          {values.map((value) => (
            <span key={value} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm">
              {options.find(opt => opt.value === value)?.label}
              <button onClick={(e) => { e.stopPropagation(); removeValue(value); }}>×</button>
            </span>
          ))}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              {option.label} {values.includes(option.value) && '✓'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`
            )}
          >
            <MultiSelect options={multiOptions} values={multiSelected} onChange={setMultiSelected} />
          </div>
        </div>
      </section>

      {/* Searchable Select */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Searchable Select</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer max-w-xs"
            onClick={() => openModal(
              'Searchable Select',
              <SearchableSelect options={searchableOptions} value={searchableSelected} onChange={setSearchableSelected} />,
              `<div class="relative">
  <div class="w-full px-3 py-2 border border-gray-300 cursor-pointer bg-white">
    <div class="flex items-center">
      <svg class="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
      </svg>
      <input type="text" placeholder="Search and select..." class="flex-1 outline-none bg-transparent" />
    </div>
    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </div>
</div>`,
              `const SearchableSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(true)} className="w-full px-3 py-2 border border-gray-300 cursor-pointer">
        {isOpen ? (
          <div className="flex items-center">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search and select..."
              className="flex-1 outline-none bg-transparent"
            />
          </div>
        ) : (
          <span>{value || 'Search and select...'}</span>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg">
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`
            )}
          >
            <SearchableSelect options={searchableOptions} value={searchableSelected} onChange={setSearchableSelected} />
          </div>
        </div>
      </section>

      {/* Select States */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select States</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Default</span>
              <div 
                className="cursor-pointer max-w-xs flex-1 ml-4"
                onClick={() => openModal(
                  'Default State',
                  <BasicSelect options={basicOptions} value="" onChange={() => {}} />,
                  `<button class="w-full px-3 py-2 text-left border border-gray-300 bg-white text-gray-500">
  Select an option
</button>`,
                  `<BasicSelect options={options} value="" onChange={() => {}} />`
                )}
              >
                <BasicSelect options={basicOptions} value="" onChange={() => {}} />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Selected</span>
              <div 
                className="cursor-pointer max-w-xs flex-1 ml-4"
                onClick={() => openModal(
                  'Selected State',
                  <BasicSelect options={basicOptions} value="option1" onChange={() => {}} />,
                  `<button class="w-full px-3 py-2 text-left border border-gray-300 bg-white text-gray-900">
  Option 1
</button>`,
                  `<BasicSelect options={options} value="option1" onChange={() => {}} />`
                )}
              >
                <BasicSelect options={basicOptions} value="option1" onChange={() => {}} />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Disabled</span>
              <div 
                className="cursor-pointer max-w-xs flex-1 ml-4"
                onClick={() => openModal(
                  'Disabled State',
                  <BasicSelect options={basicOptions} value="" onChange={() => {}} disabled={true} />,
                  `<button class="w-full px-3 py-2 text-left border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
  Select an option
</button>`,
                  `<BasicSelect options={options} value="" onChange={() => {}} disabled={true} />`
                )}
              >
                <BasicSelect options={basicOptions} value="" onChange={() => {}} disabled={true} />
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium w-24">Error</span>
              <div 
                className="cursor-pointer max-w-xs flex-1 ml-4"
                onClick={() => openModal(
                  'Error State',
                  <BasicSelect options={basicOptions} value="" onChange={() => {}} error={true} />,
                  `<button class="w-full px-3 py-2 text-left border border-red-500 bg-white text-gray-500 focus:ring-red-500">
  Select an option
</button>`,
                  `<BasicSelect options={options} value="" onChange={() => {}} error={true} />`
                )}
              >
                <BasicSelect options={basicOptions} value="" onChange={() => {}} error={true} />
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Use Select Dropdowns</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  5+ options to choose from
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Limited screen space
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Familiar options (countries, states)
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Single or multiple selection needed
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
                  Provide default selections when appropriate
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Enable search for long lists
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Group related options logically
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Alternative Components</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  For 2-4 options, consider using radio buttons. For binary choices, use a toggle switch or checkbox.
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

export default SelectDropdownPage;

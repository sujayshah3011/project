import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { ChevronDown, ChevronRight, Plus, Minus, Settings, User, FileText, Info, CheckCircle, AlertCircle } from 'lucide-react';

const AccordionPage: React.FC = () => {
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

  // Basic Accordion Component
  const BasicAccordion = () => {
    const [openItems, setOpenItems] = useState<number[]>([0]);

    const toggleItem = (index: number) => {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    const items = [
      {
        title: 'What is a design system?',
        content: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.'
      },
      {
        title: 'How do I implement components?',
        content: 'Components can be implemented by importing them into your project and following the provided documentation for each component.'
      },
      {
        title: 'Are components customizable?',
        content: 'Yes, all components are built with customization in mind. You can modify styling, behavior, and props to fit your specific needs.'
      }
    ];

    return (
      <div className="w-full space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Single Open Accordion Component
  const SingleAccordion = () => {
    const [openItem, setOpenItem] = useState<number | null>(0);

    const items = [
      {
        title: 'Account Settings',
        content: 'Manage your account preferences, profile information, and security settings.'
      },
      {
        title: 'Notifications',
        content: 'Configure how and when you receive notifications from our platform.'
      },
      {
        title: 'Privacy Controls',
        content: 'Control your privacy settings and data sharing preferences.'
      }
    ];

    return (
      <div className="w-full space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              <ChevronRight 
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  openItem === index ? 'rotate-90' : ''
                }`} 
              />
            </button>
            {openItem === index && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Icon Accordion Component
  const IconAccordion = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    const items = [
      {
        icon: <User className="w-5 h-5" />,
        title: 'User Management',
        content: 'Add, edit, and manage user accounts, roles, and permissions within your organization.'
      },
      {
        icon: <Settings className="w-5 h-5" />,
        title: 'System Configuration',
        content: 'Configure system settings, integrations, and customize the platform to your needs.'
      },
      {
        icon: <FileText className="w-5 h-5" />,
        title: 'Documentation',
        content: 'Access comprehensive guides, API documentation, and best practices for using our platform.'
      }
    ];

    return (
      <div className="w-full space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-purple-600 dark:text-purple-400">
                  {item.icon}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-4 py-3 pl-12 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Plus/Minus Accordion Component
  const PlusMinusAccordion = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    const items = [
      {
        title: 'Frequently Asked Questions',
        content: 'Find answers to the most commonly asked questions about our platform and services.'
      },
      {
        title: 'Troubleshooting Guide',
        content: 'Step-by-step instructions to resolve common issues and problems you might encounter.'
      },
      {
        title: 'Contact Support',
        content: 'Get in touch with our support team for additional help and personalized assistance.'
      }
    ];

    return (
      <div className="w-full space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              <div className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-500">
                {openItems.includes(index) ? (
                  <Minus className="w-3 h-3" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
              </div>
            </button>
            {openItems.includes(index) && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Nested Accordion Component
  const NestedAccordion = () => {
    const [openItems, setOpenItems] = useState<string[]>(['0']);
    const [openSubItems, setOpenSubItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(i => i !== id)
          : [...prev, id]
      );
    };

    const toggleSubItem = (id: string) => {
      setOpenSubItems(prev => 
        prev.includes(id) 
          ? prev.filter(i => i !== id)
          : [...prev, id]
      );
    };

    return (
      <div className="w-full space-y-2">
        <div className="border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleItem('0')}
            className="w-full px-4 py-3 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Component Library</span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-500 transition-transform ${
                openItems.includes('0') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {openItems.includes('0') && (
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-1">
                <button
                  onClick={() => toggleSubItem('0-1')}
                  className="w-full px-6 py-2 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">Form Components</span>
                  <ChevronRight 
                    className={`w-3 h-3 text-gray-400 transition-transform ${
                      openSubItems.includes('0-1') ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                {openSubItems.includes('0-1') && (
                  <div className="px-8 py-2 bg-gray-100 dark:bg-gray-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Buttons, inputs, selects, and other form elements.</p>
                  </div>
                )}
                
                <button
                  onClick={() => toggleSubItem('0-2')}
                  className="w-full px-6 py-2 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">Navigation Components</span>
                  <ChevronRight 
                    className={`w-3 h-3 text-gray-400 transition-transform ${
                      openSubItems.includes('0-2') ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                {openSubItems.includes('0-2') && (
                  <div className="px-8 py-2 bg-gray-100 dark:bg-gray-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Headers, sidebars, breadcrumbs, and menu components.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Status Accordion Component
  const StatusAccordion = () => {
    const [openItems, setOpenItems] = useState<number[]>([0]);

    const toggleItem = (index: number) => {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    const items = [
      {
        title: 'System Status',
        status: 'success',
        content: 'All systems are operational and running smoothly. No issues detected.',
        icon: <CheckCircle className="w-4 h-4" />
      },
      {
        title: 'Maintenance Schedule',
        status: 'warning',
        content: 'Planned maintenance is scheduled for this weekend. Services may be briefly unavailable.',
        icon: <AlertCircle className="w-4 h-4" />
      },
      {
        title: 'Recent Updates',
        status: 'info',
        content: 'Latest features and improvements have been deployed successfully.',
        icon: <Info className="w-4 h-4" />
      }
    ];

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'success': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400';
        case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400';
        case 'info': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400';
        default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:text-gray-400';
      }
    };

    return (
      <div className="w-full space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${getStatusColor(item.status)}`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Accordion</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Collapsible content containers that help organize and display information in a compact, user-friendly format.
        </p>
      </div>

      {/* Basic Accordion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Accordion</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Basic Accordion',
              <BasicAccordion />,
              `<div class="w-full space-y-2">
  <div class="border border-gray-200">
    <button class="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
      <span class="font-medium text-gray-900">What is a design system?</span>
      <svg class="w-4 h-4 text-gray-500 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
      <p class="text-gray-600 text-sm">A design system is a collection of reusable components...</p>
    </div>
  </div>
</div>`,
              `const BasicAccordion = () => {
  const [openItems, setOpenItems] = useState([0]);

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const items = [
    {
      title: 'What is a design system?',
      content: 'A design system is a collection of reusable components...'
    }
  ];

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50"
          >
            <span className="font-medium">{item.title}</span>
            <ChevronDown className={\`w-4 h-4 transition-transform \${openItems.includes(index) ? 'rotate-180' : ''}\`} />
          </button>
          {openItems.includes(index) && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`
            )}
          >
            <BasicAccordion />
          </div>
        </div>
      </section>

      {/* Single Open Accordion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Single Open Accordion</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Single Open Accordion',
              <SingleAccordion />,
              `<div class="w-full space-y-2">
  <div class="border border-gray-200">
    <button class="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50">
      <span class="font-medium text-gray-900">Account Settings</span>
      <svg class="w-4 h-4 text-gray-500 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
      <p class="text-gray-600 text-sm">Manage your account preferences...</p>
    </div>
  </div>
</div>`,
              `const SingleAccordion = () => {
  const [openItem, setOpenItem] = useState(0);

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200">
          <button
            onClick={() => setOpenItem(openItem === index ? null : index)}
            className="w-full px-4 py-3 text-left flex items-center justify-between"
          >
            <span className="font-medium">{item.title}</span>
            <ChevronRight className={\`w-4 h-4 transition-transform \${openItem === index ? 'rotate-90' : ''}\`} />
          </button>
          {openItem === index && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`
            )}
          >
            <SingleAccordion />
          </div>
        </div>
      </section>

      {/* Icon Accordion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Accordion with Icons</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Icon Accordion',
              <IconAccordion />,
              `<div class="w-full space-y-2">
  <div class="border border-gray-200">
    <button class="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50">
      <div class="flex items-center space-x-3">
        <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
        </svg>
        <span class="font-medium text-gray-900">User Management</span>
      </div>
      <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <div class="px-4 py-3 pl-12 border-t border-gray-200 bg-gray-50">
      <p class="text-gray-600 text-sm">Add, edit, and manage user accounts...</p>
    </div>
  </div>
</div>`,
              `const IconAccordion = () => {
  const [openItems, setOpenItems] = useState([]);

  const items = [
    {
      icon: <User className="w-5 h-5" />,
      title: 'User Management',
      content: 'Add, edit, and manage user accounts...'
    }
  ];

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200">
          <button className="w-full px-4 py-3 text-left flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-purple-600">{item.icon}</div>
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronDown className={\`w-4 h-4 transition-transform \${openItems.includes(index) ? 'rotate-180' : ''}\`} />
          </button>
          {openItems.includes(index) && (
            <div className="px-4 py-3 pl-12 border-t bg-gray-50">
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`
            )}
          >
            <IconAccordion />
          </div>
        </div>
      </section>

      {/* Plus/Minus Accordion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Plus/Minus Accordion</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Plus/Minus Accordion',
              <PlusMinusAccordion />,
              `<div class="w-full space-y-2">
  <div class="border border-gray-200">
    <button class="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50">
      <span class="font-medium text-gray-900">Frequently Asked Questions</span>
      <div class="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-500">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </button>
    <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
      <p class="text-gray-600 text-sm">Find answers to the most commonly asked questions...</p>
    </div>
  </div>
</div>`,
              `const PlusMinusAccordion = () => {
  const [openItems, setOpenItems] = useState([]);

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200">
          <button className="w-full px-4 py-3 text-left flex items-center justify-between">
            <span className="font-medium">{item.title}</span>
            <div className="w-6 h-6 flex items-center justify-center border border-gray-300">
              {openItems.includes(index) ? (
                <Minus className="w-3 h-3" />
              ) : (
                <Plus className="w-3 h-3" />
              )}
            </div>
          </button>
          {openItems.includes(index) && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`
            )}
          >
            <PlusMinusAccordion />
          </div>
        </div>
      </section>

      {/* Nested Accordion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nested Accordion</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Nested Accordion',
              <NestedAccordion />,
              `<div class="w-full space-y-2">
  <div class="border border-gray-200">
    <button class="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50">
      <span class="font-medium text-gray-900">Component Library</span>
      <svg class="w-4 h-4 text-gray-500 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <div class="border-t border-gray-200 bg-gray-50">
      <button class="w-full px-6 py-2 text-left flex items-center justify-between hover:bg-gray-100">
        <span class="text-sm text-gray-700">Form Components</span>
        <svg class="w-3 h-3 text-gray-400 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="px-8 py-2 bg-gray-100">
        <p class="text-xs text-gray-600">Buttons, inputs, selects, and other form elements.</p>
      </div>
    </div>
  </div>
</div>`,
              `const NestedAccordion = () => {
  const [openItems, setOpenItems] = useState(['0']);
  const [openSubItems, setOpenSubItems] = useState([]);

  return (
    <div className="w-full space-y-2">
      <div className="border border-gray-200">
        <button
          onClick={() => toggleItem('0')}
          className="w-full px-4 py-3 text-left flex items-center justify-between"
        >
          <span className="font-medium">Component Library</span>
          <ChevronDown className={\`w-4 h-4 transition-transform \${openItems.includes('0') ? 'rotate-180' : ''}\`} />
        </button>
        {openItems.includes('0') && (
          <div className="border-t bg-gray-50">
            <button
              onClick={() => toggleSubItem('0-1')}
              className="w-full px-6 py-2 text-left flex items-center justify-between"
            >
              <span className="text-sm">Form Components</span>
              <ChevronRight className={\`w-3 h-3 transition-transform \${openSubItems.includes('0-1') ? 'rotate-90' : ''}\`} />
            </button>
            {openSubItems.includes('0-1') && (
              <div className="px-8 py-2 bg-gray-100">
                <p className="text-xs text-gray-600">Buttons, inputs, selects...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};`
            )}
          >
            <NestedAccordion />
          </div>
        </div>
      </section>

      {/* Status Accordion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Status Accordion</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Status Accordion',
              <StatusAccordion />,
              `<div class="w-full space-y-2">
  <div class="border border-gray-200">
    <button class="w-full px-4 py-3 text-left flex items-center justify-between text-green-600 bg-green-50 border-green-200">
      <div class="flex items-center space-x-3">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span class="font-medium">System Status</span>
      </div>
      <svg class="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <div class="px-4 py-3 border-t border-gray-200 bg-white">
      <p class="text-gray-600 text-sm">All systems are operational...</p>
    </div>
  </div>
</div>`,
              `const StatusAccordion = () => {
  const [openItems, setOpenItems] = useState([0]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200">
          <button
            className={\`w-full px-4 py-3 text-left flex items-center justify-between \${getStatusColor(item.status)}\`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronDown className={\`w-4 h-4 transition-transform \${openItems.includes(index) ? 'rotate-180' : ''}\`} />
          </button>
          {openItems.includes(index) && (
            <div className="px-4 py-3 border-t bg-white">
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`
            )}
          >
            <StatusAccordion />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      {/* <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Guidelines</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Use Accordions</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  FAQ sections and help documentation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Settings and configuration panels
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Long content that needs to be organized
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Mobile interfaces with limited space
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Use clear, descriptive headers
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Provide visual indicators for state
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Consider single vs multiple open behavior
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Ensure keyboard accessibility
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

export default AccordionPage;

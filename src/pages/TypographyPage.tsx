import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';

const TypographyPage: React.FC = () => {
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

  const headingComponent = <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1</h1>;
  const headingHtml = `<h1 style="font-size: 2.25rem; font-weight: 700; color: #111827;">Heading 1</h1>`;
  const headingReact = `<h1 className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1</h1>`;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Typography</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Typography creates hierarchy and guides users through content with consistent text styles.
        </p>
      </div>

      {/* Headings */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Headings</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {[
              { tag: 'H1', size: 'text-4xl', text: 'Heading 1' },
              { tag: 'H2', size: 'text-3xl', text: 'Heading 2' },
              { tag: 'H3', size: 'text-2xl', text: 'Heading 3' },
              { tag: 'H4', size: 'text-xl', text: 'Heading 4' },
              { tag: 'H5', size: 'text-lg', text: 'Heading 5' },
              { tag: 'H6', size: 'text-base', text: 'Heading 6' },
            ].map((heading) => (
              <div key={heading.tag} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="text-gray-500 font-mono text-sm w-12">{heading.tag}</span>
                <div 
                  className={`${heading.size} font-bold text-gray-900 dark:text-white cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors`}
                  onClick={() => openModal(
                    heading.text,
                    React.createElement(heading.tag.toLowerCase(), { 
                      className: `${heading.size} font-bold text-gray-900 dark:text-white` 
                    }, heading.text),
                    `<${heading.tag.toLowerCase()} style="font-size: ${heading.size.includes('4xl') ? '2.25rem' : heading.size.includes('3xl') ? '1.875rem' : heading.size.includes('2xl') ? '1.5rem' : heading.size.includes('xl') ? '1.25rem' : heading.size.includes('lg') ? '1.125rem' : '1rem'}; font-weight: 700; color: #111827;">${heading.text}</${heading.tag.toLowerCase()}>`,
                    `<${heading.tag.toLowerCase()} className="${heading.size} font-bold text-gray-900 dark:text-white">${heading.text}</${heading.tag.toLowerCase()}>`
                  )}
                >
                  {heading.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Body Text</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {[
              { name: 'Large', size: 'text-lg', text: 'Large body text for emphasis and important content.' },
              { name: 'Regular', size: 'text-base', text: 'Regular body text for standard content and paragraphs.' },
              { name: 'Small', size: 'text-sm', text: 'Small body text for captions and secondary information.' },
              { name: 'Extra Small', size: 'text-xs', text: 'Extra small text for labels and metadata.' },
            ].map((text) => (
              <div key={text.name} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="text-gray-500 font-medium w-24">{text.name}</span>
                <p 
                  className={`${text.size} text-gray-900 dark:text-white cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex-1 ml-8`}
                  onClick={() => openModal(
                    `${text.name} Text`,
                    <p className={`${text.size} text-gray-900 dark:text-white`}>{text.text}</p>,
                    `<p style="font-size: ${text.size.includes('lg') ? '1.125rem' : text.size.includes('base') ? '1rem' : text.size.includes('sm') ? '0.875rem' : '0.75rem'}; color: #111827;">${text.text}</p>`,
                    `<p className="${text.size} text-gray-900 dark:text-white">${text.text}</p>`
                  )}
                >
                  {text.text}
                </p>
              </div>
            ))}
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

export default TypographyPage;
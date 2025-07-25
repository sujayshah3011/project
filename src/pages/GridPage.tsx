import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';

const GridPage: React.FC = () => {
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

  const GridExample = ({ cols, gap }: { cols: number; gap: string }) => (
    <div className={`grid grid-cols-${cols} ${gap}`}>
      {Array.from({ length: cols * 2 }).map((_, i) => (
        <div key={i} className="bg-purple-100 dark:bg-purple-900/20 p-4 text-center text-purple-700 dark:text-purple-300 font-medium">
          Item {i + 1}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Grid System</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A flexible grid system for creating responsive layouts with consistent spacing.
        </p>
      </div>

      {/* Grid Layouts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grid Layouts</h2>
        <div className="space-y-8">
          {[
            { name: '2 Column Grid', cols: 2, gap: 'gap-4' },
            { name: '3 Column Grid', cols: 3, gap: 'gap-4' },
            { name: '4 Column Grid', cols: 4, gap: 'gap-4' },
            { name: '6 Column Grid', cols: 6, gap: 'gap-4' },
          ].map((grid) => (
            <div key={grid.name} className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{grid.name}</h3>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  grid.name,
                  <GridExample cols={grid.cols} gap={grid.gap} />,
                  `<div style="display: grid; grid-template-columns: repeat(${grid.cols}, 1fr); gap: 1rem;">
  ${Array.from({ length: grid.cols * 2 }).map((_, i) => 
    `<div style="background-color: #f3e8ff; padding: 1rem; text-align: center; color: #7c3aed; font-weight: 500;">Item ${i + 1}</div>`
  ).join('\n  ')}
</div>`,
                  `<div className="grid grid-cols-${grid.cols} gap-4">
  ${Array.from({ length: grid.cols * 2 }).map((_, i) => 
    `<div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg text-center text-purple-700 dark:text-purple-300 font-medium">Item ${i + 1}</div>`
  ).join('\n  ')}
</div>`
                )}
              >
                <GridExample cols={grid.cols} gap={grid.gap} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grid Spacing</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {[
              { name: 'No Gap', gap: 'gap-0', value: '0px' },
              { name: 'Small Gap', gap: 'gap-2', value: '8px' },
              { name: 'Medium Gap', gap: 'gap-4', value: '16px' },
              { name: 'Large Gap', gap: 'gap-6', value: '24px' },
              { name: 'Extra Large Gap', gap: 'gap-8', value: '32px' },
            ].map((spacing) => (
              <div key={spacing.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white font-medium">{spacing.name}</span>
                  <span className="text-gray-500 text-sm">{spacing.value}</span>
                </div>
                <div 
                  className="cursor-pointer"
                  onClick={() => openModal(
                    `Grid with ${spacing.name}`,
                    <div className={`grid grid-cols-3 ${spacing.gap}`}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-purple-100 dark:bg-purple-900/20 p-4 text-center text-purple-700 dark:text-purple-300 font-medium">
                          Item {i + 1}
                        </div>
                      ))}
                    </div>,
                    `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: ${spacing.value};">
  ${Array.from({ length: 6 }).map((_, i) => 
    `<div style="background-color: #f3e8ff; padding: 1rem; text-align: center; color: #7c3aed; font-weight: 500;">Item ${i + 1}</div>`
  ).join('\n  ')}
</div>`,
                    `<div className="grid grid-cols-3 ${spacing.gap}">
  ${Array.from({ length: 6 }).map((_, i) => 
    `<div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg text-center text-purple-700 dark:text-purple-300 font-medium">Item ${i + 1}</div>`
  ).join('\n  ')}
</div>`
                  )}
                >
                  <div className={`grid grid-cols-3 ${spacing.gap}`}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-purple-100 dark:bg-purple-900/20 p-4 text-center text-purple-700 dark:text-purple-300 font-medium">
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
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

export default GridPage;
import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Copy } from 'lucide-react';

const ColorsPage: React.FC = () => {
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

  const colorPalettes = {
    primary: {
      name: 'Primary',
      colors: [
        { shade: '50', hex: '#f0f9ff', rgb: '240, 249, 255' },
        { shade: '100', hex: '#e0f2fe', rgb: '224, 242, 254' },
        { shade: '200', hex: '#bae6fd', rgb: '186, 230, 253' },
        { shade: '300', hex: '#7dd3fc', rgb: '125, 211, 252' },
        { shade: '400', hex: '#38bdf8', rgb: '56, 189, 248' },
        { shade: '500', hex: '#0ea5e9', rgb: '14, 165, 233' },
        { shade: '600', hex: '#0284c7', rgb: '2, 132, 199' },
        { shade: '700', hex: '#0369a1', rgb: '3, 105, 161' },
        { shade: '800', hex: '#075985', rgb: '7, 89, 133' },
        { shade: '900', hex: '#0c4a6e', rgb: '12, 74, 110' },
      ]
    },
    purple: {
      name: 'Purple',
      colors: [
        { shade: '50', hex: '#faf5ff', rgb: '250, 245, 255' },
        { shade: '100', hex: '#f3e8ff', rgb: '243, 232, 255' },
        { shade: '200', hex: '#e9d5ff', rgb: '233, 213, 255' },
        { shade: '300', hex: '#d8b4fe', rgb: '216, 180, 254' },
        { shade: '400', hex: '#c084fc', rgb: '192, 132, 252' },
        { shade: '500', hex: '#a855f7', rgb: '168, 85, 247' },
        { shade: '600', hex: '#9333ea', rgb: '147, 51, 234' },
        { shade: '700', hex: '#7c3aed', rgb: '124, 58, 237' },
        { shade: '800', hex: '#6b21a8', rgb: '107, 33, 168' },
        { shade: '900', hex: '#581c87', rgb: '88, 28, 135' },
      ]
    },
    gray: {
      name: 'Gray',
      colors: [
        { shade: '50', hex: '#f9fafb', rgb: '249, 250, 251' },
        { shade: '100', hex: '#f3f4f6', rgb: '243, 244, 246' },
        { shade: '200', hex: '#e5e7eb', rgb: '229, 231, 235' },
        { shade: '300', hex: '#d1d5db', rgb: '209, 213, 219' },
        { shade: '400', hex: '#9ca3af', rgb: '156, 163, 175' },
        { shade: '500', hex: '#6b7280', rgb: '107, 114, 128' },
        { shade: '600', hex: '#4b5563', rgb: '75, 85, 99' },
        { shade: '700', hex: '#374151', rgb: '55, 65, 81' },
        { shade: '800', hex: '#1f2937', rgb: '31, 41, 55' },
        { shade: '900', hex: '#111827', rgb: '17, 24, 39' },
      ]
    },
    success: {
      name: 'Success',
      colors: [
        { shade: '50', hex: '#f0fdf4', rgb: '240, 253, 244' },
        { shade: '100', hex: '#dcfce7', rgb: '220, 252, 231' },
        { shade: '200', hex: '#bbf7d0', rgb: '187, 247, 208' },
        { shade: '300', hex: '#86efac', rgb: '134, 239, 172' },
        { shade: '400', hex: '#4ade80', rgb: '74, 222, 128' },
        { shade: '500', hex: '#22c55e', rgb: '34, 197, 94' },
        { shade: '600', hex: '#16a34a', rgb: '22, 163, 74' },
        { shade: '700', hex: '#15803d', rgb: '21, 128, 61' },
        { shade: '800', hex: '#166534', rgb: '22, 101, 52' },
        { shade: '900', hex: '#14532d', rgb: '20, 83, 45' },
      ]
    },
    warning: {
      name: 'Warning',
      colors: [
        { shade: '50', hex: '#fffbeb', rgb: '255, 251, 235' },
        { shade: '100', hex: '#fef3c7', rgb: '254, 243, 199' },
        { shade: '200', hex: '#fde68a', rgb: '253, 230, 138' },
        { shade: '300', hex: '#fcd34d', rgb: '252, 211, 77' },
        { shade: '400', hex: '#fbbf24', rgb: '251, 191, 36' },
        { shade: '500', hex: '#f59e0b', rgb: '245, 158, 11' },
        { shade: '600', hex: '#d97706', rgb: '217, 119, 6' },
        { shade: '700', hex: '#b45309', rgb: '180, 83, 9' },
        { shade: '800', hex: '#92400e', rgb: '146, 64, 14' },
        { shade: '900', hex: '#78350f', rgb: '120, 53, 15' },
      ]
    },
    error: {
      name: 'Error',
      colors: [
        { shade: '50', hex: '#fef2f2', rgb: '254, 242, 242' },
        { shade: '100', hex: '#fee2e2', rgb: '254, 226, 226' },
        { shade: '200', hex: '#fecaca', rgb: '254, 202, 202' },
        { shade: '300', hex: '#fca5a5', rgb: '252, 165, 165' },
        { shade: '400', hex: '#f87171', rgb: '248, 113, 113' },
        { shade: '500', hex: '#ef4444', rgb: '239, 68, 68' },
        { shade: '600', hex: '#dc2626', rgb: '220, 38, 38' },
        { shade: '700', hex: '#b91c1c', rgb: '185, 28, 28' },
        { shade: '800', hex: '#991b1b', rgb: '153, 27, 27' },
        { shade: '900', hex: '#7f1d1d', rgb: '127, 29, 29' },
      ]
    },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const ColorSwatch = ({ color, paletteName }: { color: any; paletteName: string }) => (
    <div className="group cursor-pointer" onClick={() => copyToClipboard(color.hex)}>
      <div 
        className="w-full h-16 shadow-sm border border-gray-200 dark:border-gray-700 mb-2"
        style={{ backgroundColor: color.hex }}
      />
      <div className="text-center">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{paletteName}-{color.shade}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{color.hex}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">RGB({color.rgb})</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Product Colors</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A comprehensive color system with semantic color tokens for consistent theming.
        </p>
      </div>

      {/* Color Palettes */}
      {Object.entries(colorPalettes).map(([key, palette]) => (
        <section key={key}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{palette.name} Colors</h2>
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {palette.colors.map((color) => (
                <div
                  key={color.shade}
                  onClick={() => openModal(
                    `${palette.name} ${color.shade}`,
                    <div className="text-center">
                      <div 
                        className="w-32 h-32 shadow-lg border border-gray-200 dark:border-gray-700 mb-4 mx-auto"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="space-y-2">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{palette.name}-{color.shade}</div>
                        <div className="text-gray-600 dark:text-gray-400">{color.hex}</div>
                        <div className="text-gray-500 dark:text-gray-500">RGB({color.rgb})</div>
                      </div>
                    </div>,
                    `<div style="width: 8rem; height: 8rem; background-color: ${color.hex}; border: 1px solid #e5e7eb;"></div>`,
                    `<div className="w-32 h-32 border border-gray-200" style={{ backgroundColor: '${color.hex}' }} />`
                  )}
                >
                  <ColorSwatch color={color} paletteName={key} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors">
                Success Button
              </button>
              <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors">
                Error Button
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-sm">
                Success: Operation completed successfully
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                Warning: Please review before proceeding
              </div>
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
                Error: Something went wrong
              </div>
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

export default ColorsPage;
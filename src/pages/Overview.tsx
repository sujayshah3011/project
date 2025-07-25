import React from 'react';

const Overview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Product Design Bible
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A comprehensive design system for building consistent, accessible, and beautiful user interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Components
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Reusable UI components with consistent design patterns.
          </p>
          <div className="text-2xl font-bold text-purple-600">12+</div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Design Tokens
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Colors, typography, and spacing tokens for consistent theming.
          </p>
          <div className="text-2xl font-bold text-purple-600">50+</div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Accessibility
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            WCAG 2.1 AA compliant components with full keyboard support.
          </p>
          <div className="text-2xl font-bold text-purple-600">100%</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
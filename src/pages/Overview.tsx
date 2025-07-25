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

// ===========================
// DOCUMENTATION
// ===========================

/**
 * COMPONENTS USED IN OVERVIEW
 * 
 * This page serves as the main landing page for the design system,
 * providing an introduction and key statistics about the system's
 * components, design tokens, and accessibility features.
 */

/**
 * 📛 Component: StatCard (Implicit)
 * 🧩 Purpose: Displays key metrics and information about the design system
 * 
 * ⚙️ Structure:
 * - Header: Title of the metric category
 * - Description: Brief explanation of the metric
 * - Metric: Large, prominent number with visual emphasis
 * 
 * 🧪 Usage Pattern:
 * ```tsx
 * <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
 *   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 *     Metric Title
 *   </h3>
 *   <p className="text-gray-600 dark:text-gray-300 mb-4">
 *     Description of what this metric represents
 *   </p>
 *   <div className="text-2xl font-bold text-purple-600">Value</div>
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Consistent card styling with border and background
 * - Purple accent color for metrics maintains brand consistency
 * - Dark mode support throughout
 * - Responsive padding and spacing
 * - Typography hierarchy guides user attention
 */

/**
 * 📛 Pattern: Hero Section
 * 🧩 Purpose: Introduces the design system with clear value proposition
 * 
 * ⚙️ Structure:
 * - Main heading (H1) with primary title
 * - Subtitle paragraph explaining purpose and benefits
 * - Large text size for impact and readability
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div>
 *   <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
 *     System Title
 *   </h1>
 *   <p className="text-xl text-gray-600 dark:text-gray-300">
 *     Brief description of purpose and benefits
 *   </p>
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Large typography creates strong first impression
 * - Clear hierarchy between title and description
 * - Neutral colors let content take center stage
 * - Responsive text sizing considerations
 */

/**
 * 📛 Pattern: Responsive Grid Layout
 * 🧩 Purpose: Organizes content cards in a flexible, responsive grid
 * 
 * ⚙️ Implementation:
 * - Single column on mobile (grid-cols-1)
 * - Two columns on medium screens (md:grid-cols-2) 
 * - Three columns on large screens (lg:grid-cols-3)
 * - Consistent gap between grid items
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 *   {cards.map(card => (
 *     <div key={card.id} className="p-6 bg-white border">
 *       {card.content}
 *     </div>
 *   ))}
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Mobile-first responsive approach
 * - Maintains readability at all screen sizes
 * - Consistent spacing with gap utilities
 * - Scalable for additional content cards
 */

/**
 * 📛 Content Strategy: Design System Metrics
 * 🧩 Purpose: Communicates the scope and quality of the design system
 * 
 * ⚙️ Key Metrics:
 * - Components: 12+ reusable UI components
 * - Design Tokens: 50+ standardized values (colors, spacing, etc.)
 * - Accessibility: 100% WCAG 2.1 AA compliance
 * 
 * 🧪 Messaging Strategy:
 * ```tsx
 * const metrics = [
 *   { title: 'Components', value: '12+', description: 'Reusable UI patterns' },
 *   { title: 'Design Tokens', value: '50+', description: 'Consistent theming' },
 *   { title: 'Accessibility', value: '100%', description: 'WCAG compliance' }
 * ];
 * ```
 * 
 * 📌 Notes:
 * - Numbers provide concrete value proposition
 * - Covers technical, design, and accessibility aspects
 * - Easy to update as system grows
 * - Appeals to different stakeholder concerns
 */

/**
 * 📛 Pattern: Dark Mode Implementation
 * 🧩 Purpose: Provides consistent theming across light and dark modes
 * 
 * ⚙️ Implementation:
 * - Conditional classes with dark: prefix
 * - Background and text color coordination
 * - Border color adjustments for proper contrast
 * - Consistent application across all elements
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
 *   Content that adapts to theme
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Follows system-wide dark mode conventions
 * - Maintains readability and contrast in both modes
 * - Consistent with overall design system approach
 * - Easy to maintain and extend
 */

export default Overview;
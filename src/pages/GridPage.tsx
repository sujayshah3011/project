import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import Documentation from '../components/Documentation/Documentation';

const gridDocumentation = {
  title: "Grid System",
  description: "A flexible grid system built on CSS Grid providing responsive layouts with consistent spacing and alignment. Create organized layouts that adapt to different screen sizes and content needs.",
  components: [
    {
      name: "Grid Container",
      purpose: "Wrapper element that establishes grid context and defines layout structure",
      props: [
        {
          name: "grid-cols-{n}",
          type: "1-12",
          description: "Number of columns in the grid layout"
        },
        {
          name: "gap-{size}",
          type: "0, 1, 2, 3, 4, 5, 6, 8, 10, 12",
          description: "Spacing between grid items"
        },
        {
          name: "grid-rows-{n}",
          type: "1-6",
          description: "Number of rows in the grid layout"
        }
      ],
      examples: [
        {
          title: "Basic Grid",
          code: `<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`,
          description: "Simple 3-column grid with medium spacing"
        },
        {
          title: "Responsive Grid",
          code: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Responsive item</div>
</div>`,
          description: "Grid that adapts to screen size: 1 column on mobile, 2 on tablet, 3 on desktop"
        }
      ],
      notes: [
        "Grid items automatically flow into available spaces",
        "Use responsive prefixes (sm:, md:, lg:) for adaptive layouts",
        "Consistent gap spacing maintains visual rhythm",
        "Grid container handles overflow and wrapping automatically"
      ]
    },
    {
      name: "Grid Item",
      purpose: "Individual elements within the grid that can span multiple columns or rows",
      props: [
        {
          name: "col-span-{n}",
          type: "1-12",
          description: "Number of columns the item should span"
        },
        {
          name: "row-span-{n}",
          type: "1-6",
          description: "Number of rows the item should span"
        },
        {
          name: "col-start-{n}",
          type: "1-13",
          description: "Starting column position"
        },
        {
          name: "col-end-{n}",
          type: "1-13",
          description: "Ending column position"
        }
      ],
      examples: [
        {
          title: "Spanning Columns",
          code: `<div className="col-span-2">Wide item</div>`,
          description: "Item that spans 2 columns"
        },
        {
          title: "Positioned Item",
          code: `<div className="col-start-2 col-end-4">Positioned item</div>`,
          description: "Item positioned from column 2 to 4"
        }
      ],
      notes: [
        "Spanning items can create interesting layout patterns",
        "Use positioning for precise control over item placement",
        "Combine spanning with responsive classes for adaptive layouts"
      ]
    }
  ],
  patterns: [
    {
      name: "Responsive Grid Layouts",
      purpose: "Create layouts that adapt gracefully across different screen sizes",
      implementation: [
        "Mobile-first approach: Start with single column",
        "Tablet: 2-3 columns for medium screens",
        "Desktop: 3-4+ columns for large screens",
        "Use consistent breakpoints: sm (640px), md (768px), lg (1024px)"
      ],
      example: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-white p-6 rounded-lg shadow">
      {item.content}
    </div>
  ))}
</div>`
    },
    {
      name: "Grid Spacing System",
      purpose: "Maintain consistent spacing between grid items for visual harmony",
      implementation: [
        "gap-2 (8px): Tight spacing for compact layouts",
        "gap-4 (16px): Standard spacing for most use cases",
        "gap-6 (24px): Generous spacing for card layouts",
        "gap-8 (32px): Large spacing for prominent sections"
      ],
      example: `<!-- Dense layout -->
<div className="grid grid-cols-4 gap-2">

<!-- Standard layout -->
<div className="grid grid-cols-3 gap-4">

<!-- Spacious layout -->
<div className="grid grid-cols-2 gap-8">`,
      notes: [
        "Larger gaps work better with larger grid items",
        "Consider content density when choosing gap size",
        "Maintain consistent gap sizes within related sections"
      ]
    },
    {
      name: "Complex Grid Patterns",
      purpose: "Create sophisticated layouts using grid spanning and positioning",
      implementation: [
        "Feature layouts: Hero item spanning multiple columns",
        "Masonry-style: Items of varying heights",
        "Dashboard layouts: Different sized widgets",
        "Card grids: Consistent item sizes with flexible content"
      ],
      example: `<div className="grid grid-cols-4 grid-rows-3 gap-4">
  <div className="col-span-2 row-span-2">Featured item</div>
  <div className="col-span-1">Regular item</div>
  <div className="col-span-1">Regular item</div>
  <div className="col-span-2">Wide item</div>
</div>`,
      notes: [
        "Plan grid structure before implementing complex layouts",
        "Use spanning strategically to create visual hierarchy",
        "Test layouts across different screen sizes"
      ]
    }
  ]
};

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

      {/* Documentation Section */}
      <Documentation 
        title={gridDocumentation.title}
        description={gridDocumentation.description}
        components={gridDocumentation.components}
        patterns={gridDocumentation.patterns}
      />

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

// ===========================
// DOCUMENTATION
// ===========================

/**
 * COMPONENTS USED IN GRIDPAGE
 * 
 * This page demonstrates CSS Grid layout implementations using Tailwind CSS
 * utilities. It showcases different grid configurations and spacing options
 * for creating responsive, structured layouts.
 */

/**
 * 📛 Component: GridExample
 * 🧩 Purpose: Reusable component for demonstrating grid layouts with different configurations
 * 
 * ⚙️ Props:
 * - cols: number (required)
 *   Number of columns in the grid layout
 * 
 * - gap: string (required)
 *   Tailwind CSS gap utility class (e.g., 'gap-4', 'gap-6')
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // 3-column grid with medium spacing
 * <GridExample cols={3} gap="gap-4" />
 * 
 * // 6-column grid with large spacing
 * <GridExample cols={6} gap="gap-6" />
 * 
 * // 2-column grid with tight spacing
 * <GridExample cols={2} gap="gap-2" />
 * ```
 * 
 * 📌 Notes:
 * - Automatically generates grid items (cols × 2 items)
 * - Consistent styling with purple theme
 * - Dark mode support for background and text
 * - Uses Array.from() for dynamic item generation
 * - Items are numbered sequentially for easy reference
 */

/**
 * 📛 Pattern: Dynamic Grid Configuration
 * 🧩 Purpose: Demonstrates various grid column layouts with consistent presentation
 * 
 * ⚙️ Grid Configurations:
 * - 2 Column: Good for comparison layouts, before/after, etc.
 * - 3 Column: Common for card layouts, feature grids
 * - 4 Column: Standard for product grids, galleries
 * - 6 Column: Dense layouts, icon grids, detailed breakdowns
 * 
 * 🧪 Configuration Pattern:
 * ```tsx
 * const gridConfigs = [
 *   { name: '2 Column Grid', cols: 2, gap: 'gap-4' },
 *   { name: '3 Column Grid', cols: 3, gap: 'gap-4' },
 *   { name: '4 Column Grid', cols: 4, gap: 'gap-4' },
 *   { name: '6 Column Grid', cols: 6, gap: 'gap-4' }
 * ];
 * ```
 * 
 * 📌 Notes:
 * - Consistent gap spacing across all configurations
 * - Descriptive naming for easy identification
 * - Scalable pattern for additional grid types
 * - Each configuration demonstrates specific use cases
 */

/**
 * 📛 Pattern: Grid Spacing Variations
 * 🧩 Purpose: Shows how different gap values affect layout density and visual hierarchy
 * 
 * ⚙️ Spacing Options:
 * - gap-2: 0.5rem (8px) - Tight spacing for dense layouts
 * - gap-4: 1rem (16px) - Standard spacing for most use cases
 * - gap-6: 1.5rem (24px) - Comfortable spacing for content-heavy layouts
 * - gap-8: 2rem (32px) - Generous spacing for emphasis and breathing room
 * 
 * 🧪 Spacing Implementation:
 * ```tsx
 * const spacingOptions = [
 *   { name: 'Tight Spacing', gap: 'gap-2', value: '0.5rem' },
 *   { name: 'Standard Spacing', gap: 'gap-4', value: '1rem' },
 *   { name: 'Comfortable Spacing', gap: 'gap-6', value: '1.5rem' },
 *   { name: 'Generous Spacing', gap: 'gap-8', value: '2rem' }
 * ];
 * ```
 * 
 * 📌 Notes:
 * - Consistent with design system spacing scale
 * - Visual demonstration of spacing impact
 * - Helps designers choose appropriate spacing
 * - Responsive considerations for different screen sizes
 */

/**
 * 📛 Pattern: CSS Grid vs Flexbox
 * 🧩 Purpose: Demonstrates when to use CSS Grid for layout requirements
 * 
 * ⚙️ Grid Advantages:
 * - Two-dimensional layouts (rows and columns)
 * - Precise control over item placement
 * - Equal height items automatically
 * - Responsive breakpoints with grid-cols-* utilities
 * 
 * 🧪 Grid Use Cases:
 * ```tsx
 * // Product galleries
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 * 
 * // Dashboard layouts
 * <div className="grid grid-cols-12 gap-4">
 * 
 * // Form layouts
 * <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 * ```
 * 
 * 📌 Notes:
 * - Better than flexbox for equal-width columns
 * - Natural responsive behavior with breakpoint modifiers
 * - Cleaner markup than traditional float layouts
 * - Browser support excellent for modern applications
 */

/**
 * 📛 Pattern: Responsive Grid Design
 * 🧩 Purpose: Creates layouts that adapt gracefully across device sizes
 * 
 * ⚙️ Responsive Strategy:
 * - Mobile-first approach with single column default
 * - Tablet breakpoint introduces multi-column layouts
 * - Desktop maximizes available space with more columns
 * - Consistent spacing maintained across breakpoints
 * 
 * 🧪 Responsive Implementation:
 * ```tsx
 * // Progressive enhancement
 * <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
 * 
 * // Specific breakpoint targeting
 * <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
 * ```
 * 
 * 📌 Notes:
 * - Prevents content from becoming too narrow on mobile
 * - Optimizes space usage on larger screens
 * - Maintains readability across all device sizes
 * - Easy to customize for specific content requirements
 */

/**
 * 📛 Pattern: Grid Item Styling
 * 🧩 Purpose: Consistent visual treatment for grid demonstration items
 * 
 * ⚙️ Styling Elements:
 * - Background color with theme awareness
 * - Centered text alignment for clarity
 * - Padding for comfortable touch targets
 * - Color coordination with design system
 * 
 * 🧪 Item Styling:
 * ```tsx
 * <div className="bg-purple-100 dark:bg-purple-900/20 p-4 text-center text-purple-700 dark:text-purple-300 font-medium">
 *   Grid Item Content
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Purple theme maintains design system consistency
 * - Dark mode considerations for accessibility
 * - Sufficient padding for touch interaction
 * - Clear visual hierarchy with typography choices
 */

export default GridPage;
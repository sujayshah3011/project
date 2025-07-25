import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import Documentation from '../components/Documentation/Documentation';

const typographyDocumentation = {
  title: "Typography System",
  description: "A comprehensive typography scale providing consistent text styles and hierarchy for building readable and accessible interfaces. Typography creates visual hierarchy and guides users through content.",
  components: [
    {
      name: "Headings (H1-H6)",
      purpose: "Create content hierarchy and structure with semantic heading elements",
      props: [
        {
          name: "level",
          type: "1 | 2 | 3 | 4 | 5 | 6",
          description: "Heading level determining semantic importance and default styling"
        },
        {
          name: "className",
          type: "string",
          description: "Tailwind classes for custom styling"
        }
      ],
      examples: [
        {
          title: "Page Title (H1)",
          code: `<h1 className="text-4xl font-bold text-gray-900 dark:text-white">Page Title</h1>`,
          description: "Primary page heading - 36px, bold weight"
        },
        {
          title: "Section Title (H2)",
          code: `<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Section Title</h2>`,
          description: "Main section headings - 30px, bold weight"
        },
        {
          title: "Subsection (H3)",
          code: `<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Subsection</h3>`,
          description: "Subsection headings - 24px, semibold weight"
        }
      ],
      notes: [
        "Use semantic heading hierarchy (H1 > H2 > H3, etc.)",
        "Only one H1 per page for proper SEO and accessibility",
        "Don't skip heading levels in content structure",
        "Dark mode variants automatically applied with dark: prefix"
      ]
    },
    {
      name: "Body Text",
      purpose: "Provide readable text content with appropriate sizing and spacing",
      props: [
        {
          name: "size",
          type: "'xs' | 'sm' | 'base' | 'lg' | 'xl'",
          description: "Text size variant"
        },
        {
          name: "weight",
          type: "'normal' | 'medium' | 'semibold' | 'bold'",
          description: "Font weight"
        },
        {
          name: "color",
          type: "string",
          description: "Text color class"
        }
      ],
      examples: [
        {
          title: "Default Body Text",
          code: `<p className="text-base text-gray-700 dark:text-gray-300">Regular paragraph text</p>`,
          description: "Standard body text - 16px, normal weight"
        },
        {
          title: "Large Body Text",
          code: `<p className="text-lg text-gray-700 dark:text-gray-300">Large paragraph text</p>`,
          description: "Larger body text for emphasis - 18px"
        },
        {
          title: "Small Text",
          code: `<span className="text-sm text-gray-600 dark:text-gray-400">Small supporting text</span>`,
          description: "Supporting text and captions - 14px"
        }
      ],
      notes: [
        "Maintain consistent line height for readability",
        "Use gray color variants for text hierarchy",
        "Provide sufficient contrast in both light and dark modes",
        "Limit line length to 45-75 characters for optimal reading"
      ]
    }
  ],
  patterns: [
    {
      name: "Typography Scale",
      purpose: "Provide consistent text sizing relationships across the interface",
      implementation: [
        "text-xs: 12px - Fine print, labels, metadata",
        "text-sm: 14px - Supporting text, captions, secondary info",
        "text-base: 16px - Body text, default reading size",
        "text-lg: 18px - Emphasized body text, intro paragraphs",
        "text-xl: 20px - Subheadings, prominent text",
        "text-2xl: 24px - Section headings (H3)",
        "text-3xl: 30px - Major headings (H2)",
        "text-4xl: 36px - Page titles (H1)"
      ],
      example: `<div className="space-y-4">
  <h1 className="text-4xl font-bold">Main Title</h1>
  <h2 className="text-3xl font-bold">Section</h2>
  <p className="text-lg">Lead paragraph</p>
  <p className="text-base">Body text</p>
  <span className="text-sm">Supporting info</span>
</div>`
    },
    {
      name: "Color Hierarchy",
      purpose: "Use color to create visual hierarchy and ensure proper contrast",
      implementation: [
        "Primary text: gray-900 (dark mode: gray-100) - Main content",
        "Secondary text: gray-700 (dark mode: gray-300) - Body text",
        "Tertiary text: gray-600 (dark mode: gray-400) - Supporting text",
        "Disabled text: gray-400 (dark mode: gray-600) - Inactive content",
        "Link text: blue-600 (dark mode: blue-400) - Interactive text"
      ],
      example: `<div className="space-y-2">
  <h2 className="text-gray-900 dark:text-gray-100">Primary heading</h2>
  <p className="text-gray-700 dark:text-gray-300">Body paragraph</p>
  <span className="text-gray-600 dark:text-gray-400">Supporting text</span>
  <span className="text-gray-400 dark:text-gray-600">Disabled text</span>
</div>`,
      notes: [
        "Test contrast ratios for accessibility compliance",
        "Provide appropriate dark mode variants",
        "Use consistent color relationships across components"
      ]
    },
    {
      name: "Responsive Typography",
      purpose: "Adapt text sizes for optimal readability across different screen sizes",
      implementation: [
        "Mobile: Smaller text sizes, tighter spacing",
        "Tablet: Medium text sizes, comfortable spacing",
        "Desktop: Larger text sizes, generous spacing",
        "Use responsive prefixes: sm:, md:, lg:, xl:"
      ],
      example: `<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Responsive heading
</h1>
<p className="text-sm sm:text-base lg:text-lg">
  Responsive body text
</p>`,
      notes: [
        "Test readability on various screen sizes",
        "Maintain proportional relationships at all breakpoints",
        "Consider reading distance for different device types"
      ]
    }
  ]
};

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

      {/* Documentation Section */}
      <Documentation 
        title={typographyDocumentation.title}
        description={typographyDocumentation.description}
        components={typographyDocumentation.components}
        patterns={typographyDocumentation.patterns}
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
 * COMPONENTS USED IN TYPOGRAPHYPAGE
 * 
 * This page demonstrates the design system's typography scale and hierarchy.
 * It showcases different heading levels and body text sizes with their
 * corresponding HTML/React implementations for consistent text styling.
 */

/**
 * 📛 Component: Dynamic Heading Elements (H1-H6)
 * 🧩 Purpose: Demonstrates semantic heading hierarchy with consistent styling
 * 
 * ⚙️ Props (via React.createElement):
 * - className: string
 *   Tailwind CSS classes for size, weight, and color
 * 
 * - children: React.ReactNode
 *   Heading text content
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // H1 - Main page title
 * <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
 *   Page Title
 * </h1>
 * 
 * // H2 - Section heading
 * <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
 *   Section Title
 * </h2>
 * 
 * // H3 - Subsection heading
 * <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
 *   Subsection Title
 * </h3>
 * ```
 * 
 * 📌 Notes:
 * - Follows semantic HTML hierarchy (H1 > H2 > H3, etc.)
 * - Font sizes decrease progressively for visual hierarchy
 * - All headings use font-bold for consistent weight
 * - Dark mode support with conditional text colors
 * - Click functionality opens modal for code inspection
 * - Hover states provide visual feedback
 */

/**
 * 📛 Pattern: Typography Scale Configuration
 * 🧩 Purpose: Defines consistent typography sizing and hierarchy
 * 
 * ⚙️ Scale Structure:
 * - H1: text-4xl (2.25rem / 36px)
 * - H2: text-3xl (1.875rem / 30px)
 * - H3: text-2xl (1.5rem / 24px)
 * - H4: text-xl (1.25rem / 20px)
 * - H5: text-lg (1.125rem / 18px)
 * - H6: text-base (1rem / 16px)
 * 
 * 🧪 Usage Example:
 * ```tsx
 * const headingStyles = [
 *   { tag: 'H1', size: 'text-4xl', text: 'Main Title' },
 *   { tag: 'H2', size: 'text-3xl', text: 'Section Title' },
 *   // ... more levels
 * ];
 * ```
 * 
 * 📌 Notes:
 * - Based on modular scale for visual harmony
 * - Ensures sufficient contrast between heading levels
 * - Responsive considerations for mobile devices
 * - Aligns with web accessibility guidelines
 */

/**
 * 📛 Component: Body Text Variants
 * 🧩 Purpose: Provides different text sizes for various content types
 * 
 * ⚙️ Text Sizes:
 * - Large (text-lg): 1.125rem - Emphasis and important content
 * - Regular (text-base): 1rem - Standard body text
 * - Small (text-sm): 0.875rem - Captions and secondary info
 * - Extra Small (text-xs): 0.75rem - Labels and metadata
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Emphasized paragraph
 * <p className="text-lg text-gray-900 dark:text-white">
 *   Important information that needs emphasis
 * </p>
 * 
 * // Standard body text
 * <p className="text-base text-gray-900 dark:text-white">
 *   Regular paragraph content for main text
 * </p>
 * 
 * // Caption text
 * <p className="text-sm text-gray-600 dark:text-gray-400">
 *   Image caption or secondary information
 * </p>
 * ```
 * 
 * 📌 Notes:
 * - Regular (text-base) is the default for most content
 * - Large size for introductory paragraphs or emphasis
 * - Small sizes use muted colors for visual hierarchy
 * - Maintains readability across all sizes
 * - Consistent line heights for optimal reading experience
 */

/**
 * 📛 Pattern: Interactive Typography Examples
 * 🧩 Purpose: Makes typography examples clickable for code inspection
 * 
 * ⚙️ Implementation:
 * - Hover states with color transitions
 * - Click handlers to open ComponentModal
 * - Dynamic component creation with React.createElement
 * - Responsive layout with proper spacing
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div 
 *   className="cursor-pointer hover:text-purple-600 transition-colors"
 *   onClick={() => openModal(title, component, htmlCode, reactCode)}
 * >
 *   Typography Example
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Purple hover color matches design system
 * - Smooth transitions improve user experience
 * - Modal integration allows code inspection
 * - Maintains semantic HTML structure
 */

/**
 * 📛 Pattern: HTML/React Code Generation
 * 🧩 Purpose: Generates corresponding HTML and React code for typography examples
 * 
 * ⚙️ Implementation:
 * - Dynamic HTML string generation with inline styles
 * - React JSX string generation with Tailwind classes
 * - Font size mapping between Tailwind classes and rem values
 * - Semantic HTML tag preservation
 * 
 * 🧪 Usage Example:
 * ```tsx
 * // HTML output
 * const htmlCode = `<h1 style="font-size: 2.25rem; font-weight: 700;">Title</h1>`;
 * 
 * // React output  
 * const reactCode = `<h1 className="text-4xl font-bold">Title</h1>`;
 * ```
 * 
 * 📌 Notes:
 * - Provides both CSS and utility class implementations
 * - Useful for teams transitioning between approaches
 * - Maintains consistency between display and code
 * - Supports copy-paste workflow for developers
 */

/**
 * 📛 Pattern: Typography Layout Grid
 * 🧩 Purpose: Organizes typography examples in a scannable, consistent layout
 * 
 * ⚙️ Implementation:
 * - Left column: Typography label/identifier
 * - Right column: Live typography example
 * - Border separators between items
 * - Consistent padding and spacing
 * 
 * 🧪 Usage Example:
 * ```tsx
 * <div className="flex items-center justify-between py-4 border-b">
 *   <span className="text-gray-500 font-mono text-sm w-12">H1</span>
 *   <div className="text-4xl font-bold">Example Text</div>
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Monospace font for technical labels
 * - Visual separation improves scannability
 * - Consistent alignment across all examples
 * - Responsive design considerations
 */

export default TypographyPage;
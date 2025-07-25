import React, { useState } from 'react';
import Table from '../components/Table/Table';
import { ComponentModal } from '../components/Modal/ComponentModal';

const TablePage: React.FC = () => {
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

  const headers = ['Name', 'Title', 'Email', 'Role'];
  const data = [
    { name: 'John Doe', title: 'Software Engineer', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', title: 'Product Manager', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Johnson', title: 'Designer', email: 'bob@example.com', role: 'User' },
    { name: 'Alice Brown', title: 'Developer', email: 'alice@example.com', role: 'Admin' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Table</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Tables are used to organize and display data in a structured format, making it easy for users to scan, compare, and analyze information.
        </p>
      </div>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Default Table',
          <Table headers={headers} data={data} />,
          `<table class="min-w-full divide-y divide-gray-200">
  <!-- Table content -->
</table>`,
          `<Table headers={headers} data={data} />`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Default Table</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Table headers={headers} data={data} />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Striped Table',
          <Table headers={headers} data={data} variant="striped" />,
          `<table class="min-w-full divide-y divide-gray-200 table-striped">
  <!-- Table content -->
</table>`,
          `<Table headers={headers} data={data} variant="striped" />`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Striped Table</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Table headers={headers} data={data} variant="striped" />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Bordered Table',
          <Table headers={headers} data={data} variant="bordered" />,
          `<table class="min-w-full divide-y divide-gray-200 border">
  <!-- Table content -->
</table>`,
          `<Table headers={headers} data={data} variant="bordered" />`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bordered Table</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Table headers={headers} data={data} variant="bordered" />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Compact Table',
          <Table headers={headers} data={data} variant="compact" />,
          `<table class="min-w-full divide-y divide-gray-200 table-compact">
  <!-- Table content -->
</table>`,
          `<Table headers={headers} data={data} variant="compact" />`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Compact Table</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Table headers={headers} data={data} variant="compact" />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Hoverable Table',
          <Table headers={headers} data={data} hoverable />,
          `<table class="min-w-full divide-y divide-gray-200 hover:bg-gray-50">
  <!-- Table content -->
</table>`,
          `<Table headers={headers} data={data} hoverable />`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Hoverable Table</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Table headers={headers} data={data} hoverable />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Combined Features Table',
          <Table headers={headers} data={data} variant="bordered" hoverable />,
          `<table class="min-w-full divide-y divide-gray-200 border hover:bg-gray-50">
  <!-- Table content -->
</table>`,
          `<Table 
  headers={headers} 
  data={data} 
  variant="bordered" 
  hoverable 
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Combined Features</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Table headers={headers} data={data} variant="bordered" hoverable />
        </div>
      </section>

      {modalOpen && selectedComponent && (
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
 * COMPONENTS USED IN TABLEPAGE
 * 
 * This page demonstrates various table implementations with different
 * styling variants and features. The Table component is designed for
 * displaying structured data with consistent formatting and accessibility.
 */

/**
 * 📛 Component: Table
 * 🧩 Purpose: Flexible table component for displaying structured data with various styling options
 * 
 * ⚙️ Props:
 * - headers: string[] (required)
 *   Array of column header names
 * 
 * - data: any[] (required)
 *   Array of row objects where each object represents a table row
 * 
 * - variant?: 'default' | 'striped' | 'bordered' | 'compact' = 'default'
 *   Visual styling variant for the table
 * 
 * - hoverable?: boolean = false
 *   Enables hover effects on table rows
 * 
 * 🧪 Usage Examples:
 * ```tsx
 * // Basic table
 * <Table 
 *   headers={['Name', 'Email', 'Role']} 
 *   data={[
 *     { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
 *     { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
 *   ]}
 * />
 * 
 * // Striped table with hover
 * <Table 
 *   headers={headers} 
 *   data={userData}
 *   variant="striped"
 *   hoverable={true}
 * />
 * 
 * // Compact bordered table
 * <Table 
 *   headers={headers} 
 *   data={data}
 *   variant="bordered"
 * />
 * ```
 * 
 * 📌 Notes:
 * - Automatically extracts object keys for table cells
 * - Responsive design with horizontal scrolling
 * - Consistent typography and spacing
 * - Dark mode support through CSS classes
 * - Accessible table structure with proper headers
 * - Object.values() used to extract cell data from row objects
 */

/**
 * 📛 Variant Types Explanation:
 * 🧩 Purpose: Different visual presentations for various use cases
 * 
 * ⚙️ Variant Details:
 * - default: Clean, minimal table with basic borders
 * - striped: Alternating row background colors for easier scanning
 * - bordered: Full borders around all cells for clear data separation
 * - compact: Reduced padding for dense data display
 * 
 * 🧪 Visual Characteristics:
 * ```tsx
 * // Default: Clean and minimal
 * <Table variant="default" />
 * 
 * // Striped: Alternating gray backgrounds
 * <Table variant="striped" />
 * 
 * // Bordered: Full cell borders
 * <Table variant="bordered" />
 * 
 * // Compact: Tighter spacing
 * <Table variant="compact" />
 * ```
 * 
 * 📌 Notes:
 * - Variants can be combined with hoverable property
 * - Each variant maintains accessibility standards
 * - Color scheme adapts to dark mode
 * - Consistent with overall design system
 */

/**
 * 📛 Pattern: Data Structure Requirements
 * 🧩 Purpose: Defines expected data format for table consumption
 * 
 * ⚙️ Data Format:
 * - Array of objects where each object is a table row
 * - Object keys don't need to match header names exactly
 * - Values are displayed in object property order
 * - Supports any data type that can be rendered as string
 * 
 * 🧪 Example Data Structure:
 * ```tsx
 * const headers = ['Name', 'Title', 'Email', 'Role'];
 * const data = [
 *   { 
 *     name: 'John Doe', 
 *     title: 'Software Engineer', 
 *     email: 'john@example.com', 
 *     role: 'Admin' 
 *   },
 *   { 
 *     name: 'Jane Smith', 
 *     title: 'Product Manager', 
 *     email: 'jane@example.com', 
 *     role: 'User' 
 *   }
 * ];
 * ```
 * 
 * 📌 Notes:
 * - Object property order should match header order
 * - Consistent property names across all row objects
 * - Missing properties will display as undefined
 * - Can handle complex data with appropriate toString methods
 */

/**
 * 📛 Pattern: Section-Based Table Examples
 * 🧩 Purpose: Organizes different table variants in clickable sections
 * 
 * ⚙️ Implementation:
 * - Each section demonstrates a specific table configuration
 * - Consistent layout with heading and bordered container
 * - Click functionality opens modal for code inspection
 * - Hover effects provide visual feedback
 * 
 * 🧪 Section Structure:
 * ```tsx
 * <section 
 *   className="space-y-6 cursor-pointer transition-all hover:opacity-90"
 *   onClick={() => openModal(title, component, htmlCode, reactCode)}
 * >
 *   <h2 className="text-2xl font-semibold">Variant Name</h2>
 *   <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
 *     <Table {...props} />
 *   </div>
 * </section>
 * ```
 * 
 * 📌 Notes:
 * - Consistent presentation across all variants
 * - Visual hierarchy with section headings
 * - Interactive elements for code exploration
 * - Responsive design considerations
 */

/**
 * 📛 Pattern: Table Accessibility Features
 * 🧩 Purpose: Ensures tables are accessible to all users
 * 
 * ⚙️ Accessibility Implementation:
 * - Proper table structure with thead/tbody
 * - Header cells use th elements with scope
 * - Consistent text contrast ratios
 * - Keyboard navigation support
 * - Screen reader friendly markup
 * 
 * 🧪 Accessibility Features:
 * ```tsx
 * // Proper table structure
 * <table>
 *   <thead>
 *     <tr>
 *       <th scope="col">Header</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>Data</td>
 *     </tr>
 *   </tbody>
 * </table>
 * ```
 * 
 * 📌 Notes:
 * - Follows WCAG guidelines for table accessibility
 * - Clear visual hierarchy aids understanding
 * - Responsive design maintains usability
 * - Color is not the only means of conveying information
 */

/**
 * 📛 Pattern: Responsive Table Design
 * 🧩 Purpose: Handles table display across different screen sizes
 * 
 * ⚙️ Implementation:
 * - Overflow scroll container for wide tables
 * - min-w-full ensures proper table width
 * - Consistent padding and spacing
 * - Mobile-friendly interaction areas
 * 
 * 🧪 Responsive Strategy:
 * ```tsx
 * <div className="overflow-x-auto">
 *   <table className="min-w-full">
 *     // Table content
 *   </table>
 * </div>
 * ```
 * 
 * 📌 Notes:
 * - Horizontal scrolling for wide tables on mobile
 * - Maintains table structure rather than stacking
 * - Touch-friendly interaction areas
 * - Readable text at all screen sizes
 */

export default TablePage;

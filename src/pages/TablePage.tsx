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

export default TablePage;

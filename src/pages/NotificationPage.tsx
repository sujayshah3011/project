import React, { useState } from 'react';
import Notification from '../components/Notification/Notification';
import { ComponentModal } from '../components/Modal/ComponentModal';

const NotificationPage: React.FC = () => {
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

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Notification</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Notifications provide important alerts and messages to users, with different variants for various contexts and scenarios.
        </p>
      </div>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Info Notification',
          <Notification
            title="Information"
            message="This is an informational notification with useful details."
            variant="info"
          />,
          `<div class="flex items-start p-4 rounded-lg border bg-blue-50 border-blue-200">
  <!-- Notification content -->
</div>`,
          `<Notification
  title="Information"
  message="This is an informational notification with useful details."
  variant="info"
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Info Notification</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Notification
            title="Information"
            message="This is an informational notification with useful details."
            variant="info"
          />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Success Notification',
          <Notification
            title="Success"
            message="Operation completed successfully!"
            variant="success"
          />,
          `<div class="flex items-start p-4 rounded-lg border bg-green-50 border-green-200">
  <!-- Notification content -->
</div>`,
          `<Notification
  title="Success"
  message="Operation completed successfully!"
  variant="success"
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Success Notification</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Notification
            title="Success"
            message="Operation completed successfully!"
            variant="success"
          />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Warning Notification',
          <Notification
            title="Warning"
            message="Please review the changes before proceeding."
            variant="warning"
          />,
          `<div class="flex items-start p-4 rounded-lg border bg-yellow-50 border-yellow-200">
  <!-- Notification content -->
</div>`,
          `<Notification
  title="Warning"
  message="Please review the changes before proceeding."
  variant="warning"
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Warning Notification</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Notification
            title="Warning"
            message="Please review the changes before proceeding."
            variant="warning"
          />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Error Notification',
          <Notification
            title="Error"
            message="An error occurred while processing your request."
            variant="error"
          />,
          `<div class="flex items-start p-4 rounded-lg border bg-red-50 border-red-200">
  <!-- Notification content -->
</div>`,
          `<Notification
  title="Error"
  message="An error occurred while processing your request."
  variant="error"
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Error Notification</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Notification
            title="Error"
            message="An error occurred while processing your request."
            variant="error"
          />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Without Title',
          <Notification
            message="A simple notification without a title."
            variant="info"
          />,
          `<div class="flex items-start p-4 rounded-lg border bg-blue-50 border-blue-200">
  <!-- Notification content -->
</div>`,
          `<Notification
  message="A simple notification without a title."
  variant="info"
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Without Title</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Notification
            message="A simple notification without a title."
            variant="info"
          />
        </div>
      </section>

      <section 
        className="space-y-6 cursor-pointer transition-all hover:opacity-90"
        onClick={() => openModal(
          'Without Close Button',
          <Notification
            title="Non-dismissible"
            message="A notification without a close button."
            variant="success"
            showClose={false}
          />,
          `<div class="flex items-start p-4 rounded-lg border bg-green-50 border-green-200">
  <!-- Notification content -->
</div>`,
          `<Notification
  title="Non-dismissible"
  message="A notification without a close button."
  variant="success"
  showClose={false}
/>`
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Without Close Button</h2>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <Notification
            title="Non-dismissible"
            message="A notification without a close button."
            variant="success"
            showClose={false}
          />
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

export default NotificationPage;

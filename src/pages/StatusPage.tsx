import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { CheckCircle, AlertCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const StatusPage: React.FC = () => {
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

  const StatusBadge = ({ type, children }: { type: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }) => {
    const styles = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium ${styles[type]}`}>
        {children}
      </span>
    );
  };

  const StatusAlert = ({ type, title, message }: { type: 'success' | 'warning' | 'error' | 'info'; title: string; message: string }) => {
    const icons = {
      success: CheckCircle,
      warning: AlertTriangle,
      error: XCircle,
      info: Info,
    };

    const styles = {
      success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300',
      error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300',
      info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300',
    };

    const Icon = icons[type];

    return (
      <div className={`p-4 border ${styles[type]}`}>
        <div className="flex items-start">
          <Icon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="mt-1 text-sm opacity-90">{message}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Status Components</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Status components communicate the state of a system, process, or user action.
        </p>
      </div>

      {/* Status Badges */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Status Badges</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {[
              { type: 'success' as const, label: 'Success', message: 'Active' },
              { type: 'warning' as const, label: 'Warning', message: 'Pending' },
              { type: 'error' as const, label: 'Error', message: 'Failed' },
              { type: 'info' as const, label: 'Info', message: 'Processing' },
            ].map((status) => (
              <div key={status.type} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="text-gray-900 dark:text-white font-medium w-24">{status.label}</span>
                <div 
                  className="cursor-pointer"
                  onClick={() => openModal(
                    `${status.label} Badge`,
                    <StatusBadge type={status.type}>{status.message}</StatusBadge>,
                    `<span style="display: inline-flex; align-items: center; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; background-color: ${status.type === 'success' ? '#dcfce7' : status.type === 'warning' ? '#fef3c7' : status.type === 'error' ? '#fee2e2' : '#dbeafe'}; color: ${status.type === 'success' ? '#166534' : status.type === 'warning' ? '#92400e' : status.type === 'error' ? '#991b1b' : '#1e40af'};">${status.message}</span>`,
                    `<StatusBadge type="${status.type}">${status.message}</StatusBadge>`
                  )}
                >
                  <StatusBadge type={status.type}>{status.message}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Alerts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Status Alerts</h2>
        <div className="space-y-6">
          {[
            { 
              type: 'success' as const, 
              title: 'Success Alert', 
              message: 'Your changes have been saved successfully.',
              alertTitle: 'Changes saved',
              alertMessage: 'Your profile has been updated successfully.'
            },
            { 
              type: 'warning' as const, 
              title: 'Warning Alert', 
              message: 'Please review the information before proceeding.',
              alertTitle: 'Review required',
              alertMessage: 'Some fields may need your attention before submitting.'
            },
            { 
              type: 'error' as const, 
              title: 'Error Alert', 
              message: 'An error occurred while processing your request.',
              alertTitle: 'Error occurred',
              alertMessage: 'Unable to save changes. Please try again later.'
            },
            { 
              type: 'info' as const, 
              title: 'Info Alert', 
              message: 'Additional information about this process.',
              alertTitle: 'Information',
              alertMessage: 'This action will affect all connected services.'
            },
          ].map((alert) => (
            <div key={alert.type} className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{alert.title}</h3>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  alert.title,
                  <StatusAlert type={alert.type} title={alert.alertTitle} message={alert.alertMessage} />,
                  `<div style="padding: 1rem; border-radius: 0.5rem; border: 1px solid ${alert.type === 'success' ? '#bbf7d0' : alert.type === 'warning' ? '#fde68a' : alert.type === 'error' ? '#fecaca' : '#bfdbfe'}; background-color: ${alert.type === 'success' ? '#f0fdf4' : alert.type === 'warning' ? '#fffbeb' : alert.type === 'error' ? '#fef2f2' : '#eff6ff'}; color: ${alert.type === 'success' ? '#166534' : alert.type === 'warning' ? '#92400e' : alert.type === 'error' ? '#991b1b' : '#1e40af'};">
  <div style="display: flex; align-items: flex-start;">
    <svg style="width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; margin-top: 0.125rem; flex-shrink: 0;" fill="currentColor" viewBox="0 0 20 20">
      <!-- Icon SVG would go here -->
    </svg>
    <div>
      <h4 style="font-weight: 500;">${alert.alertTitle}</h4>
      <p style="margin-top: 0.25rem; font-size: 0.875rem; opacity: 0.9;">${alert.alertMessage}</p>
    </div>
  </div>
</div>`,
                  `<StatusAlert type="${alert.type}" title="${alert.alertTitle}" message="${alert.alertMessage}" />`
                )}
              >
                <StatusAlert type={alert.type} title={alert.alertTitle} message={alert.alertMessage} />
              </div>
            </div>
          ))}
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

export default StatusPage;
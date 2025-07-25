import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { X, AlertTriangle, CheckCircle, Info, Bell, Settings, User } from 'lucide-react';
import { Button } from '../components/Button/Button';

const PopupModalPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  // Local state for different modal examples
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  // Basic Modal Component
  const BasicModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Modal</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                This is a basic modal dialog. It can contain any content you need to display to the user.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={onClose}>Confirm</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Modal Component
  const ConfirmModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-3 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">Delete Item</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this item? This action cannot be undone.
                  </p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="danger" onClick={onClose}>Delete</Button>
                  <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Alert Modal Component
  const AlertModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-3 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your action has been completed successfully.
                  </p>
                </div>
                <div className="mt-4">
                  <Button variant="primary" onClick={onClose}>Continue</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Form Modal Component
  const FormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" rows={3} placeholder="Tell us about yourself"></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onClose}>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Tooltip Component
  const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {children}
        </div>
        {visible && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 whitespace-nowrap z-10">
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  };

  // Popover Component
  const Popover = ({ children, content, isOpen, onToggle }: { children: React.ReactNode; content: React.ReactNode; isOpen: boolean; onToggle: () => void }) => {
    return (
      <div className="relative inline-block">
        <div onClick={onToggle}>
          {children}
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
            <div className="p-4">
              {content}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popups & Modals</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Modal dialogs, popups, tooltips, and popovers for displaying content above the main interface.
        </p>
      </div>

      {/* Modal Types */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Modal Types</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Modal</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Basic Modal',
                <Button onClick={() => setBasicModalOpen(true)}>Open Basic Modal</Button>,
                `<div class="fixed inset-0 z-50 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
    <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Basic Modal</h3>
        <button class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="mb-4">
        <p class="text-sm text-gray-500">This is a basic modal dialog.</p>
      </div>
      <div class="flex justify-end space-x-2">
        <button class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300">Cancel</button>
        <button class="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700">Confirm</button>
      </div>
    </div>
  </div>
</div>`,
                `const BasicModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        <div className="bg-white p-6 max-w-md w-full shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Basic Modal</h3>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            This is a basic modal dialog.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};`
              )}
            >
              <Button onClick={() => setBasicModalOpen(true)}>Open Basic Modal</Button>
            </div>
            <BasicModal isOpen={basicModalOpen} onClose={() => setBasicModalOpen(false)} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirmation Modal</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Confirmation Modal',
                <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>Delete Item</Button>,
                `<div class="fixed inset-0 z-50 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    <div class="bg-white p-6 max-w-md w-full shadow-xl">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-lg font-medium text-gray-900">Delete Item</h3>
          <p class="text-sm text-gray-500 mt-2">Are you sure you want to delete this item?</p>
          <div class="mt-4 flex space-x-2">
            <button class="px-4 py-2 text-white bg-red-600 hover:bg-red-700">Delete</button>
            <button class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
                `const ConfirmModal = ({ isOpen, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="bg-white p-6 max-w-md w-full shadow-xl">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div className="ml-3">
            <h3 className="text-lg font-medium">Delete Item</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete this item?
            </p>
            <div className="mt-4 flex space-x-2">
              <Button variant="danger" onClick={onClose}>Delete</Button>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);`
              )}
            >
              <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>Delete Item</Button>
            </div>
            <ConfirmModal isOpen={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alert Modal</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Alert Modal',
                <Button onClick={() => setAlertModalOpen(true)}>Show Success</Button>,
                `<div class="fixed inset-0 z-50 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    <div class="bg-white p-6 max-w-md w-full shadow-xl">
      <div class="flex items-start">
        <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <div class="ml-3">
          <h3 class="text-lg font-medium text-gray-900">Success!</h3>
          <p class="text-sm text-gray-500 mt-2">Your action has been completed successfully.</p>
          <button class="mt-4 px-4 py-2 text-white bg-purple-600 hover:bg-purple-700">Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
                `const AlertModal = ({ isOpen, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="bg-white p-6 max-w-md w-full shadow-xl">
        <div className="flex items-start">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div className="ml-3">
            <h3 className="text-lg font-medium">Success!</h3>
            <p className="text-sm text-gray-500 mt-2">
              Your action has been completed successfully.
            </p>
            <Button variant="primary" onClick={onClose} className="mt-4">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);`
              )}
            >
              <Button onClick={() => setAlertModalOpen(true)}>Show Success</Button>
            </div>
            <AlertModal isOpen={alertModalOpen} onClose={() => setAlertModalOpen(false)} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Form Modal</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Form Modal',
                <Button onClick={() => setFormModalOpen(true)}><User className="w-4 h-4 mr-2" />Edit Profile</Button>,
                `<div class="fixed inset-0 z-50 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    <div class="bg-white p-6 max-w-lg w-full shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Edit Profile</h3>
        <button class="text-gray-400 hover:text-gray-600">×</button>
      </div>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300" placeholder="Enter your name" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" class="w-full px-3 py-2 border border-gray-300" placeholder="Enter your email" />
        </div>
        <div class="flex justify-end space-x-2 pt-4">
          <button class="px-4 py-2 text-gray-700 bg-gray-200">Cancel</button>
          <button class="px-4 py-2 text-white bg-purple-600">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</div>`,
                `const FormModal = ({ isOpen, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="bg-white p-6 max-w-lg w-full shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Edit Profile</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300" />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>Save</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);`
              )}
            >
              <Button onClick={() => setFormModalOpen(true)}><User className="w-4 h-4 mr-2" />Edit Profile</Button>
            </div>
            <FormModal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} />
          </div>
        </div>
      </section>

      {/* Tooltips */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tooltips</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Tooltips',
              <div className="flex space-x-4">
                <Tooltip text="This is a tooltip">
                  <Button variant="secondary">Hover me</Button>
                </Tooltip>
                <Tooltip text="Settings tooltip">
                  <Button variant="secondary"><Settings className="w-4 h-4" /></Button>
                </Tooltip>
                <Tooltip text="Notification tooltip">
                  <Button variant="secondary"><Bell className="w-4 h-4" /></Button>
                </Tooltip>
              </div>,
              `<div class="relative inline-block">
  <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300">Hover me</button>
  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 whitespace-nowrap z-10 opacity-0 hover:opacity-100">
    This is a tooltip
    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
  </div>
</div>`,
              `const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 whitespace-nowrap z-10">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};`
            )}
          >
            <div className="flex space-x-4">
              <Tooltip text="This is a tooltip">
                <Button variant="secondary">Hover me</Button>
              </Tooltip>
              <Tooltip text="Settings tooltip">
                <Button variant="secondary"><Settings className="w-4 h-4" /></Button>
              </Tooltip>
              <Tooltip text="Notification tooltip">
                <Button variant="secondary"><Bell className="w-4 h-4" /></Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* Popovers */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popovers</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Popovers',
              <Popover
                isOpen={popoverVisible}
                onToggle={() => setPopoverVisible(!popoverVisible)}
                content={
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">User Actions</h4>
                    <div className="space-y-2">
                      <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">View Profile</button>
                      <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Edit Settings</button>
                      <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                    </div>
                  </div>
                }
              >
                <Button variant="secondary">Click for Popover</Button>
              </Popover>,
              `<div class="relative inline-block">
  <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300">Click for Popover</button>
  <div class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
    <div class="p-4">
      <h4 class="font-medium text-gray-900 mb-2">User Actions</h4>
      <div class="space-y-2">
        <button class="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">View Profile</button>
        <button class="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Edit Settings</button>
        <button class="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
      </div>
    </div>
  </div>
</div>`,
              `const Popover = ({ children, content, isOpen, onToggle }) => (
  <div className="relative inline-block">
    <div onClick={onToggle}>
      {children}
    </div>
    {isOpen && (
      <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
        <div className="p-4">
          {content}
        </div>
      </div>
    )}
  </div>
);`
            )}
          >
            <Popover
              isOpen={popoverVisible}
              onToggle={() => setPopoverVisible(!popoverVisible)}
              content={
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">User Actions</h4>
                  <div className="space-y-2">
                    <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">View Profile</button>
                    <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Edit Settings</button>
                    <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </div>
                </div>
              }
            >
              <Button variant="secondary">Click for Popover</Button>
            </Popover>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      {/* <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Guidelines</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Use Modals</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Critical actions that require user confirmation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Forms that don't require a full page
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Displaying detailed information
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Alert messages and notifications
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Always provide a clear way to close
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Use appropriate modal sizes
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Include proper focus management
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Consider mobile experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* Component Modal */}
      {selectedComponent && (
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

export default PopupModalPage;

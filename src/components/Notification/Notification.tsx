import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface NotificationProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  showClose?: boolean;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  variant = 'info',
  title,
  message,
  showClose = true,
  onClose,
}) => {
  const variants = {
    info: {
      containerClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    success: {
      containerClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200',
      textClass: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    },
    error: {
      containerClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-800',
      icon: <XCircle className="w-5 h-5 text-red-500" />,
    },
  };

  const { containerClass, textClass, icon } = variants[variant];

  return (
    <div className={`flex items-start p-4 rounded-lg border ${containerClass}`} role="alert">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3 flex-1">
        {title && (
          <h3 className={`text-sm font-medium ${textClass}`}>
            {title}
          </h3>
        )}
        <div className={`text-sm mt-1 ${textClass}`}>
          {message}
        </div>
      </div>
      {showClose && (
        <button
          type="button"
          className={`ml-3 flex-shrink-0 ${textClass} hover:opacity-75`}
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Notification;

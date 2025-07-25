import React from 'react';

interface TableProps {
  headers: string[];
  data: any[];
  variant?: 'default' | 'striped' | 'bordered' | 'compact';
  hoverable?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, data, variant = 'default', hoverable = false }) => {
  const getTableClasses = () => {
    const baseClasses = 'min-w-full divide-y divide-gray-200';
    const variantClasses = {
      default: '',
      striped: 'table-striped',
      bordered: 'border border-gray-200',
      compact: 'table-compact',
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${hoverable ? 'hover:bg-gray-50' : ''}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className={getTableClasses()}>
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={variant === 'striped' && rowIndex % 2 === 0 ? 'bg-gray-50' : ''}
            >
              {Object.values(row).map((cell: any, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    variant === 'compact' ? 'py-2' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

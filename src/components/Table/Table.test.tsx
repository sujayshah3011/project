import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Table from './Table';

describe('Table Component', () => {
  const sampleHeaders = ['Name', 'Title', 'Email', 'Role'];
  const sampleData = [
    { name: 'John Doe', title: 'Software Engineer', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', title: 'Product Manager', email: 'jane@example.com', role: 'User' },
  ];

  it('renders headers and data correctly', () => {
    render(<Table headers={sampleHeaders} data={sampleData} />);
    
    // Check headers
    sampleHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    // Check data
    Object.values(sampleData[0]).forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it('applies striped variant correctly', () => {
    render(<Table headers={sampleHeaders} data={sampleData} variant="striped" />);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveClass('bg-gray-50');
  });

  it('applies bordered variant correctly', () => {
    render(<Table headers={sampleHeaders} data={sampleData} variant="bordered" />);
    const table = screen.getByRole('table');
    expect(table).toHaveClass('border', 'border-gray-200');
  });

  it('applies compact variant correctly', () => {
    render(<Table headers={sampleHeaders} data={sampleData} variant="compact" />);
    const cells = screen.getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).toHaveClass('py-2');
    });
  });
});

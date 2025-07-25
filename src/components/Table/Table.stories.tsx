import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

const sampleHeaders = ['Name', 'Title', 'Email', 'Role'];
const sampleData = [
  { name: 'John Doe', title: 'Software Engineer', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', title: 'Product Manager', email: 'jane@example.com', role: 'User' },
  { name: 'Bob Johnson', title: 'Designer', email: 'bob@example.com', role: 'User' },
];

export const Default: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    variant: 'default',
  },
};

export const Striped: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    variant: 'striped',
  },
};

export const Bordered: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    variant: 'bordered',
  },
};

export const Compact: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    variant: 'compact',
  },
};

export const Hoverable: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    variant: 'default',
    hoverable: true,
  },
};

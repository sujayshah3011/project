import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Eye, Search, User } from 'lucide-react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'Username is required',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Price',
    prefix: '$',
    placeholder: '0.00',
    type: 'number',
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    suffix: <Eye className="w-4 h-4 text-gray-400" />,
  },
};

export const SearchInput: Story = {
  args: {
    placeholder: 'Search...',
    suffix: <Search className="w-4 h-4 text-gray-400" />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Normal" placeholder="Normal state" />
      <Input label="Filled" value="This has content" />
      <Input label="Error" error="This field has an error" />
      <Input label="Disabled" disabled placeholder="Disabled state" />
    </div>
  ),
};
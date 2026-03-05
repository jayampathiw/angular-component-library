import { Meta, StoryObj } from '@storybook/angular';
import { DataTableComponent } from './data-table.component';

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: 'Editor', status: 'Active' },
];

const meta: Meta<DataTableComponent> = {
  title: 'Data Display/Data Table',
  component: DataTableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DataTableComponent>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', sortable: true, width: '60px' },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'status', label: 'Status' },
    ],
    data: sampleData,
  },
};

export const Paginated: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', sortable: true, width: '60px' },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
    })),
    paginated: true,
    pageSize: 5,
  },
};

export const Empty: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
    ],
    data: [],
    emptyText: 'No users found. Try adjusting your search criteria.',
  },
};

export const NoStripes: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' },
    ],
    data: sampleData,
    striped: false,
  },
};

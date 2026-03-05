import { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Feedback/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Success: Story = {
  args: { message: 'Changes saved successfully.', title: 'Success', variant: 'success' },
};

export const Error: Story = {
  args: { message: 'Failed to save changes. Please try again.', title: 'Error', variant: 'error' },
};

export const Warning: Story = {
  args: { message: 'Your session will expire in 5 minutes.', variant: 'warning' },
};

export const Info: Story = {
  args: { message: 'A new version is available. Refresh to update.', variant: 'info' },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <ui-toast variant="info" message="New update available." title="Info" />
        <ui-toast variant="success" message="Operation completed." title="Success" />
        <ui-toast variant="warning" message="Disk space running low." title="Warning" />
        <ui-toast variant="error" message="Connection failed." title="Error" />
      </div>
    `,
  }),
};

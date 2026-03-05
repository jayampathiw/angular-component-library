import { Meta, StoryObj } from '@storybook/angular';
import { ConfirmDialogComponent } from './confirm-dialog.component';

const meta: Meta<ConfirmDialogComponent> = {
  title: 'Feedback/Confirm Dialog',
  component: ConfirmDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'danger'] },
  },
};

export default meta;
type Story = StoryObj<ConfirmDialogComponent>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Save Changes',
    message: 'Do you want to save your changes before leaving?',
    confirmLabel: 'Save',
    cancelLabel: 'Discard',
    variant: 'default',
  },
};

export const Danger: Story = {
  args: {
    open: true,
    title: 'Delete Account',
    message: 'This action is permanent and cannot be undone. All your data will be deleted.',
    confirmLabel: 'Delete Account',
    cancelLabel: 'Keep Account',
    variant: 'danger',
  },
};

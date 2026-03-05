import { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Feedback/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, open: true },
    template: `
      <ui-modal [open]="open" title="Edit Profile" subtitle="Update your personal information">
        <p>This is the modal body content. You can put any form or information here.</p>
        <div modal-footer>
          <div style="display: flex; gap: 8px; justify-content: flex-end">
            <button style="padding: 8px 16px; border: 1px solid var(--ui-color-border); border-radius: 8px; background: var(--ui-color-surface); cursor: pointer">Cancel</button>
            <button style="padding: 8px 16px; border: none; border-radius: 8px; background: var(--ui-color-primary); color: var(--ui-color-on-primary); cursor: pointer">Save Changes</button>
          </div>
        </div>
      </ui-modal>
    `,
  }),
};

export const Small: Story = {
  render: () => ({
    props: { open: true },
    template: `
      <ui-modal [open]="open" title="Delete Item" size="sm">
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </ui-modal>
    `,
  }),
};

export const Large: Story = {
  render: () => ({
    props: { open: true },
    template: `
      <ui-modal [open]="open" title="Terms of Service" size="lg">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </ui-modal>
    `,
  }),
};

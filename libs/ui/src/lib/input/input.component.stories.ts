import { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Forms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'you@example.com', hint: 'We will never share your email.' },
};

export const WithError: Story = {
  args: { label: 'Email', type: 'email', value: 'invalid', error: 'Please enter a valid email address.' },
};

export const Required: Story = {
  args: { label: 'Full Name', placeholder: 'John Doe', required: true },
};

export const Disabled: Story = {
  args: { label: 'Username', value: 'johndoe', disabled: true },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px">
        <ui-input label="Small" size="sm" placeholder="Small input" />
        <ui-input label="Medium" size="md" placeholder="Medium input" />
        <ui-input label="Large" size="lg" placeholder="Large input" />
      </div>
    `,
  }),
};

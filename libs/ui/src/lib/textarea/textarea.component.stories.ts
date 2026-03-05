import { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Forms/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: { label: 'Description', placeholder: 'Enter a description...', hint: 'Provide a detailed description.' },
};

export const WithError: Story = {
  args: { label: 'Bio', value: 'Hi', error: 'Bio must be at least 20 characters.', required: true },
};

export const WithCharacterCount: Story = {
  args: { label: 'Message', placeholder: 'Type your message...', maxLength: 280, rows: 3 },
};

export const Disabled: Story = {
  args: { label: 'Notes', value: 'This field is read-only content.', disabled: true },
};

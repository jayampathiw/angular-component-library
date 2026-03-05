import { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

const meta: Meta<SelectComponent> = {
  title: 'Forms/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: { label: 'Country', options: countries, placeholder: 'Select a country' },
};

export const WithError: Story = {
  args: { label: 'Country', options: countries, placeholder: 'Select a country', error: 'Please select a country.', required: true },
};

export const Disabled: Story = {
  args: { label: 'Country', options: countries, value: 'us', disabled: true },
};

export const WithHint: Story = {
  args: { label: 'Timezone', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST' }, { value: 'pst', label: 'PST' }], hint: 'Used for scheduling notifications.' },
};

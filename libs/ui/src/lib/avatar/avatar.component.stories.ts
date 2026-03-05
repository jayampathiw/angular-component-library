import { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Data Display/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const WithInitials: Story = {
  args: { name: 'John Doe', size: 'md' },
};

export const SingleName: Story = {
  args: { name: 'Alice', size: 'md' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center">
        <ui-avatar name="SM" size="sm" />
        <ui-avatar name="MD" size="md" />
        <ui-avatar name="LG" size="lg" />
        <ui-avatar name="XL" size="xl" />
      </div>
    `,
  }),
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=demo',
    name: 'Demo User',
    size: 'lg',
  },
};

export const Fallback: Story = {
  args: {
    src: 'https://invalid-url.example/404.jpg',
    name: 'Broken Image',
    size: 'lg',
  },
};

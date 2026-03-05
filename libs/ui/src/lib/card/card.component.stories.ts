import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Layout/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style of the card',
      table: { defaultValue: { summary: 'elevated' } },
    },
    interactive: {
      control: 'boolean',
      description: 'Adds hover interaction styles',
      table: { defaultValue: { summary: 'false' } },
    },
    noPadding: {
      control: 'boolean',
      description: 'Removes default padding',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px;">
        <ui-card [variant]="variant" [interactive]="interactive" [noPadding]="noPadding">
          <div card-header>
            <h3 style="margin: 0; font-size: var(--ui-text-lg); font-weight: var(--ui-font-semibold); color: var(--ui-color-on-surface);">
              Card Title
            </h3>
            <p style="margin: 4px 0 0; font-size: var(--ui-text-sm); color: var(--ui-color-on-surface-variant);">
              Subtitle or description
            </p>
          </div>
          <p style="margin: 0; color: var(--ui-color-on-surface-variant); font-size: var(--ui-text-sm); line-height: var(--ui-leading-relaxed);">
            This is the card body content. Cards are surfaces that display content
            and actions about a single topic.
          </p>
          <div card-footer>
            <button style="
              padding: 8px 16px;
              border: none;
              border-radius: var(--ui-radius-button);
              background: var(--ui-color-primary);
              color: var(--ui-color-on-primary);
              font-size: var(--ui-text-sm);
              font-weight: var(--ui-font-medium);
              cursor: pointer;
            ">Action</button>
            <button style="
              padding: 8px 16px;
              border: 1px solid var(--ui-color-border);
              border-radius: var(--ui-radius-button);
              background: transparent;
              color: var(--ui-color-on-surface);
              font-size: var(--ui-text-sm);
              font-weight: var(--ui-font-medium);
              cursor: pointer;
            ">Cancel</button>
          </div>
        </ui-card>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<CardComponent>;

export const Elevated: Story = {
  args: { variant: 'elevated', interactive: false, noPadding: false },
};

export const Outlined: Story = {
  args: { variant: 'outlined', interactive: false, noPadding: false },
};

export const Filled: Story = {
  args: { variant: 'filled', interactive: false, noPadding: false },
};

export const Interactive: Story = {
  args: { variant: 'elevated', interactive: true, noPadding: false },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <ui-card variant="elevated">
          <div card-header>
            <h3 style="margin: 0; font-size: var(--ui-text-base); font-weight: var(--ui-font-semibold);">Elevated</h3>
          </div>
          <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-color-on-surface-variant);">
            Uses shadow for depth
          </p>
        </ui-card>

        <ui-card variant="outlined">
          <div card-header>
            <h3 style="margin: 0; font-size: var(--ui-text-base); font-weight: var(--ui-font-semibold);">Outlined</h3>
          </div>
          <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-color-on-surface-variant);">
            Uses border for separation
          </p>
        </ui-card>

        <ui-card variant="filled">
          <div card-header>
            <h3 style="margin: 0; font-size: var(--ui-text-base); font-weight: var(--ui-font-semibold);">Filled</h3>
          </div>
          <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-color-on-surface-variant);">
            Uses background fill
          </p>
        </ui-card>
      </div>
    `,
  }),
};

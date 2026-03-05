import type { Meta, StoryObj } from '@storybook/angular';
import { GridComponent } from './grid.component';

const cellStyle = `
  padding: var(--ui-space-4);
  background: var(--ui-color-primary-container);
  border-radius: var(--ui-radius-md);
  text-align: center;
  font-family: var(--ui-font-sans);
  font-size: var(--ui-text-sm);
  font-weight: var(--ui-font-medium);
  color: var(--ui-color-on-primary-container);
`;

const meta: Meta<GridComponent> = {
  title: 'Layout/Grid',
  component: GridComponent,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
      description: 'Number of grid columns',
      table: { defaultValue: { summary: '3' } },
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between grid items',
      table: { defaultValue: { summary: 'md' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment',
      table: { defaultValue: { summary: 'stretch' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-grid [columns]="columns" [gap]="gap" [align]="align">
        <div style="${cellStyle}">1</div>
        <div style="${cellStyle}">2</div>
        <div style="${cellStyle}">3</div>
        <div style="${cellStyle}">4</div>
        <div style="${cellStyle}">5</div>
        <div style="${cellStyle}">6</div>
      </ui-grid>
    `,
  }),
};

export default meta;

type Story = StoryObj<GridComponent>;

export const ThreeColumns: Story = {
  args: { columns: 3, gap: 'md', align: 'stretch' },
};

export const TwoColumns: Story = {
  args: { columns: 2, gap: 'lg', align: 'stretch' },
};

export const FourColumns: Story = {
  args: { columns: 4, gap: 'sm', align: 'center' },
};

export const SingleColumn: Story = {
  args: { columns: 1, gap: 'md', align: 'stretch' },
};

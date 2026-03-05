import { Meta, StoryObj } from '@storybook/angular';
import { StatCardComponent } from './stat-card.component';

const meta: Meta<StatCardComponent> = {
  title: 'Data Display/Stat Card',
  component: StatCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StatCardComponent>;

export const PositiveTrend: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231',
    trend: 12.5,
    trendLabel: 'vs last month',
    icon: '$',
  },
};

export const NegativeTrend: Story = {
  args: {
    label: 'Churn Rate',
    value: '3.2%',
    trend: -0.8,
    trendLabel: 'vs last month',
  },
};

export const NoTrend: Story = {
  args: {
    label: 'Active Users',
    value: '1,234',
    description: 'Updated in real-time',
  },
};

export const Dashboard: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
        <ui-stat-card label="Revenue" value="$45,231" [trend]="12.5" trendLabel="vs last month" icon="$" />
        <ui-stat-card label="Users" value="2,350" [trend]="8.1" trendLabel="vs last month" />
        <ui-stat-card label="Orders" value="1,247" [trend]="-2.4" trendLabel="vs last week" />
        <ui-stat-card label="Conversion" value="3.8%" [trend]="0" trendLabel="no change" />
      </div>
    `,
  }),
};

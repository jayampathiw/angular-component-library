import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';

const meta: Meta<TabsComponent> = {
  title: 'Navigation/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TabComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-tabs>
        <ui-tab label="Overview">
          <p>Overview content goes here. This is the first tab panel.</p>
        </ui-tab>
        <ui-tab label="Features">
          <p>Features content with details about the component library.</p>
        </ui-tab>
        <ui-tab label="API Reference">
          <p>API documentation and usage examples.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

export const WithDisabledTab: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-tabs>
        <ui-tab label="Active">
          <p>This tab is active and selectable.</p>
        </ui-tab>
        <ui-tab label="Also Active">
          <p>This tab is also selectable.</p>
        </ui-tab>
        <ui-tab label="Disabled" [disabled]="true">
          <p>This content is not reachable.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

export const SecondTabActive: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-tabs [activeIndex]="1">
        <ui-tab label="First">
          <p>First tab content.</p>
        </ui-tab>
        <ui-tab label="Second (Active)">
          <p>This tab starts as active.</p>
        </ui-tab>
        <ui-tab label="Third">
          <p>Third tab content.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

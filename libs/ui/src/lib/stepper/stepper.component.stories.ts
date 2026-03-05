import { Meta, StoryObj } from '@storybook/angular';
import { StepperComponent } from './stepper.component';

const meta: Meta<StepperComponent> = {
  title: 'Navigation/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    activeStep: {
      control: { type: 'number', min: 0, max: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

export const Default: Story = {
  args: {
    steps: [
      { label: 'Account Setup' },
      { label: 'Personal Info' },
      { label: 'Preferences' },
      { label: 'Confirmation' },
    ],
    activeStep: 1,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: [
      { label: 'Account', description: 'Create your account' },
      { label: 'Profile', description: 'Fill in your details' },
      { label: 'Payment', description: 'Add payment method', optional: true },
      { label: 'Review', description: 'Review and submit' },
    ],
    activeStep: 2,
  },
};

export const Vertical: Story = {
  args: {
    steps: [
      { label: 'Select Plan', description: 'Choose a subscription plan' },
      { label: 'Add Details', description: 'Fill in billing information' },
      { label: 'Payment', description: 'Complete payment' },
    ],
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const AllCompleted: Story = {
  args: {
    steps: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ],
    activeStep: 3,
  },
};

export const FirstStep: Story = {
  args: {
    steps: [
      { label: 'Getting Started' },
      { label: 'Configuration' },
      { label: 'Deployment' },
    ],
    activeStep: 0,
  },
};

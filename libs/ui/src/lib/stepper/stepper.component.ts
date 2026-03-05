import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

export interface StepItem {
  label: string;
  description?: string;
  optional?: boolean;
}

export type StepStatus = 'completed' | 'active' | 'upcoming' | 'error';

@Component({
  selector: 'ui-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-stepper',
    '[class.ui-stepper--vertical]': 'orientation() === "vertical"',
  },
  template: `
    <div class="ui-stepper__track" [attr.aria-label]="ariaLabel()" role="group">
      @for (step of steps(); track step.label; let i = $index; let last = $last) {
        <div
          class="ui-stepper__step"
          [class.ui-stepper__step--completed]="stepStatus(i) === 'completed'"
          [class.ui-stepper__step--active]="stepStatus(i) === 'active'"
          [class.ui-stepper__step--error]="stepStatus(i) === 'error'"
          [class.ui-stepper__step--upcoming]="stepStatus(i) === 'upcoming'"
          [attr.aria-current]="stepStatus(i) === 'active' ? 'step' : null"
        >
          <button
            class="ui-stepper__indicator"
            type="button"
            [attr.aria-label]="step.label + (step.optional ? ' (optional)' : '')"
            [disabled]="!allowNavigation() || stepStatus(i) === 'upcoming'"
            (click)="goToStep(i)"
          >
            @if (stepStatus(i) === 'completed') {
              <span class="ui-stepper__check" aria-hidden="true">&#10003;</span>
            } @else if (stepStatus(i) === 'error') {
              <span class="ui-stepper__error-icon" aria-hidden="true">!</span>
            } @else {
              <span class="ui-stepper__number">{{ i + 1 }}</span>
            }
          </button>
          <div class="ui-stepper__content">
            <span class="ui-stepper__label">{{ step.label }}</span>
            @if (step.description) {
              <span class="ui-stepper__description">{{ step.description }}</span>
            }
            @if (step.optional) {
              <span class="ui-stepper__optional">Optional</span>
            }
          </div>
          @if (!last) {
            <div class="ui-stepper__connector" aria-hidden="true">
              <div
                class="ui-stepper__connector-line"
                [class.ui-stepper__connector-line--completed]="stepStatus(i) === 'completed'"
              ></div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  /** Steps to display */
  readonly steps = input.required<StepItem[]>();

  /** Current active step index */
  readonly activeStep = model(0);

  /** Orientation of the stepper */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Allow clicking on completed steps to navigate back */
  readonly allowNavigation = input(false);

  /** Set of step indices that have errors */
  readonly errorSteps = input<Set<number>>(new Set());

  /** Accessible label for the stepper */
  readonly ariaLabel = input('Progress');

  /** Emitted when step changes */
  readonly stepChange = output<number>();

  protected readonly completedCount = computed(() => this.activeStep());

  stepStatus(index: number): StepStatus {
    if (this.errorSteps().has(index)) return 'error';
    if (index < this.activeStep()) return 'completed';
    if (index === this.activeStep()) return 'active';
    return 'upcoming';
  }

  goToStep(index: number): void {
    if (this.allowNavigation() && index <= this.activeStep()) {
      this.activeStep.set(index);
      this.stepChange.emit(index);
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperComponent, StepItem } from './stepper.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [StepperComponent],
  template: `<ui-stepper
    [steps]="steps()"
    [activeStep]="activeStep()"
    [orientation]="orientation()"
    [allowNavigation]="allowNavigation()"
    [errorSteps]="errorSteps()"
    (stepChange)="onStepChange($event)"
  />`,
})
class TestHostComponent {
  readonly steps = signal<StepItem[]>([
    { label: 'Account' },
    { label: 'Profile', description: 'Fill your details' },
    { label: 'Review', optional: true },
    { label: 'Done' },
  ]);
  readonly activeStep = signal(1);
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly allowNavigation = signal(false);
  readonly errorSteps = signal<Set<number>>(new Set());
  stepChangeValue = -1;
  onStepChange(index: number): void { this.stepChangeValue = index; }
}

describe('StepperComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const stepper = fixture.nativeElement.querySelector('ui-stepper');
    expect(stepper).toBeTruthy();
  });

  it('should render all steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.ui-stepper__step');
    expect(steps.length).toBe(4);
  });

  it('should mark completed steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.ui-stepper__step');
    expect(steps[0].classList.contains('ui-stepper__step--completed')).toBe(true);
  });

  it('should mark active step', () => {
    const steps = fixture.nativeElement.querySelectorAll('.ui-stepper__step');
    expect(steps[1].classList.contains('ui-stepper__step--active')).toBe(true);
    expect(steps[1].getAttribute('aria-current')).toBe('step');
  });

  it('should mark upcoming steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.ui-stepper__step');
    expect(steps[2].classList.contains('ui-stepper__step--upcoming')).toBe(true);
    expect(steps[3].classList.contains('ui-stepper__step--upcoming')).toBe(true);
  });

  it('should show checkmark for completed steps', () => {
    const check = fixture.nativeElement.querySelector('.ui-stepper__step--completed .ui-stepper__check');
    expect(check).toBeTruthy();
  });

  it('should show step number for active step', () => {
    const number = fixture.nativeElement.querySelector('.ui-stepper__step--active .ui-stepper__number');
    expect(number.textContent.trim()).toBe('2');
  });

  it('should display step description', () => {
    const descriptions = fixture.nativeElement.querySelectorAll('.ui-stepper__description');
    expect(descriptions.length).toBe(1);
    expect(descriptions[0].textContent.trim()).toBe('Fill your details');
  });

  it('should show optional label', () => {
    const optional = fixture.nativeElement.querySelector('.ui-stepper__optional');
    expect(optional).toBeTruthy();
    expect(optional.textContent.trim()).toBe('Optional');
  });

  it('should render connectors between steps', () => {
    const connectors = fixture.nativeElement.querySelectorAll('.ui-stepper__connector');
    expect(connectors.length).toBe(3);
  });

  it('should update active step', () => {
    host.activeStep.set(2);
    fixture.detectChanges();
    const steps = fixture.nativeElement.querySelectorAll('.ui-stepper__step');
    expect(steps[2].classList.contains('ui-stepper__step--active')).toBe(true);
    expect(steps[1].classList.contains('ui-stepper__step--completed')).toBe(true);
  });

  it('should apply vertical class', () => {
    host.orientation.set('vertical');
    fixture.detectChanges();
    const stepper = fixture.nativeElement.querySelector('ui-stepper');
    expect(stepper.classList.contains('ui-stepper--vertical')).toBe(true);
  });

  it('should have group role with aria-label', () => {
    const track = fixture.nativeElement.querySelector('[role="group"]');
    expect(track).toBeTruthy();
    expect(track.getAttribute('aria-label')).toBe('Progress');
  });

  it('should navigate to completed step when allowNavigation is enabled', () => {
    host.allowNavigation.set(true);
    host.activeStep.set(2);
    fixture.detectChanges();
    // Click on step 0 (completed)
    const buttons = fixture.nativeElement.querySelectorAll('.ui-stepper__indicator');
    buttons[0].click();
    fixture.detectChanges();
    expect(host.stepChangeValue).toBe(0);
  });

  it('should not navigate when allowNavigation is disabled', () => {
    host.allowNavigation.set(false);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.ui-stepper__indicator');
    buttons[0].click();
    fixture.detectChanges();
    expect(host.stepChangeValue).toBe(-1);
  });

  it('should not navigate to future step even with allowNavigation', () => {
    host.allowNavigation.set(true);
    host.activeStep.set(1);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.ui-stepper__indicator');
    buttons[3].click();
    fixture.detectChanges();
    expect(host.stepChangeValue).toBe(-1);
  });

  it('should show error state for error steps', () => {
    host.errorSteps.set(new Set([1]));
    fixture.detectChanges();
    const steps = fixture.nativeElement.querySelectorAll('.ui-stepper__step');
    expect(steps[1].classList.contains('ui-stepper__step--error')).toBe(true);
    const errorIcon = steps[1].querySelector('.ui-stepper__error-icon');
    expect(errorIcon).toBeTruthy();
  });
});

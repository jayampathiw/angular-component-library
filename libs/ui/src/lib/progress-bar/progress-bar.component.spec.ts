import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [ProgressBarComponent],
  template: `<ui-progress-bar
    [value]="value()"
    [max]="max()"
    [variant]="variant()"
    [indeterminate]="indeterminate()"
    [showLabel]="showLabel()"
  />`,
})
class TestHostComponent {
  readonly value = signal(60);
  readonly max = signal(100);
  readonly variant = signal<'primary' | 'success' | 'warning' | 'error'>('primary');
  readonly indeterminate = signal(false);
  readonly showLabel = signal(false);
}

describe('ProgressBarComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-progress-bar');
    expect(el).toBeTruthy();
  });

  it('should have progressbar role', () => {
    const el = fixture.nativeElement.querySelector('ui-progress-bar');
    expect(el.getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow', () => {
    const el = fixture.nativeElement.querySelector('ui-progress-bar');
    expect(el.getAttribute('aria-valuenow')).toBe('60');
  });

  it('should set fill width based on value', () => {
    const fill = fixture.nativeElement.querySelector('.ui-progress-bar__fill') as HTMLElement;
    expect(fill.style.width).toBe('60%');
  });

  it('should update fill width when value changes', () => {
    host.value.set(80);
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.ui-progress-bar__fill') as HTMLElement;
    expect(fill.style.width).toBe('80%');
  });

  it('should show label when enabled', () => {
    host.showLabel.set(true);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.ui-progress-bar__label');
    expect(label.textContent).toContain('60%');
  });

  it('should apply indeterminate class', () => {
    host.indeterminate.set(true);
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.ui-progress-bar__fill');
    expect(fill.classList.contains('ui-progress-bar__fill--indeterminate')).toBe(true);
  });

  it('should apply variant class', () => {
    host.variant.set('success');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-progress-bar');
    expect(el.classList.contains('ui-progress-bar--success')).toBe(true);
  });

  it('should clamp percentage to 0-100', () => {
    host.value.set(150);
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.ui-progress-bar__fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('should return 0% when max is 0', () => {
    host.max.set(0);
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.ui-progress-bar__fill') as HTMLElement;
    expect(fill.style.width).toBe('0%');
  });

  it('should remove aria-valuenow in indeterminate mode', () => {
    host.indeterminate.set(true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-progress-bar');
    expect(el.getAttribute('aria-valuenow')).toBeNull();
    expect(el.getAttribute('aria-valuemin')).toBeNull();
    expect(el.getAttribute('aria-valuemax')).toBeNull();
  });
});

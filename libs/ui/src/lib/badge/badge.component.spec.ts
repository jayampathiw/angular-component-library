import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [BadgeComponent],
  template: `<ui-badge
    [variant]="variant()"
    [size]="size()"
    [removable]="removable()"
    (removed)="onRemoved()"
  >{{ text() }}</ui-badge>`,
})
class TestHostComponent {
  readonly variant = signal<'neutral' | 'info' | 'success' | 'warning' | 'error'>('neutral');
  readonly size = signal<'sm' | 'md' | 'lg'>('md');
  readonly removable = signal(false);
  readonly text = signal('Status');
  removed = false;
  onRemoved(): void { this.removed = true; }
}

describe('BadgeComponent', () => {
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
    const badge = fixture.nativeElement.querySelector('ui-badge');
    expect(badge).toBeTruthy();
  });

  it('should display content', () => {
    const badge = fixture.nativeElement.querySelector('ui-badge');
    expect(badge.textContent).toContain('Status');
  });

  it('should apply neutral variant by default', () => {
    const badge = fixture.nativeElement.querySelector('ui-badge');
    expect(badge.classList.contains('ui-badge--neutral')).toBe(true);
  });

  it('should apply md size by default', () => {
    const badge = fixture.nativeElement.querySelector('ui-badge');
    expect(badge.classList.contains('ui-badge--md')).toBe(true);
  });

  it('should switch to success variant', () => {
    host.variant.set('success');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('ui-badge');
    expect(badge.classList.contains('ui-badge--success')).toBe(true);
  });

  it('should switch to sm size', () => {
    host.size.set('sm');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('ui-badge');
    expect(badge.classList.contains('ui-badge--sm')).toBe(true);
  });

  it('should not show remove button by default', () => {
    const btn = fixture.nativeElement.querySelector('.ui-badge__remove');
    expect(btn).toBeNull();
  });

  it('should show remove button when removable', () => {
    host.removable.set(true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.ui-badge__remove');
    expect(btn).toBeTruthy();
  });

  it('should emit removed event on remove click', () => {
    host.removable.set(true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.ui-badge__remove');
    btn.click();
    expect(host.removed).toBe(true);
  });
});

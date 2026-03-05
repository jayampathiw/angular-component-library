import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [ToastComponent],
  template: `<ui-toast
    [message]="message()"
    [title]="title()"
    [variant]="variant()"
    [dismissible]="dismissible()"
    [visible]="visible()"
    (dismissed)="onDismissed()"
  />`,
})
class TestHostComponent {
  readonly message = signal('Operation completed successfully');
  readonly title = signal('');
  readonly variant = signal<'info' | 'success' | 'warning' | 'error'>('success');
  readonly dismissible = signal(true);
  readonly visible = signal(true);
  dismissed = false;
  onDismissed(): void { this.dismissed = true; }
}

describe('ToastComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-toast');
    expect(el).toBeTruthy();
  });

  it('should have alert role', () => {
    const el = fixture.nativeElement.querySelector('ui-toast');
    expect(el.getAttribute('role')).toBe('alert');
  });

  it('should display message', () => {
    const msg = fixture.nativeElement.querySelector('.ui-toast__message');
    expect(msg.textContent.trim()).toBe('Operation completed successfully');
  });

  it('should display title when provided', () => {
    host.title.set('Success');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.ui-toast__title');
    expect(title.textContent.trim()).toBe('Success');
  });

  it('should apply variant class', () => {
    const el = fixture.nativeElement.querySelector('ui-toast');
    expect(el.classList.contains('ui-toast--success')).toBe(true);
  });

  it('should show dismiss button', () => {
    const btn = fixture.nativeElement.querySelector('.ui-toast__dismiss');
    expect(btn).toBeTruthy();
  });

  it('should emit dismissed on dismiss click', () => {
    const btn = fixture.nativeElement.querySelector('.ui-toast__dismiss');
    btn.click();
    expect(host.dismissed).toBe(true);
  });

  it('should hide dismiss button when not dismissible', () => {
    host.dismissible.set(false);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.ui-toast__dismiss');
    expect(btn).toBeNull();
  });

  it('should display icon', () => {
    const icon = fixture.nativeElement.querySelector('.ui-toast__icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('should apply visible class', () => {
    const el = fixture.nativeElement.querySelector('ui-toast');
    expect(el.classList.contains('ui-toast--visible')).toBe(true);
  });
});

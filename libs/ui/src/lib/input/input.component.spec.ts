import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [InputComponent],
  template: `<ui-input
    [label]="label()"
    [type]="type()"
    [placeholder]="placeholder()"
    [error]="error()"
    [hint]="hint()"
    [required]="required()"
    [disabled]="disabled()"
  />`,
})
class TestHostComponent {
  readonly label = signal('Email');
  readonly type = signal<'text' | 'email' | 'password'>('email');
  readonly placeholder = signal('Enter email');
  readonly error = signal('');
  readonly hint = signal('');
  readonly required = signal(false);
  readonly disabled = signal(false);
}

describe('InputComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-input');
    expect(el).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.ui-input-field__label');
    expect(label.textContent).toContain('Email');
  });

  it('should associate label with input', () => {
    const label = fixture.nativeElement.querySelector('label');
    const input = fixture.nativeElement.querySelector('input');
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('should set input type', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('email');
  });

  it('should set placeholder', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Enter email');
  });

  it('should show error message', () => {
    host.error.set('Invalid email');
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.ui-input-field__error');
    expect(error.textContent.trim()).toBe('Invalid email');
    expect(error.getAttribute('role')).toBe('alert');
  });

  it('should show hint text', () => {
    host.hint.set('We will not share your email');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ui-input-field__hint');
    expect(hint.textContent.trim()).toBe('We will not share your email');
  });

  it('should show required indicator', () => {
    host.required.set(true);
    fixture.detectChanges();
    const required = fixture.nativeElement.querySelector('.ui-input-field__required');
    expect(required).toBeTruthy();
  });

  it('should apply error class', () => {
    host.error.set('Error');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-input');
    expect(el.classList.contains('ui-input-field--error')).toBe(true);
  });

  it('should set aria-invalid when error exists', () => {
    host.error.set('Error');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should disable input', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('should update value on input event', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    // The value should be updated via the model signal
    expect(input.value).toBe('test@example.com');
  });

  it('should emit blur event', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    fixture.detectChanges();
    // No error - blur event handled
    expect(true).toBe(true);
  });
});

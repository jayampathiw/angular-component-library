import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [TextareaComponent],
  template: `<ui-textarea
    [label]="label()"
    [placeholder]="placeholder()"
    [error]="error()"
    [hint]="hint()"
    [required]="required()"
    [disabled]="disabled()"
    [rows]="rows()"
    [maxLength]="maxLength()"
  />`,
})
class TestHostComponent {
  readonly label = signal('Description');
  readonly placeholder = signal('Enter description');
  readonly error = signal('');
  readonly hint = signal('');
  readonly required = signal(false);
  readonly disabled = signal(false);
  readonly rows = signal(4);
  readonly maxLength = signal(0);
}

describe('TextareaComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-textarea');
    expect(el).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.ui-textarea-field__label');
    expect(label.textContent).toContain('Description');
  });

  it('should associate label with textarea', () => {
    const label = fixture.nativeElement.querySelector('label');
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(label.getAttribute('for')).toBe(textarea.id);
  });

  it('should set placeholder', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.placeholder).toBe('Enter description');
  });

  it('should set rows', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.rows).toBe(4);
  });

  it('should show error message', () => {
    host.error.set('Required field');
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.ui-textarea-field__error');
    expect(error.textContent.trim()).toBe('Required field');
  });

  it('should show hint text', () => {
    host.hint.set('Max 500 characters');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ui-textarea-field__hint');
    expect(hint.textContent.trim()).toBe('Max 500 characters');
  });

  it('should show character counter', () => {
    host.maxLength.set(200);
    fixture.detectChanges();
    const counter = fixture.nativeElement.querySelector('.ui-textarea-field__counter');
    expect(counter.textContent).toContain('0/200');
  });

  it('should disable textarea', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.disabled).toBe(true);
  });

  it('should update value on input event', () => {
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'Hello world';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(textarea.value).toBe('Hello world');
  });

  it('should show near-limit class when close to max', () => {
    host.maxLength.set(10);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = '123456789';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    const counter = fixture.nativeElement.querySelector('.ui-textarea-field__counter');
    expect(counter.classList.contains('ui-textarea-field__counter--near-limit')).toBe(true);
  });
});

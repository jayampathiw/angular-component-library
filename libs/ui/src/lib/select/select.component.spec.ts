import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent, SelectOption } from './select.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [SelectComponent],
  template: `<ui-select
    [label]="label()"
    [options]="options()"
    [placeholder]="placeholder()"
    [error]="error()"
    [hint]="hint()"
    [required]="required()"
    [disabled]="disabled()"
  />`,
})
class TestHostComponent {
  readonly label = signal('Country');
  readonly options = signal<SelectOption[]>([
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
  ]);
  readonly placeholder = signal('Select a country');
  readonly error = signal('');
  readonly hint = signal('');
  readonly required = signal(false);
  readonly disabled = signal(false);
}

describe('SelectComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-select');
    expect(el).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.ui-select-field__label');
    expect(label.textContent).toContain('Country');
  });

  it('should render options', () => {
    const options = fixture.nativeElement.querySelectorAll('option');
    // 3 options + 1 placeholder
    expect(options.length).toBe(4);
  });

  it('should render placeholder option', () => {
    const firstOption = fixture.nativeElement.querySelector('option');
    expect(firstOption.textContent.trim()).toBe('Select a country');
    expect(firstOption.disabled).toBe(true);
  });

  it('should associate label with select', () => {
    const label = fixture.nativeElement.querySelector('label');
    const select = fixture.nativeElement.querySelector('select');
    expect(label.getAttribute('for')).toBe(select.id);
  });

  it('should show error message', () => {
    host.error.set('Selection required');
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.ui-select-field__error');
    expect(error.textContent.trim()).toBe('Selection required');
  });

  it('should show hint text', () => {
    host.hint.set('Choose your primary country');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ui-select-field__hint');
    expect(hint.textContent.trim()).toBe('Choose your primary country');
  });

  it('should show required indicator', () => {
    host.required.set(true);
    fixture.detectChanges();
    const required = fixture.nativeElement.querySelector('.ui-select-field__required');
    expect(required).toBeTruthy();
  });

  it('should disable select', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('select');
    expect(select.disabled).toBe(true);
  });

  it('should update value on change event', () => {
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'uk';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();
    expect(select.value).toBe('uk');
  });

  it('should apply error class', () => {
    host.error.set('Required');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-select');
    expect(el.classList.contains('ui-select-field--error')).toBe(true);
  });
});

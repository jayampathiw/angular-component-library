import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

let nextId = 0;

@Component({
  selector: 'ui-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-input-field',
    '[class]': 'hostClasses()',
  },
  template: `
    @if (label()) {
      <label class="ui-input-field__label" [for]="inputId">
        {{ label() }}
        @if (required()) {
          <span class="ui-input-field__required" aria-hidden="true">*</span>
        }
      </label>
    }
    <div class="ui-input-field__wrapper">
      <input
        class="ui-input-field__input"
        [id]="inputId"
        [type]="type()"
        [value]="value()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [required]="required()"
        [attr.aria-describedby]="descriptionId"
        [attr.aria-invalid]="error() ? true : null"
        (input)="onInput($event)"
        (blur)="blurred.emit()"
      />
    </div>
    @if (error()) {
      <p class="ui-input-field__error" [id]="descriptionId" role="alert">{{ error() }}</p>
    } @else if (hint()) {
      <p class="ui-input-field__hint" [id]="descriptionId">{{ hint() }}</p>
    }
  `,
  styleUrl: './input.component.scss',
})
export class InputComponent {
  /** Label text */
  readonly label = input('');

  /** Input type */
  readonly type = input<InputType>('text');

  /** Current value */
  readonly value = model('');

  /** Placeholder text */
  readonly placeholder = input('');

  /** Whether the input is disabled */
  readonly disabled = input(false);

  /** Whether the input is readonly */
  readonly readonly = input(false);

  /** Whether the input is required */
  readonly required = input(false);

  /** Error message */
  readonly error = input('');

  /** Hint text */
  readonly hint = input('');

  /** Size variant */
  readonly size = input<InputSize>('md');

  /** Emitted on blur */
  readonly blurred = output<void>();

  readonly inputId = `ui-input-${nextId++}`;
  readonly descriptionId = `${this.inputId}-desc`;

  protected readonly hostClasses = computed(() => {
    const classes = [`ui-input-field--${this.size()}`];
    if (this.error()) classes.push('ui-input-field--error');
    if (this.disabled()) classes.push('ui-input-field--disabled');
    return classes.join(' ');
  });

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}

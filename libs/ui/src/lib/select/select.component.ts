import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

let nextId = 0;

@Component({
  selector: 'ui-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-select-field',
    '[class]': 'hostClasses()',
  },
  template: `
    @if (label()) {
      <label class="ui-select-field__label" [for]="selectId">
        {{ label() }}
        @if (required()) {
          <span class="ui-select-field__required" aria-hidden="true">*</span>
        }
      </label>
    }
    <div class="ui-select-field__wrapper">
      <select
        class="ui-select-field__select"
        [id]="selectId"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-describedby]="descriptionId"
        [attr.aria-invalid]="error() ? true : null"
        (change)="onChange($event)"
      >
        @if (placeholder()) {
          <option value="" disabled [selected]="!value()">{{ placeholder() }}</option>
        }
        @for (option of options(); track option.value) {
          <option
            [value]="option.value"
            [disabled]="option.disabled ?? false"
            [selected]="option.value === value()"
          >
            {{ option.label }}
          </option>
        }
      </select>
    </div>
    @if (error()) {
      <p class="ui-select-field__error" [id]="descriptionId" role="alert">{{ error() }}</p>
    } @else if (hint()) {
      <p class="ui-select-field__hint" [id]="descriptionId">{{ hint() }}</p>
    }
  `,
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  /** Label text */
  readonly label = input('');

  /** Available options */
  readonly options = input.required<SelectOption[]>();

  /** Selected value */
  readonly value = model('');

  /** Placeholder text */
  readonly placeholder = input('');

  /** Disabled state */
  readonly disabled = input(false);

  /** Required state */
  readonly required = input(false);

  /** Error message */
  readonly error = input('');

  /** Hint text */
  readonly hint = input('');

  /** Size variant */
  readonly size = input<SelectSize>('md');

  /** Emitted on blur */
  readonly blurred = output<void>();

  readonly selectId = `ui-select-${nextId++}`;
  readonly descriptionId = `${this.selectId}-desc`;

  protected readonly hostClasses = computed(() => {
    const classes = [`ui-select-field--${this.size()}`];
    if (this.error()) classes.push('ui-select-field--error');
    if (this.disabled()) classes.push('ui-select-field--disabled');
    return classes.join(' ');
  });

  protected onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
  }
}

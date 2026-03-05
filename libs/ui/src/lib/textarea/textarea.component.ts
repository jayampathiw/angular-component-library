import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

let nextId = 0;

@Component({
  selector: 'ui-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-textarea-field',
    '[class]': 'hostClasses()',
  },
  template: `
    @if (label()) {
      <label class="ui-textarea-field__label" [for]="textareaId">
        {{ label() }}
        @if (required()) {
          <span class="ui-textarea-field__required" aria-hidden="true">*</span>
        }
      </label>
    }
    <textarea
      class="ui-textarea-field__textarea"
      [id]="textareaId"
      [value]="value()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [required]="required()"
      [rows]="rows()"
      [style.resize]="resize()"
      [attr.maxlength]="maxLength() > 0 ? maxLength() : null"
      [attr.aria-describedby]="descriptionId"
      [attr.aria-invalid]="error() ? true : null"
      (input)="onInput($event)"
      (blur)="blurred.emit()"
    ></textarea>
    <div class="ui-textarea-field__footer">
      @if (error()) {
        <p class="ui-textarea-field__error" [id]="descriptionId" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="ui-textarea-field__hint" [id]="descriptionId">{{ hint() }}</p>
      } @else {
        <span></span>
      }
      @if (maxLength() > 0) {
        <span class="ui-textarea-field__counter" [class.ui-textarea-field__counter--near-limit]="isNearLimit()">
          {{ value().length }}/{{ maxLength() }}
        </span>
      }
    </div>
  `,
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  /** Label text */
  readonly label = input('');

  /** Current value */
  readonly value = model('');

  /** Placeholder text */
  readonly placeholder = input('');

  /** Disabled state */
  readonly disabled = input(false);

  /** Readonly state */
  readonly readonly = input(false);

  /** Required state */
  readonly required = input(false);

  /** Number of visible rows */
  readonly rows = input(4);

  /** Resize behavior */
  readonly resize = input<TextareaResize>('vertical');

  /** Max character count (0 = unlimited) */
  readonly maxLength = input(0);

  /** Error message */
  readonly error = input('');

  /** Hint text */
  readonly hint = input('');

  /** Size variant */
  readonly size = input<TextareaSize>('md');

  /** Emitted on blur */
  readonly blurred = output<void>();

  readonly textareaId = `ui-textarea-${nextId++}`;
  readonly descriptionId = `${this.textareaId}-desc`;

  protected readonly hostClasses = computed(() => {
    const classes = [`ui-textarea-field--${this.size()}`];
    if (this.error()) classes.push('ui-textarea-field--error');
    if (this.disabled()) classes.push('ui-textarea-field--disabled');
    return classes.join(' ');
  });

  protected readonly isNearLimit = computed(() => {
    const max = this.maxLength();
    return max > 0 && this.value().length >= max * 0.9;
  });

  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
  }
}

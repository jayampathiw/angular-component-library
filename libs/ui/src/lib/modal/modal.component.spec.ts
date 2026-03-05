import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `<ui-modal
    [open]="open()"
    [title]="title()"
    [subtitle]="subtitle()"
    [size]="size()"
    [closeOnBackdrop]="closeOnBackdrop()"
    [closeOnEscape]="closeOnEscape()"
    (closed)="onClosed()"
  >
    <p>Modal body content</p>
    <div modal-footer>
      <button>Save</button>
    </div>
  </ui-modal>`,
})
class TestHostComponent {
  readonly open = signal(true);
  readonly title = signal('Test Modal');
  readonly subtitle = signal('');
  readonly size = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly closeOnBackdrop = signal(true);
  readonly closeOnEscape = signal(true);
  closedCount = 0;
  onClosed(): void { this.closedCount++; }
}

describe('ModalComponent', () => {
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

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should create', () => {
    const el = fixture.nativeElement.querySelector('ui-modal');
    expect(el).toBeTruthy();
  });

  it('should render dialog when open', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
  });

  it('should display title', () => {
    const title = fixture.nativeElement.querySelector('.ui-modal__title');
    expect(title.textContent.trim()).toBe('Test Modal');
  });

  it('should have aria-modal attribute', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('should project body content', () => {
    const body = fixture.nativeElement.querySelector('.ui-modal__body');
    expect(body.textContent).toContain('Modal body content');
  });

  it('should project footer content', () => {
    const footer = fixture.nativeElement.querySelector('.ui-modal__footer');
    expect(footer.textContent).toContain('Save');
  });

  it('should show close button', () => {
    const close = fixture.nativeElement.querySelector('.ui-modal__close');
    expect(close).toBeTruthy();
  });

  it('should close on close button click', () => {
    const close = fixture.nativeElement.querySelector('.ui-modal__close');
    close.click();
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
  });

  it('should close on backdrop click', () => {
    const backdrop = fixture.nativeElement.querySelector('.ui-modal__backdrop');
    backdrop.click();
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
  });

  it('should not render dialog when closed', () => {
    host.open.set(false);
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('should apply size class', () => {
    const dialog = fixture.nativeElement.querySelector('.ui-modal__dialog');
    expect(dialog.classList.contains('ui-modal__dialog--md')).toBe(true);
  });

  it('should not close on backdrop click when closeOnBackdrop is false', () => {
    host.closeOnBackdrop.set(false);
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.ui-modal__backdrop');
    backdrop.click();
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);
  });

  it('should close on escape key', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    dialog.dispatchEvent(event);
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
  });

  it('should not close on escape when closeOnEscape is false', () => {
    host.closeOnEscape.set(false);
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    dialog.dispatchEvent(event);
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);
  });

  it('should display subtitle when provided', () => {
    host.subtitle.set('A subtitle');
    fixture.detectChanges();
    const subtitle = fixture.nativeElement.querySelector('.ui-modal__subtitle');
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent.trim()).toBe('A subtitle');
  });

  it('should lock body scroll when open', () => {
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body scroll when closed', () => {
    host.open.set(false);
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('');
  });
});

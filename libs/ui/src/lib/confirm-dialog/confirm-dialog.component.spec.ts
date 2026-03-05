import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [ConfirmDialogComponent],
  template: `<ui-confirm-dialog
    [open]="open()"
    [title]="title()"
    [message]="message()"
    [confirmLabel]="confirmLabel()"
    [cancelLabel]="cancelLabel()"
    [variant]="variant()"
    (confirmed)="onConfirmed()"
    (cancelled)="onCancelled()"
  />`,
})
class TestHostComponent {
  readonly open = signal(true);
  readonly title = signal('Delete Item');
  readonly message = signal('Are you sure you want to delete this item?');
  readonly confirmLabel = signal('Delete');
  readonly cancelLabel = signal('Cancel');
  readonly variant = signal<'default' | 'danger'>('danger');
  confirmed = false;
  cancelled = false;
  onConfirmed(): void { this.confirmed = true; }
  onCancelled(): void { this.cancelled = true; }
}

describe('ConfirmDialogComponent', () => {
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
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
  });

  it('should display title', () => {
    const title = fixture.nativeElement.querySelector('.ui-modal__title');
    expect(title.textContent.trim()).toBe('Delete Item');
  });

  it('should display message', () => {
    const message = fixture.nativeElement.querySelector('.ui-confirm-dialog__message');
    expect(message.textContent.trim()).toBe('Are you sure you want to delete this item?');
  });

  it('should display custom button labels', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.ui-confirm-dialog__btn');
    expect(buttons[0].textContent.trim()).toBe('Cancel');
    expect(buttons[1].textContent.trim()).toBe('Delete');
  });

  it('should emit confirmed on confirm click', () => {
    const confirmBtn = fixture.nativeElement.querySelector('.ui-confirm-dialog__btn--danger');
    confirmBtn.click();
    expect(host.confirmed).toBe(true);
  });

  it('should emit cancelled on cancel click', () => {
    const cancelBtn = fixture.nativeElement.querySelector('.ui-confirm-dialog__btn--cancel');
    cancelBtn.click();
    expect(host.cancelled).toBe(true);
  });

  it('should apply danger variant class', () => {
    const confirmBtn = fixture.nativeElement.querySelector('.ui-confirm-dialog__btn--danger');
    expect(confirmBtn).toBeTruthy();
  });
});

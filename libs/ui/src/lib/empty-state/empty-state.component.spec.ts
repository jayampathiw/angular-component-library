import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [EmptyStateComponent],
  template: `<ui-empty-state
    [title]="title()"
    [description]="description()"
    [icon]="icon()"
    [actionLabel]="actionLabel()"
    [size]="size()"
    (action)="onAction()"
  />`,
})
class TestHostComponent {
  readonly title = signal('No items found');
  readonly description = signal('Try adjusting your filters');
  readonly icon = signal('');
  readonly actionLabel = signal('');
  readonly size = signal<'sm' | 'md' | 'lg'>('md');
  actionClicked = false;
  onAction(): void { this.actionClicked = true; }
}

describe('EmptyStateComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-empty-state');
    expect(el).toBeTruthy();
  });

  it('should display title', () => {
    const title = fixture.nativeElement.querySelector('.ui-empty-state__title');
    expect(title.textContent.trim()).toBe('No items found');
  });

  it('should display description', () => {
    const desc = fixture.nativeElement.querySelector('.ui-empty-state__description');
    expect(desc.textContent.trim()).toBe('Try adjusting your filters');
  });

  it('should hide description when empty', () => {
    host.description.set('');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('.ui-empty-state__description');
    expect(desc).toBeNull();
  });

  it('should display icon when provided', () => {
    host.icon.set('?');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.ui-empty-state__icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('should display action button when actionLabel provided', () => {
    host.actionLabel.set('Create Item');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.ui-empty-state__action');
    expect(btn.textContent.trim()).toBe('Create Item');
  });

  it('should emit action event on button click', () => {
    host.actionLabel.set('Create Item');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.ui-empty-state__action');
    btn.click();
    expect(host.actionClicked).toBe(true);
  });

  it('should apply size class', () => {
    const el = fixture.nativeElement.querySelector('ui-empty-state');
    expect(el.classList.contains('ui-empty-state--md')).toBe(true);
  });

  it('should change size class', () => {
    host.size.set('lg');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-empty-state');
    expect(el.classList.contains('ui-empty-state--lg')).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <ui-card [variant]="variant()" [interactive]="interactive()" [noPadding]="noPadding()">
      <div card-header>Header</div>
      Body content
      <div card-footer>Footer</div>
    </ui-card>
  `,
})
class TestHostComponent {
  readonly variant = signal<'elevated' | 'outlined' | 'filled'>('elevated');
  readonly interactive = signal(false);
  readonly noPadding = signal(false);
}

describe('CardComponent', () => {
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
    const card = fixture.nativeElement.querySelector('ui-card');
    expect(card).toBeTruthy();
  });

  it('should have region role for accessibility', () => {
    const card = fixture.nativeElement.querySelector('ui-card');
    expect(card.getAttribute('role')).toBe('region');
  });

  it('should project header content', () => {
    const header = fixture.nativeElement.querySelector('.ui-card__header');
    expect(header.textContent.trim()).toBe('Header');
  });

  it('should project body content', () => {
    const body = fixture.nativeElement.querySelector('.ui-card__body');
    expect(body.textContent).toContain('Body content');
  });

  it('should project footer content', () => {
    const footer = fixture.nativeElement.querySelector('.ui-card__footer');
    expect(footer.textContent.trim()).toBe('Footer');
  });

  it('should apply elevated variant by default', () => {
    const card = fixture.nativeElement.querySelector('ui-card');
    expect(card.classList.contains('ui-card--elevated')).toBe(true);
  });

  it('should switch to outlined variant', () => {
    host.variant.set('outlined');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('ui-card');
    expect(card.classList.contains('ui-card--outlined')).toBe(true);
    expect(card.classList.contains('ui-card--elevated')).toBe(false);
  });

  it('should apply interactive class', () => {
    host.interactive.set(true);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('ui-card');
    expect(card.classList.contains('ui-card--interactive')).toBe(true);
  });

  it('should apply no-padding class', () => {
    host.noPadding.set(true);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('ui-card');
    expect(card.classList.contains('ui-card--no-padding')).toBe(true);
  });
});

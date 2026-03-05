import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [StatCardComponent],
  template: `<ui-stat-card
    [label]="label()"
    [value]="value()"
    [trend]="trend()"
    [trendLabel]="trendLabel()"
    [icon]="icon()"
    [description]="description()"
  />`,
})
class TestHostComponent {
  readonly label = signal('Revenue');
  readonly value = signal('$45,231');
  readonly trend = signal<number | null>(12.5);
  readonly trendLabel = signal('vs last month');
  readonly icon = signal('$');
  readonly description = signal('');
}

describe('StatCardComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-stat-card');
    expect(el).toBeTruthy();
  });

  it('should display label', () => {
    const label = fixture.nativeElement.querySelector('.ui-stat-card__label');
    expect(label.textContent.trim()).toBe('Revenue');
  });

  it('should display value', () => {
    const value = fixture.nativeElement.querySelector('.ui-stat-card__value');
    expect(value.textContent.trim()).toBe('$45,231');
  });

  it('should display icon', () => {
    const icon = fixture.nativeElement.querySelector('.ui-stat-card__icon');
    expect(icon.textContent.trim()).toBe('$');
  });

  it('should display upward trend', () => {
    const trend = fixture.nativeElement.querySelector('.ui-stat-card__trend');
    expect(trend.classList.contains('ui-stat-card__trend--up')).toBe(true);
    expect(trend.textContent).toContain('12.5%');
  });

  it('should display trend label', () => {
    const label = fixture.nativeElement.querySelector('.ui-stat-card__trend-label');
    expect(label.textContent.trim()).toBe('vs last month');
  });

  it('should display downward trend', () => {
    host.trend.set(-5.2);
    fixture.detectChanges();
    const trend = fixture.nativeElement.querySelector('.ui-stat-card__trend');
    expect(trend.classList.contains('ui-stat-card__trend--down')).toBe(true);
  });

  it('should hide trend when null', () => {
    host.trend.set(null);
    fixture.detectChanges();
    const trend = fixture.nativeElement.querySelector('.ui-stat-card__trend');
    expect(trend).toBeNull();
  });

  it('should display description', () => {
    host.description.set('Total revenue this quarter');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('.ui-stat-card__description');
    expect(desc.textContent.trim()).toBe('Total revenue this quarter');
  });

  it('should display neutral trend for zero', () => {
    host.trend.set(0);
    fixture.detectChanges();
    const trend = fixture.nativeElement.querySelector('.ui-stat-card__trend');
    expect(trend.classList.contains('ui-stat-card__trend--neutral')).toBe(true);
    const arrow = fixture.nativeElement.querySelector('.ui-stat-card__trend-arrow');
    expect(arrow.textContent.trim()).toBe('\u2192');
  });

  it('should hide icon when not provided', () => {
    host.icon.set('');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.ui-stat-card__icon');
    expect(icon).toBeNull();
  });
});

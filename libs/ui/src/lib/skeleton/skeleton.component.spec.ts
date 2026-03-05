import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [SkeletonComponent],
  template: `<ui-skeleton
    [variant]="variant()"
    [width]="width()"
    [height]="height()"
    [animate]="animate()"
  />`,
})
class TestHostComponent {
  readonly variant = signal<'text' | 'circular' | 'rectangular' | 'rounded'>('text');
  readonly width = signal('100%');
  readonly height = signal<string | null>(null);
  readonly animate = signal(true);
}

describe('SkeletonComponent', () => {
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
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el).toBeTruthy();
  });

  it('should have status role', () => {
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el.getAttribute('role')).toBe('status');
  });

  it('should have loading aria-label', () => {
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el.getAttribute('aria-label')).toBe('Loading');
  });

  it('should apply text variant by default', () => {
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el.classList.contains('ui-skeleton--text')).toBe(true);
  });

  it('should apply animated class by default', () => {
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el.classList.contains('ui-skeleton--animated')).toBe(true);
  });

  it('should switch to circular variant', () => {
    host.variant.set('circular');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el.classList.contains('ui-skeleton--circular')).toBe(true);
  });

  it('should set width', () => {
    host.width.set('200px');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-skeleton') as HTMLElement;
    expect(el.style.width).toBe('200px');
  });

  it('should remove animated class when animate is false', () => {
    host.animate.set(false);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('ui-skeleton');
    expect(el.classList.contains('ui-skeleton--animated')).toBe(false);
  });
});

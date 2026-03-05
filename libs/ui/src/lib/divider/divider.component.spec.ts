import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerComponent } from './divider.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [DividerComponent],
  template: `<ui-divider [orientation]="orientation()" [spacing]="spacing()" [dashed]="dashed()" />`,
})
class TestHostComponent {
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly spacing = signal<'none' | 'sm' | 'md' | 'lg'>('md');
  readonly dashed = signal(false);
}

describe('DividerComponent', () => {
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
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider).toBeTruthy();
  });

  it('should have separator role', () => {
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider.getAttribute('role')).toBe('separator');
  });

  it('should have aria-orientation', () => {
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should apply horizontal class by default', () => {
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider.classList.contains('ui-divider--horizontal')).toBe(true);
  });

  it('should switch to vertical orientation', () => {
    host.orientation.set('vertical');
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider.classList.contains('ui-divider--vertical')).toBe(true);
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should apply spacing class', () => {
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider.classList.contains('ui-divider--spacing-md')).toBe(true);
  });

  it('should apply dashed class', () => {
    host.dashed.set(true);
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('ui-divider');
    expect(divider.classList.contains('ui-divider--dashed')).toBe(true);
  });
});

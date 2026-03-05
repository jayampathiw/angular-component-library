import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [GridComponent],
  template: `<ui-grid [columns]="columns()" [gap]="gap()" [align]="align()">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </ui-grid>`,
})
class TestHostComponent {
  readonly columns = signal<1 | 2 | 3 | 4 | 5 | 6 | 12>(3);
  readonly gap = signal<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly align = signal<'start' | 'center' | 'end' | 'stretch'>('stretch');
}

describe('GridComponent', () => {
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
    const grid = fixture.nativeElement.querySelector('ui-grid');
    expect(grid).toBeTruthy();
  });

  it('should project child items', () => {
    const items = fixture.nativeElement.querySelectorAll('ui-grid > div');
    expect(items.length).toBe(3);
  });

  it('should set columns CSS variable', () => {
    const grid = fixture.nativeElement.querySelector('ui-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--grid-columns')).toBe('3');
  });

  it('should update columns CSS variable', () => {
    host.columns.set(4);
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('ui-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--grid-columns')).toBe('4');
  });

  it('should set gap CSS variable for md', () => {
    const grid = fixture.nativeElement.querySelector('ui-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--grid-gap')).toBe('var(--ui-space-4)');
  });

  it('should set align-items', () => {
    host.align.set('center');
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('ui-grid') as HTMLElement;
    expect(grid.style.alignItems).toBe('center');
  });
});

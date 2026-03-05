import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerComponent } from './container.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [ContainerComponent],
  template: `<ui-container [size]="size()" [padded]="padded()" [centered]="centered()">
    <p>Content</p>
  </ui-container>`,
})
class TestHostComponent {
  readonly size = signal<'sm' | 'md' | 'lg' | 'xl' | 'full'>('lg');
  readonly padded = signal(true);
  readonly centered = signal(true);
}

describe('ContainerComponent', () => {
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
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container).toBeTruthy();
  });

  it('should project content', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toBe('Content');
  });

  it('should apply size class', () => {
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container.classList.contains('ui-container--lg')).toBe(true);
  });

  it('should apply padded class by default', () => {
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container.classList.contains('ui-container--padded')).toBe(true);
  });

  it('should apply centered class by default', () => {
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container.classList.contains('ui-container--centered')).toBe(true);
  });

  it('should change size class when input changes', () => {
    host.size.set('sm');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container.classList.contains('ui-container--sm')).toBe(true);
    expect(container.classList.contains('ui-container--lg')).toBe(false);
  });

  it('should remove padded class when padded is false', () => {
    host.padded.set(false);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container.classList.contains('ui-container--padded')).toBe(false);
  });

  it('should remove centered class when centered is false', () => {
    host.centered.set(false);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('ui-container');
    expect(container.classList.contains('ui-container--centered')).toBe(false);
  });
});

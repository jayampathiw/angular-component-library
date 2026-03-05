import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent, BreadcrumbItem } from './breadcrumbs.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [BreadcrumbsComponent],
  template: `<ui-breadcrumbs [items]="items()" [separator]="separator()" [maxItems]="maxItems()" />`,
})
class TestHostComponent {
  readonly items = signal<BreadcrumbItem[]>([
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Widget' },
  ]);
  readonly separator = signal('/');
  readonly maxItems = signal(0);
}

describe('BreadcrumbsComponent', () => {
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
    const breadcrumbs = fixture.nativeElement.querySelector('ui-breadcrumbs');
    expect(breadcrumbs).toBeTruthy();
  });

  it('should render nav with aria-label', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should render all breadcrumb items', () => {
    const items = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__item');
    expect(items.length).toBe(3);
  });

  it('should render links for items with href', () => {
    const links = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__link');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/products');
  });

  it('should mark last item as current page', () => {
    const current = fixture.nativeElement.querySelector('.ui-breadcrumbs__current');
    expect(current).toBeTruthy();
    expect(current.textContent.trim()).toBe('Widget');
    expect(current.getAttribute('aria-current')).toBe('page');
  });

  it('should render separators between items', () => {
    const separators = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__separator');
    expect(separators.length).toBe(2);
    expect(separators[0].textContent.trim()).toBe('/');
  });

  it('should hide separators from screen readers', () => {
    const separators = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__separator');
    separators.forEach((sep: Element) => {
      expect(sep.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should change separator character', () => {
    host.separator.set('>');
    fixture.detectChanges();
    const separators = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__separator');
    expect(separators[0].textContent.trim()).toBe('>');
  });

  it('should update items dynamically', () => {
    host.items.set([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings' },
    ]);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__item');
    expect(items.length).toBe(2);
  });

  it('should render non-last item without href as text span', () => {
    host.items.set([
      { label: 'Category' },
      { label: 'Subcategory' },
      { label: 'Current' },
    ]);
    fixture.detectChanges();
    const textSpans = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__text');
    expect(textSpans.length).toBe(2);
    expect(textSpans[0].textContent.trim()).toBe('Category');
  });

  it('should truncate items when maxItems is set', () => {
    host.items.set([
      { label: 'Home', href: '/' },
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'Current' },
    ]);
    host.maxItems.set(3);
    fixture.detectChanges();
    // Should show: Home, C, Current (first + last 2)
    const items = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__item');
    expect(items.length).toBe(3);
  });

  it('should show all items when maxItems is 0', () => {
    host.maxItems.set(0);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__item');
    expect(items.length).toBe(3);
  });

  it('should show all items when maxItems exceeds item count', () => {
    host.maxItems.set(10);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.ui-breadcrumbs__item');
    expect(items.length).toBe(3);
  });
});

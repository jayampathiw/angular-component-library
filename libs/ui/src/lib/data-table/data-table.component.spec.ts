import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent, ColumnDef } from './data-table.component';
import { Component, signal } from '@angular/core';

interface TestRow {
  id: number;
  name: string;
  email: string;
}

@Component({
  standalone: true,
  imports: [DataTableComponent],
  template: `<ui-data-table
    [columns]="columns()"
    [data]="data()"
    [paginated]="paginated()"
    [pageSize]="pageSize()"
    [striped]="striped()"
  />`,
})
class TestHostComponent {
  readonly columns = signal<ColumnDef<TestRow>[]>([
    { key: 'id', label: 'ID', sortable: true, width: '60px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ]);
  readonly data = signal<TestRow[]>([
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
    { id: 3, name: 'Charlie', email: 'charlie@test.com' },
  ]);
  readonly paginated = signal(false);
  readonly pageSize = signal(10);
  readonly striped = signal(true);
}

describe('DataTableComponent', () => {
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
    const table = fixture.nativeElement.querySelector('ui-data-table');
    expect(table).toBeTruthy();
  });

  it('should render column headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('.ui-data-table__th');
    expect(headers.length).toBe(3);
    expect(headers[1].textContent).toContain('Name');
  });

  it('should render data rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.ui-data-table__row');
    expect(rows.length).toBe(3);
  });

  it('should display cell values', () => {
    const cells = fixture.nativeElement.querySelectorAll('.ui-data-table__td');
    expect(cells[0].textContent.trim()).toBe('1');
    expect(cells[1].textContent.trim()).toBe('Alice');
    expect(cells[2].textContent.trim()).toBe('alice@test.com');
  });

  it('should show sort button for sortable columns', () => {
    const sortBtns = fixture.nativeElement.querySelectorAll('.ui-data-table__sort-btn');
    expect(sortBtns.length).toBe(2);
  });

  it('should sort on column click', () => {
    const sortBtn = fixture.nativeElement.querySelector('.ui-data-table__sort-btn');
    sortBtn.click();
    fixture.detectChanges();
    const firstCell = fixture.nativeElement.querySelector('.ui-data-table__td');
    expect(firstCell.textContent.trim()).toBe('1');
  });

  it('should have table role', () => {
    const table = fixture.nativeElement.querySelector('[role="table"]');
    expect(table).toBeTruthy();
  });

  it('should show empty message when no data', () => {
    host.data.set([]);
    fixture.detectChanges();
    const empty = fixture.nativeElement.querySelector('.ui-data-table__empty');
    expect(empty.textContent).toContain('No data available');
  });

  it('should apply striped rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.ui-data-table__row');
    expect(rows[1].classList.contains('ui-data-table__row--striped')).toBe(true);
  });

  it('should show pagination when enabled with enough data', () => {
    host.paginated.set(true);
    host.pageSize.set(2);
    fixture.detectChanges();
    const pagination = fixture.nativeElement.querySelector('.ui-data-table__pagination');
    expect(pagination).toBeTruthy();
    expect(pagination.textContent).toContain('Page 1 of 2');
  });

  it('should paginate data', () => {
    host.paginated.set(true);
    host.pageSize.set(2);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.ui-data-table__row');
    expect(rows.length).toBe(2);
  });

  it('should toggle sort direction on same column click', () => {
    const sortBtns = fixture.nativeElement.querySelectorAll('.ui-data-table__sort-btn');
    // First click: asc
    sortBtns[0].click();
    fixture.detectChanges();
    // Second click: desc
    sortBtns[0].click();
    fixture.detectChanges();
    const sortIcon = sortBtns[0].querySelector('.ui-data-table__sort-icon');
    expect(sortIcon.textContent.trim()).toBe('\u2193');
  });

  it('should show ascending aria-sort when sorted asc', () => {
    const sortBtns = fixture.nativeElement.querySelectorAll('.ui-data-table__sort-btn');
    sortBtns[0].click();
    fixture.detectChanges();
    const th = fixture.nativeElement.querySelectorAll('.ui-data-table__th');
    expect(th[0].getAttribute('aria-sort')).toBe('ascending');
  });

  it('should return null aria-sort for unsorted column', () => {
    const th = fixture.nativeElement.querySelectorAll('.ui-data-table__th');
    expect(th[1].getAttribute('aria-sort')).toBeNull();
  });

  it('should show default sort icon for unsorted column', () => {
    const sortBtns = fixture.nativeElement.querySelectorAll('.ui-data-table__sort-btn');
    const icon = sortBtns[1].querySelector('.ui-data-table__sort-icon');
    expect(icon.textContent.trim()).toBe('\u2195');
  });

  it('should navigate to next page', () => {
    host.paginated.set(true);
    host.pageSize.set(2);
    fixture.detectChanges();
    const nextBtn = fixture.nativeElement.querySelector('[aria-label="Next page"]');
    nextBtn.click();
    fixture.detectChanges();
    const pageInfo = fixture.nativeElement.querySelector('.ui-data-table__page-info');
    expect(pageInfo.textContent).toContain('Page 2 of 2');
  });

  it('should not go below page 1', () => {
    host.paginated.set(true);
    host.pageSize.set(2);
    fixture.detectChanges();
    const prevBtn = fixture.nativeElement.querySelector('[aria-label="Previous page"]');
    expect(prevBtn.disabled).toBe(true);
  });

  it('should not go beyond last page', () => {
    host.paginated.set(true);
    host.pageSize.set(2);
    fixture.detectChanges();
    // Go to last page
    const nextBtn = fixture.nativeElement.querySelector('[aria-label="Next page"]');
    nextBtn.click();
    fixture.detectChanges();
    expect(nextBtn.disabled).toBe(true);
  });

  it('should handle sorting with equal values', () => {
    host.data.set([
      { id: 1, name: 'Alice', email: 'a@test.com' },
      { id: 1, name: 'Alice', email: 'b@test.com' },
    ]);
    fixture.detectChanges();
    const sortBtn = fixture.nativeElement.querySelector('.ui-data-table__sort-btn');
    sortBtn.click();
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.ui-data-table__row');
    expect(rows.length).toBe(2);
  });
});

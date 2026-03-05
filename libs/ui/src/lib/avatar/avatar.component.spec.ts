import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [AvatarComponent],
  template: `<ui-avatar [src]="src()" [name]="name()" [size]="size()" [alt]="alt()" />`,
})
class TestHostComponent {
  readonly src = signal('');
  readonly name = signal('John Doe');
  readonly size = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly alt = signal('');
}

describe('AvatarComponent', () => {
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
    const avatar = fixture.nativeElement.querySelector('ui-avatar');
    expect(avatar).toBeTruthy();
  });

  it('should display initials when no image', () => {
    const initials = fixture.nativeElement.querySelector('.ui-avatar__initials');
    expect(initials.textContent.trim()).toBe('JD');
  });

  it('should compute single initial for single name', () => {
    host.name.set('Alice');
    fixture.detectChanges();
    const initials = fixture.nativeElement.querySelector('.ui-avatar__initials');
    expect(initials.textContent.trim()).toBe('A');
  });

  it('should show question mark when no name', () => {
    host.name.set('');
    fixture.detectChanges();
    const initials = fixture.nativeElement.querySelector('.ui-avatar__initials');
    expect(initials.textContent.trim()).toBe('?');
  });

  it('should display image when src is provided', () => {
    host.src.set('https://example.com/avatar.jpg');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('.ui-avatar__image');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('should have img role', () => {
    const avatar = fixture.nativeElement.querySelector('ui-avatar');
    expect(avatar.getAttribute('role')).toBe('img');
  });

  it('should use name as aria-label', () => {
    const avatar = fixture.nativeElement.querySelector('ui-avatar');
    expect(avatar.getAttribute('aria-label')).toBe('John Doe');
  });

  it('should apply size class', () => {
    const avatar = fixture.nativeElement.querySelector('ui-avatar');
    expect(avatar.classList.contains('ui-avatar--md')).toBe(true);
  });

  it('should change size class', () => {
    host.size.set('lg');
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('ui-avatar');
    expect(avatar.classList.contains('ui-avatar--lg')).toBe(true);
  });

  it('should fall back to initials on image error', () => {
    host.src.set('https://example.com/broken.jpg');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('.ui-avatar__image');
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    const initials = fixture.nativeElement.querySelector('.ui-avatar__initials');
    expect(initials).toBeTruthy();
  });
});

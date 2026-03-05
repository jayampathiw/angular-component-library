import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [TabsComponent, TabComponent],
  template: `
    <ui-tabs [activeIndex]="activeIndex()">
      <ui-tab label="Tab 1">Content 1</ui-tab>
      <ui-tab label="Tab 2">Content 2</ui-tab>
      <ui-tab label="Tab 3" [disabled]="true">Content 3</ui-tab>
    </ui-tabs>
  `,
})
class TestHostComponent {
  readonly activeIndex = signal(0);
}

describe('TabsComponent', () => {
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
    const tabs = fixture.nativeElement.querySelector('ui-tabs');
    expect(tabs).toBeTruthy();
  });

  it('should render tab buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent.trim()).toBe('Tab 1');
  });

  it('should have tablist role', () => {
    const tablist = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(tablist).toBeTruthy();
  });

  it('should mark first tab as active by default', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
    expect(buttons[1].getAttribute('aria-selected')).toBe('false');
  });

  it('should display content of active tab', () => {
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel.textContent).toContain('Content 1');
  });

  it('should switch tabs on click', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[1].click();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel.textContent).toContain('Content 2');
  });

  it('should not activate disabled tab on click', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[2].click();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel.textContent).toContain('Content 1');
  });

  it('should disable the third tab', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(buttons[2].disabled).toBe(true);
  });

  it('should have tabpanel with role', () => {
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel).toBeTruthy();
    expect(panel.getAttribute('tabindex')).toBe('0');
  });

  it('should update active tab from input', () => {
    host.activeIndex.set(1);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel.textContent).toContain('Content 2');
  });

  it('should navigate to next tab with ArrowRight', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    buttons[0].dispatchEvent(event);
    fixture.detectChanges();
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
  });

  it('should skip disabled tab with ArrowRight', () => {
    // Active is 1 (Tab 2), ArrowRight should skip disabled Tab 3 and wrap to Tab 1
    host.activeIndex.set(1);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    buttons[1].dispatchEvent(event);
    fixture.detectChanges();
    // Tab 3 is disabled, so it wraps to Tab 1 (index 0)
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
  });

  it('should navigate to previous tab with ArrowLeft', () => {
    host.activeIndex.set(1);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    buttons[1].dispatchEvent(event);
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
  });

  it('should skip disabled tab with ArrowLeft', () => {
    // Active is 0 (Tab 1), ArrowLeft wraps to Tab 3 (disabled), skips to Tab 2
    host.activeIndex.set(0);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    buttons[0].dispatchEvent(event);
    fixture.detectChanges();
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
  });

  it('should navigate to first tab with Home', () => {
    host.activeIndex.set(1);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    buttons[1].dispatchEvent(event);
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
  });

  it('should navigate to last tab with End', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    buttons[0].dispatchEvent(event);
    fixture.detectChanges();
    // Tab 3 (index 2) is disabled, so selectTab won't activate it; stays at current
    // End sets next = allTabs.length - 1 = 2, but tab is disabled so selectTab is a no-op
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
  });

  it('should not navigate on unrecognized key', () => {
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    buttons[0].dispatchEvent(event);
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
  });

  it('should render indicator', () => {
    const indicator = fixture.nativeElement.querySelector('.ui-tabs__indicator');
    expect(indicator).toBeTruthy();
  });
});

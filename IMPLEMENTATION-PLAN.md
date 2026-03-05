# Angular Component Library — Implementation Plan

> **Created**: March 5, 2026
> **Status**: ~80% Complete — Components Done, Deployment Pending
> **Project**: Showcase Project 2 of 3 (Upwork Portfolio)

---

## Table of Contents

1. [Context](#context)
2. [Key Design Decisions](#key-design-decisions)
3. [Scope](#scope)
4. [Architecture](#architecture)
5. [Design Tokens System](#design-tokens-system)
6. [Component Inventory](#component-inventory)
7. [Complete File Tree](#complete-file-tree)
8. [Phase 1: Nx Workspace & Design Tokens](#phase-1-nx-workspace--design-tokens)
9. [Phase 2: Layout Components](#phase-2-layout-components)
10. [Phase 3: Navigation Components](#phase-3-navigation-components)
11. [Phase 4: Data Display Components](#phase-4-data-display-components)
12. [Phase 5: Form Components](#phase-5-form-components)
13. [Phase 6: Feedback Components](#phase-6-feedback-components)
14. [Phase 7: Storybook Configuration](#phase-7-storybook-configuration)
15. [Phase 8: Testing & Coverage](#phase-8-testing--coverage)
16. [Phase 9: Deployment & Polish](#phase-9-deployment--polish)
17. [Phase 10: Final Deliverables](#phase-10-final-deliverables)
18. [Component Patterns](#component-patterns)
19. [Testing Strategy](#testing-strategy)
20. [Verification Checklist](#verification-checklist)

---

## Context

Project 2 of the Showcase Projects suite for Upwork portfolio. This project demonstrates **component library development expertise** — the ability to design, build, document, and publish reusable UI components with a systematic design token approach, accessibility compliance, and comprehensive Storybook documentation.

**Purpose**: Proves component library expertise claimed in resume (50+ components at CSG). Enterprise clients who need design systems and component libraries will see this as direct evidence.

**Target Upwork Job Types**:
- "Need component library / design system"
- "Angular developer for SaaS" (shows reusable component thinking)
- "Storybook documentation"
- "Accessibility / WCAG compliance"
- "Design token / theming system"

---

## Key Design Decisions

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | **Workspace** | Nx monorepo | Industry standard for library development; shows Nx skills |
| 2 | **Angular** | 21.1 (latest) | Shows cutting-edge framework knowledge |
| 3 | **Documentation** | Storybook 10 with Docs + A11y | Interactive, self-documenting component catalog |
| 4 | **Theming** | Custom CSS custom properties | Framework-agnostic tokens, not tied to Material |
| 5 | **Components** | Custom (not Material wrappers) | Demonstrates component authoring skill, not just Material usage |
| 6 | **Packaging** | ng-packagr (FESM2022) | NPM-publishable library format |
| 7 | **Testing** | Jest with host component pattern | Signal-aware testing |
| 8 | **CI/CD** | GitHub Actions with Nx Cloud | Distributed caching and parallelism |

---

## Scope

### Included (20 Components)

**Layout (4)**: Container, Grid, Card, Divider
**Navigation (3)**: Breadcrumbs, Tabs, Stepper
**Data Display (6)**: Data Table, Badge, Avatar, Skeleton, Stat Card, Empty State
**Forms (3)**: Input, Select, Textarea
**Feedback (4)**: Toast, Modal, Confirm Dialog, Progress Bar

### Each Component Includes

- TypeScript implementation (standalone, OnPush, signals)
- SCSS styles using design tokens (no hardcoded colors)
- Jest unit test with host component pattern
- Storybook story (CSF3) with Controls and Docs
- Barrel export (index.ts)
- ARIA attributes and keyboard navigation

### Deferred

- Form validation integration (ControlValueAccessor)
- Animation library (Angular Animations)
- Complex components (Date Picker, Autocomplete, Tree View)
- Theming configurator / live playground
- NPM publish (build artifact ready, not published)

---

## Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Angular | 21.1.6 |
| Language | TypeScript | 5.9.2 (strict) |
| Build System | Nx | 22.5.1 |
| Library Packaging | ng-packagr | — |
| Documentation | Storybook | 10.2.14 |
| Storybook Addons | Docs, A11y | — |
| Testing | Jest + jest-preset-angular | 30.0.2 / 16.0.0 |
| Linting | ESLint + Angular ESLint + Prettier | 9.39.3 / 21.0.1 / 3.6.2 |
| Package Manager | PNPM | — |

### Workspace Structure

```
angular-component-library/
├── libs/ui/                          # Publishable library (@showcase/ui)
│   ├── src/
│   │   ├── lib/                      # 20 components
│   │   ├── styles/                   # Design tokens
│   │   └── index.ts                  # Public API
│   ├── .storybook/                   # Storybook config
│   └── ng-package.json               # Library build config
├── apps/demo/                        # Demo app consuming the library
├── dist/
│   ├── libs/ui/                      # Built library (FESM2022 + types)
│   └── storybook/ui/                 # Static Storybook build
├── .github/workflows/ci.yml          # CI pipeline
├── nx.json                           # Nx workspace config
└── package.json
```

---

## Design Tokens System

### Token Files (`libs/ui/src/styles/tokens/`)

| File | Purpose | Tokens |
|------|---------|--------|
| `_colors.scss` | Semantic color system | 50+ CSS custom properties |
| `_typography.scss` | Font scale & weights | Sizes xs-4xl, weights 400-700 |
| `_spacing.scss` | 4px grid system | Space scale 0-16, semantic tokens |
| `_shadows.scss` | Elevation levels | 6 levels (xs-2xl), focus ring |
| `_transitions.scss` | Animation presets | Durations, easings, shorthand transitions |

### Color Architecture

```scss
// Light theme (default)
:root, [data-theme='light'] {
  --ui-color-primary: #2563eb;
  --ui-color-surface: #ffffff;
  --ui-color-on-surface: #0f172a;
  --ui-color-surface-container: #f1f5f9;
  // + 40 more semantic tokens
}

// Dark theme (auto or manual)
[data-theme='dark'] {
  --ui-color-primary: #60a5fa;
  --ui-color-surface: #0f172a;
  --ui-color-on-surface: #f1f5f9;
  // All tokens auto-switch
}
```

### Shape Scale

```scss
--ui-radius-xs: 4px;
--ui-radius-sm: 6px;
--ui-radius-md: 8px;
--ui-radius-lg: 12px;
--ui-radius-xl: 16px;
--ui-radius-2xl: 24px;
--ui-radius-full: 9999px;
```

---

## Component Inventory

### All 20 Components

| # | Component | Category | Files | Status |
|---|-----------|----------|-------|--------|
| 1 | Container | Layout | .ts, .scss, .spec, .stories | ✅ Complete |
| 2 | Grid | Layout | .ts, .scss, .spec, .stories | ✅ Complete |
| 3 | Card | Layout | .ts, .scss, .spec, .stories | ✅ Complete |
| 4 | Divider | Layout | .ts, .scss, .spec, .stories | ✅ Complete |
| 5 | Breadcrumbs | Navigation | .ts, .scss, .spec, .stories | ✅ Complete |
| 6 | Tabs | Navigation | .ts, .scss, .spec, .stories | ✅ Complete |
| 7 | Stepper | Navigation | .ts, .scss, .spec, .stories | ✅ Complete |
| 8 | Data Table | Data Display | .ts, .scss, .spec, .stories | ✅ Complete |
| 9 | Badge | Data Display | .ts, .scss, .spec, .stories | ✅ Complete |
| 10 | Avatar | Data Display | .ts, .scss, .spec, .stories | ⚠️ Placeholder |
| 11 | Skeleton | Data Display | .ts, .scss, .spec, .stories | ⚠️ Placeholder |
| 12 | Stat Card | Data Display | .ts, .scss, .spec, .stories | ✅ Complete |
| 13 | Empty State | Data Display | .ts, .scss, .spec, .stories | ✅ Complete |
| 14 | Input | Form | .ts, .scss, .spec, .stories | ✅ Complete |
| 15 | Select | Form | .ts, .scss, .spec, .stories | ✅ Complete |
| 16 | Textarea | Form | .ts, .scss, .spec, .stories | ✅ Complete |
| 17 | Toast | Feedback | .ts, .scss, .spec, .stories | ✅ Complete |
| 18 | Modal | Feedback | .ts, .scss, .spec, .stories | ✅ Complete |
| 19 | Confirm Dialog | Feedback | .ts, .scss, .spec, .stories | ✅ Complete |
| 20 | Progress Bar | Feedback | .ts, .scss, .spec, .stories | ✅ Complete |

**18/20 fully implemented, 2 placeholder**

---

## Complete File Tree

```
angular-component-library/
│
├── libs/ui/
│   ├── src/
│   │   ├── index.ts                             # Public API exports (all 20 components)
│   │   │
│   │   ├── lib/
│   │   │   ├── badge/
│   │   │   │   ├── badge.component.ts           # Variants, sizes, removable
│   │   │   │   ├── badge.component.scss
│   │   │   │   ├── badge.component.spec.ts      # 9 test cases
│   │   │   │   ├── badge.component.stories.ts   # 4 stories
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── avatar/                          # (placeholder — needs completion)
│   │   │   │   ├── avatar.component.ts
│   │   │   │   ├── avatar.component.scss
│   │   │   │   ├── avatar.component.spec.ts
│   │   │   │   ├── avatar.component.stories.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── breadcrumbs/                     # Same 5-file pattern
│   │   │   ├── card/
│   │   │   ├── confirm-dialog/
│   │   │   ├── container/
│   │   │   ├── data-table/
│   │   │   ├── divider/
│   │   │   ├── empty-state/
│   │   │   ├── grid/
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── progress-bar/
│   │   │   ├── select/
│   │   │   ├── skeleton/                        # (placeholder — needs completion)
│   │   │   ├── stat-card/
│   │   │   ├── stepper/
│   │   │   ├── tabs/
│   │   │   ├── textarea/
│   │   │   ├── toast/
│   │   │   │
│   │   │   └── introduction/
│   │   │       └── welcome.stories.ts           # Storybook welcome page
│   │   │
│   │   ├── styles/
│   │   │   ├── _index.scss                      # Main stylesheet
│   │   │   └── tokens/
│   │   │       ├── _colors.scss                 # 50+ semantic color tokens
│   │   │       ├── _spacing.scss                # 4px grid system
│   │   │       ├── _typography.scss             # Font scale
│   │   │       ├── _shadows.scss                # Elevation levels
│   │   │       ├── _transitions.scss            # Animation presets
│   │   │       └── _index.scss                  # Token aggregator
│   │   │
│   │   └── test-setup.ts                        # Jest setup
│   │
│   ├── .storybook/
│   │   ├── main.ts                              # Framework, addons, stories path
│   │   ├── preview.ts                           # Global decorators, viewports, backgrounds
│   │   ├── preview-styles.scss                  # Global Storybook styles
│   │   ├── theme-decorator.ts                   # Light/dark/auto theme switcher
│   │   └── tsconfig.json
│   │
│   ├── ng-package.json                          # ng-packagr config
│   ├── project.json                             # Nx project config
│   ├── jest.config.cts
│   ├── tsconfig.lib.json
│   └── tsconfig.lib.prod.json
│
├── apps/demo/                                   # Demo application
│   ├── src/
│   │   ├── app/app.component.ts
│   │   ├── main.ts
│   │   └── styles.scss
│   └── project.json
│
├── dist/
│   ├── libs/ui/                                 # Built library (FESM2022 + types)
│   └── storybook/ui/                            # Static Storybook (77 files, ~6.7MB)
│
├── coverage/libs/ui/                            # Jest coverage reports
│
├── .github/workflows/ci.yml                     # GitHub Actions CI/CD
├── nx.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.base.json
├── README.md                                    # (generic Nx — needs replacement)
└── .gitignore
```

---

## Phase 1: Nx Workspace & Design Tokens

**Goal**: Nx monorepo with publishable library and design token system
**Status**: ✅ COMPLETE

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Nx workspace scaffold | ✅ Done | Nx 22.5.1, Angular 21, PNPM |
| `libs/ui` publishable library | ✅ Done | ng-packagr, FESM2022 output |
| `apps/demo` consuming app | ✅ Done | Angular app importing @showcase/ui |
| Color tokens (_colors.scss) | ✅ Done | 50+ semantic tokens, light/dark |
| Typography tokens | ✅ Done | Font sizes, weights, line heights |
| Spacing tokens | ✅ Done | 4px grid, semantic spacing |
| Shadow tokens | ✅ Done | 6 elevation levels |
| Transition tokens | ✅ Done | Durations, easings, shorthands |
| nx.json generator defaults | ✅ Done | OnPush, standalone, SCSS, `ui` prefix |
| TypeScript strict mode | ✅ Done | All strict options enabled |

---

## Phase 2: Layout Components

**Goal**: 4 layout primitives
**Status**: ✅ COMPLETE

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Container component | ✅ Done | Responsive max-width wrapper |
| Grid component | ✅ Done | CSS Grid with custom properties |
| Card component | ✅ Done | elevated/outlined/filled variants, interactive mode |
| Divider component | ✅ Done | Horizontal/vertical, text content |
| Stories for all 4 | ✅ Done | CSF3 with Controls |
| Tests for all 4 | ✅ Done | Host component pattern |

---

## Phase 3: Navigation Components

**Goal**: 3 navigation components
**Status**: ✅ COMPLETE

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Breadcrumbs component | ✅ Done | Clickable items, separator |
| Tabs component | ✅ Done | Tab/TabPanel, icons, disabled states |
| Stepper component | ✅ Done | Horizontal/vertical, status icons, navigation |
| Stories for all 3 | ✅ Done | Multiple variants |
| Tests for all 3 | ✅ Done | Interaction testing |

---

## Phase 4: Data Display Components

**Goal**: 6 data display components
**Status**: 🔄 4/6 Complete, 2 Placeholder

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Data Table component | ✅ Done | Sorting, pagination, striped, empty state |
| Badge component | ✅ Done | 5 variants, 3 sizes, removable |
| Stat Card component | ✅ Done | KPI with trend indicator |
| Empty State component | ✅ Done | Icon + title + description + CTA |
| Avatar component | ⚠️ Placeholder | Image/initials fallback — needs implementation |
| Skeleton component | ⚠️ Placeholder | Loading placeholders — needs implementation |
| Stories for complete ones | ✅ Done | CSF3 with Controls |
| Tests for complete ones | ✅ Done | Host component pattern |

### Remaining Work

**Avatar** (estimated 2-3 hours):
- Image with fallback to initials
- 4 sizes (xs, sm, md, lg)
- Rounded shape
- Status indicator dot
- ARIA: role="img", aria-label

**Skeleton** (estimated 2-3 hours):
- 3 variants: text, circular, rectangular
- Pulse animation
- Configurable width/height
- Multiple lines support

---

## Phase 5: Form Components

**Goal**: 3 form input components
**Status**: ✅ COMPLETE

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Input component | ✅ Done | 7 types, sizes, labels, error states, hints |
| Select component | ✅ Done | Single/multi, groups, disabled |
| Textarea component | ✅ Done | Resizable, label, error, hint |
| model() two-way binding | ✅ Done | Signal-based value binding |
| Stories for all 3 | ✅ Done | All input states |
| Tests for all 3 | ✅ Done | Value changes, validation display |

---

## Phase 6: Feedback Components

**Goal**: 4 feedback/overlay components
**Status**: ✅ COMPLETE

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Toast component | ✅ Done | 5 variants, auto-dismiss, stacked |
| Modal component | ✅ Done | 4 sizes, backdrop, escape key, scroll lock |
| Confirm Dialog component | ✅ Done | Danger/warning patterns, confirm/cancel |
| Progress Bar component | ✅ Done | Determinate/indeterminate, striped |
| Stories for all 4 | ✅ Done | Interactive demos |
| Tests for all 4 | ✅ Done | Open/close, event emission |

---

## Phase 7: Storybook Configuration

**Goal**: Fully configured Storybook with themes, viewports, a11y
**Status**: ✅ COMPLETE

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Storybook 10 setup | ✅ Done | @storybook/angular framework |
| Docs addon | ✅ Done | Auto-generated component docs |
| A11y addon | ✅ Done | Accessibility testing panel |
| Theme decorator (light/dark/auto) | ✅ Done | Toolbar switcher |
| Viewport presets (mobile/tablet/desktop) | ✅ Done | 4 viewports |
| Welcome/introduction story | ✅ Done | Component showcase overview |
| Static build | ✅ Done | dist/storybook/ui/ (77 files, ~6.7MB) |

---

## Phase 8: Testing & Coverage

**Goal**: Jest tests for all components with 70%+ coverage
**Status**: 🔄 In Progress

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Jest configuration | ✅ Done | jest-preset-angular, coverage collection |
| Badge tests (9 cases) | ✅ Done | Variants, sizes, removable |
| Input tests | ✅ Done | Types, validation, binding |
| Modal tests | ✅ Done | Open/close, escape, backdrop |
| Card tests | ✅ Done | Variants, interactive |
| Data Table tests | ✅ Done | Sort, pagination |
| All other component tests | ✅ Done | Creation, inputs, events |
| Coverage threshold enforcement | ❌ Not Done | Need to set and verify thresholds |
| Generate coverage report | ✅ Done | coverage/libs/ui/ present |

---

## Phase 9: Deployment & Polish

**Goal**: Live Storybook URL, Git repo, CI/CD
**Status**: ❌ NOT STARTED

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Initialize git repository | ❌ Not Done | No .git directory |
| Create GitHub repo | ❌ Not Done | Need public repo |
| Initial commit with clean history | ❌ Not Done | Conventional commits |
| Vercel/Chromatic deployment config | ❌ Not Done | No vercel.json or chromatic config |
| Deploy Storybook | ❌ Not Done | Static build ready, needs hosting |
| Live demo URL | ❌ Not Done | — |
| GitHub Actions CI verification | ⚠️ Config Ready | ci.yml exists but untested |

### Deployment Options

| Platform | Pros | Cons |
|----------|------|------|
| **Vercel** (Recommended) | Free, fast, proven from Dashboard | Need vercel.json |
| **Chromatic** | Built for Storybook, visual testing | Requires Chromatic account |
| **GitHub Pages** | Free, integrated with repo | Manual deploy setup |

### Recommended Vercel Config

```json
{
  "buildCommand": "pnpm build-storybook",
  "outputDirectory": "dist/storybook/ui",
  "framework": null
}
```

---

## Phase 10: Final Deliverables

**Goal**: Professional README, Loom video, showcase-ready
**Status**: ❌ NOT STARTED

### Tasks

| Task | Status | Details |
|------|--------|---------|
| Custom README.md | ❌ Not Done | Currently generic Nx template |
| Badges (Angular, Storybook, TypeScript, A11y, License) | ❌ Not Done | — |
| Component catalog table | ❌ Not Done | All 20 components listed |
| Architecture diagram (Mermaid) | ❌ Not Done | Nx workspace structure |
| Installation guide | ❌ Not Done | `npm install @showcase/ui` |
| Design token documentation | ❌ Not Done | Color, spacing, typography reference |
| Screenshots (Storybook UI) | ❌ Not Done | 2-3 key screens |
| MIT License | ❌ Not Done | Need LICENSE file |
| Loom video (2-3 min) | ❌ Not Done | Storybook walkthrough + patterns |

### README Structure

```markdown
# @showcase/ui — Angular Component Library

> 20 enterprise-grade, accessible components with Angular 21, Signals, and design tokens.

[Live Storybook](url) | [NPM Package](url)

## Screenshots
[Storybook overview, component examples]

## Components (20)
| Category | Components |
|----------|-----------|
| Layout | Container, Grid, Card, Divider |
| Navigation | Breadcrumbs, Tabs, Stepper |
| ...

## Design Tokens
Color, spacing, typography, shadows, transitions

## Getting Started
Prerequisites, install, usage example

## Development
pnpm storybook, pnpm test, pnpm build

## Author
Jayampathy Wijesena — links
```

---

## Component Patterns

### Component Template

```typescript
@Component({
  selector: 'ui-[name]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-[name]',
    '[class]': 'hostClasses()',
  },
  template: `...`,
  styleUrl: './[name].component.scss',
})
export class [Name]Component {
  // Signal inputs
  readonly variant = input<Variant>('default');
  readonly size = input<Size>('md');

  // Two-way binding
  readonly value = model<string>('');

  // Outputs
  readonly changed = output<void>();

  // Computed for derived state
  protected readonly hostClasses = computed(() =>
    `ui-[name]--${this.variant()} ui-[name]--${this.size()}`
  );
}
```

### SCSS Template

```scss
:host {
  display: inline-flex;
  color: var(--ui-color-text);
  background: var(--ui-color-surface);
  border-radius: var(--ui-radius-md);
  transition: var(--ui-transition-colors);
}

// Variant modifiers via host class
:host(.ui-[name]--primary) {
  background: var(--ui-color-primary);
  color: var(--ui-color-on-primary);
}
```

### Test Template

```typescript
@Component({
  standalone: true,
  imports: [NameComponent],
  template: `<ui-name [variant]="variant()">Content</ui-name>`,
})
class TestHostComponent {
  readonly variant = signal<Variant>('default');
}

describe('NameComponent', () => {
  // TestBed setup, signal-based testing
});
```

### Story Template (CSF3)

```typescript
const meta: Meta<NameComponent> = {
  title: 'Category/Name',
  component: NameComponent,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: [...] } },
};

export const Default: Story = { args: { variant: 'default' } };
export const AllVariants: Story = { render: () => ({ template: `...` }) };
```

---

## Testing Strategy

### What to Test

1. **Component creation** — renders without errors
2. **Input binding** — signal inputs reflect in DOM
3. **Variant classes** — host classes change with inputs
4. **Events** — output() emissions on user actions
5. **Accessibility** — ARIA attributes present
6. **Edge cases** — empty content, disabled state

### What to Skip

- Visual regression testing (Storybook handles this)
- Complex interaction sequences (Storybook A11y addon)
- Animation timing

---

## Verification Checklist

- [x] `pnpm install` — dependencies install
- [x] `pnpm storybook` — Storybook runs at localhost:4400
- [x] All 20 components appear in Storybook sidebar
- [x] Light/dark theme switcher works
- [x] Viewport switcher works (mobile/tablet/desktop)
- [x] `pnpm build` — library builds (FESM2022 + types)
- [x] `pnpm build-storybook` — static build succeeds
- [x] `pnpm test` — all tests pass
- [ ] Avatar component fully implemented (not placeholder)
- [ ] Skeleton component fully implemented (not placeholder)
- [ ] Coverage thresholds set and met (70%+)
- [ ] Git repo initialized with clean history
- [ ] Deployed to Vercel/Chromatic with live URL
- [ ] Professional README with badges and screenshots
- [ ] MIT License added
- [ ] Loom video recorded (2-3 minutes)

---

## Estimated Remaining Work

| Task | Effort |
|------|--------|
| Complete Avatar component | 2-3 hours |
| Complete Skeleton component | 2-3 hours |
| Git init + GitHub repo | 30 min |
| Custom README | 1-2 hours |
| Vercel deployment | 30 min |
| Coverage verification | 1 hour |
| Screenshots | 30 min |
| Loom video | 1 hour |
| **Total** | **~8-10 hours** |

---

## NPM Scripts

```bash
pnpm start              # Serve demo app
pnpm build              # Build library (dist/libs/ui/)
pnpm build:demo         # Build demo app
pnpm test               # Run all tests
pnpm test:ui            # Run library tests only
pnpm lint               # ESLint + Prettier check
pnpm storybook          # Storybook dev server (localhost:4400)
pnpm build-storybook    # Static Storybook build (dist/storybook/ui/)
```

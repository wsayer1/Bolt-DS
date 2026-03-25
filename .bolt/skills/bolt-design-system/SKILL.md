---
name: bolt-design-system
description: Design system defining UI styles, typography, colors, spacing, and components. Use when building features, styling components, ensuring visual consistency, writing frontend code.
---

# Bolt

The user has activated a design system. This skill represents the documentation for that design system.

Always follow these instructions for building user interfaces.

Every interface you create must faithfully reflect the design system's visual language and conventions.

Frontend work should produce visually striking, intentional designs not generic AI slop.

Use the existing design system faithfully, and apply it with creative ambition.

Every aesthetic choice should be purposeful and contextually appropriate. Add visual richness where it serves the interface, not for its own sake.

Match implementation complexity to the aesthetic vision. Maximalist designs need more elaborate code with motion and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Always use components from design system's packages instead of building your own. Do not use any standard components if there is a component in the design system for it. For instance, always use the <Image> component over <img> if the design system has it. This applies to all the design system components.

When adding images and visuals to pages do not use stock photos. Use the image-generation tools to generate custom tailored visuals that are consistent with the design system's conventions and style.

Always use design system tokens, theme values, and utility classes for all styling instead of hardcoded raw values. This applies to:

- components
- icons
- logos
- tokens
- flags
- illustrations
- patterns
- utilities
- hooks
- demos
- charts
- layouts
- pictograms
- foundations
- iconography
- typography
- spacing
- breakpoints
- depth
- borders
- motion
- shadows
- guidelines
- content
- brand
- component guidelines
- style guidelines
- principles
- accessibility
- usage
- products
- writing
- localization
- theming
- templates
- data-visualization
- ai
- voice-and-tone
- images
- guides

For all of these things consult the design system and make the best possible decisions in line with the instructions and spirit of the design system.

If you are scaffolding a new project and the design system has a fully-fledged CLI (e.g. `npx shadcn@latest init`), you can use the CLI to initialize the project in some cases rather than manually setting everything up, even if it overwrites some of the existing files. Check the design system's documentation pages below for CLI usage details. Only do this if there are good reasons (user wants to modify core theme of design system, user wants to initialize design system with specific parameters or a specific theme, and the CLI can do this nicely).

Only use raw values as a last resort when no suitable design token exists. Always consult the General Documentation below for available tokens, variables, and utilities before writing any styles.

You should only read 2 components in a single tool call when reading the docs. Reading any more than this will overload the context window. When using jq and trying to read the docs of components you should only read up to 2.

Do all your reads of collections and components using jq.

Do not use -head argument when using jq when reading contents, read the whole content or docs of whatever collection you are trying to read.

You have access to a schema.json file at **SKILL_DIR**/schema.json. This file contains general documentation pages and documentation collections that you must reference as you are building with the design system.

# Pages

---

The pages below are markdown representations of general design system documentation and guidelines.

See the following pages below for the condensed versions of each page.

When building if you need more information about a page, you can access the full content from the schema.json file using jq. Do this if you need more information about a specific page.

## getting-started

# Getting Started — Bolt Design System

Package: `@blitz/design-system`. React 18/19 peer deps required.

## Setup (4 steps)

1. Import stylesheets at app root:

```ts
import "@blitz/design-system/tokens/unocss/theme.css";
import "@blitz/design-system/icons.css";
```

2. Configure UnoCSS:

```ts
// uno.config.ts
import { unoThemeColors } from "@blitz/design-system/tokens/unocss/theme";
export default defineConfig({
  theme: { colors: { "bolt-ds": unoThemeColors } },
});
```

3. Wrap app with provider:

```tsx
import { BoltDesignSystemProvider } from "@blitz/design-system";
<BoltDesignSystemProvider>{/* app */}</BoltDesignSystemProvider>;
```

4. Set theme on root element: `<html data-theme="light">` or `<html data-theme="dark">`

## Usage

```tsx
import { Button, Input } from '@blitz/design-system';
<Button variant="primary">Submit</Button>
<div className="bg-bolt-ds-surface text-bolt-ds-textPrimary">...</div>
```

## Components (16)

**Atoms:** Alert, Avatar, Badge, Button, Checkbox, DefaultLoader, Dropdown, IconDecoration, Input, Select, Switch, Tooltip
**Organisms:** Dialog, OptionCard, OptionCardGroup, Table

Note: UnoCSS required (not Tailwind) for component classes to work. BoltDesignSystemProvider required for tooltips.

## foundations--colors

# Foundations — Colors

Inspired by Material Design 3. All tokens: `--bolt-ds-*`. UnoCSS utilities: `bg-bolt-ds-<token>`, `text-bolt-ds-<token>`.

Theme: `data-theme="light"` or `data-theme="dark"` on root element.

## Token naming pattern

- `<color>` — primary color
- `<color>Highlight` — lighter/hover variant
- `on<Color>` — text on primary color
- `<color>Container` — background container
- `on<Color>Container` — text on container
- `<color>Outline` — transparent border

## All 46 semantic tokens (light / dark)

**Brand:** brand `#2ba6ff`/`#1488fc`, brandHighlight `#53c4ff`/`#2ba6ff`, onBrand `#fff`/`#eef9ff`, brandContainer `#eef9ff`/`#2ba6ff1a`, onBrandContainer `#122f59`/`#2ba6ff`, brandOutline `#2ba6ff33`/`#2ba6ff1a`

**Surface:** surface `#fefeff`/`#111114`, surfaceAltLight `#f3f3f8`/`#1e1e21`, surfaceAltDark `#f3f3f8`/`#111114`, surfaceOne `#fefeff`/`#1e1e21`, surfaceTwo `#e9e9f0`/`#2c2c30`, surfaceThree `#d4d4dd`/`#2c2c30`, surfaceHighlight `#0000000d`/`#ffffff14`, inverseSurface `#1e1e21`/`#fefeff`, inverseOnSurface `#fefeff`/`#1e1e21`

**Text & Icons:** textPrimary `#111114`/`#fefeff`, textSecondary `#0a0a0abf`/`#ffffffbf`, textTertiary `#0a0a0a99`/`#ffffff99`, iconPrimary `#111114`/`#fefeff`, iconSecondary `#0a0a0a80`/`#ffffff80`

**Borders:** borderOutline `#0000001a`/`#ffffff1a`, borderDivider `#00000026`/`#ffffff26`

**Success:** success `#22c55e`/`#16a34a`, successHighlight `#4ade80`/`#22c55e`, onSuccess `#f0fdf4`/`#f0fdf4`, successContainer `#f0fdf4`/`#22c55e1a`, onSuccessContainer `#052e16`/`#22c55e`, successOutline `#22c55e33`/`#22c55e1a`

**Warning:** warning `#f97316`/`#ea580c`, warningHighlight `#fb923c`/`#f97316`, onWarning `#fff7ed`/`#fff7ed`, warningContainer `#fff7ed`/`#f973161a`, onWarningContainer `#431407`/`#f97316`, warningOutline `#f9731633`/`#f973161a`

**Danger:** danger `#ef4444`/`#ef4444`, dangerHighlight `#f87171`/`#f87171`, onDanger `#fef2f2`/`#fef2f2`, dangerContainer `#fef2f2`/`#ef44441a`, onDangerContainer `#450a0a`/`#f87171`, dangerOutline `#ef444433`/`#ef44441a`

**Neutral:** neutral `#525258`/`#3c3c41`, neutralHighlight `#a3a3ac`/`#73737b`, onNeutral `#fefeff`/`#f3f3f8`, neutralContainer `#fafafd`/`#1e1e21`, onNeutralContainer `#111114`/`#a3a3ac`, neutralOutline `#1111141a`/`#ffffff0d`

## foundations--copywriting

# Foundations — Copywriting

## Brand personality

Empowering, Confident, Direct, Warm, Inclusive. NOT hype-driven, robotic, or overly cute.

## Key rules

- Use **sentence case** everywhere (not title case). Exceptions: proper nouns (Bolt, GitHub), acronyms (API, URL), branded features
- Address users as **"you"**. Use "we" only for company-level communications, not product UI
- **Lead with action/outcome**, be specific, keep it short, write for scanning
- Use **active voice**, avoid double negatives, one thought per message

## Buttons/CTAs

- Verb-first, sentence case, 1-3 words: "Get started", "Save changes", "Delete project"
- No periods or exclamation marks
- Sign in/Sign up (not Log in/Register)

## Errors: what happened + next step

- "Couldn't deploy. Check your build logs."
- Not: "Something went wrong."

## Empty states: headline + optional context + CTA

- "No projects yet" → "Start building something." → [Create project]

## Punctuation

- No period on single-sentence UI strings; periods when 2+ sentences
- Oxford comma; em dash (—) not hyphen; ellipsis for truncation only

## Terminology

Project (not app), Deploy (not ship), Token (not credit), Agent (not model/LLM), Sign in/up (not Log in/Register)

## foundations--icons

# Foundations — Icons

## Prebuilt icons (import `@blitz/design-system/icons.css`)

5 bundled icons available as CSS classes:

- `i-bolt:check` — checkmark
- `i-bolt:chevron-down` — chevron down
- `i-bolt:chevron-up` — chevron up
- `i-bolt:minus` — minus/dash
- `i-svg-spinners:90-ring-with-bg` — animated loading spinner

Usage: `<span className="i-bolt:check text-bolt-ds-success w-4 h-4" />`

## Dynamic icons (UnoCSS preset)

Components use `i-ph:*` (Phosphor) and `i-heroicons:*` (Heroicons) via UnoCSS preset-icons.

Install icon data: `npm install @iconify-json/ph @iconify-json/heroicons`

Configure:

```ts
import { presetIcons } from "unocss";
// uno.config.ts presets: [presetIcons()]
```

Color via `text-*` class, size via `w-*/h-*` utilities.

## foundations--spacing

# Spacing

4px base unit. Use UnoCSS utility classes.

| Class | Value |
| ----- | ----- | ------- | --- | ----- | --- | ----- | --- | ----- | ---- | ----- | ---- | ----- | ---- | ----- | ---- | ----- | ---- | ------ | ---- | ------ | ---- | ------ | ---- |
| `p-0` | 0px   | `p-0.5` | 2px | `p-1` | 4px | `p-2` | 8px | `p-3` | 12px | `p-4` | 16px | `p-5` | 20px | `p-6` | 24px | `p-8` | 32px | `p-10` | 40px | `p-12` | 48px | `p-16` | 64px |

## Component Sizes

| Size | Height | Padding   |
| ---- | ------ | --------- |
| `sm` | 32px   | 8px 12px  |
| `md` | 40px   | 12px 16px |
| `lg` | 48px   | 16px 20px |

## theming

# Theming

Two themes: **light** and **dark**. Default: **dark**.

## Switching

```html
<html data-theme="dark">
  <!-- or "light" -->
</html>
```

```ts
document.documentElement.setAttribute("data-theme", "light");
```

## UnoCSS Config

```ts
export default defineConfig({
  theme: { colors: unoThemeColors },
  dark: {
    light: '[data-theme="light"]',
    dark: '[data-theme="dark"]',
  },
});
```

## CSS Structure

- Light: `:root, :root[data-theme='light'] { ... }`
- Dark: `.dark, :root[data-theme='dark'] { ... }`
- Tokens prefixed: `--bolt-ds-*`
- Import: `import '@blitz/design-system/tokens/unocss/theme.css'`

## Customizing Colors

```css
:root[data-theme="dark"] {
  --bolt-ds-brand: 120 80 255; /* RGB triplet, no rgb() wrapper */
}
```

## Key Token Values (Dark / Light)

- `--bolt-ds-brand`: `20 136 252` / `43 166 255`
- `--bolt-ds-surface`: `17 17 20` / `254 254 255`
- `--bolt-ds-textPrimary`: `254 254 255` / `17 17 20`
- `--bolt-ds-surfaceOne`: `30 30 33` / `254 254 255`

## components--overview

# Components Overview

Package: `@blitz/design-system`. 16 React components on Radix UI + UnoCSS.

## Setup

```ts
import "@blitz/design-system/tokens/unocss/theme.css";
import "@blitz/design-system/icons.css";
```

```tsx
import {
  BoltDesignSystemProvider,
  Button,
  Input,
  Alert,
  Dialog,
  Table,
  OptionCard,
} from "@blitz/design-system";
import * as Tooltip from "@blitz/design-system";

// Wrap app with provider (required for tooltips):
<BoltDesignSystemProvider>{/* app */}</BoltDesignSystemProvider>;
```

## Components

**Atoms**: Alert, Avatar, Badge, Button, Checkbox, DefaultLoader, Dropdown, IconDecoration, Input, Select, Switch, Tooltip

**Organisms**: Dialog (+ DialogHeader, DialogContent, DialogActions, DialogButton, DialogClose, DialogImageHeader, HiddenDialogTitle), OptionCard (+ OptionCardGroup), Table (+ TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell)

## Icons

Bundled: `i-bolt:check`, `i-bolt:chevron-down`, `i-bolt:chevron-up`, `i-bolt:minus`, `i-svg-spinners:90-ring-with-bg`. Other icons via UnoCSS icon preset (Phosphor: `i-ph:*`).

## components--atoms

# Components - Atoms

All imported from `@blitz/design-system`.

## Alert

`type`: `'neutral'|'info'|'success'|'warning'|'danger'`. Props: `title`, `children`, `actions`, `alignActions`, `direction`, `onClose`, `className`.

## Avatar

`size`: `'xxs'|'xs'|'sm'|'md'|'lg'|'xl'|'2xl'`. `type`: `'circle'|'rounded'`. `fallback`: `'icon'|'initials'`. `user`: `{name?, avatar?}`.

## Badge

`type`: `'neutral'|'brand'|'success'|'warning'|'danger'`. `icon`: UnoCSS icon class (circular icon badge).

## Button

`variant`: `'primary'|'secondary'|'tint'|'ghost'|'high-contrast'|'link-gray'|'link-color'`. `size`: `'lg'|'md'|'sm'|'xs'`. `tint`: `'brand'|'success'|'warning'|'danger'`. `startIcon`, `endIcon`, `icon`: UnoCSS icon classes. `loading`, `disabled`, `asChild`, `tooltip`.

## Checkbox

Extends Radix Checkbox. `onChange: (checked: CheckedState) => void`. `CheckedState = boolean | 'indeterminate'`.

## Dropdown

`trigger`: ReactNode or render function. `Dropdown.Item`: `onClick`, `disabled`, `className`. `open`, `onOpenChange`, `contentProps`.

## IconDecoration

`icon`: required UnoCSS class. `variant`: `'default'|'brand'|'success'|'warning'|'danger'|'neutral'`. `size`: `'xs'|'sm'|'md'|'lg'|'xl'`. `shape`: `'rounded'|'squircle'|'circle'`.

## Input

`label`, `placeholder`, `variant`: `'vertical'|'horizontal'`, `size`: `'md'|'sm'`, `error`, `warning`, `hint`, `onValueChange`, `labelTooltip`, `disabled`.

## Select

`options`: `{value, label, labelDetails?}[]`. `value`, `onValueChange`, `label`, `labelPosition`: `'top'|'side'`, `placeholder`, `helper`, `error`, `size`: `'xl'|'lg'|'md'`, `loading`.

## Switch

Radix Switch. `checked`, `onCheckedChange`, `size`: `'sm'|'md'`, `disabled`.

## Tooltip

Namespace export: `import * as Tooltip from '@blitz/design-system'`. Use `Provider > Root > Trigger + Content`. `Content` props: `side`, `align`, `sideOffset`, `hideArrow`, `maxWidth`, `surface`.

## Skeleton

Work In Progress. Not yet exported from package. Do not use until available.

## components--organisms

# Components - Organisms

All imported from `@blitz/design-system`.

## Dialog

Composed modal. Sub-components: `DialogHeader`, `DialogContent`, `DialogActions`, `DialogButton`, `DialogClose`, `DialogImageHeader`, `HiddenDialogTitle`.

**Dialog**: `open` (required), `onClose`, `showCloseButton`, `closeOnBackdropClick`, `closeOnEscape`, `width`, `height`, `maxWidth`, `maxHeight`, `modal`, `portalContainer`, `unstyled`.

**DialogHeader**: `title`, `description`, `badge` (BadgeType), `badgeIcon` (UnoCSS icon), `onBack`, `noBorder`, `unstyled`.

**DialogImageHeader**: `src` (required), `title`, `description`.

**DialogContent**: `children` (required), `noPadding`, `unstyled`, `className`.

**DialogActions**: `children` (required), `orientation`: `'horizontal'|'vertical'`, `actionSize`: `'compact'|'fullwidth'`.

**DialogButton**: Same props as Button.

**HiddenDialogTitle**: Accessibility-only title for screen readers when DialogHeader is not used.

```tsx
<Dialog open={open} onClose={onClose} showCloseButton closeOnBackdropClick>
  <DialogHeader title="Title" badge="danger" />
  <DialogContent>Body</DialogContent>
  <DialogActions>
    <DialogButton onClick={onClose}>OK</DialogButton>
  </DialogActions>
</Dialog>
```

## Table

Semantic HTML table wrapper. Sub-components: `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`.

**Table**: Extends `HTMLTableElement` attrs. `containerClassName` for outer div.

All sub-components are styled HTML wrappers with `className` support.

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Col</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## OptionCard

Card for settings/choices with title, description, and action element. Use `OptionCardGroup` to wrap multiple cards with dividers.

**OptionCard**: `title` (required), `action` (required, ReactNode), `description`, `id`, `className`.

**OptionCardGroup**: `children` (required), `className`. Adds `divide-y divide-bolt-ds-borderDivider`.

```tsx
<OptionCardGroup>
  <OptionCard
    title="Notifications"
    description="Receive emails"
    action={<Switch />}
  />
  <OptionCard title="Dark Mode" action={<Switch />} />
</OptionCardGroup>
```

# Collections

---

Collections below are meant to be larger sets of data for the design system that can't be easily copied like icons, illustrations, and components.

## Accessing Collections

This schema has a collections key containing design system collections. Use jq scripts to query it.

## Collections Structure

The collections below show the first 5 items (with `docs` replaced with `<...>`).
Your jq queries MUST abide by this structure for them to work.

You can search the collections using jq, and then get the full docs once you've searched them. The best way to search is by filtering the collections using the name and keywords.

```json
{
  "components": {
    "description": "React UI components built on Radix UI primitives with UnoCSS styling",
    "items": [
      {
        "name": "Button",
        "docs": "<...>",
        "keywords": ["button", "cta", "action", "submit", "interactive"]
      },
      {
        "name": "Input",
        "docs": "<...>",
        "keywords": ["input", "text", "field", "form", "textfield"]
      },
      {
        "name": "Checkbox",
        "docs": "<...>",
        "keywords": ["checkbox", "toggle", "check", "form", "selection"]
      },
      {
        "name": "Select",
        "docs": "<...>",
        "keywords": ["select", "dropdown", "picker", "form", "option"]
      },
      {
        "name": "Switch",
        "docs": "<...>",
        "keywords": ["switch", "toggle", "on-off", "boolean", "setting"]
      },
      "...11 more"
    ]
  },
  "tokens": {
    "description": "Semantic design tokens (CSS custom properties) with light and dark theme values",
    "items": [
      {
        "name": "bolt-ds-brand",
        "docs": "<...>",
        "keywords": ["brand", "primary", "accent"]
      },
      {
        "name": "bolt-ds-brandHighlight",
        "docs": "<...>",
        "keywords": ["brand", "highlight", "hover"]
      },
      {
        "name": "bolt-ds-onBrand",
        "docs": "<...>",
        "keywords": ["brand", "on", "text"]
      },
      {
        "name": "bolt-ds-brandContainer",
        "docs": "<...>",
        "keywords": ["brand", "container", "background"]
      },
      {
        "name": "bolt-ds-onBrandContainer",
        "docs": "<...>",
        "keywords": ["brand", "container", "text"]
      },
      "...41 more"
    ]
  },
  "icons": {
    "description": "Pre-built icon classes bundled in icons.css for use as UnoCSS utility classes",
    "items": [
      {
        "name": "i-bolt:check",
        "keywords": ["check", "tick", "done", "confirm"]
      },
      {
        "name": "i-bolt:chevron-down",
        "keywords": ["chevron", "down", "arrow", "expand"]
      },
      {
        "name": "i-bolt:chevron-up",
        "keywords": ["chevron", "up", "arrow", "collapse"]
      },
      {
        "name": "i-bolt:minus",
        "keywords": ["minus", "subtract", "remove", "indeterminate"]
      },
      {
        "name": "i-svg-spinners:90-ring-with-bg",
        "keywords": ["spinner", "loading", "ring", "animate"]
      }
    ]
  },
  "utilities": {
    "description": "Helper functions and constants exported from the design system",
    "items": [
      {
        "name": "classNames",
        "docs": "<...>",
        "keywords": ["classnames", "css", "utility", "conditional"]
      },
      {
        "name": "cubicEasingFn",
        "docs": "<...>",
        "keywords": ["easing", "animation", "cubic", "motion"]
      },
      {
        "name": "TOAST_SELECTORS",
        "docs": "<...>",
        "keywords": ["toast", "selector", "notification", "toastify"]
      },
      {
        "name": "BoltDesignSystemProvider",
        "docs": "<...>",
        "keywords": ["provider", "context", "tooltip", "wrapper"]
      }
    ]
  }
}
```

## Collections Index

First 200 item names in each collection:

components (16): Button, Input, Checkbox, Select, Switch, Alert, Avatar, Badge, Dropdown, IconDecoration, Tooltip, Dialog, Table, DefaultLoader, OptionCard, OptionCardGroup
tokens (46): bolt-ds-brand, bolt-ds-brandHighlight, bolt-ds-onBrand, bolt-ds-brandContainer, bolt-ds-onBrandContainer, bolt-ds-brandOutline, bolt-ds-surface, bolt-ds-surfaceAltLight, bolt-ds-surfaceAltDark, bolt-ds-surfaceOne, bolt-ds-surfaceTwo, bolt-ds-surfaceThree, bolt-ds-surfaceHighlight, bolt-ds-inverseSurface, bolt-ds-inverseOnSurface, bolt-ds-textPrimary, bolt-ds-textSecondary, bolt-ds-textTertiary, bolt-ds-iconPrimary, bolt-ds-iconSecondary, bolt-ds-borderOutline, bolt-ds-borderDivider, bolt-ds-success, bolt-ds-successHighlight, bolt-ds-onSuccess, bolt-ds-successContainer, bolt-ds-onSuccessContainer, bolt-ds-successOutline, bolt-ds-warning, bolt-ds-warningHighlight, bolt-ds-onWarning, bolt-ds-warningContainer, bolt-ds-onWarningContainer, bolt-ds-warningOutline, bolt-ds-danger, bolt-ds-dangerHighlight, bolt-ds-onDanger, bolt-ds-dangerContainer, bolt-ds-onDangerContainer, bolt-ds-dangerOutline, bolt-ds-neutral, bolt-ds-neutralHighlight, bolt-ds-onNeutral, bolt-ds-neutralContainer, bolt-ds-onNeutralContainer, bolt-ds-neutralOutline
icons (5): i-bolt:check, i-bolt:chevron-down, i-bolt:chevron-up, i-bolt:minus, i-svg-spinners:90-ring-with-bg
utilities (4): classNames, cubicEasingFn, TOAST_SELECTORS, BoltDesignSystemProvider

# Verification Loop

---

After the application builds successfully and you have completed all initial code changes, execute this verification cycle:

### 1. Analyze

- Use the browser-testing skill to check your work visually.
- Use browser tools to inspect your rendered output
- Reflect on the code you have written
- Be sure before taking screenshots with browser tools you sleep for a second or two in the script to give stock images time to load.
- Compare against:
- User's original instructions
- Design system specifications (if provided)
- Reference screenshots (if provided)
- Check for visual regressions and incorrect component/token usage in code
- Be sure that design system tokens and utility classes were used instead of using custom inline css. Always prefer design system utility classes and variables over custom styles.

### 2. Identify Discrepancies

With meticulous attention to detail, generate a list of any inconsistencies between your output and the source requirements. Be thorough, small details matter.

### 3. Implement Fixes

Fix each identified discrepancy.

### 4. Re-analyze

Inspect the updated output. If discrepancies remain, repeat steps 2-3.

### 5. Exit Condition

End your turn only when no discrepancies remain between your output and the source requirements.

# Reminder

Always use components from design system's packages instead of building your own. Do not use any standard components if there is a component in the design system for it. For instance always use the <Image> component over <img> if the design system has it. This applies to all the design system components.

Always use design system tokens, theme values, and utility classes for all styling instead of hardcoded raw values.

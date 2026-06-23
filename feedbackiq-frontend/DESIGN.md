---
name: FeedbackIQ
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#becabc'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#899487'
  outline-variant: '#3f493f'
  surface-tint: '#7fda92'
  primary: '#ffffff'
  on-primary: '#003917'
  primary-container: '#9af7ac'
  on-primary-container: '#0e7438'
  inverse-primary: '#006d32'
  secondary: '#ccbeff'
  on-secondary: '#341d7a'
  secondary-container: '#4b3792'
  on-secondary-container: '#bba9ff'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9af7ac'
  primary-fixed-dim: '#7fda92'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005224'
  secondary-fixed: '#e7deff'
  secondary-fixed-dim: '#ccbeff'
  on-secondary-fixed: '#1e0060'
  on-secondary-fixed-variant: '#4b3792'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  unit: 8px
---

## Brand & Style

The design system is engineered for a premium intelligence platform that transforms raw data into visionary insights. The brand personality is **analytical, professional, and sophisticated**, moving away from standard marketing tropes toward a "discovery tool" aesthetic that feels both immersive and high-tech.

The visual style is a fusion of **Corporate Modern** and **Glassmorphism**. It utilizes a deep, "ink-black" foundation to create a sense of infinite depth, contrasted with vibrant, luminous accents that signify AI-driven "sparks" of intelligence. Key brand elements include:
- **Atmospheric Depth:** Large-scale background blurs and flowing line motifs that mimic data streams.
- **Glassmorphic Overlays:** Functional containers use semi-transparent backdrops to maintain a sense of layered information.
- **Precision Typography:** High-contrast weights communicate hierarchy with mathematical clarity.

## Colors

The palette is anchored in a true dark mode experience, utilizing deep charcoals and pure blacks to minimize eye strain during intense analytical sessions.

- **Primary (Mint Green):** Used for critical actions, success states, and primary data trends. It represents growth and clarity.
- **Secondary (Lavender):** Used for secondary data sets, highlights, and interactive accents. It provides a sophisticated counterpoint to the primary mint.
- **Neutral/Surface:** The background is a solid `#0A0A0A`. Surface layers use `#1A1A1A` with subtle borders to create definition without breaking the immersive dark theme.
- **Data Visualization:** Beyond the primary and secondary colors, use desaturated variants of these hues to create complex charts that remain legible against the dark background.

## Typography

This design system uses **Plus Jakarta Sans** for headlines to provide a modern, slightly geometric warmth, while **Inter** is used for body text and UI labels to ensure maximum legibility within complex data environments.

Hierarchy is established through extreme weight contrast—pairing Bold or ExtraBold headlines with Regular weight body text. For data-heavy views, use the `label-sm` style for table headers and small metadata, utilizing its wide letter-spacing and uppercase styling to distinguish it from narrative content.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy with generous internal padding to create an "airy" feel despite the dark theme.

- **Desktop (1440px+):** 12-column grid, 24px gutters, 64px side margins.
- **Tablet (768px - 1439px):** 8-column grid, 20px gutters, 32px side margins.
- **Mobile (<767px):** 4-column grid, 16px gutters, 20px side margins.

Spacing follows an 8px base unit. Component-to-component spacing should lean towards larger values (32px, 48px, 64px) to emphasize the premium, spacious nature of the platform, while internal card padding remains tighter (24px) for data density.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Subtle Glassmorphism**.

1.  **Level 0 (Background):** `#0A0A0A`. The base for all content.
2.  **Level 1 (Cards/Sections):** Semi-transparent surfaces (e.g., `rgba(26, 26, 26, 0.6)`) with a `20px` backdrop blur.
3.  **Level 2 (Modals/Popovers):** Higher opacity (80%) with a subtle `1px` inner border in a low-opacity white (`rgba(255, 255, 255, 0.1)`) to simulate a glass edge.

Shadows are avoided in favor of light-based depth. Use "Ambient Glows"—soft, large-radius blurs of the primary or secondary colors—behind key modules to make them feel as if they are radiating intelligence.

## Shapes

The shape language focuses on **"Soft Fluidity."** While the grid is structured, the containers are noticeably rounded to feel approachable and organic.

- **Standard Elements:** 0.5rem (8px) for buttons and inputs.
- **Large Containers/Cards:** Use `rounded-2xl` (1rem) or `rounded-3xl` (1.5rem) to echo the reference visual style.
- **Visual Accents:** Data bars and progress indicators should use fully rounded (pill) caps to maintain the fluid aesthetic.

## Components

- **Buttons:** Primary buttons use the Mint Green background with black text. Secondary buttons use a transparent background with a Lavender border. All buttons utilize a subtle hover transition where the background glow intensifies.
- **Cards:** The hallmark of this system. Cards must have a 1px border (`rgba(255, 255, 255, 0.08)`) and use backdrop blurs. Titles within cards are always `headline-md`.
- **Inputs:** Dark field backgrounds (`#121212`) with a subtle Mint focus ring. Labels sit above the field in `label-sm`.
- **Chips/Badges:** Used for status or categories. These use low-opacity fills of the primary/secondary colors with high-contrast text labels.
- **Data Visualizations:** All charts must use "soft" edges (rounded corners on bars, smoothed lines on line charts). Use the primary mint and lavender as the two highest-priority data points.
- **Flowing Line Motifs:** Decorative elements should consist of thin, varying-opacity strokes that move diagonally across the background, reinforcing the "discovery" and "pathway" narrative.

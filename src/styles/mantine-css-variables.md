# Mantine CSS Variables Reference

## Colors

### Theme Colors

```css
var(--mantine-color-blue-filled)     /* Primary blue */
var(--mantine-color-red-filled)      /* Red */
var(--mantine-color-green-filled)    /* Green */
var(--mantine-color-yellow-filled)   /* Yellow */
var(--mantine-color-gray-filled)     /* Gray */
```

### Text Colors

```css
var(--mantine-color-text)            /* Primary text color */
var(--mantine-color-dimmed)          /* Muted/secondary text */
var(--mantine-color-bright)          /* Bright text (light mode only) */
```

### Background Colors

```css
var(--mantine-color-body)            /* Page background */
var(--mantine-color-default)         /* Component default background */
var(--mantine-color-default-hover)   /* Hover state background */
var(--mantine-color-default-border)  /* Default border color */
```

### Specific Shades (0-9, 0=lightest, 9=darkest)

```css
var(--mantine-color-blue-0)
var(--mantine-color-blue-1)
var(--mantine-color-blue-2)
var(--mantine-color-blue-3)
var(--mantine-color-blue-4)
var(--mantine-color-blue-5)
var(--mantine-color-blue-6)          /* Default shade */
var(--mantine-color-blue-7)
var(--mantine-color-blue-8)
var(--mantine-color-blue-9)
```

Available colors: `blue`, `red`, `green`, `yellow`, `gray`, `pink`, `grape`, `violet`, `indigo`, `cyan`, `teal`, `lime`, `orange`

## Spacing

```css
var(--mantine-spacing-xs)            /* 0.625rem / 10px */
var(--mantine-spacing-sm)            /* 0.75rem / 12px */
var(--mantine-spacing-md)            /* 1rem / 16px */
var(--mantine-spacing-lg)            /* 1.25rem / 20px */
var(--mantine-spacing-xl)            /* 1.5rem / 24px */
```

## Border Radius

```css
var(--mantine-radius-xs)             /* 0.125rem / 2px */
var(--mantine-radius-sm)             /* 0.25rem / 4px */
var(--mantine-radius-md)             /* 0.5rem / 8px */
var(--mantine-radius-lg)             /* 1rem / 16px */
var(--mantine-radius-xl)             /* 2rem / 32px */
var(--mantine-radius-default)        /* Theme default radius */
```

## Font

```css
var(--mantine-font-family)           /* Default font family */
var(--mantine-font-family-monospace) /* Monospace font */
var(--mantine-font-size-xs)          /* 0.75rem / 12px */
var(--mantine-font-size-sm)          /* 0.875rem / 14px */
var(--mantine-font-size-md)          /* 1rem / 16px */
var(--mantine-font-size-lg)          /* 1.125rem / 18px */
var(--mantine-font-size-xl)          /* 1.25rem / 20px */
```

## Line Height

```css
var(--mantine-line-height)           /* 1.55 */
var(--mantine-line-height-xs)        /* 1.4 */
var(--mantine-line-height-sm)        /* 1.45 */
var(--mantine-line-height-md)        /* 1.55 */
var(--mantine-line-height-lg)        /* 1.6 */
var(--mantine-line-height-xl)        /* 1.65 */
```

## Shadows

```css
var(--mantine-shadow-xs)
var(--mantine-shadow-sm)
var(--mantine-shadow-md)
var(--mantine-shadow-lg)
var(--mantine-shadow-xl)
```

## Breakpoints (for reference, use in media queries)

```css
/* xs: 36em / 576px */
/* sm: 48em / 768px */
/* md: 62em / 992px */
/* lg: 75em / 1200px */
/* xl: 88em / 1408px */
```

## Usage Examples

### Basic styling

```less
.my-component {
	background: var(--mantine-color-default);
	color: var(--mantine-color-text);
	padding: var(--mantine-spacing-md);
	border-radius: var(--mantine-radius-md);
	font-family: var(--mantine-font-family);
}
```

### Hover states

```less
.my-button {
	background: var(--mantine-color-blue-6);
	color: var(--mantine-color-white);

	&:hover {
		background: var(--mantine-color-blue-7);
	}
}
```

### Dark mode aware

```less
.my-card {
	/* Automatically adapts to light/dark mode */
	background: var(--mantine-color-default);
	border: 1px solid var(--mantine-color-default-border);
	color: var(--mantine-color-text);
}
```

## Resources

- [Mantine Theming Docs](https://mantine.dev/theming/theme-object/)
- [Mantine Colors](https://mantine.dev/theming/colors/)
- Inspect with DevTools to see all available CSS variables on `:root`

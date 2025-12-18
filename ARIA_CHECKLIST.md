# ARIA Accessibility Checklist

## Golden Rules 🏆

1. **Use semantic HTML first** - Don't add ARIA if HTML does the job
2. **No ARIA is better than bad ARIA** - Wrong ARIA confuses screen readers
3. **Test with keyboard** - Tab, Enter, Escape, Arrow keys should work
4. **One job per element** - Don't mix roles (e.g., button + link)

---

## Buttons & Interactive Elements

### Icon-only Buttons

```jsx
// ✅ Always add label when no visible text
<button aria-label="Close modal">×</button>
<button aria-label="Delete item"><TrashIcon /></button>
```

### Toggle Buttons (Show/Hide)

```jsx
<button aria-expanded={isOpen} aria-controls="menu-content">
	Menu
</button>
```

### Disabled State

```jsx
// aria-disabled is better for forms (keeps focusable)
<button aria-disabled={isProcessing}>Submit</button>
```

---

## Forms & Inputs

### Label Everything

```jsx
// Method 1: Explicit label
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Method 2: aria-label (no visible label)
<input aria-label="Search" type="search" />

// Method 3: aria-labelledby (complex labels)
<span id="price-label">Price</span>
<input aria-labelledby="price-label" />
```

### Error Messages

```jsx
<input
	aria-invalid={hasError}
	aria-describedby={hasError ? 'error-msg' : undefined}
/>;
{
	hasError && (
		<span id="error-msg" role="alert">
			{error}
		</span>
	);
}
```

### Required Fields

```jsx
<input aria-required="true" />
// Or use HTML5
<input required />
```

---

## Navigation

### Current Page

```jsx
<NavLink to="/home" aria-current={isActive ? 'page' : undefined}>
	Home
</NavLink>
```

### Skip Links

```jsx
// First interactive element on page
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<main id="main-content">...</main>
```

### Breadcrumbs

```jsx
<nav aria-label="Breadcrumb">
	<ol>
		<li>
			<a href="/">Home</a>
		</li>
		<li aria-current="page">Current Page</li>
	</ol>
</nav>
```

---

## Dynamic Content

### Loading States

```jsx
// Polite - waits for user to finish
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? 'Loading...' : content}
</div>

// Assertive - interrupts immediately (use sparingly)
<div aria-live="assertive" role="alert">
  Error: Failed to save
</div>
```

### Status Messages

```jsx
// Success/error notifications
<div role="status" aria-live="polite">
  Item added to cart
</div>

<div role="alert" aria-live="assertive">
  Payment failed!
</div>
```

---

## Modals & Dialogs

### Modal Pattern

```jsx
<div
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialog-title"
	aria-describedby="dialog-description"
>
	<h2 id="dialog-title">Confirm Delete</h2>
	<p id="dialog-description">This action cannot be undone.</p>
	<button>Cancel</button>
	<button>Delete</button>
</div>

// Remember:
// - Focus first element on open
// - Trap focus inside modal
// - Restore focus on close
// - Close on Escape key
```

---

## Lists & Menus

### Navigation Menu

```jsx
<nav aria-label="Main navigation">
	<ul role="list">
		<li>
			<a href="/">Home</a>
		</li>
	</ul>
</nav>
```

### Dropdown Menu

```jsx
<button
  aria-haspopup="menu"
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
>
  Options
</button>

<ul id="dropdown-menu" role="menu">
  <li role="menuitem"><button>Edit</button></li>
  <li role="menuitem"><button>Delete</button></li>
</ul>
```

---

## Images & Media

### Decorative Images

```jsx
// Empty alt for decorative images
<img src="decoration.png" alt="" />
// Or use aria-hidden
<img src="decoration.png" aria-hidden="true" />
```

### Meaningful Images

```jsx
<img src="chart.png" alt="Sales increased 40% in Q4" />
```

### Icon Fonts

```jsx
// Hide from screen readers
<i className="icon-star" aria-hidden="true"></i>
<span className="sr-only">Favorite</span>
```

---

## Landmarks & Regions

### Use Semantic HTML

```jsx
// These have implicit ARIA roles
<header>      // role="banner"
<nav>         // role="navigation"
<main>        // role="main"
<aside>       // role="complementary"
<footer>      // role="contentinfo"
<section>     // role="region"
```

### Multiple Instances Need Labels

```jsx
// Multiple navs need distinguishing labels
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>

<section aria-labelledby="news-heading">
  <h2 id="news-heading">Latest News</h2>
</section>
```

---

## Tabs Pattern

```jsx
<div role="tablist" aria-label="Content sections">
  <button
    role="tab"
    aria-selected={activeTab === 'tab1'}
    aria-controls="panel1"
    id="tab1"
  >
    Tab 1
  </button>
</div>

<div
  role="tabpanel"
  id="panel1"
  aria-labelledby="tab1"
  hidden={activeTab !== 'tab1'}
>
  Content
</div>

// Keyboard: Arrow keys to navigate tabs
```

---

## Hide Content

### Visually Hide (Screen readers can read)

```css
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}
```

### Hide from Screen Readers

```jsx
// Visual only
<div aria-hidden="true">
	<Icon />
</div>
```

---

## Quick Reference Chart

| Element Type     | Common ARIA Needed                   |
| ---------------- | ------------------------------------ |
| Icon button      | `aria-label`                         |
| Toggle button    | `aria-expanded`                      |
| Input field      | `aria-label` or `htmlFor`            |
| Error message    | `aria-invalid`, `aria-describedby`   |
| Loading content  | `aria-live`, `aria-busy`             |
| Current nav link | `aria-current="page"`                |
| Modal            | `role="dialog"`, `aria-modal="true"` |
| Decorative image | `alt=""` or `aria-hidden="true"`     |

---

## Keyboard Shortcuts to Test

- **Tab** - Navigate forward
- **Shift + Tab** - Navigate backward
- **Enter** - Activate button/link
- **Space** - Activate button/checkbox
- **Escape** - Close modal/dropdown
- **Arrow keys** - Navigate lists/menus/tabs

---

## Testing Tools

### Browser Extensions

- **axe DevTools** - Automatic accessibility testing
- **WAVE** - Visual accessibility checker
- **ANDI** - Quick accessibility inspector

### Manual Testing

```bash
# Test with keyboard only (no mouse)
# Test with screen reader:
# - Mac: VoiceOver (Cmd+F5)
# - Windows: NVDA (free) or JAWS
```

---

## Resources

- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [MDN ARIA Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WebAIM Articles](https://webaim.org/articles/)

---

## Your Component Checklist ✅

Before marking component "done":

- [ ] Can I navigate with keyboard only?
- [ ] Do icon buttons have labels?
- [ ] Are form inputs labeled?
- [ ] Do error messages announce to screen readers?
- [ ] Is focus visible?
- [ ] Are loading states announced?
- [ ] Does current page show in navigation?
- [ ] Are modals keyboard-trapped and escapable?

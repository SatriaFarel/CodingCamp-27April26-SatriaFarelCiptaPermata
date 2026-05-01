---
inclusion: fileMatch
fileMatchPattern: ['**/*.html', '**/*.css', '**/*.js', '**/*.md']
---

# Expense Tracker Steering Guide

## Project Overview
A modern Expense & Budget Visualizer application with blue theme, supporting dark/light mode and comprehensive personal finance management features.

## Core Features
1. **Modern Blue Theme** - Primary blue color with variations for optimal contrast
2. **Dark/Light Mode** - Automatically adapts to system preferences
3. **Custom Categories** - Add custom categories with color selection
4. **Transaction Sorting** - Sort by amount and category
5. **Spending Limit Highlight** - Mark transactions exceeding limits
6. **Responsive Design** - Optimized for all devices
7. **Chart Visualization** - Pie chart for spending visualization

## Architecture Patterns
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Data Persistence**: Local Storage for client-side data persistence
- **State Management**: Centralized data store with event-driven UI updates
- **Component Structure**: Modular, reusable UI components

## Code Style Guidelines

### HTML Structure
- Use semantic HTML5 elements
- Maintain clean, well-commented markup
- Follow accessibility standards (ARIA labels where needed)
- Use data attributes for JavaScript hooks (e.g., `data-category`, `data-amount`)

### CSS Conventions
- Use CSS Custom Properties (variables) for theming
- Follow BEM naming convention for complex components
- Mobile-first responsive design approach
- Use flexbox/grid for layouts
- Maintain consistent spacing system (4px base unit)

### JavaScript Patterns
- Use ES6+ features (const/let, arrow functions, template literals)
- Implement modular architecture with clear separation of concerns
- Use event delegation for dynamic elements
- Implement proper error handling with user-friendly messages
- Follow functional programming principles where applicable

## Implementation Details

### Spending Limit Highlight Feature
1. Check global spending limit (if set)
2. Check per-category limits (if set)
3. Mark exceeding transactions with CSS class `over-limit`
4. Provide clear visual feedback (transparent red background)

### Color Scheme
- Primary: Blue (#3498db)
- Secondary: Blue variations (#2980b9, #1abc9c)
- Accent: Red (#e74c3c) with 0.1 opacity for highlights
- Text: Dark gray (#2c3e50) for light mode, light gray (#ecf0f1) for dark mode
- Background: White (#ffffff) for light mode, dark blue (#1a1a2e) for dark mode

### Styling Implementation
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2980b9;
  --accent-color: #e74c3c;
  --text-color: #2c3e50;
  --bg-color: #ffffff;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.dark-mode {
  --text-color: #ecf0f1;
  --bg-color: #1a1a2e;
}

.over-limit {
  background-color: rgba(231, 76, 60, 0.1);
  border-left: 4px solid var(--accent-color);
}
```

### JavaScript Best Practices
- Validate all user inputs before processing
- Implement debouncing for search/filter operations
- Use localStorage with error handling (quota exceeded, disabled)
- Update UI efficiently using DOM fragments or requestAnimationFrame
- Implement data validation and sanitization

### Testing Requirements
- [ ] Dark/light mode toggle functionality
- [ ] Custom category creation and management
- [ ] Transaction sorting (amount, category, date)
- [ ] Spending limit highlighting works correctly
- [ ] Responsive across all screen sizes
- [ ] Charts update with new data
- [ ] Form validation and error handling
- [ ] Local storage persistence
- [ ] Accessibility compliance (keyboard navigation, screen readers)

### Performance Considerations
- Minimize DOM manipulations
- Use event delegation for dynamic content
- Implement lazy loading for charts if needed
- Optimize localStorage operations (batch updates)
- Ensure smooth animations (60fps)

### Accessibility Requirements
- Proper contrast ratios (WCAG AA compliance)
- Keyboard navigation support
- Screen reader compatibility
- Focus management for modal/dialog components
- ARIA labels for interactive elements
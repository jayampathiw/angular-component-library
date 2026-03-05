import type { DecoratorFunction } from 'storybook/internal/types';

/**
 * Decorator that applies the selected theme (light/dark/auto) from the
 * Storybook toolbar to the story wrapper via `data-theme` attribute.
 */
export const withTheme: DecoratorFunction = (story, context) => {
  const theme = context.globals['theme'] ?? 'light';

  // Apply to document root for CSS custom properties
  if (typeof document !== 'undefined') {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  return story();
};

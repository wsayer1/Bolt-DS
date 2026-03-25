import { defineConfig, presetUno, presetWind } from 'unocss';
import { presetIcons } from 'unocss/preset-icons';
import { unoThemeColors } from '@blitz/design-system/tokens/unocss/theme';

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|vine\.ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
        /.*@blitz\/design-system\/.*/,
      ],
    },
  },
  presets: [presetUno(), presetWind(), presetIcons()],
  theme: {
    colors: {
      bolt: {
        ds: unoThemeColors,
      },
    },
  },
  dark: {
    light: '[data-theme="light"]',
    dark: '[data-theme="dark"]',
  },
});

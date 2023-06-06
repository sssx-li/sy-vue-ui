import { PKG_NAME, PKG_PREFIX } from '@sy-vue-ui/build-constants';

import type { Plugin } from 'rollup';

export function SyVueUIAlias(): Plugin {
  const themeChalk = 'theme-chalk';
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const;
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const;

  return {
    name: 'sy-vue-ui-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return;
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      };
    },
  };
}

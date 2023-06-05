import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..', '..');

export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const themeRoot = resolve(pkgRoot, 'theme-chalk');
export const syRoot = resolve(pkgRoot, 'sy-vue-ui');
export const utilRoot = resolve(pkgRoot, 'utils');

export const buildOutput = resolve(projRoot, 'dist');
export const syOutput = resolve(buildOutput, 'sy-vue-ui');

export const buildRoot = resolve(projRoot, 'internal', 'build');

export const syPackage = resolve(syRoot, 'package.json');

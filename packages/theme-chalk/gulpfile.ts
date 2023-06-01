import path from "path";
import chalk from "chalk";
import consola from "consola";

import { dest, parallel, series, src } from "gulp";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import { syRoot } from "@sy-vue-ui/build-utils";

import dartSass from "sass";

const distFolder = path.resolve(__dirname, "dist");
const distBundle = path.resolve(syRoot, "theme-chalk");

// 样式编译、压缩、重命名
function buildThemeChalk() {
  const sass = gulpSass(dartSass);
  const nosyPrefixFile = /(index)/;
  return src(path.resolve(__dirname, "src/*.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
        );
      })
    )
    .pipe(
      rename((path) => {
        if (!nosyPrefixFile.test(path.basename)) {
          path.basename = `sy-${path.basename}`;
        }
      })
    )
    .pipe(dest(distFolder));
}

// 打包样式拷贝 packages/theme-chalk/dist ---> dist/sy-vue-ui/theme-chalk
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
}

// 样式资源拷贝 dist/sy-vue-ui/theme-chalk/src
export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, "src/**")).pipe(
    dest(path.resolve(distBundle, "src"))
  );
}

export const build = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, copyThemeChalkBundle)
) as any;

export default build;

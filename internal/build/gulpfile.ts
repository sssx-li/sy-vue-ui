import { parallel, series } from "gulp";
import { mkdir, copyFile } from "fs/promises";
import path from "path";
import { copy } from "fs-extra";
import type { TaskFunction } from "gulp";

import {
  buildOutput,
  syOutput,
  syPackage,
  syRoot,
} from "@sy-vue-ui/build-utils";

import { buildConfig, run, runTask, withTaskName } from "./src";
import type { Module } from "./src";

export const copyFiles = () =>
  Promise.all([
    copyFile(syPackage, path.join(syOutput, "package.json")),
    // copyFile(
    //   path.resolve(projRoot, "README.md"),
    //   path.resolve(syOutput, "README.md")
    // ),
    // copyFile(
    //   path.resolve(projRoot, "global.d.ts"),
    //   path.resolve(syOutput, "global.d.ts")
    // ),
  ]);

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, "types", "packages");
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path)
    );

  return parallel(copyTypes("esm"), copyTypes("cjs"))(done);
};

export const copyFullFiles = () => Promise.all([copy(syOutput, syRoot)]);

const buildTasks = series(
  withTaskName("clean", () => run("pnpm run clean")),
  withTaskName("createOutput", () => mkdir(syOutput, { recursive: true })),
  parallel(runTask("generateTypesDefinitions")),
  parallel(copyTypesDefinitions, copyFiles),
  copyFullFiles,
  withTaskName("build:theme", () => run("pnpm run build:theme"))
) as any;

export default buildTasks;

export * from "./src";

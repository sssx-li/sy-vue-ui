import { buildRoot } from "@sy-vue-ui/build-utils";
import { run } from "./run";

export const withTaskName = <T extends Record<string, any>>(
  name: string,
  fn: T
) => Object.assign(fn, { displayName: name });

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  );

import type { Plugin, App } from "vue";

export type SFCWithInstall<T> = T & Plugin;

// 组件注册 --- 按需引入
export const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app): void => {
    app.component(
      (comp as Record<string, any>).name,
      comp as SFCWithInstall<T>
    );
  };
  return comp as SFCWithInstall<T>;
};

// 批量注册组件 --- 全量引入
export const makeInstaller = (components: Plugin[] = []) => {
  return {
    install: (app: App) => {
      components.forEach((c) => {
        return app.use(c);
      });
    },
  };
};

// GlobalComponents for Volar
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SyButton: typeof import("sy-vue-ui")["SyButton"];
  }
}

export {};

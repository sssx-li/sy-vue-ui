/// <reference types="vite/client" />

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void;
  }
}

export {};

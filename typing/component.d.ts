// GlobalComponents for Volar
import * as components from "../packages/components";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SyButton: (typeof components)["SyButton"];
  }
}

export {};

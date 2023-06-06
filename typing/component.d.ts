// GlobalComponents for Volar
import * as components from '../packages/components/src';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SyButton: (typeof components)['SyButton'];
  }
}

export {};

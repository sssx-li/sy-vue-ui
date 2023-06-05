import type { ExtractPropTypes, PropType } from 'vue';

export type ButtonType = ['default', 'primary', 'success', 'warning', 'danger'];

export type ButtonSize = ['large', 'normal', 'small', 'mini'];

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType[number]>,
    default: 'default'
  },
  size: {
    type: String as PropType<ButtonSize[number]>,
    default: 'normal'
  }
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

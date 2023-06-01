import { withInstall } from "@sy-element-ui/utils";

import Button from "./src/button.vue";

export const SyButton = withInstall(Button);
export default SyButton;

export * from "./src/button";
export type { ButtonInstance } from "./src/instance";

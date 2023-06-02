<template>
  <button :class="[ns.b(), ns.m(props.type)]"><slot /></button>
</template>

<script setup lang="ts">
import { useNamespace } from "@sy-vue-ui/hooks";
import { buttonProps } from "./button";
defineOptions({
  name: "SyButton",
});
const props = defineProps(buttonProps);

const ns = useNamespace("button");
</script>

<style lang="scss" scoped></style>

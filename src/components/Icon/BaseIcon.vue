<script lang="ts">
import { defineComponent, PropType } from "vue";

import { mdiAccount } from "@mdi/js";
import { mdiClockTimeThree } from "@mdi/js";
import SvgIcon from "vue3-icon";

const ICONS = {
  user: mdiAccount,
  clock: mdiClockTimeThree,
};

const ICON_KEYS = Object.keys(ICONS);
type Icon = keyof typeof ICONS;

export default defineComponent({
  components: { SvgIcon },
  props: {
    name: {
      type: String as PropType<Icon>,
      required: true,
      validator: (value: Icon) => ICON_KEYS.includes(value),
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    path(): string {
      return ICONS[this.name];
    },
  },
});
</script>

<template>
  <svg-icon v-if="path" :path="path" :size="size" />
</template>

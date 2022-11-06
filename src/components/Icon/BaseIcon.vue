<template>
  <svg-icon v-if="path" :path="path" :size="size" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { mdiAccount } from "@mdi/js";
import { mdiClockTimeThree } from "@mdi/js";
import SvgIcon from "vue3-icon";

const ICONS: { [key: string]: string } = {
  user: mdiAccount,
  clock: mdiClockTimeThree,
};

const ICONS_KEYS = Object.keys(ICONS);

export default defineComponent({
  components: { SvgIcon },
  props: {
    name: {
      type: String,
      required: true,
      validator(value: string) {
        return ICONS_KEYS.includes(value);
      },
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

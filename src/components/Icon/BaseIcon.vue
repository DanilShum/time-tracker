<template>
  <svg-icon v-if="path" :path="path" />
</template>

<script>
import { defineComponent } from "vue";

import { mdiAccount } from "@mdi/js";
import SvgIcon from "vue3-icon";

export default defineComponent({
  components: { SvgIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      user: mdiAccount,
    };
  },
  computed: {
    path() {
      return this[this.name];
    },
  },
});
</script>

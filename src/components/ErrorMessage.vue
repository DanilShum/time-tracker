<template>
  <div class="error-message mt-2 mb-2">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorMessage",
  components: {},
  props: {
    text: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.error-message {
  color: $red;
}
</style>

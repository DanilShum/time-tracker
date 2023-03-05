<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorMessage",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
});
</script>
<template>
  <div class="mt-2 mb-2 text-red-600">
    {{ text }}
  </div>
</template>

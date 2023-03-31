<template>
  <transition name="base-modal">
    <div
      v-if="modelValue"
      class="flex-center fixed inset-0 z-1000 bg-black/20"
      @click.self="update(false)"
    >
      <div class="base-modal__content bg-white p-4">
        <slot name="content"> </slot>
        <slot name="footer">
          <base-button type="button" @click="update(false)">
            {{ $t("Cancel") }}
          </base-button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/button/BaseButton.vue";

export default defineComponent({
  name: "BaseModal",
  components: { BaseButton },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    update(value: boolean): void {
      this.$emit("update:modelValue", Boolean(value));
    },
  },
});
</script>

<style lang="scss">
.base-modal-enter,
.base-modal-leave-to {
  opacity: 0;

  .base-modal__content {
    transform: translate3d(0, 100%, 0);
  }
}
.base-modal-enter-active {
  transition: opacity 0.3s ease-in-out;

  .base-modal__content {
    transition: transform 0.3s ease-in-out;
  }
}
.base-modal-leave-active {
  transition: opacity 0.3s ease-in-out;

  .base-modal__content {
    transition: transform 0.3s ease-in-out;
  }
}
</style>

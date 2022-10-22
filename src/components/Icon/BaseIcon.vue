<template>
  <component
    :is="iconComponent"
    class="base-icon"
    :class="{
      'base-icon_default-color': !color,
      'base-icon_flip-x': flipX,
      'base-icon_flip-y': flipY,
    }"
    :style="{ color: color || null }"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    flipX: {
      type: Boolean,
      default: false,
    },
    flipY: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconComponent() {
      const file = `${this.name}.svg`;
      console.log(require(`@/assets/icons/${file}`));
      return require(`@/assets/icons/${file}`).default;
    },
  },
});
</script>

<style lang="scss">
.base-icon {
  flex-shrink: 0;

  &.base-icon_default-color {
    color: inherit;
  }

  &.base-icon_flip-x {
    transform: scaleX(-1);
  }

  &.base-icon_flip-y {
    transform: scaleY(-1);
  }
}
</style>

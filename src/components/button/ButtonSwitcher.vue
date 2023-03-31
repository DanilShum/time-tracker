<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Id } from "@/service/types";
import BaseButton, {
  Color,
  COLORS,
  COLOR_KEYS,
} from "@/components/button/BaseButton.vue";

export type Button = {
  id: Id;
  value: String | Number;
  active?: Boolean | String | Number;
};

export default defineComponent({
  name: "ButtonSwitcher",
  components: { BaseButton },
  props: {
    items: {
      type: Array as PropType<Button[]>,
      required: true,
    },
    active: {
      type: [String, Number],
      default: 0,
    },
    activeIds: {
      type: Array as PropType<Id[]>,
      default: () => [0],
    },
    color: {
      type: String as PropType<Color>,
      default: COLORS.gray,
      validator: (value: Color) => COLOR_KEYS.includes(value),
    },
  },
  computed: {
    buttons(): Button[] {
      return this.items.map((item) => {
        return {
          ...item,
          active:
            this.activeIds?.includes(item.id) ||
            this.active === item.id ||
            item.active,
        };
      });
    },
  },
});
</script>

<template>
  <div class="space-x-1 rounded-4 bg-gray-200/30 p-1">
    <base-button
      v-for="item in this.buttons"
      :key="item.id"
      :text="item.value"
      :color="color"
      :secondary="!item.active"
      :primary="Boolean(item.active)"
      @click="$emit('select', item)"
    />
  </div>
</template>

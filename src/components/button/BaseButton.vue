<script lang="ts">
import { defineComponent, PropType } from "vue";

const ROUTER_LINK = "router-link";

const BUTTON_TYPES = {
  button: "button",
  submit: "submit",
};

export const COLORS = {
  gray: "gray",
  blue: "blue",
  teal: "teal",
  red: "red",
};

const BUTTON_KEYS = Object.keys(BUTTON_TYPES);
export const COLOR_KEYS = Object.keys(COLORS);
type Type = keyof typeof BUTTON_TYPES;
export type Color = keyof typeof COLORS;

export default defineComponent({
  name: "BaseButton",
  props: {
    text: {
      type: [String, Number],
      default: "",
    },
    to: {
      type: [String, Object],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String as PropType<Type>,
      default: BUTTON_TYPES.button,
      validator: (value: Type) => BUTTON_KEYS.includes(value),
    },
    color: {
      type: String as PropType<Color>,
      default: COLORS.gray,
      validator: (value: Color) => COLOR_KEYS.includes(value),
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tag() {
      if (this.to) {
        return ROUTER_LINK;
      } else {
        return BUTTON_TYPES.button;
      }
    },
    classes() {
      return {
        "base-button_disabled": this.disabled,
        "h-8": this.small,
        "h-12 text-sm font-bold": this.large,
        "flex w-full": this.block,
        "base-button_icon": this.withIcon,
        "base-button_primary": this.primary,
        "base-button_secondary": this.secondary,
        [`base-button_${this.color}`]: true,
      };
    },
  },
});
</script>

<template>
  <component
    :is="tag"
    class="base-button relative box-border inline-flex h-10 max-w-full cursor-pointer select-none items-center justify-center rounded-4 border-0 text-center align-top text-sm leading-4 no-underline outline-0"
    :class="classes"
    :disabled="disabled"
    :type="buttonType"
    :to="to"
    v-bind="$attrs"
  >
    <slot name="left" />
    <span v-if="text || $slots.default">
      <slot>{{ text }}</slot>
    </span>
    <slot name="right" />
  </component>
</template>

<style lang="scss">
.base-button {
  font-family: $font-family;
  transition: color 150ms ease-in, background-color 150ms ease-in;

  &.base-button_disabled {
    pointer-events: none;
    opacity: 0.5;

    span {
      opacity: 0.7;
    }
  }

  &:not(.base-button_icon) {
    padding: 0 1.5em;
  }
}

@mixin secondary($color: $grey) {
  color: $color;
  background-color: rgba($color, 0.1);

  &:focus-visible {
    background-color: rgba($color, 0.2);
  }
  &:hover {
    background-color: rgba($color, 0.15);
  }
  &:active {
    background-color: rgba($color, 0.25);
  }
}
@mixin primary($color: $grey) {
  color: $white;
  background-color: $color;
  font-weight: $bold;

  &:focus-visible {
    background-color: darken($color, 10%);
  }

  &:hover {
    background-color: darken($color, 5%);
  }

  &:active {
    background-color: darken($color, 12.5%);
  }
}

.base-button_primary {
  &.base-button_gray {
    @include primary($grey);
  }

  &.base-button_blue {
    @include primary($blue);
  }

  &.base-button_red {
    @include primary($red);
  }

  &.base-button_teal {
    @include primary($teal);
  }
}
.base-button_secondary {
  &.base-button_gray {
    @include secondary($grey);
  }

  &.base-button_blue {
    @include secondary($blue);
  }

  &.base-button_red {
    @include secondary($red);
  }

  &.base-button_teal {
    @include secondary($teal);
  }
}
</style>

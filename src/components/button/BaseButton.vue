<template>
  <component
    :is="tag"
    class="base-button rounded-1"
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

<script lang="ts">
import { defineComponent, PropType } from "vue";

const ROUTER_LINK = "router-link";

const BUTTON_TYPES = {
  button: "button",
  submit: "submit",
};

const COLORS = {
  gray: "gray",
  blue: "blue",
  teal: "teal",
  red: "red",
};

const BUTTON_KEYS = Object.keys(BUTTON_TYPES);
const COLOR_KEYS = Object.keys(COLORS);
type Type = keyof typeof BUTTON_TYPES;
type Color = keyof typeof COLORS;

export default defineComponent({
  name: "BaseButton",
  props: {
    text: {
      type: String,
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
      validator: (value: Type) => COLOR_KEYS.includes(value),
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
        "base-button_small": this.small,
        "base-button_large": this.large,
        "base-button_block": this.block,
        "base-button_icon": this.withIcon,
        "base-button_primary": this.primary,
        "base-button_secondary": this.secondary,
        [`base-button_${this.color}`]: true,
      };
    },
  },
});
</script>

<style lang="scss">
.base-button {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  font-family: $font-family;
  text-align: center;
  font-size: 13px;
  height: 40px;
  border: 0;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  transition: color 150ms ease-in, background-color 150ms ease-in;
  user-select: none;
  span {
    line-height: 1.1;
  }

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
.base-button_block {
  display: flex;
  width: 100%;
}
.base-button_small {
  height: 30px;
}
.base-button_large {
  font-weight: $bold-large;
  font-size: 13px;
  height: 50px;
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

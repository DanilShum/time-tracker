<script lang="ts">
import { defineComponent, PropType } from "vue";

const TYPES = {
  text: "text",
  number: "number",
  tel: "tel",
  email: "email",
  password: "password",
  url: "url",
};

const TYPE_KEYS = Object.keys(TYPES);
type Type = keyof typeof TYPES;

export default defineComponent({
  name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    modelType: {
      type: String as PropType<Type>,
      default: "text",
      validator: (value: Type) => TYPE_KEYS.includes(value),
    },
    label: {
      type: String,
      default: "",
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasValue() {
      return this.modelValue !== "";
    },
  },
  methods: {
    input(value: String): void {
      this.$emit("update:modelValue", value);
    },
    change(value: String): void {
      this.$emit("change", value);
    },
  },
});
</script>

<template>
  <div
    class="base-input"
    :class="{
      'base-input_has-value': hasValue,
    }"
  >
    <fieldset
      class="base-input__fieldset relative m-0 box-border flex h-12 w-full appearance-none items-center rounded p-0"
    >
      <legend class="ml-2 h-0 opacity-0" v-if="label" v-text="label" />
      <label class="relative box-border flex h-full w-full min-w-0 cursor-text">
        <span
          v-if="label"
          class="base-input__label-text z-1 pointer-events-none absolute right-0 bottom-0 h-full max-w-full select-none truncate rounded"
          v-text="label"
        />
        <slot name="input">
          <input
            ref="input"
            :type="modelType"
            :value="modelValue"
            :readonly="readonly"
            :autofocus="autofocus"
            :disabled="disabled"
            v-bind="$attrs"
            class="base-input__field rounded"
            @input="input($event.target.value)"
            @change="change($event.target.value)"
          />
        </slot>
        <div class="base-input__value flex rounded">
          <slot name="value">
            <div v-text="modelValue" />
          </slot>
        </div>
      </label>
    </fieldset>
  </div>
</template>

<style lang="scss">
.base-input__fieldset {
  border: 1px solid transparent;
  background-color: rgba($grey, 0.05);
  transition: background-color 200ms ease-in;

  &:hover:not(:focus-within) {
    transition: background-color 50ms ease-in;
    background-color: rgba($grey, 0.04);
  }
  &:focus-within {
    transition: background-color 50ms ease-in;
    background-color: $white;
    border-color: $teal;
  }
}

.base-input__label-text {
  left: 14px;
  top: 15px;
  line-height: 14px;
  color: $base-grey;
  transform: translate3d(0, 0, 0) scale(1);
  transform-origin: 0 0;
  transition: transform 0.2s ease-in-out;

  .base-input:focus-within &,
  .base-input_has-value & {
    color: $base-grey;
    transform: translate3d(0, -50%, 0) scale(0.92);
  }
}

.base-input__value,
.base-input__field {
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  font: inherit;
  font-size: 13px;
  line-height: 16px;
}

.base-input__field {
  display: block;
  border: 0;
  outline: 0;
  margin: 0;
  background: none;
  appearance: none;
  opacity: 0;

  &:focus,
  &[type="password"] {
    opacity: 1;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /*
    Хаки для нормального отображения
    после автозаполнения
  */
  &:-webkit-autofill {
    transition: background-color 1ms 9999s;

    &:first-line {
      font-family: $font-family !important;
      font-size: 13px !important;
      color: $base-grey !important;
    }
  }
}
.base-input__value {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  pointer-events: none;
  align-items: center;

  & > * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.base-input__field:focus + .base-input__value,
.base-input__field[type="password"] + .base-input__value {
  opacity: 0;

  & * {
    pointer-events: none;
  }
}
</style>

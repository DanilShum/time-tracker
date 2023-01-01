<template>
  <div class="auth-wrapper">
    <header class="d-flex d-flex_a-center d-flex_j-between">
      <div class="auth-wrapper__logo d-flex d-flex_a-center">
        <base-icon name="clock" :size="52" />
        <p class="ml-2">TeamTime</p>
      </div>
      <div>
        <button
          v-for="lang in $i18n.availableLocales"
          :key="lang"
          @click="$setLocale(lang)"
        >
          {{ lang }}
        </button>
      </div>
    </header>

    <div class="auth-wrapper__inner d-flex d-flex_a-center d-flex_j-center">
      <div class="auth-wrapper__content d-flex d-flex_a-center">
        <form
          class="auth-wrapper__form"
          novalidate
          @submit.prevent.stop="$emit('submit')"
        >
          <header>
            <h1>
              {{ title }}
            </h1>
          </header>
          <div>
            <slot />
          </div>
          <footer class="mt-3">
            <div class="d-flex d-flex_j-end">
              <slot name="footer" />
              <base-button
                :text="submitText"
                button-type="submit"
                color="teal"
                primary
              />
            </div>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import BaseButton from "@/components/button/BaseButton.vue";

export default defineComponent({
  name: "AuthWrapper",
  components: { BaseButton, BaseIcon },
  props: {
    title: {
      type: String,
      default: "",
    },
    submitText: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClick() {
      console.log("click");
    },
  },
});
</script>

<style lang="scss">
.auth-wrapper {
  padding: 40px 60px;
  background: $sub-white;
  min-height: 100vh;
  box-sizing: border-box;
}
.auth-wrapper__form {
  width: 100%;
}
.auth-wrapper__inner {
  width: 100%;
  height: calc(100vh - 220px);
}
.auth-wrapper__content {
  width: 500px;
  padding: 40px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 9px 40px 3px rgb($teal, 0.1);
  background-color: $white;
}
.auth-wrapper__logo {
  color: $teal;
  p {
    font-size: 18px;
    font-weight: $medium;
    letter-spacing: 1.05px;
  }
}
</style>

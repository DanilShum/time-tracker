<template>
  <div class="auth-wrapper">
    <header class="auth-wrapper__header">
      <div class="auth-wrapper__logo">
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

    <div class="auth-wrapper__inner">
      <div class="auth-wrapper__content">
        <form
          class="auth-wrapper__form"
          novalidate
          @submit.prevent="$emit('submit')"
        >
          <header class="auth-wrapper__content-header">
            <h1 class="auth-wrapper__content-title">
              {{ title }}
            </h1>
          </header>
          <div>
            <slot />
          </div>
          <footer class="auth-wrapper__content-footer">
            <div class="auth-wrapper__footer-buttons">
              <slot name="footer" />
              <button v-text="'dfgdfgdf'" type="submit" />
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

export default defineComponent({
  name: "AuthWrapper",
  components: { BaseIcon },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  staticData: () => ({}),
  computed: {},
  methods: {},
});
</script>

<style lang="scss">
.auth-wrapper {
  padding: 40px 60px;
  background: $sub-white;
  min-height: 100vh;
  box-sizing: border-box;
}
.auth-wrapper__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.auth-wrapper__form {
  width: 100%;
}
.auth-wrapper__inner {
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-wrapper__content {
  width: 500px;
  display: flex;
  align-items: center;
  padding: 40px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 9px 40px 3px rgb($teal, 0.1);
  background-color: $white;
}
.auth-wrapper__logo {
  display: flex;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: $medium;
    letter-spacing: 1.05px;
  }
}
</style>

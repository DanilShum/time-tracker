<template>
  <auth-wrapper class="login-view" :title="$t('Login')">
    <button
      v-for="lang in $i18n.availableLocales"
      :key="lang"
      @click="$setLocale(lang)"
    >
      {{ lang }}
    </button>
  </auth-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";

export default defineComponent({
  name: "LoginView",
  components: { AuthWrapper },
});
</script>

<style lang="scss">
.login-view {
}
</style>

<template>
  <auth-wrapper class="login-view" :title="$t('Login')">
    <base-input
      class="mt-3"
      v-model="email"
      :label="$t('Email')"
      model-type="email"
    />
    <base-input
      class="mt-3"
      v-model="password"
      :label="$t('Password')"
      model-type="password"
    />
  </auth-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";
import BaseInput from "@/components/fields/BaseInput.vue";

export default defineComponent({
  name: "LoginView",
  components: { BaseInput, AuthWrapper },
  data: () => ({
    email: "",
    password: "",
  }),
});
</script>

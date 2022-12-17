<template>
  <auth-wrapper
    class="signup-view"
    :title="$t('SignUp')"
    :submit-text="$t('SignUp')"
    @submit="submit"
  >
    <template #footer>
      <base-button
        class="mr-2"
        :text="$t('Login')"
        secondary
        color="teal"
        :to="{ name: 'login' }"
      />
    </template>
  </auth-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";
import BaseButton from "@/components/button/BaseButton.vue";

export default defineComponent({
  name: "SignupView",
  components: { BaseButton, AuthWrapper },
  props: {},
  data: () => ({}),
  staticData: () => ({}),
  computed: {},
  methods: {
    submit() {
      console.log("SignUp");
    },
  },
});
</script>

<style lang="scss">
.signup-view {
}
</style>

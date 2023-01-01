<template>
  <auth-wrapper
    class="signup-view"
    :title="$t('SignUp')"
    :submit-text="$t('SignUp')"
    @submit="submit"
  >
    <base-input
      class="mt-3"
      v-model="email"
      :label="$t('Email')"
      model-type="email"
    />
    <error-message
      v-if="errorByType['email'].message"
      :text="errorByType['email'].message"
    />
    <base-input
      class="mt-3"
      v-model="password"
      :label="$t('Password')"
      model-type="password"
    />
    <error-message
      v-if="errorByType['password'].message"
      :text="errorByType['password'].message"
    />
    <base-input
      class="mt-3"
      v-model="confirmPassword"
      :label="$t('Confirm password')"
      model-type="password"
    />
    <error-message
      v-if="errorByType['confirmPassword'].message"
      :text="errorByType['confirmPassword'].message"
    />

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
import BaseInput from "@/components/fields/BaseInput.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import { useVuelidate } from "@vuelidate/core";
import { Validate } from "@/helpers/validate";

const VALIDATE_FIELDS = Object.freeze({
  email: "email",
  password: "password",
  confirmPassword: "confirmPassword",
});

export default defineComponent({
  name: "SignupView",
  components: { ErrorMessage, BaseInput, BaseButton, AuthWrapper },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({ email: "", password: "", confirmPassword: "" }),
  validations() {
    return {
      email: { required: Validate.required },
      password: {
        required: Validate.required,
        minLength: Validate.minLength(6),
      },
      confirmPassword: {
        sameAs: Validate.sameAs(this.password),
      },
    };
  },
  computed: {
    errors() {
      return Validate.getErrors(this.v$.$errors);
    },
    errorByType() {
      return Validate.getErrorByType(this.errors, VALIDATE_FIELDS);
    },
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();

      if (!result) {
        // notify user form is invalid
        return;
      }
      // perform async actions
    },
  },
});
</script>

<style lang="scss">
.signup-view {
}
</style>

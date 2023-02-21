<template>
  <auth-wrapper
    class="login-view"
    :title="$t('Login')"
    :submit-text="$t('Login')"
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

    <template #footer>
      <base-button
        class="mr-2"
        :text="$t('SignUp')"
        secondary
        color="teal"
        :to="{ name: 'registration' }"
      />
    </template>
  </auth-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";
import BaseInput from "@/components/fields/BaseInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { Validate } from "@/helpers/validate";
import ErrorMessage from "@/components/ErrorMessage.vue";
import BaseButton from "@/components/button/BaseButton.vue";

const VALIDATE_FIELDS = Object.freeze({
  email: "email",
  password: "password",
});

export default defineComponent({
  name: "LoginView",
  components: { BaseButton, ErrorMessage, BaseInput, AuthWrapper },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({ email: "", password: "" }),
  validations() {
    return {
      email: { required: Validate.required },
      password: {
        required: Validate.required,
        minLength: Validate.minLength(6),
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

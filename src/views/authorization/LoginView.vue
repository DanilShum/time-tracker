<template>
  <auth-wrapper class="login-view" :title="$t('Login')" @submit="submit">
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
  </auth-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";
import BaseInput from "@/components/fields/BaseInput.vue";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  VErrorObject,
  getEmptyErrors,
} from "@/helpers/validate";
import ErrorMessage from "@/components/ErrorMessage.vue";
import { keyBy } from "lodash-es";

const VALIDATE_FIELDS = Object.freeze({
  email: "email",
  password: "password",
});

export default defineComponent({
  name: "LoginView",
  components: { ErrorMessage, BaseInput, AuthWrapper },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({ email: "", password: "" }),
  validations() {
    return {
      email: { required: required },
      password: {
        required: required,
        minLength: minLength(6),
      },
    };
  },
  computed: {
    errors(): ErrorObject[] {
      return this.v$.$errors.map((error) => {
        return {
          ...error,
          message: String(error.$message),
        };
      });
    },
    errorByType(): VErrorObject {
      return {
        ...keyBy(getEmptyErrors(VALIDATE_FIELDS), "$property"),
        ...keyBy(this.errors, "$property"),
      };
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

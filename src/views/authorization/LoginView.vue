<template>
  <auth-wrapper
    class="login-view"
    :title="$t('Login')"
    :submit-text="$t('Login')"
    @submit="submit"
  >
    <base-input
      class="mt-3"
      v-model="state.email"
      :label="$t('Email')"
      model-type="email"
    />
    <error-message
      v-if="validate.errorByType['email'].message"
      :text="validate.errorByType['email'].message"
    />
    <base-input
      class="mt-3"
      v-model="state.password"
      :label="$t('Password')"
      model-type="password"
    />
    <error-message
      v-if="validate.errorByType['password'].message"
      :text="validate.errorByType['password'].message"
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
import { defineComponent, reactive } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";
import BaseInput from "@/components/fields/BaseInput.vue";
import { Validate, VRules } from "@/helpers/validate";
import ErrorMessage from "@/components/ErrorMessage.vue";
import BaseButton from "@/components/button/BaseButton.vue";

const RULES = {
  email: { required: VRules.required },
  password: {
    required: VRules.required,
    minLength: VRules.minLength(6),
  },
};

export default defineComponent({
  name: "LoginView",
  components: { BaseButton, ErrorMessage, BaseInput, AuthWrapper },
  setup() {
    const state = reactive({ email: "", password: "" });

    const validate = new Validate(RULES, state);
    return {
      state,
      validate,
    };
  },
  methods: {
    async submit() {
      const result = await this.validate.v$.$validate();
      if (!result) {
        // notify user form is invalid
        return;
      }
      // perform async actions
    },
  },
});
</script>

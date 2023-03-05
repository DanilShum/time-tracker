<script lang="ts">
import { defineComponent, reactive } from "vue";
import AuthWrapper from "@/views/authorization/AuthWrapper.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseInput from "@/components/fields/BaseInput.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import { Validate, VRules } from "@/helpers/validate";

const RULES = {
  email: { required: VRules.required },
  password: {
    required: VRules.required,
    minLength: VRules.minLength(6),
  },
  confirmPassword: {
    required: VRules.required,
    sameAs: VRules.sameAs("password", "confirmPassword"),
  },
};

export default defineComponent({
  name: "SignupView",
  components: { ErrorMessage, BaseInput, BaseButton, AuthWrapper },
  setup() {
    const state = reactive({ email: "", password: "", confirmPassword: "" });

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

<template>
  <auth-wrapper
    :title="$t('SignUp')"
    :submit-text="$t('SignUp')"
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
    <base-input
      class="mt-3"
      v-model="state.confirmPassword"
      :label="$t('Confirm password')"
      model-type="password"
    />
    <error-message
      v-if="validate.errorByType['confirmPassword'].message"
      :text="validate.errorByType['confirmPassword'].message"
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

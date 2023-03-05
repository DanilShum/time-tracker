import { i18n } from "@/helpers/i18n";
import * as validators from "@vuelidate/validators";
import { ErrorObject, useVuelidate, Validation } from "@vuelidate/core";
import { keyBy } from "lodash-es";
import { Ref } from "vue-demi";

const { createI18nMessage } = validators;
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

type VErrorFields = {
  readonly $property: string;
  readonly message: string;
};

type VErrorObject = {
  [key: string]: VErrorFields | ErrorObject;
};

export const VRules = {
  required: withI18nMessage(validators.required, {
    messagePath: (e) => e.$validator,
  }),
  minLength: withI18nMessage(validators.minLength, {
    withArguments: true,
    messagePath: (e) => e.$validator,
  }),
  sameAs: withI18nMessage(validators.sameAs, {
    withArguments: true,
    messagePath: (e) => e.$validator,
  }),
};

export class Validate<R, S extends Record<keyof R, any>> {
  private validate: Ref<Validation<R, R>>;
  state: S;

  constructor(rules: R, state: S) {
    this.state = state;
    this.validate = useVuelidate(rules, state);
  }

  get v$(): Validation<R, R> {
    return this.validate.value;
  }

  get $errors(): ErrorObject[] {
    return this.v$.$errors;
  }

  get emptyErrors(): VErrorFields[] {
    return this.fields.map((field): VErrorFields => {
      return {
        $property: field,
        message: "",
      };
    });
  }

  get fields(): string[] {
    return Object.keys(this.state);
  }

  get errors(): ErrorObject[] {
    return this.$errors.map((error) => {
      return {
        ...error,
        message: String(error.$message),
      };
    });
  }

  get errorByType(): VErrorObject {
    return {
      ...keyBy(this.emptyErrors, "$property"),
      ...keyBy(this.errors, "$property"),
    };
  }
}

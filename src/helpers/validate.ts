import { i18n } from "@/helpers/i18n";
import * as validators from "@vuelidate/validators";
import { ErrorObject } from "@vuelidate/core";

const { createI18nMessage } = validators;

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

export const required = withI18nMessage(validators.required, {
  messagePath: (e) => e.$validator,
});

export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
  messagePath: (e) => e.$validator,
});

export type VErrorObject = {
  readonly $property: string;
  readonly message: string;
};

export type ErrorByTypeObject = {
  [key: string]: VErrorObject | ErrorObject;
};

type Fields = {
  [key: string]: string;
};

interface IValidate {
  fields: Fields;
}

export class ValidateDecorator {
  emptyErrors: VErrorObject[];

  constructor({ fields }: IValidate) {
    this.emptyErrors = Object.values(fields).map((field): VErrorObject => {
      return {
        $property: field,
        message: "",
      };
    });
  }
}

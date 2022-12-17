import { i18n } from "@/helpers/i18n";
import * as validators from "@vuelidate/validators";
import { ErrorObject } from "@vuelidate/core";

const { createI18nMessage } = validators;
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

export type VErrorFields = {
  readonly $property: string;
  readonly message: string;
};

export type VErrorObject = {
  [key: string]: VErrorFields | ErrorObject;
};

type Fields = {
  [key: string]: string;
};

export const required = withI18nMessage(validators.required, {
  messagePath: (e) => e.$validator,
});

export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
  messagePath: (e) => e.$validator,
});

export const getEmptyErrors = (fields: Fields): VErrorFields[] =>
  Object.values(fields).map((field): VErrorFields => {
    return {
      $property: field,
      message: "",
    };
  });

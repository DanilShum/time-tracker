import { i18n } from "@/helpers/i18n";
import * as validators from "@vuelidate/validators";
import { ErrorObject } from "@vuelidate/core";
import { keyBy } from "lodash-es";

const { createI18nMessage } = validators;
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

type VErrorFields = {
  readonly $property: string;
  readonly message: string;
};

type VErrorObject = {
  [key: string]: VErrorFields | ErrorObject;
};

type Fields = {
  [key: string]: string;
};

export const Validate = {
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

  getEmptyErrors: (fields: Fields): VErrorFields[] =>
    Object.values(fields).map((field): VErrorFields => {
      return {
        $property: field,
        message: "",
      };
    }),

  getErrors: (errors: ErrorObject[]): ErrorObject[] => {
    return errors.map((error) => {
      return {
        ...error,
        message: String(error.$message),
      };
    });
  },

  getErrorByType(errors: ErrorObject[], fields: Fields): VErrorObject {
    return {
      ...keyBy(Validate.getEmptyErrors(fields), "$property"),
      ...keyBy(errors, "$property"),
    };
  },
};

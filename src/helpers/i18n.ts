import { createI18n, DefineLocaleMessage, I18n } from "vue-i18n";

type Lang = "en" | "ru";

const MAIN_LANG = "en";
const lang = localStorage.getItem("lang") || MAIN_LANG;

class Localization {
  i18n: I18n<{}, {}, {}, Lang, false>;

  constructor() {
    const { messages } = this.loadMessages();

    this.i18n = createI18n({
      messages,
      locale: lang,
      fallbackLocale: MAIN_LANG,
      legacy: false,
      globalInjection: true,
      pluralizationRules: {
        /**
         * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
         * @param choicesLength {number} an overall amount of available choices
         * @returns a final choice index to select plural word by
         */
        ru: function (choice, choicesLength) {
          // this === VueI18n instance, so the locale property also exists here

          if (choice === 0) {
            return 0;
          }

          const teen = choice > 10 && choice < 20;
          const endsWithOne = choice % 10 === 1;

          if (choicesLength < 4) {
            return !teen && endsWithOne ? 1 : 2;
          }
          if (!teen && endsWithOne) {
            return 1;
          }
          if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
            return 2;
          }

          return choicesLength < 4 ? 2 : 3;
        },
      },
    });
  }

  private loadMessages(): {
    messages: Record<Lang, DefineLocaleMessage>;
  } {
    const context = require.context("@/locales/", false, /\.yml$/);

    const rExp = /[a-z0-9-_]+/i;

    const messages = context
      .keys()
      .filter(Boolean)
      .map((key) => ({
        key,
        locale: key.match(rExp)?.[0] || "",
      }))
      .reduce(
        (messages, { key, locale }) => ({
          ...messages,
          [locale]: context(key).default,
        }),
        {}
      ) as Record<Lang, DefineLocaleMessage>;

    return { messages };
  }

  setLocale = (lang: Lang): void => {
    this.i18n.global.locale.value = lang;
    localStorage.setItem("lang", lang);
    document.getElementsByTagName("html")[0].lang = lang;
  };
}

export const { i18n, setLocale } = new Localization();

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $setLocale: (lang: Lang) => void;
  }
}

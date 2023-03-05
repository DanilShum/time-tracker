<script lang="ts">
import { defineComponent } from "vue";
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import BaseButton from "@/components/button/BaseButton.vue";

export default defineComponent({
  name: "AuthWrapper",
  components: { BaseButton, BaseIcon },
  props: {
    title: {
      type: String,
      default: "",
    },
    submitText: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClick() {
      console.log("click");
    },
  },
});
</script>

<template>
  <div class="box-border flex h-screen flex-col bg-slate-50 px-8 py-4">
    <header class="flex items-center justify-between">
      <div class="flex items-center text-teal-600">
        <base-icon name="clock" :size="52" />
        <p class="ml-2">TeamTime</p>
      </div>
      <div>
        <button
          v-for="lang in $i18n.availableLocales"
          :key="lang"
          @click="$setLocale(lang)"
        >
          {{ lang }}
        </button>
      </div>
    </header>

    <div class="flex-center h-full w-full">
      <div
        class="my-0 mx-auto flex w-500 items-center rounded-8 bg-white p-4 shadow-xl shadow-teal-600/10"
      >
        <form class="w-full" novalidate @submit.prevent.stop="$emit('submit')">
          <header>
            <h1>
              {{ title }}
            </h1>
          </header>
          <div>
            <slot />
          </div>
          <footer class="mt-2">
            <div class="flex justify-end">
              <slot name="footer" />
              <base-button
                :text="submitText"
                button-type="submit"
                color="teal"
                primary
              />
            </div>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

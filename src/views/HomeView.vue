<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <base-icon name="account" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import BaseIcon from "../components/Icon/BaseIcon.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    BaseIcon,
  },
});
</script>

<script>
import BaseIcon from "@/components/Icon/BaseIcon";
export default {
  name: "BaseMenu",
  components: { BaseIcon },
  data: (vm) => ({
    menuItems: [
      {
        name: vm.$t("Hours"),
        icon: "user",
        id: "calendar",
        to: { name: "calendar" },
      },
    ],
  }),
};
</script>

<template>
  <div
    class="relative box-border flex h-full w-16 min-w-16 max-w-16 flex-col items-center bg-teal-600"
  >
    <router-link
      class="m-o flex-center relative h-16 min-h-16 w-16 cursor-pointer bg-transparent p-0 text-white hover:bg-white/20"
      :class="{ 'bg-white/10': menu.id === $route.name }"
      v-for="menu in menuItems"
      :key="menu.id"
      :to="menu.to"
    >
      <base-icon :name="menu.icon" />
    </router-link>
  </div>
</template>

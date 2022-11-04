<template>
  <div class="base-menu">
    <router-link
      class="base-menu__item"
      :class="{ 'base-menu__item_active': menu.id === $route.name }"
      v-for="menu in menuItems"
      :key="menu.id"
      :to="menu.to"
    >
      <base-icon :name="menu.icon" />
    </router-link>
  </div>
</template>

<script>
import BaseIcon from "@/components/Icon/BaseIcon";
export default {
  name: "BaseMenu",
  components: { BaseIcon },
  data: () => ({
    menuItems: [
      {
        name: "Часы",
        icon: "user",
        id: "calendar",
        to: { name: "calendar" },
      },
    ],
  }),
};
</script>

<style lang="scss">
$size: 72px;

.base-menu {
  align-items: center;
  background-color: $teal;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: $size;
  min-width: $size;
  position: relative;
}
.base-menu__item {
  position: relative;
  cursor: pointer;
  min-height: $size;
  width: $size;
  height: $size;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: transparent;
  margin: 0;
  padding: 0;
  color: $white !important;

  a {
    min-height: $size;
    width: $size;
    height: $size;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &.base-menu__item_active,
  &:not(.menu__item_logo):hover {
    color: $white;
  }
}
</style>

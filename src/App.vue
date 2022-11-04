<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
}

html {
  height: 100vh;
  overflow: hidden;
}

body {
  background-color: $sub-white;
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

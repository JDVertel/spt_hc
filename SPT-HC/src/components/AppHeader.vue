<template>
  <AppNavBar @toggle-menu="toggleMenu"></AppNavBar>
  <AppMenu :isMenuOpen="isMenuOpen" @close-menu="closeMenu"></AppMenu>
  <AppLogin />
  <router-view></router-view>
</template>

<script>
import AppNavBar from "./AppNavBar.vue";
import AppMenu from "./AppMenu.vue";
import AppLogin from "./Sections/AppLogin.vue";

export default {
  components: {
    AppMenu,
    AppNavBar,
    AppLogin,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

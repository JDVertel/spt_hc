<template>
  <div :class="['offcanvas', { show: isMenuOpen }]" @click="closeMenu">
    <div class="offcanvas-content" @click.stop>
      <div class="logo-container">
        <i class="fa-solid fa-hospital-user icon"></i>
        <span class="logo-text">HISTORIA CLINICA</span>
      </div>
      <div class="menu-scroll-container">
        <ul class="menu-items">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :style="{ '--item-index': index }"
          >
            <router-link
              v-if="!item.action"
              :to="item.route"
              custom
              v-slot="{ navigate }"
            >
              <button
                @click="selectComponent(item.component, navigate, index)"
                class="menu-item-btn"
                :class="{
                  selected: isSelected(index),
                  'current-selected': isCurrentSelected(index),
                }"
              >
                <i :class="item.icon"></i>
                <span class="full-text">{{ item.text }}</span>
                <span class="abbr">{{ item.abbr }}</span>
              </button>
            </router-link>
            <button
              v-else
              @click="handleItemClick(item, index)"
              class="menu-item-btn"
              :class="{
                selected: isSelected(index),
                'current-selected': isCurrentSelected(index),
              }"
            >
              <i :class="item.icon"></i>
              <span class="full-text">{{ item.text }}</span>
              <span class="abbr">{{ item.abbr }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="sidebar-footer">
        <button class="footer-icon-btn">
          <i class="bi bi-gear"></i>
        </button>
        <button class="footer-icon-btn">
          <i class="bi bi-bell"></i>
        </button>
        <button class="footer-icon-btn">
          <i class="bi bi-question-circle"></i>
        </button>
        <button class="footer-icon-btn">
          <i class="bi bi-person"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { menuItems } from "../bd/bd.js";
import CierreHC from "./MenuItems/CierreHC.vue";

export default {
  components: {
    CierreHC,
  },
  name: "AppMenu",
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuItems: menuItems,
      selectedItems: [],
      currentSelectedIndex: null,
    };
  },
  mounted() {
    // Recuperar los ítems seleccionados del localStorage al montar el componente
    const savedSelectedItems = localStorage.getItem("selectedMenuItems");
    if (savedSelectedItems) {
      this.selectedItems = JSON.parse(savedSelectedItems);
    }
  },
  methods: {
    closeMenu() {
      this.$emit("close-menu");
    },
    selectComponent(componentName, navigate, index) {
      this.$emit("select-component", componentName);
      navigate();
      this.addSelectedItem(index);
      this.currentSelectedIndex = index;
      if (window.innerWidth <= 5000) {
        this.closeMenu();
      }
    },
    handleItemClick(item, index) {
      if (item.action === "openLoginModal") {
        const loginModal = new bootstrap.Modal(
          document.getElementById("login")
        );
        loginModal.show();
      }
      this.addSelectedItem(index);
      this.currentSelectedIndex = index;
      this.closeMenu();
    },
    addSelectedItem(index) {
      if (!this.selectedItems.includes(index)) {
        this.selectedItems.push(index);
        // Guardar los ítems seleccionados en localStorage
        localStorage.setItem(
          "selectedMenuItems",
          JSON.stringify(this.selectedItems)
        );
      }
    },
    isSelected(index) {
      return this.selectedItems.includes(index);
    },
    isCurrentSelected(index) {
      return this.currentSelectedIndex === index;
    },
  },
};
</script>

<style scoped>
.menu-item-btn.selected {
  color: #1ab89d;
  font-weight: bold;
}

.menu-item-btn.current-selected {
  color: #f0ad4e;
}
</style>

<template>
  <nav class="navbar">
    <div class="logo">My App</div>
    <div class="menu">
      <button class="menu-button" @click="toggleMenu">
        ☰ Menu
      </button>
      <div v-if="showMenu" class="dropdown">
        <router-link to="/">Home</router-link>
        <router-link to="/how-to-use">How to Use</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3490dc;
  padding: 1rem;
}

.logo {
  color: white;
  font-size: 1.5rem;
}

.menu {
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 2rem;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown a {
  display: block;
  padding: 0.5rem 1rem;
  color: #3490dc;
  text-decoration: none;
}

.dropdown a:hover {
  background-color: #f1f1f1;
}
</style>
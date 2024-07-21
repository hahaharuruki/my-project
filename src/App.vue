<template>
  <div id="app">
    <header>
      <div class="menu-button" @click="toggleMenu">
        ☰
      </div>
      <div class="dropdown-menu" v-if="isMenuOpen">
        <router-link to="/" @click="toggleMenu">Home</router-link>
        <router-link to="/how-to-use" @click="toggleMenu">How to Use</router-link>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f8ff; /* 非常に薄い淡い青色 */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  background-color: #3490dc;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-button {
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
flex-direction: column;
}

.dropdown-menu a {
color: #3490dc;
padding: 10px 20px;
text-decoration: none;
}

.dropdown-menu a:hover {
background-color: #f0f0f0;
}

main {
flex-grow: 1;
margin-top: 50px; /* ヘッダーの高さ分だけマージンを設定 */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.text-counter-container {
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
height: 100%;
overflow-y: auto;
}
</style>
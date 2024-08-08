<template>
    <div class="home-container">
      <h1 class="title">ツールのホームページ</h1>
      <p class="description">
        ここでは、以下のツールを利用できます：
      </p>
      <div class="tool-links">
        <router-link to="/text-counter" class="tool-link">
          文字数カウントツール
        </router-link>
        <router-link to="/word-search" class="tool-link">
          単語検索
        </router-link>
        <router-link to="/word-replace" class="tool-link">
          単語置換
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainHome'
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .tool-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .tool-link {
    padding: 10px 20px;
    font-size: 18px;
    color: #3490dc;
    text-decoration: none;
    border: 1px solid #3490dc;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .tool-link:hover {
    background-color: #3490dc;
    color: white;
  }
  </style>
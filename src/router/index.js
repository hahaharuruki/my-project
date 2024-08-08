// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import MainHome from '../views/MainHome.vue';
import TextCounter from '../views/TextCounter.vue';
import WordSearch from '../views/WordSearch.vue';
import WordReplace from '../views/WordReplace.vue';

const routes = [
  {
    path: '/',
    name: 'MainHome',
    component: MainHome,
    meta: {
      title: 'ツールのホームページ',
      description: 'ここでは、以下のツールを利用できます：',
      ogTitle: 'ツールのホームページ',
      ogDescription: 'ここでは、以下のツールを利用できます：',
      ogImage: '<%= BASE_URL %>og-image.png',
      ogUrl: 'https://yourwebsite.com'
    }
  },
  {
    path: '/text-counter',
    name: 'TextCounter',
    component: TextCounter,
    meta: {
      title: '文字数カウント - 高品質な文字数カウントサービス',
      description: '無料で利用できる文字数カウントツール。テキストの文字数、空白を除いた文字数、改行を除いた文字数を瞬時にカウントします。さらに、テキストファイルやWordファイルをアップロードして文字数をカウントすることもできます。',
      ogTitle: '文字数カウントツール - 高品質な文字数カウントサービス',
      ogDescription: '無料で利用できる文字数カウントツール。テキストの文字数、空白を除いた文字数、改行を除いた文字数を瞬時にカウントします。さらに、テキストファイルやWordファイルをアップロードして文字数をカウントすることもできます。',
      ogImage: '<%= BASE_URL %>og-image.png',
      ogUrl: 'https://yourwebsite.com/text-counter'
    }
  },
  {
    path: '/word-search',
    name: 'WordSearch',
    component: WordSearch,
    meta: {
      title: '単語検索 - 効率的なテキスト検索ツール',
      description: '単語検索ができる便利なツール。テキストボックスに入力された単語を検索します。テキストファイル、Wordファイル内の文字列も処理できます。',
      ogTitle: '単語検索 - 効率的なテキスト編集ツール',
      ogDescription: '単語検索ができる便利なツール。テキストボックスに入力された単語を検索します。テキストファイル、Wordファイル内の文字列も処理できます。',
      ogImage: '<%= BASE_URL %>og-image.png',
      ogUrl: 'https://yourwebsite.com/word-search'
    }
  },
  {
    path: '/word-replace',
    name: 'WordReplace',
    component: WordReplace,
    meta: {
      title: '単語置換 - 効率的なテキスト編集ツール',
      description: '単語置換ができる便利なツール。テキストボックスに入力された単語を指定された単語に置換します。テキストファイル、Wordファイル内の文字列も処理できます。',
      ogTitle: '単語置換 - 効率的なテキスト編集ツール',
      ogDescription: '単語置換ができる便利なツール。テキストボックスに入力された単語を指定された単語に置換します。テキストファイル、Wordファイル内の文字列も処理できます。',
      ogImage: '<%= BASE_URL %>og-image.png',
      ogUrl: 'https://yourwebsite.com/word-replace'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'デフォルトタイトル';
  const description = to.meta.description || 'デフォルトの説明';
  const ogTitle = to.meta.ogTitle || 'デフォルトのOGタイトル';
  const ogDescription = to.meta.ogDescription || 'デフォルトのOG説明';
  const ogImage = to.meta.ogImage || 'デフォルトのOGイメージ';
  const ogUrl = to.meta.ogUrl || window.location.href;

  document.querySelector('meta[name="description"]').setAttribute('content', description);
  document.querySelector('meta[property="og:title"]').setAttribute('content', ogTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', ogDescription);
  document.querySelector('meta[property="og:image"]').setAttribute('content', ogImage);
  document.querySelector('meta[property="og:url"]').setAttribute('content', ogUrl);
  next();
});

export default router;
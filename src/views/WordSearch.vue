<template>
    <div class="word-search-container">
      <!-- ヘッダー広告スペース -->
      <div ref="adsContainerTop" class="advertisement">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-4238806087366657"
             data-ad-slot="8291269275"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
  
      <div class="content-container" @dragover.prevent @drop.prevent="handleDrop">
        <h1 class="title">単語検索</h1>
        <p class="description">
          テキストボックスに入力された単語を検索します。検索する単語を入力して検索ボタンを押して検索できます。
          テキストファイル、Wordファイル内の文字列も処理できます。ファイルをドラッグ&ドロップか選択してください。
        </p>
        <div class="buttons-top">
          <button @click="pasteText" class="paste-button">ペースト</button>
          <button @click="clearText" class="clear-button">リセット</button>
          <button @click="addSearchQuery" :disabled="searchQueries.length >= 12" class="add-button">+</button>
          <button @click="highlightText" class="search-button">検索</button>
        </div>
        <div class="search-container">
          <div class="search-inputs">
            <div v-for="(query, index) in searchQueries" :key="index" class="search-input-container">
              <input v-model="searchQueries[index]" placeholder="検索する単語" class="search-input" />
              <button @click="removeSearchQuery(index)" v-if="searchQueries.length > 1" class="remove-button">✕</button>
            </div>
          </div>
        </div>
        <div v-if="searchPerformed" class="search-results">
          <div v-for="(result, index) in searchResults" :key="index" class="result-item">
            <p><mark :style="{ backgroundColor: colors[index % colors.length] }">{{ searchQueries[index] }}</mark>: {{ result.count }}件見つかりました。</p>
          </div>
        </div>
        <div class="textarea-container">
          <div class="textarea-wrapper">
            <textarea v-model="text" class="text-display" @input="autoResize"></textarea>
            <div class="highlighted-text" v-html="highlightedText"></div>
          </div>
        </div>
      </div>
  
      <!-- フッター広告スペース -->
      <div ref="adsContainerBottom" class="advertisement">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-4238806087366657"
             data-ad-slot="8452456341"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      <!-- 使い方の説明 -->
<h2>使い方の説明</h2>
<ol class="usage-steps">
  <li>テキストエリアに検索したいテキストを入力するか、「ペースト」ボタンをクリックしてクリップボードからテキストを貼り付けます。</li>
  <li>テキストファイルまたはWordファイル（.txt、.docx）をドラッグ&ドロップします。</li>
  <li>検索する単語を入力します。複数の単語を追加する場合は「+」ボタンをクリックして検索フィールドを追加します。</li>
  <li>「検索」ボタンをクリックすると、テキスト内の指定した単語がハイライトされ、結果が表示されます。</li>
  <li>「リセット」ボタンをクリックすると、テキストエリアと検索フィールドがクリアされます。</li>
</ol>

<!-- 主な機能 -->
<h2>主な機能</h2>
<ul class="features">
  <li>リアルタイム単語検索: テキストエリアに入力された単語をリアルタイムで検索し、ハイライト表示します。</li>
  <li>複数キーワード検索対応: 最大12個の検索キーワードを入力して、一度に複数の単語を検索できます。</li>
  <li>ファイル読み込み対応: テキストファイル（.txt）およびWordファイル（.docx）をドラッグ&ドロップまたはファイル選択で読み込み、ファイル内の単語を検索します。</li>
  <li>クリップボードサポート: クリップボードからテキストをペーストして検索できます。</li>
  <li>簡単なインターフェース: 使いやすいインターフェースで、直感的に操作できます。</li>
</ul>

<!-- メリット -->
<h2>メリット</h2>
<p>この単語検索ツールは、文章の修正や編集作業を大幅に効率化します。特に長文のテキストや複数の文書に対して、同じ単語を一括して検索する必要がある場合に非常に便利です。誰でも簡単に使えるインターフェースを提供し、日常的な文書作成から専門的な文書編集まで幅広く対応します。全ての処理がブラウザ上で完結するため、データが外部に送信されることがなく、セキュリティ面で安心です。</p>
    </div>
  </template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue';
import mammoth from 'mammoth';

export default {
  setup() {
    const text = ref('');
    const searchQueries = ref(['']);
    const searchResults = ref([]);
    const searchPerformed = ref(false);
    const adsContainerTop = ref(null);
    const adsContainerBottom = ref(null);
    const colors = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'];

    const pasteText = async () => {
      try {
        const clipText = await navigator.clipboard.readText();
        if (!clipText) {
          console.error('クリップボードにテキストがありません。');
          return;
        }
        text.value = clipText;
        await nextTick();
        autoResize();
      } catch (error) {
        console.error('クリップボードの内容を読み取れませんでした: ', error);
      }
    };

    const clearText = async () => {
      text.value = '';
      searchResults.value = [];
      searchPerformed.value = false;
      searchQueries.value = [''];
      await nextTick();
      autoResize();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      readFile(file);
    };

    const handleDrop = (event) => {
      const file = event.dataTransfer.files[0];
      readFile(file);
    };

    const readFile = async (file) => {
      if (file.name.endsWith('.docx')) {
        readDocxFile(file);
      } else if (file.name.endsWith('.txt')) {
        readTextFile(file);
      } else {
        alert('対応していないファイル形式です。txt、docxファイルのみ対応しています。');
      }
    };

    const readDocxFile = async (file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            text.value = result.value;
            await nextTick();
            autoResize();
          } catch (error) {
            console.error('Wordファイルの読み取りエラー:', error);
          }
        } else {
          console.error('ArrayBuffer expected, but received:', typeof arrayBuffer);
        }
      };
      reader.readAsArrayBuffer(file);
    };

    const readTextFile = (file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        text.value = e.target.result;
        await nextTick();
        autoResize();
      };
      reader.readAsText(file);
    };

    const addSearchQuery = () => {
      if (searchQueries.value.length < 12) {
        searchQueries.value.push('');
      }
    };

    const removeSearchQuery = (index) => {
      if (searchQueries.value.length > 1) {
        searchQueries.value.splice(index, 1);
      }
    };

    const highlightText = () => {
      searchPerformed.value = true;
      searchResults.value = [];
      if (searchQueries.value.length === 0) {
        return;
      }

      let highlighted = text.value;

      searchQueries.value.forEach((query, index) => {
        if (query === '') return;

        const regex = new RegExp(`(${query})`, 'gi');
        const matches = highlighted.match(regex);

        if (matches) {
          searchResults.value.push({ query, count: matches.length });
        }

        // Avoid highlighting inside HTML tags
        highlighted = highlighted.replace(/(<[^>]+)>/g, function (m) {
          return m.replace(regex, (match) => `<span class="highlight" style="background-color: ${colors[index]};">${match}</span>`);
        });

        // Highlight outside HTML tags
        highlighted = highlighted.replace(regex, (match) => `<span class="highlight" style="background-color: ${colors[index]};">${match}</span>`);
      });

      highlightedText.value = highlighted.replace(/\n/g, '<br>');
    };

    const highlightedText = computed(() => {
      let highlighted = text.value;

      searchQueries.value.forEach((query, index) => {
        if (query === '') return;

        const regex = new RegExp(`(${query})`, 'gi');

        // Avoid highlighting inside HTML tags
        highlighted = highlighted.replace(/(<[^>]+)>/g, function (m) {
          return m.replace(regex, (match) => `<span class="highlight" style="background-color: ${colors[index]};">${match}</span>`);
        });

        // Highlight outside HTML tags
        highlighted = highlighted.replace(regex, (match) => `<span class="highlight" style="background-color: ${colors[index]};">${match}</span>`);
      });

      return highlighted.replace(/\n/g, '<br>');
    });

    const autoResize = () => {
      const textarea = document.querySelector('.text-display');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    };

    onMounted(() => {
      const adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.crossOrigin = 'anonymous';
      adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4238806087366657';
      adsContainerTop.value.appendChild(adsScript);
      adsContainerBottom.value.appendChild(adsScript);

      const inlineScript = document.createElement('script');
      inlineScript.type = 'text/javascript';
      inlineScript.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
      adsContainerTop.value.appendChild(inlineScript);
      adsContainerBottom.value.appendChild(inlineScript);

      autoResize();
    });

    return {
      text,
      searchQueries,
      searchResults,
      searchPerformed,
      pasteText,
      clearText,
      handleFileUpload,
      handleDrop,
      highlightText,
      autoResize,
highlightedText,
adsContainerTop,
adsContainerBottom,
addSearchQuery,
removeSearchQuery,
colors
};
}
};
</script>

<style scope>
.word-search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  font-size: 14px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
}

.description {
  font-size: 14px;
  margin-bottom: 20px;
  text-align: left;
}

.usage-steps {
  list-style-type: decimal;
  padding-left: 20px;
  margin-bottom: 20px;
}

.features {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

.buttons-top {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.search-input-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-input {
  width: 120px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.search-button,
.add-button,
.remove-button {
  background-color: #3490dc;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.remove-button {
  background-color: #e3342f;
}

.paste-button {
  background-color: #3490dc;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clear-button {
  background-color: #e3342f;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.textarea-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.textarea-wrapper {
  position: relative;
  width: 100%;
}

.text-display {
  width: 100%;
  min-height: 150px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1em;
  box-sizing: border-box;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  resize: none;
  font-family: inherit;
  position: relative;
  z-index: 2;
  color: transparent;
  caret-color: black;
  background: transparent;
}

.highlighted-text {
  width: 100%;
  min-height: 150px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1em;
  box-sizing: border-box;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  background-color: #f9f9f9;
  font-family: inherit;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  color: black;
  z-index: 1;
}

.advertisement {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-results {
  margin-bottom: 10px;
  width: 100%;
  max-width: 800px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.result-item {
  margin-bottom: 5px;
}

.highlight {
  background-color: yellow;
}
</style>
<template>
  <div class="word-replace-container">
    <!-- ヘッダー広告スペース -->
    <div ref="adsContainerTop" class="advertisement">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-4238806087366657"
           data-ad-slot="2812282702"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>

    <div class="content-container" @dragover.prevent @drop.prevent="handleDrop">
      <h1 class="title">単語置換ツール</h1>
      <p class="description">
        テキストボックスに入力された単語を迅速かつ簡単に置換するための強力なツールです。テキストファイルやWordファイル内の文字列も処理できます。ファイルをドラッグ&ドロップするだけで、自動的に読み込み、必要な単語を検索して置換することができます。
      </p>
      <div class="buttons-top">
        <button @click="pasteText" class="paste-button">ペースト</button>
        <button @click="clearText" class="clear-button">リセット</button>
      </div>
      <div class="search-replace">
        <div class="search-replace-inputs" v-for="(pair, index) in wordPairs" :key="index">
          <input v-model="pair.searchWord" placeholder="検索する単語" class="search-input" />
          <span class="arrow">→</span>
          <input v-model="pair.replaceWord" placeholder="置換する単語" class="replace-input" />
          <button @click="removeWordPair(index)" class="remove-button">削除</button>
          <button @click="addWordPair" class="add-button">追加</button>
        </div>
        <div class="buttons-top">
          <button @click="replaceText" class="replace-button">置換</button>
          <button @click="copyText" class="copy-button">
              <i class="fas fa-copy"></i> コピー
          </button>
        </div>
        <p v-if="replaceCount !== null">置換件数: {{ replaceCount }}</p>
      </div>
      <div class="textarea-container">
        <div class="textarea-wrapper">
          <textarea v-model="text" placeholder="置換前の文章" class="text-display" @input="autoResize"></textarea>
        </div>
        <span class="arrow-right">→</span>
        <div class="textarea-wrapper">
          <textarea v-model="replacedText" placeholder="置換後の文章" class="text-display" readonly></textarea>
        </div>
      </div>
    </div>
    <div class="file-upload">
      <input type="file" @change="handleFileUpload" />
    </div>
    <!-- フッター広告スペース -->
    <div ref="adsContainerBottom" class="advertisement">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-4238806087366657"
           data-ad-slot="1499201036"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
      <h2>使い方の説明</h2>
      <ol class="usage-steps">
        <li>テキストエリアに置換したいテキストを入力するか、「ペースト」ボタンをクリックしてクリップボードからテキストを貼り付けます。</li>
        <li>テキストファイルまたはWordファイル（.txt、.docx）を直接ドラッグ&ドロップすることで、ファイル内のテキストを自動的に読み込みます。</li>
        <li>「検索する単語」フィールドに置換したい単語を入力します。</li>
        <li>「置換する単語」フィールドに置換後の新しい単語を入力します。</li>
        <li>「置換」ボタンをクリックすると、テキスト内の指定した単語が新しい単語に置換されます。</li>
        <li>置換結果は「置換後」フィールドに表示され、コピーボタンでコピーすることができます。</li>
      </ol>

      <h2>主な機能</h2>
      <ul class="features">
        <li>テキストファイルやWordファイルの読み込み対応</li>
        <li>複数の単語を一度に置換可能</li>
        <li>置換後のテキストをワンクリックでコピー可能</li>
        <li>クリップボードからのテキスト貼り付け対応</li>
        <li>使いやすいインターフェースで迅速な操作が可能</li>
      </ul>

      <h2>メリット</h2>
      <p>
        この単語置換ツールは、文章の修正や編集作業を大幅に効率化します。特に長文のテキストや複数の文書に対して、同じ単語を一括して置換する必要がある場合に非常に便利です。誰でも簡単に使えるインターフェースを提供し、日常的な文書作成から専門的な文書編集まで幅広く対応します。
      </p>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue';
import mammoth from 'mammoth';

export default {
  setup() {
    const text = ref('');
    const replacedText = ref('');
    const showReplacedText = ref(false);
    const wordPairs = ref([{ searchWord: '', replaceWord: '' }]);
    const replaceCount = ref(null);
    const adsContainerTop = ref(null);
    const adsContainerBottom = ref(null);

    const pasteText = async () => {
      try {
        const clipText = await navigator.clipboard.readText();
        if (!clipText) {
          console.error('クリップボードにテキストがありません。');
          return;
        }
        text.value = clipText;
        replacedText.value = '';
        showReplacedText.value = false;
        await nextTick();
        autoResize();
      } catch (error) {
        console.error('クリップボードの内容を読み取れませんでした: ', error);
      }
    };

    const clearText = async () => {
      text.value = '';
      replacedText.value = '';
      showReplacedText.value = false;
      replaceCount.value = null;
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
            replacedText.value = '';
            showReplacedText.value = false;
            replaceCount.value = null;
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
        replacedText.value = '';
        showReplacedText.value = false;
        replaceCount.value = null;
        await nextTick();
        autoResize();
      };
      reader.readAsText(file);
    };

    const replaceText = async () => {
      let replaced = text.value;
      let count = 0;

      wordPairs.value.forEach(pair => {
        if (pair.searchWord !== '') {
          const searchRegex = new RegExp(pair.searchWord, 'g');
          const matches = replaced.match(searchRegex);
          if (matches) {
            count += matches.length;
            replaced = replaced.replace(searchRegex, pair.replaceWord);
          }
        }
      });

      replaceCount.value = count;
      replacedText.value = replaced;
      showReplacedText.value = true;
      await nextTick();
      autoResize();
    };

    const plainHighlightedText = computed(() => {
      return replacedText.value;
    });

    const autoResize = () => {
      const textarea = document.querySelector('.text-display');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
      const pre = document.querySelector('.highlighted-text');
      if (pre) {
        pre.style.height = 'auto';
        pre.style.height = pre.scrollHeight + 'px';
      }
};

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(replacedText.value);
    alert('置換後のテキストをコピーしました');
  } catch (error) {
    console.error('テキストのコピーに失敗しました: ', error);
  }
};

const addWordPair = () => {
  wordPairs.value.push({ searchWord: '', replaceWord: '' });
};

const removeWordPair = (index) => {
  if (wordPairs.value.length > 1) {
    wordPairs.value.splice(index, 1);
  } else {
    wordPairs.value[0].searchWord = '';
    wordPairs.value[0].replaceWord = '';
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
      wordPairs,
      replacedText,
      showReplacedText,
      replaceCount,
      pasteText,
      clearText,
      handleFileUpload,
      handleDrop,
      replaceText,
      autoResize,
      plainHighlightedText,
      adsContainerTop,
      adsContainerBottom,
      copyText,
      addWordPair,
      removeWordPair
    };
  }
};
</script>

<style scoped>
.word-replace-container {
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
  padding: 10px;
  width: 100%;
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
  justify-content: space-between;
  width: 100%;
}

.textarea-wrapper {
  width: 48%;
  display: flex;
  flex-direction: column;
}

.textarea-label {
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  color: black; /* ここを追加してテキストを見やすくします */
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
  background-color: #f9f9f9;
  resize: none;
  font-family: inherit;
  color: black;
  overflow: hidden; /* スクロールバーを表示しない */
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
  color: black;
}

.arrow-right {
  align-self: center;
  font-size: 24px;
  margin: 0 10px;
}

.search-replace {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-replace-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.search-input,
.replace-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

.arrow {
  font-size: 24px;
}

.replace-button,
.copy-button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #3490dc;
  color: white;
  cursor: pointer;
  width: 80px;
}

.remove-button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #e3342f;
  color: white;
  cursor: pointer;
  width: 150px;
}

.add-button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #38c172;
  color: white;
  cursor: pointer;
  width: 150px;
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

.file-upload {
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
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
      <h1 class="title">単語置換</h1>
      <p class="description">
        テキストボックスに入力された単語を置換します。テキストファイル、Wordファイル内の文字列も処理できます。ファイルをドラッグ&ドロップしてください。
      </p>
      <div class="buttons-top">
        <button @click="pasteText" class="paste-button">ペースト</button>
        <button @click="clearText" class="clear-button">リセット</button>
      </div>
      <div class="search-replace">
        <div class="search-replace-inputs">
          <input v-model="searchWord" placeholder="検索する単語" class="search-input" />
          <span class="arrow">→</span>
          <input v-model="replaceWord" placeholder="置換する単語" class="replace-input" />
          <button @click="replaceText" class="replace-button">置換</button>
        </div>
      </div>
      <div class="textarea-container">
        <div class="textarea-wrapper">
          <div class="textarea-label">置換前</div>
          <textarea v-model="text" class="text-display" @input="autoResize"></textarea>
        </div>
        <span class="arrow-right">→</span>
        <div class="textarea-wrapper">
          <div class="textarea-label">置換後</div>
          <pre class="highlighted-text" v-html="showReplacedText ? highlightedText : ''"></pre>
        </div>
      </div>
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
  </div>
</template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue';
import mammoth from 'mammoth';

export default {
  setup() {
    const text = ref('');
    const replacedText = ref('');  // 新しく右側のテキスト用に追加
    const showReplacedText = ref(false);  // 置換後のテキストの表示を制御
    const searchWord = ref('');
    const replaceWord = ref('');
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
        replacedText.value = '';  // 置換後のテキストをクリア
        showReplacedText.value = false;  // 置換後のテキストを非表示
        await nextTick();
        autoResize();
      } catch (error) {
        console.error('クリップボードの内容を読み取れませんでした: ', error);
      }
    };

    const clearText = async () => {
      text.value = '';
      replacedText.value = '';  // 置換後のテキストをクリア
      showReplacedText.value = false;  // 置換後のテキストを非表示
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
            replacedText.value = '';  // 置換後のテキストをクリア
            showReplacedText.value = false;  // 置換後のテキストを非表示
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
        replacedText.value = '';  // 置換後のテキストをクリア
        showReplacedText.value = false;  // 置換後のテキストを非表示
        await nextTick();
        autoResize();
      };
      reader.readAsText(file);
    };

    const replaceText = async () => {
      if (searchWord.value === '') {
        alert('検索する単語を入力してください。');
        return;
      }
      const searchRegex = new RegExp(searchWord.value, 'g');
      replacedText.value = text.value.replace(searchRegex, replaceWord.value);  // 置換後のテキストを設定
      showReplacedText.value = true;  // 置換後のテキストを表示
      await nextTick();
      autoResize();
    };

    const highlightedText = computed(() => {
      return replacedText.value.replace(/\n/g, '<br>');  // 置換後のテキストを表示
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
      searchWord,
      replaceWord,
      pasteText,
      clearText,
      handleFileUpload,
      handleDrop,
      replaceText,
      autoResize,
      highlightedText,
      adsContainerTop,
      adsContainerBottom,
      showReplacedText
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
  padding: 20px;
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

.replace-button {
padding: 8px 16px;
font-size: 14px;
border: none;
border-radius: 5px;
background-color: #3490dc;
color: white;
cursor: pointer;
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
</style>
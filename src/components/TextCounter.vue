<template>
    <div class="text-counter-container">
      <div class="text-counter" @dragover.prevent @drop.prevent="handleDrop">
        <!-- ヘッダー広告スペース -->
        <div ref="adsContainer" class="advertisement">
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4238806087366657" data-ad-slot="6108596121" data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>
        <h1 class="title">文字数カウント</h1>
        <p class="description">
          テキストボックスに入力された文字数をカウントします。テキストファイル、Wordファイル内の文字列もカウントできます。
        </p>
        <div class="buttons-top">
          <button @click="pasteText" class="paste-button">ペースト</button>
          <button @click="clearText" class="clear-button">リセット</button>
        </div>
        <textarea v-model="text" @input="updateCounts" class="text-area"
          placeholder="カウントしたい文字列を入力、貼り付け、またはファイルのドラッグ&ドロップをしてください。"></textarea>
        <div class="options">
          <div class="counts-left">
            <div class="count-item">
              <p class="count-label">文字数</p>
              <p class="count-result">{{ totalChars }}</p>
            </div>
            <div class="count-item">
              <p class="count-label">改行を除いた文字数</p>
              <p class="count-result">{{ charsWithoutNewlines }}</p>
            </div>
            <div class="count-item">
              <p class="count-label">空白、改行を除いた文字数</p>
              <p class="count-result">{{ charsWithoutSpacesAndNewlines }}</p>
            </div>
          </div>
        </div>
        <input type="file" @change="handleFileUpload" class="file-upload" accept=".txt,.docx" />
        <div v-if="fileName">アップロードされたファイル: {{ fileName }}</div>
        <!-- フッター広告スペース -->
        <div ref="adsContainerBottom" class="advertisement">
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4238806087366657" data-ad-slot="9601086758" data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import mammoth from 'mammoth';
  
  export default {
    setup() {
      const text = ref('');
      const totalChars = ref(0);
      const charsWithoutSpaces = ref(0);
      const charsWithoutNewlines = ref(0);
      const charsWithoutSpacesAndNewlines = ref(0);
      const fileName = ref('');
      const adsContainer = ref(null);
      const adsContainerBottom = ref(null);
  
      onMounted(() => {
        const adsScript = document.createElement('script');
        adsScript.async = true;
        adsScript.crossOrigin = 'anonymous';
        adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4238806087366657';
        adsContainer.value.appendChild(adsScript);
        adsContainerBottom.value.appendChild(adsScript);
  
        const inlineScript = document.createElement('script');
        inlineScript.type = 'text/javascript';
        inlineScript.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
        adsContainer.value.appendChild(inlineScript);
        adsContainerBottom.value.appendChild(inlineScript);
      });
  
      const pasteText = async () => {
        try {
          const clipText = await navigator.clipboard.readText();
          if (!clipText) {
            console.error('クリップボードにテキストがありません。');
            return;
          }
          text.value = clipText;
          updateCounts();
        } catch (error) {
          console.error('クリップボードの内容を読み取れませんでした: ', error);
        }
      };
  
      const clearText = () => {
        text.value = '';
        updateCounts();
      };
  
      const updateCounts = () => {
        totalChars.value = text.value.length;
        charsWithoutNewlines.value = text.value.replace(/\n/g, '').length;
        charsWithoutSpacesAndNewlines.value = text.value.replace(/[\s\n]/g, '').length;
      };
  
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        fileName.value = file.name;
        readFile(file);
      };
  
      const handleDrop = (event) => {
        const file = event.dataTransfer.files[0];
        fileName.value = file.name;
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
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            text.value = result.value;
            updateCounts();
          } catch (error) {
            console.error('Wordファイルの読み取りエラー:', error);
          }
        };
        reader.readAsArrayBuffer(file);
      };
  
      const readTextFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          text.value = e.target.result;
          updateCounts();
        };
        reader.readAsText(file);
      };
  
      return {
        text,
        totalChars,
        charsWithoutSpaces,
        charsWithoutNewlines,
        charsWithoutSpacesAndNewlines,
        fileName,
        pasteText,
        clearText,
        handleFileUpload,
        handleDrop,
      };
    },
  };
  </script>
  
  <style scoped>
  .text-counter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    overflow-y: auto;
  }
  
  .text-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    flex-grow: 1;
    width: 100%;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .description {
    font-size: 16px;
    margin-bottom: 20px;
    text-align: left;
  }
  
  .buttons-top {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    gap: 10px;
  }
  
  .text-area {
    width: 100%;
    height: 225px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 1em;
    box-sizing: border-box;
    resize: vertical;
    flex-grow: 1;
  }
  
  .text-area::placeholder {
    font-size: 1em;
  }
  
  .options {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .counts-left {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .count-item {
    display: flex;
    justify-content: space-between;
    width: 280px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .count-label {
    font-weight: bold;
  }
  
  .count-result {
    font-weight: bold;
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }
  
  .paste-button, .clear-button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .paste-button {
    background-color: #3490dc;
    color: white;
  }
  
  .clear-button {
    background-color: #e3342f;
    color: white;
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
  
  .counts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .file-upload {
    margin-top: 10px;
  }
  
  /* メディアクエリの追加 */
  @media (max-width: 768px) {
    .buttons-top {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      gap: 10px;
    }
  
    .options {
        flex-direction: column;
        align-items: center;
    }

.counts-left {
width: 100%;
}

.count-item {
width: 100%;
}

.buttons {
width: 100%;
flex-direction: row;
justify-content: space-around;
margin-left: 0;
}
}

@media (max-width: 480px) {
.title {
font-size: 20px;
}

.description {
font-size: 14px;
}

.text-area {
height: 150px;
padding: 10px;
font-size: 0.9em;
}

.paste-button, .clear-button {
padding: 6px 12px;
font-size: 12px;
}

.buttons-top {
flex-direction: row;
justify-content: center;
width: 100%;
gap: 10px;
}
}

/* 広告の表示をスマホの画面でも確認できるように */
@media (max-width: 768px) {
.advertisement {
display: block;
}
}
</style>
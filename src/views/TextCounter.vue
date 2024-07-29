<template>
    <div class="text-counter-container">
      <!-- ヘッダー広告スペース -->
      <div ref="adsContainerTop" class="advertisement">
        <ins class="adsbygoogle"
             style="display:block; height: 50px !important;"
             data-ad-client="ca-pub-4238806087366657"
             data-ad-slot="6108596121"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
  
      <div class="text-counter" @dragover.prevent @drop.prevent="handleDrop">
        <h1 class="title">文字数カウント</h1>
        <p class="description">
          テキストボックスに入力された文字数をカウントします。テキストファイル、Wordファイル内の文字列もカウントできます。
          <br>全てブラウザ上で完結するのでセキュリティーの心配も不要です。
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
      </div>
  
      <!-- フッター広告スペース -->
      <div ref="adsContainerBottom" class="advertisement">
        <ins class="adsbygoogle"
             style="display:block; height: 50px !important;"
             data-ad-client="ca-pub-4238806087366657"
             data-ad-slot="9601086758"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  </template>
  
  <script>
  import mammoth from "mammoth";
  
  export default {
    data() {
      return {
        text: '',
        totalChars: 0,
        charsWithoutSpaces: 0,
        charsWithoutNewlines: 0,
        charsWithoutSpacesAndNewlines: 0,
        fileName: ''
      };
    },
    watch: {
      text() {
        this.updateCounts();
      }
    },
    methods: {
      async pasteText() {
        try {
          const clipText = await navigator.clipboard.readText();
          if (!clipText) {
            console.error('クリップボードにテキストがありません。');
            return;
          }
          this.text = clipText;
          this.updateCounts();
        } catch (error) {
          console.error("クリップボードの内容を読み取れませんでした: ", error);
        }
      },
      clearText() {
        this.text = '';
        this.updateCounts();
      },
      updateCounts() {
        this.totalChars = this.text.length;
        this.charsWithoutNewlines = this.text.replace(/\n/g, '').length;
        this.charsWithoutSpacesAndNewlines = this.text.replace(/[\s\n]/g, '').length;
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.fileName = file.name;
        this.readFile(file);
      },
      handleDrop(event) {
        const file = event.dataTransfer.files[0];
        this.fileName = file.name;
        this.readFile(file);
      },
      async readFile(file) {
        if (file.name.endsWith('.docx')) {
          this.readDocxFile(file);
        } else if (file.name.endsWith('.txt')) {
          this.readTextFile(file);
        } else {
          alert("対応していないファイル形式です。txt、docxファイルのみ対応しています。");
        }
      },
      async readDocxFile(file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            this.text = result.value;
            this.updateCounts();
          } catch (error) {
            console.error("Wordファイルの読み取りエラー:", error);
          }
        };
        reader.readAsArrayBuffer(file);
      },
      readTextFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.text = e.target.result;
          this.updateCounts();
        };
        reader.readAsText(file);
      }
    },
    mounted() {
      // Google AdSenseのスクリプトを読み込み、広告を表示
      const adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.crossOrigin = 'anonymous';
      adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4238806087366657';
      document.body.appendChild(adsScript);
  
      adsScript.onload = () => {
        if (typeof window.adsbygoogle !== 'undefined') {
          window.adsbygoogle.push({});
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .text-counter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
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
    height: 50px;
    margin-bottom: 20px;
  }
  
  .advertisement[data-ad-status="unfilled"] {
    display: none !important;
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
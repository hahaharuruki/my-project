<template>
    <div class="word-search-replace-container">
      <!-- ヘッダー広告スペース -->
      <div ref="adsContainerTop" class="advertisement">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-4238806087366657"
             data-ad-slot="6108596121"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
  
      <div class="text-counter" @dragover.prevent @drop.prevent="handleDrop">
        <h1 class="title">単語検索・置換</h1>
        <p class="description">
          テキストボックスに入力された単語を検索し、指定された単語に置換します。テキストファイル、Wordファイル内の文字列も処理できます。
        </p>
        <div class="buttons-top">
          <button @click="pasteText" class="paste-button">ペースト</button>
          <button @click="clearText" class="clear-button">リセット</button>
        </div>
        <textarea v-model="text" class="text-area"
                  placeholder="検索・置換したい文字列を入力、貼り付け、またはファイルのドラッグ&ドロップをしてください。"></textarea>
        <div class="search-replace">
          <h2>単語検索・置換</h2>
          <input v-model="searchWord" placeholder="検索する単語" class="search-input" />
          <input v-model="replaceWord" placeholder="置換する単語" class="replace-input" />
          <button @click="replaceText" class="replace-button">置換</button>
        </div>
      </div>
  
      <!-- フッター広告スペース -->
      <div ref="adsContainerBottom" class="advertisement">
        <ins class="adsbygoogle"
             style="display:block"
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
        searchWord: '',
        replaceWord: ''
      };
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
        } catch (error) {
          console.error("クリップボードの内容を読み取れませんでした: ", error);
        }
      },
      clearText() {
        this.text = '';
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.readFile(file);
      },
      handleDrop(event) {
        const file = event.dataTransfer.files[0];
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
          if (arrayBuffer instanceof ArrayBuffer) {
            try {
              const result = await mammoth.extractRawText({ arrayBuffer });
              this.text = result.value;
            } catch (error) {
              console.error("Wordファイルの読み取りエラー:", error);
            }
          }
        };
        reader.readAsArrayBuffer(file);
      },
      readTextFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.text = e.target.result;
        };
        reader.readAsText(file);
      },
      replaceText() {
        if (this.searchWord === '') {
          alert("検索する単語を入力してください。");
          return;
        }
        const searchRegex = new RegExp(this.searchWord, 'g');
        this.text = this.text.replace(searchRegex, this.replaceWord);
      }
    },
    mounted() {
      const adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.crossOrigin = 'anonymous';
      adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4238806087366657';
      this.$refs.adsContainerTop.appendChild(adsScript);
      this.$refs.adsContainerBottom.appendChild(adsScript);
  
      const inlineScript = document.createElement('script');
      inlineScript.type = 'text/javascript';
      inlineScript.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
      this.$refs.adsContainerTop.appendChild(inlineScript);
      this.$refs.adsContainerBottom.appendChild(inlineScript);
    }
  };
  </script>
  
  <style scoped>
  .word-search-replace-container {
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
  
  .search-replace {
    margin-top: 20px;
  }
  
  .search-input,
  .replace-input {
    width: calc(50% - 10px);
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .replace-button {
    padding: 10px 20px;
    font-size: 16px;
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
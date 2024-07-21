(function(){"use strict";var t={9718:function(t,e,a){var n=a(5130),o=a(6768);const s={id:"app"},d={key:0,class:"dropdown-menu"};function r(t,e,a,n,r,i){const l=(0,o.g2)("router-link"),c=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",s,[(0,o.Lk)("header",null,[(0,o.Lk)("div",{class:"menu-button",onClick:e[0]||(e[0]=(...t)=>i.toggleMenu&&i.toggleMenu(...t))}," ☰ "),r.isMenuOpen?((0,o.uX)(),(0,o.CE)("div",d,[(0,o.bF)(l,{to:"/",onClick:i.toggleMenu},{default:(0,o.k6)((()=>[(0,o.eW)("Home")])),_:1},8,["onClick"]),(0,o.bF)(l,{to:"/how-to-use",onClick:i.toggleMenu},{default:(0,o.k6)((()=>[(0,o.eW)("How to Use")])),_:1},8,["onClick"])])):(0,o.Q3)("",!0)]),(0,o.Lk)("main",null,[(0,o.bF)(c)])])}var i={name:"App",data(){return{isMenuOpen:!1}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen}}},l=a(1241);const c=(0,l.A)(i,[["render",r]]);var u=c,p=a(973);function v(t,e,a,n,s,d){const r=(0,o.g2)("TextCounter");return(0,o.uX)(),(0,o.CE)("div",null,[(0,o.bF)(r)])}var h=a(4232);const f=t=>((0,o.Qi)("data-v-f00cad70"),t=t(),(0,o.jt)(),t),g={class:"text-counter-container"},m={ref:"adsContainerTop",class:"advertisement"},x=f((()=>(0,o.Lk)("ins",{class:"adsbygoogle",style:{display:"block",height:"50px !important"},"data-ad-client":"ca-pub-4238806087366657","data-ad-slot":"6108596121","data-ad-format":"auto","data-full-width-responsive":"true"},null,-1))),b=[x],k=f((()=>(0,o.Lk)("h1",{class:"title"},"文字数カウント",-1))),y=f((()=>(0,o.Lk)("p",{class:"description"},[(0,o.eW)(" テキストボックスに入力された文字数をカウントします。テキストファイル、Wordファイル内の文字列もカウントできます。 "),(0,o.Lk)("br"),(0,o.eW)("全てブラウザ上で完結するのでセキュリティーの心配も不要です。 ")],-1))),w={class:"buttons-top"},C={class:"options"},L={class:"counts-left"},O={class:"count-item"},T=f((()=>(0,o.Lk)("p",{class:"count-label"},"文字数",-1))),E={class:"count-result"},F={class:"count-item"},S=f((()=>(0,o.Lk)("p",{class:"count-label"},"改行を除いた文字数",-1))),A={class:"count-result"},W={class:"count-item"},_=f((()=>(0,o.Lk)("p",{class:"count-label"},"空白、改行を除いた文字数",-1))),j={class:"count-result"},M={key:0},N={ref:"adsContainerBottom",class:"advertisement"},D=f((()=>(0,o.Lk)("ins",{class:"adsbygoogle",style:{display:"block",height:"50px !important"},"data-ad-client":"ca-pub-4238806087366657","data-ad-slot":"9601086758","data-ad-format":"auto","data-full-width-responsive":"true"},null,-1))),Q=[D];function U(t,e,a,s,d,r){return(0,o.uX)(),(0,o.CE)("div",g,[(0,o.Lk)("div",m,b,512),(0,o.Lk)("div",{class:"text-counter",onDragover:e[5]||(e[5]=(0,n.D$)((()=>{}),["prevent"])),onDrop:e[6]||(e[6]=(0,n.D$)(((...t)=>r.handleDrop&&r.handleDrop(...t)),["prevent"]))},[k,y,(0,o.Lk)("div",w,[(0,o.Lk)("button",{onClick:e[0]||(e[0]=(...t)=>r.pasteText&&r.pasteText(...t)),class:"paste-button"},"ペースト"),(0,o.Lk)("button",{onClick:e[1]||(e[1]=(...t)=>r.clearText&&r.clearText(...t)),class:"clear-button"},"リセット")]),(0,o.bo)((0,o.Lk)("textarea",{"onUpdate:modelValue":e[2]||(e[2]=t=>d.text=t),onInput:e[3]||(e[3]=(...t)=>r.updateCounts&&r.updateCounts(...t)),class:"text-area",placeholder:"カウントしたい文字列を入力、貼り付け、またはファイルのドラッグ&ドロップをしてください。"},null,544),[[n.Jo,d.text]]),(0,o.Lk)("div",C,[(0,o.Lk)("div",L,[(0,o.Lk)("div",O,[T,(0,o.Lk)("p",E,(0,h.v_)(d.totalChars),1)]),(0,o.Lk)("div",F,[S,(0,o.Lk)("p",A,(0,h.v_)(d.charsWithoutNewlines),1)]),(0,o.Lk)("div",W,[_,(0,o.Lk)("p",j,(0,h.v_)(d.charsWithoutSpacesAndNewlines),1)])])]),(0,o.Lk)("input",{type:"file",onChange:e[4]||(e[4]=(...t)=>r.handleFileUpload&&r.handleFileUpload(...t)),class:"file-upload",accept:".txt,.docx"},null,32),d.fileName?((0,o.uX)(),(0,o.CE)("div",M,"アップロードされたファイル: "+(0,h.v_)(d.fileName),1)):(0,o.Q3)("",!0)],32),(0,o.Lk)("div",N,Q,512)])}a(4114);var H=a(1195),X={data(){return{text:"",totalChars:0,charsWithoutSpaces:0,charsWithoutNewlines:0,charsWithoutSpacesAndNewlines:0,fileName:""}},watch:{text(){this.updateCounts()}},methods:{async pasteText(){try{const t=await navigator.clipboard.readText();if(!t)return void console.error("クリップボードにテキストがありません。");this.text=t,this.updateCounts()}catch(t){console.error("クリップボードの内容を読み取れませんでした: ",t)}},clearText(){this.text="",this.updateCounts()},updateCounts(){this.totalChars=this.text.length,this.charsWithoutNewlines=this.text.replace(/\n/g,"").length,this.charsWithoutSpacesAndNewlines=this.text.replace(/[\s\n]/g,"").length},handleFileUpload(t){const e=t.target.files[0];this.fileName=e.name,this.readFile(e)},handleDrop(t){const e=t.dataTransfer.files[0];this.fileName=e.name,this.readFile(e)},async readFile(t){t.name.endsWith(".docx")?this.readDocxFile(t):t.name.endsWith(".txt")?this.readTextFile(t):alert("対応していないファイル形式です。txt、docxファイルのみ対応しています。")},async readDocxFile(t){const e=new FileReader;e.onload=async t=>{const e=t.target.result;try{const t=await H.extractRawText({arrayBuffer:e});this.text=t.value,this.updateCounts()}catch(a){console.error("Wordファイルの読み取りエラー:",a)}},e.readAsArrayBuffer(t)},readTextFile(t){const e=new FileReader;e.onload=t=>{this.text=t.target.result,this.updateCounts()},e.readAsText(t)}},mounted(){const t=document.createElement("script");t.async=!0,t.crossOrigin="anonymous",t.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4238806087366657",document.body.appendChild(t),t.onload=()=>{"undefined"!==typeof window.adsbygoogle&&window.adsbygoogle.push({})}}};const P=(0,l.A)(X,[["render",U],["__scopeId","data-v-f00cad70"]]);var B=P,I={name:"HomePage",components:{TextCounter:B}};const R=(0,l.A)(I,[["render",v]]);var $=R;const G={class:"how-to-use-container"},J=(0,o.Fv)("<h1 data-v-95595d1e>文字数カウントツールの利用方法</h1><section data-v-95595d1e><h2 data-v-95595d1e>ツールの使い方</h2><ol data-v-95595d1e><li data-v-95595d1e><strong data-v-95595d1e>テキストの入力:</strong> テキストボックスに直接テキストを入力するか、クリップボードから貼り付けます。 ファイルをアップロードすることもできます。サポートされているファイル形式は <code data-v-95595d1e>.txt</code> と <code data-v-95595d1e>.docx</code> です。 </li><li data-v-95595d1e><strong data-v-95595d1e>ボタンの使用方法:</strong><ul data-v-95595d1e><li data-v-95595d1e><strong data-v-95595d1e>ペーストボタン:</strong> クリップボードにコピーされたテキストを貼り付けます。</li><li data-v-95595d1e><strong data-v-95595d1e>リセットボタン:</strong> 入力されたテキストをクリアします。</li></ul></li></ol></section><section data-v-95595d1e><h2 data-v-95595d1e>文字数カウントツールのメリット</h2><ul data-v-95595d1e><li data-v-95595d1e><strong data-v-95595d1e>作業効率の向上:</strong> テキストの文字数を手動でカウントする手間が省け、作業の効率が大幅にアップします。</li><li data-v-95595d1e><strong data-v-95595d1e>テキストの品質管理:</strong> 文字数の制限がある場合や、文章の長さを一定に保つ必要がある場合に非常に便利です。</li><li data-v-95595d1e><strong data-v-95595d1e>SEO対策:</strong> Webページのコンテンツが適切な長さであることを確認するために使用できます。長すぎず、短すぎない適切な文字数を保つことで、SEO効果が期待できます。</li></ul></section><section data-v-95595d1e><h2 data-v-95595d1e>使用例</h2><p data-v-95595d1e>具体的な使用例やシナリオを説明します。</p><h3 data-v-95595d1e>学生のレポート作成</h3><p data-v-95595d1e>学生がレポートを書く際に、指定された文字数を超えないように調整するためにこのツールを使用します。例えば、2000文字以内のレポートを書く場合、文字数カウントツールで常にチェックしながら書くことで、効率的に作成できます。</p><h3 data-v-95595d1e>ブロガーの記事作成</h3><p data-v-95595d1e>ブロガーがSEOを意識して記事を書く際に、適切な文字数を維持するためにこのツールを利用します。例えば、1500〜2000文字の記事が最適とされる場合、ツールを使って文字数を確認しながら執筆することで、SEO効果を高めることができます。</p></section><section data-v-95595d1e><h2 data-v-95595d1e>SEO対策における文字数の重要性</h2><p data-v-95595d1e>テキストの文字数は、SEO（検索エンジン最適化）において重要な要素の一つです。以下のポイントを考慮することで、SEO効果を高めることができます。</p><ul data-v-95595d1e><li data-v-95595d1e><strong data-v-95595d1e>適切な文字数を保つ:</strong> Googleは、コンテンツが豊富で情報量が多いページを好む傾向があります。しかし、長すぎるコンテンツはユーザーにとって読みづらくなるため、適切な文字数を維持することが重要です。</li><li data-v-95595d1e><strong data-v-95595d1e>キーワードの自然な配置:</strong> キーワードを適切に配置し、自然な文章であることを心がけます。キーワードの過剰な使用は、SEOスパムと見なされる可能性があります。</li></ul></section><section data-v-95595d1e><h2 data-v-95595d1e>FAQ（よくある質問）</h2><h3 data-v-95595d1e>Q: このツールは無料で利用できますか？</h3><p data-v-95595d1e>A: はい、完全に無料でご利用いただけます。</p><h3 data-v-95595d1e>Q: どのファイル形式をアップロードできますか？</h3><p data-v-95595d1e>A: 現在、.txtと.docxファイルに対応しています。</p><h3 data-v-95595d1e>Q: 文字数カウントツールはどのように役立ちますか？</h3><p data-v-95595d1e>A: テキストの文字数を簡単にカウントできるため、レポートやブログ記事の作成、SEO対策などに役立ちます。</p></section>",6),V=[J];function q(t,e,a,n,s,d){return(0,o.uX)(),(0,o.CE)("div",G,V)}var z={name:"HowToUse"};const K=(0,l.A)(z,[["render",q],["__scopeId","data-v-95595d1e"]]);var Y=K;const Z=[{path:"/",name:"Home",component:$},{path:"/how-to-use",name:"HowToUse",component:Y}],tt=(0,p.aE)({history:(0,p.LA)("/"),routes:Z});var et=tt;(0,n.Ef)(u).use(et).mount("#app")}},e={};function a(n){var o=e[n];if(void 0!==o)return o.exports;var s=e[n]={exports:{}};return t[n].call(s.exports,s,s.exports,a),s.exports}a.m=t,function(){var t=[];a.O=function(e,n,o,s){if(!n){var d=1/0;for(c=0;c<t.length;c++){n=t[c][0],o=t[c][1],s=t[c][2];for(var r=!0,i=0;i<n.length;i++)(!1&s||d>=s)&&Object.keys(a.O).every((function(t){return a.O[t](n[i])}))?n.splice(i--,1):(r=!1,s<d&&(d=s));if(r){t.splice(c--,1);var l=o();void 0!==l&&(e=l)}}return e}s=s||0;for(var c=t.length;c>0&&t[c-1][2]>s;c--)t[c]=t[c-1];t[c]=[n,o,s]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,s,d=n[0],r=n[1],i=n[2],l=0;if(d.some((function(e){return 0!==t[e]}))){for(o in r)a.o(r,o)&&(a.m[o]=r[o]);if(i)var c=i(a)}for(e&&e(n);l<d.length;l++)s=d[l],a.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return a.O(c)},n=self["webpackChunkmy_project"]=self["webpackChunkmy_project"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(9718)}));n=a.O(n)})();
//# sourceMappingURL=app.3f38a9c0.js.map
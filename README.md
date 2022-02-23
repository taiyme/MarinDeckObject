# MarinDeckObject

**MarinDeckObject** (`window.MD`) は、[MarinDeck]アプリ内にて使用しているJavaScriptオブジェクトです。

こちらでは、MarinDeckObjectの詳しい仕様について記載します。

[MarinDeck]: https://hisubway.online/marindeck/ "MarinDeck | Android向けTweetDeckアプリ - HiSubway.online"

## 配布

[MarinDeckObject.js](./MarinDeckObject.js) にて、圧縮されたJavaScriptファイルを配布しています。

## 仕様

### オブジェクトのバージョン

<table>
<thead>
  <tr>
    <th>対応表</th>
    <th>オブジェクトのバージョン</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>window.MD.Version</td>
    <td>v0</td>
  </tr>
</tbody>
</table>

`window.MD.Version` は、このMarinDeckObjectのバージョンを示す文字列(string型)です。

### ネイティブ相互通信

<table>
<thead>
  <tr>
    <th>対応表</th>
    <th>オブジェクトのバージョン</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>JavaScript → ネイティブ送信</td>
    <td rowspan="3">v0</td>
  </tr>
  <tr>
    <td>JavaScript ⇄ ネイティブ相互通信</td>
  </tr>
  <tr>
    <td>ネイティブ → JavaScript送信</td>
  </tr>
</tbody>
</table>

**ネイティブ相互通信** (`window.MD.Native`) は、JavaScript ⇄ ネイティブアプリ間で情報を共有するためのオブジェクトです。

このオブジェクトには `post`, `get`, `send` 関数があります。

#### JavaScript → ネイティブ送信

`window.MD.Native.post` は、JavaScriptからネイティブアプリへ情報を渡すための関数で、戻り値は `void` です。

|JavaScript|型    |    |ネイティブ|型    |
|----------|------|----|----------|------|
|type      |string| → |type      |string|
|body      |object| → |body      |object|
|          |      | → |uuid      |string|

```TypeScript
// 使い方
window.MD.Native.post({
  type: 'command', // string
  body: {value: 'reload'} // {[key: string]: any}
})
```

#### JavaScript ⇄ ネイティブ相互通信

`window.MD.Native.get` は、JavaScriptからネイティブへ情報を渡し、ネイティブからの戻り値を取得する非同期関数です。

|JavaScript|型    |    |ネイティブ|型    |
|----------|------|----|----------|------|
|type      |string| → |type      |string|
|body      |object| → |body      |object|
|          |      | → |uuid      |string|
|          |      |(←)|uuid      |string|
|value     |any   |(←)|value     |any   |

※ (←) は `window.MD.Native.send` の管轄です。

```TypeScript
// 使い方
const image = await window.MD.Native.get({
  type: 'fetchImage', // string
  body: {url: 'https://...'} // {[key: string]: any}
})
```

#### ネイティブ → JavaScript送信

`window.MD.Native.send` は、ネイティブアプリからJavaScriptへ情報を渡すための関数で、戻り値は `void` です。

|JavaScript|型    |    |ネイティブ|型    |
|----------|------|----|----------|------|
|          |      | ← |uuid      |string|
|value     |any   | ← |value     |any   |

※ `uuid` は新しく生成するのではなく、JavaScriptから取得したものを使用してください。JavaScript内で識別するために必要です。

```TypeScript
// 使い方
window.MD.Native.send({
  uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', // string
  value: '0.0.26' // any
})
```

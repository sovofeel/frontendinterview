---
id: 3
title: На что будет сслаться `this`
complexity: junior
category: js
lang: ru
type: example
tags: ['fundamental', 'this']
source: https://habr.com/ru/company/otus/blog/517560/
---
```js
  function Abc() { console.log(this); };
  Abc()
  new Abc();
```
```js
  Window
```
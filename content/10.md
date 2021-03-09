---
id: 10
title: Что выведет код
complexity: junior
category: js
lang: ru
type: example
tags: ['fundamental']
source: https://habr.com/ru/company/otus/blog/517560/
---
```js
  var x = [1];
  var y = x;

  x = [];
  console.log(x,y);
```
```js
[] [1]
```
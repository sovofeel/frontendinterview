---
id: 8
title: Реализовуйте аналог Function.prototype.bind
complexity: middle
category: js
lang: ru
type: task
tags: ['prototype']
source: https://habr.com/ru/post/488510/
---
```js
Function.prototype.bind = function(context, ...argsBind) {
  const fn = this
  return function (...args) {
    return fn.apply(context, argsBind.concat(args))
  };
};
```
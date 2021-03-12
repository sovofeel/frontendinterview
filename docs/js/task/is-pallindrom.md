---
id: 13
title: Идентичный алфавит
complexity: junior
description: Необходимо написать функцию, принимающую в аргументах две строки и возвращающую true, если эти строки состоят из идентичных букв и false в противном случае.
category: js
lang: ru
type: task
tags: ['string', 'sort']
source: https://habr.com/ru/post/488510/
---
```js
function isEqualSymbols(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  if (str1.split('').sort().join('') === str2.split('').sort().join('')) {
    return true;
  }

  return false;
}

```
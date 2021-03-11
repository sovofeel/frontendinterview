---
id: 10
title: Уникализация значений в массиве
description: Необходимо написать функцию, принимающую в аргументах массив целых чисел и возвращающую новый массив, состоящий только из уникальных значений первого массива.
complexity: junior
category: js
lang: ru
type: task
tags: ['array']
source: https://habr.com/ru/post/488510/
---
```js
// Решение в одну строку
function unique(arr) {
  return arr.filter((item, index, self) => (self.indexOf(item) === index));
}
```

```js
function unique(arr) {
	const res = {};

	arr.forEach((item) => {
		res[item] = '';
	});

	return Object.keys(res).map(item => Number(item));
}
```
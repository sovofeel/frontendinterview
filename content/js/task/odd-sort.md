---
id: 12
title: Сортировка нечётных
complexity: junior
description: Необходимо написать функцию, принимающую в аргументах массив и возвращающую новый массив, в котором отсортированы все нечетные числа по возрастанию, в то время как чётные остаются на своих местах.
category: js
lang: ru
type: task
tags: ['array', 'sort']
source: https://habr.com/ru/post/488510/
---
```js
function oddSort(arr) {
  arr.forEach((item, index) => {
    if (item % 2 === 1) {
      let sortNumber = item;

      for (let i = 0; i < index; i++) {
        if (arr[i] % 2 === 1) {
          if (arr[i] > sortNumber) {
            const tmp = sortNumber;

            sortNumber = arr[i];
            arr[i] = tmp;
          }
        }
      }
      arr[index] = sortNumber;
    }
  });

  return arr;
}
```
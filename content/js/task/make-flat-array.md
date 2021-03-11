---
id: 2
title: Сделайте вложенный массив плоским
complexity: junior
category: js
lang: ru
type: task
tags: ['array']
source: https://habr.com/ru/company/otus/blog/517560/
---
```js
/**
 * [1,2,[3,4]] -> [1,2,3,4]
 */

let arr = [1,2,[3,4, [5,6, [7, [8, 9, 10]]]]]

function flatten(arr) {
  return arr.reduce(function(acc, next){
    let isArray =  Array.isArray(next)
    return acc.concat(isArray ? flatten(next) : next)
  }, [])
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function() {
    return flatten(this)
  }
}
console.log(arr.flatten());
```
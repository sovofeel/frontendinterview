---
id: 6
title: Реализуйте метод reduce
complexity: junior
category: js
lang: ru
type: task
tags: ['array', 'reduce']
source: https://habr.com/ru/company/otus/blog/517560/
---
```js
  Array.prototype.reduce = function(func, initState) {
    const arr = this
    const callback = func
    let init = initState

    arr.forEach(function(value, index){
        init=callback(init, value)
    })
    return init
  }
```
---
id: 7
title: Реализуйте функцию debounce
complexity: junior
category: js
lang: ru
type: task
tags: ['array', 'debounce']
source: https://habr.com/ru/company/otus/blog/517560/
---
```js
  const debounce = function(func, interval) {
    let timerId;
    return function(e){
      clearTimeout(timerId)
      timerId = setTimeout(function(){
        func.apply()
      }, interval)
    }
  }
  debounce(apiCall, 3000)
```
---
id: 8
title: Реализуйте функцию throttle
complexity: junior
category: js
lang: ru
type: task
tags: ['array', 'throttle']
source: https://habr.com/ru/company/otus/blog/517560/
---
```js
  const throttle = (callback, interval) => {
    let timerId;
    let allowEvents = true;

    return function() {
      let context = this;
      let args = arguments;

      if (allowEvents) {
        callback.apply(context, args)
        allowEvents = false;
        timerId = setTimeOut(function(){
          allowEvents = true
        }, interval)
      }
    }
  }
```
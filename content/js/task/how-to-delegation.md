---
id: 9
title: Реализуйте делегирование
complexity: junior
category: js
lang: ru
type: task
tags: ['event delegation']
source: https://habr.com/ru/post/488510/
---
```html
<div class="wrapper">
  <div class="child"><div><div><div>click me</div></div></div></div>
  <div class="child"><div><div><div>click me</div></div></div></div>
  <div class="child"><div><div><div>click me</div></div></div></div>
  <div class="other"><div><div><div>dont't click me</div></div></div></div>
</div>
```

```js
const delegate = (eventName, el, selector, handler) => {
  el.addEventListener(eventName, (event) => {
    let node = event.target;
    const items = [].slice.call(el.querySelectorAll(selector));

    if (items.length) {
      while (node !== el && node !== null) {
        const isTarget = items.some(item => node === item);

        if (isTarget) {
          handler(node);
          break;
        } else {
          node = node.parentNode;
        }
      }
    }
  });
};

delegate('click', document.querySelector('.wrapper'), '.child', (el) => el.style.backgroundColor = 'blue');
```
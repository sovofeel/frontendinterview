const copytoclipboard =  () => {
  const pres = document.getElementsByTagName("pre")
  if (pres !== null ) {
    for (let i = 0; i < pres.length; i++) {
      if (isPrismClass(pres[i])) {
        pres[i].innerHTML = `<div class="copy">copy</div>${pres[i].innerHTML}`
      }
    }
  }


  if (window.Clipboard) {
  const clipboard = new Clipboard('.copy', {
    target: (trigger) => {
      return trigger.nextElementSibling;
    }
  });

  clipboard.on('success', (event) => {
    event.trigger.textContent = 'copied';
    setTimeout(() => {
      event.clearSelection();
      event.trigger.textContent = 'copy';
    }, 2000);
  });
}

  function isPrismClass(preTag) { 
    return preTag.className.substring(0, 8) === 'language'
    
  }


}

export default copytoclipboard
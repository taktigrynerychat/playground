const patterns = {
  fabric: {
    dynamicImport: import('./creational/fabric'),
    executeByDefault: true
  }
}

class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    Object.entries(patterns).forEach(([key, {dynamicImport, executeByDefault}]) => {
      const el = document.createElement('button')
      const callback = async () => {
        const { default: main } = await dynamicImport
        main()
      }

      el.innerHTML = key
      el.onclick = callback
      if (executeByDefault) {
        callback()
      }
      this.appendChild(el)
    })
  }
}

customElements.define('app-root', AppElement);
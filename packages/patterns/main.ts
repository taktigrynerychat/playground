import {patterns} from './config';

class AppElement extends HTMLElement {
  connectedCallback() {
    Object.entries(patterns).forEach(([key, {dynamicImport, executeByDefault}]) => {
      const el = document.createElement('button')
      const callback = async () => {
        const { default: main } = await dynamicImport()
        main()
      }

      el.innerHTML = key
      el.onclick = callback
      executeByDefault && callback()
      this.appendChild(el)
    })
  }
}

customElements.define('app-root', AppElement);
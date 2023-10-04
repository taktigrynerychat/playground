import {PATTERNS_METADATA} from './config';

class AppElement extends HTMLElement {
  connectedCallback() {
    Object.entries(PATTERNS_METADATA).forEach(([group, patternsByGroup]) => {
      const section = document.createElement('section')
      section.innerHTML = `<h1>${group}</h1>`

      Object.entries(patternsByGroup).forEach(([patternName, {dynamicImport, executeByDefault}]) => {
        const el = document.createElement('button')
        const callback = async () => {
          const { default: main } = await dynamicImport()
          main()
        }

        el.innerHTML = patternName
        el.onclick = callback
        executeByDefault && callback()
        section.appendChild(el)
      })
      this.appendChild(section)
    })
  }
}

customElements.define('app-root', AppElement);
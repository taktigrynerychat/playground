type Patterns = {
  [pattern: string]: {
    dynamicImport: () => Promise<{ default: () => void }>
    executeByDefault?: boolean
  }
}

const patterns: Patterns = {
  fabric: {
    dynamicImport: () => import('./creational/fabric'),
    executeByDefault: true
  },
  abstractFabric: {
    dynamicImport: () => import('./creational/abstract-fabric')
  }
}

class AppElement extends HTMLElement {
  public static observedAttributes = [];

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
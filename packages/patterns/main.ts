type Patterns = {
  [pattern: string]: {
    dynamicImport: () => Promise<{ default: () => void }>
    executeByDefault?: boolean
  }
}

const patterns: Patterns = {
  fabric: {
    dynamicImport: () => import('./creational/fabric'),
    executeByDefault: true,
  },
  abstractFabric: {
    dynamicImport: () => import('./creational/abstract-fabric'),
  },
  singleton: {
    dynamicImport: () => import('./creational/singleton'),
  },
  builder: {
    dynamicImport: () => import('./creational/builder'),
  },
  prototype: {
    dynamicImport: () => import('./creational/prototype'),
  },
}

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
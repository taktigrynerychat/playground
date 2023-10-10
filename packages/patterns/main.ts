import {PATTERNS_METADATA} from './config';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/dark.css'
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);

class AppElement extends HTMLElement {
  public connectedCallback(): void {

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    Object.entries(PATTERNS_METADATA).forEach(([group, patternsByGroup]) => {
      const section = document.createElement('section');
      section.innerHTML = `<h1>${group}</h1>`;

      Object.entries(patternsByGroup).forEach(([patternName, {dynamicImport, executeByDefault, content}]) => {
        const el = document.createElement('button');

        const callback = async () => {
          const { default: main } = await dynamicImport();
          const { value } = hljs.highlightAuto(content);
          code.innerHTML = value;
          main();
        };

        el.innerHTML = patternName;
        el.onclick = callback;
        executeByDefault && callback();
        section.appendChild(el);
      });
      this.appendChild(section);
    });
    this.appendChild(pre);
    pre.appendChild(code);
  }
}

customElements.define('app-root', AppElement);
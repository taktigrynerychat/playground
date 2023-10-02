class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `<h1>Hello world!</h1>`;
  }
}

customElements.define('app-root', AppElement);
class FooterComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        footer {
          background: #0a192f;
          color: #ccc;
          text-align: center;
          padding: 20px;
          position: relative;
          z-index: 1;
          font-size: 0.9rem;
        }
      </style>
      <footer>
        <p>© 2025 MAleventum software- Tutti i diritti riservati</p>
        <p> maleventumsoftware@gmail.com</p>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);

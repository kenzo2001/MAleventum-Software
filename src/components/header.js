class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 50px;
          background-color: rgba(10,25,47,0.9);
          color: white;
          position: relative;
          z-index: 1;
        }
        .logo {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .logo img {
          width: 40px;
          margin-right: 10px;
        }
        nav ul {
          list-style: none;
          display: flex;
          gap: 25px;
        }
        nav a {
          text-decoration: none;
          color: white;
          transition: color 0.3s ease;
        }
        nav a:hover {
          color: #00bfff;
        }
        @media (max-width: 900px) {
          .navbar {
            flex-direction: column;
            gap: 15px;
          }
          nav ul {
            flex-direction: column;
            gap: 15px;
          }
        }
      </style>
      <header class="navbar">
        <div class="logo">
          <img src="assets/img/logo.png" alt="Logo">
          <span>MAsoftware</span>
        </div>
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="#servizi">Servizi</a></li>
            <li><a href="#chi-siamo">Chi Siamo</a></li>
            <li><a href="#contatti">Contatti</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);

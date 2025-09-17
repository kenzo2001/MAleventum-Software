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
          position: relative;
        }
        nav li {
          position: relative;
        }
        nav a {
          text-decoration: none;
          color: white;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        nav a:hover {
          color: #00bfff;
        }
        /* Dropdown */
        .dropdown {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: rgba(10,25,47,0.95);
          min-width: 180px;
          flex-direction: column;
          padding: 10px 0;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          z-index: 5;
        }
        .dropdown a {
          padding: 8px 20px;
          display: block;
          white-space: nowrap;
        }
        .dropdown a:hover {
          background-color: #007bbf;
        }
        /* Responsive */
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
            <li class="menu-servizi">
              <a>Servizi ⭣</a>
              <div class="dropdown">
                <a href="sviluppo-software.html">Sviluppo Software</a>
                <a href="pagine-web.html">Pagine Web</a>
                <a href="web-app.html">Web App</a>
                <a href="ai.html">Intelligenza Artificiale</a>
                <a href="chat-bot.html">Chat Bot</a>
              </div>
            </li>
            <li><a href="#chi-siamo">Chi Siamo</a></li>
            <li><a href="#contatti">Contatti</a></li>
          </ul>
        </nav>
      </header>
    `;

    // Script dropdown
    const menuServizi = shadow.querySelector(".menu-servizi");
    const dropdown = shadow.querySelector(".dropdown");

    menuServizi.addEventListener("mouseenter", () => {
      dropdown.style.display = "flex";
    });

    menuServizi.addEventListener("mouseleave", () => {
      dropdown.style.display = "none";
    });
  }
}

customElements.define('header-component', HeaderComponent);

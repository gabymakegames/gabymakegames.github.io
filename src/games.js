
// --- games.js ---
function initGamesSection() {
  const menuContainer = document.getElementById("game-menu");
  const contentContainer = document.getElementById("game-content");
  if (!menuContainer || !contentContainer) return;

  const savedLang = localStorage.getItem("lang") ;

    const lang = savedLang === 'es' ? 'es' : 'en';
  const gamesData = lang === "es" ? gamesData_es : gamesData_en;

  // --- generar menú ---
  menuContainer.innerHTML = "";
  Object.keys(gamesData).forEach((key, index) => {
    const btn = document.createElement("button");
    btn.className = "game-tab";
    if (index === 0) btn.classList.add("active");
    btn.dataset.game = key;
    btn.textContent = gamesData[key].title;
    menuContainer.appendChild(btn);
  });

  // --- render dinámico ---
  function renderGame(key) {
    const g = gamesData[key];
    if (!g) {
      contentContainer.innerHTML = `
        <div class="error-404">
          <h3>🚫 404 – No disponible todavía</h3>
          <p>El juego <b>${key}</b> no se pudo cargar.</p>
        </div>`;
      return;
    }


    // --- caso especial para "Próximamente" ---
  if (key === "next") {
    contentContainer.innerHTML = `
      <div class="game-card fade-in">
        <h3>${g.subtitle}<br></h3>
      

        <div class="coming-future">
          <img src="assets/duff.png" alt="Ideas frescas" class="troy-img" />
          <p class="quote">
            
           
          </p>
        </div>
       <p><span class="highlight">${g.description}</span></p>
      </div>
    `;
    return;
  }


    // decidir tipo de visualización
    let mediaHTML = "";

    if (g.images.length > 4) {
      // --- carrusel ---
      const slides = g.images
        .map(
          (src) => `<img src="${src}" alt="${g.title}" class="carousel-img" />`
        )
        .join("");
      mediaHTML = `
        <div class="carousel">
          <button class="carousel-btn prev">◀</button>
          <div class="carousel-track">${slides}</div>
          <button class="carousel-btn next">▶</button>
        </div>`;
    } else {
      // --- cuadrícula ---
      mediaHTML = `
        <div class="game-media">
          ${g.images
            .map(
              (src) =>
                `<img src="${src}" alt="${g.title}" class="game-thumb" />`
            )
            .join("")}
        </div>`;
    }

    const videoEmbeds = g.videos
      .map(
        (v) => `
        <div class="video-wrapper">
          <video src="${v}" controls></video>
        </div>`
      )
      .join("");

    const linksHTML = g.links
      .map(
        (l) =>
          `<a href="${l.url}" class="game-link" target="_blank">${l.icon} ${getI18nKey(l.text)}</a>`
      )
      .join(" ");

    contentContainer.innerHTML = `
      <div class="game-card fade-in">
        <h3>${g.title}</h3>
        <h4>${g.subtitle || ""}</h4>
        <pre class="game-description">${g.description}</pre>
        <div class="game-media-container">
          ${mediaHTML}
          ${videoEmbeds}
        </div>
        <div class="game-links">${linksHTML}</div>
      </div>
    `;

    // inicializar carrusel si aplica
    if (g.images.length > 4) {
      const carousel = document.querySelector(".carousel");
      initCarousel(carousel);
    }
  }

  // --- eventos de tabs ---
  const tabs = menuContainer.querySelectorAll(".game-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
        localStorage.setItem("lastGameKey", tab.dataset.game); // guarda la selección
    renderGame(tab.dataset.game);
    });
  });

  // render inicial
  const lastGame = localStorage.getItem("lastGameKey");
  const initialGame = lastGame && gamesData[lastGame] ? lastGame : Object.keys(gamesData)[0];
  const initialTab = menuContainer.querySelector(`[data-game="${initialGame}"]`);
  if (initialTab) {
    tabs.forEach((t) => t.classList.remove("active"));
    initialTab.classList.add("active");
    renderGame(initialGame);
  }
}

// --- carrusel ---
function initCarousel(container) {
  const track = container.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = container.querySelector(".prev");
  const nextBtn = container.querySelector(".next");
  let index = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  };
  nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    updateSlide();
  };
}

// --- observer ---
let observer = new MutationObserver(() => {
  const section = document.getElementById("games-section");
  const menu = document.getElementById("game-menu");
  const content = document.getElementById("game-content");

  // solo inicializa si la sección de juegos está presente y vacía
  if (section && menu && content && !menu.hasChildNodes()) {
    initGamesSection();
  }
});

// observa el contenedor principal donde se cargan las secciones
observer.observe(document.getElementById("content"), {
  childList: true,
  subtree: true,
});
const translations = {
  es: {
    navHome: "Inicio",
    navGames: "Juegos",
    navAbout: "Sobre mí",
    navOther: "Otras cosas",
    subtitle: "Desarrollando juegos indie desde el año 20XX...",

   // 🏠 HOME
  homeHeading: "👾 Bienvenido a <span>Gabymakegames</span>",
  homeTagline: "🎸 Juegos con inspiración retro, entre los 80s y 90s.",
  homeQuote: "Aquí es donde los juegos vuelven a sentirse como antes.",
  homeButton: "🎮 Ver Juegos",

    // 👤 ABOUT
  aboutTitle: "👤 Sobre mí",
  about1: "Soy Gabriel, también conocido como <strong>gabymakegames</strong>.",
  about2: "Hago juegos por amor, en mis tiempos libres, desde casa.",
  about3: "Mis juegos son sencillos, retro y hechos a mano, con el corazón y de una manera muy artesanal.",
  about4: "Solo soy un tipo tomando mates y haciendo juegos desde su casa.",
  
  l1: "Blast Processing",
  l2: "EL cerebro de  la bestia",
  l3: "Vive en tu mundo. Juega en el nuestro.",
  l4: "Entrá o quedate afuera.",
  l5: "Bienvenido al tercer lugar.",


  aboutContact: "📮 Contacto: <a href='mailto:gabymakegames@gmail.com'>gabymakegames@gmail.com</a>",
  aboutLinks: "🌐 Más proyectos en <a href='#' target='_blank'>Itch.io</a> o <a href='#' target='_blank'>Steam</a>",

  aboutWorkTitle: "🎮 Qué hago",
  },

  en: {
    navHome: "Home",
    navGames: "Games",
    navAbout: "About",
    navOther: "Other things",
    subtitle: "Developing indie games since 20XX...",

    // 🏠 HOME
    homeHeading: "👾 Welcome to <span>Gabymakegames</span>",
    homeTagline: "🎸 Retro-inspired games from the 80s and 90s.",
    homeQuote: "This is where games feel like they used to.",
    homeButton: "🎮 View Games",


    // 👤 ABOUT
    aboutTitle: "👤 About me",
    about1: "I’m Gabriel, also known as <strong>gabymakegames</strong>.",
    about2: "I make games out of love, in my free time, from home.",
    about3: "My games are simple, retro, and handcrafted with heart, made in a truly artisanal way.",
    about4: "Just a guy at home, sipping mate and making games.",
    aboutWorkTitle: "🎮 What I do",
    
l1: "Blast Processing",
  l2: "Now you’re playing with power & Super Power!",
  l3: "Live in your world. Play in ours.",
  l4: "The future is here.",
l5:" Welcome to the Third Place",


    aboutContact: "📮 Contact: <a href='mailto:gabymakegames@gmail.com'>gabymakegames@gmail.com</a>",
    aboutLinks: "🌐 More projects on <a href='#' target='_blank'>Itch.io</a> or <a href='#' target='_blank'>Steam</a>",
  },
};


function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });



}


// --- Selector de idioma ---
const langSelect = document.getElementById("lang-select");

// idioma por defecto (si hay guardado, úsalo)
const savedLang = localStorage.getItem("lang") || "es";
langSelect.value = savedLang;
setLanguage(savedLang);

// escucha los cambios del selector
langSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  setLanguage(lang);
  localStorage.setItem("lang", lang); // guarda la preferencia
  if (initGamesSection) initGamesSection()
});

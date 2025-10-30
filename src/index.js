// --- CARGA DINÁMICA DE PÁGINAS ---
const contentDiv = document.getElementById("content");
const links = document.querySelectorAll("nav a[data-page]");

// función para cargar una página parcial
async function loadPage(page) {
  try {
    const response = await fetch(`pages/${page}.html`);
    const html = await response.text();
    contentDiv.innerHTML = html;
    window.scrollTo(0, 0); // vuelve al top
  } catch (err) {
    contentDiv.innerHTML = `<p style="color:red">Error cargando ${page}.html</p>`;
  }
}

// listener del menú
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
    history.pushState({ page }, "", `#${page}`);
  });
});

// permite navegación atrás/adelante del navegador
window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";
  loadPage(page);
});

// carga inicial
const initialPage = location.hash.replace("#", "") || "home";
loadPage(initialPage);



// --- CAMBIO DE TEMA FRÍO / CÁLIDO ---
/*const themeToggle = document.getElementById("theme-toggle");

// función para aplicar tema
function applyTheme(mode) {
  const link = document.querySelector('link[rel="stylesheet"]');
  if (mode === "frio") {
    link.href = "css/styles-megadrive-light.css";
    themeToggle.textContent = "🔥";//Modo Cálido
  } else {
    link.href = "css/styles-megadrive.css";
    themeToggle.textContent = "❄️"; // Modo Frío
  }
  localStorage.setItem("theme", mode);
}

// cargar tema guardado
const savedTheme = localStorage.getItem("theme") || "calido";
applyTheme(savedTheme);

// alternar al hacer clic
themeToggle.addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "calido";
  const next = current === "calido" ? "frio" : "calido";
  applyTheme(next);
});*/



// --- GENERADOR DE FIGURAS MEMPHIS FINAL ---
const colors = ["#ffef00", "#ff0033", "#00d26a", "#004cff"];
const usedPositions = [];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// genera posiciones más abiertas
function randomPos() {
  const side = Math.random() < 0.5 ? randomBetween(5, 35) : randomBetween(65, 90); // más cerca del centro
  const top = randomBetween(5, 90);
  return { top, left: side };
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isTooClose(top, left) {
  return usedPositions.some(pos => Math.abs(pos.left - left) < 8 && Math.abs(pos.top - top) < 8);
}

function createShape(type, count = 3) {
  const base = document.querySelector(`.shape-${type} svg`);
  if (!base) return;
  const shapes = [];

  for (let i = 0; i < count; i++) {
    const clone = base.cloneNode(true);
    const wrapper = document.createElement("div");
    wrapper.classList.add("bg-shape", `shape-${type}`);

    let pos;
    do {
      pos = randomPos();
    } while (isTooClose(pos.top, pos.left));
    usedPositions.push(pos);

    randomizeShape(wrapper, clone, pos);
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    shapes.push(wrapper);
  }

  // elimina las originales del HTML
  base.parentElement.remove();

  setInterval(() => {
    shapes.forEach(shape => {
      const svg = shape.querySelector("svg");
      randomizeShape(shape, svg, null, true);
    });
  }, 10000);
}

function randomizeShape(wrapper, svg, pos, smooth = false) {
  const rotate = (Math.random() * 50 - 25).toFixed(1);
  const scale = (0.8 + Math.random() * 0.4).toFixed(2);
  const opacity = (0.25 + Math.random() * 0.4).toFixed(2);
  const color = randomColor();

  const top = pos ? pos.top : parseFloat(wrapper.style.top) || Math.random() * 80;
  const left = pos ? pos.left : parseFloat(wrapper.style.left) || Math.random() * 10;

  wrapper.style.top = `${top}%`;
  wrapper.style.left = `${left}%`;
  wrapper.style.transform = `rotate(${rotate}deg) scale(${scale})`;
  wrapper.style.opacity = opacity;
  wrapper.style.transition = smooth ? "all 1.2s ease-in-out" : "none";

  svg.querySelectorAll("*").forEach(el => {
    const tag = el.tagName;

    if (typeOf(wrapper).includes("zigzag")) {
      // zigzags solo con borde
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", color);
      el.setAttribute("stroke-width", "4");
    } else if (typeOf(wrapper).includes("ring")) {
      // anillos con borde y centro transparente
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", color);
      el.setAttribute("stroke-width", "5");
    } else {
      // triángulos u otros con relleno colorido
      el.setAttribute("fill", color);
      el.setAttribute("stroke", "#000");
    }
  });
}

function typeOf(wrapper) {
  return wrapper.className;
}

// genera y anima las tres figuras
["triangle", "zigzag", "ring"].forEach(shape => createShape(shape));



document.addEventListener("DOMContentLoaded", () => {
  // posibles ángulos (45°, 135°, 225°, 315°)
  const angles = [45, 135, 225, 315, 35, 70, 105,140,185];
  const randomAngle = angles[Math.floor(Math.random() * angles.length)];

  // aplicamos el ángulo dinámicamente al pseudo-elemento
  document.body.style.setProperty("--bg-rotation", `${randomAngle}deg`);
});
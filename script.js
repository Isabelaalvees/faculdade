// ==========================
// MAPA GLOBAL (EVITA BUG)
// ==========================
let mapaGlobal = null;

// ==========================
// NAVEGAÇÃO ENTRE SEÇÕES
// ==========================
function carregarPagina(pagina) {
  const secoes = [
    'secao-destinos',
    'secao-continentes',
    'secao-culturas',
    'secao-receita'
  ];

  secoes.forEach(id => {
    let el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const mapa = {
    pais: 'secao-destinos',
    continente: 'secao-continentes',
    cultura: 'secao-culturas',
    receita: 'secao-receita'
  };

  let secao = document.getElementById(mapa[pagina]);
  if (secao) secao.style.display = 'block';

  let destaque = document.querySelector('.destaque');
  if (destaque) destaque.style.display = 'none';
}

// ==========================
// IDIOMA
// ==========================
function mudarIdioma(idioma) {
  localStorage.setItem("idioma", idioma);

  let textos = {
    pt: {
      titulo: "Para onde deseja viajar?",
      placeholder: "Digite um país",
      botao: "Pesquisar",
    },
    en: {
      titulo: "Where do you want to travel?",
      placeholder: "Type a country",
      botao: "Search",
    },
    es: {
      titulo: "¿A dónde quieres viajar?",
      placeholder: "Escriba un país",
      botao: "Buscar",
    }
  };

  let t = textos[idioma];

  let titulo = document.getElementById('titulo');
  if (titulo) titulo.textContent = t.titulo;

  let busca = document.getElementById('busca');
  if (busca) busca.placeholder = t.placeholder;

  let botao = document.getElementById('botaoBusca');
  if (botao) botao.textContent = t.botao;
}

// ==========================
// REMOVER ACENTOS
// ==========================
function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ==========================
// BUSCA
// ==========================
function buscar() {
  let input = document.getElementById('busca');
  if (!input) return;

  document.querySelectorAll('.slider-area').forEach(el => {
    el.style.display = 'none';
  });

  let texto = removerAcentos(input.value.toLowerCase());

  const secoes = [
    'secao-destinos',
    'secao-continentes',
    'secao-culturas',
    'secao-receita'
  ];

  secoes.forEach(id => {
    let sec = document.getElementById(id);
    if (sec) sec.style.display = 'block';
  });

  document.querySelectorAll('.card').forEach(card => {
    let titulo = card.querySelector('h3');
    if (!titulo) return;

    let nome = removerAcentos(titulo.textContent.toLowerCase());

    card.style.display = nome.includes(texto) ? 'block' : 'none';
  });
}

// ==========================
// RESET BUSCA
// ==========================
function verificarBusca() {
  let input = document.getElementById('busca');
  if (!input) return;

  if (input.value === '') {
    document.querySelectorAll('.slider-area').forEach(el => {
      el.style.display = 'block';
    });

    document.querySelectorAll('.card').forEach(card => {
      card.style.display = 'block';
    });

    let resultado = document.getElementById('resultado-busca');
    if (resultado) resultado.innerHTML = '';
  }
}

// ==========================
// BOTÃO TOPO
// ==========================
window.onscroll = function () {
  let btn = document.getElementById('btnTopo');
  if (!btn) return;

  btn.style.display = document.documentElement.scrollTop > 300 ? 'block' : 'none';
};

// ==========================
// MODAL
// ==========================
function abrirModal(id) {
  let modal = document.getElementById('modal-' + id);
  if (modal) modal.style.display = 'flex';
}

function fecharModal(id) {
  let modal = document.getElementById('modal-' + id);
  if (modal) modal.style.display = 'none';
}

// ==========================
// SLIDERS
// ==========================
function iniciarSliders() {
  document.querySelectorAll(".card-principal").forEach(card => {

    let index = 0;

    const slides = card.querySelector(".slides");
    if (!slides) return;

    const images = slides.querySelectorAll("img");
    const prev = card.querySelector(".prev");
    const next = card.querySelector(".next");
    const dotsContainer = card.querySelector(".dots");

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.onclick = () => {
        index = i;
        update();
      };

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function update() {
      const width = card.querySelector(".slider").clientWidth;
      slides.style.transform = `translateX(-${index * width}px)`;

      dots.forEach(d => d.classList.remove("active"));
      dots[index].classList.add("active");
    }

    next.onclick = () => {
      index = (index + 1) % images.length;
      update();
    };

    prev.onclick = () => {
      index = (index - 1 + images.length) % images.length;
      update();
    };
  });
}

// ==========================
// MAPA (CORRIGIDO)
// ==========================
function iniciarMapa() {

  if (mapaGlobal) return;

  const el = document.getElementById('mapa');
  if (!el) return;

  mapaGlobal = L.map('mapa').setView([-15.78, -47.93], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapaGlobal);

  const locais = [
    { nome: "Brasil", coords: [-14.2, -51.9] },
    { nome: "Japão", coords: [36.2, 138.2] },
    { nome: "Colômbia", coords: [4.57, -74.29] }
  ];

  locais.forEach(local => {
    L.marker(local.coords)
      .addTo(mapaGlobal)
      .bindPopup(local.nome);
  });
}

// ==========================
// INICIALIZAÇÃO GERAL (CORRIGIDA)
// ==========================
document.addEventListener("DOMContentLoaded", function () {

  let idiomaSalvo = localStorage.getItem("idioma") || "pt";
  mudarIdioma(idiomaSalvo);

  let botao = document.querySelector(".btn-dark");
  let tema = localStorage.getItem("tema");

  if (tema === "dark") {
    document.body.classList.add("dark");
    if (botao) botao.textContent = "☀️";
  }

  iniciarMapa();

  setTimeout(() => {
    iniciarSliders();
  }, 200);

});
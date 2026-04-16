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

  document.querySelector('.destaque').style.display = 'none';
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
      menuPais: "País",
      menuContinente: "Continente",
      menuCultura: "Cultura",
      menuReceita: "Receitas"
    },
    en: {
      titulo: "Where do you want to travel?",
      placeholder: "Type a country",
      botao: "Search",
      menuPais: "Country",
      menuContinente: "Continent",
      menuCultura: "Culture",
      menuReceita: "Recipes"
    },
    es: {
      titulo: "¿A dónde quieres viajar?",
      placeholder: "Escriba un país",
      botao: "Buscar",
      menuPais: "País",
      menuContinente: "Continente",
      menuCultura: "Cultura",
      menuReceita: "Recetas"
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

  let cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let titulo = card.querySelector('h3');
    if (!titulo) return;

    let nome = removerAcentos(titulo.textContent.toLowerCase());

    card.style.display = nome.includes(texto) ? 'block' : 'none';
  });

  let resultadoDiv = document.getElementById('resultado-busca');
  let encontrados = [];

  cards.forEach(card => {
    if (card.style.display !== 'none') {
      let bandeira = card.dataset.bandeira;
      if (bandeira) encontrados.push(bandeira);
    }
  });

  if (resultadoDiv) {
    resultadoDiv.innerHTML = encontrados
      .map(cod => `<img src="https://flagcdn.com/w40/${cod}.png" style="height:40px; margin: 0 5px;">`)
      .join('');
  }

  // 🔥 chama globo sem quebrar
  if (typeof buscarNoMapa === "function") {
    buscarNoMapa(input.value);
  }
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

    let resultadoDiv = document.getElementById('resultado-busca');
    if (resultadoDiv) resultadoDiv.innerHTML = '';
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
// SLIDER
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
// INICIAR SITE
// ==========================
window.onload = function () {

  let idiomaSalvo = localStorage.getItem("idioma") || "pt";
  mudarIdioma(idiomaSalvo);

  fetch('pais.html').then(r => r.text()).then(html => {
    document.getElementById('conteudo-pais').innerHTML = html;
  });

  fetch('continente.html').then(r => r.text()).then(html => {
    document.getElementById('conteudo-continentes').innerHTML =
      '<div class="cards">' + html + '</div>';
  });

  fetch('cultura.html').then(r => r.text()).then(html => {
    document.getElementById('conteudo-culturas').innerHTML =
      '<div class="cards">' + html + '</div>';
  });

  fetch('receita.html').then(r => r.text()).then(html => {
    document.getElementById('conteudo-receita').innerHTML =
      '<div class="cards">' + html + '</div>';
  });

  setTimeout(() => {
    iniciarSliders();
    iniciarGlobo();
  }, 600);
};

// ==========================
// GLOBO 3D (CORRIGIDO)
// ==========================
let globe;

function iniciarGlobo() {
  const container = document.getElementById("mapa");
  if (!container || typeof Globe !== "function") return;

  container.innerHTML = "";

  globe = Globe()
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundColor('rgba(0,0,0,0)')
    .width(container.clientWidth)
    .height(300)
    (container);

  const locais = [
    { nome: "Brasil", lat: -14.2, lng: -51.9 },
    { nome: "Japão", lat: 36.2, lng: 138.2 },
    { nome: "Colômbia", lat: 4.57, lng: -74.29 }
  ];

  globe.pointsData(locais)
    .pointLat(d => d.lat)
    .pointLng(d => d.lng)
    .pointLabel(d => d.nome)
    .pointColor(() => "#CF6940")
    .onPointClick(d => {
      globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.8 }, 1000);
    });
}
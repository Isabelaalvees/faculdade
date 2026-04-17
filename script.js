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

  document.querySelectorAll('.slider-area').forEach(el => {
    el.style.display = 'none';
  });

  const mapa = {
    pais:       { secao: 'secao-destinos',    slider: 'slider-pais' },
    continente: { secao: 'secao-continentes', slider: 'slider-continente' },
    cultura:    { secao: 'secao-culturas',    slider: null },
    receita:    { secao: 'secao-receita',     slider: 'slider-receita' }
  };

  const alvo = mapa[pagina];
  if (!alvo) return;

  let secao = document.getElementById(alvo.secao);
  if (secao) secao.style.display = 'block';

  if (alvo.slider) {
    let slider = document.getElementById(alvo.slider);
    if (slider) slider.style.display = 'block';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const set = (id, value, prop = "textContent") => {
    let el = document.getElementById(id);
    if (el) el[prop] = value;
  };

  set('titulo', t.titulo);
  set('busca', t.placeholder, "placeholder");
  set('botaoBusca', t.botao);
  set('menuPais', t.menuPais);
  set('menuContinente', t.menuContinente);
  set('menuCultura', t.menuCultura);
  set('menuReceita', t.menuReceita);
}

// ==========================
// ACENTOS
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
  if (resultadoDiv) {
    let encontrados = [];

    cards.forEach(card => {
      if (card.style.display !== 'none') {
        let bandeira = card.dataset.bandeira;
        if (bandeira) encontrados.push(bandeira);
      }
    });

    resultadoDiv.innerHTML = encontrados
      .map(cod => `<img src="https://flagcdn.com/w40/${cod}.png" style="height:40px;margin:0 5px;border-radius:4px;">`)
      .join('');
  }

  buscarNoGlobo(input.value);
}

// ==========================
// RESET
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
// MODAL
// ==========================
function abrirModal(id) {
  let modal = document.getElementById('modal-' + id);
  if (modal) modal.style.display = 'flex';
  window.scrollTo(0, 0);
}

function fecharModal(id) {
  let modal = document.getElementById('modal-' + id);
  if (modal) modal.style.display = 'none';
}

// ==========================
// LOGO VOLTAR HOME 
// ==========================

function voltarHome() {

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
    card.style.display = 'block';
  });

  document.querySelectorAll('.slider-area').forEach(el => {
    el.style.display = 'block';
  });

  let input = document.getElementById('busca');
  if (input) input.value = '';

  let resultado = document.getElementById('resultado-busca');
  if (resultado) resultado.innerHTML = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


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
// GLOBO 3D 
// ==========================

let globe;

function iniciarGlobo() {
  const container = document.getElementById("globo");
  if (!container) return;
  if (typeof Globe === "undefined") return;

  container.innerHTML = "";

  globe = Globe()
    .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
    .backgroundColor('rgba(0,0,0,0)')
    .width(container.clientWidth)
    .height(300)
    (container);

  globe.atmosphereColor("#CF6940").atmosphereAltitude(0.15);

  globe.pointOfView({ lat: -10, lng: -60, altitude: 2 }, 0);

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  const locais = [
    {
      nome: "Brasil",
      lat: -14.2,
      lng: -51.9,
      bandeira: "https://flagcdn.com/w40/br.png"
    },
    {
      nome: "Japão",
      lat: 36.2,
      lng: 138.2,
      bandeira: "https://flagcdn.com/w40/jp.png"
    },
    {
      nome: "Colômbia",
      lat: 4.57,
      lng: -74.29,
      bandeira: "https://flagcdn.com/w40/co.png"
    }
  ];

  // 🔥 PIN + BANDEIRA (SEM BUG)
  globe
    .htmlElementsData(locais)
    .htmlElement(d => {
      const container = document.createElement("div");

      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
      container.style.cursor = "pointer";

      const flag = document.createElement("img");
      flag.src = d.bandeira;
      flag.style.width = "26px";
      flag.style.height = "18px";
      flag.style.borderRadius = "3px";

      const pin = document.createElement("div");
      pin.style.width = "6px";
      pin.style.height = "6px";
      pin.style.background = "#CF6940";
      pin.style.borderRadius = "50%";
      pin.style.marginTop = "2px";

      container.appendChild(flag);
      container.appendChild(pin);

      container.onclick = () => {
        globe.controls().autoRotate = false;

        globe.pointOfView(
          { lat: d.lat, lng: d.lng, altitude: 1.3 },
          1000
        );

        setTimeout(() => {
          const id = "modal-" + d.nome.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

          const modal = document.getElementById(id);

          if (modal) modal.style.display = "flex";
          else console.log("❌ Modal não encontrado:", id);
        }, 100);
      };

      return container;
    });

  window.addEventListener("resize", () => {
    globe.width(container.clientWidth);
  });
}

// ==========================
// SOBRE NÓS 
// ==========================
function abrirSobre() {
  let el = document.getElementById("modal-sobre");
  if (el) el.style.display = "flex";
}

function fecharSobre() {
  let el = document.getElementById("modal-sobre");
  if (el) el.style.display = "none";
}

// ==========================
// INIT 
// ==========================
window.onload = function () {

  let botao = document.querySelector(".btn-dark");
  let tema = localStorage.getItem("tema");

  if (tema === "dark") {
    document.body.classList.add("dark");
    if (botao) botao.textContent = "☀️";
  } else {
   if (botao) botao.textContent = "🌙";
}

  mudarIdioma(localStorage.getItem("idioma") || "pt");

 Promise.all([
  fetch('pais.html').then(r => r.text()),
  fetch('continente.html').then(r => r.text()),
  fetch('cultura.html').then(r => r.text()),
  fetch('receita.html').then(r => r.text())
])
.then(([pais, continente, cultura, receita]) => {

  document.getElementById('conteudo-pais').innerHTML = pais;
  document.getElementById('conteudo-continentes').innerHTML = '<div class="cards">' + continente + '</div>';
  document.getElementById('conteudo-culturas').innerHTML = '<div class="cards">' + cultura + '</div>';
  document.getElementById('conteudo-receita').innerHTML = '<div class="cards">' + receita + '</div>';

  iniciarSliders();
  iniciarGlobo();

  });

  fetch('continente.html').then(r => r.text()).then(h => {
    document.getElementById('conteudo-continentes').innerHTML = '<div class="cards">' + h + '</div>';
  });

  fetch('cultura.html').then(r => r.text()).then(h => {
    document.getElementById('conteudo-culturas').innerHTML = '<div class="cards">' + h + '</div>';
  });

  fetch('receita.html').then(r => r.text()).then(h => {
    document.getElementById('conteudo-receita').innerHTML = '<div class="cards">' + h + '</div>';
  });

};

// ==========================
// MODO DARK 
// ==========================

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  let botao = document.querySelector(".btn-dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
    if (botao) botao.textContent = "☀️";
  } else {
    localStorage.setItem("tema", "light");
    if (botao) botao.textContent = "🌙";
  }

  setTimeout(() => {
    iniciarGlobo();
  }, 200);
}

// ==========================
// VER RECEITA
// ==========================

function verReceitas(pais) {

  
  carregarPagina('receita');
  const cards = document.querySelectorAll('#conteudo-receita .card');
  cards.forEach(card => {

    const paisCard = card.dataset.pais;

    if (!paisCard) return;

    if (paisCard.toLowerCase() === pais.toLowerCase()) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  const secao = document.getElementById('secao-receita');
  if (secao) secao.style.display = 'block';

  secao.scrollIntoView({ behavior: 'smooth' });
}

// ==========================
// MENU MOBILE
// ==========================
function toggleMenu() {
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");

  if (menu && overlay) {
    menu.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
  }
}


document.addEventListener("click", function (e) {

  if (e.target.closest(".menu a") || 
      e.target.closest(".menu-idioma img") || 
      e.target.closest(".btn-dark")) {

    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");

    if (menu && overlay) {
      menu.classList.remove("ativo");
      overlay.classList.remove("ativo");
    }
  }

});
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

  let menuPais = document.getElementById('menuPais');
  if (menuPais) menuPais.textContent = t.menuPais;

  let menuCont = document.getElementById('menuContinente');
  if (menuCont) menuCont.textContent = t.menuContinente;

  let menuCult = document.getElementById('menuCultura');
  if (menuCult) menuCult.textContent = t.menuCultura;

  let menuRec = document.getElementById('menuReceita');
  if (menuRec) menuRec.textContent = t.menuReceita;
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

  // ESCONDE O SLIDER
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

    if (nome.includes(texto)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  secoes.forEach(secaoId => {
    let secao = document.getElementById(secaoId);
    if (!secao) return;

    let visiveis = secao.querySelectorAll('.card[style*="block"]');
    secao.style.display = visiveis.length > 0 ? 'block' : 'none';
  });

  // Mostra bandeiras no hero
  let resultadoDiv = document.getElementById('resultado-busca');
  let encontrados = [];

  cards.forEach(card => {
    if (card.style.display !== 'none') {
      let bandeira = card.dataset.bandeira;
      if (bandeira) encontrados.push(bandeira);
    }
  });

  resultadoDiv.innerHTML = encontrados
    .map(cod => `<img src="https://flagcdn.com/w40/${cod}.png" style="height:40px; margin: 0 5px; border-radius: 4px;">`)
    .join('');
}

// ==========================
// RESET BUSCA
// ==========================
function verificarBusca() {
  let input = document.getElementById('busca');
  if (!input) return;

  if (input.value === '') {

    //  VOLTA TODOS OS SLIDERS
    document.querySelectorAll('.slider-area').forEach(el => {
      el.style.display = 'block';
    });

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

    // limpa bandeiras
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
// SLIDER
// ==========================

function iniciarSliders() {
  document.querySelectorAll(".card-principal").forEach(card => {

    let index = 0;
    let startX = 0;
    let isDragging = false;

    const slides = card.querySelector(".slides");
    if (!slides) return;

    const images = slides.querySelectorAll("img");
    const prev = card.querySelector(".prev");
    const next = card.querySelector(".next");
    const dotsContainer = card.querySelector(".dots");

    // ==========================
    // DOTS
    // ==========================
    dotsContainer.innerHTML = "";

    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        index = i;
        update();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function update() {
      const width = card.querySelector(".slider").clientWidth;
      slides.style.transform = `translateX(-${index * width}px)`;

      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }

    // ==========================
    // BOTÕES
    // ==========================
    next.onclick = () => {
      index = (index + 1) % images.length;
      update();
    };

    prev.onclick = () => {
      index = (index - 1 + images.length) % images.length;
      update();
    };

    // ==========================
    // AUTO SLIDE COM PAUSA
    // ==========================
    let interval;

    function startAutoSlide() {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = setInterval(() => {
          index = (index + 1) % images.length;
          update();
        }, 4000);
      }, 2000); // espera 2s pra voltar
    }

    function stopAutoSlide() {
      clearInterval(interval);
      clearTimeout(interval);
    }

    startAutoSlide();

    // ==========================
    // PAUSAR AO INTERAGIR
    // ==========================
    card.addEventListener("mouseenter", stopAutoSlide);
    card.addEventListener("mouseleave", startAutoSlide);

    slides.addEventListener("mousedown", stopAutoSlide);
    window.addEventListener("mouseup", startAutoSlide);

    slides.addEventListener("touchstart", stopAutoSlide);
    slides.addEventListener("touchend", startAutoSlide);

    // ==========================
    // DRAG COM MOUSE
    // ==========================
    slides.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    window.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;

      let diff = e.clientX - startX;

      if (diff > 50) {
        index = (index - 1 + images.length) % images.length;
      } else if (diff < -50) {
        index = (index + 1) % images.length;
      }

      update();
    });

    // ==========================
    // TOUCH (CELULAR)
    // ==========================
    slides.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      let diff = endX - startX;

      if (diff > 50) {
        index = (index - 1 + images.length) % images.length;
      } else if (diff < -50) {
        index = (index + 1) % images.length;
      }

      update();
    });

  });
}

// ==========================
// INICIAR SITE
// ==========================
window.onload = function () {
  let idiomaSalvo = localStorage.getItem("idioma") || "pt";
  mudarIdioma(idiomaSalvo);

  let botao = document.querySelector(".btn-dark");
  let tema = localStorage.getItem("tema");

  if (tema === "dark") {
   document.body.classList.add("dark");
   botao.textContent = "☀️";
  }

  fetch('pais.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('conteudo-pais').innerHTML = html;
    });

  fetch('continente.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('conteudo-continentes').innerHTML =
        '<div class="cards">' + html + '</div>';
    });

  fetch('cultura.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('conteudo-culturas').innerHTML =
        '<div class="cards">' + html + '</div>';
    });

  fetch('receita.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('conteudo-receita').innerHTML =
        '<div class="cards">' + html + '</div>';
    });

  setTimeout(() => {
    iniciarSliders();
  }, 200);
};

// ==========================
// VER RECEITAS
// ==========================
function verReceitas(pais) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  carregarPagina('receita');
  document.querySelectorAll('#conteudo-receita .card').forEach(card => {
    if (card.dataset.pais === pais) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  document.getElementById('secao-receita').scrollIntoView({ behavior: 'smooth' });
}

// ==========================
// MENU RESPONSIVO
// ==========================

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("ativo");
}

document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("ativo");
  });
});

// ==========================
// VOLTAR HOME
// ==========================

function voltarHome() {

  // mostra todas as seções
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

  // mostra sliders novamente
  document.querySelectorAll('.slider-area').forEach(el => {
    el.style.display = 'block';
  });

  // limpa busca
  let input = document.getElementById('busca');
  if (input) input.value = '';

  let resultado = document.getElementById('resultado-busca');
  if (resultado) resultado.innerHTML = '';

  // volta topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================
// ABRIR SOBRE NÓS
// ==========================

function abrirSobre() {
  document.getElementById("modal-sobre").style.display = "flex";
}

function fecharSobre() {
  document.getElementById("modal-sobre").style.display = "none";
}

// ==========================
// DARK MODE
// ==========================

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  let botao = document.querySelector(".btn-dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
    botao.textContent = "☀️";
  } else {
    localStorage.setItem("tema", "light");
    botao.textContent = "🌙";
  }
}
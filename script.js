// ==========================
// NAVEGAÇÃO ENTRE SEÇÕES
// ==========================
function carregarPagina(pagina) {
  const secoes = [
   'secao-destinos',
    'secao-continentes', // corrigido
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
}

// ==========================
// RESET BUSCA
// ==========================
function verificarBusca() {
  let input = document.getElementById('busca');
  if (!input) return;

  if (input.value === '') {
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
  if (modal) modal.style.display = 'flex'; // ← correto
  window.scrollTo(0, 0);
}

function fecharModal(id) {
  let modal = document.getElementById('modal-' + id);
  if (modal) modal.style.display = 'none';
}

// ==========================
// INICIAR SITE
// ==========================
window.onload = function () {
  let idiomaSalvo = localStorage.getItem("idioma") || "pt";
  mudarIdioma(idiomaSalvo);
};
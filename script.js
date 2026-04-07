function carregarPagina(pagina) {
  document.getElementById('secao-destinos').style.display = 'none';
  document.getElementById('secao-viaje').style.display = 'none';
  document.getElementById('secao-culturas').style.display = 'none';
  document.getElementById('secao-receita').style.display = 'none';

  if (pagina === 'pais') {
    document.getElementById('secao-destinos').style.display = 'block';
  } else if (pagina === 'continente') {
    document.getElementById('secao-viaje').style.display = 'block';
  } else if (pagina === 'cultura') {
    document.getElementById('secao-culturas').style.display = 'block';
  } else if (pagina === 'cultura') {
    document.getElementById('secao-receita').style.display = 'block';
  }
}

function mudarIdioma(idioma) {
  localStorage.setItem("idioma", idioma);
  let textos = {
    pt: { titulo: "Para onde deseja viajar?", placeholder: "Digite um país", botao: "Pesquisar", menuPais: "País", menuContinente: "Continente", menuCultura: "Cultura", menuReceita: "Ganancia" },
    en: { titulo: "Where do you want to travel?", placeholder: "Type a country", botao: "Search", menuPais: "Country", menuContinente: "Continent", menuCultura: "Culture", menuReceita: "Revenue"},
    es: { titulo: "¿A dónde quieres viajar?", placeholder: "Escriba un país", botao: "Buscar", menuPais: "País", menuContinente: "Continente", menuCultura: "Cultura", menuReceita: "Receita" }
  };
  let t = textos[idioma];
  document.getElementById('titulo').textContent = t.titulo;
  document.getElementById('busca').placeholder = t.placeholder;
  document.getElementById('botaoBusca').textContent = t.botao;
  document.getElementById('menuPais').textContent = t.menuPais;
  document.getElementById('menuContinente').textContent = t.menuContinente;
  document.getElementById('menuCultura').textContent = t.menuCultura;
  document.getElementById('menuReceita').textContent = t.menuCultura;
}

function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buscar() {
  let texto = removerAcentos(document.getElementById('busca').value.toLowerCase());

  document.getElementById('secao-destinos').style.display = 'block';
  document.getElementById('secao-viaje').style.display = 'block';
  document.getElementById('secao-culturas').style.display = 'block';
  document.getElementById('secao-receita').style.display = 'block';

  let cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    let nome = removerAcentos(card.querySelector('h3').textContent.toLowerCase());
    if (nome.includes(texto)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  ['secao-destinos', 'secao-viaje', 'secao-culturas'].forEach(function(secaoId) {
    let secao = document.getElementById(secaoId);
    let cardsVisiveis = secao.querySelectorAll('.card[style*="block"]');
    secao.style.display = cardsVisiveis.length > 0 ? 'block' : 'none';
  });
}

function verificarBusca() {
  let texto = document.getElementById('busca').value;
  if (texto === '') {
    document.getElementById('secao-destinos').style.display = 'block';
    document.getElementById('secao-viaje').style.display = 'block';
    document.getElementById('secao-culturas').style.display = 'block';
    document.getElementById('secao-receita').style.display = 'block';
    document.querySelectorAll('.card').forEach(function(card) {
      card.style.display = 'block';
    });
  }
}

window.onscroll = function() {
  let btn = document.getElementById('btnTopo');
  if (document.documentElement.scrollTop > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};

function alternarIdioma() {
    idiomaAtual = (idiomaAtual === "pt") ? "en" : "pt";
    var elementos = document.querySelectorAll('[data-i18n]');

    for (var i = 0; i < elementos.length; i++) {
      var chave = elementos[i].getAttribute('data-i18n');
      if (traducoes[idiomaAtual][chave]) {
        elementos[i].innerText = traducoes[idiomaAtual][chave];
    }
  }
}
function abrirModal(id) {
  document.getElementById('modal-' + id).style.display = 'block';
  window.scrollTo(0, 0);
}
function fecharModal(id) {
  document.getElementById('modal-' + id).style.display = 'none';
}
 var traducoesBrasil = {
    pt: {
      br_titulo: "Brasil",
      sub_dados: "Dados gerais",
      br_dados_txt: "O Brasil é o maior país da América do Sul e o quinto maior do mundo, com uma população de mais de 200 milhões de habitantes. Brasília é a capital federal, enquanto São Paulo é a maior cidade. É conhecido pela sua diversidade cultural, pela floresta amazônica e pelas praias paradisíacas.",
      br_cristo_sub: "Ponto turístico: Cristo Redentor",
      br_cristo_txt: "Um dos símbolos mais reconhecidos do mundo, localizado no topo do Morro do Corcovado no Rio de Janeiro, com 38 metros de altura. É uma das Sete Maravilhas do Mundo Moderno e recebe milhões de visitantes todos os anos.",
      br_feij_sub: "Culinária: Feijoada",
      br_feij_txt: "Prato nacional brasileiro, feito com feijão preto e diversos cortes de carne de porco, servido com arroz, couve refogada, farofa e laranja. Tradicional aos sábados, reúne família e amigos em torno da mesa.",
      btn_voltar: "← Voltar"
    },
    en: {
      br_titulo: "Brazil",
      sub_dados: "General information",
      br_dados_txt: "Brazil is the largest country in South America and the fifth largest in the world, with a population of over 200 million. Brasília is the federal capital, while São Paulo is the largest city. It is known for its cultural diversity, the Amazon rainforest, and its paradisiacal beaches.",
      br_cristo_sub: "Tourist attraction: Christ the Redeemer",
      br_cristo_txt: "One of the most recognized symbols in the world, located atop Corcovado Mountain in Rio de Janeiro, standing 38 meters tall. It is one of the Seven Wonders of the Modern World and receives millions of visitors every year.",
      br_feij_sub: "Cuisine: Feijoada",
      br_feij_txt: "A national Brazilian dish, made with black beans and various cuts of pork, served with rice, sautéed kale, farofa (toasted cassava flour), and orange. Traditionally eaten on Saturdays, it brings family and friends together around the table.",
      btn_voltar: "← Back"
    },
    es: {
      br_titulo: "",
      sub_dados: "",
      br_dados_txt: "",
      br_cristo_sub: "",
      br_cristo_txt: "",
      br_feij_sub: "",
      br_feij_txt: "",
      btn_voltar: "← Volver"
    }
  };


  var traducoesJapao = {
    pt: {
      jp_titulo: "Japão",
      sub_dados: "Dados gerais",
      jp_dados_txt: "Localizado no leste da Ásia, o Japão é um arquipélago desenvolvido e montanhoso com cerca de 126 milhões de habitantes. Tóquio é a capital e maior cidade, compondo a área metropolitana mais populosa do mundo. É uma monarquia constitucional, potência industrial focada em tecnologia e robótica.",
      jp_fuji_sub: "Ponto turístico: Monte Fuji",
      jp_fuji_txt: "É o pico mais alto e um dos símbolos mais icônicos do Japão. Localizado na ilha de Honshu, próximo a Tóquio, é um vulcão ativo, mas adormecido. É um local de grande beleza, atração turística para escaladas no verão e historicamente um lugar de adoração sagrada.",
      jp_tako_sub: "Culinária: Takoyaki",
      jp_tako_txt: "Popular petisco japonês em formato de bolinhas, recheado com pedaços de polvo, gengibre e cebolinha. Originário de Osaka, é grelhado em chapas especiais, finalizado com molho takoyaki, maionese, aonori e katsuobushi.",
      btn_voltar: "← Voltar"
    },
    en: {
      jp_titulo: "Japan",
      sub_dados: "General Information",
      jp_dados_txt: "Located in East Asia, Japan is a developed, mountainous archipelago with approximately 126 million inhabitants. Tokyo is the capital and largest city, comprising the most populous metropolitan area in the world. It is a constitutional monarchy, an industrial powerhouse focused on technology and robotics.",
      jp_fuji_sub: "Tourist Landmark: Mount Fuji",
      jp_fuji_txt: "It is the highest peak and one of the most iconic symbols of Japan. Located on the island of Honshu, near Tokyo, it is an active but dormant volcano. It is a place of great beauty, a tourist attraction for climbing in the summer and historically a place of sacred worship.",
      jp_tako_sub: "Cuisine: Takoyaki",
      jp_tako_txt: "A popular Japanese snack in the form of small balls, filled with pieces of octopus, ginger, and scallions. Originating in Osaka, it is grilled on special griddles and finished with takoyaki sauce, mayonnaise, aonori, and katsuobushi.",
      btn_voltar: "← Back"
    },
    es: {
      jp_titulo: "Japón",
      sub_dados: "Información general",
      jp_dados_txt: "Ubicado en el este de Asia, Japón es un archipiélago desarrollado y montañoso con aproximadamente 126 millones de habitantes. Tokio es la capital y la ciudad más grande, que comprende el área metropolitana más poblada del mundo. Es una monarquía constitucional, una potencia industrial centrada en la tecnología y la robótica.",
      jp_fuji_sub: "Atracción turística: Monte Fuji",
      jp_fuji_txt: "Es el pico más alto y uno de los símbolos más icónicos de Japón. Ubicado en la isla de Honshu, cerca de Tokio, es un volcán activo pero dormido. Es un lugar de gran belleza, atracción turística para escalar en verano e históricamente un lugar de adoración sagrada.",
      jp_tako_sub: "Gastronomía: Takoyaki",
      jp_tako_txt: "Un popular aperitivo japonés en forma de bolitas, relleno de trozos de pulpo, jengibre y cebolleta. Originario de Osaka, se asa en planchas especiales y se termina con salsa takoyaki, mayonesa, aonori y katsuobushi.",
      btn_voltar: "← Volver"
    }
  };

  var traducoesColombia = {
    pt: {
      cl_titulo: "Colômbia",
      sub_dados: "Dados gerais",
      cl_dados_txt: "A Colômbia é um país localizado no noroeste da América do Sul, conhecido por sua grande diversidade cultural, natural e gastronômica. Sua capital é Bogotá, um importante centro econômico, político e cultural do país.",
      cl_cart_sub: "Ponto turístico: Cartagena",
      cl_col_txt: "O território colombiano possui paisagens muito variadas, que incluem praias no Mar do Caribe, montanhas da Cordilheira dos Andes, florestas tropicais e cidades cheias de história. Além disso, o país é mundialmente conhecido pela produção de café de alta qualidade, considerado um dos melhores do mundo.",
      cl_cult_sub: "cultura - Melhor época para viajar para a Colômbia",
      cl_colo_txt: "A Colômbia pode ser visitada em qualquer época do ano, pois possui clima tropical com temperaturas relativamente estáveis. No entanto, algumas épocas podem ser mais vantajosas! Sendo as principais épocas para festas: Fevereiro (Carnaval de Barranquilla) e Agosto (Feira das Flores em Medellín).",
      cl_culi_sub: "Culinária da Colômbia",
      cl_culi_txt: "A culinária colombiana é resultado da mistura de culturas indígenas, espanholas e africanas. Os pratos costumam usar ingredientes como milho, arroz, feijão, carnes, batata, banana-da-terra e frutas tropicais. Entre as comidas mais conhecidas estão: Bandeja Paisa, Arepas e Ajiaco.",
      btn_voltar: "← Voltar"
    },
    en: {
      cl_titulo: "Colombia",
      sub_dados: "General Information",
      cl_dados_txt: "Colombia is a country located in northwestern South America, with coastlines on the Pacific Ocean and the Caribbean Sea. With approximately 50 million inhabitants, Bogotá is its capital, an important economic, political and cultural center of the country.",
      cl_cart_sub: "Tourist spot: Cartagena",
      cl_colo_txt: "",
      cl_cult_sub: "",
      cl_colo_txt: "",
      cl_culi_sub: "",
      cl_culi_txt: "",
      btn_voltar: "← Back"
    },
    es: {
      cl_titulo: "",
      sub_dados: "",
      cl_dados_txt: "",
      cl_cart_sub: "",
      cl_col_txt: "",
      cl_cult_sub:"",
      cl_colo_txt: "",
      cl_culi_sub: "",
      cl_culi_txt: "",
      btn_voltar: "← Volver"
    }
  };
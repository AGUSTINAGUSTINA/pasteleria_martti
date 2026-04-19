//---------------- Archivo search.js cargado
console.log("Buscador de Pasteleria Martti");

//---------------- Normalizacion de texto para busqueda
function normalizarTexto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

//---------------- Base y catalogo

//FUNCION PARA OBTENER LA BASE DEL PROYECTO, UTILIZADA PARA CONSTRUIR RUTAS RELATIVAS A IMAGENES Y PAGINAS DE PRODUCTOS
function obtenerBaseProyecto() {
  let script = document.querySelector('script[src$="js/search.js"]');
  if (!script) return "";
  return script.getAttribute("src").replace(/js\/search\.js$/, "");
}

//FUNCION PARA OBTENER LAS CATEGORIAS DEL CATALOGO
function obtenerCategoriasCatalogo() {
  if (typeof pasteleriaMartti === "undefined" || !pasteleriaMartti.productos) {
    return [];
  }

  return Object.keys(pasteleriaMartti.productos);
}

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS
function obtenerTodosLosProductos() {
  let categorias = obtenerCategoriasCatalogo();
  let productos = [];

  categorias.forEach(function (categoria) {
    let lista = pasteleriaMartti.productos[categoria] || [];

    lista.forEach(function (producto) {
      productos.push({
        nombre: producto.nombre,
        precio: Number(producto.precio) || 0,
        categoria: categoria
      });
    });
  });

  return productos;
}

//---------------- Busqueda

//FUNCION PARA BUSCAR POR CATEGORIA, COMPARANDO EL TERMINO DE BUSQUEDA CON LOS NOMBRES DE LAS CATEGORIAS Y RETORNANDO LOS RESULTADOS EN UN FORMATO UNIFICADO
function buscarPorCategoria(busqueda) {
  let termino = normalizarTexto(busqueda);
  let categorias = obtenerCategoriasCatalogo();

  return categorias
    .filter(function (categoria) {
      return normalizarTexto(categoria).includes(termino);
    })
    .map(function (categoria) {
      return {
        tipo: "categoria",
        nombre: categoria,
        categoria: categoria
      };
    });
}

//FUNCION PARA BUSCAR POR NOMBRE, COMPARANDO EL TERMINO DE BUSQUEDA CON LOS NOMBRES DE LOS PRODUCTOS Y RETORNANDO LOS RESULTADOS EN UN FORMATO UNIFICADO
function buscarPorNombre(busqueda) {
  let termino = normalizarTexto(busqueda);
  let productos = obtenerTodosLosProductos();

  return productos
    .filter(function (producto) {
      return normalizarTexto(producto.nombre).includes(termino);
    })
    .map(function (producto) {
      return {
        tipo: "producto",
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria
      };
    });
}


//FUNCION PARA COMBINAR LAS LISTAS DE RESULTADOS EN UNA SOLA LISTA SIN DUPLICADOS
function combinarSinDuplicados(listas) {
  let mapa = {};
  listas.forEach(function (lista) {
    lista.forEach(function (item) {
      let key = normalizarTexto(item.tipo + "::" + item.nombre + "::" + item.categoria);
      mapa[key] = item;
    });
  });
  return Object.values(mapa);
}


//FUNCION PARA OBTENER LOS RESULTADOS DE LA BUSQUEDA
function obtenerResultadosBusqueda(termino) {
  return combinarSinDuplicados([
    buscarPorCategoria(termino),
    buscarPorNombre(termino)
  ]);
}

//---------------- Rutas e imagenes

//FUNCION PARA OBTENER LA RUTA DE LA CATEGORIA
function obtenerRutaCategoria(categoria) {
  let base = obtenerBaseProyecto();
  let mapa = {
    tartas: "pages/productos.html",
    tortas: "pages/productos.html",
    postres: "pages/productos.html",
    otros: "pages/productos.html"
  };

  return base + (mapa[categoria] || "pages/productos.html");
}

//FUNCION PARA OBTENER LA RUTA DEL PRODUCTO
function obtenerRutaProducto(item) {
  let base = obtenerBaseProyecto();
  let key = normalizarTexto(item.nombre);
  let mapa = {
    "tarta de peras con nueces y almendras": "pages/products/tartas/tarta-peras.html",
    "key lime pie": "pages/products/tartas/key-lime-pie.html",
    "tarta de frutal": "pages/products/tartas/pavlova.html",
    "maracuya pie": "pages/products/tartas/maracuya-pie.html",
    "tarta cabsha": "pages/products/tartas/cabsha.html",
    "tarta de chocolate y naranja": "pages/products/tartas/tarta-choco-naranja.html",
    "tarta de coco": "pages/products/tartas/tarta-coco.html",
    "lemon pie": "pages/products/tartas/lemon-pie.html",

    "torta mousse de chocolate": "pages/products/tortas/torta-mousse-de-chocolate.html",
    "chocotorta": "pages/products/tortas/torta-chocotorta.html",
    "cheesecake frutos rojos": "pages/products/tortas/torta-cheesecake-frutos-rojos.html",
    "torta oreo": "pages/products/tortas/torta-oreo.html",
    "torta decorada": "pages/products/tortas/torta-decorada.html",
    "torta matilda blanca": "pages/products/tortas/torta-matilda-blanca.html",
    "carrot cake": "pages/products/tortas/torta-carrot-cake.html",
    "torta brownie": "pages/products/tortas/torta-brownie.html",
    "rogel": "pages/products/postres/rogel.html",
    "tiramisu": "pages/products/postres/tiramisu.html",
    "pavlova": "pages/products/postres/pavlova.html",
    "blondie de frutos rojos": "pages/products/postres/blondie-fr.html",
    "marquise clasica": "pages/products/postres/marquise.html",
    "nube de nuez": "pages/products/postres/nube-de-nuez.html",
    "muffins frutos rojos": "pages/products/categorias/muffins.html",
    "petit fours": "pages/products/mini-delicias/petit-fours.html",
    "huevo de pascua": "pages/products/categorias/huevo-pascua.html",
    "huevo de pascua franui": "pages/products/categorias/huevo-pascua/h-franui.html",
    "huevo de pascua oreo": "pages/products/categorias/huevo-pascua/h-oreo.html",
    "huevo de pascua pistacho": "pages/products/categorias/huevo-pascua/h-pistacho.html",
    "huevo de pascua tiramisu": "pages/products/categorias/huevo-pascua/h-tiramisu.html",
    "pan dulce": "pages/products/categorias/pan-dulce.html",
    "pan dulce dubai": "pages/products/categorias/pan-dulce/pan-dulce-dubai.html",
    "pan dulce nutella": "pages/products/categorias/pan-dulce/pan-dulce-nutella.html",
    "cookies new york": "pages/products/categorias/cookies/cookie-ny.html",
    "cookies red velvet": "pages/products/categorias/cookies.html",
    "chipa": "pages/products/categorias/chipa.html",
    "tableta de chocolate dubai": "pages/products/categorias/tabletas-chocolate/choco-dubai.html",
    "tableta de chocolate con almendras": "pages/products/categorias/tabletas-chocolate/choco-almound.html",
    "tableta de chocolate blanco con oreo": "pages/products/categorias/tabletas-chocolate/choco-oreo.html",
    "alfajores dubai": "pages/products/categorias/alfajores/alf-dubai.html",
    "alfajores dulce de leche y nuez": "pages/products/categorias/alfajores/alf-nuez.html",
    "alfajores de maicena": "pages/products/alfajores/alf-maicena.html",
    "box desayuno sorpresa": "pages/products/box/box-desayuno-sorpresa.html",
    "box navidad": "pages/products/box/box-navidad.html",
    "box porciones de torta": "pages/products/box/box-porciones-de-torta.html",
    "box alfajores": "pages/products/box/box-alfajores.html",
    "lingotes": "pages/products/mini-delicias/lingotes.html",
    "mini tartas": "pages/products/mini-delicias/mini-tartas.html",
    "mini tarta": "pages/products/mini-delicias/mini-tartas.html"
  };

  if (mapa[key]) return base + mapa[key];
  return obtenerRutaCategoria(item.categoria);
}

// FUNCION PARA OBTENER LA IMAGEN DEL PRODUCTO
function obtenerImagenProducto(item) {
  let base = obtenerBaseProyecto();
  let key = normalizarTexto(item.nombre);
  let mapa = {
    "tarta de peras con nueces y almendras": "assets/product/tartas/tarta-peras/tarta-pera.png",
    "key lime pie": "assets/product/tartas/key-lime-pie/key-lime-pie.jpg",
    "tarta de frutal": "assets/product/tartas/tarta-frutal/tarta-frutal.jpg",
    "maracuya pie": "assets/product/tartas/maracuya-pie/maracuya-pie.jpg",
    "tarta cabsha": "assets/product/tartas/cabsha.png",
    "tarta de chocolate y naranja": "assets/product/tartas/tarta-choco-naranja/torta-naranjaychoco-zoom.png",
    "tarta de coco": "assets/product/tartas/tarta-coco/coco-dulce-de-leche.png",
    "lemon pie": "assets/product/tartas/lemon-pie/lemon-pie.png",
    "Tableta de chocolate": "assets/product/tableta-chocolate/choco-dubai3.png",
    "tableta de chocolate dubai": "assets/product/tableta-chocolate/choco-dubai3.png",
    "tableta de chocolate con almendras": "assets/product/tableta-chocolate/choco-almound3.png",
    "tableta de chocolate blanco con oreo": "assets/product/tableta-chocolate/chocoreo2.png",
    "torta mousse de chocolate": "assets/product/tortas/Torta-mousse-de-chocolate/torta-mousse.png",
    "chocotorta": "assets/product/tortas/chocotorta/chocotorta.jpg",
    "cheesecake frutos rojos": "assets/product/tortas/Cheesecake-fr/cheesecake.png",
    "torta oreo": "assets/product/tortas/torta-oreo/torta-oreo.png",
    "torta decorada": "assets/product/tortas/torta-decorada/torta-deco-1.png",
    "torta matilda blanca": "assets/product/tortas/matilda-blanca/torta-matilda.jpg",
    "carrot cake": "assets/product/tortas/carrot-cake/carrot-cake.jpg",
    "torta brownie": "assets/product/tortas/torta-brownie/torta-brownie.jpg",
    "rogel": "assets/product/postres/rogel/rogel.jpg",
    "tiramisu": "assets/product/postres/tiramisu/tiramisu.jpg",
    "pavlova": "assets/product/postres/pavlova.png",
    "blondie": "assets/product/postres/blondie/blondies.png",
    "marquise clasica": "assets/product/postres/marquise.png",
    "nube de nuez": "assets/product/postres/nube-nuez/nube-de-nuez.png",

    "muffins frutos rojos": "assets/product/muffins/mufin1.png",
    "petit fours": "assets/product/mini-delicias/petit-fours.jpg",
    "huevo de pascua": "assets/product/huevos-pascua.png",
    "huevo de pascua franui": "assets/product/huevos-pascua/h-franui1.png",
    "huevo de pascua oreo": "assets/product/huevos-pascua/h-oreo1.png",
    "huevo de pascua pistacho": "assets/product/huevos-pascua/h-pistacho1.png",
    "huevo de pascua tiramisu": "assets/product/huevos-pascua/h-tiramisu1.png",
    "pan dulce": "assets/product/pan-dulce.jpg",
    "pan dulce dubai": "assets/product/pan-dulce/pan-dulce-dubai/pan-dulce-dubai.jpg",
    "pan dulce nutella": "assets/product/pan-dulce/pan-dulce-nutella/pan-dulce-nutella.jpg",
    "cookies new york": "assets/product/cookies/cookie-ny.png",
    "cookies red velvet": "assets/product/cookies/cookie-rv.png",
    "cookies": "assets/product/cookies-cortada.png",
    "chipa": "assets/product/chipa.png",
    "alfajores dubai": "assets/product/alfajores/alf-dubai/alfajor-dubai-cortado.png",
    "alfajores dulce de leche y nuez": "assets/product/alfajores/alf-nuez/alf-nuez-cortado.png",
    "alfajores de maicena": "assets/product/alfajores/alf-maicena/alf-maicena-cortado.png",
    "box desayuno sorpresa": "assets/product/box/box-desayuno-sorpresa/desayuno-sorpresa.jpg",
    "box navidad": "assets/product/box/box-navidad/opcion1/box-navidad1.jpg",
    "box porciones de torta": "assets/product/box/box-porciones-torta/box-por-tort1.jpg",
    "box alfajores": "assets/product/box/box-alfajores/box-alf1.jpg",
    "lingotes": "assets/product/mini-delicias/lingote-zoom.jpg",
    "mini tartas": "assets/product/mini-delicias/mini-tarta-zoom.jpg",
    "mini tarta": "assets/product/mini-delicias/mini-tarta-zoom.jpg"
  };
  return mapa[key] ? base + mapa[key] : "";
}

// FUNCION PARA OBTENER LA IMAGEN DE LA CATEGORIA
function obtenerImagenCategoria(categoria) {
  let base = obtenerBaseProyecto();
  let mapa = {
    tartas: "assets/product/tartas.png",
    tortas: "assets/product/tartas.png",
    postres: "assets/product/tartas.png",
    otros: "assets/product/mini-delicias.png"
  };
  return mapa[categoria] ? base + mapa[categoria] : "";
}

//---------------- Render en pagina

// FUNCION PARA RENDERIZAR LOS RESULTADOS DE LA BUSQUEDA EN FORMATO DE CARDS DENTRO DE LA GRILLA DE PRODUCTOS
function obtenerContenedorResultados() {
  return document.querySelector(".products-grid-category, .product-grid");
}

let htmlOriginalGrid = null;


function renderizarResultadosEnCards(resultados, termino) {
  let grid = obtenerContenedorResultados();
  if (!grid) return;

  if (!termino) {
    if (htmlOriginalGrid !== null) {
      grid.innerHTML = htmlOriginalGrid;
    }
    return;
  }

  if (!resultados.length) {
    grid.innerHTML = '<p class="search-empty">No se encontraron resultados.</p>';
    return;
  }

  let html = resultados
    .slice(0, 12)
    .map(function (item) {
      if (item.tipo === "categoria") {
        return (
          '<a href="' + obtenerRutaCategoria(item.categoria) + '" class="product-link">' +
          '<article class="product-card-category" data-name="' + item.categoria + '">' +
          "<h3>" + item.nombre + "</h3>" +
          "</article>" +
          "</a>"
        );
      }

      let imagen = obtenerImagenProducto(item);
      let imgHtml = imagen ? '<img src="' + imagen + '" alt="' + item.nombre + '">' : "";

      return (
        '<a href="' + obtenerRutaProducto(item) + '" class="product-link">' +
        '<article class="product-card" data-name="' + item.nombre + '">' +
        '<div class="product-label">' + item.nombre + "</div>" +
        imgHtml +
        "<p>$" + item.precio + " (" + item.categoria + ")</p>" +
        "</article>" +
        "</a>"
      );
    })
    .join("");

  grid.innerHTML = html;
}

//---------------- Drawer de busqueda

// FUNCION PARA CREAR EL DRAWER DE BUSQUEDA, CON SU ESTRUCTURA HTML Y EVENTOS DE CIERRE
function crearDrawerBusqueda() {
  let overlay = document.createElement("div");
  overlay.className = "search-drawer-overlay";

  let drawer = document.createElement("aside");
  drawer.className = "search-drawer";
  drawer.innerHTML =
    '<button type="button" class="search-drawer-close" aria-label="Cerrar">&times;</button>' +
    '<h2 class="search-drawer-title">Busqueda</h2>' +
    '<div class="search-pill search-drawer-pill">' +
    '<input type="search" class="search-input search-drawer-input" placeholder="Buscar productos o categorias..." aria-label="Buscar productos o categorias">' +
    '<button type="button" class="search-button search-drawer-button" aria-label="Buscar">' +
    '<svg class="icon-search" viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="7"></circle>' +
    '<line x1="16.5" y1="16.5" x2="21" y2="21"></line>' +
    "</svg>" +
    "</button>" +
    "</div>" +
    '<p class="search-drawer-count">0 opciones</p>' +
    '<div class="search-drawer-results"></div>';

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  return {
    overlay: overlay,
    drawer: drawer,
    closeBtn: drawer.querySelector(".search-drawer-close"),
    input: drawer.querySelector(".search-drawer-input"),
    count: drawer.querySelector(".search-drawer-count"),
    results: drawer.querySelector(".search-drawer-results")
  };
}


// FUNCION PARA RENDERIZAR LOS RESULTADOS DE LA BUSQUEDA DENTRO DEL DRAWER, CON MINI CARDS Y ENLACES A PRODUCTOS Y CATEGORIAS
function renderizarResultadosEnDrawer(ui, resultados, termino) {
  if (!ui) return;

  if (!termino) {
    ui.count.textContent = "0 opciones";
    ui.results.innerHTML = "";
    return;
  }

  ui.count.textContent = resultados.length + " opciones";

  if (!resultados.length) {
    ui.results.innerHTML = '<p class="search-empty">No se encontraron resultados.</p>';
    return;
  }

  ui.results.innerHTML = resultados
    .slice(0, 20)
    .map(function (item) {
      if (item.tipo === "categoria") {
        let img = obtenerImagenCategoria(item.categoria);
        return (
          '<a class="search-drawer-item" href="' + obtenerRutaCategoria(item.categoria) + '">' +
          '<div class="search-drawer-thumb">' + (img ? '<img src="' + img + '" alt="' + item.nombre + '">' : "") + "</div>" +
          '<div class="search-drawer-meta">' +
          '<h4>' + item.nombre + "</h4>" +
          "<p>Ver categoria</p>" +
          "</div>" +
          "</a>"
        );
      }

      let imgProducto = obtenerImagenProducto(item);
      return (
        '<a class="search-drawer-item" href="' + obtenerRutaProducto(item) + '">' +
        '<div class="search-drawer-thumb">' + (imgProducto ? '<img src="' + imgProducto + '" alt="' + item.nombre + '">' : "") + "</div>" +
        '<div class="search-drawer-meta">' +
        "<h4>" + item.nombre + "</h4>" +
        "<p>Desde: $" + item.precio + "</p>" +
        "</div>" +
        "</a>"
      );
    })
    .join("");
}

//---------------- Inicializacion

// FUNCION PARA INICIALIZAR EL BUSCADOR DESDE EL DOM
function inicializarBuscadorDOM() {
  let input = document.querySelector(".search-input");
  let searchPill = document.querySelector(".search-pill");
  if (!input || !searchPill) return;

  let ui = crearDrawerBusqueda();
  let abierta = false;


  // FUNCION PARA ABRIR EL DRAWER DE BUSQUEDA, CON UN VALOR INICIAL EN EL INPUT Y EJECUTANDO LA BUSQUEDA CORRESPONDIENTE
  function abrirDrawer(valorInicial) {
    if (!abierta) {
      ui.overlay.classList.add("is-open");
      document.body.classList.add("search-drawer-open");
      abierta = true;
    }
    ui.input.value = valorInicial || "";
    ejecutarBusqueda(ui.input.value);
    setTimeout(function () { ui.input.focus(); }, 0);
  }

  // FUNCION PARA CERRAR EL DRAWER
  function cerrarDrawer() {
    ui.overlay.classList.remove("is-open");
    document.body.classList.remove("search-drawer-open");
    abierta = false;
  }

  // FUNCION PARA EJECUTAR LA BUSQUEDA
  function ejecutarBusqueda(valor) {
    let termino = normalizarTexto(valor);
    let resultados = obtenerResultadosBusqueda(termino);
    renderizarResultadosEnDrawer(ui, resultados, termino);
  }

  input.addEventListener("focus", function () {
    abrirDrawer(input.value);
  });

  input.addEventListener("input", function () {
    if (!abierta) abrirDrawer(input.value);
    ejecutarBusqueda(input.value);
  });

  let form = searchPill.tagName === "FORM" ? searchPill : null;
  let boton = searchPill.querySelector(".search-button");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      abrirDrawer(input.value);
    });
  }

  if (boton) {
    boton.addEventListener("click", function (e) {
      e.preventDefault();
      abrirDrawer(input.value);
    });
  }

  ui.input.addEventListener("input", function (e) {
    ejecutarBusqueda(e.target.value);
  });

  ui.input.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    let first = ui.results.querySelector(".search-drawer-item");
    if (first) first.click();
  });

  ui.closeBtn.addEventListener("click", cerrarDrawer);
  ui.overlay.addEventListener("click", function (e) {
    if (e.target === ui.overlay) cerrarDrawer();
  });
}

//---------------- Inicializacion al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarBuscadorDOM);

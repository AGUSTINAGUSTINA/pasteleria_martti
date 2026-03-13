// SEARCH.JS

//PUNTO DE PARTIDA DEL BUSCADOR MOSTRADO POR CONSOLA
console.log("Buscador de Pasteleria Martti");
//Lo muestro por consola para verificar que el archivo se esta cargando correctamente.

/*
En este archivo muestro el flujo de busqueda en el DOM:
Entrada: lo que el usuario escribe en el buscador.
Proceso: se normaliza el texto y se ejecuta la busqueda por categoria y por nombre.
Salida: se muestran los resultados de busqueda en el DOM (cards o drawer y modal).
*/


//FUNCIONES DE NORMALIZACION DE TEXTO 
/*
Utilice esta funcion porque al simular una busqueda como un usuario, me di cuenta que
un usuario podria escribir "chipa" en vez de "Chipa" que es como lo tengo escrito en 
mi array. Al normalizar el texto evito fricciones en la busqueda.
En la entrega anterior ya habia utilizado la normalizacion de texto pero agregue 
algunos metodos adicionales para mejorar la experiencia de busqueda.
*/

function normalizarTexto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/*
Entrada: texto (string).
Proceso: normaliza el texto para evitar errores por mayusculas, acentos o espacios.
Salida: texto normalizado (string).
*/

/*

UTILICE ESTOS METODOS DE STRING QUE FIGURAN EN LA DOCUMENTACION DE MDN:
- normalize("NFD": para descomponer caracteres acentuados en su forma base + acento.
- replace(/[\u0300-\u036f]/g, ""): para eliminar los caracteres de acento resultantes.
- toLowerCase(): para convertir todo a minusculas y evitar problemas de mayusculas/minusculas.
- trim(): para eliminar espacios en blanco al inicio y al final del texto.

*/

//aQUI YA EMPIEZA EL CODIGO DEL BUSCADOR EN SI APLICANDO MODIFICACION DEL DOM.

//FUNCION PARA OBTENER LA RUTA BASE DEL PROYECTO
/* 
Para Obtener la ruta base del proyecto para construir enlaces correctos desde 
cualquier pagina, utilice la siguiente funcion: 
*/
function obtenerBaseProyecto() {
  let script = document.querySelector('script[src$="js/search.js"]');
  if (!script) return "";
  return script.getAttribute("src").replace(/js\/search\.js$/, "");
}

/*
Entrada: no recibe parametros.
Proceso: busca el script de search.js y calcula la ruta base.
Salida: ruta base como string.
*/

/*
Esta funcion me permite calcular la ruta base del proyecto segun desde que pagina se cargo
search.js:
1) Busca la etiqueta <script> que carga js/search.js.
2) Obtiene el atributo src de esa etiqueta.
3) Reemplaza "js/search.js" con "". Esto devuelve la ruta base del proyecto, 
como "https://www.pasteleriamartti.com/" o "../" dependiendo de la ubicacion de la pagina.

- querySelector es un metodo del DOM, que segun la documentacion MDN, devuelve el 
primer elemento que coincide con el selector CSS. En este caso, busca un elemento 
<script> cuyo atributo src termine con "js/search.js". Esto es util para encontrar la 
ruta correcta del proyecto sin importar desde que pagina se cargue el script.

- getAttribute es un metodo del DOM que obtiene el valor de un atributo de un elemento 
del DOM. En este caso, obtiene el valor del atributo src de la etiqueta <script> encontrada

- replace es un metodo de las cadenas de texto que reemplaza una parte de la cadena con 
otra. En este caso, reemplaza "js/search.js" con "". Esto devuelve la ruta base del 
proyecto, como "https://www.pasteleriamartti.com/" o "../" dependiendo de la ubicacion 
de la pagina.
*/


//FUNCION PARA OBTENER LAS CATEGORIAS
/*
defini la funcion mostrarCategorias() para obtener las categorias disponibles de la 
pasteleria antes de ejecutar la busqueda.
primero verifico que el objeto pasteleriaMartti exista y que tambien tenga la propiedad 
productos antes de intentar usarlo. Si alguno de esos datos no esta disponible, la funcion 
devuelve un array vacio para evitar que el codigo se rompa.
*/


function mostrarCategorias() {
  if (typeof pasteleriaMartti === "undefined" || !pasteleriaMartti.productos) {
    return [];
  }

  return Object.keys(pasteleriaMartti.productos);
}

/*
Entrada: no recibe parametros.
Proceso: valida que exista pasteleriaMartti y devuelve sus categorias.
Salida: array de categorias (strings).
*/

/*
- Object.keys() devuelve las claves del objeto productos, que en este caso son las
categorias del catalogo (ej: tartas, tortas, postres, otros).
-> Esta funcion es la base para la busqueda por categoria.

- typeof (segun MDN) devuelve el tipo de dato de una variable.Lo utilice para verificar
 si pasteleriaMartti existe. Si no existe o no tiene productos, devuelvo un array vacio,
lo que indica que no hay categorias disponibles.
*/

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS DE TODAS LAS CATEGORIAS

/*En esta funcion obtenerTodosLosProductos() arme un listado general con todos los 
productos del proyecto, sin importar su categoria. Primero invoco la funcion 
mostrarCategorias() para obtener las categorias disponibles y creo un array vacio productos
donde se va a guardar el resultado final.
*/

function obtenerTodosLosProductos() {
  let categorias = mostrarCategorias();
  let productos = [];
/*
- forEach: lo uso para recorrer cada categoria. En cada vuelta accedo a su lista de 
productos con:pasteleriaMartti.productos[categoria] OR []
- || []: lo aplico como respaldo por si una categoria no tiene productos, asi no se rompe 
el recorrido.
 */
  categorias.forEach(function (categoria) {
    let lista = pasteleriaMartti.productos[categoria] || [];
/*
Dentro de esa lista vuelvo a usar forEach para recorrer producto por producto, y con push 
agrego al array final un nuevo objeto con:
- nombre
- precio (convertido a numero con Number, y si falla queda 0)
- categoria (para saber a que grupo pertenece)
*/
    
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

/*
Entrada: no recibe parametros.
Proceso: recorre todas las categorias y arma un array con todos los productos.
Salida: array de productos con nombre, precio y categoria.
*/


// FUNCION DE BSUQUEDA POR CATEGORIA 

/*
implemente la busqueda de categorias segun lo que escribe el usuario en el buscador.
1) normalizo el texto de busqueda para evitar problemas con mayusculas, acentos o espacios.
2) Obtengo la lista de categorias disponibles con mostrarCategorias().
- filter: lo uso para quedarme solo con las categorias que incluyen el texto de busqueda 
(tambien normalizado).
- map: lo uso para transformar cada categoria encontrada en un objeto con tipo "categoria", su nombre y su categoria (que en este caso es lo mismo que el nombre).
*/
function buscarPorCategoria(busqueda) {
  let termino = normalizarTexto(busqueda);
  let categorias = mostrarCategorias();

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

/*
Entrada: busqueda (string).
Proceso: normaliza el texto y filtra categorias que coincidan.
Salida: array de objetos con tipo categoria.
*/

/*
Aqui utilice:
- filter: que es un metodo de las cadenas de texto que devuelve un nuevo array con los 
elementos del array original que cumplen una condicion especifica. En este caso, se 
utiliza para quedarme solo con las categorias que incluyan el texto de busqueda 
(tambien normalizado).

- includes: que es un metodo string lo uso para verificar si la categoria actual 
incluye el texto de busqueda

- map: lo uso para transformar cada categoria encontrada en un objeto con tipo "categoria", 
su nombre y su categoria.
*/

// FUNCION DE BUSQUEDA POR NOMBRE

/*
implemente la busqueda por nombre de producto de forma similar a la de categorias, 
pero esta vez se utilizo el array de productos que contiene el listado completo de 
productos obtenido con obtenerTodosLosProductos().
- filter: lo uso para quedarme solo con los productos cuyo nombre incluye el texto de 
busqueda (tambien normalizado).
- map: lo uso para transformar cada producto encontrado en un objeto con tipo "producto", 
su nombre, precio y categoria.
*/
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

/*
Entrada: busqueda (string).
Proceso: normaliza el texto y filtra productos que coincidan.
Salida: array de objetos con tipo producto.
*/
// FUNCIONES PARA OBTENER LAS RUTAS DE CATEGORIAS Y PRODUCTOS

/*
Para construir los enlaces correctos a las paginas de categorias y productos, defini 
las funciones rutaCategoria() y rutaProducto() que utilizan la funcion obtenerBaseProyecto() 
para calcular la ruta base del proyecto y luego agregan la ruta especifica segun la categoria 
o el producto.
- En rutaCategoria(), se utiliza un mapa de categorias a rutas especificas. Si la categoria no 
esta en el mapa, se devuelve una ruta generica a productos.
- En rutaProducto(), se utiliza un mapa de nombres de productos normalizados a rutas especificas. Si el producto no esta en el mapa, se llama a rutaCategoria() para obtener la ruta de su categoria como respaldo.
*/

function rutaCategoria(categoria) {
  let base = obtenerBaseProyecto();
  let mapa = {
    tartas: "pages/productos.html",
    tortas: "pages/productos.html",
    postres: "pages/productos.html",
    otros: "pages/productos.html"
  };

  return base + (mapa[categoria] || "pages/productos.html");
}

/*
Entrada: categoria (string).
Proceso: busca la ruta en el mapa o usa una ruta generica.
Salida: ruta completa como string.
*/

/*
Esta funcion me permite calcular la ruta base del proyecto segun desde que pagina se cargo
search.js:
1) Busca la etiqueta <script> que carga js/search.js.
2) Obtiene el atributo src de esa etiqueta.
3) Reemplaza "js/search.js" con "". Esto devuelve la ruta base del proyecto, 
como "https://www.pasteleriamartti.com/" o "../" dependiendo de la ubicacion de la pagina.

- querySelector es un metodo del DOM, que segun la documentacion MDN, devuelve el 
primer elemento que coincide con el selector CSS. En este caso, busca un elemento 
<script> cuyo atributo src termine con "js/search.js". Esto es util para encontrar la 
ruta correcta del proyecto sin importar desde que pagina se cargue el script.

- getAttribute es un metodo del DOM que obtiene el valor de un atributo de un elemento 
del DOM. En este caso, obtiene el valor del atributo src de la etiqueta <script> encontrada

- replace es un metodo de las cadenas de texto que reemplaza una parte de la cadena con 
otra. En este caso, reemplaza "js/search.js" con "". Esto devuelve la ruta base del 
proyecto, como "https://www.pasteleriamartti.com/" o "../" dependiendo de la ubicacion 
de la pagina.
*/


//FUNCION PARA OBTENER LA RUTA DE UN PRODUCTO (las dividí nombrando las categorias para no olvidarme de ninguna)
function rutaProducto(item) {
  let base = obtenerBaseProyecto();
  let key = normalizarTexto(item.nombre);
  let mapa = {
    // Tartas
    "tarta de peras con nueces y almendras": "pages/products/tartas/tarta-peras.html",
    "key lime pie": "pages/products/tartas/key-lime-pie.html",
    "tarta de frutal": "pages/products/tartas/pavlova.html",
    "maracuya pie": "pages/products/tartas/maracuya-pie.html",
    "tarta cabsha": "pages/products/tartas/cabsha.html",
    "tarta de chocolate y naranja": "pages/products/tartas/tarta-choco-naranja.html",
    "tarta de coco": "pages/products/tartas/tarta-coco.html",
    "lemon pie": "pages/products/tartas/lemon-pie.html",

    // Tortas
    "torta mousse de chocolate": "pages/products/tortas/torta-mousse-de-chocolate.html",
    "chocotorta": "pages/products/tortas/torta-chocotorta.html",
    "cheesecake frutos rojos": "pages/products/tortas/torta-cheesecake-frutos-rojos.html",
    "torta oreo": "pages/products/tortas/torta-oreo.html",
    "torta decorada": "pages/products/tortas/torta-decorada.html",
    "torta matilda blanca": "pages/products/tortas/torta-matilda-blanca.html",
    "carrot cake": "pages/products/tortas/torta-carrot-cake.html",
    "torta brownie": "pages/products/tortas/torta-brownie.html",

    // Postres
    "rogel": "pages/products/postres/rogel.html",
    "tiramisu": "pages/products/postres/tiramisu.html",
    "pavlova": "pages/products/postres/pavlova.html",
    "blondie": "pages/products/postres/blondie-fr.html",
    "marquise clasica": "pages/products/postres/marquise.html",
    "nube de nuez": "pages/products/postres/nube-de-nuez.html",

    // Otros
    "muffins frutos rojos": "pages/products/categorias/muffins.html",
    "petit fours": "pages/products/mini-delicias/petit-fours.html",
    "huevos de pascua": "pages/products/categorias/huevos-pascua.html",
    "pan dulce": "pages/products/categorias/pan-dulce.html",
    "cookies new york": "pages/products/categorias/cookies.html",
    "cookies red velvet": "pages/products/categorias/cookies.html",
    "chipa": "pages/products/categorias/chipa.html",
    "tableta de chocolate dubai": "pages/products/categorias/tableta-chocolate.html",
    "alfajores dubai": "pages/products/categorias/alfajor.html",
    "alfajores dulce de leche y nuez": "pages/products/categorias/alfajor.html",
    "alfajores de maicena": "pages/products/categorias/alfajor.html",
    "desayuno sorpresa": "pages/products/categorias/box.html",
    "box dia de la madre": "pages/products/categorias/box.html",
    "box dia del padre": "pages/products/categorias/box.html",
    "box navidad": "pages/products/categorias/box.html",
    "box dia del nino": "pages/products/categorias/box.html",
    "box porciones de torta": "pages/products/categorias/box.html",
    "box alfajores": "pages/products/categorias/box.html",
    "lingotes": "pages/products/mini-delicias/lingotes.html",
    "mini tartas": "pages/products/mini-delicias/mini-tartas.html",
    "mini tarta": "pages/products/mini-delicias/mini-tartas.html"
  };

  if (mapa[key]) return base + mapa[key];
  return rutaCategoria(item.categoria);
}
/*
Entrada: producto (objeto con nombre y categoria).
Proceso: busca la ruta del producto en el mapa.
Salida: ruta completa como string.
*/
/*
Al igual que en rutaCategoria(), se obtiene la ruta base del proyecto y se define un mapa que 
relaciona nombres de productos normalizados con rutas especificas. Si el producto no se encuentra 
en el mapa, se llama a rutaCategoria() para obtener la ruta de su categoria como respaldo.

- let mapa = { ... }: es un diccionario producto -> URL con rutas especificas de detalle.
- if (mapa[key]) return base + mapa[key];: si el producto existe en el mapa, devuelve la ruta 
especifica.
- return rutaCategoria(item.categoria);: si el producto no esta en el mapa, devuelve la ruta de su 
categoria como respaldo.
*/

//FUNCION PARA OBTENER LA IMAGEN DE UN PRODUCTO
function imagenProducto(item) {
  let base = obtenerBaseProyecto();
  let key = normalizarTexto(item.nombre);
  let mapa = {
    // Tartas
    "tarta de peras con nueces y almendras": "assets/product/tartas/tarta-peras/tarta-pera.png",
    "key lime pie": "assets/product/tartas/key-lime-pie/key-lime-pie.jpg",
    "tarta de frutal": "assets/product/tartas/tarta-frutal/tarta-frutal.jpg",
    "maracuya pie": "assets/product/tartas/maracuya-pie/maracuya-pie.jpg",
    "tarta cabsha": "assets/product/tartas/cabsha.png",
    "tarta de chocolate y naranja": "assets/product/tartas/tarta-choco-naranja/torta-naranjaychoco.png",
    "tarta de coco": "assets/product/tartas/tarta-coco/coco-dulce-de-leche.png",
    "lemon pie": "assets/product/tartas/lemon-pie/lemon-pie.png",

    // Tortas
    "torta mousse de chocolate": "assets/product/tortas/Torta-mousse-de-chocolate/torta-mousse.png",
    "chocotorta": "assets/product/tortas/chocotorta/chocotorta.jpg",
    "cheesecake frutos rojos": "assets/product/tortas/Cheesecake-fr/cheesecake.png",
    "torta oreo": "assets/product/tortas/torta-oreo/torta-oreo.png",
    "torta decorada": "assets/product/tortas.jpg",
    "torta matilda blanca": "assets/product/tortas/matilda-blanca/torta-matilda.jpg",
    "carrot cake": "assets/product/tortas/carrot-cake/carrot-cake.jpg",
    "torta brownie": "assets/product/tortas/torta-brownie/torta-brownie.jpg",

    // Postres
    "rogel": "assets/product/postres/rogel/rogel.jpg",
    "tiramisu": "assets/product/postres/tiramisu/tiramisu.jpg",
    "pavlova": "assets/product/postres/pavlova.png",
    "blondie": "assets/product/postres/blondie/blondies.png",
    "marquise clasica": "assets/product/postres/marquise.png",
    "nube de nuez": "assets/product/postres/nube-nuez/nube-de-nuez.png",

    // Otros
    "muffins frutos rojos": "assets/product/muffins.png",
    "petit fours": "assets/product/mini-delicias/petit-fours.jpg",
    "huevos de pascua": "assets/product/huevos-pascua.png",
    "pan dulce": "assets/product/pan-dulce.jpg",
    "cookies new york": "assets/product/cookies.png",
    "cookies red velvet": "assets/product/cookies.png",
    "chipa": "assets/product/chipa.png",
    "tableta de chocolate dubai": "assets/product/tableta-chocolate.png",
    "alfajores dubai": "assets/product/alfajor.png",
    "alfajores dulce de leche y nuez": "assets/product/alfajor.png",
    "alfajores de maicena": "assets/product/alfajores/all-maicena/alf-maicena.png",
    "desayuno sorpresa": "assets/product/box/box-desayuno-sorpresa/desayuno-sorprera.jpg",
    "box dia de la madre": "assets/product/box/box.png",
    "box dia del padre": "assets/product/box/box.png",
    "box navidad": "assets/product/box/box-navidad/opcion1/box-navidad1.jpg",
    "box dia del nino": "assets/product/box/box.png",
    "box porciones de torta": "assets/product/box/box.png",
    "box alfajores": "assets/product/box/box-alfajores/box-alf1.jpg",
    "lingotes": "assets/product/mini-delicias/lingote-zoom.jpg",
    "mini tartas": "assets/product/mini-delicias/mini-tarta-zoom.jpg",
    "mini tarta": "assets/product/mini-delicias/mini-tarta-zoom.jpg"
  };
  return mapa[key] ? base + mapa[key] : "";
}

/*
Entrada: producto (objeto con nombre).
Proceso: busca la ruta de imagen en el mapa.
Salida: ruta completa de la imagen (string).
*/

/*
Esta funcion es similar a rutaProducto(), pero en lugar de devolver la URL de la pagina del producto, 
devuelve la URL de su imagen. Si el producto no esta en el mapa, devuelve una cadena vacia.
- let mapa = { ... }: es un diccionario producto -> URL de imagen con rutas especificas.
- return mapa[key] ? base + mapa[key] : "": si el producto existe en el mapa, devuelve la ruta de su 
imagen; si no, devuelve una cadena vacia.

Implemente esta logica para preservar la coherencia visual del sitio y mantener una experiencia de 
busqueda fluida donde cada resultado muestra su imagen correspondiente, respetando el estilo de cards  
y la identidad estetica de la interfaz.
*/


// FUNCION PARA OBTENER EL GRID DE RESULTADOS
function obtenerGridResultados() {
  return document.querySelector(".products-grid-category, .product-grid");
}

/*
Entrada: no recibe parametros.
Proceso: busca el contenedor de resultados en el DOM.
Salida: nodo del DOM o null.
*/

/*
En esta funcion, utilizo querySelector para buscar en el DOM un elemento que tenga la clase 
"products-grid-category" o "product-grid". Esto me permite obtener el contenedor donde se mostraran 
los resultados de busqueda, sin importar si estoy en una pagina de categoria o en la pagina general 
de productos. Si no se encuentra ningun elemento con esas clases, la funcion devuelve null.
 */

let htmlOriginalGrid = null;


// FUNCION PARA RENDERIZAR LOS RESULTADOS EN CARDS 
function renderResultadosEnCards(resultados, termino) {
  let grid = obtenerGridResultados();
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

  /*
  Utilice innerHTML para renderizar los resultados de busqueda en forma de cards. Primero verifico 
  si hay resultados, y luego mapeo la lista de productos y las categorias para crear el HTML que el 
  contenedor del grid debe mostrar.
  */

  let html = resultados
    .slice(0, 12)
    .map(function (item) {
      if (item.tipo === "categoria") {
        return (
          '<a href="' + rutaCategoria(item.categoria) + '" class="product-link">' +
            '<article class="product-card-category" data-name="' + item.categoria + '">' +
              "<h3>" + item.nombre + "</h3>" +
            "</article>" +
          "</a>"
        );
      }

      let imagen = imagenProducto(item);
      let imgHtml = imagen ? '<img src="' + imagen + '" alt="' + item.nombre + '">' : "";

      return (
        '<a href="' + rutaProducto(item) + '" class="product-link">' +
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

/*
Entrada: resultados (array) y termino (string).
Proceso: genera HTML y lo inserta en el grid.
Salida: actualiza el DOM del grid.
*/

// FUNCION PARA COMBINAR LISTAS SIN DUPLICADOS 
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

/*
Entrada: array de listas con resultados.
Proceso: usa un objeto para eliminar duplicados.
Salida: array unico de resultados.
*/

// FUNCION PARA OBTENER LA IMAGEN DE LA CATEGORIA
function imagenCategoria(categoria) {
  let base = obtenerBaseProyecto();
  let mapa = {
    tartas: "assets/product/tartas.png",
    tortas: "assets/product/tartas.png",
    postres: "assets/product/tartas.png",
    otros: "assets/product/mini-delicias.png"
  };
  return mapa[categoria] ? base + mapa[categoria] : "";
}

/*
Entrada: categoria (string).
Proceso: busca la imagen de la categoria.
Salida: ruta de imagen o string vacio.
*/

// FUNCION PARA CREAR EL DRAWER DE BUSQUEDA 
function crearDrawerBusqueda() {
  let overlay = document.createElement("div");
  overlay.className = "search-drawer-overlay";

  let drawer = document.createElement("aside");
  drawer.className = "search-drawer";
  drawer.innerHTML =
    '<button type="button" class="search-drawer-close" aria-label="Cerrar">�</button>' +
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

/*
Entrada: no recibe parametros.
Proceso: crea el HTML del drawer y lo agrega al DOM.
Salida: devuelve referencias a nodos clave del drawer.
*/

// FUNCION PARA RENDERIZAR RESULTADOS EN EL DRAWER 
function renderResultadosEnDrawer(ui, resultados, termino) {
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
        let img = imagenCategoria(item.categoria);
        return (
          '<a class="search-drawer-item" href="' + rutaCategoria(item.categoria) + '">' +
            '<div class="search-drawer-thumb">' + (img ? '<img src="' + img + '" alt="' + item.nombre + '">' : "") + "</div>" +
            '<div class="search-drawer-meta">' +
              '<h4>' + item.nombre + "</h4>" +
              "<p>Ver categoria</p>" +
            "</div>" +
          "</a>"
        );
      }

      let imgProducto = imagenProducto(item);
      return (
        '<a class="search-drawer-item" href="' + rutaProducto(item) + '">' +
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

/*
Entrada: ui (nodos del drawer), resultados (array), termino (string).
Proceso: arma el HTML de resultados y lo inserta.
Salida: actualiza el DOM del drawer.
*/

function resultadosBusqueda(termino) {
  return combinarSinDuplicados([
    buscarPorCategoria(termino),
    buscarPorNombre(termino)
  ]);
}

/*
Entrada: termino (string).
Proceso: ejecuta ambas busquedas y combina resultados.
Salida: array de resultados sin duplicados.
*/

function inicializarBuscadorDOM() {
  let input = document.querySelector(".search-input");
  let searchPill = document.querySelector(".search-pill");
  if (!input || !searchPill) return;

  let ui = crearDrawerBusqueda();
  let abierta = false;

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

  function cerrarDrawer() {
    ui.overlay.classList.remove("is-open");
    document.body.classList.remove("search-drawer-open");
    abierta = false;
  }

  function ejecutarBusqueda(valor) {
    let termino = normalizarTexto(valor);
    let resultados = resultadosBusqueda(termino);
    renderResultadosEnDrawer(ui, resultados, termino);
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

/*
Entrada: no recibe parametros.
Proceso: inicializa el drawer de busqueda y registra eventos.
Salida: buscador listo para usar.
*/

document.addEventListener("DOMContentLoaded", inicializarBuscadorDOM);

/*
Entrada: DOM cargado.
Proceso: ejecuta inicializarBuscadorDOM.
Salida: buscador activo.
*/

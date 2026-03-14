// CART.JS

//PUNTO DE PARTIDA DEL ARCHIVO CART.JS:

//Utilizo este console.log para verificar que el archivo se esta cargando correctamente


console.log("Carrito de Pasteleria Martti (DOM)");


/*
Para ir dandome cuenta de las funciones necesarias decclare todo el proceso de esta manera:
Primero definí variables globales 
*/


//VARIABLES GLOBALES:

const claveStorageCarrito = "pasteleria_martti_carrito";
let carrito = [];
let uiCarrito = null;
let uiFinalizarCompra = null;
const numWhatsapp = "5493512729694";



/*



Defini estas variables globales para poder utilizarla en varias funciones de este archivo:

claveStorageCarrito: es el nombre con el que guardo y recupero los datos del carrito en localStorage.

carrito = []: arranca vacio y despues se llena con lo que haya en localStorage o con lo que 
agrega el usuario. 

uiCarrito = null: guarda lo del panel del carrito, es decir, del drawer, cuando se crea en 
el DOM. Lo defini con null porque todavia no existe al cargar el script.

uiFinalizarCompra = null: igual que uiCarrito, pero para el modal y resumen de finalizar la compra.

numWhatsapp: es el numero al que se envia el pedidoo. Como la pastelería no cuenta con stock por ser pequeña
y tener productos frescos, la venta culmina por whatsapp para corroborar que los productos esten disponibles
para vender.


Con las variables globales ya voy dando forma al flujo como donde voy a guardaro los datos que 
el usuario va agregando al carrito, y al finalizar la compra a que numero le voy a enviar el pedido.

Luego para el flujo de compra en el DOM planifiqué lo siguiente:
Entrada: acciones del usuario , datos del catalogo de productos y localStorage.
Proceso: cargar/guardar carrito, sincronizar precios, renderizar drawer y modal, y manejar eventos.
Salida: contador del carrito, UI del carrito actualizada y flujo de compra hasta finalizar la compra.

Por supuesto que sobre la marcha fuí modificando funciones y agregando otras para que el carrito quede 
funcional

*/



/*
Siguiendo con la logica de mi proyecto, ordene las funciones en dos bloques:

1) Logica para procesar el carrito y como se va a mostrar:

a) Guarda lo que el usuario agrega (aunque recargue, para eso utilizo localStorage).
b) Muestra ese carrito en pantalla (contador, drawer y modal).
c) Permite eliminar y finalizar por WhatsApp.


2) Logica de interaccion del usuario.

a) Agrega productos al carrito cuando el usuario hace click en “Agregar al carrito”.
b) Abre y cierra el drawer para ver lo que hay en el carrito.
c) Abre y cierra el modal para mostrar el resumen antes de comprar.
d) Permite eliminar productos del carrito si el usuario se arrepiente.
e) Envía el pedido por WhatsApp con el resumen de la compra.

*/

//FUNCION PARA CARGAR EL CARRITO DESDE LOCALSTORAGE
/*
Entrada: no recibe parametros.
Proceso: lee localStorage y carga el carrito.
Salida: variable carrito actualizada.
*/
function cargarCarrito() {
  let guardado = localStorage.getItem(claveStorageCarrito);

  if (guardado !== null) {
    carrito = JSON.parse(guardado);
  } else {
    carrito = [];
  }
}

/*
En esta funcion cargo el carrito desde localStorage:
- Si hay algo guardado (devuelve una cadena de texto), lo convierto a un array de objetos.
- Si no hay nada guardado (devuelve null), lo dejo como un array vacio.
Al usar localStorage, permito mantener el carrito aunque el usuario recargue la pagina o cierre el navegador,
mientras no borre el almacenamiento local.
- getItem(): es el metodo de la interfaz de almacenamiento que se usa para obtener el valor 
guardado bajo una clave especifica, en este caso, claveStorageCarrito.
*/

//USO DE JSON

/*
Como localStorage solo puede guardar cadenas de texto, uso JSON para convertir el carrito (que es
 un array de objetos) a una cadena de texto para guardarlo, y luego lo convierto de 
 nuevo a un array de objetos al cargarlo.
A su vez utilizo JSON.stringify() para convertir un objeto JavaScript a una cadena JSON, y 
JSON.parse() para convertir una cadena JSON de vuelta a un objeto JavaScript.
*/

//FUNCION PARA GUARDAR EL CARRITO EN LOCALSTORAGE
/*
Entrada: carrito (array global).
Proceso: convierte a JSON y guarda en localStorage.
Salida: localStorage actualizado.
*/
function guardarCarrito() {
  localStorage.setItem(claveStorageCarrito, JSON.stringify(carrito));
}

/*
Aqui convierto el carrito a una cadena JSON y lo guardo en localStorage bajo la clave definida en 
claveStorageCarrito. Esto me permite mantener el estado del carrito entre sesiones y recargas de pagina.
Es por eso que use localstorage en vez de sessionStorage (elimina el carrito al cerrar el 
navegador).
*/


//FUNCION PARA ACTUALIZAR EL CONTADOR DEL CARRITO EN EL DOM
/*
Entrada: carrito (array global).
Proceso: cuenta items y actualiza el contador en el DOM.
Salida: contador del carrito actualizado.
*/
function actualizarContadorCarrito() {
  let totalItems = carrito.length;
  let contadores = document.querySelectorAll(".cart-count");
  contadores.forEach(function (contador) {
    contador.textContent = String(totalItems);
    contador.style.display = totalItems > 0 ? "flex" : "none";
  });
}

/*
En esta funcion actualizo el numero del carrito en pantalla.
Si el carrito tiene productos, muestro el contador.
Si no tiene productos, lo oculto.

Uso -> style.display <- porque me permite mostrar u ocultar el elemento:
- none lo oculta.
- flex lo muestra como flex, y asi el numero queda centrado en el circulo del contador.

Segun la documentacion de MDN, style.display controla como se muestra un elemento y display: none
lo saca del flujo (no se ve), mientras que display: flex lo muestra como contenedor flex.
*/

//FUNCION PARA ACTUALIZAR LA VISTA DEL CARRITO
/*
Entrada: no recibe parametros.
Proceso: llama a actualizarContadorCarrito.
Salida: vista del contador actualizada.
*/
function actualizarVistaCarrito() {
  actualizarContadorCarrito();
}

/*
Agregue esta funcion para centralizar la actualizacion de la vista del carrito, y asi poder invocar
a actualizarContadorCarrito() cada vez que se modifique el carrito, sin tener que preocuparme por 
actualizar la vista en cada funcion que modifique el carrito.
*/

//FUNCION PARA FORMATEAR NUMEROS A MONEDA LOCAL (ARGENTINA)
/*
Entrada: numero (string o numero).
Proceso: convierte y formatea con Intl.NumberFormat.
Salida: string con formato de moneda.
*/
function formatearMoneda(numero) {
  return new Intl.NumberFormat("es-AR").format(Number(numero) || 0);
}

/*
Busque en MDN como mostrar numeros con separador de miles para que se lean mas rapido.
Uso -> Intl.NumberFormat("es-AR") <- porque en Argentina el separador de miles es el punto.
Esto ayuda a que el usuario no tenga que detenerse a interpretar el numero.
Si el valor no es valido, lo convierto a 0 para evitar errores.
*/

//FUNCION PARA OBTENER UNA CLAVE LIMPIA DE UN NOMBRE DE PRODUCTO
/*
Entrada: texto (string).
Proceso: normaliza y limpia el texto.
Salida: clave normalizada (string).
*/
function claveProducto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/*
En esta funcion preparo un texto para usarlo como "clave" de busqueda o comparacion.
La idea es que quede sin acentos, en minusculas y sin espacios extra.

Pars esto utilicé:
- String(texto || ""): para asegurarme que siempre sea un texto.
- normalize("NFD"): para separar las letras de sus acentos.
- replace(/[\u0300-\u036f]/g, ""): para eliminar los acentos.
- toLowerCase(): para pasar todo a minusculas.
- trim(): para sacar espacios al inicio y al final.
*/

//FUNCION PARA CREAR UN INDICE DE PRODUCTOS DESDE EL CATALOGO (pasteleriaMartti.productos)
/*
Entrada: datos de pasteleriaMartti.productos.
Proceso: recorre el catalogo y arma un indice por nombre.
Salida: objeto indice con nombre, precio y categoria.
*/
function crearIndiceCatalogo() {
  let indice = {};
  if (typeof pasteleriaMartti === "undefined" || !pasteleriaMartti.productos) return indice;

  Object.keys(pasteleriaMartti.productos).forEach(function (categoria) {
    let lista = Array.isArray(pasteleriaMartti.productos[categoria]) ? pasteleriaMartti.productos[categoria] : [];
    lista.forEach(function (prod) {
      let key = claveProducto(prod.nombre);
      if (!key) return;
      indice[key] = {
        nombre: prod.nombre,
        precio: Number(prod.precio) || 0,
        categoria: categoria
      };
    });
  });

  return indice;
}

/*
Para la logica de busqueda, uso el indice creado en la funcion anterior. Quise buscar la forma
mas rapida a nivel experiencia de usario y ayudandome un poco con la informacion de la documentacion en mdn y 
chat gpt, decidí hacerlo de esta manera, asi no tengo que recorrer todo el catalogo cada vez. 
Entonces:
En esta funcion creo un "indice" (objeto) para buscar productos mas rapido.
Recorro las categorias y guardo cada producto con una clave normalizada.
Para esto:
1) Creo un objeto vacio -> indice.
2) Si no existe pasteleriaMartti o no tiene productos, devuelvo el objeto vacio.
   -Uso typeof pasteleriaMartti === "undefined" para evitar errores si el objeto no existe.
3) Recorro las categorias -> Object.keys con forEach.
4) Para cada categoria, tomo su lista de productos.
5) Recorro cada producto y genero una clave -> claveProducto.
6) Guardo en el indice los datos: nombre, precio y categoria.
*/

//FUNCION PARA SINCRONIZAR LOS PRECIOS DESDE EL CATALOGO A LOS BOTONES DEL DOM
/*
Entrada: catalogo y DOM de productos.
Proceso: sincroniza data-* y precios en pantalla.
Salida: DOM con precios actualizados.
*/
function sincronizarPreciosDesdeCatalogo() {
  let indice = crearIndiceCatalogo();
  if (!Object.keys(indice).length) return;

  let contenedores = document.querySelectorAll(".info-producto");
  contenedores.forEach(function (info) {
    let titulo = info.querySelector("h2");
    if (!titulo) return;

    let nombre = titulo.textContent.trim();
    let producto = indice[claveProducto(nombre)];
    if (!producto) return;

    let precioH3 = info.querySelector("h3");
    if (precioH3) {
      precioH3.textContent = "$" + formatearMoneda(producto.precio);
    }

    let boton = info.querySelector("button");
    if (!boton) return;

    boton.dataset.action = "add-to-cart";
    boton.dataset.product = producto.nombre;
    boton.dataset.price = String(producto.precio);
    if (!boton.dataset.category) {
      boton.dataset.category = producto.categoria;
    }
  });
}

/*
En esta parte de la funcion recorro cada card de producto del DOM.
La idea es que el precio y los datos del boton queden sincronizados con el catalogo.

Para esto:
1) Busco todos los contenedores con la clase .info-producto.
2) En cada contenedor tomo el titulo (h2) para saber el nombre del producto.
3) Busco ese producto en el indice (con claveProducto).
4) Si lo encuentro:
   - actualizo el texto del precio (h3).
   - actualizo los data-* del boton para que el carrito use el precio correcto.

Uso dataset porque me permite guardar datos en el HTML (data-product, data-price, data-category)
y luego leerlos cuando el usuario hace click en "agregar al carrito".
*/


//PARTE UI DEL CARRITO

/*
Si bien tengo una carpeta UI, no coloco esta parte del carrito ahi porque esta muy ligada a la l
ogica del carrito y romperia el código. Además es muy especifica para el carrito, no es algo 
reutilizable para otras partes del sitio (como galery.js o checkbox.js), por eso la dejo en cart.js.
*/

//FUNCION PARA CREAR EL DRAWER DEL CARRITO EN EL DOM
/*
Entrada: no recibe parametros.
Proceso: crea el drawer y lo agrega al DOM.
Salida: objeto con referencias del drawer.
*/
function crearDrawerCarrito() {
  let overlay = document.createElement("div");
  overlay.className = "cart-drawer-overlay";

  let drawer = document.createElement("aside");
  drawer.className = "cart-drawer";
  drawer.innerHTML =
    '<button type="button" class="cart-drawer-close" aria-label="Cerrar">x</button>' +
    '<h2 class="cart-drawer-title">Tu carrito</h2>' +
    '<div class="cart-drawer-list"></div>' +
    '<div class="cart-drawer-summary">' +
      '<p class="cart-row"><span>Total</span><strong class="cart-total">$0</strong></p>' +
      '<div class="cart-drawer-actions">' +
        '<button type="button" class="cart-btn cart-btn-primary" data-cart-action="continue">Continuar compra</button>' +
        '<button type="button" class="cart-btn cart-btn-secondary" data-cart-action="FinalizarCompra">Finalizar compra</button>' +
      "</div>" +
    "</div>";

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  return {
    overlay: overlay,
    drawer: drawer,
    closeBtn: drawer.querySelector(".cart-drawer-close"),
    list: drawer.querySelector(".cart-drawer-list"),
    total: drawer.querySelector(".cart-total")
  };
}

/*
En esta función creo el drawer del carrito (el panel lateral).
La idea es generar todo el HTML con JS y agregarlo al DOM.

Para esto:
1) Creo un overlay (fondo con opacidad) con createElement.
2) Creo el drawer (aside) y le pongo su estructura con innerHTML.
esto hace que se modifique el contenido del html y no se  vea tal cual el se ve el html original 
3) Agrego el drawer dentro del overlay y el overlay al bod con appendchild entonces:
   - overlay.appendChild(drawer) meto el drawer dentro del overlay.
   -document.body.appendChild(overlay) agrego todo el overlay al body, para que se vea en la página.
4) Muestro con return:
   - overlay: para abrir/cerrar el panel
   - drawer: el contenedor principal
   - closeBtn: botón de cerrar
   - list: donde se listan los productos (con su nombre, precio y categoría)
   - total: donde se muestra el total
*/

//FUNCION PARA CREAR EL MODAL DE FINALIZAR COMPRA
/*
Entrada: no recibe parametros.
Proceso: crea el modal y lo agrega al DOM.
Salida: objeto con referencias del modal.
*/
function crearModalFinalizarCompra() {
  let overlay = document.createElement("div");
  overlay.className = "checkout-modal-overlay";

  let modal = document.createElement("section");
  modal.className = "checkout-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Resumen de compra");

  modal.innerHTML =
    '<button type="button" class="checkout-modal-close" aria-label="Cerrar">x</button>' +
    '<h3 class="checkout-modal-title">Resumen de compra</h3>' +
    '<div class="checkout-modal-list"></div>' +
    '<div class="checkout-modal-summary">' +
      '<p class="cart-row checkout-row"><span>Subtotal</span><strong class="checkout-subtotal">$0</strong></p>' +
      '<p class="cart-row checkout-row"><span>Total</span><strong class="checkout-total">$0</strong></p>' +
    "</div>" +
    '<div class="checkout-modal-actions">' +
      '<button type="button" class="cart-btn cart-btn-primary" data-checkout-action="whatsapp">Comprar por WhatsApp</button>' +
      '<button type="button" class="cart-btn cart-btn-secondary" data-checkout-action="continue">Continuar compra</button>' +
    "</div>";

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  return {
    overlay: overlay,
    modal: modal,
    closeBtn: modal.querySelector(".checkout-modal-close"),
    list: modal.querySelector(".checkout-modal-list"),
    subtotal: modal.querySelector(".checkout-subtotal"),
    total: modal.querySelector(".checkout-total")
  };
}

/*
En esta función creo el modal /(cuadro de dialogo) de “Finalizar compra”.
Genero el HTML del modal con JS y lo agrego al DOM.

Se ve un panel de resumen de compra con el subtotal y el total.
1) Creo un overlay (fondo con opacidad).
2) Creo el modal y le agrego atributos de accesibilidad:
   - role="dialog" para indicar que es un diálogo.
   - aria-modal="true" para indicar que bloquea la pantalla.
   - aria-label para describirlo.
3) Armo la estructura con innerHTML:
   - botón de cerrar
   - título
   - lista de productos
   - subtotal (agregué el subtotal por si en un futuro quiero aplicar algun descuento 
   se vea reflejado en el total el descuento)
   - total
   - botones de acción (WhatsApp y continuar)
4) Inserto el modal dentro del overlay y el overlay en el body.
5) Muestro con return:
   - overlay, modal, botón cerrar, lista, subtotal y total.
*/

//FUNCION PARA CALCULAR EL TOTAL DEL CARRITO SUMANDO LOS PRECIOS DE LOS PRODUCTOS
/*
Entrada: carrito (array global).
Proceso: suma precios con reduce.
Salida: total numerico.
*/
function calcularTotalCarrito() {
  return carrito.reduce(function (acc, item) {
    return acc + (Number(item.precio) || 0);
  }, 0);
}

/* 
Esta función suma el precio de todos los productos.
- Uso reduce para ir acumulando el total.
- Convierto cada precio a número y si no es válido lo trato como 0.
*/

//FUNCION PARA RENDERIZAR EL CONTENIDO DEL DRAWER Y EL MODAL
/*
Entrada: carrito y uiCarrito.
Proceso: genera HTML del drawer y actualiza total.
Salida: drawer renderizado en el DOM.
*/
function renderDrawerCarrito() {
  if (!uiCarrito) return;

  if (!carrito.length) {
    uiCarrito.list.innerHTML = '<p class="cart-empty">Tu carrito esta vacio.</p>';
    uiCarrito.total.textContent = "$0";
    return;
  }

  let subtotal = 0;

  uiCarrito.list.innerHTML = carrito
    .map(function (item, index) {
      let precio = Number(item.precio) || 0;
      subtotal += precio;
      let opcionesHtml = item.opciones && item.opciones.length
        ? '<p class="cart-item-options">' + item.opciones.join(" - ") + "</p>"
        : "";

      return (
        '<article class="cart-item">' +
          '<div class="cart-item-main">' +
            '<h4>' + item.nombre + "</h4>" +
            '<p class="cart-item-cat">' + item.categoria + "</p>" +
            opcionesHtml +
            '<p class="cart-item-price">$' + formatearMoneda(precio) + "</p>" +
          "</div>" +
          '<button type="button" class="cart-item-remove" aria-label="Eliminar producto" data-remove-index="' + index + '">Eliminar</button>' +
        "</article>"
      );
    })
    .join("");

  uiCarrito.total.textContent = "$" + formatearMoneda(subtotal);
}

/*Esta función muestra el contenido del drawer.

Entonces:
1) Si no existe la UI del carrito, salgo.
2) Si el carrito está vacío, muestro un mensaje "Tu carrito esta vacio"y el total en $0.
3) Si hay productos:
   - Map recorre el carrito y para cada producto:
   - Se arma el HTML de cada producto (nombre, categoría, opciones, precio).
   - Se suma el precio al total
4) Inserto todo el HTML en la lista.
5) Muestro el subtotal total formateado.

Uso map + join para construir el HTML en un solo string.
Uso formatearMoneda para que el precio se vea con separador de miles.
*/

//FUNCION PARA RENDERIZAR EL CONTENIDO DEL MODAL
/*
Entrada: carrito y uiFinalizarCompra.
Proceso: genera HTML del modal y actualiza total.
Salida: modal renderizado en el DOM.
*/
function renderModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;

  if (!carrito.length) {
    uiFinalizarCompra.list.innerHTML = '<p class="cart-empty">Tu carrito esta vacio.</p>';
    uiFinalizarCompra.subtotal.textContent = "$0";
    uiFinalizarCompra.total.textContent = "$0";
    return;
  }

  uiFinalizarCompra.list.innerHTML = carrito
    .map(function (item) {
      let precio = Number(item.precio) || 0;
      let opcionesHtml = item.opciones && item.opciones.length
        ? '<p class="checkout-item-options">' + item.opciones.join(" - ") + "</p>"
        : "";

      return (
        '<article class="checkout-item">' +
          '<div class="checkout-item-main">' +
            '<h4>' + item.nombre + "</h4>" +
            opcionesHtml +
          "</div>" +
          '<p class="checkout-item-price">$' + formatearMoneda(precio) + "</p>" +
        "</article>"
      );
    })
    .join("");

  let total = calcularTotalCarrito();
  uiFinalizarCompra.subtotal.textContent = "$" + formatearMoneda(total);
  uiFinalizarCompra.total.textContent = "$" + formatearMoneda(total);
}

/*
Según  la guia de Critical Rendering Path de MDN, “renderizar” significa el proceso por el cual el
navegador convierte HTML/CSS/JS en píxeles visibles en pantalla, es decir, generar HTML (por 
ejemplo con innerHTML) e insertarlo en el DOM para que se vea.  En MDN, innerHTML se describe 
justamente como la propiedad para establecer el HTML dentro de un elemento.

En esta funcion hago que se vea el contenido del modal con los productos del carrito.

Entonces:
1) Si la UI del modal no existe, salgo.
2) Si el carrito esta vacio:
   - muestro un mensaje
   - pongo subtotal y total en $0
3) Si hay productos:
   - recorro el carrito con map
   - armo el HTML de cada item (nombre, opciones y precio)
   - lo uno con join y lo inserto en el modal
4) Calculo el total y lo muestro en subtotal y total.

Uso formatearMoneda para que los precios se lean con mayor facilidad.

*/


//FUNCION PARA OBTENER EL TEXTO DE UNA OPCION
/*
Entrada: input (elemento).
Proceso: busca label o valor legible.
Salida: texto de opcion (string).
*/
function obtenerTextoOpcion(input) {
  let label = input.closest("label");
  if (label) return label.textContent.replace(/\s+/g, " ").trim();
  if (input.value) return String(input.value).trim();
  return input.name || "Opcion";
}

/*
Esta función saca el texto que representa -> opcion elegida <- en el carrito.

Para esto:
1) Busca el label mas cercano del input.
   - Si existe, usa su texto (limpia espacios con replace y trim).
2) Si no hay label, usa el value del input.
3) Si tampoco hay value, usa el name.
4) Si nada existe, retorna "Opcion".

La idea es siempre tener un texto legible para mostrar en el carrito.
*/

//FUNCION PARA OBTENER LAS OPCIONES SELECCIONADAS
/*
Entrada: button (elemento).
Proceso: lee radios, checkboxes y selects seleccionados.
Salida: array de opciones elegidas.
*/
function obtenerOpcionesSeleccionadas(button) {
  let info = button.closest(".info-producto");
  if (!info) return [];

  let seleccionadas = [];

  Array.from(info.querySelectorAll('input[type="radio"]:checked')).forEach(function (input) {
    let txt = obtenerTextoOpcion(input);
    if (txt) seleccionadas.push(txt);
  });

  Array.from(info.querySelectorAll('input[type="checkbox"]:checked')).forEach(function (input) {
    let txt = obtenerTextoOpcion(input);
    if (txt) seleccionadas.push(txt);
  });

  Array.from(info.querySelectorAll("select")).forEach(function (select) {
    let option = select.options[select.selectedIndex];
    if (!option) return;
    let txt = option.textContent.replace(/\s+/g, " ").trim();
    if (txt) seleccionadas.push(txt);
  });

  return seleccionadas;
}

/*
Esta funcion busca las opciones que el usuario eligio en un producto.

Entonces:
1) Encuentra el contenedor del producto (.info-producto) segun el boton.
2) Si no lo encuentra, devuelve un array vacio.
3) Busca radios seleccionados y guarda su texto.
4) Busca checkboxes seleccionados y guarda su texto.
5) Busca selects y guarda la opcion elegida.
6) Devuelve un array con todas las opciones.

*/

//FUNCION PARA OBTENER LOS DATOS DE UN PRODUCTO

/*
Entrada: button (elemento).
Proceso: toma dataset o DOM y arma un objeto producto.
Salida: objeto con nombre, precio, categoria y opciones.
*/
function obtenerDatosDesdeBoton(button) {
  let nombre = button.dataset.product || "";
  let precio = Number(button.dataset.price) || 0;
  let categoria = button.dataset.category || "otros";
  let opciones = obtenerOpcionesSeleccionadas(button);

  if (!nombre || !precio) {
    let info = button.closest(".info-producto");
    if (info) {
      let titulo = info.querySelector("h2");
      let precioh3 = info.querySelector("h3");
      if (!nombre && titulo) nombre = titulo.textContent.trim();
      if (!precio && precioh3) {
        precio = Number(String(precioh3.textContent || "").replace(/[^\d]/g, "")) || 0;
      }
    }
  }

  if (!button.dataset.category) {
    let nodoCategoria = document.querySelector(".product-card-title[data-name]");
    if (nodoCategoria && nodoCategoria.dataset.name) categoria = nodoCategoria.dataset.name;
  }

  

  return {
    nombre: nombre || "Producto",
    precio: precio || 0,
    categoria: categoria,
    opciones: opciones
  };
}

/*
COn esta función armo un objeto con los datos de un producto usando el botón como punto de partida
Para esto:
1) Lee del boton los data-*:
   - data-product (nombre)
   - data-price (precio)
   - data-category (categoria)
2) Obtiene las opciones seleccionadas (radios y checkbox).
3) Si falta nombre o precio, busca en el DOM del producto:
   - h2 para el nombre
   - h3 para el precio -> limpia caracteres y lo convierte a numero
4) Si falta la categoria, intenta obtenerla desde un nodo de categoria.
5) COmo resutado de esta función tenemos un objeto completo que se devuelve con return
    con nombre, precio, categoria y opciones.
*/



//FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
/*
Entrada: producto, categoria, opciones.
Proceso: arma item, lo agrega y guarda el carrito.
Salida: carrito actualizado y vista refrescada.
*/
function agregarAlCarrito(producto, categoria, opciones) {
  let item = {
    nombre: "",
    precio: 0,
    categoria: String(categoria || "otros"),
    opciones: Array.isArray(opciones) ? opciones : []
  };

  if (typeof producto === "string") {
    item.nombre = producto;
  } else if (producto && typeof producto === "object") {
    item.nombre = producto.nombre || "";
    item.precio = Number(producto.precio) || 0;
  }

  if (!item.nombre) {
    item.nombre = "Producto sin nombre";
  }

  carrito.push(item);
  guardarCarrito();
  actualizarVistaCarrito();
}

/*
/*
COn esta funcion creo un item y lo agrego al array del carrito.

Para lograr ese resultado:
1) Creo un objeto base con nombre, precio, categoria y opciones.
2) Si el producto llega como string, uso ese texto como nombre.
3) Si llega como objeto, tomo nombre y precio del objeto.
4) Si el nombre queda vacio, pongo "Producto sin nombre".
5) Agrego el item al carrito.
6) Guardo el carrito en localStorage.
7) Actualizo la vista del carrito.

Uso Array.isArray para asegurar que opciones sea un array.
Uso Number() para convertir el precio y evitar errores.
*/

//FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
/*
Entrada: uiCarrito.
Proceso: renderiza y abre el drawer.
Salida: drawer visible.
*/
function abrirDrawerCarrito() {
  if (!uiCarrito) return;
  renderDrawerCarrito();
  uiCarrito.overlay.classList.add("is-open");
  document.body.classList.add("cart-drawer-open");
}
/*
Esta funcion muestra el panel lateral del carrito (es decir, el drawer).

Para lograr ese resultado:
1) Si la UI del carrito no existe, salgo.
2) Renderizo el contenido del carrito.
3) Agrego la clase "is-open" al overlay para hacerlo visible.
4) Agrego la clase "cart-drawer-open" al body para aplicar estilos al abrir.

Utilicé -> classList.add <- para mostrar el drawer con CSS.
*/


//FUNCION PARA CERRAR EL PANEL LATERAL DEL CARRITO
/*
Entrada: uiCarrito.
Proceso: quita clases de abierto.
Salida: drawer oculto.
*/
function cerrarDrawerCarrito() {
  if (!uiCarrito) return;
  uiCarrito.overlay.classList.remove("is-open");
  document.body.classList.remove("cart-drawer-open");
}
/*
Con esta función oculto el panel lateral del carrito.

Para eso:
1) Si la UI del carrito no existe, salgo.
2) Quito la clase "is-open" del overlay para ocultarlo.
3) Quito la clase "cart-drawer-open" del body para volver al estado normal.

Uso -> classList.remove <- para quitar las clases de visibilidad.
*/


//FUNCION PARA MOSTRAR EL PANEL LATERAL DEL CARRITO
/*
Entrada: no recibe parametros.
Proceso: llama a abrirDrawerCarrito.
Salida: drawer visible.
*/
function mostrarCarrito() {
  abrirDrawerCarrito();
}
/*
Con esta funcion invoco abrirDrawerCarrito().
La uso como nombre mas claro para “mostrar el carrito” cuando el usuario hace click.
*/


//FUNCION PARA ABRIR EL MODAL DE FINALIZAR COMPRA
/*
Entrada: uiFinalizarCompra.
Proceso: renderiza y abre el modal.
Salida: modal visible.
*/
function abrirModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;
  renderModalFinalizarCompra();
  uiFinalizarCompra.overlay.classList.add("is-open");
  document.body.classList.add("checkout-modal-open");
}

/*
Esta funcion muestra el modal de resumen.

Entonces:
1) Si la UI del modal no existe, salgo.
2) Renderizo el contenido del modal (productos y totales).
3) Agrego la clase "is-open" al overlay para que se vea.
4) Agrego la clase "checkout-modal-open" al body para aplicar estilos.

Uso -> classList.add <- para controlar la visibilidad con CSS.
*/

//FUNCION PARA CERRAR EL MODAL DE FINALIZAR COMPRA
/*
Entrada: uiFinalizarCompra.
Proceso: quita clases de abierto.
Salida: modal oculto.
*/
function cerrarModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;
  uiFinalizarCompra.overlay.classList.remove("is-open");
  document.body.classList.remove("checkout-modal-open");
}
/*
Esta funcion oculta el modal.

Para eso:
1) Si la UI del modal no existe, salgo.
2) Quito la clase "is-open" del overlay para ocultarlo.
3) Quito la clase "checkout-modal-open" del body para volver al estado normal.

Uso -> classList.remove <- para quitar clases de visibilidad.
*/


//FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRITO
/*
Entrada: index (numero).
Proceso: elimina el item y actualiza almacenamiento y vista.
Salida: carrito y DOM actualizados.
*/
function eliminarDelCarrito(index) {
  if (index < 0 || index >= carrito.length) return;
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarVistaCarrito();
  renderDrawerCarrito();
}
/*
Es necesario para una buena experiencia de usuario que el mismo pueda eliminar el producto
que desea de su carrito.
Por eso agrego esta funcion que elimina un item segun su indice.

Entonces:
1) Verifico que el indice sea valido (dentro del rango del carrito).
2) Elimino el item con el método de array -> splice <- que elimina o inserta elementos en una 
posición específica.
3) Guardo el carrito actualizado en localStorage.
4) Actualizo el contador del carrito.
5) Vuelvo a renderizar el drawer para mostrar el cambio.
*/

//FUNCION PARA CREAR EL MENSAJE DE WHATSAPP DE LA FINALIZACION DE LA COMPRA

/*
Entrada: carrito (array global).
Proceso: arma el texto del pedido.
Salida: string con el mensaje final.
*/
function crearMensajeFinalizarCompraWhatsApp() {
  let msjWhatsapp = [
    "Hola! quisiera continuar con el pago del siguiente pedido:",
    ""
  ];

  carrito.forEach(function (item, index) {
    let precio = Number(item.precio) || 0;
    msjWhatsapp.push((index + 1) + ". " + item.nombre + " - $" + formatearMoneda(precio));
    if (item.opciones && item.opciones.length) {
      msjWhatsapp.push("   Opciones: " + item.opciones.join(" - "));
    }
  });

  msjWhatsapp.push("");
  msjWhatsapp.push("Subtotal: $" + formatearMoneda(calcularTotalCarrito()));
  msjWhatsapp.push("Total: $" + formatearMoneda(calcularTotalCarrito()));

  return msjWhatsapp.join("\n");
}
/*

Con esta funcion armo un texto con el resumen del carrito para que se agregue el mensaje de
finalizacion de compra a travez de whatsapp.

Para esto:
1) Creo un array con el saludo inicial.
2) Recorro el carrito con forEach:
   - agrego cada producto con su precio
   - si tiene opciones, las agrego debajo
3) Agrego el subtotal y el total.
4) Uno todo con saltos de linea usando join("\n").
5) Devuelvo el texto final.

Uso un array porque es mas facil ir agregando lineas y luego juntarlas.
*/

//FUNCION PARA COMPRAR POR WHATSAPP
/*
Entrada: carrito y numWhatsapp.
Proceso: crea URL y abre WhatsApp.
Salida: nueva pesta�a con WhatsApp.
*/
/*
Entrada: carrito y numWhatsapp.
Proceso: crea URL y abre WhatsApp.
Salida: nueva pestana con WhatsApp.
*/
function comprarPorWhatsApp() {
  if (!carrito.length) return;
  let mensaje = crearMensajeFinalizarCompraWhatsApp();
  let url = "https://wa.me/" + numWhatsapp + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}

/*
Esta funcion abre WhatsApp con un mensaje ya armado.

Pasos:
1) Si el carrito esta vacio, no hace nada.
2) Creo el mensaje con crearMensajeFinalizarCompraWhatsApp().
3) Armo la URL de WhatsApp con el numero y el texto.
4) Abro la URL en una nueva pestaña con window.open.

Uso -> encodeURIComponent <- para que el mensaje no rompa la URL.
*/

//FUNCION PARA INICIALIZAR EL CARRITO
/*
Entrada: no recibe parametros.
Proceso: carga carrito, crea UI y registra eventos.
Salida: carrito listo en el DOM.
*/
function inicializarCarritoDOM() {
  cargarCarrito();
  actualizarVistaCarrito();
  sincronizarPreciosDesdeCatalogo();
  uiCarrito = crearDrawerCarrito();
  uiFinalizarCompra = crearModalFinalizarCompra();

  document.addEventListener(
    "click",
    function (e) {
      let button = e.target.closest("button");
      if (!button) return;

      let action = button.dataset.action === "add-to-cart";
      let textMatch = /agregar al carrito/i.test(button.textContent || "");
      if (!action && !textMatch) return;

      e.preventDefault();
      e.stopPropagation();

      let data = obtenerDatosDesdeBoton(button);
      agregarAlCarrito(
        {
          nombre: data.nombre,
          precio: data.precio
        },
        data.categoria,
        data.opciones
      );
    },
    true
  );

  document.addEventListener("click", function (e) {
    let buttonCarrito = e.target.closest(".cart-button");
    if (!buttonCarrito) return;
    e.preventDefault();
    mostrarCarrito();
  });

  uiCarrito.closeBtn.addEventListener("click", cerrarDrawerCarrito);

  uiCarrito.overlay.addEventListener("click", function (e) {
    if (e.target === uiCarrito.overlay) cerrarDrawerCarrito();
  });

  uiCarrito.drawer.addEventListener("click", function (e) {
    let removeBtn = e.target.closest(".cart-item-remove");
    if (removeBtn) {
      eliminarDelCarrito(Number(removeBtn.dataset.removeIndex));
      return;
    }

    let actionBtn = e.target.closest("[data-cart-action]");
    if (!actionBtn) return;

    if (actionBtn.dataset.cartAction === "continue") {
      cerrarDrawerCarrito();
      return;
    }

    if (actionBtn.dataset.cartAction === "FinalizarCompra") {
      abrirModalFinalizarCompra();
    }
  });

  uiFinalizarCompra.closeBtn.addEventListener("click", cerrarModalFinalizarCompra);

  uiFinalizarCompra.overlay.addEventListener("click", function (e) {
    if (e.target === uiFinalizarCompra.overlay) cerrarModalFinalizarCompra();
  });

  uiFinalizarCompra.modal.addEventListener("click", function (e) {
    let actionBtn = e.target.closest("[data-checkout-action]");
    if (!actionBtn) return;

    if (actionBtn.dataset.checkoutAction === "continue") {
      cerrarModalFinalizarCompra();
      return;
    }

    if (actionBtn.dataset.checkoutAction === "whatsapp") {
      comprarPorWhatsApp();
      cerrarModalFinalizarCompra();
    }
  });
}

/*

Esta funcion prepara todo el comportamiento del carrito cuando carga la pagina.

Para eso:
1) Carga el carrito desde localStorage y actualiza la vista.
2) Sincroniza precios desde el catalogo.
3) Crea el drawer del carrito y el modal de finalizar compra.
4) Agrega todos los eventos necesarios:

- Click en botones “Agregar al carrito”:
  obtiene datos del producto y lo agrega al carrito.

- Click en el botón del carrito:
  abre el drawer.

- Click en cerrar o fuera del drawer:
  cierra el drawer.

- Click en “Eliminar” dentro del drawer:
  elimina el producto.

- Click en “Continuar” o “Finalizar compra”:
  cierra el drawer o abre el modal.

- Click en cerrar o fuera del modal:
  cierra el modal.

- Click en acciones del modal:
  continuar o comprar por WhatsApp.

Agregué esta funcion para centralizar toda la inicializacion y los eventos en una sola funcion.
*/

//FUNCIONES EXPORTADAS
window.agregarAlCarrito = agregarAlCarrito;
window.mostrarCarrito = mostrarCarrito;
window.carrito = carrito;
/*
Utilicé window para que esas funciones puedan ser utilizadas desde fuera del archivo.
*/

//EJECUCION DE INICIALIZACION
document.addEventListener("DOMContentLoaded", inicializarCarritoDOM);

/*
espera a que el HTML esté cargado y recién ahí ejecuta la inicialización.
*/


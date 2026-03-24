// CART.JS
console.log("Carrito de Pasteleria Martti (DOM)");

//VARIABLES GLOBALES:

const claveStorageCarrito = "pasteleria_martti_carrito";
let carrito = [];
let uiCarrito = null;
let uiFinalizarCompra = null;
const numWhatsapp = "5493512729694";


//FUNCION PARA CARGAR EL CARRITO DESDE LOCALSTORAGE

function cargarCarrito() {
  let guardado = localStorage.getItem(claveStorageCarrito);

  if (guardado !== null) {
    carrito = JSON.parse(guardado);
  } else {
    carrito = [];
  }
}



//USO DE JSON: json.stringifyy json.parse
//FUNCION PARA GUARDAR EL CARRITO EN LOCALSTORAGE

function guardarCarrito() {
  localStorage.setItem(claveStorageCarrito, JSON.stringify(carrito));
}




//FUNCION PARA ACTUALIZAR EL CONTADOR DEL CARRITO EN EL DOM

function actualizarContadorCarrito() {
  let totalItems = carrito.length;
  let contadores = document.querySelectorAll(".cart-count");
  contadores.forEach(function (contador) {
    contador.textContent = String(totalItems);
    contador.style.display = totalItems > 0 ? "flex" : "none";
  });
}



//FUNCION PARA ACTUALIZAR LA VISTA DEL CARRITO

function actualizarVistaCarrito() {
  actualizarContadorCarrito();
}



//FUNCION PARA FORMATEAR NUMEROS A MONEDA LOCAL (ARGENTINA)

function formatearMoneda(numero) {
  return new Intl.NumberFormat("es-AR").format(Number(numero) || 0);
}



//FUNCION PARA OBTENER UNA CLAVE LIMPIA DE UN NOMBRE DE PRODUCTO

function claveProducto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}



//FUNCION PARA CREAR UN INDICE DE PRODUCTOS DESDE EL CATALOGO (pasteleriaMartti.productos)

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



//FUNCION PARA SINCRONIZAR LOS PRECIOS DESDE EL CATALOGO A LOS BOTONES DEL DOM

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




//PARTE UI DEL CARRITO



//FUNCION PARA CREAR EL DRAWER DEL CARRITO EN EL DOM

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



//FUNCION PARA CREAR EL MODAL DE FINALIZAR COMPRA

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



//FUNCION PARA CALCULAR EL TOTAL DEL CARRITO SUMANDO LOS PRECIOS DE LOS PRODUCTOS

function calcularTotalCarrito() {
  return carrito.reduce(function (acc, item) {
    return acc + (Number(item.precio) || 0);
  }, 0);
}



//FUNCION PARA RENDERIZAR EL CONTENIDO DEL DRAWER Y EL MODAL

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



//FUNCION PARA RENDERIZAR EL CONTENIDO DEL MODAL

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




//FUNCION PARA OBTENER EL TEXTO DE UNA OPCION

function obtenerTextoOpcion(input) {
  let label = input.closest("label");
  if (label) return label.textContent.replace(/\s+/g, " ").trim();
  if (input.value) return String(input.value).trim();
  return input.name || "Opcion";
}



//FUNCION PARA OBTENER LAS OPCIONES SELECCIONADAS

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



//FUNCION PARA OBTENER LOS DATOS DE UN PRODUCTO


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





//FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO

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



//FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO

function abrirDrawerCarrito() {
  if (!uiCarrito) return;
  renderDrawerCarrito();
  uiCarrito.overlay.classList.add("is-open");
  document.body.classList.add("cart-drawer-open");
}



//FUNCION PARA CERRAR EL PANEL LATERAL DEL CARRITO

function cerrarDrawerCarrito() {
  if (!uiCarrito) return;
  uiCarrito.overlay.classList.remove("is-open");
  document.body.classList.remove("cart-drawer-open");
}



//FUNCION PARA MOSTRAR EL PANEL LATERAL DEL CARRITO

function mostrarCarrito() {
  abrirDrawerCarrito();
}



//FUNCION PARA ABRIR EL MODAL DE FINALIZAR COMPRA

function abrirModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;
  renderModalFinalizarCompra();
  uiFinalizarCompra.overlay.classList.add("is-open");
  document.body.classList.add("checkout-modal-open");
}



//FUNCION PARA CERRAR EL MODAL DE FINALIZAR COMPRA

function cerrarModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;
  uiFinalizarCompra.overlay.classList.remove("is-open");
  document.body.classList.remove("checkout-modal-open");
}



//FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRITO

function eliminarDelCarrito(index) {
  if (index < 0 || index >= carrito.length) return;
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarVistaCarrito();
  renderDrawerCarrito();
}


//FUNCION PARA CREAR EL MENSAJE DE WHATSAPP DE LA FINALIZACION DE LA COMPRA


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


//FUNCION PARA COMPRAR POR WHATSAPP


function comprarPorWhatsApp() {
  if (!carrito.length) return;
  let mensaje = crearMensajeFinalizarCompraWhatsApp();
  let url = "https://wa.me/" + numWhatsapp + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}



//FUNCION PARA INICIALIZAR EL CARRITO

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



//FUNCIONES EXPORTADAS
window.agregarAlCarrito = agregarAlCarrito;
window.mostrarCarrito = mostrarCarrito;
window.carrito = carrito;


//EJECUCION DE INICIALIZACION
document.addEventListener("DOMContentLoaded", inicializarCarritoDOM);





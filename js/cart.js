//---------------- Archivo cart.js cargado
console.log("Carrito de Pasteleria Martti (DOM)");


//---------------- Variables globales
const claveStorageCarrito = "pasteleria_martti_carrito";
let carrito = [];
let uiCarrito = null;
let uiFinalizarCompra = null;
const numWhatsapp = "5493512729694";

//---------------- Storage
function cargarCarrito() {
  let guardado = localStorage.getItem(claveStorageCarrito);

  if (guardado !== null) {
    carrito = JSON.parse(guardado);
  } else {
    carrito = [];
  }
}

//USO DE JSON
function guardarCarrito() {
  localStorage.setItem(claveStorageCarrito, JSON.stringify(carrito));
}

//---------------- Contador y vista del carrito 
function actualizarContadorCarrito() {
  let totalItems = carrito.length;
  let contadores = document.querySelectorAll(".cart-count");
  contadores.forEach(function (contador) {
    contador.textContent = String(totalItems);
    contador.style.display = totalItems > 0 ? "flex" : "none";
  });
}

// FUNCION DE ACTUALIZAR VISTA DEL CARRITO 
function actualizarVistaCarrito() {
  actualizarContadorCarrito();
}

//---------------- Uso de libreria externa: Toastify + Promesa para carga asincronica
//USO DE TOASTIFY
let toastifyCarga = null;
//USO DE PROMISE
//FUNCION DE CARGA
function cargarToastify() {
  if (window.Toastify) return Promise.resolve();
  if (toastifyCarga) return toastifyCarga;

  toastifyCarga = new Promise(function (resolve, reject) {
    if (!document.querySelector('link[data-toastify="true"]')) {
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css";
      link.dataset.toastify = "true";
      document.head.appendChild(link);
    }

    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return toastifyCarga;
}
//FUNCION DE MOSTRAR NOTIFICACÓN DE PRODUCTO AGREGADO
function mostrarToastProductoAgregado(nombreProducto) {
  let nombre = String(nombreProducto || "").trim();
  let textoNombre = nombre || "El producto";

  cargarToastify()
    .then(function () {
      if (!window.Toastify) return;
      let contenido = document.createElement("div");
      contenido.style.display = "flex";
      contenido.style.alignItems = "center";
      contenido.style.gap = "12px";

      let icono = document.createElement("div");
      icono.style.width = "28px";
      icono.style.height = "28px";
      icono.style.borderRadius = "50%";
      icono.style.display = "flex";
      icono.style.alignItems = "center";
      icono.style.justifyContent = "center";
      icono.style.background = "#00A272";
      icono.style.boxShadow = "0 6px 14px rgba(0, 162, 114, 0.35)";
      icono.innerHTML =
        '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M1.5 6.5L5.5 10.5L14.5 1.5" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />' +
        "</svg>";

      let texto = document.createElement("div");
      texto.style.fontFamily = "\"Manrope\", sans-serif";
      texto.style.fontSize = "1rem";
      texto.style.lineHeight = "1.35";
      texto.style.color = "#000000";

      let nombreSpan = document.createElement("span");
      nombreSpan.textContent = textoNombre;
      nombreSpan.style.fontWeight = "700";

      let restoSpan = document.createElement("span");
      restoSpan.textContent = " se agregó al carrito.";

      texto.appendChild(nombreSpan);
      texto.appendChild(restoSpan);
      contenido.appendChild(icono);
      contenido.appendChild(texto);

      Toastify({
        node: contenido,
        duration: 3200,
        gravity: "top",
        position: "right",
        offset: { x: 24, y: 24 },
        stopOnFocus: true,
        style: {
          background: "#C8F2E6",
          border: "1px solid #00A272",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          padding: "14px 16px",
          minWidth: "260px",
          maxWidth: "420px"
        }
      }).showToast();
    })
    .catch(function () {});
}

//---------------- Formateo y sincronizacion de precios con el catalogo
// FUNCION PARA FORMATEAR NUMEROS A MONEDA LOCAL
function formatearMoneda(numero) {
  return new Intl.NumberFormat("es-AR").format(Number(numero) || 0);
}

// FUNCION PARA NORMALIZAR TEXTO
function claveProducto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// FUNCION PARA CREAR INDICE DE PRODUCTOS
function crearIndiceCatalogoProductos() {
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

// FUNCION PARA SINCRONIZAR PRECIOS EN EL CATALOGO CON LOS DATOS DEFINIDOS EN pasteleriaMartti.productos
function sincronizarPreciosCatalogo() {
  let indice = crearIndiceCatalogoProductos();
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

//---------------- UI: creacion de drawer y modal

// FUNCION PARA CREAR EL DRAWER DEL CARRITO
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

// FUNCION PARA CREAR EL MODAL DE FINALIZACION DE COMPRA
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

//---------------- UI: render

// FUNCION PARA CALCULAR EL TOTAL DEL CARRITO
function calcularTotalCarrito() {
  return carrito.reduce(function (acc, item) {
    return acc + (Number(item.precio) || 0);
  }, 0);
}

// FUNCION PARA RENDERIZAR EL CONTENIDO DEL DRAWER DEL CARRITO
function renderizarDrawerCarrito() {
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

// FUNCION PARA RENDERIZAR EL CONTENIDO DEL MODAL DE FINALIZACION DE COMPRA
function renderizarModalFinalizarCompra() {
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

//---------------- UI: muestra de opciones seleccionadas en el carrito

// FUNCION PARA OBTENER EL TEXTO DE UNA OPCION SELECCIONADA (RADIO, CHECKBOX O SELECT)
function obtenerTextoOpcion(input) {
  let label = input.closest("label");
  if (label) return label.textContent.replace(/\s+/g, " ").trim();
  if (input.value) return String(input.value).trim();
  return input.name || "Opcion";
}

// FUNCION PARA OBTENER LAS OPCIONES SELECCIONADAS DE UN PRODUCTO A PARTIR DE UN BOTON DENTRO DE SU CONTENEDOR
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

// FUNCION PARA OBTENER LOS DATOS DEL PRODUCTO A PARTIR DE UN BOTON, BUSCANDO EN SUS DATA-ATTRIBUTES Y EN SU CONTENEDOR PADRE SI NO SE ENCUENTRAN
function obtenerDatosProductoDesdeBoton(button) {
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

//---------------- Acciones

// FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO, RECIBIENDO EL NOMBRE, PRECIO, CATEGORIA Y OPCIONES SELECCIONADAS
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
  mostrarToastProductoAgregado(item.nombre);
}

// FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRITO A PARTIR DE SU INDICE EN EL ARRAY
function eliminarDelCarrito(index) {
  if (index < 0 || index >= carrito.length) return;
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarVistaCarrito();
  renderizarDrawerCarrito();
}

//---------------- UI: apertura y cierre

// FUNCION PARA ABRIR EL DRAWER DEL CARRITO
function abrirDrawerCarrito() {
  if (!uiCarrito) return;
  renderizarDrawerCarrito();
  uiCarrito.overlay.classList.add("is-open");
  document.body.classList.add("cart-drawer-open");
}

// FUNCION PARA CERRAR EL DRAWER DEL CARRITO
function cerrarDrawerCarrito() {
  if (!uiCarrito) return;
  uiCarrito.overlay.classList.remove("is-open");
  document.body.classList.remove("cart-drawer-open");
}

// FUNCION PARA MOSTRAR EL CARRITO (ABRIR EL DRAWER)
function mostrarCarrito() {
  abrirDrawerCarrito();
}
// FUNCION PARA ABRIR EL MODAL DE FINALIZACION DE COMPRA
function abrirModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;
  renderizarModalFinalizarCompra();
  uiFinalizarCompra.overlay.classList.add("is-open");
  document.body.classList.add("checkout-modal-open");
}

// FUNCION PARA CERRAR EL MODAL DE FINALIZACION DE COMPRA
function cerrarModalFinalizarCompra() {
  if (!uiFinalizarCompra) return;
  uiFinalizarCompra.overlay.classList.remove("is-open");
  document.body.classList.remove("checkout-modal-open");
}

//---------------- Finalizacion de compra

// FUNCION PARA CREAR EL MENSAJE DE WHATSAPP CON EL RESUMEN DEL PEDIDO, FORMATEANDOLO DE MANERA LEGIBLE
function crearMensajeFinalizacionWhatsapp() {
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

// FUNCION PARA ENVIAR EL PEDIDO POR WHATSAPP, ABRIENDO UNA NUEVA VENTANA CON LA URL DE WHATSAPP 
function comprarPorWhatsApp() {
  if (!carrito.length) return;
  let mensaje = crearMensajeFinalizacionWhatsapp();
  let url = "https://wa.me/" + numWhatsapp + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}

//---------------- Inicializacion 

// FUNCION PARA INICIALIZAR EL CARRITO, CARGANDO LOS DATOS DEL STORAGE, ACTUALIZANDO LA VISTA, SINCRONIZANDO LOS PRECIOS CON EL CATALOGO Y CREANDO LOS ELEMENTOS DEL DRAWER Y MODAL
function inicializarCarritoDOM() {
  cargarCarrito();
  actualizarVistaCarrito();
  sincronizarPreciosCatalogo();
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

      let data = obtenerDatosProductoDesdeBoton(button);
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

//---------------- Exposicion de funciones globales para uso en el HTML
window.agregarAlCarrito = agregarAlCarrito;
window.mostrarCarrito = mostrarCarrito;
window.carrito = carrito;
//---------------- Inicializacion al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarCarritoDOM);

//---------------- Archivo cantidad.js cargado
console.log("cantidad.js cargado");

//---------------- Constantes y variables globales
const SELECTOR_INFO_PRODUCTO = ".info-producto";
const ATRIBUTO_CONTROL_CANTIDAD = "data-cantidad-control";
const ATRIBUTO_VALOR_CANTIDAD = "data-cantidad-value";
const ATRIBUTO_ACCION_CANTIDAD = "data-cantidad-action";
const CLASE_INPUT_CANTIDAD = "cantidad-input";

let toastifyCargaCantidad = null;

// FUNCION PARA CARGAR TOASTIFY DE FORMA ASINCRONICA CON PROMESAS
function cargarToastifyCantidad() {
  if (window.Toastify) return Promise.resolve();
  if (toastifyCargaCantidad) return toastifyCargaCantidad;

  toastifyCargaCantidad = new Promise(function (resolve, reject) {
    if (!document.querySelector('link[data-toastify="true"]')) {
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css";
      link.setAttribute("data-toastify", "true");
      document.head.appendChild(link);
    }

    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return toastifyCargaCantidad;
}

// FUNCION PARA MOSTRAR UNA ALERTA (WARNING) RELACIONADA A LA CANTIDAD
function mostrarAlertaCantidad(mensaje) {
  let msg = String(mensaje || "").trim() || "Selecciona una cantidad para continuar.";

  cargarToastifyCantidad()
    .then(function () {
      if (!window.Toastify) return;
// ESTILO PARA LA ALERTA
    // CONTENIDO
      let contenido = document.createElement("div");
      contenido.style.display = "flex";
      contenido.style.alignItems = "center";
      contenido.style.gap = "12px";
    // ICONO DE ALERTA
      let icono = document.createElement("div");
      icono.style.width = "28px";
      icono.style.height = "28px";
      icono.style.borderRadius = "50%";
      icono.style.display = "flex";
      icono.style.alignItems = "center";
      icono.style.justifyContent = "center";
      icono.style.background = "#FBBA06";
      icono.style.boxShadow = "0 6px 14px rgba(251, 186, 6, 0.35)";
      icono.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />' +
        "</svg>";
    // TEXTO DE LA ALERTA
      let texto = document.createElement("div");
      texto.style.fontFamily = "\"Manrope\", sans-serif";
      texto.style.fontSize = "1rem";
      texto.style.lineHeight = "1.35";
      texto.style.color = "#000000";
      texto.textContent = msg;

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
          background: "#fff8e1",
          border: "1px solid #FBBA06",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          padding: "14px 16px",
          minWidth: "260px",
          maxWidth: "420px"
        }
      }).showToast();
    })
    .catch(function () {
      window.alert(msg);
    });
}

// FUNCION PARA MOSTRAR UN NOTIFICACIÓN DE ÉXITO CON LA CANTIDAD TOTAL AGREGADA
function mostrarToastCantidadAgregada(nombreProducto, cantidad) {
  let nombre = String(nombreProducto || "").trim() || "El producto";
  let cantidadTotal = Number(cantidad);
  if (!Number.isFinite(cantidadTotal)) cantidadTotal = 0;
  cantidadTotal = Math.max(0, Math.floor(cantidadTotal));

  cargarToastifyCantidad()
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

      let textoInicial = document.createElement("span");
      textoInicial.textContent = cantidadTotal === 1 ? "Se agrego 1 " : ("Se agregaron " + cantidadTotal + " unidades de ");

      let nombreSpan = document.createElement("span");
      nombreSpan.textContent = nombre;
      nombreSpan.style.fontWeight = "700";

      let textoFinal = document.createElement("span");
      textoFinal.textContent = " al carrito.";

      texto.appendChild(textoInicial);
      texto.appendChild(nombreSpan);
      texto.appendChild(textoFinal);
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

// FUNCION PARA CREAR E INSERTAR EL CONTADOR (- 0 +) ANTES DEL BOTON "AGREGAR AL CARRITO"
function crearControlCantidad(info) {
  if (!info || info.querySelector("[" + ATRIBUTO_CONTROL_CANTIDAD + "]")) return;

  let button = info.querySelector('button[data-action="add-to-cart"], button');
  if (!button || !esBotonAgregarAlCarrito(button)) return;

  let wrap = document.createElement("div");
  wrap.setAttribute(ATRIBUTO_CONTROL_CANTIDAD, "true");
  wrap.className = "cantidad-control";
  wrap.style.display = "flex";
  wrap.style.alignItems = "center";
  wrap.style.gap = "10px";
  wrap.style.margin = "12px 0";

  let dec = document.createElement("button");
  dec.type = "button";
  dec.setAttribute(ATRIBUTO_ACCION_CANTIDAD, "dec");
  dec.setAttribute("aria-label", "Disminuir cantidad");
  dec.textContent = "-";
  dec.style.width = "38px";
  dec.style.height = "38px";
  dec.style.display = "flex";
  dec.style.alignItems = "center";
  dec.style.justifyContent = "center";
  dec.style.padding = "0";
  dec.style.borderRadius = "10px";
  dec.style.border = "1px solid rgba(105, 76, 58, 0.25)";
  dec.style.background = "#ffffff";
  dec.style.cursor = "pointer";
  dec.style.fontSize = "18px";
  dec.style.lineHeight = "1";

  let value = document.createElement("span");
  value.setAttribute(ATRIBUTO_VALOR_CANTIDAD, "true");
  value.textContent = "0";
  value.style.minWidth = "28px";
  value.style.textAlign = "center";
  value.style.fontFamily = "\"Manrope\", sans-serif";
  value.style.fontWeight = "800";
  value.style.color = "#694C3A";

  let inc = document.createElement("button");
  inc.type = "button";
  inc.setAttribute(ATRIBUTO_ACCION_CANTIDAD, "inc");
  inc.setAttribute("aria-label", "Aumentar cantidad");
  inc.textContent = "+";
  inc.style.width = "38px";
  inc.style.height = "38px";
  inc.style.display = "flex";
  inc.style.alignItems = "center";
  inc.style.justifyContent = "center";
  inc.style.padding = "0";
  inc.style.borderRadius = "10px";
  inc.style.border = "1px solid rgba(105, 76, 58, 0.25)";
  inc.style.background = "#ffffff";
  inc.style.cursor = "pointer";
  inc.style.fontSize = "18px";
  inc.style.lineHeight = "1";

  let input = document.createElement("input");
  input.type = "hidden";
  input.className = CLASE_INPUT_CANTIDAD;
  input.value = "0";

  wrap.appendChild(dec);
  wrap.appendChild(value);
  wrap.appendChild(inc);
  wrap.appendChild(input);

  
  button.parentNode.insertBefore(wrap, button);
}

// FUNCION PARA OBTENER LA CANTIDAD ACTUAL DESDE EL CONTENEDOR DEL PRODUCTO
function obtenerCantidadDesdeInfo(info) {
  if (!info) return 0;
  let input = info.querySelector("." + CLASE_INPUT_CANTIDAD);
  if (!input) return 0;
  let n = Number(input.value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

// FUNCION PARA SETEAR LA CANTIDAD Y REFLEJARLA EN EL SPAN + INPUT HIDDEN
function setCantidadEnInfo(info, nuevaCantidad) {
  if (!info) return;
  let n = Number(nuevaCantidad);
  if (!Number.isFinite(n)) n = 0;
  n = Math.max(0, Math.floor(n));

  let input = info.querySelector("." + CLASE_INPUT_CANTIDAD);
  if (input) input.value = String(n);

  let value = info.querySelector("[" + ATRIBUTO_VALOR_CANTIDAD + "]");
  if (value) value.textContent = String(n);
}

// FUNCION PARA OBTENER EL TEXTO DE UNA OPCION (RADIO, CHECKBOX) A PARTIR DEL LABEL O VALUE
function obtenerTextoOpcion(input) {
  if (!input) return "";
  let label = input.closest ? input.closest("label") : null;
  if (label) return label.textContent.replace(/\s+/g, " ").trim();
  if (input.value) return String(input.value).trim();
  return input.name || "Opcion";
}

// FUNCION PARA OBTENER LAS OPCIONES SELECCIONADAS DENTRO DE UN .info-producto
function obtenerOpcionesSeleccionadasDesdeInfo(info) {
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

// FUNCION PARA OBTENER NOMBRE, PRECIO, CATEGORIA, OPCIONES Y CANTIDAD DESDE EL BOTON "AGREGAR AL CARRITO"
function obtenerDatosProductoDesdeBoton(button) {
  let nombre = button && button.dataset ? (button.dataset.product || "") : "";
  let precio = button && button.dataset ? (Number(button.dataset.price) || 0) : 0;
  let categoria = button && button.dataset ? (button.dataset.category || "otros") : "otros";

  let info = button && button.closest ? button.closest(SELECTOR_INFO_PRODUCTO) : null;

  if ((!nombre || !precio) && info) {
    let titulo = info.querySelector("h2");
    let precioh3 = info.querySelector("h3");
    if (!nombre && titulo) nombre = titulo.textContent.trim();
    if (!precio && precioh3) {
      precio = Number(String(precioh3.textContent || "").replace(/[^\d]/g, "")) || 0;
    }
  }

  if (button && button.dataset && !button.dataset.category) {
    let nodoCategoria = document.querySelector(".product-card-title[data-name]");
    if (nodoCategoria && nodoCategoria.dataset && nodoCategoria.dataset.name) categoria = nodoCategoria.dataset.name;
  }


  let opciones = obtenerOpcionesSeleccionadasDesdeInfo(info);
  let radioElegido = info ? info.querySelector('input[type="radio"].opcion-radio:checked') : null;
  if (radioElegido) {
    let nombreElegido = obtenerTextoOpcion(radioElegido);
    if (nombreElegido) {
      nombre = nombreElegido;
      // Evita duplicar: si el texto del radio estaba en `opciones`, lo quitamos.
      let idx = opciones.indexOf(nombreElegido);
      if (idx !== -1) opciones.splice(idx, 1);
    }
  }

  return {
    nombre: nombre || "Producto",
    precio: precio || 0,
    categoria: categoria || "otros",
    opciones: opciones,
    cantidad: obtenerCantidadDesdeInfo(info)
  };
}

// FUNCION PARA INICIALIZAR EL CONTROL DE CANTIDAD EN CADA PRODUCTO (INICIO EN 0)
function inicializarCantidad() {
  let contenedores = document.querySelectorAll(SELECTOR_INFO_PRODUCTO);
  contenedores.forEach(function (info) {
    crearControlCantidad(info);
    setCantidadEnInfo(info, 0);
  });
}

//-----EVENTOS

// EVENTO PARA DETECTAR CLICK EN LOS BOTONES DE INCREMENTAR O DECREMENTAR CANTIDAD
document.addEventListener("click", function (e) {
  let btn = e.target && e.target.closest ? e.target.closest("button") : null;
  if (!btn) return;

  let action = btn.getAttribute(ATRIBUTO_ACCION_CANTIDAD);
  if (action !== "inc" && action !== "dec") return;

  let info = btn.closest ? btn.closest(SELECTOR_INFO_PRODUCTO) : null;
  if (!info) return;

  let actual = obtenerCantidadDesdeInfo(info);
  let next = action === "inc" ? actual + 1 : actual - 1;
  setCantidadEnInfo(info, next);
});

// EVENTO PARA DETECTAR CLICK EN EL BOTON "AGREGAR AL CARRITO" Y VALIDAR QUE LA CANTIDAD SEA MAYOR A 0
document.addEventListener(
  "click",
  function (e) {
    let button = e.target && e.target.closest ? e.target.closest("button") : null;
    if (!esBotonAgregarAlCarrito(button)) return;

    let info = button.closest ? button.closest(SELECTOR_INFO_PRODUCTO) : null;
    if (!info) return;

    // Solo intervenimos si el control de cantidad existe en este producto.
    if (!info.querySelector("[" + ATRIBUTO_CONTROL_CANTIDAD + "]")) return;

    let data = obtenerDatosProductoDesdeBoton(button);
    let cantidad = Number(data.cantidad) || 0;

    //METODOS DEL OBJETO EVENTO DE JAVASCRIPT
    if (cantidad <= 0) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      mostrarAlertaCantidad();
      return;
    }

    if (typeof window.agregarAlCarrito !== "function") {
      // Si el carrito no esta disponible, dejamos que el click siga su curso.
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();

    for (let i = 0; i < cantidad; i++) {
      let isLast = i === cantidad - 1;
      window.agregarAlCarrito(
        { nombre: data.nombre, precio: data.precio },
        data.categoria,
        data.opciones,
        { silent: true, skipUpdate: !isLast }
      );
    }

    mostrarToastCantidadAgregada(data.nombre, cantidad);

    // Reset a 0 luego de agregar.
    setCantidadEnInfo(info, 0);
  },
  true
);

document.addEventListener("DOMContentLoaded", inicializarCantidad);

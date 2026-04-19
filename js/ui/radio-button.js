//---------------- Archivo radio-button.js cargado
console.log("radio-button.js cargado");


const RADIO_SELECTOR = 'input[type="radio"].opcion-radio';

let toastifyCargaRadio = null;

// FUNCION PARA CARGAR TOASTIFY
function cargarToastifyRadio() {
  if (window.Toastify) return Promise.resolve();
  if (toastifyCargaRadio) return toastifyCargaRadio;

  toastifyCargaRadio = new Promise(function (resolve, reject) {
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

  return toastifyCargaRadio;
}

// FUNCÓN PARA MOSTRAR ALERTA CUANDO NO SE HA SELECCIONADO UNA OPCION DE RADIO-BUTTON ANTES DE AGREGAR AL CARRITO
function mostrarAlertaRadio(mensaje) {
  let msg = String(mensaje || "").trim() || "Elegi una opcion para continuar.";

  //USO DE THEN Y CATCH PARA CARGAR TOASTIFY Y MOSTRAR LA ALERTA, CON UN FALBACK A ALERTA NORMAL SI FALLA LA CARGA DE TOASTIFY
  cargarToastifyRadio()
    .then(function () {
      if (!window.Toastify) return;

      //CREACION DE ELEMENTOS
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
      icono.style.background = "#FBBA06";
      icono.style.boxShadow = "0 6px 14px rgba(251, 186, 6, 0.35)";
      icono.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />' +
        "</svg>";

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
      // Fallback si falla la carga de Toastify
      window.alert(msg);
    });
}

// FUNCION PARA OBTENER EL TEXTO DE LA OPCION DE RADIO SELECCIONADA
function obtenerTextoOpcionRadio(input) {
  if (!input) return "";
  let label = input.closest ? input.closest("label") : null;
  if (!label) return String(input.value || "").trim();
  return label.textContent.replace(/\s+/g, " ").trim();
}

// FUNCION PARA MARCAR LA SELECCION VISUAL DE UN RADIO-BUTTON SELECCIONADO
function marcarSeleccionVisual(container) {
  if (!container) return;
  let labels = container.querySelectorAll("label");
  labels.forEach(function (label) {
    label.classList.remove("is-radio-selected");
  });

  let selected = container.querySelector(RADIO_SELECTOR + ":checked");
  if (!selected) return;
  let selectedLabel = selected.closest ? selected.closest("label") : null;
  if (selectedLabel) selectedLabel.classList.add("is-radio-selected");
}

// FUNCION PARA INICIALIZAR LOS RADIO BUTTONS EN UN CONTENEDOR
function inicializarRadiosEn(container) {
  if (!container) return;
  let radios = container.querySelectorAll(RADIO_SELECTOR);
  if (!radios.length) return;

  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      marcarSeleccionVisual(container);
    });
  });

  marcarSeleccionVisual(container);
}

// FUNCION PARA INICIALIZAR LOS RADIO BUTTONS EN TODA LA PAGINA
function inicializarRadioButtons() {
  // Inicializa cada bloque de producto que tenga radios.
  let contenedores = document.querySelectorAll(".info-producto");
  contenedores.forEach(function (info) {
    if (!info.querySelector(RADIO_SELECTOR)) return;
    inicializarRadiosEn(info);
  });
}

// FUNCION PARA VALIDAR QUE SE HAYA ELEGIDO UNA OPCION ANTES DE AGREGAR AL CARRITO
function registrarValidacionAgregarAlCarrito() {
  document.addEventListener(
    "click",
    function (e) {
      let button = e.target && e.target.closest ? e.target.closest("button") : null;
      if (!esBotonAgregarAlCarrito(button)) return;

      let info = button.closest ? button.closest(".info-producto") : null;
      if (!info) return;

      let radios = info.querySelectorAll(RADIO_SELECTOR);
      if (!radios.length) return;

      let checked = info.querySelector(RADIO_SELECTOR + ":checked");
      if (checked) {
        // Si hay seleccion, actualizar el data-product para incluir la opcion
        const textoOpcion = obtenerTextoOpcionRadio(checked).split(':')[0].trim();
        const originalProduct = button.getAttribute('data-product') || 'Producto';
        button.setAttribute('data-product', `${originalProduct} - ${textoOpcion}`);
        return; // Dejar que cart.js agregue
      }

      // Si no hay seleccion, mostrar alerta y DETENER completamente el evento
      mostrarAlertaRadio("Elegi una opcion antes de agregar al carrito.");
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    },
    true
  );
}

window.RadioButtonUI = {
  inicializarRadioButtons: inicializarRadioButtons,
  obtenerTextoOpcionRadio: obtenerTextoOpcionRadio
};

document.addEventListener("DOMContentLoaded", function () {
  inicializarRadioButtons();
  registrarValidacionAgregarAlCarrito();
});

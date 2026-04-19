//---------------- Archivo check-box.js cargado
console.log("check-box.js cargado");

// UI y validacion


const opcionesCheckbox = document.querySelectorAll(".opcion-checkbox");

// FUNCION PARA CARGAR TOASTIFY (MISMA QUE EN CART.JS)
let toastifyCargaCheckbox = null;
function cargarToastifyCheckbox() {
  if (window.Toastify) return Promise.resolve();
  if (toastifyCargaCheckbox) return toastifyCargaCheckbox;

  toastifyCargaCheckbox = new Promise(function (resolve, reject) {
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

  return toastifyCargaCheckbox;
}

// FUNCION PARA MOSTRAR UNA NOTIFICACION DE LIMITE DE VARIEDADES CON TOASTIFY
function mostrarAlertaLimiteVariedades(mensaje) {
  cargarToastifyCheckbox()
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
      texto.textContent = mensaje;

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
    .catch(function () {});
}

//---------------- Eventos
// Evento para validar que no se seleccionen mas de 4 variedades, desmarcando la ultima seleccionada y mostrando una alerta personalizada
opcionesCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checked = document.querySelectorAll(".opcion-checkbox:checked");

    if (checked.length > 4) {
      checkbox.checked = false;
      mostrarAlertaLimiteVariedades("Podes elegir hasta 4 variedades.");
    }
  });
});

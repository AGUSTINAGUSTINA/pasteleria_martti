//---------------- UI y alertas
function mostrarAlertaContacto(mensaje) {
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) {
    alert(mensaje);
    return;
  }

  let dialog = document.getElementById("contacto-alert-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "contacto-alert-dialog";
    dialog.className = "mini-alert-dialog";
    dialog.innerHTML =
      '<p class="mini-alert-msg"></p>' +
      '<button type="button" class="mini-alert-close">Aceptar</button>';
    document.body.appendChild(dialog);

    dialog.querySelector(".mini-alert-close").addEventListener("click", function () {
      dialog.close();
    });
  }

  dialog.querySelector(".mini-alert-msg").textContent = mensaje;
  if (dialog.open) {
    dialog.close();
  }
  dialog.showModal();
}

//---------------- Envio
function enviarContactoPorWhatsapp() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value;

  if (!nombre || !email || !asunto || !mensaje) {
    mostrarAlertaContacto("Por favor completa los campos requeridos");
    return;
  }

  const contenido = `*Nuevo mensaje de contacto*%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Email:* ${encodeURIComponent(email)}%0A*Telefono:* ${encodeURIComponent(telefono || "No proporcionado")}%0A*Asunto:* ${encodeURIComponent(asunto)}%0A%0A*Mensaje:*%0A${encodeURIComponent(mensaje)}`;

  window.open(`https://wa.me/+5493512729694?text=${contenido}`, "_blank");
}

//---------------- Eventos
const botonWhatsapp = document.querySelector(".btn-whatsapp");
if (botonWhatsapp) {
  botonWhatsapp.addEventListener("click", function (e) {
    e.preventDefault();
    enviarContactoPorWhatsapp();
  });
}

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}

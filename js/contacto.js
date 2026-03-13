// FUNCION DE CONTACTO: ENVIAR FORMULARIO
/*
Entrada: datos escritos por el usuario en el formulario de contacto.
Proceso: validar campos y enviar el mensaje por WhatsApp.
Salida: apertura de WhatsApp con el contenido del mensaje armado.
*/

/*
Aqui defini las funciones para manejar el formulario de contacto.
Uso una URL de WhatsApp para enviar el mensaje.
*/

// FUNCION PARA MOSTRAR UN DIALOGO EN CONTACTO
/*
Entrada: mensaje (string).
Proceso: crea o reutiliza un dialog y muestra el mensaje.
Salida: dialog visible o alert de respaldo.
*/
function mostrarDialogoContacto(mensaje) {
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

/*
No queria usar alert, porque al ya trabajar con el DOM preferi mostrar un dialogo propio, personalizado con CSS/SCSS
y siguiendo el diseno general del sitio web de Pasteleria Martti.
Busque en MDN como mostrar un cuadro de dialogo y encontre el uso de HTMLDialogElement con showModal().
Como en MDN dice en "Browser compatibility" que el soporte depende del navegador, deje alert como respaldo
por si no esta disponible, para garantizar que el mensaje siempre se vea.
*/

// FUNCION PARA ENVIAR EL FORMULARIO POR WHATSAPP
/*
Entrada: valores del formulario.
Proceso: valida campos y arma el mensaje de WhatsApp.
Salida: se abre WhatsApp en nueva pestana.
*/
function enviarWhatsApp() {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const asunto = document.getElementById('asunto').value;
  const mensaje = document.getElementById('mensaje').value;

  /*
  En esta funcion defino la logica para enviar el formulario por WhatsApp.
  1) Obtengo los valores del formulario.
  2) Valido que los campos obligatorios no esten vacios.
  3) Si falta algo, muestro el dialog y corto la funcion.
  4) Armo el mensaje con encodeURIComponent para que la URL no se rompa.
  */

  if (!nombre || !email || !asunto || !mensaje) {
    mostrarDialogoContacto('Por favor completa los campos requeridos');
    return;
  }

  const contenido = `*Nuevo mensaje de contacto*%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Email:* ${encodeURIComponent(email)}%0A*Telefono:* ${encodeURIComponent(telefono || 'No proporcionado')}%0A*Asunto:* ${encodeURIComponent(asunto)}%0A%0A*Mensaje:*%0A${encodeURIComponent(mensaje)}`;

  window.open(`https://wa.me/+5493512729694?text=${contenido}`, '_blank');
}

// FUNCION PARA MANEJAR EL CLICK EN EL BOTON DE WHATSAPP
const botonWhatsApp = document.querySelector(".btn-whatsapp");
if (botonWhatsApp) {
  botonWhatsApp.addEventListener("click", function (e) {
    e.preventDefault();
    enviarWhatsApp();
  });
}

/*
Esta funcion maneja el click en el boton de WhatsApp.
- querySelector: busca el boton en el DOM.
- addEventListener: escucha el click del usuario.
- preventDefault: evita el comportamiento por defecto.
*/

// Limpiar el formulario despues de enviar
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  });
}

/*
Use preventDefault para evitar el comportamiento predeterminado de submit del formulario.
*/

//FUNCION PARA EVITAR QUE SE ELEGAN MAS DE 4 VARIEDADES

const checkboxes = document.querySelectorAll(".opcion-checkbox");

//FUNCION PARA MOSTRAR UN DIALOGO DE LIMITE
function mostrarDialogoLimite(mensaje) {
  if (!window.HTMLDialogElement) {
    alert(mensaje);
    return;
  }

  let dialog = document.getElementById("limite-variedades-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "limite-variedades-dialog";
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

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checked = document.querySelectorAll(".opcion-checkbox:checked");

    if (checked.length > 4) {
      checkbox.checked = false;
      mostrarDialogoLimite("Podes elegir hasta 4 variedades.");
    }
  });
});




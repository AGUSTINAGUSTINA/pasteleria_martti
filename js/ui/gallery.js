//-----------------------------------------------------------
// Interaccion UI
function inicializarGaleriaProducto() {
  const imagenPrincipal = document.getElementById("imagenPrincipal");
  const miniaturas = document.querySelectorAll(".miniatura");
  if (!imagenPrincipal || !miniaturas.length) return;

  miniaturas.forEach(function (mini) {
    mini.addEventListener("click", function () {
      const srcOriginal = imagenPrincipal.src;
      imagenPrincipal.src = this.src;
      this.src = srcOriginal;
    });
  });
}

document.addEventListener("DOMContentLoaded", inicializarGaleriaProducto);

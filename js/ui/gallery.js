// FUNCION PARA INICIALIZAR EL GALLERY EN EL DOM


document.addEventListener("DOMContentLoaded", function () {

  const imagenPrincipal = document.getElementById("imagenPrincipal");
  const miniaturas = document.querySelectorAll(".miniatura");

  miniaturas.forEach(mini => {
    mini.addEventListener("click", function () {

      const srcOriginal = imagenPrincipal.src;
      imagenPrincipal.src = this.src;
      this.src = srcOriginal;

    });
  });

});




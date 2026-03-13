// FUNCION PARA INICIALIZAR EL GALLERY EN EL DOM
/*
Entrada: DOM cargado y miniaturas en la pagina.
Proceso: asigna eventos para intercambiar la imagen principal con la miniatura.
Resultado: galeria interactiva al hacer click.
*/

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

/*
Esta funcion escucha el evento DOMContentLoaded para asegurarse de que el DOM ya existe.
Luego agrega un click a cada miniatura para intercambiar su imagen con la imagen principal.
El resultado es que el usuario puede cambiar la imagen grande al hacer click.
*/

//---------------- Archivo gallery.js cargado
console.log("gallery.js cargado");


// Interaccion UI

// FUNCION PARA INICIALIZAR LA GALERIA DE IMAGENES EN LA PAGINA DE PRODUCTOS, PERMITIENDO HACER CLICK EN LAS MINIATURAS PARA CAMBIAR LA IMAGEN PRINCIPAL
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

//---------------- Inicializacion de funciones al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarGaleriaProducto);

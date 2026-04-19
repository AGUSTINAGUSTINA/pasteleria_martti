//---------------- archivo min.js cargado
console.log("main.js cargado");


//---------------- Datos base del proyecto
const pasteleriaMartti = {
  nombre: "Pasteleria Martti",
  productos: []
};



//FUNCION CONSTRUCTORA DE PRODUCTOS CON NOMBRE Y PRECIO
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

const tartas = [
  new Producto("Tarta de peras con nueces y almendras", 35000),
  new Producto("Key lime pie", 44000),
  new Producto("Tarta de frutal", 34000),
  new Producto("Maracuya pie", 43000),
  new Producto("Tarta Cabsha", 35000),
  new Producto("Tarta de chocolate y naranja", 45000),
  new Producto("Tarta de coco", 35000),
  new Producto("Lemon pie", 35000)
];

const tortas = [
  new Producto("Torta mousse de chocolate", 48000),
  new Producto("Chocotorta", 44000),
  new Producto("Cheesecake frutos rojos", 46000),
  new Producto("Torta Oreo", 43000),
  new Producto("Torta decorada", 41000),
  new Producto("Torta Matilda blanca", 44000),
  new Producto("Carrot cake", 42000),
  new Producto("Torta brownie", 43000)
];

const postres = [
  new Producto("Rogel", 38000),
  new Producto("Tiramisu", 34000),
  new Producto("Pavlova", 43000),
  new Producto("Blondie de frutos rojos", 46000),
  new Producto("Marquise clasica", 46000),
  new Producto("Nube de nuez", 39000)
];

const otrosProductos = [
  new Producto("Muffins frutos rojos", 4000),
  new Producto("Petit fours", 38000),
  new Producto("Lingotes", 43000),
  new Producto("Mini Tartas", 43000),
  new Producto("Huevo de Pascua Franuí", 50000),
  new Producto("Huevo de Pascua Pistacho", 50000),
  new Producto("Huevo de Pascua Tiramisú", 38000),
  new Producto("Huevo de Pascua Oreo", 40000),
  new Producto("Pan dulce Dubai", 28000),
  new Producto("Pan dulce Nutella", 28000),
  new Producto("Cookies New York", 3400),
  new Producto("Cookies Red Velvet", 3400),
  new Producto("Chipa", 2900),
  new Producto("Tableta de chocolate Dubai", 27000),
  new Producto("Tableta de chocolate con almendras", 22000),
  new Producto("Tableta de chocolate blanco con oreo", 24000),
  new Producto("Alfajores Dubai", 5000),
  new Producto("Alfajores dulce de leche y nuez", 3300),
  new Producto("Alfajores de maicena", 3000),
  new Producto("Box desayuno sorpresa", 39000),
  new Producto("Box Navidad", 39000),
  new Producto("Box porciones de torta", 36000),
  new Producto("Box alfajores", 18000)
];

// Agregando los productos al objeto global de la pasteleria
pasteleriaMartti.productos = {
  tartas,
  tortas,
  postres,
  otros: otrosProductos
};

//----------------Exportacion global
window.pasteleriaMartti = pasteleriaMartti;

//---------------- Interaccion UI

// FUNCION PARA IDENTIFICAR BOTONES DE AGREGAR AL CARRITO (HELPER GLOBAL)
function esBotonAgregarAlCarrito(button) {
  if (!button) return false;
  if (button.dataset && button.dataset.action === "add-to-cart") return true;
  return /agregar al carrito/i.test(button.textContent || "");
}

//FUNCION PRINCIPAL: INICIALIZACION DE FUNCIONES AL CARGAR EL DOM, COMO EL MENU RESPONSIVE Y LA CARGA DE RESEÑAS
function inicializarMain() {
  console.log("Main.js cargado correctamente");
  inicializarMenuResponsive();
  cargarResenas();
}





// FUNCION PARA INICIALIZAR EL MENU RESPONSIVE 
/*
Decidí hacerlo con js en vez de con boostrap para tener un control total sobre 
la estructura y el comportamiento, ademas de practicar manipulación del DOM y 
eventos
*/
function inicializarMenuResponsive() {
  const navbars = document.querySelectorAll(".navbar");
  navbars.forEach((navbar) => {
    const toggle = navbar.querySelector(".nav-toggle");
    const links = navbar.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.addEventListener("click", (event) => {
      if (event.target && event.target.tagName === "A") {
        navbar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

//FUNCION PARA ESCAPAR CARACTERES ESPECIALES
function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

//CONSULTA DE RESEÑAS SIMULADAS DESDE API EXTERNA
//FUNCION PARA CARGAR RESEÑAS
function cargarResenas() {
  const grid = document.querySelector(".reviews-grid");
  if (!grid) return;

  const status = document.querySelector(".reviews-status");
  const cantidad = 6;
  const productosPasteleria = [
    "torta de chocolate",
    "lemon pie",
    "pavlova",
    "tarta de peras",
    "chocotorta",
    "cookies",
    "mousse de chocolate",
    "mini tartas",
    "petit fours"
  ];
  const nombresEspanol = [
    "Sofia Martinez",
    "Lucia Gomez",
    "Valentina Ruiz",
    "Camila Herrera",
    "Martina Lopez",
    "Isabella Diaz",
    "Mia Fernandez",
    "Santiago Perez",
    "Mateo Garcia",
    "Thiago Romero",
    "Juan Cruz Torres",
    "Nicolas Alvarez"
  ];
  const detallesPasteleria = [
    "textura suave y sabor equilibrado.",
    "presentacion impecable y porciones generosas.",
    "fresca, delicada y con el punto justo de dulzor.",
    "se nota lo artesanal en cada bocado.",
    "excelente combinacion de sabores y cremosidad.",
    "llego perfecta y la calidad fue de primera."
  ];
  const plantillasResena = [
    "Probe la {producto} y fue espectacular: {detalle}",
    "La {producto} estaba increible; {detalle}",
    "Se nota lo artesanal en la {producto}; {detalle}",
    "Mi favorita fue la {producto}: {detalle}",
    "Volveria a pedir la {producto}. {detalle}"
  ];


  // FUNCION PARA ACTUALIZAR EL MENSAJE DE ESTADO EN LA INTERFAZ DE USUARIO
  function actualizarEstadoInterfaz(textoMensaje) {
    // Si no existe el elemento de estado, salir de la función
    if (!status) {
      console.log("Elemento de estado no encontrado, no se puede actualizar.");
      return;
    }

    // Si no hay mensaje, ocultar el estado
    if (!textoMensaje) {
      status.hidden = true;
      console.log("Estado ocultado porque no hay mensaje.");
      return;
    }

    // Si hay mensaje, mostrarlo
    status.hidden = false;
    status.textContent = textoMensaje;
    console.log(`Estado actualizado con mensaje: "${textoMensaje}"`);
  }

  actualizarEstadoInterfaz("Cargando reseñas...");


  // FUNCION PARA SELECCIONAR UN ELEMENTO ALEATORIO DE UNA LISTA, UTILIZADA PARA GENERAR RESEÑAS VARIADAS A PARTIR DE PLANTILLAS Y DETALLES PREDEFINIDOS
  function elegirAleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // FUNCION PARA ARMAR UNA RESEÑA A PARTIR DE UN PRODUCTO Y UN DETALLE
  function armarResena(producto, detalle) {
    const plantilla = elegirAleatorio(plantillasResena);
    return plantilla
      .replace("{producto}", producto)
      .replace("{detalle}", detalle);
  }

  // FUNCION PARA OBTENER UN DETALLE ALEATORIO A PARTIR DE UN COMENTARIO
  function obtenerDetalleDesdeComentario(comentario) {
    const texto = String(comentario || "");
    if (!texto) return elegirAleatorio(detallesPasteleria);
    const indice = texto.length % detallesPasteleria.length;
    return detallesPasteleria[indice];
  }

  // FUNCION PARA GENERAR ESTRELLAS VISUALES BASADAS EN UNA CALIFICACION POR "LIKES" OBTENIDA DE LA API DE DUMMYJSON
  function generarEstrellas(calificacion) {
    let estrellas = "";
    for (let i = 1; i <= 5; i += 1) {
      const clase = i <= calificacion ? "star filled" : "star empty";
      estrellas += `<span class="star ${clase}" aria-hidden="true">★</span>`;
    }
    return (
      `<div class="review-rating" aria-label="Calificacion: ${calificacion} de 5">` +
      estrellas +
      `<span class="sr-only">Calificacion: ${calificacion} de 5</span>` +
      `</div>`
    );
  }

  //USO DE FETCH PARA SIMULAR CONSULTA A API EXTERNA DE RESEÑAS Y USUARIOS
  //Aquí utilizo all para hacer ambas consultas de datos en paralelo y luego procesarlos juntos
  Promise.all([
    /*Uso de API de dummyjson para aportar likes para calcular las estrellas de cada
     reseña, el comentario para hacerlo mas real y que los comentarios sean en español
     y referidos a productos de pastelería, los muestro como cards con contenido crado
     de manera manual y aleatoria
    */
    fetch("https://dummyjson.com/comments?limit=" + cantidad).then((respuesta) => respuesta.json()),
    /*
    Uso de API de randomuser para aportar avatar y ciudad para cada usuario, 
    los nombres los genero de manera manual para que sean comunes en español, 
    y asi aportar mas realismo a las reseñas, y las fotos de las personas
    si se obtienen de la API
    */
    fetch("https://randomuser.me/api/?results=" + cantidad + "&nat=es,ar").then((respuesta) => respuesta.json())
  ])
    .then(([comentariosData, usuariosData]) => {
      const comentarios = Array.isArray(comentariosData?.comments) ? comentariosData.comments : [];
      const usuarios = Array.isArray(usuariosData?.results) ? usuariosData.results : [];
      const total = Math.min(comentarios.length, usuarios.length, cantidad);

      if (!total) {
        setStatus("No se pudieron cargar reseñas.");
        return;
      }
      // Armado de cards de reseñas utilizando los datos obtenidos de ambas APIs, combinados con los productos y detalles predefinidos:
      const html = comentarios.slice(0, total).map((comentario, index) => {
        const usuario = usuarios[index] || {};
        const nombre = nombresEspanol[index % nombresEspanol.length];
        const ciudad = usuario.location?.city || "Argentina";
        const avatar = usuario.picture?.medium || "";
        const producto = elegirAleatorio(productosPasteleria);
        const detalle = obtenerDetalleDesdeComentario(comentario.body);
        const cuerpo = armarResena(producto, detalle);
        const likes = Number(comentario.likes || 0);
        const rating = Math.min(5, Math.max(3, Math.round(likes / 10) + 3));
        // Lo que se muestra en las cards de reseñas
        return (
          `<article class="review-card">` +
          `<div class="review-header">` +
          (avatar ? `<img class="review-avatar" src="${escapeHtml(avatar)}" alt="Foto de ${escapeHtml(nombre)}" loading="lazy">` : "") +
          `<div class="review-user">` +
          `<h3 class="review-name">${escapeHtml(nombre)}</h3>` +
          `<p class="review-meta">Cliente de ${escapeHtml(ciudad)} - Recomienda ${escapeHtml(producto)}</p>` +
          `</div>` +
          `</div>` +
          `<p class="review-body">${escapeHtml(cuerpo)}</p>` +
          generarEstrellas(rating) +
          `</article>`
        );
      }).join("");

      grid.innerHTML = html;
      actualizarEstadoInterfaz("");
    })
    .catch((error) => {
      console.error("Error cargando reseñas:", error);
      actualizarEstadoInterfaz("No se pudieron cargar reseñas.");
    });
}

document.addEventListener("DOMContentLoaded", inicializarMain);


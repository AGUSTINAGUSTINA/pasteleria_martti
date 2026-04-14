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
  new Producto("Blondie", 46000),
  new Producto("Marquise clasica", 46000),
  new Producto("Nube de nuez", 39000)
];

const otrosProductos = [
  new Producto("Muffins frutos rojos", 4000),
  new Producto("Petit fours", 38000),
  new Producto("Lingotes", 43000),
  new Producto("Mini Tartas", 43000),
  new Producto("Huevos de Pascua", 28000),
  new Producto("Pan dulce Dubai", 28000),
  new Producto("Pan dulce Nutella", 28000),
  new Producto("Cookies New York", 3400),
  new Producto("Cookies Red Velvet", 3400),
  new Producto("Chipa", 2900),
  new Producto("Tableta de chocolate Dubai", 24000),
  new Producto("Alfajores Dubai", 5000),
  new Producto("Alfajores dulce de leche y nuez", 3300),
  new Producto("Alfajores de maicena", 3000),
  new Producto("Desayuno sorpresa", 3900),
  new Producto("Box Dia de la madre", 40000),
  new Producto("Box Dia del padre", 40000),
  new Producto("Box Navidad", 39000),
  new Producto("Box dia del nino", 28000),
  new Producto("Box porciones de torta", 36000),
  new Producto("Box alfajores", 20000)
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

//FUNCION PRINCIPAL: INICIALIZACION DE FUNCIONES AL CARGAR EL DOM, COMO EL MENU RESPONSIVE Y LA CARGA DE RESEÑAS
function inicializarMain() {
  console.log("Main.js cargado correctamente");
  inicializarMenuResponsive();
  cargarResenas();
}



//FUNCIONES AUXILIARES:

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


  // FUNCION PARA ACTUALIZAR EL MENSAJE DE ESTADO DE LA INTERFAZ
  function setStatus(mensaje) {
    if (!status) return;
    if (!mensaje) {
      status.hidden = true;
      return;
    }
    status.hidden = false;
    status.textContent = mensaje;
  }

  setStatus("Cargando resenas...");


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

  // FUNCION PARA OBTENER UN NOMBRE ALEATORIO A PARTIR DE UN USUARIO
  function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i += 1) {
      const clase = i <= rating ? "star filled" : "star empty";
      stars += `<span class="star ${clase}" aria-hidden="true">★</span>`;
    }
    return (
      `<div class="review-rating" aria-label="Calificacion: ${rating} de 5">` +
        stars +
        `<span class="sr-only">Calificacion: ${rating} de 5</span>` +
      `</div>`
    );
  }

  //USO DE FETCH PARA SIMULAR CONSULTA A API EXTERNA DE RESEÑAS Y USUARIOS
  Promise.all([
    fetch("https://dummyjson.com/comments?limit=" + cantidad).then((res) => res.json()),
    fetch("https://randomuser.me/api/?results=" + cantidad + "&nat=es,ar").then((res) => res.json())
  ])
    .then(([comentariosData, usuariosData]) => {
      const comentarios = Array.isArray(comentariosData?.comments) ? comentariosData.comments : [];
      const usuarios = Array.isArray(usuariosData?.results) ? usuariosData.results : [];
      const total = Math.min(comentarios.length, usuarios.length, cantidad);

      if (!total) {
        setStatus("No se pudieron cargar reseñas.");
        return;
      }

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
            renderStars(rating) +
          `</article>`
        );
      }).join("");

      grid.innerHTML = html;
      setStatus("");
    })
    .catch((error) => {
      console.error("Error cargando resenas:", error);
      setStatus("No se pudieron cargar resenas.");
    });
}

document.addEventListener("DOMContentLoaded", inicializarMain);


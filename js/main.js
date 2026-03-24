// MAIN.JS








//OBJETO 
const pasteleriaMartti = {
  nombre: "Pasteleria Martti",
  productos: []
};

 

//ARRAYS DE PRODUCTOS POR CATEGORIA



// CLASE PRODUCTO


// FUNCION CONSTRUCTORA
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }


}

// Tartas
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
// Tortas
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

// Postres
const postres = [
  new Producto("Rogel", 38000),
  new Producto("Tiramisu", 34000),
  new Producto("Pavlova", 43000),
  new Producto("Blondie", 46000),
  new Producto("Marquise clasica", 46000)
  
];

// Otros
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

// ASOCIACION DE ARRAYS AL OBJETO PASTELERIA MARTTI

pasteleriaMartti.productos = {
  tartas,
  tortas,
  postres,
  otros: otrosProductos
};


// ASIGNACION A UNA PROPIEDAD DEL OBJETO PASTELERIAMARTTI GLOBAL PARA ACCESO DESDE OTROS ARCHIVOS

window.pasteleriaMartti = pasteleriaMartti;




document.addEventListener("DOMContentLoaded", function () {
  console.log("Main.js cargado correctamente");
});







postres.unshift(new Producto("Nube de nuez", 39000));




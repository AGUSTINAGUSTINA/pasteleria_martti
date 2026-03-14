// MAIN.JS

/*

PASTELERIA MARTTI es la pasteleria de una amiga que me brindó su logo y fotos de los productos para
el proyecto.

En este archivo defino las categorias y sus productos.
Entrada: datos de productos definidos en este archivo.
Proceso: creación de objetos Producto agrupados por categoria cons su nombre y precio.
Salida: objeto pasteleriaMartti listo para usar en el proyecto.
*/

/*
Coloque una breve descripcion en el archivo segunda-entrega donde organice todo el contenido
 de esta entrega.
*/
/* 
Decidi colocar en este archivo main.js los datos principales del sitio web, como las categorias y sus 
respectivos productos.
Los archivos search.js y cart.js los voy a utilizar para manejar la logica de busqueda y la 
funcionalidad de agregar productos al carrito.
*/

/*
Se realizaron cambios en los archivos presentados en la primer entrega para aplicar lo 
aprendido en las unidades siguientes, como el uso de funciones constructora, funciones de 
orden superior, nuevos metodos de arrays, localStorage y eventos DOM.
*/

//OBJETO 
const pasteleriaMartti = {
  nombre: "Pasteleria Martti",
  productos: []
};

/*
Declare el objeto pasteleriaMartti porque representa la raiz del proyecto: la pasteleria.
Dentro de este objeto agrupe la informacion principal, utilizando una propiedad
nombre para identificar la pasteleria y una propiedad productos, que inicialmente es un 
array vacio y luego se completa con los productos organizados por categorias.

Elegi trabajar con un objeto porque me permite mantener toda la informacion relacionada centralizada y 
organizada en un solo lugar. Ademas, facilita la gestion de los datos y su acceso desde otras
partes del codigo, como las funciones de busqueda (que se encuentran en el archivo search.js) y la futura
implementacion del carrito de compras en un archivo cart.js.
*/ 

//ARRAYS DE PRODUCTOS POR CATEGORIA

/*
Aqui utilice una -> FUNCION CONSTRUCTORA (ya que construye objetos) <- para crear objetos de 
tipo Producto, lo que me permite definir una estructura clara para cada producto, con las
propiedades nombre y precio. Esto facilita la creacion de nuevos productos y su manejo 
dentro del codigo.
La eleccion de "class" fue porque fue incorporada en ES6, que es mas moderna y 
clara para definir la funcion constructora. Podria haber utilizado la sintaxis con 
function Producto, pero ya que a nivel laboral se valora el uso de las ultimas caracteristicas 
de JavaScript, opte por la sintaxis de class.
*/

// CLASE PRODUCTO
/*
Entrada: nombre (string) y precio (numero).
Proceso: asigna las propiedades al objeto.
Salida: un objeto Producto con nombre y precio.
*/

// FUNCION CONSTRUCTORA
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

/*
Luego "invoco" la funcion constructora para crear cada producto, pasando el nombre y el 
precio como argumentos.
*/
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
/*
Asocie los arrays de productos al objeto pasteleriaMartti, creando una propiedad productos que es un 
objeto con las categorias como claves y los arrays de productos como valores. 
*/
pasteleriaMartti.productos = {
  tartas,
  tortas,
  postres,
  otros: otrosProductos
};


// ASIGNACION A UNA PROPIEDAD DEL OBJETO PASTELERIAMARTTI GLOBAL PARA ACCESO DESDE OTROS ARCHIVOS

window.pasteleriaMartti = pasteleriaMartti;

/*
Aqui guardo una referencia del objeto en el scope global del navegador. Segun la documentacion 
de MDN, la propiedad window es la ventana global del navegador, es decir, que cualquier variable
o funcion asignada a window se vuelve accesible desde cualquier parte del codigo.
Al utilizar pasteleriaMartti a window.pasteleriaMartti, hago que el objeto 
pasteleriaMartti este disponible globalmente, lo que permite que otros archivos js, como 
search.js y cart.js, puedan acceder a el sin necesidad de importarlo explicitamente. 
*/

// Verificacion por consola: uso de evento 
/*
Entrada: evento DOMContentLoaded.
Proceso: muestra un mensaje por consola.
Salida: confirmacion de carga de main.js.
*/
document.addEventListener("DOMContentLoaded", function () {
  console.log("Main.js cargado correctamente");
});

/*
Aqui uso addEventListener para escuchar el evento:
DOMContentLoaded, que se dispara cuando el documento HTML este completamente cargado antes de 
ejecutar el codigo.
Luego muestro el mensaje por consola para poder confirmar que este archivo esta cargado.
*/

/* PARA MOSTRAR POR CONSOLA LAS CATEGORIAS Y LOS PRODUCTOS
console.log("Categorias de productos:");
console.log(Object.keys(pasteleriaMartti.productos));

Utilice Object.keys para obtener las claves del objeto pasteleriaMartti.productos,
las cuales representan las categorias definidas previamente en los arrays. Esto me permite mostrar por 
consola las categorias disponibles en la pasteleria.
 - Object.keys: devuelve un array con las claves del objeto pasado como parametro.
--> Resultado: devuelve las categorias de productos. */

/*MUESTRO EN CONSOLA TODOS LOS PRODUCTOS
console.log("Productos :");
console.log(pasteleriaMartti.productos);

APLICACION DE METODOS--> UNSHIFT <-- para agregar este nuevo producto a la categoria "postres"

Utilice el metodo unshift para agregar el nuevo producto al comienzo del array de postres, 
lo que permite destacar el producto, ya que es nuevo.
 */

postres.unshift(new Producto("Nube de nuez", 39000));

/* Verificacion por consola del agregado de Nube de nuez al array postres:
console.log("Array POSTRES con Nube de nuez agregado");
console.log(postres);

Para verificar por consola voy a pedirle que me muestre el indice 0 de postres, ya que Nube de nuez seria
el indice nro 0, teniendo en cuenta que con el metodo unshift, empuja al nuevo producto al primer indice.
Antes: 
0 = Rogel
1 = Tiramisu
2 = Pavlova
3 = Brownie frutos rojos
4 = Blondie
Ahora: 
0 = Nube de nuez
1 = Rogel
2 = Tiramisu
3 = Pavlova
4 = Brownie frutos rojos
5 = Blondie
 

Verificacion por consola de que Nube de nuez ocupe el primer lugar (indice 0) en el array postres:
console.log("Confirmacion de que Nube de nuez se muestra primero. Indice 0: ");
console.log(postres [0]);
*/

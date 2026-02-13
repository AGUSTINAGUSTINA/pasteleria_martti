/*
Elegí presentar esta entrega a modo de storytelling, explicando qué realicé en cada etapa, qué herramientas 
utilicé, por qué las elegí y qué resultados se obtuvieron.
*/

/* 
Decidí colocar en este archivo main.js los datos principales del sitio web, como las categorías y sus 
respectivos productos.
Los archivos search.js y cart.js los voy a utilizar para manejar la lógica de búsqueda y la 
funcionalidad de agregar productos al carrito.
*/


//OBJETO 
const pasteleriaMartti = {
  nombre: "Pastelería Martti",
  productos: []
};

/*
Declaré el objeto pasteleriaMartti porque representa la raíz del simulador: la pastelería.
Dentro de este objeto agrupé la información principal del proyecto, utilizando una propiedad
nombre para identificar la pastelería y una propiedad productos, que inicialmente es un array vacío
y luego se completa con los productos organizados por categorías.

Elegí trabajar con un objeto porque me permite mantener toda la información relacionada centralizada y 
organizada en un solo lugar. Además, facilita la gestión de los datos y su acceso desde otras
partes del código, como las funciones de búsqueda (que se encuentran en el archivo search.js) y la futura
implementación del carrito de compras en un archivo cart.js.
*/ 

//ARRAYS DE PRODUCTOS POR CATEGORÍA
/*Declaré variables const para los nombres de los productos, ya que no van a cambiar. Luego, los agrupé 
en arrays según su categoría para mantener organizados los datos del sitio web.
 */
// Tartas
const tartas = [
  "Tarta de peras con nueces",
  "Key lime pie",
  "Tarta de frutilla",
  "Maracuyá pie",
  "Tarta Cabsha",
  "Tarta frutal",
  "Marquise clásica",
  "Tarta de chocolate y naranja",
  "Tarta de coco",
  "Lemon pie"
];

// Tortas
const tortas = [
  "Torta mousse de chocolate",
  "Chocotorta",
  "Cheesecake frutos rojos",
  "Torta Oreo",
  "Torta decorada",
  "Torta Matilda blanca",
  "Carrot cake",
  "Torta brownie"
];

// Postres
const postres = [
  "Rogel",
  "Tiramisú",
  "Pavlova",
  "Brownie frutos rojos",
  "Blondie"
];

// Otros
const otrosProductos = [
  "Muffins frutos rojos",
  "Mini delicias",
  "Huevos de Pascua",
  "Pan dulce",
  "Cookies New York",
  "Cookies Red Velvet",
  "Chipá",
  "Tableta de chocolate Dubai",
  "Alfajores Dubai",
  "Alfajores dulce de leche y nuez",
  "Desayuno sorpresa"
];

// ASOCIACIÓN DE ARRAYS AL OBJETO PASTELERÍA MARTTI
/*
 Asocié los arrays de productos al objeto pasteleriaMartti, creando una propiedad productos que es un 
 objeto con las categorías como claves y los arrays de productos como valores. 
 */
pasteleriaMartti.productos = {
  tartas,
  tortas,
  postres,
  otros: otrosProductos
};

//Alert de bienvenida
/*Incluí un alert de bienvenida para generar una primera interacción amigable */

alert("Te doy la bienvenida a Pastelería Martti ");
console.log("Te doy la bienvenida a Pastelería Martti");

// PARA MOSTRAR POR CONSOLA LAS CATEGORÍAS Y LOS PRODUCTOS
console.log("Categorías de productos:");
console.log(Object.keys(pasteleriaMartti.productos));
/*
Utilicé Object.keys para obtener las claves del objeto pasteleriaMartti.productos,
las cuales representan las categorías definidas previamente en los arrays. Esto me permite mostrar por 
consola las categorías disponibles en la pastelería.
 - Objet.keys:devuelve un array con las claves del objeto pasado como parámetro.
--> Resultado: devuelve las categorías de productos. */

//MUESTRO EN CONSOLA TODOS LOS PRODUCTOS
console.log("Productos :");
console.log(pasteleriaMartti.productos);

//APLICACIÓN DE MÉTODOS--> UNSHIFT <-- para agregar este nuevo producto a la categoria "postres"
/*
Utilicé el método unshift para agregar el nuevo producto al comienzo del array de postres, 
lo que permite destacar el producto, ya que es nuevo.
 */

postres.unshift("Nube de nuez");

// Verificación por consola del agregado de Nube de nuez al array postres:
console.log("Array POSTRES con Nube de nuez agregado");
console.log(postres);
/*
Para verificar por consola voy a pedirle que me muestre el índice 0 de postres, ya que Nube de nuez seria
el indice nro 0, teniendo en cuenta que con el método unshift, empuja al nuevo producto al primer índice.
Antes: 
0 = Rogel
1 = Tiramisú
2 = Pavlova
3 = Brownie frutos rojos
4 = Blondie
Ahora: 
0 = Nube de nuez
1 = Rogel
2 = Tiramisú
3 = Pavlova
4 = Brownie frutos rojos
5 = Blondie
 */

// Verificación por consola de que Nube de nuez ocupe el primer lugar (índice 0) en el array postres:
console.log("Confirmacion de que Nube de nuez se muestra primero. Indice 0: ");
console.log(postres [0]);


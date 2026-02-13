// SEARCH.JS

/*
En este archivo js voy a aplicar funciones de búsqueda y filtrado por categorías y nombre de productos.
Utilicé:
- Funciones :
- tradicionales (function):
                          a) Función para mostrar categoría de productos por consola (solo muestra categorias)
                          b) Función para normalizar texto (normaliza el texto para poder usarlo en el 
                             resto de la funciones de busqueda)
                          c) Función de búsqueda por categoria de producto (mustra a que categoría pertenece)
                          d) Función de busqueda por nombre de producto (mustra los productos que coinciden
                              con la búsqueda)
                    

- Flecha (=> anónimas):
                          a) Función para mostrar categorias en alert en forma de lista y en mayúscula 
                          b) Función para que la normalizacion del texto se ejecute en cada elemento del 
                          array.

- Metodos de string: 
                     - toLowerCase
                     - toUpperCase
                     - normalize("NFD")

- Metodos de array: 
      - For each
      - push 
      - join
      - map 
      - includes 
      - length
    
- Operadores lógicos: 
      - NOT (!) 
      - OR (||)

- Operadores relacionales (de comparación): 
      - Comparación estricta (===)

- Condicionales: 
      - if
      - if/else

- Bucles: 
      - for...of 
      - while

- Sentencias:
      -  break
      -  return: 
*/



//Punto de partida del buscador por consola. Este string me permite saber si el archivo search.js esta cargado:
console.log("Buscador de Pastelería Martti");

/*
Comencé creando la base del buscador partiendo del objeto pasteleriaMartti.productos, que ya estaba definido 
en main.js. Luego, declaré la variable "categorias" que contiene las claves del objeto pasteleriaMartti.productos.
*/
const categorias = Object.keys(pasteleriaMartti.productos);

//--------------------------------------------------------------------------------------------------------

/*
Mi idea del simulador fue simular un usuario que ingresa a la pagina de productos de la pastelería, y luego 
busca productos. Para ello, utilice las funciones para mostrar las categorias y la función de búsqueda por 
categoría y nombre de producto.
1° Saludo de bienvenida (ubicado en el archivo main.js)
2° El usuario entra a la página de productos de la web
3° El usuario visualiza las categorías disponibles
4° El usuario utiliza el buscador para buscar productos
5° Mensaje de despedida cuando el usuario decide no continuar con la busqueda
*/

// FUNCIONES


// 1)FUNCIÓN MOSTRAR CATEGORÍAS: 
/*
Para continuar con la simulación de una experiencia lo más real posible, creé la función mostrarCategorias(). Esta 
representa el momento en el que el usuario ingresa a la pagina de productos de la web (productos.html) y visualiza las
categorías disponibles en Pastelería Martti.
*/
// Declaración de la función 
function mostrarCategorias() {
      /*
       Utilicé console.log para mostrar las categorías por consola, que me permite corroborar que los datos obtenidos desde 
       el objeto pasteleriaMartti.productos son correctos. Esto me muestra por consola las categorías de productos de los arrays
       declarados en el objeto pasteleriaMartti de mi archivo main.js.
      */

  console.log("Categorías disponibles:");
  console.log(categorias);

    // 2) FUNCIÓN PARA MOSTRAR CATEGORÍAS EN ALERT EN MAYÚSCULAS Y EN FORMA DE LISTA (flecha dentro de la funcion "mostrarCategorias"):
   

  const listaCategorias = categorias.map(categoria => categoria.toUpperCase()) .join("\n");

   /*
         Dentro de mostrarCategorias utilicé map junto con una función flecha. La función flecha funciona como callback, es decir, es 
         una función que map usa para transformar cada elemento del array.
         En este caso, la uso para convertir cada categoría a mayúsculas.
         Busqué en MDN y encontré que:
         - map: crea un nuevo array con los resultados de la llamada a la función. En este caso, junto a 
         - "toUpperCase" transforma las minúsculas a mayusculas y crea un array todo en mayúsculas.
         
         Además Utilicé el método join para unir los elementos del array. A su vez, utilicé \n como separador ya que, en la misma 
         documentación donde se explica el uso de strings y caracteres de escape, indica que \n representa un salto de línea. Esto 
         me permite que cada elemento se muestre uno debajo del otro, como una lista.
         Finalmente, utilicé alert para mostrar la lista de categorías al usuario.
 */

  // Mostrar categorías en alert
    alert(
    "Categorías de productos de Pastelería Martti:\n\n" +
    listaCategorias
    );
}
         /*
           En este caso el título tiene doble salto de línea para darle un espacio visual que diferencia el titulo de la lista 
           de categorias.
         */


// PARA QUE LA BUSQUEDA FUNCIONE BIEN:

/*
Siguiendo la idea de simular una busqueda como si fuera un usuario, me di cuenta que, por lo general, el usuario no busca con 
la palabra textual como está en el array, por lo general omite acentos, o por ejemplo, en mi array la primer letra de la palabra 
está en mayuscula y en el buscador por lo general la persona se escribe en minúscula.

Para eso busqué en MDN y encontré los siguientes metodos de string:
- normalize("NFD"): es un método de descomposición, es decir, descompone caracteres compuestos en sus partes básicas como por 
ejemplo"á" lo descompone en "a" y "´". Esto permite que encuentre "Chipá" aunque busque "Chipa"
- toLowerCase: devuelve el valor en minúsculas de la cadena que realiza la llamada. Esto permite que aunque mis datos tengan 
la primer letra en mayúscula y el usuario escriba todo en minúscula, se encuentre el producto de todas maneras. Por ejemplo si 
en el array tengo "Tortas" y el usuario escribe "tortas" el usuario podrá ver todas las tortas disponibles en vez de un mensaje 
de producto no disponible por no haberlo escrito tal cual lo está en el array. 
Además utilicé la sentencia "return" que finaliza la ejecución de la función y especifica un valor para ser devuelto 
          a quien llama a la función.
*/

//---------------------------------------------------------------------------------------------------------------------------
// 3) FUNCIÓN NORMALIZAR TEXTO
//Declaración para normlaizar el texto que escribe el usuario
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .toLowerCase();
}
/* Esta función permite minimizar errores en la búsqueda y mejorar la experiencia de usuario, evitando que falle si no escribe 
el texto exactamente igual a como está definido en el array
/*

/*
4) FUNCIÓN FLECHA PARA QUE LA NORMALIZACION DEL TEXTO SE EJECUTE EN CADA ELEMENTO DEL ARRAY (aplicacion de normalizar
 texto a las categias)
  Aquí utilizo forEach junto con una función flecha para recorrer el array de categorías y aplicar la función normalizarTexto 
  a cada cada elemento.

*/
const categoriasNormalizadas = {};

categorias.forEach(categoria => {categoriasNormalizadas[normalizarTexto(categoria)] = categoria;});

/*
- forEach: que es un método de los arrays que recorre cada elemento del array y ejecuta la función por cada elemento.
*/

// 5) FUNCIÓN: BUSCAR PRODUCTOS POR CATEGORÍA
// Declaración de la funcion 
function buscarPorCategoria(categoria) {

  const normalizacion = categoriasNormalizadas[normalizarTexto(categoria)] || categoria.toLowerCase();
  const productos = pasteleriaMartti.productos[normalizacion];

  /*Aquí declaro constantes para poder utilizarlas dentro de la condicional:
  - const normalizacion: contiene la categoría obtenida a partir del texto ingresado por el usuario. Primero intenta buscarla dentro 
  del objeto categoriasNormalizadas (la versión normalizada del texto). Si no se encuentra, utiliza el texto ingresado convertido 
  a minúsculas como alternativa. gracias al operador OR (||)
  - const productos: accede a los productos que pertenecen a la categoría obtenida, buscándolos dentro del objeto pasteleriaMartti.productos.
  */

  if (productos) {
    console.log('Productos en la categoría "' + normalizacion + '":');
    console.log(productos);

    alert(
      'Productos en la categoría "' + normalizacion.toUpperCase() + '":\n\n' + productos.join("\n")
    );

    return true;
  }

  return false;
}

/*
   if permite comprobar si la categoría ingresada por el usuario existe en el objeto pasteleriaMartti.productos. Si la categoría existe, 
   devuelve true y muestra los productos de esa categoría. Si no, devuelve false.
 */

// 6) FUNCIÓN: BUSCAR PRODUCTOS POR NOMBRE
 /*
  En esta función recorro todas las categorías de la pastelería y, dentro de cada una, busco si existe un 
  producto cuyo nombre coincida con el ingresado por el usuario.
  */

// Declaracion de la funcion:
function buscarPorNombre(nombreProducto) {
  const busquedaNormalizada = normalizarTexto(nombreProducto);
  let resultados = [];
  console.log("Producto ingresado:", nombreProducto);
// USO DE BUCLE FOR...OF, CONDICIONAL IF LENGTH Y METODOS INCLUDES Y PUSH
  for (let categoria of categorias) {
    const productos = pasteleriaMartti.productos[categoria];

    for (let producto of productos) {
      if (normalizarTexto(producto).includes(busquedaNormalizada)) {
         console.log("Resultados encontrados:", producto);
        resultados.push(
          producto + " (" + categoria.toUpperCase() + ")"
        );
      }
    }
  }

  if (resultados.length > 0) {
    alert(
      "Resultados encontrados:\n\n" + resultados.join("\n")
    );
    return true;
  }
  console.log('El producto no existe en Pastelería Martti.');
  return false;
}
/*
- Bucle for...of: procesa todos los elementos, estén o no definidos, sin importar el índice.
- push: lo utilice para agregar productos al array de resultados a medida que se van encontrando coincidencias durante el recorrido 
- includes: lo utilicé para permitir búsquedas parciales es decir, que vaya agregando al nuevo array "resultados" coincidencias parciales 
como por ejemplo si el usuario escribe "cho" y busca solo eso, aparezca "chocotorta" "chocolate", esto evita que diga por alert 
" Este producto no existe en Pastelería Martti" por no haber escrito "chocotorta"
- length: recorre todo el array y si el resultado es mayor a cero, indica por alert al usuario los "resultados
encontrados" del nuevo array resultados dondepush fue colocando las coincidencias parciales de includes
*/



// INVOCACIÓN DE LAS FUNCIONES

// Invocación de la función mostrarCategorias
mostrarCategorias();

// USO DE BUCLE WHILE
/* 
Aquí utilicé este bucle porque la cantidad de búsquedas no es fija y depende de la decisión del usuario de continuar o no 
*/
let continuarBusqueda = true;

while (continuarBusqueda) {
  const busquedaUsuario = prompt(
    "¿Qué producto o categoría estás buscando?"
  );


  if (busquedaUsuario === null) {
    alert("Gracias por visitar Pastelería Martti");
    break;
  }
 
  /*
  - utilicé === junto con null para detectar cuando el usuario presiona "Cancelar" y así poder finalizar la búsqueda junto con break.
  - break: corta el bucle y sale del buscador
  */
  // Búsqueda por categoría: 

  const busquedaNormalizada = normalizarTexto(busquedaUsuario);

  let encontrado = false;

    let categoriaEncontrada = null;

  for (let categoria of categorias) {
    if (normalizarTexto(categoria).includes(busquedaNormalizada)) {
      categoriaEncontrada = categoria;
      break;
    }
  }
  //Las funciones buscarPorCategoria y buscarPorNombre se invocan dentro de la estructura de este condicional
      // Uso de condicional if/else_
  if (categoriaEncontrada) {
    buscarPorCategoria(categoriaEncontrada);
    encontrado = true;
  } else {
    encontrado = buscarPorNombre(busquedaUsuario);
  }
 
  if (!encontrado) {
    alert(
      'El producto "' +
      busquedaUsuario +
      '" no existe en Pastelería Martti.'
    );
    
  }


  /*
Utilicé este condicional para que JS interprete lo que busca el usuario con expresiones booleanas segun encuentre o no 
lo que busca. Si lo que escribe coincide con una categoría, se muestran los productos de esa categoría. Si no, el sistema 
busca productos por nombre. Cuando no se encuentra ninguna coincidencia, se informa al usuario que ese producto no existe.
Es decir si no encuentra la categoría, se busca por nombre de prdocuto y le muestra el mensaje correspondiente: si lo encuentra le 
muestra los productos de esa categoría y sino le muestra el mensaje de "El producto X no existe en Pastelería Martti."

   */

  // Confirmación para continuar
  continuarBusqueda = confirm("¿Deseás buscar otro producto?");
  console.log("Continuar la búsqueda:", continuarBusqueda);

  if (!continuarBusqueda) {
    alert("Gracias por visitar Pastelería Martti");
    break;
  }
  console.log("Fin de la búsqueda:", !continuarBusqueda);
}

/*
Este mensaje de despedida lo agrego con el fin de mantener la coherencia de simular el recorrido del usuario
 (y así también mantener la línea del saludo de bienvenida mostrado al inicio). Este marca el cierre de la 
 interacción agradeciendo la visita.
*/
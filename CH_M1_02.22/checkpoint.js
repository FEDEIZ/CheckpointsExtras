// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeworks no es necesario que los vuelvan a definir.

const { Queue, Node, LinkedList, BinarySearchTree } = require("./DS.js");

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función objContains: debe buscar dentro de un objeto anidado un par {clave: valor}
// especifico. Tanto el objeto como el nombre de la propiedad y su valor serán recibidos por parámetro.
// En el caso de que encuentre el valor indicado en cualquier nivel del objeto debe devolver true,
// de lo contrario, devolver false.
// Aclaraciones:
//   - Un objeto anidado es un objeto que dentro tiene uno o más objetos.
//     Ej:
//        const user = {
//            id: 6,
//            email: 'homero@maxpower.com',
//            infoPersonal: {
//                nombre: 'Homero Simpson',
//                direccion: {
//                    calle: 'Avenida Siempreviva',
//                    numero: 742,
//                    barrio: 'Springfield',
//                    estado: 'Massachusetts'
//                }
//            }
//        }
//   - Caso que devuelve true  --> objContains(user, "barrio", "Springfield");
//   - Caso que devuelve false --> objContains(user, "empleo", "Empleado en planta nuclear");
// Pista: utilizar typeof para determinar si el valor de una propiedad es un objeto para aplicar
// allí la recursión

var objContains = function (obj, prop, value) {
  /* Tu codigo aqui */

  if (Object.hasOwnProperty.call(obj, prop)) {
    if (obj[prop] === value) return true;
  }
  for (let p in obj) {
    let aux = obj[p];
    if (typeof aux === "object") {
      // Anidated object
      return objContains(aux, prop, value);
    }
  }
  return false;
};

// EJERCICIO 2
// Secuencia inventada: f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2
// Donde las primeras tres posiciones son dadas por el array recibido por parametro y a partir de
// la siguiente se calcula como la suma de los 3 números anteriores multiplicados por dos.
// array es un arreglo de 3 posiciones que puede contener números o strings, aquellas posiciones que
// sean números debemos dejarlas tal cual están pero las que tengan strings debemos calcular su cantidad
// de caracteres para usarlos en la secuencia.
// Por ejemplo si recibimos: ["Franco", 1, "Henry"] deberíamos tener los siguientes 3 valores iniciales
// de la secuencia f(0) = 6, f(1) = 1 y f(2) = 5 (Ya que "Franco" tiene 6 caracteres y "Henry", 5)
// A partir de ahí la cuarta posición sería  (6 + 1 + 5) * 2 = 24 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el array
// antes mencionado:
// secuencia: 6, 1, 5, 24, 60, 178, 524
// secuenciaHenry(0) // 6  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 1 ya que el elemento de la posición 1 es 1
// secuenciaHenry(6) // 524 ya que el elemento de la posición 6 es 524
// Para números negativos de n debe devolver false
function secuenciaHenry(array, n) {
  // Tu código aca:

  if (n < 0) return false;

  let aux = [];
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] == "number") aux.push(array[i]);
    else {
      if (typeof array[i] === "string") aux.push(array[i].length);
      else
        return TypeError(
          "At least one item in the array is not a number or a string"
        );
    }
  }
  if (n === 0) return aux[0];
  if (n === 1) return aux[1];
  if (n === 2) return aux[2];

  return (
    (secuenciaHenry(aux, n - 1) +
      secuenciaHenry(aux, n - 2) +
      secuenciaHenry(aux, n - 3)) *
    2
  );
}

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  /* Tu codigo aqui */
  let size = 0;
  if (!this.head) return 0;
  current = this.head;
  while (current) {
    size++;
    current = current.next;
  }
  return size;
};

// EJERCICIO 4
// Implementar el método addInPos dentro del prototype de LinkedList que deberá agregar un elemento en
// la posición indicada. Ambos datos serán brindados como parámetro (pos, value). Donde "pos" será la
// posición en la cual se deberá agregar el valor "value". En el caso de que la posición en la que se
// quiera hacer la inserción no sea válida (Supere el tamaño de la lista actual) debe devolver false.
// Si el nodo fue agregado correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [4]
//    lista.addInPos(2, 3);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [3] --> [4]
// Ejemplo 2:
//    Suponiendo que la lista está vacía: Head --> null
//    lista.addInPos(2, 3); --> Debería devolver false ya que no es posible agregar en la posición 2
//    sin antes tener cargada la posición 0 y 1.

LinkedList.prototype.addInPos = function (pos, value) {
  /* Tu codigo aqui */
  if (!this.head || !this.head.next) return false; // must have at least two elements

  if (pos === 0) {
    // add in the head of the list
    let node = new Node(this.head.value);
    node.next = this.head.next;
    this.head.value = value;
    this.head.next = node;
    return true;
  }
  let current = this.head;
  let index = 1;
  while (current) {
    if (index === pos) {
      // addInPos
      let auxNext = current.next;
      current.next = new Node(value);
      current.next.next = auxNext;
      return true;
    }
    index++;
    current = current.next;
  }
};

// EJERCICIO 5
// Implementar el método removeFromPos dentro del prototype de LinkedList que deberá remover un elemento de
// la posición indicada ("pos" será la posición del elemento a remover).
// En el caso de que la posición en la que se quiera hacer el remove no sea válida (Supere el tamaño de
// la lista actual o sea un número negativo) debe devolver false.
// Si el nodo fue removido correctamente devolver el valor del nodo.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4]
//    lista.removeFromPos(2);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [4] y la función debería haber devuelto el valor 3
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.removeFromPos = function (pos) {
  // Tu código aca:
  if (!this.head) return false;
  if (pos === 0) {
    // remove in the head of the list
    let headValue = this.head.value;
    let nextNode = this.head.next;
    this.head = nextNode;
    return headValue;
  }

  let current = this.head;
  let index = 0;
  while (current) {
    if (index === pos - 1) {
      // removeFromPos
      let nodeValue = current.next.value;
      current.next = current.next.next;
      return nodeValue;
    }
    index++;
    current = current.next;
  }
  return false;
};

// ----------------------

// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función controlAcces: a partir de una Queue que va a recibir como paráemtro que tiene
// en cada posición un objeto que va a representar a una persona y tiene la siguiente forma:
// {
//   fullname: "Franco Etcheverri",
//   age: 26,
//   ticket: {
//     number: 1,
//     event: "Tomorrowland"
//   }
// }
// La idea es ir verificando uno a uno si la primer persona de la cola tiene los requisitos necesarios para
// ingresar al evento correspondiente (también recibido por parámetro). Los requisitos que debe cumplir son:
// - Ser mayor de 18 años (18 inclusive es válido)
// - Tener un ticket que corresponda con el evento (prop event de ticket)
// - Que no haya ingresado ya otra persona al evento con ese mismo número de ticket
// Finalmente la función debe devolver un arreglo con todos los nombres de las personas que pudieron ingresar
// Importante!: Aquellas personas que no cumplan con los requisitos para ingresar deben ser removidos de la cola

var controlAcces = function (queue, event) {
  // Tu código aca:

  // array for persosn
  let persons = [];
  let numbers = [];
  while (queue.size()) {
    let aux = queue.dequeue(); // verify the first out item.
    // verify age
    if (aux["age"] >= 18) {
      // verify ticket prop
      let ticket = aux["ticket"];
      if (
        ticket["event"] === event &&
        numbers.indexOf(ticket["number"]) === -1
      ) {
        // verify thath isnt exist
        persons.push(aux["fullname"]);
        numbers.push(ticket["number"]);
      }
    }
  }
  return persons;
};

// ---------------

// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5

var generateBST = function (array) {
  /* Tu codigo aqui */

  let bst = new BinarySearchTree(array.shift());

  while (array.length) {
    bst.insert(array.shift());
  }

  return bst;
};

// ---------------

// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]

var binarySearch = function (array, elemento) {
  /* Tu codigo aqui */
  let arrayHalfLength = (array.length = Math.floor(array.length / 2));
  let indexElement;
  if (array[arrayHalfLength - 1] === elemento) {
    indexElement = arrayHalfLength - 1;
  } else {
    if (elemento > array[arrayHalfLength - 1])
      // searh right half
      return binarySearch(array.slice(arrayHalfLength, array.length), elemento);
    else {
      //search left half
      if (elemento < array[arrayHalfLength - 1])
        return binarySearch(array.slice(0, arrayHalfLength), elemento);
      else indexElement = -1;
    }
  }
  return indexElement;
};

// EJERCICIO 9
// Ordená un arreglo de números usando un bubble sort pero con algunas particularidades.
// El nuevo arreglo debe ser devuelto.
// El algortimo va a recibir un arreglo de objetos de la siguiente forma:
// {
//   name: "Notebook",
//   price: 1200,
//   review: 8
// }
// Esos objetos deben ser ordenados en función de lo que indique los siguientes parámetros
// "firstOrd", "secondOrd" los cuales van a tener alguna de las propiedades del objeto anterior
// para saber cual va a ser la que debemos tomar para el ordenamiento. La "secondOrd" se usa en los
// casos en los cuales para la "firstOrd" tengan el mismo valor.
// var array = [
//   {name: "Notebook", price: 1200, review: 8},
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 1:
// specialSort(array, "price") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "Notebook", price: 1200, review: 8}
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 2:
// specialSort(array, "price", "review") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7},
//   {name: "Notebook", price: 1200, review: 8}
// ]
// (Siempre el ordenamiento es de menor a mayor sea cual fuera la propiedad indicada para el orden)

var specialSort = function (array, firstOrd, secondOrd = false) {
  // Tu código aca:

  let swap = false;
  let aux;

  do {
    swap = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i][firstOrd] > array[i + 1][firstOrd]) {
        // first Order
        aux = array[i];
        array[i] = array[i + 1];
        array[i + 1] = aux;
        swap = true;
      }
      if (secondOrd && array[i][firstOrd] === array[i + 1][firstOrd]) {
        //second order
        if (array[i][secondOrd] > array[i + 1][secondOrd]) {
          aux = array[i];
          array[i] = array[i + 1];
          array[i + 1] = aux;
          swap = true;
        }
      }
    }
  } while (swap);
  return array;
};

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureSum que recibe un parámetro (numFijo) y que debe retornar otra función
// que también debe recibir un parámetro y debe devolver la suma de este últimom parámetro con numFijo.
// Ejemplo 1:
//    var sumaCinco = closureSum(5);
//    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
//    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
// Ejemplo 2:
//    var sumaDiez = closureSum(10);
//    sumaDiez(2);  --> Devolverá 12 (Ya que 2 + 10 = 12)
//    sumaDiez(11); --> Devolverá 21 (Ya que 11 + 10 = 21)

function closureSum(numFijo) {
  /* Tu codigo aqui */

  let cb = function(numSum){
    return numFijo+numSum;
  }
  return cb;
}

// ------------------- No Cambies nada de aqui abajo ----------------------------

module.exports = {
  objContains,
  secuenciaHenry,
  LinkedList,
  Queue,
  controlAcces,
  generateBST,
  binarySearch,
  specialSort,
  closureSum,
};

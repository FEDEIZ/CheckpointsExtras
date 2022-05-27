// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint tendrán en el archivo DS.js las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.
// NO DEBEN MODIFICAR EL ARCHIVO DS.js SINO QUE TODO SU CÓDIGO TENDRÁ QUE ESTAR EN ESTE ARCHIVO checkpoint.js

const { Queue, Node, Stack, LinkedList, BinarySearchTree } = require("./DS.js");

/*
 * EJERCICIO 1
 *
 * Implementar de forma RECURSIVA el método Newton-Raphson. Este método es utilizado para aproximar
 * la raiz cuadrada de un número entero positivo.
 *
 * Parametros:
 *   count: cantidad de veces que se requiere iterar
 *   x: valor entero positivo al que se le quiere calcular la raiz cuadrada
 *
 * Formula:
 *   y = (valorAnterior + (x/valorAnterior))/2
 *   valorAnterior(0) = x/2
 *
 * Salida:
 *   > -1 si no es invocado con un x positivo (Ejemplo: -4)
 *   > -1 si no es invocado con un x entero   (Ejemplo: 4.3)
 *   > -1 si no es invocado con un x positivo y entero (Ejemplo: -4.3)
 *   > El valor obtenido luego de haber aplicado la formula count veces a x
 *
 * Ejemplos:
 *   x = 20
 *   count = 4
 *   valorAnterior(0) = 10
 *   y(1) = (10 + (20/10))/2 = 6
 *   valorAnterior = 6
 *   y(2) = (6 + (20/6))/2 = 4.666
 *   valorAnterior = 4.666
 *   y(3) = (4.666 + (20/4.666))/2 = 4.476
 *   valorAnterior = 4.476
 *   y(4) = (4.476+ (20/4.476))/2 = 4.472
 *
 *   x = 45
 *   count = 4
 *   valorAnterior(0) = 22.5
 *   y(1) = (22.5 + (45/22.5))/2 = 12.25
 *   valorAnterior = 12.25
 *   y(2) = (12.25 + (45/12.25))/2 = 7.96
 *   valorAnterior = 7.96
 *   y(3) = (7.96 + (45/7.96))/2 = 6.80
 *   valorAnterior = 6.80
 *   y(4) = (6.80 + (45/6.80))/2 = 6.70
 *
 * */
function newtonRaphson(x, count) {
  if (x % 1 !== 0 || x <= 0) return -1;
  if (count === 0) return x / 2;

  return (newtonRaphson(x, count - 1) + x / newtonRaphson(x, count - 1)) * 0.5;
}

/*
 * EJERCICIO 2
 *
 * A partir de una formula matematica, encontrar y determinar si los parentesis de la misma se encuentran balanceados.
 * Decimos que los parentesis de una formula son balanceados si y solo si por cada ( hay un ), se debe respetar
 * el orden indicado, es decir, primero ( y luego ), )( no es una combinacion valida.
 *
 * Parametros:
 *   exp: string que describe la expresion matematica a analizar
 *
 * Salida:
 *   > 0: si estan balanceados
 *   > Cualquier otro numero: si no estan balanceados
 *
 * Ejemplos:
 *   exp: "(5+6)-(t+2*9-(a+7)/4+(8+5*2))" ---> 0
 *   exp: "70 + (9/x - 2))" ----------------> !== 0
 *   exp: "(9+10)-6*a/2+(-5)" -------------->  0
 *   exp: "(4))" ---------------------------> !== 0
 *   exp: "))((" ---------------------------> !== 0
 * */
function balanced(exp) {
  // Tu código aca:

  let arrayExp = Array.from(exp);
  let openBr = 0,
    closeBr = 0;
  let flagOpen = false;

  for (let i = 0; i < arrayExp.length; i++) {
    if (arrayExp[i] === "(") {
      openBr++;
      flagOpen = true;
    }
    if (arrayExp[i] === ")") {
      if (openBr > closeBr) {
        closeBr++;
        flagOpen = false;
      } else return -1; // bracket closed without an opening
    }
  }

  if (closeBr !== openBr || flagOpen)
    // unbalanced expression
    return -1;
  else return 0;
}

/*
* EJERCICIO 3
*
* Implementar el método compressList dentro del prototype de LinkedList que deberá DEVOLVER UNA NUEVA LISTA
* en donde cada elemento se obtiene de aplicar la funcion a dos nodos consecutivos. Si la lista tiene un unico
* elemento, debe devolver la lista con dicho elemento.
*
*
* Parametros:
*   func : funcion a aplicar
*
* Salida: 
*   > una nueva lista con las caracteristicas mencionadas
*
* Ejemplos:
* lista:  -> 5 -> 4 -> 9 -> 1 -> 2 -> null
* func = function(a,b) return a+b; 
* lista.compressList(func): -> 9 -> 10 -> null

* ¿Por que? 
*   - Toma el 5 y el 4 -> func(5, 4) -> retorna 9 => nuevo nodo con 9 
*   - Toma el 9 y el 1 -> func (9, 1) -> retorna 10 => nuevo nodo con 10, consecutivo al nodo previamente creado
*   - Toma el 2, no tiene un proximo elemento para aplicar la funcion, se deshecha 
*   => Se obtiene una nueva lista que es:  -> 9 -> 10 -> null 
*
* lista: -> 2 -> 2 -> null
* func = function(a,b) return a+b; 
* lista.compressList(func): -> 4 -> null
* 
* ¿Por que? 
*   - Toma el 2 y el 2 -> func(2, 2) -> retorna 4 => nuevo nodo con 4
*   - No tengo mas nodos para aplicar la funcion 
*   => Se obtiene una nueva lista que es: -> 4 -> null 

*
* lista: -> 2 -> null
* func = function(a,b) return a+b; 
* lista.compressList(func): -> 2 -> null
* 
* ¿Por que? 
*   - La lista inicial tiene un UNICO nodo, por lo tanto no le aplicaremos funcion ni reduccion
*   - No se puede reducir 
*   - Devuelve una nueva lista igual a la provista  
*   => Se obtiene una nueva lista que es: -> 2 -> null 
* 
* */
LinkedList.prototype.compressList = function (func) {
  // Tu código aca:

  if (!this.head.next) return this;

  let current = this.head;
  let linkedListCompressed = new LinkedList();
  while (current) {
    if (current.next) {
      linkedListCompressed.add(func(current.value, current.next.value));
      current = current.next.next;
    } else current = current.next;
  }
  return linkedListCompressed;
};

/*
 * EJERCICIO 4
 *
 * Implementar el método removeFrom dentro del prototype de LinkedList que deberá MODIFICAR la lista
 * de forma tal que el elemento en el indice indicado (recibido por parametro) sea eliminado de la misma.
 *
 * Parametros:
 *   i: describe el indice del elemento que debe ser eliminado [el head, es la posicion 0]
 *
 * Ejemplos:
 *   lista: -> 5 -> 2 -> 4 -> 6 -> null
 *   lista(0) = 5
 *   lista.removeFrom(2): -> 5 -> 2 -> 6 -> null
 *
 *   lista: -> 5 -> 2 -> 4 -> 6 -> null
 *   lista(0) = 5
 *   lista.removeFrom(1): -> 5 -> 4 -> 6 -> null
 * */
LinkedList.prototype.removeFrom = function (pos) {
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
  let i = 0;
  while (current) {
    if (i === pos - 1) {
      // removeFromPos
      let nodeValue = current.next.value;
      current.next = current.next.next;
      return nodeValue;
    }
    i++;
    current = current.next;
  }
  return false;
};

/*
 * EJERCICIO 5
 *
 * Implementar el método insertInOrder dentro del prototype de LinkedList que deberá agregar un elemento
 * a la lista ordenada (MAYOR a MENOR).
 *
 *
 * Parametros:
 *   value: valor a ingresar
 *
 * Ejemplos:
 *   lista: -> 5 -> 4 -> 2 -> null
 *   lista.insertInOrder(3): -> 5 -> 4 -> 3 -> 2 -> null
 *
 * */

LinkedList.prototype.insertInOrder = function (value) {
  // Tu código aca:
  if (!this.head) {
    this.add(value);
    return;
  }

  if (this.head.value <= value) {
    // insert in head
    let node = new Node(this.head.value);
    node.next = this.head.next;
    this.head.value = value;
    this.head.next = node;
    return;
  }

  let current = this.head;

  while (current) {
    if (!current.next || current.next.value <= value) {
      // insert in correct position
      let node = new Node(value);
      node.next = current.next;
      current.next = node;
      return;
    }
    current = current.next;
  }
};

/*
 * EJERCICIO 6
 *
 * Utilizando un STACK, y dada una frase invertir palabra por palabra de la misma.
 * NO SE PUEDEN USAR METODOS DE ARRAY.
 *
 * Parametro:
 *   str: string a ser invertido palabra a palabra
 *
 * Salida:
 *  > string de la palabra invertida
 *
 * Ejemplo:
 *   Hello World: olleH dlroW
 *   There is a little monkey: erehT si a elttil yeknom
 * */

function reverseWords(str) {
  // Use stack with LIFO order

  let stack = new Stack();
  let arrayWrds = str.split(" ");
  let stringResult = "";
  //let spaceFlag = false;

  for (let i = 0; i < arrayWrds.length; i++) {
    let word = arrayWrds[i].split("");
    for (let j = 0; j < word.length; j++) {
      stack.push(word[j]);
    }
    while (stack.size()) stringResult += stack.pop();
    if (i < arrayWrds.length - 1) stringResult += " ";
  }

  return stringResult;
}

/*
* EJERCICIO 7
*
* Implemtnar la funcion height dentro del prototype de BinarySearchTree que calcule la altura de un arbol.
*
* Parametros: -
* Valor de retorno: altura del arbol
* 
* Salida:
*   > Altura del arbol 
*
* Pista: funcion auxiliar, calcular la altura de un arbol.[Una forma de resolverlo es pensarlo recursivamente y usando Math.max]
*
*            16             ---> Nivel 1
          /      \
        6         23        ---> Nivel 2
      /  \       /   \
     2    14    17    31    ---> Nivel 3
      \
       5                    ---> Nivel 4

* La funcion devolveria 4
* */

BinarySearchTree.prototype.height = function (tree = this) {
  if (tree === null) return 0; // empty BST or leaf node
  else return 1 + Math.max(this.height(tree.left), this.height(tree.right));
};

/*
* EJERCICIO 8
*
* Implemtnar la funcion balanced dentro del prototype de BinarySearchTree que determine si el arbol
* se encuentra o no balanceado.
*
* Parametros: -
* 
* Salida:
*   > true: si el arbol esta balanceado
*   > false: si el arbol no esta balanceado
*
*
*            16             ---> Nivel 1
          /      \
        6         23        ---> Nivel 2
      /  \       /   \
     2    14    17    31    ---> Nivel 3
      \
       5                    ---> Nivel 4

* La funcion devolveria true
*
* TIP: Se pueden usar funciones previamente definidas
* */

BinarySearchTree.prototype.balanced = function (tree = this) {
  if (tree === null) return true;

  let leftHeights = this.height(tree.left);
  let rightHeights = this.height(tree.right);

  if (
    Math.abs(leftHeights - rightHeights) <= 1 &&
    this.balanced(tree.left) &&
    this.balanced(tree.right)
  )
    return true;

  return false;
};

/* EJERCICIO 9
 *
 * Ordena un arreglo de objetos usando un SELECTION SORT pero con algunas particularidades.
 * Ademas del arreglo a ordenar, la funcion va a recibir como parametro una función que va
 * ser quien va a determinar si un elemento es mayor a otro para determinar su posicion final.
 *
 * Ejemplo:
 * let array = [
 *   {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
 *   {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
 *   {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200},
 *   {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700}
 * ]
 *
 * orderFunction(array[0], array[1]) -> Devolvera 1 si, la prioridad de array[0] es mayor a la prioridad de array[1].
 *                                      En el caso de que las prioridades sean iguales, el que tiene mayor precio, es mas grande.
 *                                      Por lo tanto array[0] > array[1] ya que array[0].priority === array[1].priority &&
 *                                                                              array[0].price > array[1].price
 *
 *                                   -> Devolvera -1 caso contrario. Es decir, si array[0].priority < array[1].priority
 *                                   => Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
 *
 * specialSort(array, orderFunction) -> retornaria el siguiente arreglo
 * [
 *   {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
 *   {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
 *   {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700}
 *   {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200}
 * ]
 *
 * */

var specialSort = function (array, orderFunction) {
  // Tu código aca:
  for (let i = 0; i < array.length; i++) {
    let iMin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (orderFunction(array[iMin], array[j]) === -1) iMin = j;
    }
    if (iMin !== i) {
      let aux = array[iMin];
      array[iMin] = array[i];
      array[i] = aux;
    }
  }
  return array;
};

/* EJERCICIO 10
 *
 *
 *
 * Implementar la funcion closureTrip cuya finalidad es determinar a que ciudades o paises puede llegar
 * una persona en funcion de la cantidad de millas y ciudad origen.
 *
 * Parametros:
 *   - flights: un arreglo en donde cada elemento esta compuesto por dos propiedades
 *               airport y destinations, donde destination es un arreglo, y cada elemento
 *               posee una propiedad city y otra miles.
 *
 *
 * Salida:
 *   > un arreglo con el nombre de las ciudades a los cuales puede llegar la persona
 *
 * Ejemplo:
 *
 * let flights = [{origin: 'BUE', destinations:[{city: 'FRANCIA', miles: 500}, {city: 'ITALIA', miles: 200},
 *               {city: 'ALEMANIA', miles: 400}]}, {origin: 'ITALIA', destinations: [{city: 'FRANCIA', miles: 30}]},
 *               {origin: 'BUE', destinations: [{city: 'MENDOZA', miles: 30}, {city: 'CORDOBA', miles: 700},
 *               {city: 'SALTA', miles: 200}]}]
 *
 * let user = {
 *   name: 'Martina',
 *   miles: 450,
 *   origin: 'BUE'
 * }
 *
 *
 * closureTrip(flights)(user) => [ 'ITALIA', 'ALEMANIA', 'MENDOZA', 'SALTA' ]
 *
 * */

function closureTrip(flights) {
  let cb = function (user) {
    let cities = [];
    let miles = user["miles"];
    for (let i = 0; i < flights.length; i++) {
      if (flights[i]["origin"] === user["origin"]) {
        // find the origin to look up for possible destinations
        for (let j = 0; j < flights[i]["destinations"].length; j++) {
          if (user["miles"] >= flights[i]["destinations"][j]["miles"])
            cities.push(flights[i]["destinations"][j]["city"]);
        }
      }
    }
    return cities;
  };

  return cb;
}
// Ejemplo 1:
//    var sumaCinco = closureSum(5);
//    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
//    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
function closureSum(numFijo) {
  /* Tu codigo aqui */

  let cb = function (numSum) {
    return numFijo + numSum;
  };
  return cb;
}
// -------------------

module.exports = {
  newtonRaphson,
  balanced,
  LinkedList,
  Queue,
  specialSort,
  reverseWords,
  closureTrip,
  BinarySearchTree,
};

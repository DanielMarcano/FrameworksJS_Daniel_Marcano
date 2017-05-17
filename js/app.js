// Arrays de caramelos
var caramelosCol1,
caramelosCol2,
caramelosCol3,
caramelosCol4,
caramelosCol5,
caramelosCol6,
caramelosCol7,
caramelosColumna,
caramelosFila;

// Obtiene numeros random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/*Inicio de mis funciones*/

//Hace que el título Match Game cambie de color infinitamente
function prenderApagar(selector) {
  $(selector).animate({
    opacity: '1',
  },
  {
    step: function() {
      $(this).css('color', 'red')
    },
    queue: true
  }
)
.animate({
  opacity: '1'
},
{
  step: function() {
    $(this).css('color', '#DCFF0E')
  },
  queue: true
}, 1000
)
.delay(1000)
.animate({
  opacity: '1'
},
{
  step: function() {
    $(this).css('color', 'purple')
    prenderApagar(selector)
  },
  queue: true
}
)
}

// Actualiza los arrays de caramelos
function actualizarArraysCaramelos() {

  caramelosCol1 = $('.col-1').children();
  caramelosCol2 = $('.col-2').children();
  caramelosCol3 = $('.col-3').children();
  caramelosCol4 = $('.col-4').children();
  caramelosCol5 = $('.col-5').children();
  caramelosCol6 = $('.col-6').children();
  caramelosCol7 = $('.col-7').children();

}

// Crea arrays de las filas
function caramelosFilas(indice) {
  actualizarArraysCaramelos();
  return caramelosFila = $([caramelosCol1.eq(indice), caramelosCol2.eq(indice),
                       caramelosCol3.eq(indice), caramelosCol4.eq(indice),
                       caramelosCol4.eq(indice), caramelosCol5.eq(indice),
                       caramelosCol6.eq(indice), caramelosCol7.eq(indice)]);
}

// Crea arrays de las columnas
function caramelosColumnas(indice) {
  actualizarArraysCaramelos();
  caramelosColumna = $([caramelosCol1, caramelosCol2, caramelosCol3,
                        caramelosCol4, caramelosCol5, caramelosCol6,
                        caramelosCol7]);
  return caramelosColumna[indice]
}

// Funcion de prueba
function validacionVertical() {
  for (var j = 0; j < 7; j++) {
  // Creamos nuestro array de posiciones
  var posicionCaramelos = [];
  var columna = caramelosColumnas(j);
  // Tomamos el primer objeto de nuestra columna
  var valorComparacion = columna.eq(0);
  // Inicializamos el contador en 0
  var contador = 0;
  // Nos servirá para saber si hubo una brecha entre nuestra línea de dulces
  var detenerContador = false;
  // Iteramos el array de columna
  for (var i = 1; i < columna.length; i++) {
    // Guardamos el src de todos los elementos, para compararlos
    var srcComparacion = valorComparacion.attr('src');
    // srcCaramelo siempre vendrá después de valorComparacion
    var srcCaramelo = columna.eq(i).attr('src');

    if (srcComparacion != srcCaramelo) {
      valorComparacion = columna.eq(i);
      if (contador < 2) {
        posicionCaramelos = [];
        contador = 0;
      } else {
        detenerContador = true;
      }
    } else {
      if (!detenerContador) {
        if (contador == 0) {
          posicionCaramelos.push(i-1);
        }
        // Guardamos la posicion del caramelo que contamos
        posicionCaramelos.push(i);
        contador += 1;
      }
    }
  }
  // Si hubo tres o más caramelos en línea
  if (contador >= 2) {
    eliminarVertical(posicionCaramelos, columna);
    colocarPuntuacion(contador);
  }
}
}

// Otra funcion de prueba
function eliminarVertical(posicionCaramelos, columna) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    var tmpCaramelo = columna.eq(posicionCaramelos[i]).fadeOut(1500);
    $(tmpCaramelo).remove();
  }
  chequearTablero();
}



// Prueba validacion horizontal
function validacionHorizontal() {
  // Con este for, le aplicamos la validacion a todas las filas
  for (var j = 0; j < 6; j++) {
  // Creamos nuestro array de posiciones
  var posicionCaramelos = [];
  var posicionExtra = [];
  // Creamos nuestro array de caramelos
  var fila = caramelosFilas(j);
  // Tomamos el primer objeto de nuestra fila
  var valorComparacion = fila[0];

  // Inicializamos el contador en 0
  var contador = 0;
  var contadorExtra = 0;
  // Nos servirá para saber si hubo una brecha entre nuestra línea de dulces
  var detenerContador = false;
  // Iteramos el array de fila
  for (var i = 1; i < fila.length; i++) {
    // Guardamos el src de todos los elementos, para compararlos
    var srcComparacion = valorComparacion.attr('src');
    // srcCaramelo siempre vendrá después de valorComparacion
    var srcCaramelo = fila[i].attr('src');

    if (srcComparacion != srcCaramelo) {
      valorComparacion = fila[i];
      if (contador < 2) {
        posicionCaramelos = [];
        contador = 0;
      } else {
        detenerContador = true;
      }
    } else {
      if (!detenerContador && srcComparacion == srcCaramelo) {
        if (contador == 0) {
          posicionCaramelos.push(i-1);
        }
        // Guardamos la posicion del caramelo que contamos
        posicionCaramelos.push(i);
        contador += 1;
      }
    }
  }
  // Si hubo tres o más caramelos en línea
  if (contador >= 2) {
    eliminarHorizontal(posicionCaramelos, fila);
    colocarPuntuacion(contador);
  }
}
}

function eliminarHorizontal(posicionCaramelos, fila) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    var tmpCaramelo = fila[posicionCaramelos[i]].fadeOut(1500);
    $(tmpCaramelo).remove();
  }
  chequearTablero();
}

// Coloca la puntuacion de acuerdo al numero de caramelos obtenido
function colocarPuntuacion(contador) {
  var score = $('#score-text');
  var puntaje = Number($('#score-text').text());
  switch (contador) {
    case 2:
      puntaje += 25;
      break;
    case 4:
      puntaje += 50;
      break;
    case 5:
      puntaje += 75;
      break;
    case 6:
      puntaje += 100;
      break;
    case 7:
      puntaje += 200;
  }
  $(score).text(puntaje);
}

//Se activa cada vez que se inicia el juego, u ocurren cambios en el tablero
function chequearTablero() {
  // Si hay columnas sin dulces, esta función las rellenará
  llenarColumnas();
}

function llenarColumnas() {
  var tope = 6;
  var columna = $('[class^="col-"]');

  columna.each(function() {
    var caramelos = $(this).children().length;
    var agrega = tope - caramelos;
    for (var i = 0; i < agrega; i++) {
      // Obtiene un caramelo al azar
      var numeroCaramelo = getRandomInt(1, 5)
      // Si la columna no tiene caramelos y estás en la primera iteración
      // usa append
      if (i == 0 && caramelos < 1) {
        $(this).append('<img src="image/'+numeroCaramelo+'.png"></img>');
        $(this).find('img').slideDown(1000);
      } else {
        // Sino, usa before, para que los nuevos caramelos
        // empujen a los viejos hacia abajo
        $(this).find('img:eq(0)').before('<img src="image/'+numeroCaramelo+'.png"></img>')
        $(this).find('img:eq(0)').slideDown(1000);
      }
    }
  });
  agregaEventos();
  realizarValidaciones();
}

// Activa las validaciones verticales y horizontales
function realizarValidaciones() {
  validacionVertical();
  validacionHorizontal();
}

// Añade los eventos de los caramelos. Es llamada cada vez que se crean caramelos
function agregaEventos() {
  $('img').draggable({
    containment: '.panel-tablero',
    droppable: 'img',
    revert: true,
    revertDuration: 1000,
    grid: [100, 50],
    zIndex: 10,
    drag: controlarMovimiento
  });
  $('img').droppable({
    drop: reemplazarCaramelos
  })
}

// Controla el movimiento de los caramelos
function controlarMovimiento(event, carameloDrag) {
  event.stopPropagation();
  carameloDrag.position.top = Math.min(100, carameloDrag.position.top);
  carameloDrag.position.bottom = Math.min(100, carameloDrag.position.bottom);
  carameloDrag.position.left = Math.min(100, carameloDrag.position.left);
  carameloDrag.position.right = Math.min(100, carameloDrag.position.right);
}

// Pruebas relacionadas al intercambio de caramelos
function reemplazarCaramelos(event, carameloDrag) {
  var dragSrc = $(carameloDrag.draggable).attr('src');
  var nuevo = $(this).attr('src');
  $(carameloDrag.draggable).attr('src', nuevo);
  $(this).attr('src', dragSrc);
  actualizarArraysCaramelos();
  actualizarMovimientos();
  chequearTablero();
}

// Actualiza el contador de Movimientos
function actualizarMovimientos() {
  var valorActual = Number($('#movimientos-text').text());
  var suma = valorActual += 1;
  $('#movimientos-text').text(suma);
}


/* Fin de mis funciones */

/* Acá se inicializa mi juego */
$(function() {
  // Se activa infinitamente la animación del título
  // prenderApagar('h1.main-titulo');

  $('.btn-reinicio').click(function() {
    chequearTablero();
  });

});

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

/*Inicio de mis funciones*/

// Obtiene numeros random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Hace que el título Match Game cambie de color infinitamente
function prenderApagar(selector) {
  $(selector).animate({
    opacity: '1',
  },
  {
    step: function() {
      $(this).css('color', '#DCFF0E');
    },
    queue: true
  }
)
.animate({
  opacity: '1'
},
{
  step: function() {
    $(this).css('color', 'red');
  },
  queue: true
}, 600
)
.delay(1000)
.animate({
  opacity: '1'
},
{
  step: function() {
    $(this).css('color', '#DCFF0E');
  },
  queue: true
}
)
.animate({
  opacity: '1'
},
{
  step: function() {
    $(this).css('color', 'purple')
    prenderApagar('h1.main-titulo');
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
                       caramelosCol5.eq(indice), caramelosCol6.eq(indice),
                       caramelosCol7.eq(indice)]);
}

// Crea arrays de las columnas
function caramelosColumnas(indice) {
  actualizarArraysCaramelos();
  caramelosColumna = $([caramelosCol1, caramelosCol2, caramelosCol3,
                        caramelosCol4, caramelosCol5, caramelosCol6,
                        caramelosCol7]);
  return caramelosColumna[indice];
}

function validacionVertical() {
  for (var j = 0; j < 7; j++) {
    // Creamos nuestro array de posiciones
    var posicionCaramelos = [];
    // Creamos nuestro array de posiciones extras
    var posicionExtras = [];
    // Creamos nuestra columna
    var columna = caramelosColumnas(j);
    // Tomamos el primer objeto de nuestra columna
    var valorComparacion = columna.eq(0);
    // Inicializamos el contador en 0
    var contador = 0;
    // Nos servirá para saber si hubo una brecha
    var brecha = false;
    // Iteramos el array de columna
    for (var i = 1; i < columna.length; i++) {
      // Guardamos el src de valorComparacion
      var srcComparacion = valorComparacion.attr('src');
      // srcCaramelo siempre vendrá después de srcComparacion
      var srcCaramelo = columna.eq(i).attr('src');

      if (srcComparacion != srcCaramelo) {
        if (posicionCaramelos.length >= 3) {
          brecha = true;
        } else {
          posicionCaramelos = [];
        }
        contador = 0;
      } else {
        if (contador == 0) {
          if (!brecha) {
            posicionCaramelos.push(i-1);
          } else {
            posicionExtras.push(i-1);
          }
        }
        if (!brecha) {
          posicionCaramelos.push(i);
        } else {
          posicionExtras.push(i);
        }
        contador += 1;
      }

      valorComparacion = columna.eq(i);
    }
    // Si posicionExtras tiene más de dos valores, lo concatenas con posicionCaramelos
    if (posicionExtras.length > 2) {
      posicionCaramelos = $.merge(posicionCaramelos, posicionExtras);
    }
    // Si posicionCaramelos tiene menos de/o dos caramelos, lo borras
    if (posicionCaramelos.length <= 2) {
      posicionCaramelos = [];
    }
    // El numeroCaramelos sera igual al numero de elementos en el array
    numeroCaramelos = posicionCaramelos.length;
    // Si hubo tres o más caramelos en línea
    if (numeroCaramelos >= 3) {
      eliminarVertical(posicionCaramelos, columna);
      colocarPuntuacion(numeroCaramelos);
    }
  }
}

// Añade la clase eliminar a "líneas" verticales
function eliminarVertical(posicionCaramelos, columna) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    columna.eq(posicionCaramelos[i]).addClass('eliminar');
  }
}

function validacionHorizontal() {
  // Con este for, le aplicamos la validacion a todas las filas
  for (var j = 0; j < 6; j++) {
  // Creamos nuestro array de posiciones
  var posicionCaramelos = [];
  // Creamos nuestro array de posiciones extras
  var posicionExtras = [];
  // Creamos nuestra fila
  var fila = caramelosFilas(j);
  // Tomamos el primer objeto de nuestra fila
  var valorComparacion = fila[0];
  // Inicializamos el contador en 0
  var contador = 0;
  // Nos servirá para saber si hubo una brecha
  var brecha = false;

  // Iteramos el array de fila
  for (var i = 1; i < fila.length; i++) {
    // Guardamos el src de valorComparacion
    var srcComparacion = valorComparacion.attr('src');
    // srcCaramelo siempre vendrá después de srcComparacion
    var srcCaramelo = fila[i].attr('src');

    if (srcComparacion != srcCaramelo) {
      if (posicionCaramelos.length >= 3) {
        brecha = true;
      } else {
        posicionCaramelos = [];
      }
      contador = 0;
    } else {
      if (contador == 0) {
        if (!brecha) {
          posicionCaramelos.push(i-1);
        } else {
          posicionExtras.push(i-1);
        }
      }
      if (!brecha) {
        posicionCaramelos.push(i);
      } else {
        posicionExtras.push(i);
      }
      contador += 1;
    }

    valorComparacion = fila[i];
  }
  // Si posicionExtras tiene más de dos valores, lo concatenas con posicionCaramelos
  if (posicionExtras.length > 2) {
    posicionCaramelos = $.merge(posicionCaramelos, posicionExtras);
  }
  // Si posicionCaramelos tiene menos de/o dos caramelos, lo borras
  if (posicionCaramelos.length <= 2) {
    posicionCaramelos = [];
  }
  // El numeroCaramelos sera igual al numero de elementos en el array
  numeroCaramelos = posicionCaramelos.length;
  // Si hubo tres o más caramelos en línea
  if (numeroCaramelos >= 3) {
    eliminarHorizontal(posicionCaramelos, fila);
    colocarPuntuacion(numeroCaramelos);
  }
}
}

// Añade la clase eliminar a "líneas" horizontales
function eliminarHorizontal(posicionCaramelos, fila) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    fila[posicionCaramelos[i]].addClass('eliminar');
  }
}

// Coloca la puntuacion de acuerdo al numero de caramelos obtenido
function colocarPuntuacion(numeroCaramelos) {
  var score = $('#score-text');
  var puntaje = Number($('#score-text').text());
  switch (numeroCaramelos) {
    case 3:
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
      var numeroCaramelo = getRandomInt(1, 5);
      // Si la columna no tiene caramelos y estás en la primera iteración
      // usa append
      if (i == 0 && caramelos < 1) {
        $(this).append('<img src="image/'+numeroCaramelo+'.png"></img>');
        $(this).find('img').slideDown();
      } else {
        // Sino, usa before, para que los nuevos caramelos
        // empujen a los viejos hacia abajo
        $(this).find('img:eq(0)').before('<img src="image/'+numeroCaramelo+'.png"></img>');
        $(this).find('img:eq(0)').slideDown();
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
  // Si hay caramelos que eliminar...
  if ($('img.eliminar').length != 0) {
    setTimeout(eliminarCaramelos(), 500);
  }
}

// Añade los eventos de los caramelos. Es llamada cada vez que se crean caramelos
function agregaEventos() {
  $('img').draggable({
    containment: '.panel-tablero',
    droppable: 'img',
    revert: true,
    revertDuration: 500,
    grid: [100, 100],
    zIndex: 10,
    drag: controlarMovimiento
  });
  $('img').droppable({
    drop: reemplazarCaramelos
  });
  reactivaEventos();
}

function desactivaEventos() {
  $('img').draggable('disable');
  $('img').droppable('disable');
}

function reactivaEventos() {
  $('img').draggable('enable');
  $('img').droppable('enable');
}

// Limita el movimiento de los caramelos
function controlarMovimiento(event, carameloDrag) {
  carameloDrag.position.top = Math.min(100, carameloDrag.position.top);
  carameloDrag.position.bottom = Math.min(100, carameloDrag.position.bottom);
  carameloDrag.position.left = Math.min(100, carameloDrag.position.left);
  carameloDrag.position.right = Math.min(100, carameloDrag.position.right);
}

// Reemplaza los caramelos (drag and drop)
function reemplazarCaramelos(event, carameloDrag) {
  // Almacenamos nuestro caramelo draggable en una variable
  var carameloDrag = $(carameloDrag.draggable);
  // Obtenemos el src del caramelo que arrastramos (draggable)
  var dragSrc = carameloDrag.attr('src');
  // Almacenamos nuestro caramelo droppable en una variable
  var carameloDrop = $(this);
  // Obtenemos el src del caramelo objetivo (droppable)
  var dropSrc = carameloDrop.attr('src');
  // Intercambiamos el src de los caramelos
  carameloDrag.attr('src', dropSrc);
  // $(this).attr('src', dragSrc);
  carameloDrop.attr('src', dragSrc);

  setTimeout(function() {
    actualizarArraysCaramelos();
    chequearTablero();
    // Este condicional impide las jugadas incorrectas
    if ($('img.eliminar').length == 0) {
      carameloDrag.attr('src', dragSrc);
      carameloDrop.attr('src', dropSrc);
      actualizarArraysCaramelos();
    } else {
      actualizarMovimientos();
    }
  }, 500);

}

// Actualiza el contador de Movimientos
function actualizarMovimientos() {
  var valorActual = Number($('#movimientos-text').text());
  var suma = valorActual += 1;
  $('#movimientos-text').text(suma);
}

// Elimina los caramelos con una animacion
function eliminarCaramelos() {
  desactivaEventos();
  $('img.eliminar').effect('pulsate', 1000);
  $('img.eliminar').animate({
    opacity: '0'
  }, 1000
  )
  .animate({
    opacity: '0'
  },
  {
    step: function() {
      $('img.eliminar').remove();
      chequearTablero();
    },
    queue: true
  }
  )
}

//Culmina el juego
function culminarJuego() {
  $('div.panel-tablero, div.time').effect('fold');
  $('h1.main-titulo').css('text-align', 'center')
  .text('Thanks for playing!');
  $('div').width('100%');
}

/* Fin de mis funciones */

/* Acá se inicializa mi juego */
$(function() {
  // Se activa infinitamente la animación del título
  prenderApagar('h1.main-titulo');

  $('.btn-reinicio').click(function() {
    // Recarga la página
    if ($(this).text() == 'Reiniciar') {
      location.reload(true);
    }
    chequearTablero();
    $(this).text('Reiniciar');
    // Comenzar a contar el tiempo
    $('#timer').startTimer({
      onComplete: culminarJuego
    });
  });
});

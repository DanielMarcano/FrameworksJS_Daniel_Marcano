// Arrays de caramelos
var caramelosCol1,
caramelosCol2,
caramelosCol3,
caramelosCol4,
caramelosCol5,
caramelosCol6,
caramelosCol7;


// Funcion de la documentación de Mozilla para obtener números Random
// El min es incluyente y el max excluyente
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

// Con esta funcion, actualizamos los arrays de caramelos
function actualizarArraysCaramelos(selector) {
  $(selector).each(function(i) {
    switch (i) {
      case 0:
        caramelosCol1 = $(this).children();
        break;
      case 1:
        caramelosCol2 = $(this).children();
        break;
      case 2:
        caramelosCol3 = $(this).children();
        break;
      case 3:
        caramelosCol4 = $(this).children();
        break;
      case 4:
        caramelosCol5 = $(this).children();
        break;
      case 5:
        caramelosCol6 = $(this).children();
        break;
      case 6:
        caramelosCol7 = $(this).children();
        break;
    }
  });
}

// Funcion de prueba
function validacionVertical() {
  // Creamos nuestro array de posiciones
  var posicionCaramelos = [];
  // Tomamos el primer objeto de nuestra columna
  var valorComparacion = caramelosCol1.eq(0);
  // Inicializamos el contador en 0
  var contador = 0;
  // Nos servirá para saber si hubo una brecha entre nuestra línea de dulces
  var detenerContador = false;
  // Iteramos el array de caramelosCol1
  for (var i = 1; i < caramelosCol1.length; i++) {
    // Guardamos el src de todos los elementos, para compararlos
    var srcComparacion = valorComparacion.attr('src');
    // srcCaramelo siempre vendrá después de valorComparacion
    var srcCaramelo = caramelosCol1.eq(i).attr('src');

    if (srcComparacion != srcCaramelo) {
      valorComparacion = caramelosCol1.eq(i);
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
    // alert('posicionCaramelos tiene ' + posicionCaramelos.length + ' valores');
    // alert('hubo '+(contador+1)+' caramelos seguidos en la col 1');
    eliminarVertical(posicionCaramelos, caramelosCol1);
  }

}
// Otra funcion de prueba
function eliminarVertical(posicionCaramelos, arrayCaramelos) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    alert('borrare el caramelo numero ' + posicionCaramelos[i])
    var tmpCaramelo = $(arrayCaramelos).eq(posicionCaramelos[i]).fadeOut(1000);
    tmpCaramelo.remove(1000);

  }
  actualizarArraysCaramelos('[class^="col-"]');
  chequearTablero();
}

//Se activa cada vez que se inicia el juego, u ocurren cambios en el tablero
function chequearTablero() {
  // Si hay columnas sin dulces, esta función las rellenará
  llenarColumnas('[class^="col-"]');
  actualizarArraysCaramelos('[class^="col-"]');
  // Esta funcion es de prueba
  validacionVertical();
}

function llenarColumnas(selector) {
  var tope = 6;
  var columna = $(selector);

  $(selector).each(function() {
    var caramelos = $(this).children().length;
    var agrega = tope - caramelos;
    for (var i = 0; i < agrega; i++) {
      // Obtiene un caramelo al azar
      var numeroCaramelo = getRandomInt(1, 5)
      // Si la columna no tiene caramelos y estás en la primera iteración
      // usa append
      if (i == 0 && caramelos < 1) {
        $(this).append('<img src="image/'+numeroCaramelo+'.png" style="display: none;" class="ui-state-default sortable"></img>');
        $(this).find('img').slideDown(1000);
      } else {
        // Sino, usa before, para que los nuevos caramelos
        // empujen a los viejos hacia abajo
        $(this).find('img:eq(0)').before('<img src="image/'+numeroCaramelo+'.png" style="display: none;" class="ui-state-default sortable"></img>')
        $(this).find('img:eq(0)').slideDown(1000);
      }
    }
  });
}

/* Fin de mis funciones */

// Inicio de la función $(document).ready
var respuesta;
$(function() {
  // Se activa infinitamente la animación del título
  // prenderApagar('h1.main-titulo');
  $('.btn-reinicio').click(function() {
    chequearTablero();
  });

});
// Fin de la función $(document).ready

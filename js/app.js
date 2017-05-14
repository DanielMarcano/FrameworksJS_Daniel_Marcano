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
function actualizarArraysCaramelos() {

  caramelosCol1 = $('.col-1').children();
  caramelosCol2 = $('.col-2').children();
  caramelosCol3 = $('.col-3').children();
  caramelosCol4 = $('.col-4').children();
  caramelosCol5 = $('.col-5').children();
  caramelosCol6 = $('.col-6').children();
  caramelosCol7 = $('.col-7').children();


}

// Funcion de prueba que crea arrays de caramelos horizontales
function caramelosFilas(indice) {
  actualizarArraysCaramelos();
  return caramelosFila = $([caramelosCol1.eq(indice), caramelosCol2.eq(indice),
                       caramelosCol3.eq(indice), caramelosCol4.eq(indice),
                       caramelosCol4.eq(indice), caramelosCol5.eq(indice),
                       caramelosCol6.eq(indice), caramelosCol7.eq(indice)]);
}

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
  var caramelosColumna = caramelosColumnas(j);
  // Tomamos el primer objeto de nuestra columna
  var valorComparacion = caramelosColumna.eq(0);
  // Inicializamos el contador en 0
  var contador = 0;
  // Nos servirá para saber si hubo una brecha entre nuestra línea de dulces
  var detenerContador = false;
  // Iteramos el array de caramelosColumna
  for (var i = 1; i < caramelosColumna.length; i++) {
    // Guardamos el src de todos los elementos, para compararlos
    var srcComparacion = valorComparacion.attr('src');
    // srcCaramelo siempre vendrá después de valorComparacion
    var srcCaramelo = caramelosColumna.eq(i).attr('src');

    if (srcComparacion != srcCaramelo) {
      valorComparacion = caramelosColumna.eq(i);
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
    eliminarVertical(posicionCaramelos, caramelosColumna);
    colocarPuntuacion(contador);
  }
}
}

// Otra funcion de prueba
function eliminarVertical(posicionCaramelos, arrayCaramelos) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    var tmpCaramelo = arrayCaramelos.eq(posicionCaramelos[i]).fadeOut(1500);
    $(tmpCaramelo).remove();
  }
  // actualizarArraysCaramelos('[class^="col-"]');
  // llenarColumnas();
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
  var caramelosFila = caramelosFilas(j);
  // Tomamos el primer objeto de nuestra fila
  var valorComparacion = caramelosFila[0];

  // Inicializamos el contador en 0
  var contador = 0;
  var contadorExtra = 0;
  // Nos servirá para saber si hubo una brecha entre nuestra línea de dulces
  var detenerContador = false;
  // Iteramos el array de caramelosFila
  for (var i = 1; i < caramelosFila.length; i++) {
    // Guardamos el src de todos los elementos, para compararlos
    var srcComparacion = valorComparacion.attr('src');
    // srcCaramelo siempre vendrá después de valorComparacion
    var srcCaramelo = caramelosFila[i].attr('src');

    if (srcComparacion != srcCaramelo) {
      valorComparacion = caramelosFila[i];
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
      } else {
        contadorExtra += 1;
        if (!posicionExtra) {
          posicionExtra.push(i-1);
        }
        posicionExtra.push(i)
      }
    }
  }
  // Si hubo tres o más caramelos en línea
  if (contador >= 2) {
    if (contadorExtra < 2) {
      contadorExtra = 0;
      posicionExtra = null;
    }
    eliminarHorizontal(posicionCaramelos, caramelosFila);
    colocarPuntuacion(contador);
  }
}
}

function eliminarHorizontal(posicionCaramelos, caramelosFila) {
  for (var i = 0; i < posicionCaramelos.length; i++) {
    var tmpCaramelo = caramelosFila[posicionCaramelos[i]].fadeOut(1500);
    $(tmpCaramelo).remove();
  }
  // actualizarArraysCaramelos('[class^="col-"]');
  // llenarColumnas();
  chequearTablero();
}




// Funcion de prueba de la puntuacion
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
  // actualizarArraysCaramelos();
  llenarColumnas();
  // Esta funcion es de prueba
  // validacionVertical();
  // Otra funcion de prueba
  // validacionHorizontal();
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
  realizarValidaciones();
}

function realizarValidaciones() {
  actualizarArraysCaramelos();
  validacionVertical();
  validacionHorizontal();
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

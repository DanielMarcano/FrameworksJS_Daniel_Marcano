// Mis funciones

// Inicio de la funcion que prende y apaga el titulo Match Game
function prenderApagar(selector) {
  $(selector).animate({
    opacity: '1'
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
// Fin de la funcion que prende y apaga el titulo Match Game

// Fin de mis funciones

// Inicio de la función $(document).ready
$(function() {
  // Se activa infinitamente la animación del título
  // prenderApagar('h1.main-titulo');



});
// Fin de la función $(document).ready

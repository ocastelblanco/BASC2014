/* Ajustes para navegadores sin soporte ECMA-262 5ta edición, es decir, el cochino IE8 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if ( this === undefined || this === null ) {
        throw new TypeError( '"this" is null or not defined' );
      }
      var length = this.length >>> 0; // Hack to convert object.length to a UInt32
      fromIndex = +fromIndex || 0;
      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }
      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }
      for (;fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }
      return -1;
    };
  }
/* Ahora si, el código de verdad */
$(function(){
    ajustarMenu();
    window.onresize = ajustarMenu;
    $('#abrirMenu').click(function() {
        $('.vinculos').toggle("slide", {direction: "up", easing:"easeInQuint"}, 'slow');
    });
    alistaPresaberes();
    $('a.bibliografia').popover({
        'container': 'body',
        'placement': 'auto top'
    }).click(function(evento) {
        evento.preventDefault();
    }).prepend('<i class="fa fa-book"></i>&nbsp;');
    $('.lineaTiempo a').popover({
        'container': 'body',
        'placement': 'auto top',
        'trigger': 'hover'
    }).prepend('<i class="fa fa-chevron-circle-up"></i>&nbsp;');
    $('.lineaTiempo button').popover({
        'container': 'body',
        'placement': 'auto top',
        'trigger': 'hover'
    });
    $('a.bocadillo').tooltip({'container': 'body'}).click(function(evento) {evento.preventDefault();});
});
function ajustarMenu(){
    if(window.innerWidth < 768){
        $('.vinculos').hide("slide", {direction: "up", easing:"easeInQuint"}, 'slow');
    } else {
        $('.vinculos').show();
    }
}
function alistaPresaberes() {
    var preguntas = new Array();
    $('#presaberes input[type="radio"]').each(function(index) {
        if (preguntas.indexOf($(this).attr('name')) < 0) {
            preguntas.push($(this).attr('name'));
        }
    });
    for (var i=0;i<preguntas.length;i++){
        var respuestas = new Array();
        $('#presaberes input[name="'+preguntas[i]+'"]').each(function(index) {
            respuestas.push($(this).parent().html());
        });
        var nuevoOrden = ordenAleatorio($('#presaberes input[name="'+preguntas[i]+'"]').length);
        $('#presaberes input[name="'+preguntas[i]+'"]').parent().each(function(index) {
            $(this).html(respuestas[nuevoOrden[index]]);
        });
    }
    $('#presaberes button').click(function(){
        $('#presaberes input[value="error"]').parent().parent().addClass('has-error').append('<i class="fa fa-times fa-lg form-control-feedback"></i>');
        $('#presaberes input[value="correcto"]').parent().parent().addClass('has-success').append('<i class="fa fa-check fa-lg form-control-feedback"></i>');
        $(this).unbind();
    });
}

function ordenAleatorio(longitud) {
    var salida = new Array();
    for (var i=0;i<longitud;i++){
        var random = Math.floor(Math.random()*longitud);
        while (salida.indexOf(random)>-1) {
            random = Math.floor(Math.random()*longitud);
        }
        salida.push(random);
    }
    return salida;
}

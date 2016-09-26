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
var lienzoArbol,arrastrables;
var arrastreCorrecto = false;
var arrastreErrores = 0;
var arrastreCont = 0;
var numArrastrables = 0;
var arrastreOrden = [];
$(function(){
    ajustarMenu();
    window.onresize = ajustarMenu;
    $('#abrirMenu').click(function() {
        $('.vinculos').toggle("slide", {direction: "up", easing:"easeInQuint"}, 'slow');
    });
    alistaPresaberes();
    $('a.bibliografia').popover({
        'container': 'body',
        'placement': 'auto top',
        'html': true,
        'title': 'Cita bibliográfica'
    }).click(function(evento) {
        evento.preventDefault();
    }).prepend('<i class="fa fa-book"></i>&nbsp;');
    $('.lineaTiempo a').click(function(evento) {
        evento.preventDefault();
    }).popover({
        'container': 'body',
        'placement': 'auto top',
        'trigger': 'hover'
    }).prepend('<i class="fa fa-chevron-circle-up"></i><br>');
    $('a.bocadillo').tooltip({'container': 'body'}).click(function(evento) {evento.preventDefault();});
    $('.arbol .rama').each(function(index) {
        var margen = ($(this).parent().parent().height()-$(this).outerHeight(true))/2;
        $(this).css('margin-top', margen+'px');
    });
    $('.arbol a').click(function(evento) {
        evento.preventDefault();
    }).popover({
        'container': 'body',
        'placement': 'auto top',
        'trigger': 'click'
    });
    if ($('.arbol').length > 0) {
        alistaArbol();
    }
    $('.graficoSimple a').click(function(evento) {
        evento.preventDefault();
    }).popover({
        'container': 'body',
        'placement': 'auto top',
        'trigger': 'click',
        'html': true
    }).on('shown.bs.popover', function () {
        $('a.bocadillo').tooltip({'container': 'body'}).click(function(evento) {evento.preventDefault();});
    });
    if ($('.emparejamiento').html()) {
        emparejamiento();
    }
    $('.esquemaCircular div.pasos div.paso a').click(function(evento) {
        evento.preventDefault();
    }).popover({
        'container': 'body',
        'placement': 'auto top',
        'html': true,
        'trigger': 'hover'
    }).prepend('<i class="fa fa-chevron-circle-up"></i><br>');
    $('.listadoHorizontal a').click(function(evento) {
        evento.preventDefault();
    }).popover({
        'container': 'body',
        'placement': 'auto top',
        'html': true,
        'trigger': 'hover'
    });
    $('.img-modal').wrap('<div class="wrap-img-modal"></div>').click(function() {
        $('#modal .modal-content').append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="etiquetaModal">'+$(this).attr('title')+'</h4></div><div class="modal-body"><img src="'+$(this).attr('src')+'" class="img-responsive img-centrada"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div>');
        $('#modal').modal();
    }).after('<p>Haga clic sobre la imagen para ampliarla</p>');
    $('#modal').on('hidden.bs.modal', function (e) {
        $('#modal .modal-content').html('');
    });
    $('.img-modal-xl').wrap('<div class="wrap-img-modal-xl"></div>').click(function() {
        $('#modalXL .modal-content').append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="etiquetaModal">'+$(this).attr('title')+'</h4></div><div class="modal-body"><img src="'+$(this).attr('src')+'" class="img-responsive img-centrada"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div>');
        $('#modalXL').modal();
    }).after('<p>Haga clic sobre la imagen para ampliarla</p>');
    $('#modalXL').on('hidden.bs.modal', function (e) {
        $('#modalXL .modal-content').html('');
    });
    $('.seleccionable select').change(function(){
        var frase = $(this).parent();
        var numResp = $(frase).children('select').length;
        var puntaje = 0;
        var todos = true;
        $(frase).children('select').each(function(){
            if($(this).children('option:selected').val() == "") {
                todos = false;
            }
            puntaje += Number($(this).children('option:selected').val());
        });
        if(todos) {
            if (puntaje == numResp) {
                $(frase).addClass('has-success alert alert-success').attr('role','alert').append('<i class="fa fa-check fa-lg form-control-feedback"></i>');
            } else {
                $(frase).addClass('has-error alert alert-danger').attr('role','alert').append('<i class="fa fa-times fa-lg form-control-feedback"></i>');
            }
            $(frase).children('select').each(function(){
                $(this).unbind();
                $(this).replaceWith('<span class="respuesta">'+$(this).children('option:selected').html()+'</span>');
            });
        }
    });
    $('.abreOculto').click(function() {
        $('table.tablaOcultoVisible .visible').show();
        $('table.tablaOcultoVisible .oculto').hide();
        var fila = $(this).parent().parent();
        $(fila).children('td').children('.oculto').show('slow');
        $(fila).children('td').children('.visible').hide();
    });
    $('.abreYouTube').click(function(evento) {
        evento.preventDefault();
        var titulo = $(this).html();
        var url = $(this).attr('title');
        var alto = Math.floor($(window).innerHeight()*0.8);
        $('#modal .modal-content')
            .html('<iframe width="100%" height="'+alto+'" src="'+url+'" frameborder="0" allowfullscreen></iframe>')
            .prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button><h4 class="modal-title">'+titulo+'</h4></div>');
        $('#modal button.close').click(function(){
            $('#modal .modal-header').remove();
            $('#modal .modal-content').html('');
            $('#modal').modal('hide');
        });
    });
    $('#listaDesplegable li span').hide();
    $('#listaDesplegable li strong').click(function(){
        $(this).next().show('slide','slow');
    });
    $('.tablaDesplegada tbody tr td:first-of-type').not('.celdaAbierta').click(function(){
        var trigger = $(this);
        var titulo = $(trigger).parent().parent().parent().children('thead').children('tr').children('th');
        if ($(trigger).next().is(':visible')) {
            $(titulo).hide(function(){
                $(this).next().hide('slide', 'slow', function(){
                    $(trigger).next().hide('slide', 'slow', function(){
                        $(this).next().hide('slide', 'slow', function(){
                            $(this).next().hide('slide', 'slow', function(){
                                $(this).next().hide('slide', 'slow', function(){
                                    $(this).next().hide('slide', 'slow');
                                });
                            });
                        });
                    });
                });
            });
        } else {
            $(titulo).show(function(){
                $(trigger).next().show('slide', 'slow', function(){
                    $(this).next().show('slide', 'slow', function(){
                        $(this).next().show('slide', 'slow', function(){
                            $(this).next().show('slide', 'slow', function(){
                                $(this).next().show('slide', 'slow');
                            });
                        });
                    });
                });
            });
        }
    });
}); // Fin de la function inicial
function emparejamiento() {
    arrastrables = [];
    numArrastrables = $('.emparejamiento .arrastrable a').length;
    $('.emparejamiento .arrastrable a').each(function(){
        arrastrables.push(this);
    }).hide().draggable().click(function(evento) {
        evento.preventDefault();
    });
    $('.emparejamiento .destino a').droppable({
       drop: function(event,ui) {
               arrastreCorrecto = true;
               verificarDrop(event, ui);
           },
       out: function(event,ui) {
               if (!arrastreCorrecto){
                    dropFuera(event, ui);
               }
           }
    }).append('<span class="badge">0</span>').click(function(evento) {
        evento.preventDefault();
    }).popover({
        'container': 'body',
        'placement': 'auto top',
        'trigger': 'click',
        'html': true
    });
    arrastreOrden = ordenAleatorio(numArrastrables);
    arrastrarEmparejamiento();
}
function arrastrarEmparejamiento() {
    $('.emparejamiento .alert.alert-success span').html(arrastreCont);
    $('.emparejamiento .alert.alert-warning span').html(arrastreErrores);
    if (arrastreCont < numArrastrables) {
        $(arrastrables[arrastreOrden[arrastreCont]]).show('slide', {direction: "up", easing:"easeInQuint"}, 1000);
    } else {
        $('.emparejamiento .arrastrable p span:first-of-type').html(arrastreCont);
        $('.emparejamiento .arrastrable p span:last-of-type').html(arrastreErrores);
        $('.emparejamiento .arrastrable p').show('slide', {direction: "up", easing:"easeInQuint"}, 1000);
    }
}
function verificarDrop(evento, obj) {
    if($(evento.target).data('goal') == $(obj.draggable).data('destination')) {
        $(evento.target).children('.badge').html(Number($(evento.target).children('.badge').html())+1);
        if ($(evento.target).attr('data-content') == "") {var salto="";} else {var salto = "<br>";}
        var contenido = $(evento.target).attr('data-content')+salto+'<strong>'+$(evento.target).children('.badge').html()+'.</strong> '+$(obj.draggable).html();
        $(evento.target).attr('data-content',contenido);
        $(obj.draggable).hide('scale', {percent: 0, easing:"easeInQuint"}, 500, finReducir);
    } else {
        volverPosOriginal(obj);
    }
    arrastreCorrecto = false;
    function finReducir() {
        arrastreCont++;
        arrastrarEmparejamiento();
    }
}
function dropFuera(evento, obj) {
    volverPosOriginal(obj);
}
function volverPosOriginal(obj) {
    $(obj.draggable).addClass('posicionArrastrables', 500,'easeOutBounce', finPosOriginal);
    function finPosOriginal() {
        $(obj.draggable).removeClass('posicionArrastrables');
        $('.emparejamiento .alert.alert-success span').html(arrastreCont);
        $('.emparejamiento .alert.alert-warning span').html(arrastreErrores);
    }
    arrastreCorrecto = false;
    arrastreErrores++;
}
function alistaArbol() {
    if (lienzoArbol) {
        lienzoArbol.remove();
        lienzoArbol = null;
    }
    lienzoArbol = Raphael('graficaArbol',$('#graficaArbol').width(),$('#graficaArbol').height());
    var nivel1 = $('.rama')[0];
    var pos1x = $(nivel1).outerWidth(true);
    var pos1y = $(nivel1).position().top+Number($(nivel1).css('margin-top').slice(0,-2))+($(nivel1).outerHeight(false)/2);
    var yGral = $('.arbol').offset().top;
    var color = $(nivel1).css('border-color');
    $(nivel1).parent().next().children('.row').children('div:first-of-type').children('.rama').each(function(index){
        var pos2y = ($(this).offset().top-yGral)+($(this).outerHeight(false)/2);
        var linea = lienzoArbol.path('M'+pos1x+','+pos1y+'L'+(pos1x+15)+','+pos1y+'L'+(pos1x+15)+','+pos2y+'L'+(pos1x+35)+','+pos2y);
        linea.attr('stroke', color);
        linea.attr('stroke-width', '2');
        dibujaLineasArbol($(this),'.arbol',lienzoArbol);
    });
}
function dibujaLineasArbol(origen,padre,papel) {
    var pos1x = $(origen).offset().left-$(padre).offset().left+$(origen).outerWidth();
    var pos1y = $(origen).offset().top-$(padre).offset().top+($(origen).outerHeight()/2);
    var color = $(origen).css('border-color');
    $(origen).parent().next().children('a').each(function(index){
        var pos2y = ($(this).offset().top-$(padre).offset().top)+($(this).outerHeight(false)/2);
        var linea = papel.path('M'+pos1x+','+pos1y+'L'+(pos1x+15)+','+pos1y+'L'+(pos1x+15)+','+pos2y+'L'+(pos1x+35)+','+pos2y);
        linea.attr('stroke', color);
        linea.attr('stroke-width', '2');
        dibujaLineasArbol($(this),padre,papel);
    });
}
function ajustarMenu(){
    if(window.innerWidth < 768){
        $('.vinculos').hide("slide", {direction: "up", easing:"easeInQuint"}, 'slow');
    } else {
        $('.vinculos').show();
    }
    if ($('.arbol').length > 0) {
        alistaArbol();
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

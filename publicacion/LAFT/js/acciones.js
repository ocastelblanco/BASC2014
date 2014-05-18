/*  */
$(function(){
    ajustarMenu();
    window.onresize = ajustarMenu;
    $('#abrirMenu').click(function() {
        $('.vinculos').toggle("slide", {direction: "up", easing:"easeInQuint"}, 'slow');
    });
});
function ajustarMenu(){
    if(window.innerWidth < 768){
        $('.vinculos').hide("slide", {direction: "up", easing:"easeInQuint"}, 'slow');
    } else {
        $('.vinculos').show();
    }
}

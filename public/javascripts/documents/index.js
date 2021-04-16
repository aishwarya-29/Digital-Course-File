$(document).ready(function(){
    $('#one').show();
})

$('#myDoc').click(function(){
    $('.item').removeClass('active teal');
    $('#myDoc').addClass('active teal');
    $('.content').hide();
    $('#one').show();
});
$('#newDoc').click(function(){
    $('.item').removeClass('active teal');
    $('#newDoc').addClass('active teal');
    $('.content').hide();
    $('#two').show();
});
$('#savedDoc').click(function(){
    $('.item').removeClass('active teal');
    $('#savedDoc').addClass('active teal');
    $('.content').hide();
    $('#three').show();
});
$(document).ready(function(){
    $('#option2').css('display','block');
});

$('#toggle').click(function(){
    $('#option2').css('display','none');
    $('#option3').css('display','block');
    $('#option1 h1').text('SIGN UP');
});

$('#toggle2').click(function(){
    $('#option3').css('display','none');
    $('#option2').css('display','block');
    $('#option1 h1').text('SIGN IN');
});
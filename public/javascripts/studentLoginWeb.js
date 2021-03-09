$('#toggle').click(function(){
    $('#option1').removeClass('move-left2');
    $('.dummy').removeClass('move-right2');
    $('#option1').addClass('move-right');
    $('.dummy').addClass('move-left');
    setTimeout(() => {
        $('#option2').css('display','none'); 
        $('#option3').css('display','block');
        $('#option1 h1').text('SIGN UP');
    }, 500);
});

$('#toggle2').click(function(){
    $('#option1').removeClass('move-right');
    $('.dummy').removeClass('move-left');
    $('#option1').addClass('move-left2');
    $('.dummy').addClass('move-right2');
    setTimeout(() => {
        $('#option3').css('display','none');
        $('#option2').css('display','block'); 
        $('#option1 h1').text('SIGN IN');
    }, 500);
});


$(document).ready(function(){
    $('#option2').css('display','block');
});

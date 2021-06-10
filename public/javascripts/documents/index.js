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

var deleteCurrent, visCurrent;

$('#modal2').on('show.bs.modal', function (e) {
    var button = e.relatedTarget;
    if (button != null)
    {
        // alert("Launch Button ID='" + button.id + "'");
        visCurrent = button.id;
    }
});

$('#modal1').on('show.bs.modal', function (e) {
    var button = e.relatedTarget;
    if (button != null)
    {
        // alert("Launch Button ID='" + button.id + "'");
        deleteCurrent = button.id;
    }
});

$('#visBTN').click(()=>{
    $('#fileNameForm').val(visCurrent.split('@')[1]);
    //alert($('#sernum'+visCurrent.split('@')[2]).text());
    if($('#sernum'+visCurrent.split('@')[2]).text().localeCompare('public') == 0) {
        $('#visForm').val('private');        
    }
    else {
        $('#visForm').val('public');       
    }
    $('#changeVisForm').submit();
});

$('#deletefilebtn').click(()=> {
    $('#fileNameForm2').val(deleteCurrent.split('@')[1]);
    $('#deleteFileForm').submit();
    
});



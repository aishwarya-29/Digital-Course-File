$('#menu1').click(function(){
    $('.menuitem').removeClass('active');
    $('#menu1').addClass('active');
    $('.content').hide();
    $('#div1').show();
});
$('#menu2').click(function(){
    $('.menuitem').removeClass('active');
    $('#menu2').addClass('active');
    $('.content').hide();
    $('#div2').show();
});
$('#menu3').click(function(){
    $('.menuitem').removeClass('active');
    $('#menu3').addClass('active');
    $('.content').hide();
    $('#div3').show();
});


$(document).ready(()=> {
    var courseID = $('#courseIDtag').text();
    var formData = {}
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: '/api/course/'+courseID,
        data: JSON.stringify(formData),
        dataType:"JSON",
        success: function (course) {
                $('#imgtag').attr("src",' http://storage.googleapis.com/digitalcoursefile-efa96.appspot.com/'+'course%2F'+course.courseID+".jpeg")
                $('#idtag').text(course.courseID);
                $('#nametag').text(course.courseName);
                $('#creditstag').text(course.credits);
                $('#depttag').text(course.deptID);
        },
        error: function (e) {
            alert("RWraegeg");
            console.log("ERROR: ", e);
            alert(e);
        }
    });
});


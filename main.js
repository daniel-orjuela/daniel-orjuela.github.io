Frm = {

  FileChange: function(){
    // console.log($(this)[0].files[0]);
    let file = $(this)[0].files[0];
    let fr = new FileReader();
    fr.onload = function(){
      // console.log(fr.result);
      ImageTracer.imageToSVG(fr.result,
        function(svgstr){
          let htmlImage = `<img src="${fr.result}" />`;
          $("#imgSelectedContainer").html(htmlImage);
          $('#svgContainer').html(svgstr);
        },'posterized2'
      );
    };
    fr.readAsDataURL(file);

    $('#containerImage').removeClass('d-none');
  },

  Vibration: function(){
    let seconds = parseInt($('#txtSecondsVibration').val()) * 1000;
    navigator.vibrate(seconds);
  },

  Init: function(){
    $('#formFile').change(Frm.FileChange);
    $('#btnVibration').click(Frm.Vibration)
  }
};

$(document).ready(Frm.Init);
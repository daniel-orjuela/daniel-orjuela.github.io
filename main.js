Frm = {

  FileChange: function(){
    let file = $(this)[0].files[0];
    let fr = new FileReader();
    fr.onload = function(){
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

  // Vibration: function(){
  //   let seconds = parseInt($('#txtSecondsVibration').val()) * 1000;
  //   navigator.vibrate(seconds);
  // },

  CalculateDateTime: function(){
    let now = new Date();
    let date = "";
    let time = "";

    let month = now.getMonth() + 1;
    let day = now.getDate();
    date = day < 10 ? '0' + day : day;
    date += month < 10 ? '/0' + month : '/' + month;
    date += '/' + now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    time = hours < 10 ? "0" + hours : hours;
    time += minutes < 10 ? ":0" + minutes : ":" + minutes;
    time += seconds < 10 ? ":0" + seconds : ":" + seconds;

    $('#txtFechaHora').text(date + ' - ' + time);
  },

  Init: function(){
    Frm.CalculateDateTime();
    setInterval(Frm.CalculateDateTime, 1000);
    $('#formFile').change(Frm.FileChange);
    // $('#btnVibration').click(Frm.Vibration);
  }
};

$(document).ready(Frm.Init);
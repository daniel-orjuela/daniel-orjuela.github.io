Frm = {

  vibrations: [],
  timer: null,

  FileChange: function(){
    if($(this)[0].files.length){
      $('#spinnerLoad').show();
      let file = $(this)[0].files[0];
      let fr = new FileReader();
      
      fr.onload = Frm.OnLoadImage;
      fr.readAsDataURL(file);
    }
  },

  OnLoadImage: function(){
    let fr = this;
    ImageTracer.imageToSVG(fr.result,
      function(svgstr){
        let htmlImage = `<img src='${fr.result}' style='max-width: 100%; height: auto;' />`;
        let htmlImageSvg = `<img src='data:image/svg+xml,${svgstr}' style="max-width: 100%; height: auto;" />`;
        
        let colors = Frm.GetColorsImageVector(svgstr);
        let waveLengths = Frm.GetWaveLengths(colors);
        Frm.vibrations = Frm.GetVibrations(waveLengths);
        console.log(waveLengths);
        console.log(Frm.vibrations);

        $("#imgSelectedContainer").html(htmlImage);
        $('#svgContainer').html(htmlImageSvg);

        $('#containerImage').removeClass('d-none');
        $('#btnRepeatVibration').removeClass('d-none');
        Frm.GenerateVibrations();

      },'posterized2'
    );
  },

  GetColorsImageVector: function(svgstr){
    const regex = /rgb\([0-9]{0,3},[0-9]{0,3},[0-9]{0,3}\)/gm;
    return svgstr.match(regex) ?? [];
  },

  GetWaveLengths: function(colors){
    let waveLengths = [];
    let waveLengthPrevious;
    
    colors.forEach((element) => { 
      let color = element.replace(/[^0-9,]/g, ''); 
      let resultColor = Utils.CalculateWaveLength(color);

      if(waveLengthPrevious?.calculateColorWaveLength != resultColor.calculateColorWaveLength)
        waveLengths.push(resultColor);

      waveLengthPrevious = resultColor;
    });
    
    return waveLengths;
  },

  GetVibrations: function(waveLengths){
    let vibrations = [];
    waveLengths.forEach((waveLength) => {
      let milliseconds = waveLength.calculateColorWaveLength * 5;
      vibrations.push(milliseconds, milliseconds);
    });

    return vibrations.slice(0, -1);
  },

  GenerateVibrations: function(){
    $('#spinnerLoadText').html('Vibrando...');
    $('#spinnerLoad').show();
    let timeVibrations = Frm.vibrations.reduce(function(a, b) { return a + b; }, 0);
    navigator.vibrate([]);
    navigator.vibrate(Frm.vibrations);
    
    clearTimeout(Frm.timer);
    Frm.timer = setTimeout(function(){
      $('#spinnerLoad').hide();
      $('#spinnerLoadText').html('Cargando...');
    }, timeVibrations);
  },

  CalculateDateTime: function(){
    let now = new Date();
    let date = "";
    let time = "";

    let month = now.getMonth() + 1;
    let day = now.getDate();
    date = day < 10 ? `0` + day : day;
    date += month < 10 ? '/0' + month : '/' + month;
    date += '/' + now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    time = hours < 10 ? "0" + hours : hours;
    time += minutes < 10 ? ":0" + minutes : ":" + minutes;
    time += seconds < 10 ? ":0" + seconds : ":" + seconds;

    $('#txtDatetime').text(date + ' - ' + time);
  },

  Init: function(){
    Frm.CalculateDateTime();
    setInterval(Frm.CalculateDateTime, 1000);
    $('#formFile').change(Frm.FileChange);
    $('#btnRepeatVibration').click(Frm.GenerateVibrations);
  }
};

$(document).ready(Frm.Init);
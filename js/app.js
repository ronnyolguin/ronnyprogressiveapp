var url = window.location.href;
var swLocation = '/ronnyprogressiveapp/sw.js';


    
    if ( navigator.serviceWorker ){

        if (url.includes('localhost') ){
            swLocation = './sw.js';
        }
        navigator.serviceWorker.register(swLocation);

    };



  var googleMapKey = 'AIzaSyAu2rb0mobiznVJnJd6bVb5Bn2WsuXP2QI';

var modal            = $('#modal');
var btnLocation      = $('#location-btn');
var modalMapa        = $('.modal-mapa');
var btnbattery          =$('#battery-btn');
var lat  = null;
var lng  = null; 


//Geolocalizacion 

//Crear mapa en el modal
       
  function mostrarMapaModal(lat, lng) { 
 
      $('.modal-mapa').remove();   
    
    var content = `
            <div class="modal-mapa">
                <iframe
                    width="100%"
                    height="250"
                    frameborder="0"
                    src="https://www.google.com/maps/embed/v1/view?key=${ googleMapKey }&center=${ lat },${ lng }&zoom=17" allowfullscreen>
                    </iframe>
            </div>
            ` ;

        modal.append( content );}  
        

        
        btnLocation.on('click', () => {

        console.log('Botón geolocalización');
        $.mdtoast('Cargando mapa...', {
        interaction: true,
        interactionTimeout: 2000,
        actionText: 'Ok!'
        });

               navigator.geolocation.getCurrentPosition( pos => {

            console.log( pos );
            mostrarMapaModal( pos.coords.latitude, pos.coords.longitude );

            lat = pos.coords.latitude;
            lng = pos.coords.longitude;

            });

            }); 

//Camara

const video = document.getElementById('video');
const button = document.getElementById('button');
const select = document.getElementById('select');
let currentStream;

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  let count = 1;
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

button.addEventListener('click', event => {
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
  } else {
    videoConstraints.deviceId = { exact: select.value };
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
});

navigator.mediaDevices.enumerateDevices().then(gotDevices);

//Bateria

window.onload = function () {
    function updateBatteryStatus(battery) {
      document.querySelector('#charging').textContent = battery.charging ? 'charging' : 'not charging';
      document.querySelector('#level').textContent = battery.level;
      document.querySelector('#dischargingTime').textContent = battery.dischargingTime / 60;
    }

    btnbattery.on('click', () => {

    navigator.getBattery().then(function(battery) {
      // Update the battery status initially when the promise resolves ...
      updateBatteryStatus(battery);

      // .. and for any subsequent updates.
      battery.onchargingchange = function () {
        updateBatteryStatus(battery);
      };

      battery.onlevelchange = function () {
        updateBatteryStatus(battery);
      };

      battery.ondischargingtimechange = function () {
        updateBatteryStatus(battery);
      };
    });
    });
  };
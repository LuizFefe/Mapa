var mymap = L.map('mapid', {
  center: [-27.517863 , -48.475285],
  zoom: 12,
  measureControl: true,
  fullscreenControl: true
});
/* mymap.createPane('labels'); 
mymap.getPane('labels').style.zIndex = 650;
mymap.getPane('labels').style.pointerEvents = 'none'; */
L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=pylflXXX61wEWE9uM897',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        crossOrigin: true,
/*         pane: 'labels' */
      }).addTo(mymap);
/*       L.tileLayer.provider('CartoDB.PositronOnlyLabels',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        crossOrigin: true,
        pane: 'labels' 
      }).addTo(mymap);  */ 
//Adiciona comandos de marcadores poligonos e outras features
/* mymap.pm.addControls({  
    position: 'topleft',  
    drawCircle: false,  
  }); */
  const L_multipoly = function () {
    var tmp; 
    $.ajax({
        'async': false,
        'type': "POST",
        'global': false,
        'dataType': 'json',
        'url': 'http://localhost:8080/geoserver/LimitF/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LimitF%3A4326shoriginal&maxFeatures=50&outputFormat=application%2Fjson',
        'success': function (data) {
            tmp = data;
        }
    });
    return tmp;
}();
 const L_pointer = function () {
  var tmp;
  $.ajax({
      'async': false,
      'type': "POST",
      'global': false,
      'dataType': 'json',
      'url': 'http://localhost:8080/geoserver/LimitF/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LimitF%3A4326pointer&maxFeatures=50&outputFormat=application%2Fjson',
      'success': function (data) {
          tmp = data;
      }
  });
  return tmp;
}();
const L_lote = function () {
  var tmp;
  $.ajax({
      'async': false,
      'type': "POST",
      'global': false,
      'dataType': 'json',
      'url': 'http://localhost:8080/geoserver/LimitF/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LimitF%3Aloteamento&outputFormat=application%2Fjson&SRSname=EPSG:4326',
      'success': function (data) {
          tmp = data;
      }
  });
  return tmp;
}();
const L_quadra = function () {
  var tmp;
  $.ajax({
      'async': false,
      'type': "POST",
      'global': false,
      'dataType': 'json',
      'url': 'http://localhost:8080/geoserver/Teste/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Teste%3Aquadralote&outputFormat=application%2Fjson&SRSname=EPSG:4326',
      'success': function (data) {
          tmp = data;
      }
  });
  return tmp;
}(); 
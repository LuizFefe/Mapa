var mymap = L.map('mapid', {
    center: [-27.517863 , -48.475285],
    zoom: 12,
    measureControl: true
  });
L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=xSgqXGh2wDPY98sOqRay',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        crossOrigin: true
      }).addTo(mymap);
$.ajax({
    type: "POST",
    url: 'http://localhost:8080/geoserver/LimitF/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LimitF%3A4326shoriginal&maxFeatures=50&outputFormat=application%2Fjson',
    dataType: 'json',
    success: function (response) {
        L.geoJson(response).addTo(mymap);
        geojsonLayer = response;//Define geojsonLayer como o geojson gerado pelo geoserver
    //Cria um style de como eu quero visualmente a camada
 /*  function style(feature) {
      return {
          fillColor: '#336699',
          weight: 2,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.7
      };
  }
  L.geoJson(geojsonLayer, {style: style}).addTo(mymap);
function highlightFeature(e) {
    var layer = e.target;//Varia para interação do mapa,e.target e basicamente o objeto que esta sendo apontado pelo mouse

    layer.setStyle({
        //fill: "",
        fillColor: '#02254B',//Cor que vai preencher o evento "apontado"
        fillOpacity: 0.7,//Opacidade do preenchimento evento
        weight: 5,//Grossura do contorno do evento
        color: '#000000'//Cor do contorno do evento
        //dashArray: '', Para fazer pontilhado no contorno do evento
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {//Caso nenhum dos browsers sejam esses o vai acontecer algo com o target
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
  }
   function resetHighlight(e) {
    geojson.resetStyle(e.target);//Reseta o stilo da layer para o setado anteriormente
    info.update();
  } 
  function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());//Da zoom no target event
  }
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,//Mouseouver da triger na função quando passa por cima de cada feature
        mouseout: resetHighlight,//Mouseout da trigger quando o mouse sai de cima de cada feature
        click: zoomToFeature,//Quando clica na feature da zoom
    });
    //layer.bindPopup('<h1>'+feature.properties.nm_dist_ad+'</h1><p>Habitantes: '+feature.properties.pop_2010_i+'</p>');// Opcao de popup pra cada feature do geojson
}

 geojson = L.geoJson(geojsonLayer, {
    style: style,//Adiciona o style criado a camada geojson
    onEachFeature: onEachFeature//Adiciona a cada feature da camada as função criada acima
}).addTo(mymap); 

  var info = L.control();// Variavel  base que controla as informações da camada interativa
info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // Cria uma div para mostras as infos
    this.update();
    return this._div;
};   

// Da update na camada interativa do geojson
info.update = function (props) {
    this._div.innerHTML = '<h4>Regioes Florianopolis</h4>' +  (props ?
        '<b>' + props.nm_dist_ad + '</b><br /Populacao: >' + props.pop_2010_i + ' habitantes'
        : 'Passe o mouse sobre um estado');
};
info.addTo(mymap);
/* //Adiciona comandos de marcadores poligonos e outras features
mymap.pm.addControls({  
    position: 'topleft',  
    drawCircle: false,  
  });  
  





        //mymap.fitBounds(geojsonLayer.getBounds());
        
    } */

  
}});
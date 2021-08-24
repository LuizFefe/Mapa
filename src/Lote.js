L.geoJson(L_quadra).addTo(mymap);
geojsonLayer =L_quadra;//Define geojsonLayer como o geojson gerado pelo geoserver
var searchLayer = L.geoJson(L_quadra).addTo(mymap)
//Cria um style de como eu quero visualmente a camada
/* function style(feature) {
return {
  fillColor: '#F7273D',
  fillOpacity: 0.1,
  weight: 2,
  opacity: 1,
  color: 'black',
  fillOpacity: 0.7
};
}
L.geoJson(geojsonLayer, {style: style}).addTo(mymap); */
function highlightFeature(e) {
var layer = e.target;//Varia para interação do mapa,e.target e basicamente o objeto que esta sendo apontado pelo mouse
layer.setStyle({
//fill: "",
fillColor: '#ffffff00',//Cor que vai preencher o evento "apontado"
fillOpacity: 1.0,//Opacidade do preenchimento evento
weight: 5,//Grossura do contorno do evento
color: '#000000'//Cor do contorno do evento
//dashArray: '', Para fazer pontilhado no contorno do evento
})};
/*  var searchControl = new L.Control.Search({
  layer: searchLayer,
  propertyName: 'n_inscri',
  initial: false,
  collapsed: false,
  moveToLocation: function(latlng, title, map) {
    map.fitBounds( latlng.layer.getBounds() );
    var zoom = 20
      map.setView(latlng, zoom); // access the zoom[]
      layer.bindPopup('</h1><p>N Inscricoes: '+feature.properties.n_inscri+'</p>');
  }
});
mymap.addControl( searchControl )  */
/* var searchCtrl = L.control.fuseSearch()
searchCtrl.addTo(mymap);
searchCtrl.indexFeatures(geojsonLayer, ['n_inscri']); */
/* if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {//Caso nenhum dos browsers sejam esses o vai acontecer algo com o target
layer.bringToFront();
}
info.update(layer.feature.properties);
} */
function resetHighlight(e) {
geojson.resetStyle(e.target);//Reseta o stilo da layer para o setado anteriormente
/* info.update(); */
} 
function zoomToFeature(e) {
  L.geoJson(L_lote, {
    filter: function(feature, layer) {
         /* console.log(feature.properties.cd_quadra)  */
        if(e.target.feature.properties.cd_quadra ==feature.properties.cd_quadra){
            return true
        }
    }

}).addTo(mymap);
}
function onEachFeature(feature, layer) {
layer.on({
mouseover: highlightFeature,//Mouseouver da triger na função quando passa por cima de cada feature
mouseout: resetHighlight,//Mouseout da trigger quando o mouse sai de cima de cada feature
click: zoomToFeature,//Quando clica na feature da zoom
});
feature.layer = layer;
layer.bindPopup('</h1><p>N Inscricoes: '+feature.properties.cd_quadra+'</p>');// Opcao de popup pra cada feature do geojson
}

geojson = L.geoJson(geojsonLayer, {
/* style: style,//Adiciona o style criado a camada geojson */
onEachFeature: onEachFeature//Adiciona a cada feature da camada as função criada acima
}).addTo(mymap); 

/* var info = L.control();// Variavel  base que controla as informações da camada interativa
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
info.addTo(mymap); */
//mymap.fitBounds(geojsonLayer.getBounds());
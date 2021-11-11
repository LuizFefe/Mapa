
    var searchLayer = L.geoJson(L_pointer).addTo(mymap)
      geojsonLayerr = L_pointer;//Define geojsonLayer como o geojson gerado pelo geoserver
 function onEachFeature(feature, layer){
  layer.bindPopup("<p>Artista:" + feature.properties.artista + "</p> Ano:" + feature.properties.ano+"</p>ID:"+feature.properties.arte_publi);
 }
 var smallIcon = new L.Icon({
  iconSize: [27, 27],
  iconAnchor: [13, 27],
  popupAnchor:  [1, -24],
  iconUrl: 'images/rt-icon.png',
});
L.geoJson(geojsonLayerr, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {icon: smallIcon});
},
  onEachFeature: onEachFeature//Adiciona a cada feature da camada as função criada acima
}).addTo(mymap)
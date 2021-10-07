var mymapjuncao = L.map('mapidjuncao', {
  center: [-27.59, -48.54],
  zoom: 12
/*   measureControl: true,
  fullscreenControl: true */
});

Mapa = L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=pylflXXX61wEWE9uM897',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        crossOrigin: true,
/*         pane: 'labels' */
      }).addTo(mymapjuncao);
var mymap = L.map('mapid', {
center: [-27.59, -48.54],
zoom: 12,
/*   measureControl: true,
fullscreenControl: true */
});
Mapa = L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=pylflXXX61wEWE9uM897',{
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      crossOrigin: true,
/*         pane: 'labels' */
    }).addTo(mymap);
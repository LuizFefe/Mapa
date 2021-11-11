var LoteJunc = JSON.parse(localStorage.getItem("arraylote"));
var lotesused = localStorage.getItem("LotesUsados");
document.getElementById("dadoscname").innerHTML = lotesused;
var area = turf.area(LoteJunc);
var centroid = turf.centroid(LoteJunc);
var group = new L.featureGroup().addTo(mymapjuncao);
/* L.geoJSON(LoteJunc).addTo(drawnItems) */
/* mymapjuncao.addLayer(drawnItems); */
mymapjuncao.pm.enableGlobalEditMode();
console.log(LoteJunc.geometry.coordinates[0][0][0]);
mymapjuncao.setView(
  new L.LatLng(
    LoteJunc.geometry.coordinates[0][0][1],
    LoteJunc.geometry.coordinates[0][0][0],
    40
  )
);
L.geoJSON(LoteJunc).addTo(mymapjuncao);
console.log(centroid);
L.geoJSON(centroid).addTo(mymapjuncao);
document.getElementById("dadosAname").innerHTML = area + "M²";
convertedPoligon = JSON.stringify(LoteJunc);
formatPoligon = convertedPoligon.replace(
  '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":',
  ""
);
finalformatPoligon = formatPoligon.replace("}]}", "");
localStorage.setItem("ffPoligon", JSON.stringify(unionbase));
function Dadosjunc() {
  var sbairro = document.getElementById("sbairro").value;
  console.log(sbairro);
  var slote = document.getElementById("slote").value;
  console.log(slote);
  var cadastro = document.getElementById("cadastro").value;
  console.log(cadastro);
  window.close();
}
/*   layerControljuncao.addOverlay(cntrljuncaoo,'Juncao')
  layerControl.addOverlay(cntrljuncaoo,'Juncao') */

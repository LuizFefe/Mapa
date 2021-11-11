
const L_points = function () {
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
window.onload = () => {

    // Clear localStorage
    if (localStorage.getItem('arraylote') === 'true') {
      localStorage.removeItem('arraylote');}
    if (localStorage.getItem('LotesUsados') === 'true') {
      localStorage.removeItem('LotesUsados');}
  };
  Points = L.geoJson(L_points).addTo(mymapjuncao)
  function unionlote(e){
    var type = e.target.feature.properties
    console.log(type)
    var layer = e.target;
    layer.setStyle({
      //fill: "",
        fillColor: '#91edae',//Cor que vai preencher o evento "apontado"
        fillOpacity: 1.0,//Opacidade do preenchimento evento
        weight: 1,//Grossura do contorno do evento
        color: '#000000'//Cor do contorno do evento
      //dashArray: '', Para fazer pontilhado no contorno do evento
    })
    SomaTeste = SomaTeste + e.target.feature.properties.cd_distrit
    LotesIntegrados.push(e.target.feature.properties.cd_lote)
    var polygonn = turf.multiPolygon([
      e.target.feature.geometry.coordinates[0]]//TRANSFORMA O POLIGONO SELECIONADO EM UM POLIGONO TURF
      , {LotesIntegrados,SomaTeste});
    arrayjuncoess.push(polygonn)
    if(variicntrl == 0){
      baselote = polygonn
    }
    variicntrl++
    console.log(arrayjuncoess)
    document.getElementById("sslote").innerHTML = e.target.feature.properties.cd_lote;// MOSTRA O LOTE SELECIONADO
    document.getElementById("ssbairro").innerHTML = e.target.feature.properties.cd_bairro;// MOSTRA O LOTE SELECIONADO
    document.getElementById("ccadastro").innerHTML = e.target.feature.properties.dt_cadastr;// MOSTRA O LOTE SELECIONADO
    document.getElementById("geom").innerHTML = LotesIntegrados;
  }
/*   var optionss = {
    icon: 'fa-home',
    iconShape: 'marker'
  } */
  var iconchange = new L.Icon({
        iconUrl: "images/home.png",
        iconSize: [30,35],
        shadowAnchor: [8, 20],
        shadowSize: [25, 18],
        iconSize: [20, 25],
        iconAnchor: [8, 30] // horizontal puis vertical
});
/* L.geoJson(L_points).seticon(iconchange) */
  function select(e)  {
    mymapjuncao.setView(e.latlng, 16);
    /* newMarker = L.marker(e.latlng, {
        icon: iconchange
    }).addTo(mymapjuncao) */

    e.target.setIcon(iconchange).addTo(mymapjuncao)
    /* var layer = e.target;
    layer.setIcon(iconchange ); */
    document.getElementById("dadoslname").innerHTML = e.target.feature.properties.artista;// MOSTRA O LOTE SELECIONADO
    document.getElementById("dadosfname").innerHTML = e.target.feature.properties.edificio;// MOSTRA O LOTE SELECIONADO
    document.getElementById("dadoscname").innerHTML = e.target.feature.properties.logradouro;
  }
  
  function onEachFeatureQ(feature, layer) {
    layer.on({
      click: select,
    });
  /* layer.bindPopup('</h1><p>N Inscricoes: '+feature.properties.cd_quadra+'</p>'); */// Opcao de popup pra cada feature do geojson
  }
  geojson = L.geoJson(L_points, {
  onEachFeature: onEachFeatureQ//Adiciona a cada feature da camada as função criada acima
  }).addTo(mymapjuncao);
 
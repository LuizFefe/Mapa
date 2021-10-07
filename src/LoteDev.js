window.onload = () => {

  // Clear localStorage
  if (localStorage.getItem('arraylote') === 'true') {
    localStorage.removeItem('arraylote');}
  if (localStorage.getItem('LotesUsados') === 'true') {
    localStorage.removeItem('LotesUsados');}
};
Quadra = L.geoJson(L_quadra)
var baselote;
var base = turf.multiPolygon([], {});//LAYER BASE PARA O TURF.UNION
var basee = turf.multiPolygon([], {});
var cntrljuncao = new L.LayerGroup();//CONTROLE DAS JUNCOES
var cntrljuncaoo = new L.LayerGroup();
varicntrl = 0;//CONTROLE DO INDEX DAS JUNCOES
variicntrl = 0;
var arrayjuncoes = [];//CONJUNTO DE POLYGON A SER ADICIONADO
var arrayjuncoess = [];
var codlote = [];//ARRAY DE PROPERTIES QUE VAO SOFRER A JUNCAO
var basequadra = []
var basequadraa = []
var LotesIntegrados = []
var SomaTeste = 0
var unionbase;
var Mapas = {
  "Mapa":Mapa,//CONTROLE DO MAPA
};

var overlayMaps = {
  "Quadras":Quadra,//CONTROLE DAS QUADRAS
};
var overlayMapss = {
  "Quadras":cntrljuncaoo,//CONTROLE DAS QUADRAS
};
layerControljuncao = L.control.layers(Mapas,overlayMaps).addTo(mymapjuncao);
layerControl = L.control.layers(Mapas,overlayMaps).addTo(mymap);//ADICIONA O CONTROLE DAS QUADRAS AO MAPA

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

function resetHighlight(e) {
  geojson.resetStyle(e.target);//Reseta o stilo da layer para o setado anteriormente
  /* info.update(); */
}

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

function select(e)  {
  basequadra[varicntrl] = L.geoJson(L_lote,{
  filter: function(feature, layer) { 
    if(e.target.feature.properties.cd_quadra ==feature.properties.cd_quadra){//FILTRA OS LOTES ESPECIFICOS DA QUADRA SELECIONADA
        return true
    }
  },
  onEachFeature: function(feature, layer){
    layer.on({
      /* mouseover: highlightFeature, *///Mouseouver da triger na função quando passa por cima de cada feature
      /* mouseout: resetHighlight, *///Mouseout da trigger quando o mouse sai de cima de cada feature
      click:unionlote
    })}}).addTo(mymap) 
  var type = e.target.feature.properties
  var polygon = turf.multiPolygon([
    e.target.feature.geometry.coordinates[0]]//TRANSFORMA O POLIGONO SELECIONADO EM UM POLIGONO TURF
    , {type});
  console.log(e.target.feature.geometry.coordinates[0])
  console.log(polygon)
  layerControl.addOverlay(basequadra[varicntrl],'Lote ' + e.target.feature.properties.cd_quadra )//ADICIONA OS LOTES DA QUADRA AO CONTROLE DO MAPA
  arrayjuncoes.push(polygon)// ADICIONA POLYGON AO ARRAY PRA JUNCAO
  varicntrl++
  document.getElementById("geom").innerHTML = codlote;
}

function onEachFeatureQ(feature, layer) {
  layer.on({
    mouseover: highlightFeature,//Mouseouver da triger na função quando passa por cima de cada feature
    mouseout: resetHighlight,//Mouseout da trigger quando o mouse sai de cima de cada feature
    click: select,
  });
/* layer.bindPopup('</h1><p>N Inscricoes: '+feature.properties.cd_quadra+'</p>'); */// Opcao de popup pra cada feature do geojson
}
geojson = L.geoJson(L_quadra, {
/* style: style,//Adiciona o style criado a camada geojson */
onEachFeature: onEachFeatureQ//Adiciona a cada feature da camada as função criada acima
}).addTo(Quadra);
//mymap.fitBounds(geojsonLayer.getBounds());
 function juncaoo() {
  console.log(variicntrl)
  unionbase = turf.union(arrayjuncoess[0],baselote)
  for (var i = 1; i < variicntrl; i++) {
    var union = turf.union(arrayjuncoess[i],unionbase);
    unionbase = union
  }
  console.log(unionbase)
  L.geoJSON(unionbase).addTo(cntrljuncaoo)
  layerControljuncao.addOverlay(cntrljuncaoo,'Juncao')
  layerControl.addOverlay(cntrljuncaoo,'Juncao')
  localStorage.setItem("LotesUsados", JSON.stringify(LotesIntegrados));
  localStorage.setItem("arraylote", JSON.stringify(unionbase));
    /*   L.geoJson(union,{
    onEachFeature: function(feature, layer){
      layer.on({
        mouseover: highlightFeature,//Mouseouver da triger na função quando passa por cima de cada feature
        mouseout: resetHighlight,//Mouseout da trigger quando o mouse sai de cima de cada feature
        click:rturn
      })}}).addTo(mymap) */
};
function juncao() {
  for (var i = 0; i < variicntrl; i++) {
    var union = turf.union(arrayjuncoes[i],base);
    console.log(union)
    L.geoJSON(union).addTo(cntrljuncao)
  }
  console
  layerControl.addOverlay(cntrljuncao,'Juncao Quadras')
  /*   L.geoJson(union,{
    onEachFeature: function(feature, layer){
      layer.on({
        mouseover: highlightFeature,//Mouseouver da triger na função quando passa por cima de cada feature
        mouseout: resetHighlight,//Mouseout da trigger quando o mouse sai de cima de cada feature
        click:rturn
      })}}).addTo(mymap) */
  };
  function popitup() {
    window.open( 'Juncao.html','name','height=700,width=600');
  }
function removejuncao() {
  cntrljuncaoo.clearLayers()
  layerControl.removeLayer(cntrljuncaoo)
  cntrljuncao.clearLayers()
  layerControl.removeLayer(cntrljuncao)
  for (var i = 0; i < varicntrl; i++) {
    mymap.removeLayer(basequadra[i])
    layerControl.removeLayer(basequadra[i])
  }
  basequadra.splice(0, arrayjuncoes.length)
  arrayjuncoes.splice(0, arrayjuncoes.length)
  arrayjuncoess.splice(0, arrayjuncoess.length)
  codlote.splice(0, codlote.length)
  LotesIntegrados.splice(0, LotesIntegrados.length)
  varicntrl = 0;
  variicntrl = 0;
  };
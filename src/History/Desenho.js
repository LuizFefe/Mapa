var cordenadasIniciais = [-27.59, -48.54]; // Cordenadas de Florianópolis
var zoomInicial = 12; 
var map;

var map = L.map('map').setView(cordenadasIniciais, zoomInicial);

//variavel que recebe a camada de base do mapa, o basemap é puxado do open street map
var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map)


// essa váriavel e metodo adicionam uma camada para efetuar o desenho no mapa
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);


// Inicializa o FeatureGroup para armazenar os desenhos
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);


var featureGroup = L.featureGroup().addTo(map);


// Inicializa a funçõa draw que exibe a ferramenta de desenho no mapa
var drawControl = new L.Control.Draw({
  draw: { //as opções "setadas" como "false" desativam as opções na barra de ferramenta do mapa
    polyline: false,
    circle: false, 
    rectangle: false,
    marker: false,
    circlemarker: false,
  },
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);



//esse metodo serve para salvar os pontos do desenho 
map.on(L.Draw.Event.CREATED, function (e) { 
  var type = e.layerType
  var layer = e.layer;


  drawnItems.addLayer(layer);
});

//esse metodo serve para salvar  desenho
map.on('draw:created', function(e) {
  
  featureGroup.addLayer(e.layer);
});



//essa função armazena o geojson, com as informações do poligono desenhado, como uma string formatada e insere essa string como um campo do formulario
function salvarPoligono(){
//variável que recebe as cordenadas do poligono
  var poligono = featureGroup.toGeoJSON(); 

//variável que recebe o geojson convertido em string
  var poligonoConvertido = JSON.stringify(poligono); 

//essa variável formata o geojson, para que seja convertida em geoemtra quando for inserida no banco, usando a função ".replace"
  var poligonoString = poligonoConvertido.replace('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":',''); 

//uma segunda formatação
  poligonoString = poligonoString.replace('}]}',''); 

//isso aqui printa o poligonoString no console
  console.log(poligonoString);

//insere o poligono pronto para conversao no campo "geometria" do formulario
  document.getElementById("geometria").value = poligonoString; 
}


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
        'url': 'http://localhost:8080/geoserver/Teste/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Teste%3Aquadralote&maxFeatures=300&outputFormat=application%2Fjson&SRSname=EPSG:4326',
        'success': function (data) {
            tmp = data;
        }
    });
    return tmp;
  }(); 
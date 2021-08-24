var eeeee = window.prompt();
L.geoJson(L_quadra, {
    filter: function(feature, layer) {
         /* console.log(feature.properties.cd_quadra)  */
        if(feature.properties.cd_quadra == eeeee){
            return true
        }
    }

}).addTo(mymap);

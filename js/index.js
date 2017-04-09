var map = L.map('map', {
  center: [39.989654, -75.155909],
  zoom: 11
});
var toner = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var uriStores = 'https://raw.githubusercontent.com/aronxoxo/MyData/master/healthy_corner_stores_w_tractid.geojson',
    uriTracts = 'https://raw.githubusercontent.com/aronxoxo/MyData/master/philly_census_tracts_w_kd.geojson';

var dataStores,
    dataTracts;

var layerTracts,
    layerStores;

var tractInfo = L.control(),
    legend = L.control({position: 'bottomright'});

var getFillColor = function(kd){
  return kd > 38.31 ? '#d62e26' :
         kd > 15.99 ? '#f55c54' :
         kd > 2.65  ? '#f2cc69' :
         kd > 0     ? '#a1ba8c' :
                      '#3e6570';
};

var style = function(feature){
  return {
    fillColor: getFillColor(feature.properties.store_kd),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  }
};

var highlightFeature = function(e){
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: 'white',
    fillOpacity: 1
  });

  tractInfo.update(layer.feature.properties);
}

var resetHighlight = function(e){
  layerTracts.resetStyle(e.target);
  tractInfo.update();
}

var onEachFeature = function(feature, layer){
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
};

var circleMarkerOptions = {
  radius: 5,
  fillColor: "#26d62e",
  color: "white",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7
};

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 2.65, 15.99, 38.31],
      labels = [];
  div.innerHTML += '<h4>Service Score</h4>'
                 + '<i style="background:#3e6570"></i> 0<br>'

  _([0, 2.65, 15.99, 38.31]).each(function(num, i){
    div.innerHTML += '<i style="background:'
                   + getFillColor(grades[i] + 1)
                   + '"></i> '
                   + grades[i]
                   + (grades[i + 1] ? '&#x20;&ndash;&#x20;' + grades[i + 1] + '<br>' : '+'+ '<br>');
  })

  // for (var i = 0; i < grades.length; i++) {
  //   div.innerHTML += '<i style="background:'
  //                  + getFillColor(grades[i] + 1)
  //                  + '"></i> '
  //                  + grades[i]
  //                  + (grades[i + 1] ? '&#x20;&ndash;&#x20;' + grades[i + 1] + '<br>' : '+'+ '<br>');
  // }
  return div;
};

legend.addTo(map);

tractInfo.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'tractInfo');
  this.update();
  return this._div;
};

tractInfo.update = function (props) {
  this._div.innerHTML = '<h4>Population Density</h4>'
                      +  (props ? '<b>' + props['NAMELSAD10'] + '</b><br />' + props['popden'].toFixed(2) + '  people / acre':
                                  'Hover over a census tract');
};

tractInfo.addTo(map);

$(function(){
  $.ajax(uriTracts).done(function(data){
    dataTracts = JSON.parse(data);
    layerTracts = L.geoJSON(dataTracts, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);

    $.ajax(uriStores).done(function(data){
      dataStores = JSON.parse(data);
      layerStores = L.geoJSON(dataStores,{
        pointToLayer: function (feature, latlng) {
          var link = "https://www.google.com/maps/dir/Current+Location/" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0];
          var popup = "<b>"+feature.properties.STORE_NAME+"</b><br><a href=" + link +" target='_blank'><i>Get Directions</i></a>";
          return L.circleMarker(latlng, circleMarkerOptions).bindPopup(popup);
        }
      }).addTo(map);
    })
  })


})

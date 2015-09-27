var map = L.map('map').setView([50, 10], 4);
var lyr;
/*
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
*/
$.getJSON('../data/world-110m-noattr.geojson', function(data){
	lyr = L.geoJson(data, {
		style: function (feature) {
			var r = 100+Math.floor(Math.random()*155),
				g = 100+Math.floor(Math.random()*155),
				b = 100+Math.floor(Math.random()*155);
			var col = 'rgb('+r+','+g+','+b+')';
        	return {
        		color: '#000',
        		fillColor: col,
        		opacity: 1,
				fillOpacity: 1,
				weight: 0.5
        	};
    	},
    	onEachFeature: function (feature, layer) {
    		var dimx = Math.log2(Math.abs(layer.getBounds().getNorthEast().lat-layer.getBounds().getSouthWest().lat))*0.2;
    		var dimy = Math.log2(Math.abs(layer.getBounds().getNorthEast().lng-layer.getBounds().getSouthWest().lng))*0.2;

			new L.marker(layer.getBounds().getCenter(), {
				icon: new L.Googly.icon({
					iconSize: [100*dimx, 48*dimy],
					iconAnchor:  [50*dimx, 24*dimy],
					popupAnchor: [0, -24*dimy],
					className: 'googly'
				})
			}).addTo(map);
		}
    }).addTo(map);
});

map.on('zoomend', function() {
    var currentZoom = map.getZoom(); 
    if (currentZoom > 15) { 
        map.removeLayer(icons);
        map.addLayer(icons2);
    }
    console.log(lyr);
})
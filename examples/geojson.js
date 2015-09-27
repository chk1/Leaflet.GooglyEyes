var map = L.map('map').setView([50, 10], 4);
/*
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
*/
$.getJSON('../data/world-110m-noattr.geojson', function(data){
	L.geoJson(data, {
		style: function (feature) {
			var col = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
        	return {
        		color: col,
        		fillColor: col,
        		opacity: 1,
				fillOpacity: 1
        	};
    	},
    	onEachFeature: function (feature, layer) {
    		var dimx = Math.log(Math.abs(layer.getBounds().getNorthEast().lat-layer.getBounds().getSouthWest().lat))*0.3;
    		var dimy = Math.log(Math.abs(layer.getBounds().getNorthEast().lng-layer.getBounds().getSouthWest().lng))*0.3;

			new L.marker(layer.getBounds().getCenter(), {
				icon: new L.Googly.icon({
					iconSize: [100*dimx, 48*dimy],
					iconAnchor:  [50*dimx, 24*dimy],
					popupAnchor: [0, -24],
					className: 'googly'
				})
			}).addTo(map);
		}
    }).addTo(map);
});

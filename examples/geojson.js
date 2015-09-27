var map = L.map('map').setView([50, 10], 4);
var lyr;
var markers=[];

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
    		var zoom = 0.1+map.getZoom()*0.2;
    		var dimx = Math.abs(Math.log2(layer.getBounds().getNorthEast().lat-layer.getBounds().getSouthWest().lat))*0.2;
    		var dimy = Math.abs(Math.log2(layer.getBounds().getNorthEast().lng-layer.getBounds().getSouthWest().lng))*0.2;

			var m = new L.marker(layer.getBounds().getCenter(), {
				icon: new L.Googly.icon({
					iconSize: [100*dimx*zoom, 48*dimy*zoom],
					iconAnchor:  [50*dimx*zoom, 24*dimy*zoom],
					popupAnchor: [0, -24*dimy*zoom]
				})
			}).addTo(map);
			markers.push(m);
			map.on('zoomend', function() {
				zoom = 0.1+map.getZoom()*0.2;
				m.setIcon(new L.Googly.icon({
					iconSize: [100*dimx*zoom, 48*dimy*zoom],
					iconAnchor:  [50*dimx*zoom, 24*dimy*zoom],
					popupAnchor: [0, -24*dimy*zoom]
				}));
			});
		}
    }).addTo(map);
});
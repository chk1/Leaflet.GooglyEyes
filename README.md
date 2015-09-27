# Leaflet.GooglyEyes

Inspired by "[If countries had googly eyes](https://www.reddit.com/r/mapporncirclejerk/comments/3l7j8z/if_countries_had_googly_eyes/)".

## Usage

Include the `Leaflet.GooglyEyes.js` in your HTML:
```html
<script src="Leaflet.GooglyEyes.js"></script>
```

Add a marker with `L.Googly.icon`, using the default 50x24 icon:
```javascript
new L.marker([50.97, 11.04], {icon: new L.Googly.icon()}).addTo(map)
```

Or with custom size options:
```javascript
new L.marker([51.97, 11.04], {
	icon: new L.Googly.icon({
		iconSize: [100, 48],
		iconAnchor:  [50, 24],
		popupAnchor: [0, -24],
		className: 'googly'
	})
}).addTo(map);
```

## Demo

* [Simple example](http://chk1.github.io/Leaflet.GooglyEyes/examples/simple.html)
* [GeoJSON example](http://chk1.github.io/Leaflet.GooglyEyes/examples/geojson.html) *Attention: Might slow down your computer*

## License

* MIT
* Basic file structure and functions inspired by [Leaflet.awesome-markers](https://github.com/lvoogdt/Leaflet.awesome-markers/blob/2.0/develop/dist/leaflet.awesome-markers.js), MIT License
* Country boundaries converted and modified from [Natural Earth](http://www.naturalearthdata.com/downloads/110m-cultural-vectors/), Public Domain
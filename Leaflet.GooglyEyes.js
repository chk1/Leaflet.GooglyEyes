(function (window, document, undefined) {
	"use strict";

	L.Googly = {};

	L.Googly.Icon = L.Icon.extend({
		theDiv: {},

		options: {
			iconSize: [120, 55],
			iconAnchor:   [60, 27],
			popupAnchor: [1, -32],
			className: 'googly',
			prefix: 'googly-eyes',
			icon: 'default'
		},

		initialize: function (options) {
			options = L.Util.setOptions(this, options);
		},

		createIcon: function () {
			var options = this.options;

			var emb = this._createInner();
			emb.addEventListener('load', function (evt) {
				var svgDoc = evt.target.getSVGDocument();

				var lefteye = svgDoc.getElementsByTagName("circle")[0];
				var righteye = svgDoc.getElementsByTagName("circle")[1];

				var lx = lefteye.getAttribute('cx');
				var ly = lefteye.getAttribute('cy');
				var rx = righteye.getAttribute('cx');
				var ry = righteye.getAttribute('cy');

				document.addEventListener('mousemove', function(evt){
					// TODO
					// do this properly :^)
					var newlx = lx*1.0+(evt.clientX)*0.1;
					var newly = ly*1.0+(evt.clientY)*0.1;
					var newrx = rx*1.0+(evt.clientX)*0.1;
					var newry = ry*1.0+(evt.clientY)*0.1;

					lefteye.setAttribute('cx',newlx);
					lefteye.setAttribute('cy',newly);
					righteye.setAttribute('cx',newrx);
					righteye.setAttribute('cy',newry);
				});
			});

			return emb;
		},

		_createInner: function() {
			var options = this.options;
			var embed = document.createElement('embed');

			embed.setAttribute('width',options.iconSize[0]);
			embed.setAttribute('height',options.iconSize[1]);
			embed.setAttribute('type','image/svg+xml');
			embed.setAttribute('src','googly.svg');

			return embed;
		},

		_setIconStyles: function (img, name) {
			var options = this.options,
				size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']),
				anchor;

			if (!anchor && size) {
				anchor = size.divideBy(2, true);
			}

			if (anchor) {
				img.style.marginLeft = (-anchor.x) + 'px';
				img.style.marginTop  = (-anchor.y) + 'px';
			}

			if (size) {
				img.style.width  = size.x + 'px';
				img.style.height = size.y + 'px';
			}
		}

	});

	L.Googly.icon = function (options) {
		return new L.Googly.Icon(options);
	};

}(this, document));

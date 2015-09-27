(function (window, document, undefined) {
	"use strict";

	L.Googly = {};

	L.Googly.Icon = L.Icon.extend({
		options: {
			iconSize: [50, 24],
			iconAnchor:  [25, 12],
			popupAnchor: [0, -12],
			className: 'googly'
		},

		initialize: function (options) {
			options = L.Util.setOptions(this, options);
		},

		createIcon: function () {
			var options = this.options;
			var container = this._createInner();
			this._animate(container.firstElementChild);
			this._setIconStyles(container);
			return container;
		},

		_createInner: function() {
			var options = this.options;
			var svgstr='<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 500 230" height="'+options.iconSize[1]+'" width="'+options.iconSize[0]+'"><style>.s0{color-interpolation-filters:linearRGB;color-interpolation:sRGB;color-rendering:auto;fill:#fff;image-rendering:auto;isolation:auto;mix-blend-mode:normal;shape-rendering:auto;solid-color:#000000;solid-opacity:1;stroke-linejoin:round;stroke-width:24.5;stroke:#000;text-rendering:auto;}.s1{color-interpolation-filters:linearRGB;color-interpolation:sRGB;color-rendering:auto;fill:#000;image-rendering:auto;isolation:auto;mix-blend-mode:normal;shape-rendering:auto;solid-color:#000000;solid-opacity:1;text-rendering:auto;}</style><ellipse cx="115" cy="115" rx="102.8" ry="102.8" class="s0"/><circle cx="115" cy="115" r="50" class="s1"/><ellipse cx="385" cy="115" rx="102.8" ry="102.8" class="s0"/><circle cx="385" cy="115" r="50" class="s1"/></svg>';

			var embedContainer = document.createElement('div');
			embedContainer.setAttribute('class', options.className);
			embedContainer.style.position = 'absolute';
			embedContainer.style.width = options.iconSize[0]+'px';
			embedContainer.style.height = options.iconSize[1]+'px';
			embedContainer.style.backgroundSize = '100px 100px';

			embedContainer.innerHTML = svgstr;

			var embedOverlay = document.createElement('div');
			embedOverlay.style.width = options.iconSize[0]+'px';
			embedOverlay.style.height = options.iconSize[1]+'px';
			embedOverlay.style.position = 'absolute';
			embedOverlay.style.top = '0';
			embedOverlay.style.left = '0';
			embedOverlay.style.backgroundColor = 'none';
			embedContainer.appendChild(embedOverlay);

			return embedContainer;
		},

		_setIconStyles: function (container) {
			var size = L.point(this.options.iconSize),
				anchor;
			if (!anchor && size) {
				anchor = size.divideBy(2, true);
			}
			if (anchor) {
				container.style.marginLeft = (-anchor.x) + 'px';
				container.style.marginTop  = (-anchor.y) + 'px';
			}
			if (size) {
				container.style.width  = size.x + 'px';
				container.style.height = size.y + 'px';
			}
		},

		_animate: function(svgElement) {
			var svgDoc = svgElement;
			var lefteye = svgDoc.getElementsByTagName("circle")[0];
			var righteye = svgDoc.getElementsByTagName("circle")[1];

			// eye coordinates within the svg
			var lx = lefteye.getAttribute('cx');
			var ly = lefteye.getAttribute('cy');
			var rx = righteye.getAttribute('cx');
			var ry = righteye.getAttribute('cy');

			// distance from the center the eyes when moving
			var movingDistance = 50;
			document.addEventListener('mousemove', function(mouseEvt){
				var boundaries = svgDoc.getBoundingClientRect(); // svg boundaries

				// eyes <embed> bounding box to mouse xy deltas
				// eyes are approx. 23% from left/right corners on half height
				var deltaToMouseLx = mouseEvt.clientX-(boundaries.left+boundaries.width*0.23);
				var deltaToMouseLy = mouseEvt.clientY-(boundaries.top+boundaries.height/2);
				var deltaToMouseRx = mouseEvt.clientX-(boundaries.left+boundaries.width*0.77);
				var deltaToMouseRy = mouseEvt.clientY-(boundaries.top+boundaries.height/2);

				// angle from dom elem corner to mouse
				var angleToMouseL = Math.atan2(deltaToMouseLy, deltaToMouseLx);
				var angleToMouseR = Math.atan2(deltaToMouseRy, deltaToMouseRx);
				// calculate the new eye position based on the angle and distance from center position
				var newlx = lx*1.0 + movingDistance*Math.cos(angleToMouseL);
				var newly = ly*1.0 + movingDistance*Math.sin(angleToMouseL);
				var newrx = rx*1.0 + movingDistance*Math.cos(angleToMouseR);
				var newry = ry*1.0 + movingDistance*Math.sin(angleToMouseR);

				lefteye.setAttribute('cx',newlx);
				lefteye.setAttribute('cy',newly);
				righteye.setAttribute('cx',newrx);
				righteye.setAttribute('cy',newry);
			});
		}

	});

	L.Googly.icon = function (options) {
		return new L.Googly.Icon(options);
	};

}(this, document));

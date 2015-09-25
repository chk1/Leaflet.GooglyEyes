var map = L.map('map').setView([50, 10], 6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var m = new L.marker([50,10], {icon: new L.Googly.icon()});
var m1 = new L.marker([48,10], {icon: new L.Googly.icon()});
var m2 = new L.marker([53,12], {icon: new L.Googly.icon()});
m.addTo(map);
m1.addTo(map);
m2.addTo(map);
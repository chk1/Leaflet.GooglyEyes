var map = L.map('map').setView([50, 10], 6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var m1 = new L.marker([53.52, 9.93], {icon: new L.Googly.icon()}).addTo(map);
var m2 = new L.marker([52.38, 9.77], {icon: new L.Googly.icon()}).addTo(map);
var m3 = new L.marker([52.50, 13.38], {icon: new L.Googly.icon()}).addTo(map);
var m4 = new L.marker([50.97, 11.04], {icon: new L.Googly.icon()}).addTo(map);
var m5 = new L.marker([51.97, 11.04], {icon: new L.Googly.icon({iconSize: [100, 48]})}).addTo(map);


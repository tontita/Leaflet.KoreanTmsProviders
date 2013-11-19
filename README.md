Leaflet.KoreanTmsProviders
=================
An extension to [Leaflet](http://leafletjs.com/) that contains configurations for various Korean tile providers.

# Usage
```Javascript
//add Daum Street Layer to map.
new L.Proj.TileLayer.TMS.Provider('DaumMap.Street').addTo(map);
```
```Javascript
//add Daum Street Layer to map.
L.Proj.TileLayer.TMS.provider('DaumMap.Street').addTo(map);
```
This library provides a prefilled layer control, so you can just provide an array of strings:
```JavaScript
var baseLayers = {
	'Daum Street Map': L.Proj.TileLayer.TMS.provider('DaumMap.Street').addTo(map),
	'Daum Satellite Map' : L.Proj.TileLayer.TMS.provider('DaumMap.Satellite')
};

var overlayLayers = {
	'Daum Hybrid Map' : L.Proj.TileLayer.TMS.provider('DaumMap.Hybrid'),
	'Daum Physical Map' : L.Proj.TileLayer.TMS.provider('DaumMap.Physical')
};		

var layerControl = L.control.layers.provided(baseLayers, overlays).addTo(map);

//you can still add your own afterwards with
layerControl.addBaseLayer(layer, name);
```
```JavaScript
var baseLayers = {
	'Naver Street Map': L.Proj.TileLayer.TMS.provider('NaverMap.Street').addTo(map),
	'Naver Satellite Map': L.Proj.TileLayer.TMS.provider('NaverMap.Satellite'),
	'Naver Hybrid Map': L.Proj.TileLayer.TMS.provider('NaverMap.Hybrid'),
	'Naver Cadastral Map': L.Proj.TileLayer.TMS.provider('NaverMap.Cadastral', null, {opacity : 1.0})
};

var overlayLayers = {
	'Naver Cadastral Map': L.Proj.TileLayer.TMS.provider('NaverMap.Cadastral')
};

L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(map);
```

An example
```Javascript
var map = L.map('map', {
	crs: L.Proj.CRS.TMS.Daum, 
	continuousWorld: true,
	worldCopyJump: false,
	zoomControl: true
});

var baseLayers = {
	'Daum Street Map': L.Proj.TileLayer.TMS.provider('DaumMap.Street').addTo(map),
	'Daum Satellite Map' : L.Proj.TileLayer.TMS.provider('DaumMap.Satellite')
};

var overlayLayers = {
	'Daum Hybrid Map' : L.Proj.TileLayer.TMS.provider('DaumMap.Hybrid'),
	'Daum Physical Map' : L.Proj.TileLayer.TMS.provider('DaumMap.Physical')
};

L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(map);
map.setView([38, 127], 0);
```

Providers
===

Current options suitable for basemaps are:
* DaumMap
    * DaumMap.Street
    * DaumMap.Satellite
* NaverMap
    * NaverMap.Street
    * NaverMap.Satellite
    * NaverMap.Hybrid
    * NaverMap.Cadastral
Current options suitable for overlays are:
* DaumMap
    * DaumMap.Physical
    * DaumMap.Hybrid
* NaverMap
    * NaverMap.Cadastral


This work was inspired from <http://plugins.qgis.org/plugins/tmsforkorea>, <https://github.com/leaflet-extras/leaflet-providers>, and <https://github.com/kartena/Proj4Leaflet>.


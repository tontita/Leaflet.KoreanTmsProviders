Leaflet.KoreanTmsProviders
=================
An extension to [Leaflet](http://leafletjs.com/) that contains configurations for various Korean tile providers.

Usage
===

```Javascript
//add Naver Street Layer to map.
new L.Proj.TileLayer.TMS.Provider('NaverMap.Street').addTo(map);
```
```Javascript
//add Naver Street Layer to map.
L.Proj.TileLayer.TMS.provider('NaverMap.Street').addTo(map);
```
This library provides a prefilled layer control, so you can just provide an array of strings:
```JavaScript
var baseLayers = {
	'Naver Street Map': L.Proj.TileLayer.TMS.provider('NaverMap.Street').addTo(map),
	'Naver Satellite Map' : L.Proj.TileLayer.TMS.provider('NaverMap.Satellite')
};

var overlayLayers = {
	'Naver Hybrid Map' : L.Proj.TileLayer.TMS.provider('NaverMap.Hybrid'),
	'Naver Cadastral Map' : L.Proj.TileLayer.TMS.provider('NaverMap.Cadastral')
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

Example
===

```Javascript
var map = L.map('map', {
	crs: L.Proj.CRS.TMS.Naver, 
	continuousWorld: true,
	worldCopyJump: false,
	zoomControl: true
});

var baseLayers = {
	'Naver Street Map': L.Proj.TileLayer.TMS.provider('NaverMap.Street').addTo(map),
	'Naver Satellite Map' : L.Proj.TileLayer.TMS.provider('NaverMap.Satellite')
};

var overlayLayers = {
	'Naver Hybrid Map' : L.Proj.TileLayer.TMS.provider('NaverMap.Hybrid'),
	'Naver Cadastral Map' : L.Proj.TileLayer.TMS.provider('NaverMap.Cadastral')
};

L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(map);
map.setView([38, 127], 0);
```
There are more examples at the examples folder like below.
```
./examples/indexNaver.html
./examples/indexVWorld.html
```
NaverMap uses a local Coordinate Reference Systems (CRS), which is EPSG:5179. Therefore, it is not compatible with other international tile providers that are based on EPSG:4326 or EPSG:900913.

On the contrary, VWorld uses EPSG:900913 as its CRS, so it can be used with other tile providers (e.g. googlemap, OpenStreetMap, OpenWeatherMap, etc.) that are using the same CRS (i.e. EPSG:4326 or EPSG:900913). 

Live Demo
===

[Korean Map Tiles on Leaflet](http://tontita.github.io/Leaflet.KoreanTmsProviders/) 

Providers
===

Current options suitable for basemaps are:
* NaverMap
    * NaverMap.Street
    * NaverMap.Satellite
    * NaverMap.Hybrid
    * NaverMap.Cadastral
* VWorld
    * VWorld.Street
    * VWorld.Satellite
 
Current options suitable for overlays are:
* NaverMap
    * NaverMap.Cadastral
* VWorld
    * VWorld.Hybrid

This work was inspired from <http://plugins.qgis.org/plugins/tmsforkorea>, <https://github.com/leaflet-extras/leaflet-providers>, and <https://github.com/kartena/Proj4Leaflet>.


Leaflet.KoreanTmsProviders
=================
An extension to [Leaflet](http://leafletjs.com/) that contains configurations for various Korean tile providers.

Usage
===

```Javascript
//add Naver Street Layer to map.
new L.TileLayer.KoreaProvider('NaverMap.Street').addTo(map);
```
```Javascript
//add Naver Street Layer to map.
L.tileLayer.koreaProvider('NaverMap.Street').addTo(map);
```
This library provides a prefilled layer control, so you can just provide an array of strings:
```JavaScript
var baseLayers = {
	'Naver Street Map': L.tileLayer.koreaProvider('NaverMap.Street').addTo(map),
	'Naver Satellite Map' : L.tileLayer.koreaProvider('NaverMap.Satellite')
};

var overlayLayers = {
	'Naver Hybrid Map' : L.tileLayer.koreaProvider('NaverMap.Hybrid'),
	'Naver Cadastral Map' : L.tileLayer.koreaProvider('NaverMap.Cadastral')
};		

var layerControl = L.control.layers.provided(baseLayers, overlays).addTo(map);

//you can still add your own afterwards with
layerControl.addBaseLayer(layer, name);
```
```JavaScript
var baseLayers = {
	'Naver Street Map': L.tileLayer.koreaProvider('NaverMap.Street').addTo(map),
	'Naver Satellite Map': L.tileLayer.koreaProvider('NaverMap.Satellite'),
	'Naver Hybrid Map': L.tileLayer.koreaProvider('NaverMap.Hybrid'),
	'Naver Cadastral Map': L.tileLayer.koreaProvider('NaverMap.Cadastral', {opacity : 1.0})
};

var overlayLayers = {
	'Naver Cadastral Map': L.tileLayer.koreaProvider('NaverMap.Cadastral')
};

L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(map);
```

Example
===

```Javascript
var map = L.map('map', {
  center: new L.LatLng(38, 127),
  zoom: 1, 
  crs: L.Proj.CRS.Naver
});

var baseLayers = {
	'Naver Street Map': L.tileLayer.koreaProvider('NaverMap.Street').addTo(map),
	'Naver Satellite Map' : L.tileLayer.koreaProvider('NaverMap.Satellite')
};

var overlayLayers = {
	'Naver Hybrid Map' : L.tileLayer.koreaProvider('NaverMap.Hybrid'),
	'Naver Cadastral Map' : L.tileLayer.koreaProvider('NaverMap.Cadastral')
};

L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(map);
```
There are more examples at the examples folder like below.
```
./examples/indexNaver.html
./examples/indexDaum.html
./examples/indexVWorld.html
```
NaverMap and DaumMap uses a local Coordinate Reference Systems (CRS), which is EPSG:5179 and EPSG:5181. Therefore, it is not compatible with other international tile providers that are based on EPSG:4326 or EPSG:900913.

On the contrary, VWorld uses EPSG:900913 as its CRS, so it can be used with other tile providers (e.g. googlemap, OpenStreetMap, OpenWeatherMap, etc.) that are using the same CRS (i.e. EPSG:4326 or EPSG:900913). 

Live Demo
===

[Korean Map Tiles on Leaflet](http://joongtang.github.io/Leaflet.KoreanTmsProviders/) 

Providers
===

Current options suitable for basemaps are:
* NaverMap
    * NaverMap.Street
    * NaverMap.Satellite
* DaumMap
    * DaumMap.Street
    * DaumMap.Satellite
* VWorld
    * VWorld.Street
    * VWorld.Satellite
    * VWorld.Gray
    * VWorld.Midnight
 
Current options suitable for overlays are:
* NaverMap
    * NaverMap.Physical
    * NaverMap.Hybrid
    * NaverMap.Cadastral
    * NaverMap.Bicycle
    * NaverMap.Traffic
* DaumMap
    * DaumMap.Hybrid
    * DaumMap.Physical
    * DaumMap.Cadastral
    * DaumMap.Bicycle
    * DaumMap.Traffic
* VWorld
    * VWorld.Hybrid

This work was inspired from <http://plugins.qgis.org/plugins/tmsforkorea>, <https://github.com/leaflet-extras/leaflet-providers>, and <https://github.com/kartena/Proj4Leaflet>.
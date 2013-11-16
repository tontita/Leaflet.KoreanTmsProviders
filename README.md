Leaflet.KoreanTmsProviders
=================
An extension to [Leaflet](http://leafletjs.com/) that contains configurations for various Korean tile providers.

# Usage
```Javascript
//add Daum Street Layer to map.
new L.Proj.TileLayer.TMS.Provider('DaumMap.Street').addTo(map);
```

This library provides a prefilled layer control,so you can just provide an array of strings:

```JavaScript
var baseLayers = {
			'DaumMap.Street': new L.Proj.TileLayer.TMS.Provider('DaumMap.Street').addTo(map),
			'DaumMap.Satellite' : new L.Proj.TileLayer.TMS.Provider('DaumMap.Satellite')
		};
var overlayLayers = {};			
var layerControl = L.control.layers.provided(baseLayers, overlays).addTo(map);

//you can still add your own afterwards with
layerControl.addBaseLayer(layer, name);
```

a full example

```Javascript
var map = L.map('map', {
	crs: L.Proj.CRS.TMS.Daum, 
	continuousWorld: true,
	worldCopyJump: false,
	zoomControl: true
});

var baseLayers = {
	'DaumMap.Street': new L.Proj.TileLayer.TMS.Provider('DaumMap.Street').addTo(map),
	'DaumMap.Satellite' : new L.Proj.TileLayer.TMS.Provider('DaumMap.Satellite')
};

var overlayLayers = {};

L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(map);
map.setView([38, 127], 0);
```

Providers
===

Current options suitable for basemaps are:
* DaumMap
    * DaumMap.Street
    * Daum.Map.Satellite

Current options suitable for overlays are:
* ...





This work was inspired from <http://plugins.qgis.org/plugins/tmsforkorea>, <https://github.com/leaflet-extras/leaflet-providers>, and <https://github.com/kartena/Proj4Leaflet>.


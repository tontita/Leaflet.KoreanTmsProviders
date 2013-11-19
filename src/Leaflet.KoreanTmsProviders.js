
(function () {
	'use strict';

	//var crsDaum 
	//L.Proj.TileLayer.TMS.crsDAUM 
	L.Proj.CRS.TMS.Daum = new L.Proj.CRS.TMS(
			'EPSG:5181',
  			'+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  			//[-30000, -60000, 494288, 464288],
  			[-30000, -60000, 494288, 988576],
  			{
  				resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25]
  			}
   		);

	L.Proj.CRS.TMS.Naver = new L.Proj.CRS.TMS(
			'EPSG:5179',
			'+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  			//[90112, 1192896, 1990673, 2761664],
  			[90112, 1192896, 614400, 1717184],
  			{
  				resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25]
  			}
   		);



	L.Proj.TileLayer.TMS.Provider = L.Proj.TileLayer.TMS.extend({
		initialize: function (arg, crs, options) {
			var providers = L.Proj.TileLayer.TMS.Provider.providers;

			var parts = arg.split('.');

			var providerName = parts[0];
			var variantName = parts[1];

			if (!providers[providerName]) {
				throw 'No such provider (' + providerName + ')';
			}

			var provider = {
				url: providers[providerName].url,
				crs: providers[providerName].crs,
				options: providers[providerName].options
			};

			// overwrite values in provider from variant.
			if (variantName && 'variants' in providers[providerName]) {
				if (!(variantName in providers[providerName].variants)) {
					throw 'No such name in provider (' + variantName + ')';
				}
				var variant = providers[providerName].variants[variantName];
				provider = {
					url: variant.url || provider.url,
					crs: variant.crs || provider.crs,
					options: L.Util.extend({}, provider.options, variant.options)
				};
			} else if (typeof provider.url === 'function') {
				provider.url = provider.url(parts.splice(1).join('.'));
			}

			// replace attribution placeholders with their values from toplevel provider attribution,
			// recursively
			var attributionReplacer = function (attr) {
				if (attr.indexOf('{attribution.') === -1) {
					return attr;
				}
				return attr.replace(/\{attribution.(\w*)\}/,
					function (match, attributionName) {
						return attributionReplacer(providers[attributionName].options.attribution);
					}
				);
			};
			provider.options.attribution = attributionReplacer(provider.options.attribution);

			// Compute final options combining provider options with any user overrides
			var layerOpts = L.Util.extend({}, provider.options, options);
			L.Proj.TileLayer.TMS.prototype.initialize.call(this, provider.url, provider.crs, layerOpts);

			if (providerName == 'NaverMap' ) {
				this.getTileUrl = function (tilePoint) {

			    var toRet;
		    	console.log( "NaverMap/" + this._getSubdomain(tilePoint) + " : " + tilePoint.x + ", " + tilePoint.y + "("  + (tilePoint.y - Math.pow(2, tilePoint.z-1)) + ")" + ", " + tilePoint.z );

		    	toRet = L.Util.template(this._url, L.extend({
		      		s: this._getSubdomain(tilePoint),
		      		x: tilePoint.x,
		      		y: tilePoint.y - Math.pow(2, tilePoint.z-1),
		      		z: tilePoint.z //+ 1
	    		}, this.options));

		    	return toRet;
		  		}
			}
		}
	});

	/**
	 * Definition of providers.
	 * see http://leafletjs.com/reference.html#tilelayer for options in the options map.
	 */

	//jshint maxlen:220
	L.Proj.TileLayer.TMS.Provider.providers = {
		DaumMap: {
			url: 'http://i{s}.maps.daum-img.net/map/image/G03/i/1.20/L{z}/{y}/{x}.png',
			crs: L.Proj.CRS.TMS.Daum, //L.Proj.TileLayer.TMS.crsDAUM, //crsDaum,
			options: {
				maxZoom: 14, 
				minZoom: 0,
				zoomReverse: true,
				subdomains: '0123',
				continuousWorld: true,
				attribution:
					'<a target="_blank" href="http://local.daum.net/map/index.jsp" '
					+ 'style="float: left; width: 38px; height: 17px; cursor: pointer; background-image: url(http://i1.daumcdn.net/localimg/localimages/07/2008/map/n_local_img_03_b.png); background-repeat: no-repeat no-repeat; " '
					+ 'title="Daum 지도로 보시려면 클릭하세요."></a>' 
					+ 'ⓒ 2013 Daum'
			},
			variants: {
				Street: {},
				Satellite: {
					url: 'http://s{s}.maps.daum-img.net/L{z}/{y}/{x}.jpg'
				},
				Physical: {
					url: 'http://sr{s}.maps.daum-img.net/map/image/G03/sr/1.00/L{z}/{y}/{x}.png',
					options: {
						opacity: 0.75
					}
				},
				Hybrid: {
					url: 'http://h{s}.maps.daum-img.net/map/image/G03/h/1.20/L{z}/{y}/{x}.png'
				}


			}
		},
		NaverMap: {
			url: 'http://onetile{s}.map.naver.net/get/29/0/0/{z}/{x}/{y}/bl_vc_bg/ol_vc_an',
			crs: L.Proj.CRS.TMS.Naver, 
			options: {
				maxZoom: 13, 
				minZoom: 0,
				tms: true,
				zoomOffset: 1,
				subdomains: '1234',
				continuousWorld: true,
				attribution:
					'<a href="http://www.nhncorp.com" target="_blank" style="text-decoration: none !important;">© <span style="display: inline; font-family: Tahoma,sans-serif !important; font-size: 9px !important; font-weight: bold !important; font-style: normal !important; color: #009BC8 !important; text-decoration: none !important;">'
					+ 'NHN Corp.</span></a>'
					+ '<img class="nmap_logo_map" src="http://static.naver.net/maps2/logo_naver_s.png" width="43" height="9" alt="NAVER">'
			},
			variants: {
				Street: {},
				Satellite: {
					url: 'http://onetile{s}.map.naver.net/get/29/0/0/{z}/{x}/{y}/bl_st_bg/ol_st_an'
				}, 
				Cadastral: {
					url: 'http://onetile{s}.map.naver.net/get/29/0/0/{z}/{x}/{y}/bl_vc_bg/ol_lp_cn',
					options: {
						opacity: 0.75
					}
				},
				Hybrid: {
					url: 'http://onetile{s}.map.naver.net/get/29/0/0/{z}/{x}/{y}/bl_st_bg/ol_st_rd/ol_st_an'
				}

			}

		}
	};

	
	L.Proj.TileLayer.TMS.provider = function (provider, crs, options) {
		return new L.Proj.TileLayer.TMS.Provider(provider, crs, options);
	};

	L.Control.Layers.Provided = L.Control.Layers.extend({
		initialize: function (base, overlay, options) {
			var first;

			var labelFormatter = function (label) {
				return label.replace(/\./g, ': ').replace(/([a-z])([A-Z])/g, '$1 $2');
			};

			if (base.length) {
				(function () {
					var out = {},
					    len = base.length,
					    i = 0;

					while (i < len) {
						if (typeof base[i] === 'string') {
							if (i === 0) {
								first = L.tileLayer.provider(base[0]);
								out[labelFormatter(base[i])] = first;
							} else {
								out[labelFormatter(base[i])] = L.tileLayer.provider(base[i]);
							}
						}
						i++;
					}
					base = out;
				}());
				this._first = first;
			}

			if (overlay && overlay.length) {
				(function () {
					var out = {},
					    len = overlay.length,
					    i = 0;

					while (i < len) {
						if (typeof base[i] === 'string') {
							out[labelFormatter(overlay[i])] = L.tileLayer.provider(overlay[i]);
						}
						i++;
					}
					overlay = out;
				}());
			}
			L.Control.Layers.prototype.initialize.call(this, base, overlay, options);
		},
		onAdd: function (map) {
			this._first.addTo(map);
			return L.Control.Layers.prototype.onAdd.call(this, map);
		}
	});

	L.control.layers.provided = function (baseLayers, overlays, options) {
		return new L.Control.Layers.Provided(baseLayers, overlays, options);
	};
}());


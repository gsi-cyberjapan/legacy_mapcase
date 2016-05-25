/**
 * OpenScales用のレイヤー操作クラス
 */
var mapHandler = {
	// layerList : [],
	initialize : function() {
		handlerType = "OpenScales";
	},
	layerExists : function(layers, layername) {
		return webtis.layerExists(layername);
	},
	addKMLLayer : function(data, layers) {
		webtis.loadKML(data.key, data.path, true);
		webtis.setLayerAsLibrary(data.key);
//		layerList[data.key] = data.key;
		layers[data.key] = data.key;
	},
	addInternalKMLLayer : function(data, layers) {
		var proxy = false;
		if (data.proxy == "true") {
			proxy = true;
		}
//		layerList[dtnode.data.key] = dtnode.data.key;
		layers[data.key] = data.key;
		$.ajax({
			dataType: "text",
			url: data.path,
			jsonpCallback: "internal_kml_loaded",
			success: function(xml) {
				var baseURI = this.url.split("?")[0];
				if (baseURI.lastIndexOf("/") != baseURI.length - 1) {
					baseURI = baseURI.substr(0, baseURI.lastIndexOf("/"));
				}
				webtis.loadKMLFromString(data.key, xml, baseURI, proxy);
				webtis.setLayerAsLibrary(data.key);
			}
		}); 
	},
	addTileLayer : function(data, layers) {
		var tilejson = {
			"name": data.key,
			"maxzoom": data.maxzoom,
			"minzoom": data.minzoom,
			"tiles":[
				data.path
			],
		};
		var proxy = false;
		if (data.proxy == "true") {
			proxy = true;
		}
//		webtis.addTileJSONLayer(data.key, tilejson, data.proxy);
		webtis.addTileJSONLayer(data.key, tilejson, proxy);
		webtis.setLayerAsLibrary(data.key);
		layers[data.key] = data.key;
	},
	addMapLayer : function(data, layers) {
		webtis.addMapLayer(data.key, data.dataset, data.zindex);
//		layerList[data.key] = data.key;
		layers[data.key] = data.key;
	},
	setLayerVisibility : function(layers, layername, visible) {
		if (visible) {
			webtis.displayLayer(layername, 1);
		} else {
			webtis.displayLayer(layername, 0);
		}
	},
	isLayerVisible : function(layers, layername) {
		var visible = webtis.displayLayer(layername);
		if (visible == 1) {
			return true;
		} else {
			return false;
		}
	},
	getLayerOpacity : function(layers, layername) {
		return webtis.getLayerOpacity(layername);
	},
	setLayerOpacity : function(layers, layername, opacity) {
		webtis.setLayerOpacity(layername, opacity);
	}
};

function internal_kml_loaded(data) {
	// dummy function
//	webtis.loadKMLFromString("internal-kml", data.data, true);
//	webtis.setLayerAsLibrary("internal-kml");
}

//function internal_tilejson_loaded(data) {
//	// dummy function
//	alert(JSON.stringify(data));
//}

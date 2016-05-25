/**
 * OpenLayers用のレイヤー操作クラス
 */
var mapHandler = {
	RESOLUTIONS : [
		156543.03390625,
		78271.516953125,
		39135.7584765625,
		19567.87923828125,
		9783.939619140625,
		4891.9698095703125,
		2445.9849047851562,
		1222.9924523925781,
		611.4962261962891,
		305.74811309814453,
		152.87405654907226,
		76.43702827453613,
		38.218514137268066,
		19.109257068634033,
		9.554628534317017,
		4.777314267158508,
		2.388657133579254,
		1.194328566789627,
		0.5971642833948135,
		0.29858214169740677
	],
	initialize : function() {
		handlerType = "OpenLayers";
	},
	layerExists : function(layers, layername) {
		var layer = layers[layername];
		return layer != null;
	},
	addKMLLayer : function(data, layers) {
		var msg = "";
		var style = "";
		var userAgent = window.navigator.userAgent.toLowerCase();
		var appVersion = window.navigator.appVersion.toLowerCase();
		if (userAgent.indexOf('msie') != -1 && appVersion.indexOf("msie 8.") != -1) {
			msg = "読み込み中・・・";
			style = {
				padding: '25px',
				bottom: '30px',
				left: '10px',
				top: map.size.h - 35 + 'px'
			};
		}
		else {
			msg = "<h1>ファイルを読み込んでいます・・・・・</h1>";
			style = { padding: '25px' };
		}

		$.blockUI({message: msg, css: style});

		var newLayer = this.createLayer(data);
		newLayer.setVisibility(true);
		map.addLayer(newLayer);

		layers[data.key] = newLayer;

		var resolutions = this.RESOLUTIONS;

		$.ajax({
			dataType: "jsonp",
//			url: "./kml2jsonp.php?lf=0&url=" + encodeURIComponent(data.path),
			url: "http://portal.cyberjapan.jp/site/mapuse4/kml2jsonp.php?lf=0&url=" + encodeURIComponent(data.path),
			jsonpCallback: "kml_loaded_" + data.key.replace(/-/g, "_"),
			success: function(json) {
				var format = new OpenLayers.Format.KML({
						extractStyles: true,
						extractAttributes: true,
						maxDepth: 2,
						externalProjection: projection4326,
						internalProjection: projection900913
				});
				var features = format.read(json.data);
				if (data.drawLabel) {
					setSymbolLabelStyle(features);
					newLayer.styleType = 'librarykml';
				}
				newLayer.addFeatures(features);
				newLayer.redraw();
				$.unblockUI();
				sakuzuModule.disablePopupLayer();
				if (dispFlg && sakuzuModule.CurrentMode == "none"){
					sakuzuModule.enablePopupLayer();
				}
			},
			error: function(xhr, status, error) {
				alert('KMLファイルの読み込みに失敗しました。');
				$.unblockUI();
			}
		}); 
	},
	addInternalKMLLayer : function(data, layers) {
		var msg = "";
		var style = "";
		var userAgent = window.navigator.userAgent.toLowerCase();
		var appVersion = window.navigator.appVersion.toLowerCase();
		if (userAgent.indexOf('msie') != -1 && appVersion.indexOf("msie 8.") != -1) {
			msg = "読み込み中・・・";
			style = {
				padding: '25px',
				bottom: '30px',
				left: '10px',
				top: map.size.h - 35 + 'px'
			};
		}
		else {
			msg = "<h1>ファイルを読み込んでいます・・・・・</h1>";
			style = { padding: '25px' };
		}

		$.blockUI({message: msg, css: style});

		var newLayer = this.createLayer(data);
		newLayer.setVisibility(true);
		map.addLayer(newLayer);

		layers[data.key] = newLayer;

		var resolutions = this.RESOLUTIONS;

		$.ajax({
			dataType: "xml",
			url: data.path,
			jsonpCallback: "kml_loaded",
			success: function(xml) {
				var baseURI = this.url.split("?")[0];
				if (baseURI.lastIndexOf("/") != baseURI.length - 1) {
					baseURI = baseURI.substr(0, baseURI.lastIndexOf("/") + 1);
				}
				var format = new OpenLayers.Format.KML({
					parseStyle: function(node) {
						var style = 
							OpenLayers.Format.KML.prototype.parseStyle.call(this, node);
						if (typeof style.externalGraphic != "undefined" && style.externalGraphic.match(new RegExp("(^/)|(://)")) == null) {
							style.externalGraphic = baseURI + style.externalGraphic;
          					}
						return style;
        				},
					extractStyles: true,
					extractAttributes: true,
					maxDepth: 2,
					externalProjection: projection4326,
					internalProjection: projection900913
				});
				var features = format.read(xml);
				if (data.drawLabel) {
					setSymbolLabelStyle(features);
					newLayer.styleType = 'librarykml';
				}
				newLayer.addFeatures(features);
				newLayer.redraw();
				$.unblockUI();
				sakuzuModule.disablePopupLayer();
				if (dispFlg && sakuzuModule.CurrentMode == "none"){
					sakuzuModule.enablePopupLayer();
				}
			},
			error: function() {
				alert('error');
				$.unblockUI();
			}
		}); 


	},
	addTileLayer : function(data, layers) {
		var newLayer = this.createLayer(data);
		newLayer.setVisibility(true);
		map.addLayer(newLayer);
		if (data.zindex) {
			newLayer.setZIndex(data.zindex);
		}
		if (data.maxzoom) {
			newLayer.minResolution = newLayer.BASE_RESOLUTIONS[data.maxzoom];
		}
		if (data.minzoom) {
			newLayer.maxResolution = newLayer.BASE_RESOLUTIONS[data.minzoom];
		}

		layers[data.key] = newLayer;
	},
	addMapLayer : function(data, layers) {
		var newLayer = this.createLayer(data);
		newLayer.setVisibility(true);
		map.addLayer(newLayer);
		if (data.zindex) {
			newLayer.setZIndex(data.zindex);
		}

		layers[data.key] = newLayer;

//		var command = 'treeModule.getLayer(\"' + data.key + '\").redraw(true);'
//		setTimeout(command, 3000);
	},
	addTmsLayer : function(data, layers) {
		var newLayer = this.createLayer(data);
		newLayer.setVisibility(true);
		map.addLayer(newLayer);
		newLayer.setZIndex(data.zindex);

		layers[data.key] = newLayer;
	},
	addKmlUrlLayer : function(data, layers) {
		
		if (dataSetObj[data.getURL]){
			data.path = dataSetObj[data.getURL](data);
			this.addKMLLayer(data, layers);
		}
	},
	setLayerVisibility : function(layers, layername, visible) {
		var layer = layers[layername];
		if (layer == null) return;
		layer.setVisibility(visible);

		if (layer.subLayer != null)
		{
			layer.subLayer.setVisibility(visible);

			if (!visible){
				// 表示中のポップアップを閉じる
				this.updatePopupLayer();
			}
		}

		// webkit系の場合、レイヤーが再描画されないので画面を更新する
		if (visible)
		{
			this.redrawLayer(layer);

			if (layer.subLayer != null)
			{
				this.redrawLayer(layer.subLayer);
			}
		}
	},
	isLayerVisible : function(layers, layername) {
		var layer = layers[layername];
		if (layer != null && layer.visibility) {
			return true;
		} else {
			return false;
		}
	},
	getLayerOpacity : function(layers, layername, opacity) {
		var layer = layers[layername];
		if (layer == null) {
			return null;
		} else {
			return layer.opacity;
		}
	},
	setLayerOpacity : function(layers, layername, opacity) {
		var layer = layers[layername];

		if (layer != null)
		{
			this.setOpacity(layer, opacity);
				
			if (layer.subLayer != null)
			{
				this.setOpacity(layer.subLayer, opacity);
			}
		}
	},
	createLayer : function(data) {
		var layer = null;
		var layer_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		var zindex;

		if (data.type == "map") {
			var options = {
				isBaseLayer: false,
				dataSet: dataSetObj[data.dataset],
				visibility: false
			};
			if (typeof isReceivePrintData != "undefined" && isReceivePrintData == true) {
				options.tileSide = 128;
			}
			layer = new webtis.Layer.BaseMap(data.key, options);
/*
			layer = new webtis.Layer.BaseMap(data.key, {
				isBaseLayer: false,
				dataSet: dataSetObj[data.dataset],
				visibility: false
			});
*/
		}
		else if (data.type == "tile") {
			var tileside;

			if (typeof isReceivePrintData != "undefined" && isReceivePrintData == true) {
				tileside = 128;
			}

			layer = new webtis.Layer.TileLayer(data.key, data.path, data.maxzoom, data.minzoom, tileside);
			layer.visibility = true;
			layer.events.register('tileerror', layer, function(){
				$("div#" + this.div.id + " .olImageLoadError").css("display", "none");
			});
		}
		else if (data.type == "kml") {

			var options = {
				projection: projection4326,
				visibility: true, //false,
				unactivatable: true,
				style: layer_style
			}
			
			if (data.maxzoom && data.minzoom){
				var maxzoom = parseInt(data.maxzoom, 10);
				var minzoom = parseInt(data.minzoom, 10);
				
				options = jQuery.extend(options, {
					maxResolution: this.RESOLUTIONS[minzoom],
					minResolution: this.RESOLUTIONS[maxzoom],
					numZoomLevels: maxzoom - minzoom + 1
				});
			}
			layer = new OpenLayers.Layer.Vector(data.title, options);
			layer.JSGISelection = true;
/*
			layer = new OpenLayers.Layer.Vector(data.title,
				{
					projection: projection4326,
					strategies: [new OpenLayers.Strategy.Fixed()],
					visibility: true, //false,
					unactivatable: true,
					protocol: new OpenLayers.Protocol.HTTP({
						url: data.path,
						format: new OpenLayers.Format.KML({
							extractStyles: true,
							extractAttributes: true,
							maxDepth: 2
						})
					}),
					style: layer_style
				}
			);
			layer.JSGISelection = true;
*/
		}
		else if (data.type == "kml-internal") {
			var options = {
				projection: projection4326,
				visibility: true, //false,
				unactivatable: true,
				style: layer_style
			}
			if (data.maxzoom && data.minzoom){
				var maxzoom = parseInt(data.maxzoom, 10);
				var minzoom = parseInt(data.minzoom, 10);
				
				options = jQuery.extend(options, {
					maxResolution: this.RESOLUTIONS[minzoom],
					minResolution: this.RESOLUTIONS[maxzoom],
					numZoomLevels: maxzoom - minzoom + 1
				});
			}
  			layer = new OpenLayers.Layer.Vector(data.title, options);
			layer.JSGISelection = true;
		}
		else if (data.type == "tms") {
			layer = new OpenLayers.Layer.TMS(data.title, data.path,
			{
				type: 'png',
				getURL: tmsUrlObj[data.getURL],
				alpha: false,
				isBaseLayer: false,
				visibility: false
			});
			layer.events.register('tileerror', layer, function(){
				$("div#" + this.div.id + " .olImageLoadError").css("display", "none");
			});
		}
		else if (data.type == "img") {
			layer = new OpenLayers.Layer.Image(
				data.title,
				data.path,
				data.bounds,
				data.size,
				{
					visibility: false,
					isBaseLayer: false,
					projection: projection900913
				}
			);
		}
		else if (data.type == "kmlurl") {
			layer = new OpenLayers.Layer.Vector(data.title,
				{
					projection: projection4326,
					visibility: true,
					unactivatable: true,
					style: layer_style
				}
			);
			layer.JSGISelection = true;
		}

		return layer;
	},
	// レイヤーに透過度をセットする
	setOpacity : function(layer, opa)
	{
		if (layer != null)
		{
			if ((layer.CLASS_NAME == "webtis.Layer.BaseMap")||(layer.CLASS_NAME == "OpenLayers.Layer.TMS")|| (layer.CLASS_NAME == "OpenLayers.Layer.Image") || (layer.CLASS_NAME == "webtis.Layer.TileLayer"))
			{
				layer.setOpacity(opa);
			}
			else
			{
				for (var i = 0; i < layer.features.length; i++)
				{
					var feature = layer.features[i];
					if (feature.orgStyle == null) feature.orgStyle = {};

					// 画像の透過度
					if (feature.style.graphicOpacity != null) {
						// 透過度の初期値を記録する
						if (feature.orgStyle.graphicOpacity == null && feature.orgStyle.graphicOpacity != 0) {
							feature.orgStyle.graphicOpacity = feature.style.graphicOpacity;
						}
						feature.style.graphicOpacity = feature.orgStyle.graphicOpacity * (opa == 0 ? 0.01 : opa);
					}

					// 線の透過度
					if (feature.style.strokeOpacity != null) {
						if (feature.orgStyle.strokeOpacity == null && feature.orgStyle.strokeOpacity != 0) {
							feature.orgStyle.strokeOpacity = feature.style.strokeOpacity;
						}
						feature.style.strokeOpacity = feature.orgStyle.strokeOpacity * (opa == 0 ? 0.01 : opa);
					}

					// 背景色の透過度
					if (feature.style.fillOpacity != null) {
						if (feature.orgStyle.fillOpacity == null && feature.orgStyle.fillOpacity != 0) {
							feature.orgStyle.fillOpacity = feature.style.fillOpacity;
						}
						feature.style.fillOpacity = feature.orgStyle.fillOpacity * (opa == 0 ? 0.01 : opa);
					}
				}
				layer.opacity = opa;
				layer.redraw();
			}
		}
	},
	// 地図レイヤーの再描画（chrome/safari）
	redrawLayer : function(layer)
	{
		if ((layer.CLASS_NAME == "webtis.Layer.BaseMap")||(layer.CLASS_NAME == "OpenLayers.Layer.TMS"))
		{
			layer.redraw();
		}
	},
	// ポップアップを表示されるようにする
	updatePopupLayer : function()
	{
		sakuzuModule.disablePopupLayer();
		if (dispFlg && sakuzuModule.CurrentMode == "none"){
			sakuzuModule.enablePopupLayer();
		}
	}
};

function setSymbolLabelStyle(features) {
	for (var i = 0; i < features.length; i++) {
		var feature = features[i];
		feature.style.fontSize = '12px';
		feature.style.labelAlign = 'lm';
		feature.style.fontFamily = 'ＭＳ ゴシック';
		feature.style.fontOpacity = iconlabel ? 1 : 0.0001;
		feature.style.label = feature.data.name;
		feature.style.labelXOffset = feature.style.graphicWidth ? feature.style.graphicWidth/2 : 20/2;
	}
}

function kml_loaded(data) {
	// dummy function
}


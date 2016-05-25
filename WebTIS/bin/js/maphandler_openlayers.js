/**
 * OpenLayers用のレイヤー操作クラス
 */
var mapHandler = {
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

		this.updatePopupLayer();

		$.unblockUI();
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

		$.ajax({
//			dataType: "jsonp",
			dataType: "xml",
			url: data.path,
			jsonpCallback: "internal_kml_loaded",
			success: function(xml) {
				var format = new OpenLayers.Format.KML({
						extractStyles: true,
						extractAttributes: true,
						maxDepth: 2,
						externalProjection: projection4326,
						internalProjection: projection900913
				});
//				newLayer.addFeatures(format.read(json.data));
				newLayer.addFeatures(format.read(xml));
				newLayer.redraw();
				$.unblockUI();
//				that.updatePopupLayer();
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
		this.addMapLayer(data, layers);
	},
	addMapLayer : function(data, layers) {
		var newLayer = this.createLayer(data);
		newLayer.setVisibility(true);
		map.addLayer(newLayer);
		newLayer.setZIndex(data.zindex);

		layers[data.key] = newLayer;

		var command = 'treeModule.getLayer(\"' + data.key + '\").redraw(true);'
		setTimeout(command, 3000);
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
			layer = new webtis.Layer.BaseMap(data.key, {
				isBaseLayer: false,
				dataSet: data.dataset,
				visibility: false
			});
		}
		else if (data.type == "tile") {
			layer = new webtis.Layer.TileLayer(data.key, data.path, data.maxzoom, data.minzoom);
			layer.visibility = true;
		}
		else if (data.type == "kml") {
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
		}
		else if (data.type == "kml-internal") {
			layer = new OpenLayers.Layer.Vector(data.title,
				{
					projection: projection4326,
					visibility: true, //false,
					unactivatable: true,
					style: layer_style
				}
			);
			layer.JSGISelection = true;
		}
		else if (data.type == "tms") {
			layer = new OpenLayers.Layer.TMS(data.title, data.path,
			{
				type: 'png',
				getURL: data.getURL,
				alpha: false,
				isBaseLayer: false,
				visibility: false
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
		
		return layer;
	},
	// レイヤーに透過度をセットする
	setOpacity : function(layer, opa)
	{
		if (layer != null)
		{
			if ((layer.CLASS_NAME == "webtis.Layer.BaseMap")||(layer.CLASS_NAME == "OpenLayers.Layer.TMS")|| (layer.CLASS_NAME == "OpenLayers.Layer.Image"))
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



var ShowPlugin = {};
var pluginCounter = 0;

(function($){
jQuery.fn.ShowPlugin = function(treeData, handler) {
//	handler = handler;

	this.init_ctrl = $.proxy(init_ctrl, this);
//	this.createLayer = $.proxy(createLayer, this);

	var layerList = [];
	var libraryTitle = "レイヤー名: ";
	var pluginID = pluginCounter;
	this.pluginID = pluginID;
	pluginCounter++;

	function init_ctrl() {
		$("#plugintree" + this.pluginID).dynatree({
			checkbox: true,
			selectMode: 3,
			children: treeData,
			imagePath: "./",

			onSelect: function(select, dtnode) {
				var exist = handler.layerExists(layerList, dtnode.data.key);
				if (!exist)
				{
					// 未読込ならばレイヤーを作成
					if (dtnode.data.type == 'kml')
					{
						if (dtnode.data.proxy == 'false') {
							handler.addInternalKMLLayer(dtnode.data, layerList);
						} else {
							handler.addKMLLayer(dtnode.data, layerList);
						}
					}
					else if (dtnode.data.type == 'map')
					{
						handler.addMapLayer(dtnode.data, layerList);
					}
					else if (dtnode.data.type == 'tile')
					{
						handler.addTileLayer(dtnode.data, layerList);
					}
				}
				else
				{
					if (select) {
						handler.setLayerVisibility(layerList, dtnode.data.key, true);
					} else {
						handler.setLayerVisibility(layerList, dtnode.data.key, false);
					}
					// TODO: サブレイヤーの扱い
				}
					
				dtnode.activate(true);

			},

			onActivate: function(dtnode) {
				// var layer = layerList[dtnode.data.key];
				if (handler.layerExists(layerList, dtnode.data.key)) {
					pluginSliderModule[pluginID].setOpacity(handler.getLayerOpacity(layerList, dtnode.data.key));
				} else {
					pluginSliderModule[pluginID].setOpacity(1);
				}
				
				$("#plugin_library_slider" + pluginID)[0].hidden = dtnode.data.isFolder;

				var legendFunc = dtnode.data.legendFunc ? dtnode.data.legendFunc : (dtnode.parent && dtnode.parent.data.legendFunc ? dtnode.parent.data.legendFunc : null);

				if (!dtnode.data.isFolder && legendFunc){
					legendFunc(dtnode);
				}
				else {
					$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
					$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
					$("#plugin_library_legend" + pluginID)[0].innerHTML = "";
				}
			},

			onDblClick: function(dtnode, event) {
				dtnode.toggleSelect();
			},

			onKeydown: function(dtnode, event) {
				if (event.which == 32) {
					dtnode.toggleSelect();
					return false;
				}
			},

			initId: "treeData",

			cookieId: "ui-dynatree-Cb3",
			idPrefix: "ui-dynatree-Cb3-"
		});
		
		$("#plugin_library_name" + pluginID)[0].innerHTML = libraryTitle;
	};
	
	if (typeof isMapCase != "undefined" && isMapCase == true) {
	var panelString = "\
		<div id=\"lib_main\" class=\"ui-widget-content ui-corner-all uiTabPanel\" style=\"padding: 2px 3px 10px 4px;\">\
			<div class=\"cs_block\">\
				<div style=\"clear:both\"></div>\
				<div id=\"plugintree\" style=\"width:275px; height:360px; margin-bottom: 12px;\"></div>\
				<div id=\"pluginStatus\" style=\"width:256px; clear:both; border: 1px solid gray; padding: 2px 0px 2px 4px; margin: 2px\">\
					<div id=\"plugin_library_name\" style=\"font-size:13px; font-weight: bolder; margin: 3px\"></div>\
					<div id=\"plugin_library_subname\" style=\"font-size:12px; margin: 2px\"></div>\
					<div id=\"plugin_library_slider\">\
						<div style=\"float:left; width:110px\">\
							<div id=\"plugin-opa-value\" style=\"font-size:13px\" ></div>\
						</div>\
						<div style=\"float:right; spacing:1px 0px 0px 0px;\">\
							<div id=\"plugin-opa-slider\"></div>\
						</div>\
						<div style=\"clear:both; height: 3px\"></div>\
					</div>\
					<div id=\"plugin_library_legend\" style=\"font-size:13px; margin: 8px\"></div>\
				</div>\
			</div>\
		</div>\
	";
	} else {
	var panelString = "\
		<div id=\"lib_main\" class=\"ui-widget-content ui-corner-all uiTabPanel\" style=\"padding: 2px 3px 10px 4px;\">\
			<div class=\"cs_block\">\
				<div id=\"othrelib\" style=\"float:right;height=10px; margin-bottom: 3px;\">\
					<font size=2><a href=\"http://geolib.gsi.go.jp/\" target=\"_blank\">地理空間情報ライブラリー入口</a></font>\
				</div>\
				<div style=\"clear:both\"></div>\
				<div id=\"plugintree\" style=\"width:275px; height:360px; margin-bottom: 12px;\"></div>\
				<div id=\"pluginStatus\" style=\"width:256px; clear:both; border: 1px solid gray; padding: 2px 0px 2px 4px; margin: 2px\">\
					<div id=\"plugin_library_name\" style=\"font-size:13px; font-weight: bolder; margin: 3px\"></div>\
					<div id=\"plugin_library_subname\" style=\"font-size:12px; margin: 2px\"></div>\
					<div id=\"plugin_library_slider\">\
						<div style=\"float:left; width:110px\">\
							<div id=\"plugin-opa-value\" style=\"font-size:13px\" ></div>\
						</div>\
						<div style=\"float:right; spacing:1px 0px 0px 0px;\">\
							<div id=\"plugin-opa-slider\"></div>\
						</div>\
						<div style=\"clear:both; height: 3px\"></div>\
					</div>\
					<div id=\"plugin_library_legend\" style=\"font-size:13px; margin: 8px\"></div>\
				</div>\
			</div>\
		</div>\
	";
	}
	panelString = panelString.replace("plugintree", "plugintree" + pluginID);
	panelString = panelString.replace("pluginStatus", "pluginStatus" + pluginID);
	panelString = panelString.replace("plugin_library_name", "plugin_library_name" + pluginID);
	panelString = panelString.replace("plugin_library_subname", "plugin_library_subname" + pluginID);
	panelString = panelString.replace("plugin_library_slider", "plugin_library_slider" + pluginID);
	panelString = panelString.replace("plugin_library_legend", "plugin_library_legend" + pluginID);
	panelString = panelString.replace("plugin-opa-value", "plugin-opa-value" + pluginID);
	panelString = panelString.replace("plugin-opa-slider", "plugin-opa-slider" + pluginID);
	var libPanel = $(panelString);

	this.append(libPanel);
	
	// ポップアップを表示されるようにする
	function updatePopupLayer()
	{
		sakuzuModule.disablePopupLayer();
		if (dispFlg && sakuzuModule.CurrentMode == "none"){
			sakuzuModule.enablePopupLayer();
		}
	};

	// ベクターレイヤのリストを返す
	this.getVectorLayers = function()
	{
		var layers = [];
		for (var key in layerList)
		{
			var layer = layerList[key];

			if (layer != null)
			{
				if (layer.CLASS_NAME == "OpenLayers.Layer.Vector") {
					layers.push(layer);
				}
				if (layer.subLayer != null && layer.subLayer.CLASS_NAME == "OpenLayers.Layer.Vector") {
					layers.push(layer.subLayer);
				}
			}
		}
		
		return layers;
	};

	// アクティブなレイヤーに透過度をセット
	this.changeOpacity = function(opa)
	{
		var dtnode = $("#plugintree" + pluginID).dynatree("getActiveNode");
		if (dtnode != null)
		{
			//webtis.setLayerOpacity(dtnode.data.key, opa);
			handler.setLayerOpacity(layerList, dtnode.data.key, opa);
		}
	};
	
	this.getRoot = function()
	{
		return $("#plugintree" + pluginID).dynatree("getRoot");
	};

	// 初期設定
	this.initTree = function()
	{
		var root = this.getRoot();
	};

	// レイヤーの初期表示
	this.initShowLayers = function(initLibLayers) {
		var root = this.getRoot();

		if (initLibLayers != null) {
			for (var i in initLibLayers) {
				// レイヤーの選択
				var info = initLibLayers[i];
				root.tree.selectKey(info['key'], true);

				// 透過度の設定
				pluginSliderModule[pluginID].setOpacity(info['opacity']);
				this.changeOpacity(info['opacity']);
			}
		}
	};

	// 選択中のレイヤーからURLの文字列を作成
	this.getSelectedLayerString = function()
	{
		var ret = "";
		var root = this.getRoot();
		var idx = 1;

		root.visit(function(node) {
			/*
			var layer = layerList[node.data.key];

			if (!node.data.isFolder && layer != null && layer.visibility) {
				ret += "&lkey" + idx + "=" + node.data.key
				     + "&lopa" + idx + "=" + (layer.opacity == null ? 1 : layer.opacity);

				idx++;
			}
			*/
			if (!node.data.isFolder) {
				var isVisible = handler.isLayerVisible(layerList, node.data.key);
				if (isVisible) {
					var opacity = handler.getLayerOpacity(layerList, node.data.key);
					ret += "&lkey" + idx + "=" + node.data.key
						+ "&lopa" + idx + "=" + (opacity == null ? 1 : opacity);
					idx++;
				}
			}
		});
		
		return ret;
	};

	this.getLayer = function(key)
	{
		return layerList[key];
	};

	return this;
};
})(jQuery);

/** OpenLayersのクラスの簡易版 **/
ShowPlugin.Class = function() {
    var Class = function() {
        if (arguments) {
            this.initialize.apply(this, arguments);
        }
    };
    var extended = {};
    var parent, initialize, Type;
    for (var i=0, len=arguments.length; i<len; ++i) {
        Type = arguments[i];
        if(typeof Type == "function") {
            if(i == 0 && len > 1) {
                initialize = Type.prototype.initialize;
                Type.prototype.initialize = function() {};
                extended = new Type();
                if(initialize === undefined) {
                    delete Type.prototype.initialize;
                } else {
                    Type.prototype.initialize = initialize;
                }
            }
            parent = Type.prototype;
        } else {
            parent = Type;
        }
        ShowLayer.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;
};

ShowPlugin.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if(value !== undefined) {
                destination[property] = value;
            }
        }
        var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;

        if(!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
            destination.toString = source.toString;
        }
    }
    return destination;
};


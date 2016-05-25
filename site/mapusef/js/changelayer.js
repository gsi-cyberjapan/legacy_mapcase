/** レイヤ表示用 JQueryプラグイン実装 **/
var ShowLayer = {};
var receiveDomain = 'http://gp.cyberjapan.jp';

(function($){
jQuery.fn.ShowLayer = function(config) {
	this.config = config;

	var treeData = [];
	var layerTitle = "レイヤー名: ";

	// 作図が行われた処理に対しての委譲先
	this.mapEventHandler = this.config.mapEventHandler;
	if (this.config.inFrame != false) {
		this.config.inFrame = true;
	}

	// 関数を登録
	this.addNode = $.proxy(addNode, this);
	this.removeNode = $.proxy(removeNode, this);
	this.getRoot = $.proxy(getRoot, this);
	this.init_ctrl = $.proxy(init_ctrl, this);
	this.changeOpacity = $.proxy(changeOpacity, this);
	this.disableTree = $.proxy(disableTree, this);
	this.clearLayerStatus = $.proxy(clearLayerStatus, this);

	function init_ctrl() {
		$("#sakuzutree").dynatree({
			checkbox: true,
			selectMode: 3,
			children: treeData,
			
			// チェックのオンオフ
			onSelect: $.proxy(
				function(select, dtnode) {
				
					if (select) {
						webtis.displayLayer(dtnode.data.title, 1);
					}
					else {
						webtis.displayLayer(dtnode.data.title, 0);
					}
				}, this),

			// 選択状態
			onActivate: function(dtnode) {
				$("#sz_layer_name")[0].innerHTML = layerTitle + dtnode.data.title;

				if (webtis.layerExists(dtnode.data.title)) {
					sakuzuSlider.setOpacity(webtis.getLayerOpacity(dtnode.data.title));
				} else {
					sakuzuSlider.setOpacity(1);
				}
			},
			
			onDblClick: function(dtnode, event) {
				dtnode.toggleSelect();
			},

			onKeydown: function(dtnode, event) {
				if (event.which == 32) {	// スペースキー
					dtnode.toggleSelect();
					return false;
				}
			},
			
			initId: "sakuzuTreeData",
			
			cookieId: "ui-dynatree-std",
			idPrefix: "ui-dynatree-std-"
		});
	
		this.addNode({
			name: "作図情報"
		});
		
		$("#sz_layer_name")[0].innerHTML = layerTitle;
	};

	// KML保存時に使用するForm
	var kmlPanel = $("\
		<div id=\"cs_main\" class=\"ui-widget-content ui-corner-all\">\
			<div class=\"cs_block\">\
				<div id=\"layer_block\" style=\"solid gray;maximum-height:90px;\" >\
					<button id=\"sz_kml_upload_button\">ファイル読込...</button><br>\
					<button id=\"sz_kml_file_delete\">読込んだファイルを全て削除</button>&nbsp;<br>\
					<!--<label><input type=\"checkbox\" id=\"icon_label\" checked> <font size=2>アイコン＋ラベル</font></label><br><br>-->\
					<iframe id=\"sz_kml_uploadframe\" name=\"sz_kml_uploadframe\" style=\"display:none;height:1px;\" src=\"about:blank\"></iframe>\
					<div id=\"sakuzutree\" style=\"width:262px; height:280px; margin-bottom: 13px\"></div>\
					<div id=\"layerStatus\" style=\"border: 1px solid gray; padding: 2px 0px 2px 4px; margin: 2px\">\
						<div id=\"sz_layer_name\" style=\"font-size:13px; font-weight: bolder; margin: 4px\"></div>\
						<div style=\"float:left; width:110px\">\
							<div id=\"sz-slider-value\" style=\"font-size:13px\" ></div>\
						</div>\
						<div style=\"float:right; spacing:1px 0px 0px 0px;\">\
							<div id=\"sz-slider\"></div>\
						</div>\
						<div style=\"clear:both; height:2px\"></div>\
						<div class=\"cs_block\">\
							<button id=\"sz_kml_button\"style=\"font-size:12px;\">保存</button>\
							<!--<span id=\"title\">\
								<span id=\"cs_level0\"><font size=2>　　保存形式</font></span>\
								<label><input type=\"radio\" name=\"sz_save_type\" value=\"kml\" style=\"margin-bottom:5px;\" checked><font size=2>kml</font></label>\
								<label><input type=\"radio\" name=\"sz_save_type\" value=\"kmz\" style=\"margin-bottom:5px;\"><font size=2>kmz</font></label>\
							</span>-->\
						</div>\
					</div>\
					<div>\
						<button id=\"sz_all_kml_button\">一括保存</button>\
					</div>\
				</div>\
			</div>\
		</div>\
	");
	this.append(kmlPanel);
	
	// 読み込んだファイルを全て削除ボタンの処理
	var deleteBtn = kmlPanel.find("#sz_kml_file_delete");
	deleteBtn.click(
		$.proxy(function() {

			if (confirm("読み込んだ全ての図形を削除してもよろしいですか？\n※この操作は取り消せません")){
				var root = this.getRoot();
				for (var i = 0; i < root.childList.length; i++){
					var layerName = root.childList[i].data.title;
					if (layerName != "作図情報") {
						webtis.clearLayer(layerName);
						this.removeNode(layerName);
						i--;	// 削除した場合はインデックスを１つ戻す。
					}
				}
			}
			this.clearLayerStatus();
		},this)
	);

	// KMLアップロード時に使用するForm
	var kmlUploadButton = kmlPanel.find("#sz_kml_upload_button");
	kmlUploadButton.click(
		$.proxy(function() {
			// alert("KML読込");
			webtis.openKMLFiles();
		},this)
	);

	// ファイルを選択したときに拡張子をチェック
	var kmlFileElement = kmlPanel.find("#sz_kml_file1");
	kmlFileElement.change(
		$.proxy(function(e) {
			// 拡張子は、kml,kmzのみ許可する
			var files = e.target.files;
			if(files){
				for(var i=0; i < files.length; i++){
					var fileName = files[i].name;
					alert(fileName);
					if (!fileName.match(/\.(kml|kmz)$/i)) {
						e.target.value = null;
						alert("アップロード可能なファイルは、kml及びkmzです。");
						return;
					}
				}
			} else{
				// ie用
				var fileName = e.target.value.toLowerCase();
				if (!fileName.match(/\.(kml|kmz)$/i)) {
					e.target.value = null;
						alert("アップロード可能なファイルは、kml及びkmzです。");
					return;
				}
			}
		},this)
	);

	// KML保存ボタンの処理
	var kmlButton = kmlPanel.find("#sz_kml_button");
	kmlButton.click(
		$.proxy(function(e) {
			var dtnode = $("#sakuzutree").dynatree("getActiveNode");
			if (dtnode != null)
			{
				webtis.exportKML(dtnode.data.title);
			}
		}, this)
	);

	// KML一括保存ボタンの処理
	var allKmlButton = kmlPanel.find("#sz_all_kml_button");
	allKmlButton.click(
		$.proxy(function(e) {
			var layerNames = new Array();
			var root = this.getRoot();
			for (var i = 0; i < root.childList.length; i++){
				var layerName = root.childList[i].data.title;
				layerNames.push(layerName);
			}
			webtis.exportKML(layerNames);
		}, this)
	);

	// 「アイコン＋ラベル」チェックボックスの処理
	var checkBoxIcon = kmlPanel.find("#icon_label");
	checkBoxIcon.click(function(){
		alert("アイコン＋ラベルの変更");
	});

	//********* 関数 *************//
	function getRoot() {
		return $("#sakuzutree").dynatree("getRoot");
	}

	function addNode(layer_param) {
	
		var root = this.getRoot();
	
		var idx = root.childList == null ? 0 : root.childList.length;
	
		var childNode = root.addChild({
			title: layer_param.name,
			key: idx,
			select: true,
			icon: false
		});
		
		return childNode;
	}

	function removeNode(title) {
		var root = this.getRoot();
		
		for (var i = 0; i < root.childList.length; i++){
			if (root.childList[i].data.title == title) {
				root.childList[i].remove();
				break;
			}
		}
	}
	
	function changeOpacity(opa) {
		var dtnode = $("#sakuzutree").dynatree("getActiveNode");
		if (dtnode != null)
		{
			webtis.setLayerOpacity(dtnode.data.title, opa);
		}
	}
	
	function disableTree(isDisable) {
		if (isDisable) {
			$("#sakuzutree").dynatree("disable");
		}
		else {
			$("#sakuzutree").dynatree("enable");
		}
	}
	
	function clearLayerStatus() {
		$("#sz_layer_name")[0].innerHTML = layerTitle;
	}

	return this;
};
})(jQuery);


/** OpenLayersのクラスの簡易版 **/
ShowLayer.Class = function() {
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

ShowLayer.extend = function(destination, source) {
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


//-- OpenLayersで使用するときのハンドラー
ShowLayer.OpenLayersDefaultHandler = ShowLayer.Class({
	initialize: function(config) {
//		this.config = config;
		this.mapObj = config.mapObj;
		if (config.webtis) {
			this.webtis = config.webtis;
		}
		if (config.OpenLayers) {
			this.OpenLayers = config.OpenLayers;
		}
	},
	getMapObject : function() {
		return this.mapObj;
	},
	getWebtis: function() {
		if (this.webtis) {
			return this.webtis;
		}
		return webtis;
	},
	getOpenLayers: function() {
		if (this.OpenLayers) {
			return this.OpenLayers;
		}
		return OpenLayers;
	}
});

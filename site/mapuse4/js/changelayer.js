/** レイヤ表示用 JQueryプラグイン実装 **/
var ShowLayer = {};
var receiveDomain = 'http://gp.cyberjapan.jp';

(function($){
jQuery.fn.ShowLayer = function(config) {
	this.config = config;

	var treeData = [{title: "作図情報", key: "edited", select: true, icon: false}];
	var layerTitle = "レイヤー名: ";

	// 作図が行われた処理に対しての委譲先
	this.mapEventHandler = this.config.mapEventHandler;
	if (this.config.inFrame != false) {
		this.config.inFrame = true;
	}

	// 関数を登録
	this.addNode = $.proxy(addNode, this);
	this.removeNode = $.proxy(removeNode, this);
	this.getMapObject = $.proxy(getMapObject,this);
	this.getWebtis = $.proxy(getWebtis,this);
	this.getOpenLayers = $.proxy(getOpenLayers,this);
	this.getRoot = $.proxy(getRoot, this);
	this.init_ctrl = $.proxy(init_ctrl, this);
	this.changeOpacity = $.proxy(changeOpacity, this);
	this.setOpacityStyle = $.proxy(setOpacityStyle, this);
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
						for (var i = 0; i < sakuzuModule.layers.length; i++) {
							if (sakuzuModule.layers[i].filename == dtnode.data.title ||
							    (!sakuzuModule.layers[i].filename && dtnode.data.title == "作図情報")) {
								sakuzuModule.layers[i].setVisibility(true);
							}
						}
					}
					else {
						//checked=trueでなければレイヤ非表示 
						if (sakuzuModule.CurrentMode == "Operation") sakuzuModule.unselectFeature();
						if (sakuzuModule.CurrentMode == "none"){
							sakuzuModule.disablePopupLayer();
							if(dispFlg){
								sakuzuModule.enablePopupLayer();
							}
							if (sakuzuModule.selectPopupCtrl) sakuzuModule.selectPopupCtrl.unselectAll();
						}
						for (var i = 0; i < sakuzuModule.layers.length; i++) {
							if (sakuzuModule.layers[i].filename == dtnode.data.title ||
							(!sakuzuModule.layers[i].filename && dtnode.data.title == "作図情報")){
								sakuzuModule.layers[i].setVisibility(false);
							}
						}
					}
				}, this),

			// 選択状態
			onActivate: function(dtnode) {
				$("#sz_layer_name")[0].innerHTML = layerTitle + dtnode.data.title;
				
				for (var i = 0; i < sakuzuModule.layers.length; i++) {
					
					var layer = sakuzuModule.layers[i];
				
					if (layer.filename == dtnode.data.title ||
					    (!layer.filename && dtnode.data.title == "作図情報")) {
					    
						sakuzuSlider.setOpacity(layer != null ? layer.opacity : 1);
						break;
					}
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
		
		$("#sz_layer_name")[0].innerHTML = layerTitle;
	};

	// KML保存時に使用するForm
	var kmlPanel = $("\
		<div id=\"cs_main\" class=\"ui-widget-content ui-corner-all uiTabPanel\">\
			<div class=\"cs_block\">\
				<div id=\"layer_block\" style=\"solid gray;maximum-height:90px; font-size:12px;\" >\
					<form method=\"post\" enctype=\"multipart/form-data\" id=\"sz_kml_uploadform\" target=\"sz_kml_uploadframe\">\
						<div style=\"float:left;\" id=\"fields\" class=\"sz_kml_files\">\
							<input type=\"hidden\" id=\"sz_kml_file\" name=\"fnm\" value=\"\" />\
							<input type=\"hidden\" id=\"sz_kml_mode\" name=\"mode\" value=\"\" />\
							<input type=\"file\" id=\"sz_kml_file1\" name=\"file1\" style=\"width:200px;\" multiple>\
							<input type=\"hidden\" id=\"sz_kml_url\" name=\"receiveUrl\" value=\"\" />\
						</div>\
						<div style=\"float:right\">\
							<button id=\"sz_kml_upload_button\">読込</button>\
						</div>\
					</form>\
					<button id=\"sz_kml_file_delete\">読込んだファイルを全て削除</button>&nbsp;<br>\
					<iframe id=\"sz_kml_uploadframe\" name=\"sz_kml_uploadframe\" style=\"display:none;height:1px;\" src=\"about:blank\"></iframe>\
					<div id=\"sakuzutree\" style=\"width:270px; height:280px; margin-bottom: 13px;\"></div>\
					<div id=\"layerStatus\" style=\"width:260px; border: 1px solid gray; padding: 2px 0px 1px 4px; margin-bottom: 2px\">\
						<div id=\"sz_layer_name\" style=\"font-size:13px; font-weight: bolder; margin: 4px\"></div>\
						<div style=\"float:left; width:120px\">\
							<div id=\"sz-slider-value\" style=\"font-size:13px\" ></div>\
						</div>\
						<div style=\"float:right; spacing:1px 0px 0px 0px;\">\
							<div id=\"sz-slider\"></div>\
						</div>\
						<div style=\"clear:both; height:2px\"></div>\
						<div class=\"cs_block\">\
							<button id=\"sz_kml_button\" style=\"font-size:12px;\">保存</button>\
							<span id=\"title\">\
								<span id=\"cs_level0\"><font size=2>　　保存形式</font></span>\
								<label><input type=\"radio\" name=\"sz_save_type\" value=\"kml\" style=\"margin-bottom:5px;\" checked><font size=2>kml</font></label>\
								<label><input type=\"radio\" name=\"sz_save_type\" value=\"kmz\" style=\"margin-bottom:5px;\"><font size=2>kmz</font></label>\
							</span>\
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
				// 読み込んだ図形のみ削除
				var count = sakuzuModule.layers.length;
				for (var j = count-1; j >= 0; j--) {
					if (sakuzuModule.layers[j].filename){
						sakuzuModule.deleteLayer(sakuzuModule.layers[j]);
					}
				}
				sakuzuModule.operationHistory.removeAllStacks();
				
				 if (sakuzuModule.CurrentMode == "Operation"){
					// 作図パレットが表示されている場合はこちら
					sakuzuModule.setOperationModeControl();
					sakuzuModule.unselectFeature();
				} else{
					// 作図パレットが表示されていない場合はこちら
					sakuzuModule.disablePopupLayer();
					if (dispFlg){
						sakuzuModule.enablePopupLayer();
					}
					if (sakuzuModule.selectPopupCtrl) {
						sakuzuModule.selectPopupCtrl.unselectAll();
					}
				}
				
				this.clearLayerStatus();
			}
		},this)
	);

	// KMLアップロード時に使用するForm
	var kmlUploadButton = kmlPanel.find("#sz_kml_upload_button");
	kmlUploadButton.click(
		$.proxy(function() {

			// WEBTISの取得
			var webtis = this.getWebtis();

			var files = document.getElementById('sz_kml_file1').files;
			if(files){
				if(files.length == 0){
					// ファイルが選択されていない場合は、エラーメッセージを表示し、処理を終了する。
					alert('ファイルが選択されていません。');
					return false;
				}
			} else{
				if (kmlPanel.find("#sz_kml_file1")[0].value.length == 0) {
					// ファイルが選択されていない場合は、エラーメッセージを表示し、処理を終了する。
					alert('ファイルが選択されていません。');
					return false;
				}
			}
			
			if (!confirm("KMLファイルを表示するため、国土地理院のサーバに転送し処理してよろしいですか。\n" +
						 "※KMLファイルは表示のためだけに処理され、国土地理院のサーバには保存されません。")){
				return false;
			}

			// ファイルが選択されてる場合は、ファイルを読み込み作図情報を地図に表示する。
			var map = this.getMapObject();

			files = kmlPanel.find("#sz_kml_file1")[0].value;
			files = files.substring(files.lastIndexOf("\\")+1,files.length);
			
			var node = this.getRoot();
			for (var i = 0; i < node.childList.length; i++) {
				if (node.childList[i].data.title == files) {
					alert('同じファイル名のファイルが読込まれています。');
					return false;
				}
			}

			$("#sz_kml_url").val(location.href);
			// 読み込み中は操作をブロック
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
			
//			$.blockUI({message: "<h1>ファイルを読み込んでいます・・・・・</h1>", css:{padding: '25px'}});
			// 背景地図選択不可
			var onmouse_state = document.onmousemove;
			document.onmousemove=null;

			var uploadForm = $(this.find("#sz_kml_uploadform"));
			uploadForm.attr("action",READURL);
			uploadForm.submit();

			var timerId = setTimeout("alert('ファイルの読み込みに失敗しました。'); $.unblockUI();", 20000);

			$.receiveMessage(
				function(e){
					clearTimeout(timerId);
					
					// 複数ファイル読み込み時は「|||」で区切るようにする
					// ファイルデータなしの時の処理を加える
					var str = '';
					if(e.data != null && e.data != ''){
						str = e.data.split("|||");
					}
					// 処理中のメッセージを出す
					var count = 0;
					for(var i=0; i < str.length; i++){
						if(str[i] != ''){
							try {
								json = str[i];
								json = json.replace(/\n/g, '<br>');
								//json = $.parseJSON(json);
								json = JSON.parse(json);
								if (json.layer.length > 0){
									Sakuzu.loadJSON(json, true);
									count += json.layer.length;
								}
							}
							catch (e) {
								// javascript処理中にエラーが発生したら、画面ブロックを解除
								$.unblockUI();
								// 背景地図選択不可
								if(onmouse_state != null){
									mousecontrol();
								}
								// パレット出したままでも即座に編集可能にする
								if (sakuzuModule.CurrentMode == "Operation"){
									sakuzuModule.disablePopupLayer();
									sakuzuModule.setOperationModeControl();
									sakuzuModule.unselectFeature();
								}
								alert("ファイル読み込み中に例外が発生しました。");
							}
						}
					}
					if(str == ''){
						alert("ファイル読み込み中に例外が発生しました。");
					}else if(count == 0){
						alert("レイヤーが見つかりませんでした。");
					}
					// 読み込み処理が終了したら画面ブロックを解除
					$.unblockUI();
					// 背景地図選択不可
					if(onmouse_state != null){
						mousecontrol();
					}
					// パレット出したままでも即座に編集可能にする
					if (sakuzuModule.CurrentMode == "Operation"){
						sakuzuModule.disablePopupLayer();
						sakuzuModule.setOperationModeControl();
						sakuzuModule.unselectFeature();
					}

				}, receiveDomain
			);

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

	// KML保存時に使用するForm
	var requestForm = "<form method=\"post\" id=\"sz_kml_form\">";
	requestForm += "<input type=\"hidden\" name=\"content\" value=\"\" id=\"sz_kml_content\">";
	requestForm += "<input type=\"hidden\" name=\"outFmt\" value=\"kml\" id=\"sz_kml_fmt\">";
	requestForm += "<input type=\"hidden\" name=\"fname\" value=\"\" id=\"sz_kml_savefile\">";
	requestForm += "</form>";
	var f = $(requestForm);
	kmlPanel.append(f);

	// KML保存ボタンの処理
	var kmlButton = kmlPanel.find("#sz_kml_button");
	kmlButton.click(function(){
		var save_layers = [];
		var node = $("#sakuzutree").dynatree("getActiveNode");
		var filename;
		
		if (!node){
			// 作図情報のノードを取得
			node = $("#sakuzutree").dynatree("getTree").getNodeByKey("edited");
		}

		if (!node.isSelected()){
			alert("保存する作図情報が存在しません。");
			return;
		}

		if (node.data.title == "作図情報") {
			for (var i = 0; i < sakuzuModule.layers.length; i++) {
				// 選択レイヤのみ保存
				if (!sakuzuModule.layers[i].filename) {
					save_layers.push(sakuzuModule.layers[i]);
					var current = Sakuzu.getCurrent();
					var type = $('input[name="sz_save_type"]:checked').val();
					filename = "gsi" + current + "." + type;
				}
			}
		}
		else {
			for (var i = 0; i < sakuzuModule.layers.length; i++) {
				if (sakuzuModule.layers[i].filename == node.data.title){
					save_layers.push(sakuzuModule.layers[i]);
					filename = sakuzuModule.layers[i].filename;
				}
			}
		}
	
		if(save_layers.length > 0){
			$("#sz_kml_form").attr("action",SAVEURL);
			//  アップロードするJSONのコンテンツを作成
			var content = Sakuzu.makeJSONString(save_layers, Sakuzu.baseProjection);
			var type = $('input[name="sz_save_type"]:checked').val();
			$("#sz_kml_content").val(content);
			$("#sz_kml_fmt").val(type);
			$("#sz_kml_savefile").val(filename);
			$("#sz_kml_form").submit();
		} else {
			alert("保存する作図情報が存在しません。");
		}
	});

	// KML一括保存ボタンの処理
	var allKmlButton = kmlPanel.find("#sz_all_kml_button");
	allKmlButton.click(
		$.proxy(function() {
			// WEBTISの取得
			var webtis = this.getWebtis();
			var save_layers = [];

			// 表示レイヤのみ保存
			var root = this.getRoot();
			var selectedNodes = root.tree.getSelectedNodes();
			
			for (var i = 0; i < selectedNodes.length; i++) {
				for (var j = 0; j < sakuzuModule.layers.length; j++) {
				
					if (sakuzuModule.layers[j].filename == selectedNodes[i].data.title ||
						(!sakuzuModule.layers[j].filename && selectedNodes[i].data.title == "作図情報")) {
						save_layers.push(sakuzuModule.layers[j]);
					}
				}
			}

			if(save_layers.length > 0){
				f.attr("action",SAVEURL);
				//  アップロードするJSONのコンテンツを作成
				var content = Sakuzu.makeJSONString(save_layers, Sakuzu.baseProjection);
				var type = $('input[name="sz_save_type"]:checked').val();
				var current = Sakuzu.getCurrent();
				f.find("#sz_kml_content").val(content);
				f.find("#sz_kml_fmt").val(type);
				f.find("#sz_kml_savefile").val("gsi" + current + "." + type);
				f.submit();
			} else {
				alert("保存する作図情報が存在しません。")
			}
		},this)
	);

	//********* 関数 *************//
	// 地図オブジェクトを取得する
	function getMapObject() {
		return this.mapEventHandler.getMapObject();
	}

	// WEBTISを取得する
	function getWebtis() {
		return this.mapEventHandler.getWebtis();
	}

	// OpenLayersを取得する
	function getOpenLayers() {
		return this.mapEventHandler.getOpenLayers();
	}

	function getRoot() {
		return $("#sakuzutree").dynatree("getRoot");
	}

	function addNode(layer_param) {
	
		var root = this.getRoot();
	
		var idx = sakuzuModule == null ? 0 : sakuzuModule.layers.length;
	
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
			for (var i = 0; i < sakuzuModule.layers.length; i++) {
				var layer = sakuzuModule.layers[i];
			
				if (layer.filename == dtnode.data.title) {

					var noFeatureStyle = false;

					for (var j = 0; j < layer.features.length; j++)
					{
						var feature = layer.features[j];

						if (feature.style == null) {
							noFeatureStyle = true;
							break;
						}

						// 透過度の設定
						var tmpStyle = feature.style.defaultStyle ? feature.style.defaultStyle : feature.style.styles['default'].defaultStyle;
						this.setOpacityStyle(tmpStyle, layer.affixStyle, opa);
					}

					// featureにスタイルが設定されていなければ、レイヤーのstyleを設定
					if (noFeatureStyle) {

						// 透過度の設定
						this.setOpacityStyle(layer.styleMap.styles['default'].defaultStyle, layer.affixStyle, opa);
					}
					
					layer.opacity = opa;
					layer.redraw();
				}
				else if (layer.filename == null && dtnode.data.title == '作図情報') {
					
					for (var j = 0; j < layer.features.length; j++) {
						var feature = layer.features[j];

						// 透過度の設定
						var tmpStyle = feature.style.defaultStyle ? feature.style.defaultStyle : feature.style.styles['default'].defaultStyle;
						this.setOpacityStyle(tmpStyle, layer.affixStyle, opa);
					}
					
					layer.opacity = opa;
					layer.redraw();
				}
			}
		}
	}
	
	function setOpacityStyle(targetStyle, affixStyle, opa) {

		// 画像の透過度
		if (targetStyle.graphicOpacity != null) {
			targetStyle.graphicOpacity = (!affixStyle.graphicOpacity ? 1 : affixStyle.graphicOpacity) * (opa == 0 ? 0.01 : opa);
		}

		// 線の透過度
		if (targetStyle.strokeOpacity != null) {
			targetStyle.strokeOpacity = (!affixStyle.strokeOpacity ? 1 : affixStyle.strokeOpacity) * (opa == 0 ? 0.01 : opa);
		}

		// 背景色の透過度
		if (targetStyle.fillOpacity != null) {
			targetStyle.fillOpacity = (!affixStyle.fillOpacity ? 1 : affixStyle.fillOpacity) * (opa == 0 ? 0.01 : opa);
		}
		
		// 文字の透過度
		if (targetStyle.fontOpacity != null) {
			// アイコン＋ラベルがoffならば、文字が見えないような透過度を設定
			targetStyle.fontOpacity = (!affixStyle.fontOpacity ? 1 : affixStyle.fontOpacity) * ((opa == 0 || !iconlabel) ? 0.01 : opa);
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

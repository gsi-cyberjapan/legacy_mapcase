/** 作図用 JQueryプラグイン実装 **/
var Sakuzu= {};
var READURL = ""; // deleted the old domain.
var SAVEURL = ""; // deleted the old domain.

Sakuzu.SERVER_ROOT = "http://maps.gsi.go.jp"; // deleted the old domain.
Sakuzu.IMAGE_ROOT = "http://cyberjapandata.gsi.go.jp/portal/sys/v4/image/";

// アイコン
Sakuzu.SymbolTable = {
		baseURL: "http://cyberjapandata.gsi.go.jp/portal/sys/v4/symbols/",
		files:
			[
				'001.png', '002.png', '003.png', '004.png', '005.png', '006.png', '007.png', '008.png', '009.png', '010.png',
				'011.png', '012.png', '013.png', '014.png', '015.png', '016.png', '017.png', '018.png', '019.png', '020.png',
				'021.png', '022.png', '023.png', '024.png', '025.png', '026.png', '027.png', '028.png', '029.png', '030.png',
				'031.png', '032.png', '033.png', '034.png', '035.png', '036.png', '037.png', '038.png', '039.png', '040.png',
				'041.png', '042.png', '043.png', '044.png', '045.png', '046.png', '047.png', '048.png', '049.png', '050.png',
				'051.png', '052.png', '053.png', '054.png', '055.png', '056.png', '057.png', '058.png', '059.png', '060.png',
				'061.png', '062.png', '063.png', '064.png', '065.png', '066.png', '067.png', '068.png', '069.png', '070.png',
				'071.png', '072.png', '073.png', '074.png', '075.png', '076.png', '077.png', '078.png', '079.png', '080.png',
				'081.png', '082.png', '083.png', '084.png', '085.png', '086.png', '087.png', '088.png', '089.png', '090.png',
				'091.png', '092.png', '093.png', '094.png', '095.png', '096.png', '097.png', '098.png', '099.png', '100.png',
				'101.png', '102.png', '103.png', '104.png', '105.png', '106.png', '107.png', '108.png', '109.png', '110.png',
				'111.png', '112.png', '113.png', '114.png', '115.png', '116.png', '117.png', '118.png', '119.png', '120.png',
				'121.png', '122.png', '123.png', '124.png', '125.png', '126.png', '127.png', '128.png', '129.png', '130.png',
				'131.png', '132.png', '133.png', '134.png', '135.png', '136.png', '137.png', '138.png', '139.png', '140.png',
				'141.png', '142.png', '143.png', '144.png', '145.png', '146.png', '147.png', '148.png', '149.png', '150.png',
				'151.png', '152.png', '153.png', '154.png', '155.png', '156.png', '157.png', '158.png', '159.png', '160.png',
				'161.png', '162.png', '163.png', '164.png', '165.png', '166.png', '167.png', '168.png', '169.png', '170.png',
				'171.png', /*'172.GIF', '173.GIF', '174.GIF', '175.GIF', '176.GIF', '177.GIF', '178.GIF', '179.GIF',*/ '180.png',
				'181.png', '182.png', '183.png', '184.png', '185.png', '186.png', '187.png', '188.png',            '200.png', 
				'201.png', '202.png', '203.png', '204.png', '205.png', '206.png', '207.png', '208.png', '209.png', '210.png',
				'211.png', '212.png', '213.png', '214.png', '215.png', '216.png', '217.png',
				'dot.png'
				// 最後にコンマがあるとエラーになる。
			]
};
// カラーパレット
Sakuzu.ColorTable = [[[255,255,255],[255,216,216],[255,255,216],[255,255,216],[255,255,216],[255,255,216],[216,255,216],[216,255,255],[216,255,255],[216,255,255],[216,255,255],[216,216,255],[255,216,255],[255,216,255],[255,216,255],[255,216,255]],
[[238,238,238],[255,192,192],[255,255,192],[255,255,192],[255,255,192],[255,255,192],[192,255,192],[192,255,255],[192,255,255],[192,255,255],[192,255,255],[192,192,255],[255,192,255],[255,192,255],[255,192,255],[255,192,255]],
[[221,221,221],[255,168,168],[255,243,168],[255,255,168],[255,255,168],[255,255,168],[168,255,168],[168,255,243],[168,255,255],[168,255,255],[168,255,255],[168,168,255],[243,168,255],[255,168,255],[255,168,255],[255,168,255]],
[[204,204,204],[255,144,144],[255,219,144],[255,246,144],[255,255,144],[232,255,144],[144,255,144],[144,255,219],[144,255,246],[144,255,255],[144,232,255],[144,144,255],[219,144,255],[246,144,255],[255,144,255],[255,144,232]],
[[187,187,187],[255,120,120],[255,195,120],[255,222,120],[255,255,120],[208,255,120],[120,255,120],[120,255,195],[120,255,222],[120,255,255],[120,208,255],[120,120,255],[195,120,255],[222,120,255],[255,120,255],[255,120,208]],
[[170,170,170],[255, 96, 96],[255,171, 96],[255,198, 96],[255,255, 96],[184,255, 96],[ 96,255, 96],[ 96,255,171],[ 96,255,198],[ 96,255,255],[ 96,184,255],[ 96, 96,255],[171, 96,255],[198, 96,255],[255, 96,255],[255, 96,184]],
[[153,153,153],[255, 72, 72],[255,147, 72],[255,174, 72],[255,255, 72],[160,255, 72],[ 72,255, 72],[ 72,255,147],[ 72,255,174],[ 72,255,255],[ 72,160,255],[ 72, 72,255],[147, 72,255],[174, 72,255],[255, 72,255],[255, 72,160]],
[[136,136,136],[255, 48, 48],[255,123, 48],[255,150, 48],[255,255, 48],[136,255, 48],[ 48,255, 48],[ 48,255,123],[ 48,255,150],[ 48,255,255],[ 48,136,255],[ 48, 48,255],[123, 48,255],[150, 48,255],[255, 48,255],[255, 48,136]],
[[119,119,119],[255, 24, 24],[255, 99, 24],[255,126, 24],[255,255, 24],[112,255, 24],[ 24,255, 24],[ 24,255, 99],[ 24,255,126],[ 24,255,255],[ 24,112,255],[ 24, 24,255],[ 99, 24,255],[126, 24,255],[255, 24,255],[255, 24,112]],
[[102,102,102],[255,  0,  0],[255, 75,  0],[255,102,  0],[255,255,  0],[ 88,255,  0],[  0,255,  0],[  0,255, 75],[  0,255,102],[  0,255,255],[  0, 88,255],[  0,  0,255],[ 75,  0,255],[102,  0,255],[255,  0,255],[255,  0, 88]],
[[ 85, 85, 85],[226,  0,  0],[226, 67,  0],[226, 94,  0],[226,226,  0],[ 80,226,  0],[  0,226,  0],[  0,226, 67],[  0,226, 94],[  0,226,226],[  0, 80,226],[  0,  0,226],[ 67,  0,226],[ 94,  0,226],[226,  0,226],[226,  0, 80]],
[[ 68, 68, 68],[197,  0,  0],[197, 59,  0],[197, 86,  0],[197,197,  0],[ 72,197,  0],[  0,197,  0],[  0,197, 59],[  0,197, 86],[  0,197,197],[  0, 72,197],[  0,  0,197],[ 59,  0,197],[ 86,  0,197],[197,  0,197],[197,  0, 72]],
[[ 51, 51, 51],[168,  0,  0],[168, 51,  0],[168, 78,  0],[168,168,  0],[ 64,168,  0],[  0,168,  0],[  0,168, 51],[  0,168, 78],[  0,168,168],[  0, 64,168],[  0,  0,168],[ 51,  0,168],[ 78,  0,168],[168,  0,168],[168,  0, 64]],
[[ 34, 34, 34],[139,  0,  0],[139, 43,  0],[139, 70,  0],[139,139,  0],[ 56,139,  0],[  0,139,  0],[  0,139, 43],[  0,139, 70],[  0,139,139],[  0, 56,139],[  0,  0,139],[ 43,  0,139],[ 70,  0,139],[139,  0,139],[139,  0, 56]],
[[ 17, 17, 17],[110,  0,  0],[110, 35,  0],[110, 62,  0],[110,110,  0],[ 48,110,  0],[  0,110,  0],[  0,110, 35],[  0,110, 62],[  0,110,110],[  0, 48,110],[  0,  0,110],[ 35,  0,110],[ 62,  0,110],[110,  0,110],[110,  0, 48]],
[[  0,  0,  0],[ 81,  0,  0],[ 81, 27,  0],[ 81, 54,  0],[ 81, 81,  0],[ 40, 81,  0],[  0, 81,  0],[  0, 81, 27],[  0, 81, 54],[  0, 81, 81],[  0, 40, 81],[  0,  0, 81],[ 27,  0, 81],[ 54,  0, 81],[ 81,  0, 81],[ 81,  0, 40]]] ;

//作図ボタンインスタンス
var sz_buttonControl;

// 作図ボタンを定義
webtis.Control.sz_button = OpenLayers.Class(OpenLayers.Control, {
	
	createCtrlImage: function(url, left, handler) {
		var image = document.createElement('img');
		image.src = url;
		image.id = "img_sakuzu";
		image.disabled = false;
		image.title = "作図機能";
		image.style.position = "absolute";
		image.style.left = left + "px";
		image.style.width = '66px';
		image.style.height = '31px';
		if (handler) {
			// only handle click
			OpenLayers.Event.observe(image, "mousedown", 
				OpenLayers.Function.bindAsEventListener(function(e) {
					OpenLayers.Event.stop(e);
					return false;
				}, this));
			OpenLayers.Event.observe(image, "click", 
				OpenLayers.Function.bindAsEventListener(handler, this));
			OpenLayers.Event.observe(image, "dblclick", 
				OpenLayers.Function.bindAsEventListener(function(e) {
					OpenLayers.Event.stop(e);
					return false;
				}, this));
		}
		this.div.appendChild(image);
	},
	
	draw: function (px) {
		if (this.div == null) {
			var mapSize = this.map.getSize();
			
			this.div = OpenLayers.Util.createDiv(this.id);
			this.div.style.position = "absolute";
			this.div.style.top = 10 + "px";
			this.div.style.right = 250 + "px";
 
			this.createCtrlImage(Sakuzu.IMAGE_ROOT + "sakuzu.png", 0, function(e) {
				openSakuzu(this);
				OpenLayers.Event.stop(e);
				return false;
			});
		return this.div;
		}
	},
	
	adjustPositionOnMapResize: function() {
		if (this.div != null) {
			var mapSize = this.map.getSize();
			this.div.style.top = 10 + "px";
		}
	},
	
	CLASS_NAME: "webtis.Control.sz_button"
});

/*作図機能のウインドウを表示する関数*/
function openSakuzu(){
	if (!document.getElementById("img_sakuzu").disabled){
		sakuzuModule.disablePopupLayer();
		sakuzuModule.setOperationModeControl();
		sakuzuModule.unselectFeature();
		document.getElementById('sakuzuPalette').style.display="block";//表示する
		sakuzuModule.updatePaletteButtons(true);
		sakuzuModule.oKeyboard.activate();

		/* 右クリック制御解除 */
		mapoClick.deactivate();

		/* 各画面非表示設定 */
		printsizeselectclose();
		clickmapclosefloating();
		closePopup();
		//document.getElementById("showlink").style.display = "none";
		//document.getElementById("showcoordinate").style.display = "none";

		/* 各ボタン非活性設定 */
		changeDisable("img_measure", true);
		changeDisable("img_allow_open", true);
		changeDisable("img_printer", true);
		changeDisable("img_sakuzu", true);
//		document.getElementById("disppopup").disabled = true;

		/* 背景地図選択制御解除 */
		document.onmousemove=null;
	}
}

/*作図機能のウインドウを非表示にする関数*/
function closeSakuzu(){
	//クロムとかでは、imgの無効は効かないようなので・・・
	if (!document.getElementById("sz_palette_close").disabled){
		if (dispFlg){
			sakuzuModule.enablePopupLayer();
		}
		sakuzuModule.updateDrawControls();
		sakuzuModule.CurrentMode = "none";
		sakuzuModule.oKeyboard.deactivate();
		sakuzuModule.disabledLayerList(false);
		
		var length = sakuzuModule.btnObjs.length;
		for (var i=0; i < length; i++){
			sakuzuModule.btnObjs[i].prevAffixStyle = undefined;
		}

		document.getElementById('sakuzuPalette').style.display="none";		//ウインドウを非表示にする
		mapoClick.activate();

		changeDisable("img_measure", false);
		changeDisable("img_allow_open", false);
		changeDisable("img_printer", false);
		changeDisable("img_sakuzu", false);
//		document.getElementById("disppopup").disabled = false;
		mousecontrol();
	}
}

/*作図パネルの操作説明ページを出す*/
function manual(){
	window.open("sakuzu_manual.html","manual","width=800,height=500,menubar=no,toolbar=no,scrollbars=yes");
}

// ツリーで選択されたレイヤーの文字列を作成
function getSelectedLayerString(nextIndex) {

	if (pluginModule) {
		var url = ""
		var idx = nextIndex;
		for (var i = 0; i < pluginModule.length; i++) {
			var ret = pluginModule[i].getSelectedLayerString(idx);
			
			if (ret) {
				url = url + ret.layerString;
				idx = ret.nextIndex;
			}
		}
	
		if (nextIndex < idx){
			return {
				layerString: url,
				nextIndex: idx
			};
		}
	}
}

function setBackgroundColorOpacity(div, opacity) {
	div.css('opacity', opacity);
	div.css('-moz-opacity', opacity);
	div.css('filter', 'alpha( opacity=' + (opacity * 100) + ')');
}

(function(){
jQuery.fn.Sakuzu = function(config) {
	var that = this;
	this.config = config;

	this.CurrentMode = "none";

	this.subPanel = config.subPanel;
	this.mapSharePanel = config.mapSharePanel;	// 「地図の共有」ダイアログ
	this.layerObj = config.layerObj;
	this.mapKeyboardControl = config.mapKeyboardControl;
	
	// 作図が行われた処理に対しての委譲先
	this.mapEventHandler = this.config.mapEventHandler;
	if (this.config.inFrame != false) {
		this.config.inFrame = true;
	}
	// Undo/Redo用スタック
	this.operationHistory = new Sakuzu.OperationHistory(that);

	// 関数を登録
	this.getMapObject = $.proxy(getMapObject,this);
	this.getWebtis = $.proxy(getWebtis,this);
	this.getOpenLayers = $.proxy(getOpenLayers,this);
	this.getSelectedFeatures = $.proxy(getSelectedFeatures,this);
	
	this.enablePopupLayer = $.proxy(enablePopupLayer,this);
	this.disablePopupLayer = $.proxy(disablePopupLayer,this);
	this.init_ctrl = $.proxy(sakuzuInit,this);
	this.setOperationModeControl = $.proxy(setOperationModeControl,this);
	this.updatePaletteButtons = $.proxy(updatePaletteButtons,this);

	this.updateDrawControls = $.proxy(updateDrawControls,this);
	this.unselectFeature = $.proxy(unselectFeature,this);
	this.deleteLayer = $.proxy(deleteLayer,this);
	this.deleteAllLayers = $.proxy(deleteAllLayers,this);
	this.addLayer = $.proxy(addLayer,this);
	this.changeLayerName = $.proxy(changeLayerName,this);
	this.convertToOLStyle = $.proxy(convertToOLStyle,this);
	this.showEditDialog = $.proxy(showEditDialog,this);
	this.createLayerTitlePanel = $.proxy(createLayerTitlePanel,this);
	this.createParameter = $.proxy(createParameter,this);
	this.disabledLayerList = disabledLayerList;
	this.htmlIfrSave = $.proxy(htmlIfrSave, this);
	this.urlSave =  $.proxy(urlSave, this);
	this.getUrlSaveString =  $.proxy(getUrlSaveString, this);
	this.shareMap = $.proxy(shareMap, this);
	this.changeIconlabel = $.proxy(changeIconlabel, this);
	this.getURL =  $.proxy(getURL, this);
	
	var panels = $("#sz_panels");

	this.btnObjs = [];

	// 点ボタン
	this.btnObjs.POINT = this.btnObjs.length;
	this.btnObjs.push(new Sakuzu.PointPanel(that,panels.find("#panel_icon")));
	// 線ボタン
	this.btnObjs.LINE = this.btnObjs.length;
	this.btnObjs.push(new Sakuzu.LinePanel(that,panels.find("#panel_line")));
	// 面ボタン
	this.btnObjs.POLYGON = this.btnObjs.length;
	this.btnObjs.push(new Sakuzu.PolygonPanel(that,panels.find("#panel_polygon")));
	// 円ボタン
	this.btnObjs.CIRCLE = this.btnObjs.length;
	this.btnObjs.push(new Sakuzu.CirclePanel(that,panels.find("#panel_circle")));
	// 文字ボタン
	this.btnObjs.LABEL = this.btnObjs.length;
	this.btnObjs.push(new Sakuzu.TextPanel(that,panels.find("#panel_text")));

	var webtis = this.getWebtis();
	var OpenLayers = this.getOpenLayers();

	// デフォルトは操作コントロール
	var selectCtrl = new webtis.Control.SelectFeature(this.layers, {
		onUnselect : function() {
		}
	});
	this.selectCtrl = selectCtrl;

	// 作図パレット
	var sakuzuPalette = $("\
		<tr><td style=\"width:100%; background-color:#cccccc;\">\
			<table width=\"175\">\
				<tr align=\"center\">\
				<td><button id=\"btn_icon\" title=\"ポイントを追加する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "ICON.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_line\" title=\"ラインを追加する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "LINE.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_polygon\" title=\"ポリゴンを追加する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "POLYGON.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_circle\" title=\"円を追加する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "CIRCLE.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_calc\" title=\"図形を計測する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "MEASUREsz.png); height:35px; width:35px; \"></button></td>\
				</tr>\
				<tr align=\"center\">\
				<td><button id=\"btn_edit_obj\" title=\"図形を編集する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "SETTING.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_sz_undo\" title=\"作図を取り消す\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "UNDO.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_sz_redo\" title=\"作図をやり直す\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "REDO.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_delete_obj\" title=\"選択した図形を削除する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "DELETE.png); height:35px; width:35px; \"></button></td>\
				<td><button id=\"btn_sz_clear\" title=\"全ての作図情報を削除する\" type=\"submit\" style=\"background-image:url(" + Sakuzu.IMAGE_ROOT + "CLEAR.png); height:35px; width:35px; \"></button></td>\
				<td></td>\
				</tr>\
			</table>\
		</td></tr>\
	");

	var paletteButtonImages = ["ICON", "LINE", "POLYGON", "CIRCLE", "MEASUREsz", "SETTING", "UNDO", "REDO", "DELETE", "CLEAR"];

	this.append(this.mainPanel = $(sakuzuPalette));

	//作図パレット内のボタン
	this.paletteButtons = $(sakuzuPalette).find("button");

	var sakuzuPanel = $("");

	// URL発行に使用するForm
	var reqForm = "<form method=\"post\" id=\"sz_url_form\" target=\"sz_url_save_frame\">";
	reqForm += "<input type=\"hidden\" name=\"content\" value=\"\" id=\"sz_url_content\">";
	reqForm += "<input type=\"hidden\" name=\"fname\" value=\"\" id=\"sz_url_savefile\">";
	reqForm += "<input type=\"hidden\" name=\"mode\" value=\"\" id=\"sz_url_mode\">";
	reqForm += "</form>";
	reqForm += "<iframe id=\"sz_url_save_frame\" name=\"sz_url_save_frame\" style=\"display:none;height:1px;\" src=\"about:blank\"></iframe>";
	var saveForm = $(reqForm);
	this.append(saveForm);

	// URL発行
	var urlButtonElement = sakuzuPalette.find("#btn_url");
	$(urlButtonElement).click(
		$.proxy(function(ev) {
			// 地図情報の取得
			var mapinfo = this.createParameter();

			// 作図情報ファイル名を作成 - ランダムなファイル名を作成
			var n = 62;
			var RandomString = '';
			var BaseString ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			//文字列生成  
			for(var i=0; i<8; i++) {
				RandomString += BaseString.charAt( Math.floor( Math.random() * n));
			}
			var filename = "drawfile_" + RandomString;

			// 作図情報ファイルを作成(サーバにて実行)
			saveForm.attr("action",SAVEURL);
			saveForm.find("#sz_url_content").val(mapinfo.json);
			saveForm.find("#sz_url_savefile").val(filename);
			saveForm.find("#sz_url_mode").val("url");
			saveForm.submit();

			// URLを作成
			var url = "./site/mapuse4/index.html?lat=" + mapinfo.lat + "&lon=" + mapinfo.lon + "&z=" + mapinfo.zoomLevel + "&did=" + mapinfo.did + "&fid=" + filename; // deleted the old domain.
			var ret = getSelectedLayerString(1);
			if (ret){
				url = url + ret.layerString;
			}

			// ダイアログを作成
			var panelTitle = "地図表示のURL"
			var urlPanel = "<div id=\"sz_edit_dialog\">";
			urlPanel += "<div style=\"position:relative;top:-10px;margin-top:15px; margin-left:5px; margin-right:5px; margin-bottom:18px;\">";
			urlPanel += "<textarea style=\"width:240px;height:100px;margin-top:5px;margin-bottom:2px;\" id=\"sz_map_textarea\" readonly onclick=\"this.focus();this.select();\"></textarea><br>";
			urlPanel += "<input style=\"float:right\" type=\"button\" name=\"copy\" value=\"クリップボードにコピー\" id=\"sz_url_clipboard\">";
			urlPanel += "</div>";
			var urlDialog = $(urlPanel);
			urlDialog.addClass("ui-widget-content ui-corner-all");
			
			// URLをテキストエリアに設定
			urlDialog.find("#sz_map_textarea").val(url);

			this.editDialog = urlDialog;
			this.subPanel.append(urlDialog);
			this.updateDrawControls();

			// URL表示パネルを表示
			$("#panel_title").html(panelTitle);
			$("#sakuzuPanel").show();
			$("#panel-header").css("background-color","#cccccc");
			$("#panel_title").css("color", "black");
			this.updatePaletteButtons(false,"");

			document.getElementById("sz_panel_close").onclick= ($.proxy(function(ev){
				$("#panel").empty();
				$("#sakuzuPanel").hide();
				this.updatePaletteButtons(true);
				this.setOperationModeControl();
			},this));

		    $("#sz_url_clipboard").zclip({
			    path: "site/mapuse4/js/ZeroClipboard.swf",
			    copy: function(){
			        return $("#sz_map_textarea").val();
		        },
		        beforeCopy:function(){},
		        afterCopy:function(){
		        	$("#sz_panel_close").click();
		        }
		    });

		},this) 
	);

	// HTML保存時に使用するForm
	var requestForm = "<form method=\"post\" id=\"sz_map_form\">";
	requestForm += "<input type=\"hidden\" name=\"did\" value=\"\" id=\"did\">";
	requestForm += "<input type=\"hidden\" name=\"lon\" value=\"\" id=\"lon\">";
	requestForm += "<input type=\"hidden\" name=\"lat\" value=\"\" id=\"lat\">";
	requestForm += "<input type=\"hidden\" name=\"zoomLevel\" value=\"\" id=\"zoomLevel\">";
	requestForm += "<input type=\"hidden\" name=\"json\" value=\"\" id=\"json\">";
	requestForm += "<input type=\"hidden\" name=\"deffile\" value=\"\" id=\"deffile\">";
	requestForm += "<input type=\"hidden\" name=\"mapurl\" value=\"\" id=\"mapurl\">";
	requestForm += "</form>";
	var savehtml = $(requestForm);
	this.append(savehtml);

	// HTML保存
	var htmlButtonElement = sakuzuPalette.find("#btn_html");
	$(htmlButtonElement).click(
		$.proxy(function(ev) {
			this.htmlIfrSave();
		},this)
	);

	// 図形を計測
	var calcButtonElement = sakuzuPalette.find("#btn_calc")[0];
	$(calcButtonElement).click(
		$.proxy(function(ev) {
		
			//操作モードに遷移
			this.setOperationModeControl();

			// ダイアログを作成
			var panelTitle = "図形の計測"
			var urlPanel = "<div id=\"sz_edit_dialog\">";
			urlPanel += "<div style='margin:5px;'>";
			urlPanel += "<p style=\"font-size:12px;padding-bottom:4px;\">図形を選択し計測を実行してください。</p>";
			urlPanel += "<select id=\"sz_calcunit\"><option value=\"1\">(平方)メートル</option><option value=\"0.001\">(平方)キロメートル</option></select>";
			urlPanel += " <button id=\"calcObjectsResult\">計測</button><br>";
			urlPanel += "<input type=\"text\" id=\"calcObjectsResult\" style=\"width:230px;\" readonly><br>";
			urlPanel += "<p style=\"font-size:12px;color:red;\">※線および面データのみ計測可能です。</p>";
			urlPanel += "</div></div>";

			var urlDialog = $(urlPanel);
			urlDialog.addClass("ui-widget-content ui-corner-all");

			calcButtonElement = urlDialog.find("#calcObjectsResult");
			calcButtonElement.click($.proxy(function(e){
				var calcUnitElement = document.getElementById("sz_calcunit");
				var unitValue = calcUnitElement.options[calcUnitElement.selectedIndex].value;

				var calcResultElement = urlDialog.find("#calcObjectsResult");

				// 図形を計測
				var selected = this.getSelectedFeatures();
				if (!selected || selected.length == 0) {
					alert("図形を選択してください。");
					return;
				}

				var mode;
				if (selected[0].layer.styleType == "polygon") {
					mode = "area";
				} else if (selected[0].layer.styleType == "string") {
					mode = "distance";
				} else {
					calcResultElement.value = "";
					alert("対応していない形状種別です。");
					return;
				}
				var geometries = [];
				for (var i = 0; i < selected.length; i++) {
					if ((mode == "area" && selected[i].geometry.CLASS_NAME != "OpenLayers.Geometry.Polygon")||
						(mode == "distance" && selected[i].geometry.CLASS_NAME != "OpenLayers.Geometry.LineString")) {
						calcResultElement.value = "";
						alert("同じ形状種別のオブジェクトを選択してください。");
						return;
					}
					geometries.push(selected[i].geometry);
				}
				var OpenLayers = this.getOpenLayers();
				var result2 = Sakuzu.calcGeo2(geometries,unitValue,this.getMapObject().getProjectionObject(),Sakuzu.baseProjection,OpenLayers);
				$(calcResultElement).val(result2.toFixed(6));
			},this));

			this.editDialog = urlDialog;
			this.subPanel.append(urlDialog);
			//this.updateDrawControls();

			// 図形計測パネルを表示
			$("#panel_title").html(panelTitle);
			$("#sakuzuPanel").show();
			$("#panel-header").css("background-color","#cccccc");
			$("#panel_title").css("color", "black");
			this.updatePaletteButtons(false,"");

			document.getElementById("sz_panel_close").onclick= ($.proxy(function(ev){
				$("#panel").empty();
				$("#sakuzuPanel").hide();
				this.updatePaletteButtons(true);
			},this));

		},this)
	);

	// 点
	var iconButtonElement = sakuzuPalette.find("#btn_icon");
	$(iconButtonElement).click(
		$.proxy(function(ev) {
			var newControls = this.btnObjs[this.btnObjs.POINT].selected();
			this.updateDrawControls(newControls);
			this.btnObjs.OPERATION = this.btnObjs.POINT;
			disabledLayerList(true);
			this.CurrentMode = "Drawing";
		},this) 
	);

	// 線
	var iconButtonElement = sakuzuPalette.find("#btn_line");
	$(iconButtonElement).click(
		$.proxy(function(ev) {
			var newControls = this.btnObjs[this.btnObjs.LINE].selected();
			this.updateDrawControls(newControls);
			this.btnObjs.OPERATION = this.btnObjs.LINE;
			disabledLayerList(true);
			this.CurrentMode = "Drawing";
		},this) 
	);

	// 面
	var iconButtonElement = sakuzuPalette.find("#btn_polygon");
	$(iconButtonElement).click(
		$.proxy(function(ev) {
			var newControls = this.btnObjs[this.btnObjs.POLYGON].selected();
			this.updateDrawControls(newControls);
			this.btnObjs.OPERATION = this.btnObjs.POLYGON;
			disabledLayerList(true);
			this.CurrentMode = "Drawing";
		},this) 
	);

	// 円
	var iconButtonElement = sakuzuPalette.find("#btn_circle");
	$(iconButtonElement).click(
		$.proxy(function(ev) {
			var newControls;
			this.btnObjs[this.btnObjs.CIRCLE].selected(this,newControls);
			this.btnObjs.OPERATION = this.btnObjs.CIRCLE;
			disabledLayerList(true);
			this.CurrentMode = "Drawing";
		},this) 
	);

	// 文字
	var iconButtonElement = sakuzuPalette.find("#btn_label");
	$(iconButtonElement).click(
		$.proxy(function(ev) {
			var newControls = this.btnObjs[this.btnObjs.LABEL].selected();
			this.updateDrawControls(newControls);
			this.btnObjs.OPERATION = this.btnObjs.LABEL;
			disabledLayerList(true);
			this.CurrentMode = "Drawing";
		},this) 
	);

	// 図形を編集
	var editButtonElement = sakuzuPalette.find("#btn_edit_obj")[0];
	$(editButtonElement).click(
		$.proxy(function(ev) {
			if (this.CurrentMode == "Editing"){
				$.proxy(setOperationModeControl,this)();
				this.updatePaletteButtons(true);
				disabledLayerList(false);
			}else{
				$.proxy(setEditModeControl,this)();
				this.updatePaletteButtons(false,"btn_edit_obj");
				disabledLayerList(true);
			}
		},this) 
	);

	// 図形を削除
	var deleteButtonElement = sakuzuPalette.find("#btn_delete_obj")[0];
	$(deleteButtonElement).click(
		$.proxy(function(ev) {
			// 図形を削除
			var deleted = this.getSelectedFeatures(true);
			if (deleted.length>0){
				for (var i = 0; i < deleted.length; i++) {
					this.selectCtrl.unselect(deleted[i]);
					var lastLayer =deleted[i].layer; 
					deleted[i].layer.removeFeatures(deleted[i]);
					if (lastLayer.features.length == 0) {
						this.deleteLayer(lastLayer);
					}
				}
				// 削除されたオブジェクト UNDO用に残す
				this.operationHistory.add('del', deleted);
				this.setOperationModeControl();
			}else{
				alert("図形を選択してください");
			}
		},this) 
	);
		
	// 取り消す
	var undoButtonElement = sakuzuPalette.find("#btn_sz_undo")[0];
	$(undoButtonElement).click(
		$.proxy(function(ev) {
			
			// 取り消し
			this.operationHistory.undo();
		},this) 
	);

	// やり直す
	var redoButtonElement = sakuzuPalette.find("#btn_sz_redo")[0];
	$(redoButtonElement).click(
		$.proxy(function(ev) {
			// 取り消し
			this.operationHistory.redo();
		},this) 
	);

	// クリア
	var clearButtonElement = sakuzuPalette.find("#btn_sz_clear")[0];
	$(clearButtonElement).click(
		$.proxy(function(ev) {
			if (confirm("作図した全ての図形を削除してもよろしいですか？\n※この操作は取り消せません")){
				// クリア(作図した情報のみ)
				var count = this.layers.length;
				for (var j = count-1; j >= 0; j--) {
					if (!this.layers[j].filename) {
						this.deleteLayer(this.layers[j]);
					}
				}
				this.operationHistory.removeAllStacks();
				this.setOperationModeControl();
			}
		},this) 
	);

	this.oKeyboard = new OpenLayers.Control.Keyboard({eventMethods:{
		'keydown':$.proxy(function(e){
			var deleteButtonElement = sakuzuPalette.find("#btn_delete_obj")[0];
			if (!deleteButtonElement.disabled){
				if (e.keyCode==46){
					// 図形を削除
					var deleted = this.getSelectedFeatures(true);
					if (deleted.length>0){
						for (var i = 0; i < deleted.length; i++) {
							this.selectCtrl.unselect(deleted[i]);
							var lastLayer =deleted[i].layer; 
							deleted[i].layer.removeFeatures(deleted[i]);
							if (lastLayer.features.length == 0) {
								this.deleteLayer(lastLayer);
							}
						}
						// 削除されたオブジェクト UNDO用に残す
						this.operationHistory.add('del', deleted);
						this.setOperationModeControl();
					}
				}
			}
		},this)
	}});
	this.getMapObject().addControl(this.oKeyboard);




	// 初期状態
	this.layers = [];

	//********* 関数 *************//
	function sakuzuInit() {
		// 地図オブジェクトが読み込まれた時点で呼び出します。
		var webtis = this.getWebtis();
		this.affixLayer = new Sakuzu.LayerVector("_affix_layer");
		this.affixLayer.affixStyle = {};
		this.getMapObject().addLayer(this.affixLayer);
		var OpenLayers = this.getOpenLayers();
		Sakuzu.baseProjection = new OpenLayers.Projection("EPSG:4326");
		return;
	}

	//作図パレットのボタンの活性・非活性切り替え
	function updatePaletteButtons(enable,id){
		if (enable){
			for (var i=0; i<this.paletteButtons.length; i++){
				this.paletteButtons[i].disabled=false;
				$(this.paletteButtons[i]).css("background-image","url(" + Sakuzu.IMAGE_ROOT + paletteButtonImages[i] + ".png)");
			}
			document.getElementById("sz_palette_close").src= Sakuzu.IMAGE_ROOT + "close.png";
			document.getElementById("sz_palette_close").title="作図機能を終了する";
			document.getElementById("sz_palette_close").disabled=false;
		}else{
			for (var i=0; i<this.paletteButtons.length; i++){
				if (this.paletteButtons[i].id != id) {
					this.paletteButtons[i].disabled=true;
					$(this.paletteButtons[i]).css("background-image","url(" + Sakuzu.IMAGE_ROOT + paletteButtonImages[i] + "_N.png)");
				}
			}
			
			if (id!="btn_edit_obj"){
				document.getElementById("sz_palette_close").src=Sakuzu.IMAGE_ROOT + "close_N.png";
				document.getElementById("sz_palette_close").disabled=true;
			}
		}
	}

	// 作図レイヤーのリストとその関連コントロールをdisable
	function disabledLayerList(enable){
		$("#showlayerTab *").attr("disabled",enable);
		layerModule.disableTree(enable);
		sakuzuSlider.disableSlider(enable);
	}

	//操作モードに設定
	function setOperationModeControl(){
		if (this.layers.length>0){
			var lonlat;
			var selectCtrl = new webtis.Control.SelectFeature(this.layers, {
			onUnselect : function() {
			}
			});
			var activeCtrl = new webtis.Control.MultiLayerDragFeature(this.layers, {
				onStart: $.proxy( function(feature, pixel) {
					if (!feature.layer.JSGISelection) {
						return;
					}
					lonlat=feature.geometry.getBounds().getCenterLonLat();

					//強制的に選択状態にします
					selectCtrl.unselect(feature);
					selectCtrl.clickFeature(feature);
				},this),
				onComplete: $.proxy(function(feature, pixel) {
					//強制的に選択状態にします
					selectCtrl.unselect(feature);
					selectCtrl.clickFeature(feature);
					if (lonlat != feature.geometry.getBounds().getCenterLonLat()){
						this.operationHistory.add('move', { "feature" : feature, "center" : lonlat});
					}
				},this)
			});
			this.updateDrawControls([selectCtrl,activeCtrl]);
			this.selectCtrl = selectCtrl;
		}else{
			this.updateDrawControls();
		}
		disabledLayerList(false);
		this.CurrentMode = "Operation";
	}

	//編集モードに設定
	function setEditModeControl(){
		var selectCtrl = new webtis.Control.SelectFeature(this.layers, {
			onSelect : $.proxy(function() {
				// 図形を編集
				var selectedFeatures = this.getSelectedFeatures(true);
				// 編集画面を表示
				this.showEditDialog(selectedFeatures,true);
			},this)
		});

		this.updateDrawControls([selectCtrl]);
		this.selectCtrl = selectCtrl;
		this.CurrentMode = "Editing";
	}

	
	// 作図レイヤを削除
	function deleteLayer(sakuzuLayer) {
		var newLayers = new Array();
		for (var j = 0; j < this.layers.length; j++) {
			if (this.layers[j] != sakuzuLayer) {
				newLayers.push(this.layers[j]);
			}
		}
		this.layers = newLayers;
		this.getMapObject().removeLayer(sakuzuLayer);

		/* ファイル読込みで作成されたレイヤの場合 */
		if (sakuzuLayer.filename){
			var exist=false;
			/* 同じfilenameを持つレイヤが他に無いかチェック */
			for (var i=0; i<this.layers.length; i++){
				if (sakuzuLayer.filename == this.layers[i].filename){
					exist = true;
					break;
				}
			}
			/* 無ければリストから削除 */
			if (!exist) {
				layerModule.removeNode(sakuzuLayer.filename);
			}
		}
	}

	// 作図レイヤを全て削除(読み込みファイル込み)
	function deleteAllLayers() {
		var newLayers = new Array();
		for (var j = 0; j < this.layers.length; j++) {
			this.getMapObject().removeLayer(this.layers[j]);
			if (this.layers[j].filename){
				var listElement = document.getElementById(this.layers[j].filename);
				if (listElement) listElement.parentNode.removeChild(listElement);
			}
		}
		this.layers = new Array();
	}

	// 作図レイヤを追加
	function addLayer(sakuzuLayer) {
		this.layers.push(sakuzuLayer);
		this.getMapObject().addLayer(sakuzuLayer);
	}

	// 描画用Controlを更新
	function updateDrawControls(newControls) {
		if (this.currentControls) {
			for (var i = 0; i < this.currentControls.length;i++) {
				var currentControl = this.currentControls[i];
				if (currentControl.CLASS_NAME == "OpenLayers.Control.SelectFeature" || currentControl.CLASS_NAME == "webtis.Control.SelectFeature") {
					// 選択中のオブジェクトを選択解除にする
					currentControl.unselectAll();
				}
				this.getMapObject().removeControl(currentControl);
				currentControl.deactivate();
				currentControl.destroy();
			}
			delete this.currentControls;
		}
		if (newControls) {
			for (var i = 0; i < newControls.length; i++) {
				var newControl = newControls[i];
				that.getMapObject().addControl(newControl);
				newControl.activate();
			}
			this.currentControls = newControls;
		}
	}
	
	// 選択中のFeatureを解除
	function unselectFeature(feature) {
		if (this.layers.length > 0 && this.selectCtrl.layers > 0) {
			if (feature) {
				this.selectCtrl.unselect(feature);
			} else {
				this.selectCtrl.unselectAll();
			}
		}
	}
	
	// 地図オブジェクトを取得する
	function getMapObject() {
		return that.mapEventHandler.getMapObject();
	}
	
	// WEBTISを取得する
	function getWebtis() {
		return this.mapEventHandler.getWebtis();
	}

	// OpenLayersを取得する
	function getOpenLayers() {
		return that.mapEventHandler.getOpenLayers();
	}
	
	// レイヤー名変更
	function changeLayerName(feature,newLayerName,withoutRedraw) {
		var targetLayer = feature.layer;
		targetLayer.name = newLayerName;
		return true;

		// 同じレイヤー名でかつ同じ種別のレイヤーがあるかを調べる
		var sameNameLayers = new Array();

		if (sameNameLayers.length == 0) {
			if (targetLayer.features.length == 1) {
				// 同じ名前はなくて、一件だけなので、そのまま変更処理。
				targetLayer.name = newLayerName;
				return true;
			}
		}

		return true;
	}

	// ポップアップの対象となるレイヤーのリストを返す
	function collectAllLayers() {
		var collectedLayers = that.layers;
		
		if (treeModule != null) {
			var treeLayers = treeModule.getVectorLayers();
			collectedLayers = collectedLayers.concat(treeLayers);
		}
		
//		if (extraTreeModule != null) {
//			var extraLayers = extraTreeModule.getVectorLayers();
//			collectedLayers = collectedLayers.concat(extraLayers);
//		}
		if (pluginModule != null) {
			for (var i = 0; i < pluginModule.length; i++) {
				var extraLayers = pluginModule[i].getVectorLayers();
				collectedLayers = collectedLayers.concat(extraLayers);
			}
		}
		
		if (jsonLayers) {
			collectedLayers = collectedLayers.concat(jsonLayers);
		}

		return collectedLayers;
	}

	// ポップアップを有効にする
	function enablePopupLayer(layer) {
		// 前のコントロールを無効にする
		if (this.selectPopupCtrl) {
			this.getMapObject().removeControl(this.selectPopupCtrl);
			this.selectPopupCtrl.deactivate();
			this.selectPopupCtrl.destroy();
			delete this.selectPopupCtrl;
			this.selectPopupCtrl = null;
		}

		var collectedLayers = collectAllLayers();

		if (collectedLayers.length > 0) {
			var webtis = this.getWebtis();
//			ポップアップ表示タイミング　オブジェクトオン⇒オブジェクトクリックに変更
//			this.selectPopupCtrl = new webtis.Control.SelectFeature(this.layers, { hover : true });
			this.selectPopupCtrl = new webtis.Control.SelectFeature(collectedLayers, { hover : false });
//			this.selectPopupCtrl = new webtis.Control.SelectFeature(collectedLayers[0], { hover : false });
			
			// Feature上で地図をドラッグ移動できるようにする
			this.selectPopupCtrl.handlers.feature.stopDown = false;
			
			this.getMapObject().addControl(this.selectPopupCtrl);
			this.selectPopupCtrl.activate();
			// layerに未登録の時だけ登録する。
			if (!this.popup) {
				this.popup = new Sakuzu.Popup(this.getMapObject(),$.proxy(function(_feature) {
					this.selectPopupCtrl.unselect(_feature);
				},this));
				var OpenLayers = this.getOpenLayers();
				this._popup_selected = OpenLayers.Function.bindAsEventListener(this.popup.onFeatureSelectPopup,this.popup);
				this._popup_unselected = OpenLayers.Function.bindAsEventListener(this.popup.onFeatureUnselectPopup,this.popup);
			}
			if (layer) {
				if (!(layer.events.listeners['featureselected'] && layer.events.listeners['featureselected'].length > 0)) {
					layer.events.on({
						'featureselected': this._popup_selected,
						'featureunselected': this._popup_unselected
					});
				}
			}  else {
				for (var i=0; i<collectedLayers.length; i++) {
					if (!(collectedLayers[i].events.listeners['featureselected'] && collectedLayers[i].events.listeners['featureselected'].length > 0)) {
						collectedLayers[i].events.on({
							'featureselected': this._popup_selected,
							'featureunselected': this._popup_unselected
						});
					}
				}
			}
		}
	}

	// ポップアップを解除します。
	function disablePopupLayer() {
		if (this.popup) {
			this.popup.removePopup();
		}
		// 前のコントロールを無効にする
		if (this.selectPopupCtrl) {
			this.selectPopupCtrl.unselectAll();
			this.getMapObject().removeControl(this.selectPopupCtrl);
			this.selectPopupCtrl.deactivate();
			this.selectPopupCtrl.destroy();
			delete this.selectPopupCtrl;
			this.selectPopupCtrl = null;
		}

		var collectedLayers = collectAllLayers();

		for (var i=0; i<collectedLayers.length; i++) {
			// イベントを未登録にする
			collectedLayers[i].events.un({
				'featureselected': this._popup_selected,
				'featureunselected': this._popup_unselected
			});
			// フィチャーのポップアップをクリーンアップする
			for (var j=0; j< collectedLayers[i].features.length; j++) {
				if (collectedLayers[i].features[j].popup) {
					this.getMapObject().removePopup(collectedLayers[i].features[j].popup);
					collectedLayers[i].features[j].popup = null;
				}
			}
		}
	}

	// affixStyleをOpenLayersのスタイルに変換
	function convertToOLStyle(affixStyle) {	
		var styleType = affixStyle.type.toLowerCase();
		var webtis = this.getWebtis();
		var OpenLayers = this.getOpenLayers();
		var style = null;
		if (styleType == "symbol") {
			// シンボル
			if (affixStyle['font']) {
				var textSize = affixStyle['font'].size;
				var textParam = textSize.split(",");
				var fontSize = textParam[0];
				var dynamic = textParam[1]=="dynamic";
				var fontFamily = affixStyle['font'].name;
			}
			else {
				var textSize = "12px";
				var fontSize = "12px";
				var dynamic = true;
				var fontFamily = 'ＭＳ ゴシック';
			}

			var symbol = affixStyle['symbol'];
			var widthParam = symbol["size"].split(",");
			var iconSize = parseInt(widthParam[0], 10);

			var opacity = 0;
			var labelXoffset = 0;
			var labelSelect = true;

			opacity = iconlabel ? 1 : 0.00001;
			labelXoffset = iconSize/2;
/*
			if(iconlabel){
				opacity = 1;
				labelXoffset = iconSize/2;
			} else{
				opacity = 0;
				labelXoffset = 0;
			}

			if (iconlabel && affixStyle["symbol"].uri!="") labelSelect = false;
*/
			var defaultStyle = new OpenLayers.Style({
				'fillOpacity' : 1,
				'fill' : true,
				'externalGraphic' : affixStyle["symbol"].uri,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': labelXoffset,
				'fontColor' : Sakuzu.deciColorToCSSHex(affixStyle["rgb"]),
				'fontOpacity' : opacity,
				'fontFamily' : fontFamily, // affixStyle['font'].name,
				'fontSize' : fontSize,
				'labelAlign' : "lm",
				'labelSelect' : labelSelect,
				'JSGIDynamicSize' : dynamic
			});
			var selectStyle = new OpenLayers.Style({
				'fillOpacity' : 1,
				'fill' : true,
				'externalGraphic' : affixStyle["symbol"].uri,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': labelXoffset,
				'fontColor' : Sakuzu.deciColorToCSSHex(affixStyle["rgb"]),
				'fontOpacity' : opacity,
				'fontFamily' : fontFamily, // affixStyle['font'].name,
				'fontSize' : fontSize,
				'labelAlign' : "lm",
				'labelSelect' : labelSelect
			});
			style = new OpenLayers.StyleMap({"default":defaultStyle, "select":selectStyle});
/*
			var symbol = affixStyle['symbol'];
			var widthParam = symbol["size"].split(",");
			var strokeWidth = widthParam[0];
			var dynamic = widthParam[1]=="dynamic";

			style = new OpenLayers.Style({
				'externalGraphic' : affixStyle.symbol.uri,
				'graphicWidth' : "${getSize}",
				'graphicHeight' : "${getSize}",
				'graphicXOffset' : "${getOffset}",
				'graphicYOffset' : "${getOffset}",
				'graphicOpacity' : affixStyle.transparent ? 1 : 1,
				'JSGIDynamicSize' : dynamic
			}, {
				context : {
					getSize : function(feature) {
						if (dynamic) {
							return Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, strokeWidth));
						} else {
							return strokeWidth;
						}
					},
					getOffset : function(feature) {
						if (dynamic) {
							var size = Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, strokeWidth));
							return -(Math.round(size/2));
						} else {
							return -(Math.round(strokeWidth/2));
						}
					}
				}
			});
*/
		} else if (styleType == "string") {
			// 線
			var widthParam = affixStyle["width"].split(",");
			var strokeWidth = widthParam[0];
			var dynamic = widthParam[1]=="dynamic";
			style = new OpenLayers.Style({
				'strokeColor' : Sakuzu.deciColorToCSSHex(affixStyle['rgb']),
				'strokeWidth' : '${getSize}',
				'strokeDashstyle' : "solid",
				'strokeOpacity' : affixStyle['transparent']=="ON" ? 0.5 : 1,
				'strokeLinecap' : "square",
				'JSGIDynamicSize' : dynamic
			},
			{
				context : {
					getSize : function(feature) {
						if (dynamic) {
							var size = Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, strokeWidth));
							return (size < 1) ? 1 : size;
						} else {
							return strokeWidth;
						}
					}
				}
			});
		} else if (styleType == "polygon") {
			// ポリゴン
			var widthParam = affixStyle["width"].split(",");
			var strokeWidth = widthParam[0];
			var dynamic = widthParam[1]=="dynamic";

			var fillOpacity = affixStyle['fillOpacity'] == 0 ? 0.00001 : affixStyle['fillOpacity'];

			var defaultStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : Sakuzu.deciColorToCSSHex(affixStyle['rgb']),
				'strokeWidth' : '${getSize}',
				'strokeDashstyle' : "solid",
				'fillOpacity' : affixStyle['transparent']=="ON" ? fillOpacity : 1,
				'strokeOpacity' : affixStyle['transparent']=="ON" ? 0.5 : 1,
				'fillColor' : Sakuzu.deciColorToCSSHex(affixStyle['hrgb']),
				'brush' : affixStyle['paint'],
				'fill' : true,
				'strokeLinecap' : "square",
				'JSGIDynamicSize' : dynamic
			},
			{
				context : {
					getSize : function(feature) {
						if (dynamic) {
							var size = Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, strokeWidth));
							return (size < 1) ? 1 : size;
						} else {
							return strokeWidth;
						}
					}
				}
			});
			// 選択した時のスタイル　ポリゴンはここで設定
			var selectStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : "#0000FF",
				'strokeWidth' : "${getSize}",
				'strokeDashstyle' : "solid",
				'strokeOpacity' : 0.7,
				'fillOpacity' : 0.7,
				'fillColor' : "#0000FF",
				'brush' : "solid",
				'fill' : true
			},
			{
				context : {
					getSize : function(feature) {
						if (dynamic) {
							var size = Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, strokeWidth));
							return (size < 1) ? 1 : size;
						} else {
							return strokeWidth;
						}
					}
				}
			});
			style = new OpenLayers.StyleMap({"default":defaultStyle, "select":selectStyle});
		} else if (styleType == "circle") {
			// 円
			var widthParam = affixStyle["width"].split(",");
			var strokeWidth = widthParam[0];
			var dynamic = widthParam[1]=="dynamic";

			var fillOpacity = affixStyle['fillOpacity'] == 0 ? 0.00001 : affixStyle['fillOpacity'];

			var defaultStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : Sakuzu.deciColorToCSSHex(affixStyle['rgb']),
				'strokeWidth' : strokeWidth,
				'strokeDashstyle' : "solid",
				'strokeOpacity' : affixStyle['transparent']=="ON" ? 0.5 : 1,
//				'fillOpacity' : affixStyle['transparent']=="ON" ? 0.5 : 1,
				'fillOpacity' : affixStyle['transparent']=="ON" ? fillOpacity : 1,
				'fillColor' : Sakuzu.deciColorToCSSHex(affixStyle['hrgb']),
				'brush' : affixStyle['paint'],
				'fill' : true,
				'strokeLinecap' : "square",
				'pointRadius' : "${getRadius}",
				'JSGIDynamicSize' : dynamic
			},
			{
				context : {
					getSize : function(feature) {
						if (dynamic) {
							var size = Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, strokeWidth));
							return (size < 1) ? 1 : size;
						} else {
							var calcGeom = feature.geometry.clone();
							calcGeom = calcGeom.transform(feature.layer.map.getProjectionObject(),Sakuzu.baseProjection);
							var lonLat = new OpenLayers.LonLat(calcGeom.x,calcGeom.y);
							var horiLatLon = OpenLayers.Util.destinationVincenty(lonLat,90,feature.pointRadius);
							var pix = feature.layer.map.getPixelFromLonLat(lonLat.transform(Sakuzu.baseProjection,feature.layer.map.getProjectionObject()));
							var horiPix = feature.layer.map.getPixelFromLonLat(horiLatLon.transform(Sakuzu.baseProjection,feature.layer.map.getProjectionObject()));
							var radiusPixel = Math.round(horiPix.x - pix.x);
							if (radiusPixel*2 > strokeWidth) {
								return strokeWidth;
							} else {
								return strokeWidth - (strokeWidth - radiusPixel*2);
							}
						}
					},
					getRadius : function(feature) {
						var calcGeom = feature.geometry.clone();
						calcGeom = calcGeom.transform(feature.layer.map.getProjectionObject(),Sakuzu.baseProjection);
						var lonLat = new OpenLayers.LonLat(calcGeom.x,calcGeom.y);
						var horiLatLon = OpenLayers.Util.destinationVincenty(lonLat,90,feature.pointRadius);
						var pix = feature.layer.map.getPixelFromLonLat(lonLat.transform(Sakuzu.baseProjection,feature.layer.map.getProjectionObject()));
						var horiPix = feature.layer.map.getPixelFromLonLat(horiLatLon.transform(Sakuzu.baseProjection,feature.layer.map.getProjectionObject()));
						return Math.round(horiPix.x - pix.x);
						// メルカトルに関係なくやるのならこちら
						// return Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, feature.pointRadius));
					}
				}
			});
			// 選択した時のスタイル　ポリゴンはここで設定
			var selectStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : "#0000FF",
				'strokeWidth' : strokeWidth,
				'strokeDashstyle' : "solid",
				'strokeOpacity' : 0.7,
				'fillOpacity' : 0.7,
				'fillColor' : "#0000FF",
				'brush' : "solid",
				'pointRadius' : "${getRadius}",
				'fill' : true
			},
			{
				context : {
					getRadius : function(feature) {
						var calcGeom = feature.geometry.clone();
						calcGeom = calcGeom.transform(feature.layer.map.getProjectionObject(),Sakuzu.baseProjection);
						var lonLat = new OpenLayers.LonLat(calcGeom.x,calcGeom.y);
						var horiLatLon = OpenLayers.Util.destinationVincenty(lonLat,90,feature.pointRadius);
						var pix = feature.layer.map.getPixelFromLonLat(lonLat.transform(Sakuzu.baseProjection,feature.layer.map.getProjectionObject()));
						var horiPix = feature.layer.map.getPixelFromLonLat(horiLatLon.transform(Sakuzu.baseProjection,feature.layer.map.getProjectionObject()));
						return Math.round(horiPix.x - pix.x);
						// メルカトルに関係なくやるのならこちら
						// return Math.round(webtis.Format.Parse.metersToPixel(feature.layer.map, feature.pointRadius));
					}
				}
			
			});
			style = new OpenLayers.StyleMap({"default":defaultStyle, "select":selectStyle});
		} else if (styleType == "text") {
			// 文字
			var textSize = affixStyle['font'].size;
			var textParam = textSize.split(",");
			var fontSize = textParam[0];
			var dynamic = textParam[1]=="dynamic";

			var symbol = affixStyle['symbol'];
			var widthParam = symbol["size"].split(",");
			var iconSize = parseInt(widthParam[0], 10);

			var opacity = 0;
			var labelXoffset = 0;
			var labelSelect = true;
			
			opacity = 1;
			labelXoffset = iconSize/2;
			
/*
			if(iconlabel){
				opacity = 1;
				labelXoffset = iconSize/2;
			} else{
				opacity = 0;
				labelXoffset = 0;
			}
			if (iconlabel && affixStyle["symbol"].uri!="") labelSelect = false;
*/
			var defaultStyle = new OpenLayers.Style({
				'fillOpacity' : opacity,
				'fill' : true,
				'externalGraphic' : affixStyle["symbol"].uri,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': labelXoffset,
				'fontColor' : Sakuzu.deciColorToCSSHex(affixStyle["rgb"]),
				'fontOpacity' : 1,
				'fontFamily' : affixStyle['font'].name,
				'fontSize' : fontSize,
				'labelAlign' : "lm",
				'labelSelect' : labelSelect,
				'JSGIDynamicSize' : dynamic
			});
			var selectStyle = new OpenLayers.Style({
				'fillOpacity' : opacity,
				'fill' : true,
				'externalGraphic' : affixStyle["symbol"].uri,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': labelXoffset,
				'fontColor' : Sakuzu.deciColorToCSSHex(affixStyle["rgb"]),
				'fontOpacity' : 1,
				'fontFamily' : affixStyle['font'].name,
				'fontSize' : fontSize,
				'labelAlign' : "lm",
				'labelSelect' : labelSelect
			});
			style = new OpenLayers.StyleMap({"default":defaultStyle, "select":selectStyle});
		}
		return style;
	}	

	// 選択中のオブジェクトを取得
	function getSelectedFeatures() {
		var selected = [];
		for (var oi=0; oi<this.layers.length; oi++) {
			var layer = this.layers[oi];
			if (!layer.JSGISelection) {
				continue;
			}

			for (var j=0; j < layer.selectedFeatures.length; j++) {
				var feature = layer.selectedFeatures[j];
				if (feature.popup) {
					this.getMapObject().removePopup(feature.popup);
					feature.popup.destroy();
					feature.popup = null;
				}
				feature._layer = layer;
				selected.push(feature);
			}
		}
		return selected;
	}

	/** レイヤ名変更用パネル **/
	function createLayerTitlePanel(feature) {
		var dialogStr = "<div style='margin:5px; display:none'>";
		dialogStr += "<table><tr class=\"sz_title\"><td>レイヤ名</td><td><input type=\"text\" style=\"width:175px;\" id=\"sz_layer_name_text\"></td></tr></table>";
		dialogStr += "</div>";
		
		var d = $(dialogStr);
		if (feature) {
			var layerName = feature.layer.name;
			if (layerName.indexOf("_affix_.")==0) {
				layerName = layerName.substring(8);
			}

			d.find("#sz_layer_name_text")[0].value = layerName;
		}
		return d;
	}


	/** 編集用ダイアログを表示 **/
	function showEditDialog(selectedFeatures, edit) {
		if (selectedFeatures.length == 0) {
			return;
		}

		var styleType = null;
		// ダイアログを作成
		var dialogStr = "<div id=\"sz_edit_dialog\"></div>";
		var editDialog = $(dialogStr);
		editDialog.addClass("ui-widget-content ui-corner-all");

		$("#panel").empty();

		if (selectedFeatures.length == 1) {
			// 1つだけの単一の場合は、全部編集可
			var feature = selectedFeatures[0];

			styleType = feature.layer.styleType;
			styleType = styleType.toLowerCase();

			// レイヤタイトルパネル
			if (edit) var layerTitlePanel = this.createLayerTitlePanel(feature);

			// 属性値設定画面
			//var attributePanel = this.createAttributePanel(feature);
			editDialog.feature = feature;

			// スタイル設定画面
			var currentObj = null;
			var currentPanel = null;
			var panelTitle = "";
			if (styleType == "symbol") {
				currentObj = this.btnObjs[this.btnObjs.POINT];
				if (edit){
					panelTitle = "編集(ポイント)"
				}else{
					panelTitle = "新規ポイント"
				}
			} else if (styleType == "string") {
				currentObj = this.btnObjs[this.btnObjs.LINE];
				if (edit){
					panelTitle = "編集(ライン)"
				}else{
					panelTitle = "新規ライン"
				}
			} else if (styleType == "polygon") {
				currentObj = this.btnObjs[this.btnObjs.POLYGON];
				if (edit){
					panelTitle = "編集(ポリゴン)"
				}else{
					panelTitle = "新規ポリゴン"
				}
			} else if (styleType == "circle") {
				currentObj = this.btnObjs[this.btnObjs.CIRCLE];
				if (edit){
					panelTitle = "編集(円)"
				}else{
					panelTitle = "新規円"
				}
			} else if (styleType == "text") {
				currentObj = this.btnObjs[this.btnObjs.LABEL];
				if (edit){
					panelTitle = "編集(テキスト)"
				}else{
					panelTitle = "新規テキスト"
				}
			}

			var attributePanel;
			if (currentObj != null) {
				currentPanel = currentObj.createStylePanel(feature.layer.affixStyle);
				currentObj.setDrawStyle(feature.layer.affixStyle,currentPanel);
				editDialog.append(currentPanel);
				attributePanel = currentObj.createAttributePanel(feature);
			}
			if (edit) editDialog.append(layerTitlePanel);
			editDialog.append(attributePanel);

			var controlPanel = $("<div style=\"margin:5px;text-align:center;width:100%;\"><button id=\"sz_edit_applybutton\">決定</button><button id=\"sz_edit_closebutton\">キャンセル</button></div>");
			editDialog.append(controlPanel);
			// 決定ボタンの処理
			controlPanel.find("#sz_edit_applybutton").click(
					$.proxy(function(ev) {
						if (currentObj) {
							var attributes = currentObj.retrieveAttributes(attributePanel);
							if (styleType == "text") {
								if (jQuery.trim(attributes.name).length == 0) {
									alert("文字列が必要です。");
									return;
								}
							}
						}

						if (edit){
							var newLayerName = jQuery.trim(layerTitlePanel.find("#sz_layer_name_text")[0].value);
							if (newLayerName.length == 0) {
								alert("レイヤ名を指定して下さい。");
								return;
							}
							// 取り消しように保存
							var targetFeatures = jQuery.extend([],this.editDialog.feature.layer.features);
							this.operationHistory.add('edit', { "feature":this.editDialog.feature,"features":targetFeatures, "style" : this.editDialog.feature.style,"affixStyle" : this.editDialog.feature.layer.affixStyle, "attributes" : this.editDialog.feature.attributes});

							// レイヤ名の変更
							if (newLayerName != this.editDialog.feature.layer.name.substring(8)) {
								// レイヤ名の変更処理が必要
								if (!this.changeLayerName(this.editDialog.feature,"_affix_."+newLayerName)) {
									// エラー
									if (window.console) {
										window.console.log("fail to changeLayerName");
									}
									return;
								}
								this.operationHistory.removeAllStacks();
							} else {
							}
						}else{
							this.operationHistory.add('new', { "feature" : this.editDialog.feature});
						}

						// レイヤのスタイルを変更
						if (currentObj) {
							var attributes = currentObj.retrieveAttributes(attributePanel);
							if (styleType == "text" || styleType == "symbol") {
								this.editDialog.feature.geometry.label = jQuery.trim(attributes.name);
							}
							// スタイルを取得
							var affixStyle = currentObj.retrieveDrawStyle(currentPanel);
							this.editDialog.feature.layer.affixStyle = affixStyle;
							// this.editDialog.feature.affixStyle = affixStyle;
							this.editDialog.feature.attributes = attributes;
							var style = this.convertToOLStyle(affixStyle);
							this.editDialog.feature.style = style;
							if (this.editDialog.feature.layer.styleMap){
								this.editDialog.feature.layer.styleMap = style;
							}
							// 同じレイヤのfeatureのスタイルは、すべて変わります。
							/*for (var i = 0; i < this.editDialog.feature.layer.features.length; i++) {
								// スタイルを取得して、featureのスタイルに設定
								this.editDialog.feature.layer.features[i].style = style;
							}*/

							this.editDialog.feature.layer.redraw();
						}
						editDialog.dialog("destroy");
						$("#panel").empty();
						$("#sakuzuPanel").hide();
						this.updatePaletteButtons(true);
						if (!edit) {
							this.setOperationModeControl();
						}else{
							this.updatePaletteButtons(false,"btn_edit_obj");
						}
						this.selectCtrl.unselect(feature);
						this.mapKeyboardControl.activate();
						if (!edit) disabledLayerList(false);
						
						if(!edit) {
							currentObj.prevAffixStyle = affixStyle;
						}
					
					},this)
				);
			// キャンセルボタンの処理
			controlPanel.find("#sz_edit_closebutton").click(
				$.proxy(function(ev) {
					editDialog.dialog("destroy");
					$("#sz_edit_dialog").remove();

					if (!edit){
						if (this.editDialog.feature.layer.features.length == 1) {
							this.deleteLayer(this.editDialog.feature.layer);
						}else{
							this.editDialog.feature.layer.removeFeatures(this.editDialog.feature);
						}
					}

					$("#panel").empty();
					$("#sakuzuPanel").hide();
					this.updatePaletteButtons(true);
					if (!edit) {
						this.setOperationModeControl();
					}else{
						this.updatePaletteButtons(false,"btn_edit_obj");
					}
					if (edit) this.selectCtrl.unselect(feature);
					this.mapKeyboardControl.activate();
					if (!edit) disabledLayerList(false);
				},this)
			);
		}

		this.editDialog = editDialog;
		this.subPanel.append(editDialog);
		if (!edit) this.updateDrawControls();

		//上部「×」ボタンクリックの処理
		document.getElementById("sz_panel_close").onclick= ($.proxy(function(ev){
			editDialog.dialog("destroy");
			$("#sz_edit_dialog").remove();

			if (!edit){
				if (this.editDialog.feature.layer.features.length == 1) {
					this.deleteLayer(this.editDialog.feature.layer);
				}else{
					this.editDialog.feature.layer.removeFeatures(this.editDialog.feature);
				}
			}

			$("#panel").empty();
			$("#sakuzuPanel").hide();
			this.updatePaletteButtons(true);
			if (!edit) {
				this.setOperationModeControl();
			}else{
				this.updatePaletteButtons(false,"btn_edit_obj");
			}
			this.selectCtrl.unselect(feature);
			this.mapKeyboardControl.activate();
			if (!edit) disabledLayerList(false);
		},this));


		$("#panel_title").html(panelTitle);
		$("#sakuzuPanel").show();
		if (edit){
			$("#panel-header").css("background-color","#f6a828");
			$("#panel_title").css("color", "white");
		}else{
			$("#panel-header").css("background-color","#cccccc");
			$("#panel_title").css("color", "black");
		}
		this.updatePaletteButtons(false,"");
		this.mapKeyboardControl.deactivate();
	}

	/* URL発行、HTML保存処理phpに渡す地図情報を取得 */
	function createParameter(nodes) {
		var webtis = this.getWebtis();

		// メタデータ(表示地図)の取得
		var mapMeta = webtisMap.getCurrentMetaData();
		var did;
		if (mapMeta) {
			did = mapMeta.dataId;
		}

		// 中心経緯度の取得
		var lonlat = this.getMapObject().getCenter().clone().transform(this.getMapObject().getProjectionObject(),Sakuzu.baseProjection);
		lon = lonlat.lon;
		lat = lonlat.lat;

		// ズームレベルの取得
		var zoomLevel = this.getMapObject().getZoom();		//世界地図用

		// 作図情報の取得
		if (!nodes) nodes = Sakuzu.makeJSONNodes(this.layers, Sakuzu.baseProjection);
		var json = Sakuzu.makeJSONNodesToString(nodes);

		var parameter = {
				did : did,
				lon : lon,
				lat : lat,
				zoomLevel : zoomLevel,
				json:json
		};
		return parameter;
	}
	
	/* 地図を共有（外部呼出し用）*/
	function shareMap() {
		
		// 印刷メニューを非表示に
		printsizeselectclose();
		
		// 作図ウィンドウを非表示に
		closeSakuzu();
		
		// ダイアログを作成
		var panelTitle = "地図を共有"
		var urlPanel = "<div id=\"sz_edit_dialog\">";
		urlPanel += "<div style=\"position:relative;top:-10px;margin-top:15px; margin-left:5px; margin-right:5px; margin-bottom:18px;\">";
		urlPanel += "<input type=\"button\" name=\"url\" value=\"地図をインターネットで共有\" id=\"shareUrl\"><br>";
		urlPanel += "<input type=\"button\" name=\"html\" value=\"地図をHTMLファイルで共有\" id=\"shareHtml\">";
		urlPanel += "</div>";
		var shareDialog = $(urlPanel);
		shareDialog.addClass("ui-widget-content ui-corner-all");
		
		this.shareDialog = shareDialog;
		this.subPanel.empty();
		this.subPanel.append(shareDialog);
		
		//「地図をインターネットで共有」ボタン
		$("#shareUrl").click($.proxy(function(){

			// 作図情報の取得
			var nodes = Sakuzu.makeJSONNodes(this.layers, Sakuzu.baseProjection);
			
			var cnt = 0;
			for (var i in nodes) { if (nodes[i].layer) cnt += nodes[i].layer.length; }

     		var mapinfo = this.createParameter(nodes);

			if (cnt > 0) {
				// 作図情報ワーニング
				if (!window.confirm('作図情報は、30日間国土地理院のサーバーに保管され、取得したURLをご存知の方はどなたでもアクセス可能になります。\n※なお、読込んだKMLファイルを含む作図情報が大容量の場合等、システムからの警告なしに上記保存に失敗するケースがございます事を予めご了承ください。（詳細調査中）')) {
					return false;
				}

				// 作図情報ファイル名を作成 - ランダムなファイル名を作成
				var n = 62;
				var RandomString = '';
				var BaseString ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
				//文字列生成  
				for(var i=0; i<8; i++) {
					RandomString += BaseString.charAt( Math.floor( Math.random() * n));
				}
				var filename = "drawfile_" + RandomString;

				// 作図情報ファイルを作成(サーバにて実行)
				saveForm.attr("action",SAVEURL);
				saveForm.find("#sz_url_content").val(mapinfo.json);
				saveForm.find("#sz_url_savefile").val(filename);
				saveForm.find("#sz_url_mode").val("url");
				saveForm.submit();
			}
			
			//現在表示地図のhttp表示
			var lat = String(Math.floor(mapinfo.lat * 1000000) / 1000000);
			var lon = String(Math.floor(mapinfo.lon * 1000000) / 1000000);
		    var url = getURL() + "?lat=" + lat + "&lon=" + lon + "&z=" + mapinfo.zoomLevel + "&did=" + mapinfo.did;
		    if (filename) url += ("&fid=" + filename);
			var ret = getSelectedLayerString(1);
			if (ret){
				url = url + ret.layerString;
			}
/*
		    var treeparam = treeModule.getSelectedLayerString();
			if (treeparam) url = url + "&" + treeparam;
*/
			// 地図情報の取得
			var parameter = $.proxy(that.createParameter,that)();

			// HTML保存用データを送る
		    window.sendArgument = url;
		    window.sentMapParam = parameter;
		    
		    window.open("httplink.html","httplink","width=500,height=360,menubar=no,toolbar=no,scrollbar=no");
		    
    		// ダイアログ閉じる
			this.subPanel.empty();
			$("#sakuzuPanel").hide();

		}, this));

		//「地図をHTMLファイルで共有」ボタン
		$("#shareHtml").click($.proxy(function(){
			this.htmlIfrSave();
			
			// ダイアログ閉じる
			this.subPanel.empty();
			$("#sakuzuPanel").hide();

		}, this));
		
		// パネルを表示
		$("#panel_title").html(panelTitle);
		$("#sakuzuPanel").show();
		$("#panel-header").css("background-color","#cccccc");
		$("#panel_title").css("color", "black");
		
		document.getElementById("sz_panel_close").onclick= ($.proxy(function(ev){
			this.subPanel.empty();
			$("#sakuzuPanel").hide();
		},this));
	}

	/* HTML保存（外部呼出し用・iFrame使用）*/
	function htmlIfrSave() {
		// 作図情報の取得
		var nodes = Sakuzu.makeJSONNodes(this.layers, Sakuzu.baseProjection);
		var cnt = 0;
		for (var i in nodes) { if (nodes[i].layer) cnt += nodes[i].layer.length; }
		
		if (cnt > 0) {
			var ret = confirm("作図情報を含むHTMLファイルを作成します。\n" +
							  "作図情報は国土地理院のサーバにいったん転送されて処理されますが、国土地理院のサーバには保存しません。");
                      
            if (!ret) {
            	return;
            }
		}

		var json = Sakuzu.makeJSONNodesToString(nodes);
		var gejson = convertGeoJSON(json)

		var parameter = {};

		try {
			// 地図情報の取得
			mapinfo = $.proxy(that.createParameter,that)();
			//現在の時刻取得
			var current = Sakuzu.getCurrent();

			// ファイルに地図情報を設定して、ダウンロード
			savehtml.attr("action","site/mapuse4/save/ifrsave_html.php");
			
			var lat = String(Math.floor(mapinfo.lat * 1000000) / 1000000);
			var lon = String(Math.floor(mapinfo.lon * 1000000) / 1000000);
			var url = getURL() + "?lat=" + lat + "&lon=" + lon + "&z=" + mapinfo.zoomLevel + "&did=" + mapinfo.did + "&rvg=1&fsc=1&skz=0";
			if (centercross) url += ("&crs=1");	// 中心位置の十字線
			var ret = getSelectedLayerString(1);
			if (ret){
				url = url + ret.layerString;
			}
/*		    
		    var treeparam = treeModule.getSelectedLayerString();
			if (treeparam) url = url + "&" + treeparam;
*/
			savehtml.find("#json").val(gejson);
			savehtml.find("#deffile").val("gsi" + current + ".html");
			savehtml.find("#mapurl").val(url);
			savehtml.submit();
		}
		catch (e) {
			alert("html保存中に例外が発生しました。");
		}
		
	}

	/* URL保存（外部呼出し用）*/
	function urlSave(isURL) {

		// 作図情報の取得
		var nodes = Sakuzu.makeJSONNodes(this.layers, Sakuzu.baseProjection);
		
		var cnt = 0;
		for (var i in nodes) { if (nodes[i].layer) cnt += nodes[i].layer.length; }
		
		if (cnt > 0) {
			var ret = confirm("作図情報を含むURLは、発行後30日間、そのURLをご存じの方にはどなたにもアクセス可能となります。\n" +
                      "作図情報は、国土地理院のサーバに保存されます。よろしいですか。\n\n" +
                      "尚、読み込んだKMLファイルを含む作図情報が大容量の場合等、システムからの警告なしに上記保存に失敗するケースがございます事を予めご了承下さい。\n" +
                      "（詳細調査中）");
                      
            if (!ret) {
            	return;
            }
		}
		           
     	var mapinfo = this.createParameter(nodes);

		if (cnt > 0) {
			// 作図情報ファイル名を作成 - ランダムなファイル名を作成
			var n = 62;
			var RandomString = '';
			var BaseString ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			//文字列生成  
			for(var i=0; i<8; i++) {
				RandomString += BaseString.charAt( Math.floor( Math.random() * n));
			}
			var filename = "drawfile_" + RandomString;

			// 作図情報ファイルを作成(サーバにて実行)
			saveForm.attr("action",SAVEURL);
			saveForm.find("#sz_url_content").val(mapinfo.json);
			saveForm.find("#sz_url_savefile").val(filename);
			saveForm.find("#sz_url_mode").val("url");
			saveForm.submit();
		}

	    //現在表示地図のhttp表示
		var lat = String(Math.floor(mapinfo.lat * 1000000) / 1000000);
		var lon = String(Math.floor(mapinfo.lon * 1000000) / 1000000);
		var url = getURL() + "?lat=" + lat + "&lon=" + lon + "&z=" + mapinfo.zoomLevel + "&did=" + mapinfo.did;
//	    var url = "./site/mapuse4/index.html?lat=" + lat + "&lon=" + lon + "&z=" + mapinfo.zoomLevel + "&did=" + mapinfo.did; // deleted the old domain.
	    if (filename) url += ("&fid=" + filename);
	    if (centercross) url += ("&crs=1");	// 中心位置の十字線
	    var activeTab = $('#infoTabs').tabs("option", "selected");
	    if (activeTab != 0) {
	    	url = url + "&tab=" + (activeTab + 1);
	    }
	    var ret = getSelectedLayerString(1);
		if (ret){
			url = url + ret.layerString;
		}
/*
	    var treeparam = treeModule.getSelectedLayerString();
		if (treeparam) url = url + "&" + treeparam;
*/
	    window.sendArgument = url;
	    window.hideURL = !isURL;
	    window.hideIFRAME = isURL;
	    var delimiter = "|";
	    var windowParam = url + delimiter + hideURL + delimiter + hideIFRAME;
	    window.open("./site/mapuse4/httplink.html?httplinkparam=" + windowParam,"httplink","width=480,height=200,menubar=no,toolbar=no,scrollbar=no"); // deleted the old domain.

	}
	
	/* URL保存のURL文字列取得（外部呼出し用）*/
	function getUrlSaveString() {

		// 作図情報の取得
		var nodes = Sakuzu.makeJSONNodes(this.layers, Sakuzu.baseProjection);
		           
     	var mapinfo = this.createParameter(nodes);

	    //現在表示地図のhttp表示
		var lat = String(Math.floor(mapinfo.lat * 1000000) / 1000000);
		var lon = String(Math.floor(mapinfo.lon * 1000000) / 1000000);
		var url = getURL() + "?lat=" + lat + "&lon=" + lon + "&z=" + mapinfo.zoomLevel + "&did=" + mapinfo.did;
	    if (centercross) url += ("&crs=1");	// 中心位置の十字線
	    var ret = getSelectedLayerString(1);
		if (ret){
			url = url + ret.layerString;
		}
		return url;
	}
	
	// アイコンにラベルを表示する/非表示にする
	function changeIconlabel(value) {
		iconlabel = value;
		
		changeIconlabelLayers(value, this.layers);
		
		if (jsonLayers) {
			changeIconlabelLayers(value, jsonLayers);
		}
		
		if (pluginModule) {
			for (var i = 0; i < pluginModule.length; i++) {
				var extraLayers = pluginModule[i].getVectorLayers();
				changeIconlabelLayers(value, extraLayers);
			}
		}
/*
		if (iconlabel){
			//アイコンとラベルを両方表示
			for (var i=0; i<this.layers.length; i++) {
				if (this.layers[i].styleType == 'symbol') {
					var xsize = this.layers[i].styleMap.styles['default'].defaultStyle['graphicWidth'];

					// ラベルを見えるように設定
					this.layers[i].styleMap.styles['default'].defaultStyle['fontOpacity'] = 1;
					this.layers[i].styleMap.styles['select'].defaultStyle['fontOpacity'] = 1;

					this.layers[i].redraw();
				}
			}
		}
		else{
			//アイコンのみ表示
			for (var i=0; i<this.layers.length; i++) {
				if (this.layers[i].styleType == 'symbol') {

					// ラベルを見えないように設定
					this.layers[i].styleMap.styles['default'].defaultStyle['fontOpacity'] = 0.00001;
					this.layers[i].styleMap.styles['select'].defaultStyle['fontOpacity'] = 0.00001;
					
					this.layers[i].redraw();
				}
			}
		}
*/
	}
	
	function changeIconlabelLayers(value, layers) {
		
		var opacity = value ? 1 : 0.00001;
		
		for (var i=0; i < layers.length; i++) {
		
			switch (layers[i].styleType) {
			case 'symbol':

				// ラベルを見えるように設定
				layers[i].styleMap.styles['default'].defaultStyle['fontOpacity'] = opacity;
				layers[i].styleMap.styles['select'].defaultStyle['fontOpacity'] = opacity;

				layers[i].redraw();
				break;
				
			case 'librarykml':
				for (var j = 0; j < layers[i].features.length; j++) {
					layers[i].features[j].style.fontOpacity = opacity;
				}

				layers[i].redraw();
				break;
			}
		}
	}
	
	function getURL() {
		var url = location.href;
		if (url.indexOf("?") >= 0) {
			url = url.substring(0, url.indexOf("?"));
		}
		if (url.indexOf("#") >= 0) {
			url = url.substring(0, url.indexOf("#"));
		}
		return url;
	}

	return this;
};
})(jQuery);

/** OpenLayersのクラスの簡易版 **/
Sakuzu.Class = function() {
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
        Sakuzu.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;
};

Sakuzu.extend = function(destination, source) {
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


/**************************/
/* 抽象パネル                */
/**************************/
Sakuzu.AbstractPanel = Sakuzu.Class({
	initialize: function(sakuzu,tabPanel) {
		this.sakuzu = sakuzu;
		this.stylePanel = this.createStylePanel();
		tabPanel.append(this.stylePanel);
	},
	/** 選択された時に呼び出される。**/
	selected : function() {
	},
	// スタイルパネルの下に追加で表示するパネル
	createAdditionalPanel : function() {
		return null;
	},
	// スタイルパネル
	createStylePanel : function() {
	},
	/** 属性編集用パネル **/
	createAttributePanel : function(feature) {
		var attributePanel = $("\
						<div style=\"border:1px solid gray;padding:2px;margin-top:15px;margin-left:5px; margin-right:5px;\">\
							<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\" id=\"sz_popupattr_title_lbael\">名称</div>\
							<div style=\"position:relative;left:4px;top:-4px;\"><input type=\"text\" id=\"sz_popupattr_title\" style=\"width:250px;margin-right:10px;\">\
						    <span id=\"ghost_text\" style=\"top:4px; left:4px;\">（例：A図書館）</span></div>\
						</div>\
						<div style=\"border:1px solid gray;padding:2px;margin-top:15px;margin-left:5px; margin-right:5px;\">\
							<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">情報</div><div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:12px;\">（<span id=\"desc_table\">表</span>｜<span id=\"desc_notable\">自由文</span>）</div>\
						</div>");

/***
		var attributePanel = $("<div style=\"border:1px solid gray;padding:2px;margin-top:15px;margin-left:5px; margin-right:5px;\">\
						<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">情報（<span id=\"desc_table\">表式</span>｜<span id=\"desc_notable\">表なし</span>）</div>\
						<div style=\"position:relative;top:-10px;\">\
						<table>\
							<tr class=\"sz_title\">\
								<td id=\"sz_popupattr_title_lbael\" >\タイトル</td>\
								<td>\
									&nbsp;<span style=\"position:relative\"><input type=\"text\" id=\"sz_popupattr_title\" style=\"width:150px;\">\
								    <span id=\"ghost_text\" style=\"top:2px; left:4px;\">（例：A図書館）</span></span>\
								</td>\
							</tr>\
						</table>\
						</div></div>");
***/
						
		var attributeTable;

		// 属性情報入力方法切り替え
		// HTML指定フォーマット定義
		var table_start = '<table'
		var tr_start = 'tr'
		var key_start = 'td style="color:#0000FF;padding-right:1em;"'
		var val_start = 'td'
		var link_start = 'a href'
		var link_end = '/a'
		var td_end = '/td'
		var tr_end = '/tr'
		var table_end = '/table>'

		// 構文チェック用変数
		var okflg = 0;				// 構文チェックフラグ
		var status = 0;				// 0:文頭構文チェックＯＫ　1:項目名_取得準備完了　2:値_取得準備完了
		var key = new Array();		// 項目名
		var value = new Array();	// 値
		var j = 0;					// データ数

		if (feature) {
			var attributes = feature.attributes;
			var titleElement = attributePanel.find("#sz_popupattr_title")[0];
			titleElement.value = attributes["name"];
			var title= titleElement.value;
			var result = {
					'name':title
				};
			var description = attributes['description'];
			// description要素の構文チェック
			if (description) {
				var splitItems = description.split("><");
				for(var i = 0; i < splitItems.length; i++) {
					var item = splitItems[i];
					if(i == 0){	
					// 文頭が<table>か？
						if(item != table_start){
							break;
						}
						status = 1;
					} else if(i == splitItems.length-1){
					// 文末が</table>か？
						if(status != 1){
							break;
						}
						if(item != table_end){
							break;
						}
						okflg = 1;
					} else if(status == 1){
					// 【項目名のチェック＆取得】
						// 項目名の文頭構文チェック
						if(item != tr_start){				// <tr>かチェック
							break;
						}
						i = i + 1;
						var item = splitItems[i];
						var keyitem1 = item.split(">");
						if(keyitem1[0] != key_start){		// <td ・・・>かチェック
							break;
						}
						if(keyitem1.length == 2){
						// 項目名の構文チェック＜項目名データあり＞
							var keyitem2 = keyitem1[1].split("<");
							if(keyitem2.length != 2){		//「<」区切りの要素が2個かチェック
								break;
							}
							if(keyitem2[1] != td_end){		// </td>かチェック
								break;
							}
							key[j] = keyitem2[0];			// 項目名データを取得
						} else {
						// 項目名の構文チェック＜項目名データなし(空欄)＞
							i = i + 1;
							var item = splitItems[i];
							if(item != td_end){				// </td>かチェック
								break;
							}
							key[j] = "";					// 項目名データ(空)を取得
						}
						status = 2;
					} else if(status == 2){
					// 【値のチェック＆取得】
						var valitem1 = item.split(">");
						if(valitem1[0] != val_start){		// <td ・・・>かチェック
							break;
						}
						// 値の文末構文チェック＜値データあり(文字列)＞
						if(valitem1.length == 2){
							var valitem2 = valitem1[1].split("<");
							if(valitem2.length != 2){		//「<」区切りの要素が2個かチェック
								break;
							}
							if(valitem2[1] != td_end){		// </td>かチェック
								break;
							}
							i = i + 1;
							var item = splitItems[i];
							if(item != tr_end){				// </tr>かチェック
								break;
							}
							value[j] = valitem2[0];			// 値データを取得
							j = j + 1;
							status = 1;
						} else if(valitem1.length == 1){
							i = i + 1;
							var item = splitItems[i];
							if(item == td_end){				//「/td」かチェック
						// 値の文末構文チェック＜値データなし(空欄)＞
								i = i + 1;
								var item = splitItems[i];
								if(item != tr_end){			// </tr>かチェック
									break;
								}
								value[j] = "";				// 値データ(空)を取得
							} else {
						// 値の文末構文チェック＜値データあり(リンク)＞
								// リンクの文頭構文チェック
								var linkitem1 = item.split("=");
								if(linkitem1[0] != link_start){	// <a href>かチェック
									break;
								}
								// リンクの文末構文チェック
								linkitem1 = item.split(">");
								if(linkitem1.length != 2){		// 「>」区切りの要素が2個かチェック
									break;
								}
								var linkitem2 = linkitem1[1].split("<");
								if(linkitem2.length != 2){		// 「<」区切りの要素が2個かチェック
									break;
								}
								if(linkitem2[1] != link_end){	// </a>かチェック
									break;
								}
								i = i + 1;
								var item = splitItems[i];
								if(item != td_end){				// </td>かチェック
									break;
								}
								i = i + 1;
								var item = splitItems[i];
								if(item != tr_end){				// </tr>かチェック
									break;
								}
								value[j] = linkitem2[0];		// 値データ(リンク)を取得
							}
							j = j + 1;
							status = 1;
						}else{
							break;
						}
					} else {
						break;
					}
				}
			}
			
			// 属性値の親となるdivタグをセット
			var attributeDetailPanel = $("<div id=\"sz_attribute\"></div>");
			attributePanel.append(attributeDetailPanel);

			// ゴーストの設定
			createGhostTextEvents(attributePanel.find("#sz_popupattr_title"), attributePanel.find("#ghost_text"));

			// 20130328: No7 No8
			if ((okflg == 1 && j > 0) || !description) {
				// description要素が、指定のtable構造だった場合
				// またはdescription要素の定義なしの場合
				alterTable(true);
			} else {
				// 指定のtable構造でなかった場合
				alterTable(false);
			}
		}
		
		// Table構造の属性値登録divを作成
		function createAttributeTableDiv()
		{
			// Table編集モード
			var attributeTableDiv = $("<div style=\"position:relative;top:-8px;margin-top:5px;\"id=\"sz_attribute\"><table id=\"sz_attribute_table\"></table>　<button id=\"sz_popupattr_add\" style=\"font-size:12px;\">項目を追加</button></div>");
			
			attributeTable = attributeTableDiv.find("#sz_attribute_table");
			if (okflg == 1 && j > 0) {
				for (var i = 0; i < j; i++) {
					var attrkey = key[i];
					var attrvalue = value[i];
					if (attrkey.charAt(0) == '@') {
						continue;
					}
					addRow(attrkey, attrvalue, attributeTable, false);
				}
			}
				
			// 「属性を追加」ボタンをクリック
			attributeTableDiv.find("#sz_popupattr_add").click(function(){
				addRow("", "", attributeTable, false);
			});

			return attributeTableDiv;
		}

		// 自由記述の属性値登録divを作成
		function createAttributeFreeDiv()
		{
			// 自由記述編集モード
			var attributeFreeDiv =
//				$("<div style=\"position:static;top:-14px;padding-left:10px;\"id=\"sz_attribute\"><span style=\"position:relative;\"><button id=\"sz_popupattr_addhref\"style=\"font-size:12px;\">リンクを追加</button><button id=\"sz_popupattr_addimg\"style=\"font-size:12px;\">画像を追加</button><br><textarea id=\"sz_attribute_value\" rows=5 cols=30 style=\"padding-left:5px;font-size:12px;\">"+(value?(description!=null?description:""):"")+"</textarea><span id=\"ghost_text\" style=\"top:23px; left:4px;\">（例：開館時間は10時～18時。蔵書は１万冊。 ）</span></span></div><br>");
//				$("<div style=\"position:static;top:-14px;padding-left:10px;\"id=\"sz_attribute\"><div style=\"position:relative;\"><textarea id=\"sz_attribute_value\" rows=5 cols=30 style=\"padding-left:5px;font-size:12px;width=150px;\">"+(value?(description!=null?description:""):"")+"</textarea><span id=\"ghost_text\" style=\"top:3px; left:4px;\">（例：開館時間は10時～18時。<br>蔵書は１万冊。 ）</span></div></div><br>");
				$("<div style=\"position:static;top:-14px;padding-left:10px;\"id=\"sz_attribute\"><span style=\"position:relative;\"><button id=\"sz_popupattr_addhref\"style=\"font-size:12px;\">リンクを追加</button><button id=\"sz_popupattr_addimg\"style=\"font-size:12px;visibility:hidden;\">画像を追加</button><br><textarea id=\"sz_attribute_value\" rows=5 cols=30 style=\"padding-left:5px;font-size:12px;\">"+(value?(description!=null?description:""):"")+"</textarea><span id=\"ghost_text\" style=\"top:23px; left:4px;\">（例：開館時間は10時～18時。蔵書は１万冊。 ）</span></span></div><br>");
				
			// 「リンクを追加」ボタンをクリック
			attributeFreeDiv.find("#sz_popupattr_addhref").click(function(){
				attributeFreeDiv.find("#sz_attribute_value").val(attributeFreeDiv.find("#sz_attribute_value").val() + "<a href=\"\" target=\"_blank\"></a>");
				attributeFreeDiv.find("#ghost_text").css("display", "none");
			});
/*			

			// 「画像を追加」ボタンをクリック
			attributeFreeDiv.find("#sz_popupattr_addimg").click(function(){
				attributeFreeDiv.find("#sz_attribute_value").val(attributeFreeDiv.find("#sz_attribute_value").val() + "<img src=\"\">");
				attributeFreeDiv.find("#ghost_text").css("display", "none");
			});
*/

			// ゴーストの設定
			createGhostTextEvents(attributeFreeDiv.find("#sz_attribute_value"), attributeFreeDiv.find("#ghost_text"));

			return attributeFreeDiv;
		}

		// 「項目を追加」ボタンクリック時の動作
		function addRow(key, value, attributeTable, isShowGhost) {
			if (attributeTable.find("#sz_popupattr_delete").length == 0) {
				var lineElement = $("<tr id=\"sz_popupattr_header\"><th>項目名</th><th>値</th><th>&nbsp;</th></tr>");
				attributeTable.append(lineElement);
			}

			// 属性を追加します。
			var lineElement = $("\
				<tr id=\"sz_attr_row\">\
					<td style=\"vertical-align:top;\">\
						<span id=\"attr_col\" style=\"position:relative;\">\
							<textarea id=\"sz_attr_col_key\" rows=1 style=\"width:100px;\">" + (key ? key : "") + "</textarea>\
							<span class=\"ghost_text\" id=\"ghost_text_key\" style=\"top:-4px; left:4px; font-size:12px; display:none;\">（例：開館時間）</span>\
						</span>\
					</td>\
					<td style=\"vertical-align:top;\">\
						<span id=\"attr_val\" style=\"position:relative;\">\
							<textarea id=\"sz_attr_col_value\" rows=1 style=\"width:120px;\">" + (value ? value : "") + "</textarea>\
							<span class=\"ghost_text\" id=\"ghost_text_val\" style=\"top:-4px; left:4px; font-size:12px; display:none;\">（例：10時～18時）</span>\
						</span>\
					</td>\
					<td>\
						<button id=\"sz_popupattr_delete\" style=\"font-size:12px; width:50px;\">削除</button>\
					</td>\
				</tr>");

			lineElement.find("#sz_popupattr_delete").click(function(){
				lineElement.remove();
				// 最後の一行なら、ヘッダを消す
				if (attributeTable.find("#sz_popupattr_delete").length == 0) {
					attributeTable.find("#sz_popupattr_header").remove();
				}
			});
			
			if (isShowGhost) {
				createGhostTextEvents(lineElement.find("#sz_attr_col_key"), lineElement.find("#ghost_text_key"));
				createGhostTextEvents(lineElement.find("#sz_attr_col_value"), lineElement.find("#ghost_text_val"));
			}
			
			attributeTable.append(lineElement);
		};

		// テーブル編集 ⇔ 自由記述編集切替
		function alterTable(isTable) {
			// 属性値登録の親タグを削除
			attributePanel.find("#sz_attribute").remove();
			
			// 親タグを追加しなおす
			var attributeDetailPanel = $("<div id=\"sz_attribute\"></div>");
			attributePanel.append(attributeDetailPanel);
			
			var tableLink = attributePanel.find("#desc_table");
			var notableLink = attributePanel.find("#desc_notable");

			if (isTable) {
				tableLink.click(function(){});
				notableLink.click(function(){ alterTable(false); });

				tableLink[0].style.color = "#000000";
				tableLink[0].style.textDecoration = "none";
				tableLink[0].style.fontWeight = "bold";
				tableLink[0].style.cursor = "auto";
				
				notableLink[0].style.color = "#0000FF";
				notableLink[0].style.textDecoration = "underline";
				notableLink[0].style.fontWeight = "normal";
				notableLink[0].style.cursor = "pointer";

				// 指定のtable構造(項目名-値)に沿った編集モード
				var attributeTableDiv = createAttributeTableDiv();
				attributeDetailPanel.append(attributeTableDiv);
				
				if (!description) {
					addRow("", "", attributeTable, true);
				}
			}
			else {
				tableLink.click(function(){ alterTable(true); });
				notableLink.click(function(){});

				tableLink[0].style.color = "#0000FF";
				tableLink[0].style.textDecoration = "underline";
				tableLink[0].style.fontWeight = "normal";
				tableLink[0].style.cursor = "pointer";
				
				notableLink[0].style.color = "#000000";
				notableLink[0].style.textDecoration = "none";
				notableLink[0].style.fontWeight = "bold";
				notableLink[0].style.cursor = "auto";

				// 自由記述編集モード
				var attributeFreeDiv = createAttributeFreeDiv();
				attributeDetailPanel.append(attributeFreeDiv);
			}
		};
		
		// ゴースト表示のためのイベント設定
		function createGhostTextEvents(bodyText, ghostText) {
			if (bodyText.value || (bodyText.val && bodyText.val())){
				// 文字列が設定されていればゴーストを表示しない
				ghostText.css("display", "none");
			}
			else {
				// 文字列が設定されてなければゴーストを表示する
				// 編集中はゴーストが消えるようにする
				ghostText.css("display", "");
				
				ghostText.click(function(){
					ghostText.css("display", "none");
					bodyText.focus();
				});
				
				bodyText.click(function(){
					ghostText.css("display", "none");
				});
				
				bodyText.blur(function(){
					ghostText.css("display", bodyText.value || (bodyText.val && bodyText.val()) ? "none" : "");
				});
			}
		};

		this.editAttributePanel(attributePanel);
		return attributePanel;
	},
	// 属性パネルの編集
	editAttributePanel : function(attributePanel) {
		return null;
	}
});
/**************************/
/* 抽象スタイルパネル     */
/**************************/
Sakuzu.AbstractStylePanel = Sakuzu.Class(Sakuzu.AbstractPanel,{
	initialize: function(sakuzu,tabPanel) {
		Sakuzu.AbstractPanel.prototype.initialize.apply(this, arguments);
		this.additionalPanel = this.createAdditionalPanel();
		if (this.additionalPanel) {
			this.stylePanel.append(this.additionalPanel);
		}
		var popupAttributePanel = this.createAttributePanel();
		this.stylePanel.append(popupAttributePanel);
	},
	/** 選択されているスタイルを取得 **/
	retrieveAttributes : function(panel) {
		if (!panel) {
			panel = this.stylePanel; 
		}
		var titleElement = panel.find("#sz_popupattr_title")[0];
		var title= titleElement.value;

		var result = {
				'name':title
			};

		var note = panel.find("#sz_attribute_value").val();
		if (note) {
			// 属性情報(自由記述)のHTML作成
			var attrs = note;
			if(attrs){
				jQuery.extend(result, {"description":attrs});
			}
		} else {
			// 属性情報(項目名＋値)のHTML作成
			var rows = panel.find("#sz_attr_row");
			var attrs = "";
			for (var i = 0; i < rows.length; i++) {
				var key = $(rows[i]).find("#sz_attr_col_key").val();
				var value = $(rows[i]).find("#sz_attr_col_value").val();
				key = key.replace(",","","g");
				val = value.replace("=","","g");

				if (key.length == 0 && value.length == 0) {
					continue;
				}

				var keyStr = webtis.Format.JSGIJSON.escapeHTML(key);
				var valueStr = webtis.Format.JSGIJSON.escapeHTML(value);
				if (key.charAt(0) == '@') {
					continue;
				}
				// 項目名のHTML作成
				attrs += '<tr><td style="color:#0000FF;padding-right:1em;">' + keyStr + '</td>';

				// 値のHTML作成
				var urlheader = "http";
				var str = " " + valueStr;
				// URL(「http」で始まる文字列)が入力されたらリンク表示
				if (str.indexOf(" " + urlheader) !== -1) {
					attrs += '<td><a href="' + valueStr + '" target="_blank">' + valueStr + '</a></td></tr>';
				} else {
					attrs += '<td>' + valueStr + '</td></tr>';
				}
			}
			if(attrs){
				attrs = '<table>'+ attrs + '</table>';
				jQuery.extend(result, {"description":attrs});
			}
		}

		return result;
	},
	/** 色選択ダイアログを表示 **/
	showColorPickerDialog : function(resultElement) {
		var palette = $("<div></div>");
		var t = $("<table/>");
		for (var i = 0; i < Sakuzu.ColorTable.length; i++) {
			var r = $("<tr/>");
			for (var j = 0; j < Sakuzu.ColorTable[i].length; j++) {
				var d = $("<td style=\"width:14px;height:14px;\"/>");
				var color = Sakuzu.ColorTable[i][j];
				var hexColor = "#"+Sakuzu.makeHex(color[0])+Sakuzu.makeHex(color[1])+Sakuzu.makeHex(color[2]);
				var paletteColor = $("<div class=\"sz_color\" style='background-color:"+hexColor+"'></div>");
				paletteColor.attr("_rgb",Sakuzu.padDeci(color[0],3)+","+Sakuzu.padDeci(color[1],3)+","+Sakuzu.padDeci(color[2],3));
				if (Sakuzu.isBasicColor(color)) {
					paletteColor.append("<div style=\"border:1px solid black;width:12px;height:12px;\"></div>");
				}
				d.append(paletteColor);
				r.append(d);
			}
			t.append(r);
		}
		palette.append(t);
		var colorInfo = $("<div style=\"padding:2px;font-size:12px;\">RGB=0,0,0</div>");
		palette.append(colorInfo);
		t.find(".sz_color").mouseover(
			function(ev) {
				colorInfo.text("RGB="+$(ev.currentTarget).attr("_rgb"));
			}
		);
		t.find(".sz_color").click(
			function(ev) {
				colorInfo.text("RGB="+$(ev.currentTarget).attr("_rgb"));
				resultElement.css("backgroundColor",$(ev.currentTarget).css("backgroundColor"));
				palette.dialog("destroy");
			}
		);
		
		palette.dialog({
			dialogClass:'sz_color_palette_dialog',
			title: "色を選択してください",
			width: 224,
			height: 280,
			resizable: false,
			draggable: false,
			modal:true
		});
	},
	/** 線幅選択ダイアログを表示 **/
	showLineWidthPickerDialog : function(imgElement,labelElement,strokeWidth) {
		var lineWidthTable=[2,5,10,17,25];
		var exist = false;
		var sizePanel = $("<table style='background-color:white'></table>");
		for (i=0; i<lineWidthTable.length; i++){
			var fsrc = Sakuzu.IMAGE_ROOT + "line_" + lineWidthTable[i] + "px.png"
			var line = "<tr class=\"sz_size_list\"><td style=\"width:170px;text-align:center;\"><img src=\"" + fsrc + "\" alt=\"" + lineWidthTable[i] + "\"></td>";
			line += "<td style=\"vertical-align:middle;width:30px;\">" + lineWidthTable[i] + "px</td></tr>";
			var lineObj = $(line);
			lineObj.attr({"_alt":lineWidthTable[i]});
			lineObj.click($.proxy(function(e){
				imgElement.attr("alt", $(e.currentTarget).attr("_alt"));
				imgElement.css("height", $(e.currentTarget).attr("_alt")+"px");
				labelElement.html($(e.currentTarget).attr("_alt")+"px");
				sizePanel.dialog("destroy");
			},this));
			sizePanel.append(lineObj);
			if (strokeWidth == lineWidthTable[i]) exist=true;
		}
		
		if (!exist){
			if (strokeWidth>0){
				var line="<tr class=\"sz_size_list\"><td style=\"width:170px;height:30px;text-align:center;vertical-align:middle;\">その他</td>";
				line += "<td style=\"vertical-align:middle;width:30px;\">" + strokeWidth + "px</td></tr>";
				var lineObj = $(line);
				lineObj.attr({"_alt":strokeWidth});
				lineObj.click($.proxy(function(e){
					imgElement.attr("alt", $(e.currentTarget).attr("_alt"));
					imgElement.css("height", $(e.currentTarget).attr("_alt")+"px");
					labelElement.html($(e.currentTarget).attr("_alt")+"px");
					sizePanel.dialog("destroy");
				},this));
				sizePanel.append(lineObj);
			}
		}
		

		sizePanel.dialog({
			dialogClass:'sz_color_palette_dialog',
			title: "線の幅を選択してください",
			width: 200,
			height: 240,
			resizable: false,
			draggable: false,
			modal:true
		});
	},

	/** 線幅をUIに反映 **/
	setLineWidth : function(imgElement,labelElement,width) {
		imgElement.attr("alt", width);
		labelElement.html(width + "px");
		if (width < 1){
			width = 1;
		}else if(width > 25){
			width = 25;
		}
		imgElement.css("height", width + "px");
	},
	
	/** スタイルをUIに反映 **/
	setDrawStyle : function(affixStyle,panel) {
	}
});


/**************************/
/* 点パネル               */
/**************************/
Sakuzu.PointPanel = Sakuzu.Class(Sakuzu.AbstractStylePanel,{
	// 属性パネルの編集
	editAttributePanel : function(attributePanel) {
		if (iconlabel){
			attributePanel.find("#sz_popupattr_title_lbael").after("<span style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:12px;\">（吹き出しのタイトル・アイコンの右側に表示）</span>");
		}
		else {
			attributePanel.find("#sz_popupattr_title_lbael").after("<span style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:12px;\">（吹き出しのタイトルに表示）</span>");
		}
	},
	/** 選択された時に呼び出される。**/
	selected : function() {
		//  点の描画モード
		var webtis = this.sakuzu.getWebtis();
		var OpenLayers = this.sakuzu.getOpenLayers();

		var drawControl = new OpenLayers.Control.DrawFeature(this.sakuzu.affixLayer, OpenLayers.Handler.Point, {
			"callbacks": {
				"done" : function(geometry) {
					// 新たにレイヤーを作成して、そこに追加。
					var newLayer = new Sakuzu.LayerVector("_affix_."+Sakuzu.generateLayerId("symbol",webtis));
					// 属性を取得
					var attributes = this.currentPanle.retrieveAttributes();
					// スタイルを取得
					var affixStyle = this.currentPanle.retrieveDrawStyle();
					var style = this.currentPanle.sakuzu.convertToOLStyle(affixStyle);
					var feature = new webtis.Feature.Vector(geometry, attributes, style);
					feature.attributes = attributes;
					newLayer.styleType = "symbol";
					newLayer.affixStyle = affixStyle;
					newLayer.JSGISelection = true;
					newLayer.addFeatures(feature);
					this.currentPanle.sakuzu.addLayer(newLayer);

					var selectedfeature=[feature];
					this.currentPanle.sakuzu.showEditDialog(selectedfeature);
				}
			}
		});
		drawControl.currentPanle = this;
		this.drawControl = drawControl;
		return [this.drawControl];
	},
	
	// スタイルパネルの下に追加で表示するパネル
	createAdditionalPanel : function() {
		return $("<div style=\"font-size:0.8em;line-height:14px;margin-top:6px;margin-bottom:6px;\">文字型データでは「タイトル」が文字列の値になります。</div>");
	},

	// 点スタイルパネル
	createStylePanel : function(affixStyle) {
		var stylePanel = $("\
				<div><div class=\"sz_stylebox\" style=\"margin-top:15px;margin-left:5px; margin-right:5px;\">\
					<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">スタイル</div>\
					<div style=\"position:relative;top:-10px;\">\
					<table>\
						<tr class=\"sz_title\">\
							<td style=\"vertical-align:middle;\">アイコン</td>\
							<td>\
								<div id=\"sz_symbol_img\" style=\"position:relative;\">\
									<img id=\"sz_symbol_icon\" style=\"vertical-align:bottom;width=100;\" src=\""+Sakuzu.SymbolTable.baseURL+"080.png\">\
								</div>\
							</td>\
							<td style=\"vertical-align:middle;\">\
								拡大率 <select id=\"sz_symbol_size\"><option value=\"10\">0.5</option><option value=\"20\" selected>1.0</option><option value=\"30\">1.5</option><option value=\"40\">2.0</option></select>\
							</td>\
						</tr>\
						<tr class=\"sz_title\">\
							<td></td>\
							<td></td>\
							<td>\
								<button id=\"sz_circle_icon_change\">アイコン変更</button>\
							</td>\
						</tr>\
						<tr style=\"height:7px;\"></tr>\
						<tr class=\"sz_title point_label\">\
							<td style=\"vertical-align:middle;\">ラベル　 </td>\
							<td>\
								<div style=\"position:relative;\">\
									<p id=\"sz_text_size\" style=\"border:1px solid gray;width:40px;text-align:center;vertical-align:bottom;background-color:white;font-size:12px;font-family:ＭＳ ゴシック;\">A</p>\
								</div>\
							</td>\
							<td style=\"vertical-align:middle;\">拡大率 <select id=\"sz_labelsize_combo\"><option value=\"10\" selected>1.0(10px)</option><option value=\"12\">1.2(12px)</option><option value=\"20\">2.0(20px)</option><option value=\"30\">3.0(30px)</option><option value=\"40\">4.0(40px)</option></select>\
						</tr>\
						<tr class=\"sz_title point_label\">\
							<td></td>\
							<td></td>\
							<td style=\"vertical-align:middle;\">\
								文字色 <p id=\"sz_text_color\" class=\"sz_color_palette\" style=\"background-color:#000000\"></p>\
							</td>\
							<input type=\"hidden\" id=\"sz_icon\">\
							<input type=\"hidden\" id=\"sz_icon_size\">\
						</tr>\
					</table>\
				</form>\
				</div></div>\
			");
		var textSize = stylePanel.find("#sz_text_size");
//		var textSizeLabel = stylePanel.find("#sz_text_size_label");
		var tsize = 0;
		if (affixStyle) tsize = parseInt(affixStyle["font"].size, 10);
		
		var symbolButton = stylePanel.find("#sz_circle_icon_change");
		symbolButton.click(
			$.proxy(function(){
				this.openIconTable(stylePanel);
			}, this)
		);

		var iconSizeTable=[10,12,20,30,40];
		var iconSizeCombo = stylePanel.find("#sz_symbol_size");
		iconSizeCombo.change(
			$.proxy(function(){
				var size = iconSizeCombo.val();
				stylePanel.find("#sz_symbol_icon").css("height", size + "px");
				stylePanel.find("#sz_symbol_icon").css("width", size + "px");
			}, this)
		);
		
		var textSizeCombo = stylePanel.find("#sz_labelsize_combo");
		textSizeCombo.change(
			$.proxy(function(){
				var size = parseInt(textSizeCombo.val(), 10);
				var h = size + 4;
				if (h < 16) h = 16;
				stylePanel.find("#sz_text_size").css("height", h+"px");
				stylePanel.find("#sz_text_size").css("font-size", size + "px");
			}, this)
		);

		var textColor = stylePanel.find("#sz_text_color");
		textColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(textColor);
			},this)
		);
		
		if (!iconlabel){
			stylePanel.find(".point_label").css("display", "none");
		}
		
		return stylePanel;
	},
	
	openIconTable: function(stylePanel) {
		var exist = false;
		var iconTablesElement = $("<div id=\"sz_icon_tables\"></div>");
		for (var i = 0; i < Sakuzu.SymbolTable.files.length; i++) {
			var iconElement = $("<div class=\"sz_icon\"><img src=\""+Sakuzu.SymbolTable.baseURL+Sakuzu.SymbolTable.files[i]+"\"></div>");
			$(iconTablesElement).append(iconElement);
			$(iconElement).click(
					function(ev) {
						stylePanel.find("#sz_symbol_null").css("display", "none");

						stylePanel.find("#sz_symbol_icon")[0].src = ev.target.src;
						iconTablesElement.dialog("destroy");
					}
			);
			if (stylePanel.find("#sz_symbol_icon")[0].src == Sakuzu.SymbolTable.baseURL+Sakuzu.SymbolTable.files[i]) exist = true;
		}

		if (!exist){
			$(stylePanel.find("#sz_symbol_icon")[0]).attr({"_prevSrc":stylePanel.find("#sz_symbol_icon")[0].src});
		}
		
		if ($(stylePanel.find("#sz_symbol_icon")[0]).attr("_prevSrc")){
			var fileSrc = $(stylePanel.find("#sz_symbol_icon")[0]).attr("_prevSrc");
			var iconElement = $("<div class=\"sz_icon\"><img src=\""+fileSrc+"\" width=\"20px\"></div>");
			
			$(iconTablesElement).append(iconElement);
			$(iconElement).click(
			function(ev) {
					stylePanel.find("#sz_symbol_icon")[0].src = ev.target.src;
					iconTablesElement.dialog("destroy");
				}
			);
		}
		
		iconTablesElement.dialog({
			dialogClass:'sz_color_palette_dialog',
			title: "アイコンを選択してください",
			width: 230,
			height: 140,
			resizable: false,
			draggable: false,
			modal:true
		});
	},
	
	/** 選択されているスタイルを取得 **/
	retrieveDrawStyle : function(panel) {
		var textSize = "";
		var textColor = "";
		var symbolURL = "";
		var size;

		if (!panel) {
			panel = this.stylePanel;
			if (this.sakuzu.btnObjs[this.sakuzu.btnObjs.POINT].prevAffixStyle){
				textSize = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POINT].prevAffixStyle.font.size;
				textColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POINT].prevAffixStyle.rgb;
				
				symbolURL = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POINT].prevAffixStyle.symbol.uri;
				size = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POINT].prevAffixStyle.symbol.size.split(",")[0];
			}
		}
		if (symbolURL == "") {
			var symbolElement = panel.find("#sz_symbol_icon")[0];
			symbolURL = symbolElement.src;
			size = panel.find("#sz_symbol_size").val();
		}
		var stype = "static";

		if (textSize == ""){
			var textSizeElement = panel.find("#sz_text_size")[0];
			textSize = $(textSizeElement).css("font-size");
			var textColorElement = panel.find("#sz_text_color")[0];
			textColor = Sakuzu.cssColorToDeci($(textColorElement).css("backgroundColor"));
		}
		
		var iconSizeElement = panel.find("#sz_icon_size");
		var iconSize = iconSizeElement.val();
		var iconElement = panel.find("#sz_icon");
		var icon = iconElement.val();
		var affixStyle = {
			'name' : 'textStyle',
			'type' : 'SYMBOL',
			'display' : 'ON',
			'displaylevel' : 'all',
			'selection' : 'ON',
			'transparent' : 'ON',
			'rgb' : textColor,
			'fontOpacity' : 1,
			'paint' : 'ON',
			'symbol' : {
				"size":size+","+stype,
				"uri":symbolURL
			},
			//'mode':'CC',
			'mode':'lm',
			'font' : {
				'name' : 'ＭＳ ゴシック',
				'style' : '標準',
				'size' : textSize
			}
		};
		
		return affixStyle;
	},
	/** スタイルをUIに反映 **/
	setDrawStyle : function(affixStyle, panel) {

		if (!panel) {
			panel = this.stylePanel;
		}
		
		// アイコン
		var iconSizeTable = [10,20,30,40];
		var iconSizeCombo = panel.find("#sz_symbol_size");

		var width = parseFloat(affixStyle["symbol"].size);
		var size = 0;
		for (var i=0; i<iconSizeTable.length; i++){
			if (width == iconSizeTable[i]){
				size = iconSizeTable[i];
				break;
			}
		}

		if (size != 0){
			iconSizeCombo.val(size);
		}else{
			size = width;
			var opt = $("<option value=" + size + ">その他</option>");
			iconSizeCombo.append(opt);
			iconSizeCombo.val(size);
		}

		var symbolElement = panel.find("#sz_symbol_icon");
		var symbolURL = affixStyle.symbol.uri;
		symbolElement[0].src = symbolURL; 
		symbolElement.width(size);
		if (size<10) size=10;

		panel.find("#sz_symbol_icon").css("height", size + "px");
		panel.find("#sz_symbol_icon").css("width", size + "px");

		// ラベル
		var labelSizeTable = [10,12,20,30,40];
		var textSizeCombo = panel.find("#sz_labelsize_combo");
		
		var labelSize = parseFloat(affixStyle["font"].size);
		var size = 0;
		for (var i=0; i<labelSizeTable.length; i++){
			if (labelSize == (labelSizeTable[i])){
				size = labelSizeTable[i];
				break;
			}
		}
		
		if (size != 0){
			textSizeCombo.val(size);
		}else{
			size = labelSize;
			var opt = $("<option value=" + size + ">その他</option>");
			textSizeCombo.append(opt);
			textSizeCombo.val(size);
		}

		var h = size + 4;
		if (h < 16) h = 16;
		panel.find("#sz_text_size").css("height", h+"px");
		panel.find("#sz_text_size").css("font-size", size + "px");
//		panel.find("#sz_text_size").css("color", Sakuzu.deciColorToCSSHex(affixStyle["rgb"]));

		panel.find("#sz_text_color").css("backgroundColor", Sakuzu.deciColorToCSSHex(affixStyle["rgb"]));
	}
});

/**************************/
/* 線パネル               */
/**************************/
Sakuzu.LinePanel = Sakuzu.Class(Sakuzu.AbstractStylePanel,{

	// 属性パネルの編集
	editAttributePanel : function(attributePanel) {	
		attributePanel.find("#sz_popupattr_title_lbael").after("<span style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:12px;\">（吹き出しのタイトルに表示）</span>");
	},

	/** 選択された時に呼び出される。**/
	selected : function() {
		//  線の描画モード
		var webtis = this.sakuzu.getWebtis();
		var OpenLayers = this.sakuzu.getOpenLayers();

		var drawControl = new OpenLayers.Control.DrawFeature(this.sakuzu.affixLayer, OpenLayers.Handler.Path, {
			"callbacks": {
				"done" : function(geometry) {
					if (geometry.components.length <= 1) {
						return;
					}
					geometry.calculateBounds();
					if (geometry.bounds == null || geometry.bounds.getWidth() == 0) {
						return;
					}
					// 新たにレイヤーを作成して、そこに追加。
					var newLayer = new Sakuzu.LayerVector("_affix_."+Sakuzu.generateLayerId("string",webtis));
					// 属性を取得
					var attributes = this.currentPanle.retrieveAttributes();
					// ここでスタイルを取得
					var affixStyle = this.currentPanle.retrieveDrawStyle();
					var style = this.currentPanle.sakuzu.convertToOLStyle(affixStyle);
					var feature = new webtis.Feature.Vector(geometry, attributes, style);
					newLayer.styleType = "string";
					newLayer.affixStyle = affixStyle;
					newLayer.JSGISelection = true;
					newLayer.addFeatures(feature);
					this.currentPanle.sakuzu.addLayer(newLayer);

					var selectedfeature=[feature];
					this.currentPanle.sakuzu.showEditDialog(selectedfeature);
				}
			}
		});
		drawControl.currentPanle = this;
		this.drawControl = drawControl;
		return [this.drawControl];
	},
	// 線スタイルパネル
	createStylePanel : function(affixStyle) {
		var stylePanel = $("\
				<div><div class=\"sz_stylebox\" style=\"margin-top:15px;margin-left:5px; margin-right:5px;\">\
					<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">スタイル</div>\
					<div style=\"position:relative;top:-10px;\">\
					<table><tr class=\"sz_title\"><td style=\"vertical-align:middle;\">線幅</td>\
						<td id=\"sz_line_width\" style=\"vertical-align:middle;cursor:pointer;\">\
							<img id=\"sz_line_width_img\" style=\"height:2px;width:40px;\" src=\"" + Sakuzu.IMAGE_ROOT + "line_1px.png\" alt=\"5\">\
						</td>\
						<td id=\"sz_line_width_label\" style=\"vertical-align:middle;\">2px</td>\
					</tr></table>\
					<table><tr class=\"sz_title\">\<td>線色</td>\
						<td><p id=\"sz_line_color\" class=\"sz_color_palette\" style=\"background-color:#FF0000\"></p></td>\
					</tr></table>\
				</div></div>\
			");

		var lineWidth = stylePanel.find("#sz_line_width");
		lineWidth.click(
			$.proxy(function(ev) {
				var strokeWidth = 0;
				if (affixStyle){
					var widthParam = affixStyle["width"].split(",");
					strokeWidth = widthParam[0];
				}

				var imgElement = lineWidth.find("#sz_line_width_img");
				var labelElement = stylePanel.find("#sz_line_width_label");
				this.showLineWidthPickerDialog(imgElement,labelElement,strokeWidth);
			},this)
		);

		var lineColor = stylePanel.find("#sz_line_color");
		lineColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(lineColor);
			},this)
		);
		return stylePanel;
	},
	/** 選択されているスタイルを取得 **/
	retrieveDrawStyle : function(panel) {
		var strokeWidth = "";
		var strokeColor = "";
		var stype = "static";

		if (!panel) {
			panel = this.stylePanel;
			if (this.sakuzu.btnObjs[this.sakuzu.btnObjs.LINE].prevAffixStyle){
				strokeWidth = this.sakuzu.btnObjs[this.sakuzu.btnObjs.LINE].prevAffixStyle.width.split(",")[0];
				strokeColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.LINE].prevAffixStyle.rgb;
			}
		}
		
		if (strokeColor == ""){
			strokeWidth = panel.find("#sz_line_width_img").attr("alt");
			var colorElement = panel.find("#sz_line_color")[0];
			var backgroundColor = $(colorElement).css("backgroundColor");
			strokeColor = Sakuzu.cssColorToDeci(backgroundColor);
		}

		var affixStyle = {
			"name" : "lineStringStyle",
			"type" : "STRING",
			'width':strokeWidth+","+stype,
			"rgb" : strokeColor,
			'strokeOpacity' : 0.5,
			"display" : "ON",
			"displaylevel" : "all",
			"selection" : "ON",
			"transparent" : "ON"
		};
		return affixStyle;
	},
	/** スタイルをUIに反映 **/
	setDrawStyle : function(affixStyle,panel) {
		if (!panel) {
			panel = this.stylePanel;
		}

		var widthParam = affixStyle["width"].split(",");
		var strokeWidth = widthParam[0];
		this.setLineWidth(panel.find("#sz_line_width_img"),panel.find("#sz_line_width_label"),strokeWidth);

		panel.find("#sz_line_color").css("backgroundColor",Sakuzu.deciColorToCSSHex(affixStyle["rgb"]));
	}
});

/**************************/
/* 面パネル               */
/**************************/
Sakuzu.PolygonPanel = Sakuzu.Class(Sakuzu.AbstractStylePanel,{

	// 属性パネルの編集
	editAttributePanel : function(attributePanel) {	
		attributePanel.find("#sz_popupattr_title_lbael").after("<span style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:12px;\">（吹き出しのタイトルに表示）</span>");
	},

	/** 選択された時に呼び出される。**/
	selected : function() {
		//  面の描画モード
		var webtis = this.sakuzu.getWebtis();
		var OpenLayers = this.sakuzu.getOpenLayers();

		var drawControl = new OpenLayers.Control.DrawFeature(this.sakuzu.affixLayer, OpenLayers.Handler.Polygon, {
			"callbacks": {
				"done" : function(geometry) {
					if (geometry.components[0].components.length <= 3) {
						return;
					}
					// ここでスタイルを取得
					var affixStyle = this.currentPanle.retrieveDrawStyle();
					var style = this.currentPanle.sakuzu.convertToOLStyle(affixStyle);
					// 新たにレイヤーを作成して、そこに追加。
					var newLayer = new Sakuzu.LayerVector("_affix_."+Sakuzu.generateLayerId("poly",webtis));
					// 属性を取得
					var attributes = this.currentPanle.retrieveAttributes();
					var feature = new webtis.Feature.Vector(geometry, attributes, style);
					newLayer.styleType = "polygon";
					newLayer.JSGISelection = true;
					newLayer.affixStyle = affixStyle;
					newLayer.addFeatures(feature);
					this.currentPanle.sakuzu.addLayer(newLayer);
					//this.currentPanle.sakuzu.enablePopupLayer(newLayer);

					var selectedfeature=[feature];
					this.currentPanle.sakuzu.showEditDialog(selectedfeature);
				}
			}
		});
		drawControl.currentPanle = this;
		this.drawControl = drawControl;
		return [this.drawControl];
	},
	// 面スタイルパネル
	createStylePanel : function(affixStyle) {
		var stylePanel = $("\
				<div><div class=\"sz_stylebox\" style=\"margin-top:15px;margin-left:5px; margin-right:5px;\">\
					<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">スタイル</div>\
					<div style=\"position:relative;top:-10px;\">\
				<table><tr class=\"sz_title\"><td style=\"vertical-align:middle;\">線幅</td>\
					<td id=\"sz_polygon_line_width\" style=\"vertical-align:middle;cursor:pointer;\">\
						<img id=\"sz_polygon_line_width_img\" style=\"height:2px;width:40px;\" src=\"" + Sakuzu.IMAGE_ROOT + "line_1px.png\" alt=\"5\">\
					</td>\
					<td id=\"sz_polygon_line_width_label\" style=\"vertical-align:middle;\">2px</td>\
				</tr></table>\
				<table><tr class=\"sz_title\"><td>線色</td>\
					<td>\
						<p id=\"sz_polygon_line_color\" class=\"sz_color_palette\" style=\"background-color:#FF0000;\"></p>\
					</td>\
				</tr></table>\
				<table><tr class=\"sz_title\"><td>塗色</td>\
					<td>\
						<div style=\"border:1px solid black;\"><p id=\"sz_polygon_fill_color\" class=\"sz_color_palette\" style=\"background-color:#00FF00;border:0px;\" ></p></div>\
					</td>\
				</tr></table>\
				<table><tr class=\"sz_title\"><td>透過率</td>\
					<td>\
						<div id=\"opa_sakuzu_value\" style=\"float:left;position:absolute;\"></div>　<div id=\"opa_sakuzu_slider\" style=\"width:100px; left:40px; float:left;\"></div>\
					</td>\
				</tr></table>\
			</div></div>\
		");

		var lineWidth = stylePanel.find("#sz_polygon_line_width");
		lineWidth.click(
			$.proxy(function(ev) {
				var strokeWidth = 0;
				if (affixStyle){
					var widthParam = affixStyle["width"].split(",");
					strokeWidth = widthParam[0];
				}

				var imgElement = lineWidth.find("#sz_polygon_line_width_img");
				var labelElement = stylePanel.find("#sz_polygon_line_width_label");
				this.showLineWidthPickerDialog(imgElement,labelElement,strokeWidth);
			},this)
		);

		var lineColor = stylePanel.find("#sz_polygon_line_color");
		lineColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(lineColor);
			},this)
		);
		var fillColor = stylePanel.find("#sz_polygon_fill_color");
		fillColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(fillColor);
			},this)
		);
		
		var updateOpaValue = function(value) {
			stylePanel.find("#opa_sakuzu_value").text((~~value) + "％");
			setBackgroundColorOpacity(stylePanel.find("#sz_polygon_fill_color"), (100 - parseInt(value, 10)) / 100);
		};

		var opaSlider = stylePanel.find("#opa_sakuzu_slider");
		opaSlider.slider({
			change: function(e, u){ updateOpaValue(u.value); },
			slide: function(e, u){ updateOpaValue(u.value); },
			max: 100,
			min: 0,
			value: 50
		});
		return stylePanel;
	},
	/** 選択されているスタイルを取得 **/
	retrieveDrawStyle : function(panel) {
		var strokeWidth = "";
		var stype = "static";
		var fillType = "solid";
		var strokeColor = "";
		var fillColor = "";
		var fillOpacity = 0.5;
		
		if (!panel) {
			panel = this.stylePanel;
			if (this.sakuzu.btnObjs[this.sakuzu.btnObjs.POLYGON].prevAffixStyle){
				strokeWidth = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POLYGON].prevAffixStyle.width.split(",")[0];
				strokeColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POLYGON].prevAffixStyle.rgb;
				fillColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POLYGON].prevAffixStyle.hrgb;
				fillOpacity = this.sakuzu.btnObjs[this.sakuzu.btnObjs.POLYGON].prevAffixStyle.fillOpacity;
			}
		}

		if (strokeWidth == ""){
			strokeWidth = panel.find("#sz_polygon_line_width_img").attr("alt");
			var colorElement = panel.find("#sz_polygon_line_color")[0];
			strokeColor = Sakuzu.cssColorToDeci($(colorElement).css("backgroundColor"));
			var fillColorElement = panel.find("#sz_polygon_fill_color")[0];
			fillColor = Sakuzu.cssColorToDeci($(fillColorElement).css("backgroundColor"));
			fillOpacity = (100 - panel.find("#opa_sakuzu_slider").slider("option", "value")) / 100;
		}

		var affixStyle = {
			"name" : "polygonStyle",
			"type" : "POLYGON",
			"display" : "ON",
			"displaylevel" : "all",
			"selection" : "ON",
			"transparent" : "ON",
			"width" : strokeWidth + ","+stype,
			"brgb" : strokeColor,
			'strokeOpacity' : 0.5,
			'fillOpacity' : fillOpacity,
			"brush" : fillType,
			"rgb" : strokeColor,
			"hrgb" : fillColor,
			"paint":"ON"
		};
		return affixStyle;
	},
	/** スタイルをUIに反映 **/
	setDrawStyle : function(affixStyle,panel) {
		if (!panel) {
			panel = this.stylePanel;
		}
		var widthParam = affixStyle["width"].split(",");
		var strokeWidth = widthParam[0];
		this.setLineWidth(panel.find("#sz_polygon_line_width_img"),panel.find("#sz_polygon_line_width_label"),strokeWidth);

		panel.find("#sz_polygon_line_color").css("backgroundColor",Sakuzu.deciColorToCSSHex(affixStyle["rgb"]));
		panel.find("#sz_polygon_fill_color").css("backgroundColor",Sakuzu.deciColorToCSSHex(affixStyle["hrgb"]));
		panel.find("#opa_sakuzu_slider").slider("option", "value", (100 - affixStyle["fillOpacity"] * 100));
		panel.find("#opa_sakuzu_value").text("" + (100 - affixStyle["fillOpacity"] * 100) + "％");
	}
});

/**************************/
/* 円パネル               */
/**************************/
Sakuzu.CirclePanel = Sakuzu.Class(Sakuzu.AbstractStylePanel,{

	// 属性パネルの編集
	editAttributePanel : function(attributePanel) {	
		attributePanel.find("#sz_popupattr_title_lbael").after("<span style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:12px;\">（吹き出しのタイトルに表示）</span>");
	},

	/** 選択された時に呼び出される。**/
	selected : function(that,newControls) {
		that.setOperationModeControl();

		//  円の描画モード
		var circleDrawmodeElement = $("<div id=\"circle_drawmode\"></div>");

		var panel = $("\
			<div id=\"sz_popup_attr\" style=\"height:80px;\">\
				<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;\">描画方法</div>\
				<div style=\"position:relative;top:-10px;font-size:14px;\">\
					<div>\
						<label><input type=\"radio\" name=\"sz_circle_drawmode\" value=\"drag\" checked style=\"margin-bottom:5px;\">ドラッグで円を指定</label><br>\
						<label ><input type=\"radio\" name=\"sz_circle_drawmode\" value=\"point\" style=\"margin-bottom:5px;\">半径を指定</label>\
						<div style=\"margin-left:20px;\">\
							<input id=\"sz_circle_raius\" type=\"text\" value=\"\" size=\"4\" style=\"margin-right:5px;\"><select id=\"sz_circle_raius_unit\"><option value=\"m\">メートル</option><option value=\"km\">キロメートル</option></select>\
						</div>\
					</div>\
				</div>\
				<input type=\"hidden\" id=\"sz_circle_radiusm\" value=\"\"/>\
				<div style=\"margin-top:10px;text-align:center;\"><button id=\"sz_circle_drawmode_button\">決定</button></div>\
			</div>\
		");

		var drawmodeButton = panel.find("#sz_circle_drawmode_button");
		drawmodeButton.click(function(e){
			var drawMode = panel.find("input[name='sz_circle_drawmode']:checked").val();

			var radius,unitMode;
			if (drawMode == "point"){
				radius = panel.find("#sz_circle_raius").val();
				if ($.isNaN(radius)) {
					alert("半径には、数字を入力してください。");
					return false;
				}
				radius = radius - 0;
				unitMode = panel.find("#sz_circle_raius_unit option:selected").val();
			}

			newControls = that.btnObjs[that.btnObjs.CIRCLE].createDrawControl(drawMode,radius,unitMode);

			that.updateDrawControls([newControls]);
			circleDrawmodeElement.dialog("destroy");
		});

		circleDrawmodeElement.append(panel);

		circleDrawmodeElement.dialog({
			dialogClass:'sz_color_palette_dialog',
			title: "描画方法を選択してください。",
			width: 230,
			height: 180,
			resizable: false,
			draggable: false,
			modal:true
		});
	},
	// 描画用Controlを選定
	createDrawControl : function(drawMode,radius,unitMode) {
		var webtis = this.sakuzu.getWebtis();
		var OpenLayers = this.sakuzu.getOpenLayers();
		//var drawMode = this.stylePanel.find("input[name='sz_circle_drawmode']:checked").val();

		var drawControl;
		if (drawMode == "drag") {
			drawControl = new OpenLayers.Control.DrawFeature(this.sakuzu.affixLayer, webtis.Handler.Circle, {
				"callbacks": {
					"done" : function(geometry, radius,targetLonLat) {
						if (!targetLonLat) return false;
						// ここでスタイルを取得
						var affixStyle = this.currentPanle.retrieveDrawStyle();
						var style = this.currentPanle.sakuzu.convertToOLStyle(affixStyle);
						// 新たにレイヤーを作成して、そこに追加。
						var newLayer = new Sakuzu.LayerVector("_affix_."+Sakuzu.generateLayerId("circle",webtis));
						// 属性を取得
						var attributes = this.currentPanle.retrieveAttributes();
						var feature = new webtis.Feature.Vector(geometry, attributes, style);
						newLayer.JSGISelection = true;
						newLayer.styleType = "circle";
						newLayer.affixStyle = affixStyle;
						
						var centerLonLat = new OpenLayers.LonLat(geometry.x,geometry.y);
						centerLonLat = centerLonLat.transform(this.currentPanle.sakuzu.getMapObject().getProjectionObject(),Sakuzu.baseProjection);
						targetLonLat = targetLonLat.transform(this.currentPanle.sakuzu.getMapObject().getProjectionObject(),Sakuzu.baseProjection);
						
						var radiusm = OpenLayers.Util.distVincenty(centerLonLat,targetLonLat)*1000;

						// boundsを計算
						// ポイントですが、半径分の矩形を設定します。
						var topLL = OpenLayers.Util.destinationVincenty(centerLonLat,0,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var rightLL = OpenLayers.Util.destinationVincenty(centerLonLat,90,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var bottomLL = OpenLayers.Util.destinationVincenty(centerLonLat,180,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var leftLL = OpenLayers.Util.destinationVincenty(centerLonLat,270,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var newBounds = new OpenLayers.Bounds(leftLL.lon,bottomLL.lat,rightLL.lon,topLL.lat);
						geometry.bounds = newBounds;

						feature.pointRadius = radiusm;
						feature.styleSize = affixStyle['width'].split()[0];
						newLayer.addFeatures(feature);
						this.currentPanle.sakuzu.addLayer(newLayer);
						var selectedfeature=[feature];
						this.currentPanle.sakuzu.showEditDialog(selectedfeature);
					}
				}
			});
		} else {
			drawControl = new OpenLayers.Control.DrawFeature(this.sakuzu.affixLayer, webtis.Handler.CircleFixedRadius, {
				"callbacks": {
					"done" : function(geometry) {
						var radiusm = this.currentPanle.fixedRadiusMeter;
						if ($.isNaN(radiusm)) {
							return;
						}
						// ここでスタイルを取得
						var affixStyle = this.currentPanle.retrieveDrawStyle();
						var style = this.currentPanle.sakuzu.convertToOLStyle(affixStyle);
						// 新たにレイヤーを作成して、そこに追加。
						var newLayer = new Sakuzu.LayerVector("_affix_."+Sakuzu.generateLayerId("circle",webtis));
						// 属性を取得
						var attributes = this.currentPanle.retrieveAttributes();
						var feature = new webtis.Feature.Vector(geometry, attributes, style);
						
						// ポイントですが、半径分の矩形を設定します。
						var centerLonLat = new OpenLayers.LonLat(geometry.x,geometry.y);
						centerLonLat = centerLonLat.transform(this.currentPanle.sakuzu.getMapObject().getProjectionObject(),Sakuzu.baseProjection);
						var topLL = OpenLayers.Util.destinationVincenty(centerLonLat,0,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var rightLL = OpenLayers.Util.destinationVincenty(centerLonLat,90,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var bottomLL = OpenLayers.Util.destinationVincenty(centerLonLat,180,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var leftLL = OpenLayers.Util.destinationVincenty(centerLonLat,270,radiusm).transform(Sakuzu.baseProjection,this.currentPanle.sakuzu.getMapObject().getProjectionObject());
						var newBounds = new OpenLayers.Bounds(leftLL.lon,bottomLL.lat,rightLL.lon,topLL.lat);
						geometry.bounds = newBounds;
						
						feature.pointRadius = radiusm;
						newLayer.styleType = "circle";
						newLayer.affixStyle = affixStyle;
						newLayer.JSGISelection = true;
						feature.styleSize = affixStyle['width'].split(",")[0];
						newLayer.addFeatures(feature);
						this.currentPanle.sakuzu.addLayer(newLayer);
						
						var selectedfeature=[feature];
						this.currentPanle.sakuzu.showEditDialog(selectedfeature);
					}
				}
			});
			// 半径を取得
			//var radius = this.additionalPanel.find("#sz_circle_raius").val();
			if (!$.isNaN(radius)) {
				//var unitMode = this.additionalPanel.find("#sz_circle_raius_unit option:selected").val();
				var radiusm = radius;
				if (unitMode == "km") {
					radiusm = radiusm * 1000;
				}
				this.fixedRadiusMeter = radiusm;
				drawControl.handler.radiusMeter = this.fixedRadiusMeter;
			}
		}
		drawControl.currentPanle = this;
		return drawControl;
	},

	updateRadius : function() {
		var radius = this.additionalPanel.find("#sz_circle_raius").val();
		if ($.isNaN(radius)) {
			alert("半径には、数字を入力してください。");
			return false;
		}
		radius = radius - 0;
		var unitMode = this.additionalPanel.find("#sz_circle_raius_unit option:selected").val();
		var radiusm = radius;
		if (unitMode == "km") {
			radiusm = radiusm * 1000;
		}
		this.fixedRadiusMeter = radiusm;
		return true;
		// panel.find("#sz_circle_radiusm").val(radiusm);
	},

	// 円スタイルパネル
	createStylePanel : function(affixStyle) {
		var stylePanel = $("\
				<div><div class=\"sz_stylebox\" style=\"margin-top:15px;margin-left:5px; margin-right:5px;\">\
					<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">スタイル</div>\
					<div style=\"position:relative;top:-10px;\">\
				<table><tr class=\"sz_title\"><td style=\"vertical-align:middle;\">線幅</td>\
					<td id=\"sz_circle_line_width\" style=\"vertical-align:middle;cursor:pointer;\">\
						<img id=\"sz_circle_line_width_img\" style=\"height:2px;width:40px;\" src=\"" + Sakuzu.IMAGE_ROOT + "line_1px.png\" alt=\"5\">\
					</td>\
					<td id=\"sz_circle_line_width_label\" style=\"vertical-align:middle;\">2px</td>\
				</tr></table>\
				<table><tr class=\"sz_title\"><td>線色</td>\
					<td>\
						<p id=\"sz_circle_line_color\" class=\"sz_color_palette\" style=\"background-color:#FF0000\"></p>\
					</td>\
				</tr></table>\
				<table><tr class=\"sz_title\"><td>塗色</td>\
					<td>\
						<div style=\"border:1px solid black;\"><p id=\"sz_circle_fill_color\" class=\"sz_color_palette\" style=\"background-color:#00FF00;border:0px;\"></p></div>\
					</td>\
				</tr></table>\
				<table><tr class=\"sz_title\"><td>透過率</td>\
					<td>\
						<div id=\"opa_sakuzu_value\" style=\"float:left;position:absolute;\"></div>　<div id=\"opa_sakuzu_slider\" style=\"width:100px; left:40px; float:left;\"></div>\
					</td>\
				</tr></table>\
			</div></div>\
		");

		var lineWidth = stylePanel.find("#sz_circle_line_width");
		lineWidth.click(
			$.proxy(function(ev) {
				if (affixStyle){
					var widthParam = affixStyle["width"].split(",");
					strokeWidth = widthParam[0];
				}

				var imgElement = lineWidth.find("#sz_circle_line_width_img");
				var labelElement = stylePanel.find("#sz_circle_line_width_label");
				this.showLineWidthPickerDialog(imgElement,labelElement,strokeWidth);
			},this)
		);
		
		var lineColor = stylePanel.find("#sz_circle_line_color");
		lineColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(lineColor);
			},this)
		);
		var fillColor = stylePanel.find("#sz_circle_fill_color");
		fillColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(fillColor);
			},this)
		);
		var updateOpaValue = function(value) {
			stylePanel.find("#opa_sakuzu_value").text((~~value) + "％");
//			stylePanel.find("#opa_sakuzu_value").text(value + "％");
			setBackgroundColorOpacity(stylePanel.find("#sz_circle_fill_color"), (100 - parseInt(value, 10)) / 100);
		};
		
		var opaSlider = stylePanel.find("#opa_sakuzu_slider");
		opaSlider.slider({
			change: function(e, u){ updateOpaValue(u.value); },
			slide: function(e, u){ updateOpaValue(u.value); },
			max: 100,
			min: 0,
			value: 50
		});
		return stylePanel;
	},
	/** 選択されているスタイルを取得 **/
	retrieveDrawStyle : function(panel) {
		var strokeWidth = "";
		var stype = "static";
		var fillType = "solid";
		var strokeColor = "";
		var fillColor = "";

		if (!panel) {
			panel = this.stylePanel;
			if (this.sakuzu.btnObjs[this.sakuzu.btnObjs.CIRCLE].prevAffixStyle){
				strokeWidth = this.sakuzu.btnObjs[this.sakuzu.btnObjs.CIRCLE].prevAffixStyle.width.split(",")[0];
				strokeColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.CIRCLE].prevAffixStyle.rgb;
				fillColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.CIRCLE].prevAffixStyle.hrgb;
				fillOpacity = this.sakuzu.btnObjs[this.sakuzu.btnObjs.CIRCLE].prevAffixStyle.fillOpacity;
			}
		}

		if (strokeWidth == "") {
			strokeWidth = panel.find("#sz_circle_line_width_img").attr("alt");
			var colorElement = panel.find("#sz_circle_line_color")[0];
			strokeColor = Sakuzu.cssColorToDeci($(colorElement).css("backgroundColor"));
			var fillColorElement = panel.find("#sz_circle_fill_color")[0];
			fillColor = Sakuzu.cssColorToDeci($(fillColorElement).css("backgroundColor"));
			fillOpacity = (100 - panel.find("#opa_sakuzu_slider").slider("option", "value")) / 100;
		}

		var affixStyle = {
			"name" : "circleStyle",
			"type" : "CIRCLE",
			"display" : "ON",
			"displaylevel" : "all",
			"selection" : "ON",
			"transparent" : "ON",
			"width" : strokeWidth + ","+stype,
			"brgb" : strokeColor,
			"brush" : fillType,
			"rgb" : strokeColor,
			"hrgb" : fillColor,
			'strokeOpacity' : 0.5,
			'fillOpacity' : fillOpacity,
			"paint":"ON"
		};
		return affixStyle;
	},
	/** スタイルをUIに反映 **/
	setDrawStyle : function(affixStyle,panel) {
		if (!panel) {
			panel = this.stylePanel;
		}
		var widthParam = affixStyle["width"].split(",");
		var strokeWidth = widthParam[0];
		this.setLineWidth(panel.find("#sz_circle_line_width_img"),panel.find("#sz_circle_line_width_label"),strokeWidth);

		panel.find("#sz_circle_line_color").css("backgroundColor",Sakuzu.deciColorToCSSHex(affixStyle["rgb"]));
		panel.find("#sz_circle_fill_color").css("backgroundColor",Sakuzu.deciColorToCSSHex(affixStyle["hrgb"]));
		panel.find("#opa_sakuzu_slider").slider("option", "value", (100 - affixStyle["fillOpacity"] * 100));
		panel.find("#opa_sakuzu_value").text("" + (100 - affixStyle["fillOpacity"] * 100) + "％");
	}
});
	
/**************************/
/* 文字パネル             */
/**************************/
Sakuzu.TextPanel = Sakuzu.Class(Sakuzu.AbstractStylePanel,{
	// 属性パネルの編集
	editAttributePanel : function(attributePanel) {
		attributePanel.find("#sz_popupattr_title_lbael").html("名称");
	},
	/** 選択された時に呼び出される。**/
	selected : function() {
		//  文字の描画モード
		var webtis = this.sakuzu.getWebtis();
		var OpenLayers = this.sakuzu.getOpenLayers();
		var drawControl = new OpenLayers.Control.DrawFeature(this.sakuzu.affixLayer, OpenLayers.Handler.Point, {
			"callbacks": {
				"done" : function(point) {
					// 属性を取得
					var attributes = this.currentPanle.retrieveAttributes();

					attributes.name = jQuery.trim(attributes.name);
					// ここでスタイルを取得
					var affixStyle = this.currentPanle.retrieveDrawStyle();
					var style = this.currentPanle.sakuzu.convertToOLStyle(affixStyle);
					//var geometry = new webtis.Geometry.TextRectangle(point.x, point.y);
					var geometry = point;
					geometry.bounds = new OpenLayers.Bounds(geometry.x, geometry.y, geometry.x, geometry.y);
					geometry.components = [new OpenLayers.Geometry.Point(geometry.x, geometry.y)];
					geometry.selectDisplay = true;
					geometry.label = attributes.name;

					// 新たにレイヤーを作成して、そこに追加。
					var newLayer = new Sakuzu.LayerVector("_affix_."+Sakuzu.generateLayerId("text",webtis));
					var feature = new webtis.Feature.Vector(geometry, attributes, style);
					newLayer.styleType = "text";
					newLayer.JSGISelection = true;
					newLayer.affixStyle = affixStyle;
					// フォントの大きさをFeatureに埋め込み
					var textSize = affixStyle['font'].size;
					feature.styleSize = textSize;
					newLayer.addFeatures(feature);
					this.currentPanle.sakuzu.addLayer(newLayer);

					var selectedfeature=[feature];
					this.currentPanle.sakuzu.showEditDialog(selectedfeature);
				}

			}
		});
		drawControl.currentPanle = this;
		this.drawControl = drawControl;
		return [this.drawControl];
	},
	
	// スタイルパネルの下に追加で表示するパネル
	createAdditionalPanel : function() {
		return $("<div style=\"font-size:0.8em;line-height:14px;margin-top:6px;margin-bottom:6px;\">文字型データでは「タイトル」が文字列の値になります。</div>");
	},
	
	// テキストスタイルパネル
	createStylePanel : function(affixStyle) {
		var stylePanel = $("\
				<div><div class=\"sz_stylebox\" style=\"margin-top:15px;margin-left:5px; margin-right:5px;\">\
					<div style=\"position:relative;top:-10px;background-color:#eeeeee;display:inline;padding:5px;font-size:15px;font-weight:bold;\">スタイル</div>\
					<div style=\"position:relative;top:-10px;\">\
					<table>\
						<tr class=\"sz_title\">\
							<td style=\"vertical-align:middle;\">文字サイズ</td>\
							<td>\
								<p id=\"sz_text_size\" class=\"sz_size_selecter\" style=\"background-color:white;font-size:12px;font-family:ＭＳ ゴシック;\">A</p>\
							</td>\
							<td id=\"sz_text_size_label\" style=\"vertical-align:middle;\">12px</td>\
							<input type=\"hidden\" id=\"sz_icon\">\
							<input type=\"hidden\" id=\"sz_icon_size\">\
						</tr>\
					</table>\
					<table><tr class=\"sz_title\"><td>文字色</td>\
						<td>\
							<p id=\"sz_text_color\" class=\"sz_color_palette\" style=\"background-color:#000000\"></p>\
						</td>\
					</tr></table>\
				</form>\
				</div></div>\
			");
		var textSize = stylePanel.find("#sz_text_size");
		var textSizeLabel = stylePanel.find("#sz_text_size_label");
		var tsize = 0;
		if (affixStyle) tsize = parseInt(affixStyle["font"].size, 10);

		var textSizeTable=[10,12,20,30,40];
		textSize.click(
			$.proxy(function(ev) {
				var sizePanel = $("<table style='background-color:white'></table>");
				var exist = false;

				for (i=0; i<textSizeTable.length; i++){
					var fHeight = textSizeTable[i] + 4;
					if (fHeight < 16) fHeight=16;
					var line = "<tr class=\"sz_size_list\" style=\"height:40px;\"><td style=\"font-size:" + textSizeTable[i] + "px;width:190px;font-family:ＭＳ ゴシック;vertical-align:middle;\">Aaあいう</td>";
					line += "<td style=\"vertical-align:middle;width:30px;\">"+ textSizeTable[i] + "px</td></tr>";
					var lineObj = $(line);
					lineObj.attr({"_font-size":textSizeTable[i],"_height":fHeight});
					lineObj.click($.proxy(function(e){
						textSize.css("font-size", $(e.currentTarget).attr("_font-size")+"px");
						textSize.css("height", $(e.currentTarget).attr("_height") + "px");
						textSizeLabel.html($(e.currentTarget).attr("_font-size") + "px");
						sizePanel.dialog("destroy");
					},this));
					sizePanel.append(lineObj);
					if (tsize == textSizeTable[i]) exist = true;
				}
				
				if (!exist){
					if (tsize > 0){
						var fHeight = tsize + 4;
						if (fHeight < 16) fHeight=16;
						var line = "<tr class=\"sz_size_list\" style=\"height:40px;\"><td style=\"font-size:12px;width:190px;font-family:ＭＳ ゴシック;vertical-align:middle;\">その他のサイズ</td>";
						line += "<td style=\"vertical-align:middle;width:30px;\">"+ tsize + "px</td></tr>";

						var lineObj = $(line);
						lineObj.attr({"_font-size":tsize,"_height":fHeight});
						lineObj.click($.proxy(function(e){
							textSize.css("font-size", $(e.currentTarget).attr("_font-size")+"px");
							textSize.css("height", $(e.currentTarget).attr("_height") + "px");
							textSizeLabel.html($(e.currentTarget).attr("_font-size") + "px");
							sizePanel.dialog("destroy");
						},this));
						sizePanel.append(lineObj);
					}
				}

				sizePanel.dialog({
					dialogClass:'sz_color_palette_dialog',
					title: "文字サイズを選択してください",
					width: 220,
					height: 180,
					resizable: false,
					draggable: false,
					modal:true
				});
				
			},this)
		);

		var textColor = stylePanel.find("#sz_text_color");
		textColor.click(
			$.proxy(function() {
				this.showColorPickerDialog(textColor);
			},this)
		);

		return stylePanel;
	},
	/** 選択されているスタイルを取得 **/
	retrieveDrawStyle : function(panel) {
		var textSize = "";
		var textColor = "";

		if (!panel) {
			panel = this.stylePanel;
			if (this.sakuzu.btnObjs[this.sakuzu.btnObjs.LABEL].prevAffixStyle){
				textSize = this.sakuzu.btnObjs[this.sakuzu.btnObjs.LABEL].prevAffixStyle.font.size;
				textColor = this.sakuzu.btnObjs[this.sakuzu.btnObjs.LABEL].prevAffixStyle.rgb;
			}
		}
		
		if (textSize == ""){
			var textSizeElement = panel.find("#sz_text_size")[0];
			textSize = $(textSizeElement).css("font-size");
			var textColorElement = panel.find("#sz_text_color")[0];
			textColor = Sakuzu.cssColorToDeci($(textColorElement).css("backgroundColor"));
		}

		var iconSizeElement = panel.find("#sz_icon_size");
		var iconSize = iconSizeElement.val();
		var iconElement = panel.find("#sz_icon");
		var icon = iconElement.val();
		var affixStyle = {
			'name' : 'textStyle',
			'type' : 'TEXT',
			'display' : 'ON',
			'displaylevel' : 'all',
			'selection' : 'ON',
			'transparent' : 'ON',
			'rgb' : textColor,
			'fontOpacity' : 1,
			'paint' : 'ON',
			'symbol' : {
				'size' : iconSize + ',static',
				'uri' : icon
			},
			//'mode':'CC',
			'mode':'lm',
			'font' : {
				'name' : 'ＭＳ ゴシック',
				'style' : '標準',
				'size' : textSize
			}
		};
		return affixStyle;
	},
	/** スタイルをUIに反映 **/
	setDrawStyle : function(affixStyle,panel) {
		if (!panel) {
			panel = this.stylePanel;
		}

		var textSize = parseInt(affixStyle["font"].size, 10);
		panel.find("#sz_text_size_label").html(textSize + "px");

		if (textSize<1){
			textSize = 1;
		}else if (textSize>40){
			textSize = 40;
		}
		panel.find("#sz_text_size").css("font-size",textSize + "px");
		
		var h = textSize + 4;
		if (h < 16) h = 16;
		panel.find("#sz_text_size").css("height",h+"px");

		panel.find("#sz_text_color").css("backgroundColor",Sakuzu.deciColorToCSSHex(affixStyle["rgb"]));
		
		// hidden項目にアイコンURLを保持
		var icon = affixStyle["symbol"].uri;
		panel.find("#sz_icon").val(icon);

		// hidden項目にアイコンサイズを保持
		var iconSizeArray = affixStyle["symbol"].size.split(",");
		var iconSize = iconSizeArray[0];
		panel.find("#sz_icon_size").val(iconSize);
	}
});

// -------------- DefaultHandler
/*
//-- 電子国土APIで使用するときのハンドラー
Sakuzu.DefaultHandler = Sakuzu.Class({
	useStateSave : true,
	initialize: function(config) {
		this._mo = config.mapObj;
	},
	getMapObject : function() {
		return this.getWebtis().map;
	},
	getWebtis: function() {
		if (this._mo.webtis) {
			return this._mo.webtis;
		}
		return this._mo.maplt.webtis;
	},
	getOpenLayers: function() {
		if (this._mo.OpenLayers) {
			return this._mo.OpenLayers;
		}
		return this._mo.maplt.OpenLayers;
	}
});
*/
//-- OpenLayersで使用するときのハンドラー
Sakuzu.OpenLayersDefaultHandler = Sakuzu.Class({
//	useStateSave : false,
	useStateSave : true,	//地図タブの追加【Ver4.0】
	initialize: function(config) {
		this.config = config;
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

/******** ユーティリティ関数  ***********/
// CSSのRGB表記あるいは、16進表記の#rrggbbの書式を10進表記の"r,g,b"に変換
Sakuzu.cssColorToDeci = function(cssColorStr,digit) {
	if (cssColorStr.indexOf("rgb")!=-1) {
		var rgb = cssColorStr.substring(cssColorStr.indexOf("(")+1,cssColorStr.indexOf(")")).split(",");
		var r = parseInt(rgb[0],10);
		var g = parseInt(rgb[1],10);
		var b = parseInt(rgb[2],10);
		return r+","+g+","+b;
	}
	var r = parseInt(cssColorStr.substring(1,3),16);
	var g = parseInt(cssColorStr.substring(3,5),16);
	var b = parseInt(cssColorStr.substring(5,7),16);
	return r+","+g+","+b;
};
//CSSのRGB表記あるいは、10進表記の"r,g,b"書式を16進表記の#rrggbbに変換
Sakuzu.deciColorToCSSHex = function(cssColorStr) {
	var rgb = cssColorStr.split(",");
	var r = parseInt(rgb[0],10);
	var g = parseInt(rgb[1],10);
	var b = parseInt(rgb[2],10);
	return ("#"+Sakuzu.padDeci(r.toString(16),2,"0")+Sakuzu.padDeci(g.toString(16),2,"0")+Sakuzu.padDeci(b.toString(16),2,"0")).toUpperCase();
};

//10進数を16進数に変換
Sakuzu.makeHex = function(deci) {
	var hex = deci.toString(16);
	if (hex.length < 2) {
		hex = "0"+hex;
	}
	return hex;
};

//10進数 10より小さいときは、スペースを付加
Sakuzu.padDeci = function(deci,padLen,pad) {
	var str = deci+"";
	if (!pad) {
		pad = " ";
	}
	while (str.length < padLen) {
		str = pad + str;
	}
	return str;
};
//基準色か否かを判定
Sakuzu.isBasicColor = function( color )
{
	var	x;
	var	theMax = color.length;
	
	for ( x = 0; x < theMax; x++ )
	{
		if ( ( color[ x ] != 0 ) && ( color[ x ] != 255 ) )
		{
			return false;
		}
	}
	
	return true;
};
//距離、面積計算関連
Sakuzu.calcGeo2 = function(geometries,unit,sourceProjection,baseProjection,OpenLayers) {
	if (geometries.length == 0) {
		return 0;
	}
	var result = 0;
	if (geometries[0].CLASS_NAME == "OpenLayers.Geometry.LineString") {
		for (var i = 0; i < geometries.length; i++) {
			var lineStringGeometry = geometries[i];
	        var length, geomUnits;
            length = lineStringGeometry.getGeodesicLength(sourceProjection);
			result += length;
		}
		// 単位を調整
		result *= unit;
	} else if (geometries[0].CLASS_NAME == "OpenLayers.Geometry.Polygon") {
		for (var i = 0; i < geometries.length; i++) {
			var polygonGeometry = geometries[i];
	        var area, geomUnits;
            area = polygonGeometry.getGeodesicArea(sourceProjection);
			result += area;
		}
		// 単位を調整　面積なので二乗
		result *= unit;
		result *= unit;
	}
	return result;
};

/** <layer><name>に格納されるIDを生成します。**/
Sakuzu.generateLayerId = function(styleType,webtis) {
	var now = new Date();
	var yyyyMMddHHmmssmm = webtis.Format.JSGIJSON.zeroPadDeci(now.getFullYear(),4)+webtis.Format.JSGIJSON.zeroPadDeci(now.getMonth(),2)+webtis.Format.JSGIJSON.zeroPadDeci(now.getDate(),2)+webtis.Format.JSGIJSON.zeroPadDeci(now.getHours(),2)+webtis.Format.JSGIJSON.zeroPadDeci(now.getMinutes(),2)+webtis.Format.JSGIJSON.zeroPadDeci(now.getSeconds(),2)+webtis.Format.JSGIJSON.zeroPadDeci(now.getMilliseconds(),3);
	return styleType.toUpperCase() + yyyyMMddHHmmssmm; 
};

//undo/redoのデータ
Sakuzu.OperationHistory = function(sakuzu) {
	
	var MAXDATA = 99;
	
	var undoData = [];
	var redoData = [];
	
	this.add = function(opcode, data) {
		if (undoData.length == MAXDATA-1) { undoData.shift(); }
		undoData.push({ "opcode" : opcode, "data" : data });
		// redoは、消去
		redoData.length = 0;
	};
	this.removeAllStacks = function() {
		undoData = [];
		redoData = [];
	};
	/** 取り消し **/
	this.undo = function() {
		if (undoData.length > 0) {
			sakuzu.unselectFeature();
			var op = undoData.pop();
			if (redoData.length == MAXDATA-1) { redoData.shift(); }
			if (op.opcode == 'move') {
				// 移動の取り消し
				redoData.push({ "opcode" : op.opcode, "data" : { "feature" : op.data.feature, "center" : op.data.feature.geometry.getBounds().getCenterLonLat() } });
				op.data.feature.move(op.data.center);
			} else if (op.opcode == 'del') {
				// 削除の取り消し
				var features = op.data;
				var redoFeatures = [];
				for (var i=0; i<features.length; i++) {
					var layer = features[i]._layer;
					if (layer.features.length == 0) {
						// 削除されているので追加する。
						var exist=false;
						if (layer.filename){
							for(var l=0; l<sakuzu.layers.length;l++){
								if (layer.filename == sakuzu.layers[l].filename){
									exist=true;
									break;
								}
							}
							if (!exist) Sakuzu.addLayerList(layer.filename);
						}
						sakuzu.addLayer(layer);
						sakuzu.setOperationModeControl();
					}
					layer.addFeatures(features[i]);
					redoFeatures.push(features[i]);
				}
				redoData.push({ "opcode" : op.opcode, "data" : redoFeatures });
			} else if (op.opcode == 'edit') {
				this.doEdit(op,redoData);
			} else if (op.opcode == 'new') {
				// 新規の取り消し
				var feature = op.data.feature;
				sakuzu.selectCtrl.unselect(feature);
				var layer = feature.layer;
				layer.removeFeatures(feature);
				if (layer.features.length == 0) {
					sakuzu.deleteLayer(layer);
				}
				redoData.push({ "opcode" : op.opcode, "data" : {"feature":feature,"layer":layer }});
			}
		}
	};
	/** やり直す **/
	this.redo = function() {
		if (redoData.length > 0) {
			var op = redoData.pop();
			if (undoData.length == MAXDATA-1) { undoData.shift(); }
			if (op.opcode == 'move') {
				undoData.push({ "opcode" : op.opcode, "data" : { "feature" : op.data.feature, "center" : op.data.feature.geometry.getBounds().getCenterLonLat() } });
				op.data.feature.move(op.data.center);
			} else if (op.opcode == 'del') {
				var features = op.data;
				var undoFeatures = [];
				for (var i=0; i<features.length; i++) {
					var layer = features[i].layer;
					features[i]._layer = layer;
					layer.removeFeatures(features[i]);
					if (layer.features.length == 0) {
						sakuzu.deleteLayer(layer);
					}
					undoFeatures.push(features[i]);
				}
				if (op.opcode == 'cut') {
					this.clipboardData = undoFeatures;
				}
				undoData.push({ "opcode" : op.opcode, "data" : undoFeatures });
			} else if (op.opcode == 'edit') {
				this.doEdit(op,undoData);
			} else if (op.opcode == 'new') {
				// 新規のやり直し
				var feature = op.data.feature;
				var layer = op.data.layer;
				if (layer.features.length == 0) {
					sakuzu.addLayer(layer);
					sakuzu.setOperationModeControl();
				}
				layer.addFeatures(feature);
				undoData.push({ "opcode" : op.opcode, "data" : {"feature":feature }});
			}
		} 
	};
	this.doEdit = function(op,stacks) {
		// 編集の取り消し
		// 属性に変更のあったFeature
		var feature = op.data.feature;
		// スタイルに変更のあったFeature
		var features = op.data.features;
		var affixStyle = op.data.affixStyle;
		var style = op.data.style;
		var attributes = op.data.attributes;
		var keepAttributes = null;
		if (feature && attributes) {
			keepAttributes = feature.attributes;
			feature.attributes = attributes;
			if (affixStyle.type == "TEXT" && attributes) {
				feature.geometry.label = attributes.name;
			}
		}
		
		var keepStyle = features[0].style;
		var keepAffixStyle = features[0].layer.affixStyle;
		var redoFeatures = [];
		for (var i=0; i<features.length; i++) {
			var curFeature = features[i];
			// スタイルを取得
			curFeature.layer.affixStyle = affixStyle;
			curFeature.style = style;

			curFeature.layer.redraw();
			redoFeatures.push(curFeature);
		}

		stacks.push({ "opcode" : "edit", "data" : {"feature":feature,"features":redoFeatures,"style":keepStyle,"affixStyle":keepAffixStyle,"attributes":keepAttributes} });
	};

};


/** **/
Sakuzu.calcFontSizeNumber = function(textSize,textDynamic) {
	var inputFontSizeNumber = null;
	if (textDynamic) {
		if ("biggest" == textSize) {
			inputFontSizeNumber = 150;
		} else if ("big" == textSize) {
			inputFontSizeNumber = 100;
		} else if ("medium" == textSize) {
			inputFontSizeNumber = 75;
		} else if ("small" == textSize) {
			inputFontSizeNumber = 50;
		} else if ("smallest" == textSize) {
			inputFontSizeNumber = 30;
		} else {
			inputFontSizeNumber = 75;
		}
	} else {
		if ("biggest" == textSize) {
			inputFontSizeNumber = 40;
		} else if ("big" == textSize) {
			inputFontSizeNumber = 30;
		} else if ("medium" == textSize) {
			inputFontSizeNumber = 20;
		} else if ("small" == textSize) {
			inputFontSizeNumber = 12;
		} else if ("smallest" == textSize) {
			inputFontSizeNumber = 9;
		} else {
			inputFontSizeNumber = 20;
		}
	}
	return inputFontSizeNumber;
};


/** **/
Sakuzu.getFontSizeString = function(textSize,textDynamic) {
	var fontSizeStr = null;
	if (textDynamic) {
		if ("150" == textSize) {
			fontSizeStr = "biggest";
		} else if ("100" == textSize) {
			fontSizeStr = "big";
		} else if ("75" == textSize) {
			fontSizeStr = "medium";
		} else if ("50" == textSize) {
			fontSizeStr = "small";
		} else if ("30" == textSize) {
			fontSizeStr = "smallest";
		} else {
			fontSizeStr = "medium";
		}
	} else {
		if ("40" == textSize) {
			fontSizeStr = "biggest";
		} else if ("30" == textSize) {
			fontSizeStr = "big";
		} else if ("20" == textSize) {
			fontSizeStr = "medium";
		} else if ("12" == textSize) {
			fontSizeStr = "small";
		} else if ("9" == textSize) {
			fontSizeStr = "smallest";
		} else {
			fontSizeStr = "medium";
		}
	}
	return fontSizeStr;
};

/**
 * Class: Sakuzu.Popup
 * ポップアップを表示するためのクラス
 *
 */
Sakuzu.Popup_popupId = 0;
Sakuzu.Popup = OpenLayers.Class({
	map : null,
	feature : null,
	onClose : null,
	initialize:function(map,onClose) {
		this.map = map;
		this.onClose = onClose;
		// マップをクリックしたら、ポップアップは消える。
		this.map.events.register("mouseup",this.map,this.removeEvent = 
				OpenLayers.Function.bindAsEventListener(function(evt) {
					if (this.feature && this.feature.popup) {
						this.map.removePopup(this.feature.popup);
//						this.feature.popup.destroy();
						this.feature.popup = null;
						this.feature = null;
					}
				}, this)
		);
		this.map.events.register("moveend",this.map,this.moveEndEvent = 
			OpenLayers.Function.bindAsEventListener(function(evt) {
				if (this.feature && this.feature.popup) {
					this.map.removePopup(this.feature.popup);
//					this.feature.popup.destroy();
					this.feature.popup = null;
					this.feature = null;
				}
			}, this)
	);
	},
	
	destroy : function() {
		this.map.events.unregister("mouseup",this.map,this.removeEvent);
		this.map.events.unregister("moveend",this.map,this.moveEndEvent);
	},
	/** Featureをポップアップしたときの動き **/
	onFeatureSelectPopup : function (evt) {
		var feature = evt.feature;
		if (feature.popup) return;

		// タイトルを取得
		var attr_title = feature.attributes.name ? feature.attributes.name : "";
		// 属性情報(<description>要素)を取得
		var description = feature.attributes.description ? feature.attributes.description : "";
//		if (feature.layer.CLASS_NAME == "Sakuzu.LayerVector" && !Sakuzu.isTableDescription(description)) {
		if (feature.layer.CLASS_NAME == "Sakuzu.LayerVector" ||
			feature.layer.CLASS_NAME == "webtis.Layer.Vector") {
			description = Sakuzu.escapeDescription(description);
		}
		// 属性情報(<description>要素)をポップアップ用HTMLに設定
		if (description != "") {
			var attrs = '<table id=""><tr><td class="frameCloudTitle" colspan="2" style="color:#FF0000;">' + webtis.Format.JSGIJSON.escapeHTML(attr_title) + '</td></tr><tr><td class="frameCloudDescription">' + description + '</td></tr></table>';
		} else if (attr_title != "") {
			var attrs = '<table><tr><td class="frameCloudTitle" colspan="2" style="color:#FF0000;">' + webtis.Format.JSGIJSON.escapeHTML(attr_title) + '</td></tr></table>';
		} else {
			return;
		}
		
		var xy;
		if (typeof mouseX != "undefined" && typeof mouseY != "undefined" && mouseX && mouseY) {
			var pix = new OpenLayers.Pixel(mouseX - this.map.div.offsetLeft, mouseY - this.map.div.offsetTop);
			xy = map.getLonLatFromViewPortPx(pix);
		}
		else {
			xy = feature.geometry.getBounds().getCenterLonLat();
		}

		var popup = new OpenLayers.Popup.FramedCloud(
				"featurePopup_" + (++Sakuzu.Popup_popupId),
//				feature.geometry.getBounds().getCenterLonLat(),
				xy,
				null,
				attrs,
				null,
				false,this.onPopupClose);

		popup.contentDisplayClass = "framedCloudPopupClass";
		popup.panMapIfOutOfView = false;
//		popup.autoSize = false;
		popup.maxSize = new OpenLayers.Size(400,400);
		feature.popup = popup;
		popup.feature = feature;
		
		if (this.feature && this.feature.popup) {
			this.map.removePopup(this.feature.popup);
//			this.feature.popup.destroy();
			this.feature.popup = null;
		}
		this.feature = feature;
		// ポップアップ表示
		this.map.addPopup(popup,true);
	},

	onFeatureUnselectPopup : function(evt) {
		var feature = evt.feature;
		if (feature.popup) {
			/**
			this.map.removePopup(feature.popup);
			feature.popup.destroy();
			feature.popup = null;
			**/
		}
	},
	
	onPopupClose : function(evt) {
		if (onClose) {
			onClose(this.feature);
		}
		// this.feature = null;
	},
	
	removePopup : function() {
		if (this.feature && this.feature.popup) {
			this.map.removePopup(this.feature.popup);
			this.feature.popup = null;
			this.feature = null;
		}
	//	this.map.removePopup(this.feature.popup);
	},
	CLASS_NAME : "Sakuzu.Popup"
});

/**
 * affixStyleをJSON化
 */
Sakuzu.makeStyleJSONString = function(layer){
	var affixStyle = layer.affixStyle;
	var styleJSON = null;
	var styleType = affixStyle.type;
	
	if (styleType == "SYMBOL") {
		var label = layer.features[0].attributes["name"];
		
		if (affixStyle.symbol && affixStyle.symbol.uri != ""){
			styleJSON = {
				'externalGraphic':affixStyle["symbol"].uri,
				'graphicOpacity':1,
				'graphicWidth':parseInt(affixStyle["symbol"].size.split(",")[0], 10),
				'graphicHeight':parseInt(affixStyle["symbol"].size.split(",")[0], 10),
				'label':label,
				'fontColor':affixStyle["rgb"],
				'fontSize':affixStyle.font.size,
				'fontOpacity':affixStyle["fontOpacity"]
			};
		} else {
			styleJSON = {
				'label':label,
				'fontColor':affixStyle["rgb"],
				'fontSize':affixStyle.font.size,
				'fontOpacity':affixStyle["fontOpacity"]
			};
		}
	}else if (styleType == "STRING") {
		styleJSON = {
			'strokeColor':affixStyle["rgb"],
			'strokeWidth':affixStyle["width"].split(",")[0],
			'strokeOpacity':affixStyle["strokeOpacity"],
			'strokeLinecap':'square'
		};
	}else if (styleType == "POLYGON") {
		styleJSON = {
			'strokeColor':affixStyle["rgb"],
			'strokeWidth':affixStyle["width"].split(",")[0],
			'strokeOpacity':affixStyle["strokeOpacity"],
			'fill':'1',
			'fillColor':affixStyle["hrgb"],
			'fillOpacity':affixStyle["fillOpacity"]
		};
	}else if (styleType == "CIRCLE") {
		styleJSON = {
			'strokeColor':affixStyle["rgb"],
			'strokeWidth':affixStyle["width"].split(",")[0],
			'strokeOpacity':affixStyle["strokeOpacity"],
			'fill':'1',
			'fillColor':affixStyle["hrgb"],
			'fillOpacity':affixStyle["fillOpacity"]
		};
	}else if (styleType == "TEXT") {
		var label = layer.features[0].attributes["name"];
		
		if (affixStyle.symbol && affixStyle.symbol.uri != ""){
			styleJSON = {
				'externalGraphic':affixStyle["symbol"].uri,
				'graphicOpacity':1,
				'graphicWidth':parseInt(affixStyle["symbol"].size.split(",")[0], 10),
				'graphicHeight':parseInt(affixStyle["symbol"].size.split(",")[0], 10),
				'label':label,
				'fontColor':affixStyle["rgb"],
				'fontSize':affixStyle.font.size,
				'fontOpacity':affixStyle["fontOpacity"]
			};
		} else {
			styleJSON = {
				'label':label,
				'fontColor':affixStyle["rgb"],
				'fontSize':affixStyle.font.size,
				'fontOpacity':affixStyle["fontOpacity"]
			};
		}
	}
	return styleJSON;
};

/**
 * レイヤーの配列をJSON化
 */
Sakuzu.makeJSONString = function(layers, baseProjection) {
	
	// 図形のノードのリストを作成
	var topNode = Sakuzu.makeJSONNodes(layers, baseProjection);	
	
	// ノードのリストをJSON文字列に変換
	var result = Sakuzu.makeJSONNodesToString(topNode);
	
	return result;
};

/** 図形のノードのリストを作成 **/
Sakuzu.makeJSONNodes = function(layers, baseProjection) {
	var layerNode = [];
	var topNode = new Array({"layer":layerNode});
	var geoJSON = new OpenLayers.Format.GeoJSON();
	var cnt = 0;
	for (var i = 0; i < layers.length; i++) {	
		var layer = layers[i];
		
		if (!layer.getVisibility()) {
			continue;
		}
		
		var dataNode = [];
		var styleNode = null;
		var primidPrefix = null;
		styleNode = Sakuzu.makeStyleJSONString(layer);
		if (layer.styleType == "string" || layer.styleType == "polygon") {
			primidPrefix = "cv";
		}
		var layerName = layer.name;
		if (layer.name.indexOf("_affix_.")==0) {
			layerName = layerName.substring(8);
		}
		var layerType = "";
		if (layer.styleType == "circle"){
			layerType = "Circle";
		} else if (layer.styleType == "polygon") {
			layerType = "Polygon";
		} else if (layer.styleType == "string") {
			layerType = "LineString";
		} else {
			layerType = "Point";
		}
		
		layerNode[cnt++] = {
			"name" : layerName,
			"type" : layerType,
			"style" : styleNode,
			"data" : dataNode
		};
		var primId = 1;
		for (var j = 0; j < layer.features.length; j++) {
			var feature = layer.features[j];
			var attributes = feature.attributes;
			var name = attributes["name"];
			var description = attributes["description"];
			//var description = "<![CDATA[" + attributes["description"] + "]]>";
			var geometryJSON = null;
			var meter = null;
			var data = null;
			if (layer.styleType == "circle") {
				if(feature.pointRadius){
					// 半径が定義されている=作図したデータは既存と同様の処理を実施
					var geometry = feature.geometry.clone().transform(layer.map.getProjectionObject(),baseProjection);
					eval("geometryJSON = "+geoJSON.write(geometry)+";");
					meter = feature.pointRadius;
				} else{
					// 半径が定義されていない=読み込んだデータは半径をもっていないので半径を算出する
					var ring = feature.geometry.clone().components[0];
					// 中心点を取得
					var geometry = ring.getCentroid().transform(layer.map.getProjectionObject(),baseProjection);
					eval("geometryJSON = "+geoJSON.write(geometry)+";");
					// 半径を算出
					var start = ring.components[0].transform(layer.map.getProjectionObject(),baseProjection);
					var end = ring.components[36].transform(layer.map.getProjectionObject(),baseProjection);
					var lonlat1 = new OpenLayers.LonLat(start.x, start.y);
					var lonlat2 = new OpenLayers.LonLat(end.x, end.y);
					meter = (OpenLayers.Util.distVincenty(lonlat1, lonlat2) / 2) * 1000;
				}
				geometryJSON.circle = meter;
				geometryJSON.type = "Circle";
			} else if (layer.styleType == "text") {
					//var geometry = feature.geometry.clone().components[0].transform(layer.map.getProjectionObject(),baseProjection);
					var geometry = feature.geometry.clone().transform(layer.map.getProjectionObject(),baseProjection);
					eval("geometryJSON = "+geoJSON.write(geometry)+";");
//					meter = feature.pointRadius;
			} else if (layer.styleType == "image") {
				var geometry = feature.geometry.clone().transform(layer.map.getProjectionObject(),baseProjection);
				var imageMapping = {
						"leftBottomCorner" : {"type" : "Point" , "coordinates" :[geometry.x,geometry.y-geometry.height]},
						"rightTopCorner" : {"type" : "Point" , "coordinates" :[geometry.x+geometry.width,geometry.y]},
						"leftTopCorner" : {"type" : "Point" , "coordinates" :[geometry.x,geometry.y]},
						"rightBottomCorner" : {"type" : "Point" , "coordinates" :[geometry.x+geometry.width,geometry.y-geometry.height]}
				};
				data = {
				        "name": name,
				        "description":description,
//				        "crs": "JGD2000 / (L, B)",
				        "type" : geometry.imageType,
				        "src" : geometry.imageUrl,
				        "imageMapping": imageMapping
					};
			} else {
				// window.console.log(layer.styleType+":"+feature.geometry.CLASS_NAME);
				var geometry = feature.geometry.clone().transform(layer.map.getProjectionObject(),baseProjection);
				eval("geometryJSON = "+geoJSON.write(geometry)+";");
			}
			if (!data) {
				data = {
			        "name": name,
			        "type":"Feature",
			        "properties":description,
			        "geometry": geometryJSON
				};
			}
			if (primidPrefix) {
				data = OpenLayers.Util.extend(data,{"primitiveId":primidPrefix+webtis.Format.JSGIJSON.zeroPadDeci(primId,3)});
			}
			dataNode[j] = data;
		}
	}
	
	return topNode;
};

/** ノードのリストをJSON文字列に変換 **/
Sakuzu.makeJSONNodesToString = function(topNode) {
	var result = webtis.Format.JSGIJSON.stringify(topNode);
	result = result.substring(1,result.length-1);
	result = result.substring(result.indexOf("{"),result.lastIndexOf("}")+1);
	// window.console.log(result);
	return result;
};

/**
 * JSONデータをマップにロード
 */
Sakuzu.loadJSON = function(result,zoomflg) {

	// 読み込み後に表示する地図の縮尺指定用
	var bounds = null;
	var json = result;
	var subLayers = json.layer;
	var geoJson = new OpenLayers.Format.GeoJSON();
	var resultProjection = new OpenLayers.Projection("EPSG:4326");
	var projection = new OpenLayers.Projection("EPSG:900913");
	var fileName = "";
	var defaultIcon = 'sys/v4/symbols/080.png';

	for(var l=0; l<subLayers.length; l++){

		var features = [];
		var geometry = null;
		var defaultStyle = null;
		var selectStyle = null;
		var layerStyleMap = null;
		var affixStyle = null;
		var strokeArray = null;
		var fillArray = null;
		var fontArray = null;

		if(subLayers[l].data.type == 'symbol'){
			// 点
			var pointGeom = geoJson.parseGeometry(subLayers[l].data.geometry);
			geometry = pointGeom.transform(resultProjection, projection);
			//geometry = new webtis.Geometry.TextRectangle(geometry.x, geometry.y, true);
			geometry.bounds = new OpenLayers.Bounds(geometry.x, geometry.y, geometry.x, geometry.y);
			geometry.components = [new OpenLayers.Geometry.Point(geometry.x, geometry.y)];
			geometry.selectDisplay = true;
			geometry.label = subLayers[l].data.name;
			var icon = '';
			var iconScale = 1;
			var labelScale = 1;
			var labelColor = 'FF000000';
			var iconSize = 0;
			var fillOpa = 1;
			var offset = 0;
			var labelSelect = true;

			var iconStyle = subLayers[l].data.style.IconStyle;
			if(iconStyle != undefined){
				if(iconStyle.href != undefined){
					icon = iconStyle.href;
				}

				if(iconStyle.scale != undefined){
					iconScale = iconStyle.scale;
					iconSize = 20 * iconScale;
					offset = iconSize/2;
				}
			}

			var labelStyle = subLayers[l].data.style.LabelStyle;
			if(labelStyle != undefined){
				if(labelStyle.scale != undefined && labelStyle.scale != 0){
					labelScale = labelStyle.scale;
				}

				if(labelStyle.color != undefined && labelStyle.color != ''){
					labelColor = labelStyle.color;
				}
			}
			// テキストの基本サイズを10とする
			var labelSize = 10 * labelScale;

			// 文字の色と透明度を取得　文字色の指定がない場合は、デフォルトで黒を指定
			fontArray = Sakuzu.convertColor(labelColor);

			// アイコン＋ラベルにチェックがついていたら
			// テキストはデフォルトで表示
			var fontOpacity = iconlabel ? 1 : 0.00001;

			if (icon != '') labelSelect = false;

/*
			// アイコン＋ラベルにチェックがついていたら
			// アイコンはデフォルトで表示
			if(iconlabel){
				fillOpa = 1;
				offset = iconSize/2;
				if (icon != '') labelSelect = false;
			}
*/
			// style設定
			defaultStyle = new OpenLayers.Style({
				'fillOpacity' : fillOpa,
				'fill' : true,
				'externalGraphic' : icon,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': offset,
				'fontColor' : fontArray[0],
				'fontOpacity' : fontOpacity,
				'fontFamily' : 'ＭＳ ゴシック',
				'fontSize' : labelSize + 'px',
				'labelAlign' : 'lm',
				'labelSelect' : labelSelect
			});

			// 選択した時のスタイル
			var selectStyle = new OpenLayers.Style({
				'fillOpacity' : fillOpa,
				'fill' : true,
				'externalGraphic' : icon,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': offset,
				'fontColor' : fontArray[0],
				'fontOpacity' : fontOpacity,
				'fontFamily' : 'ＭＳ ゴシック',
				'fontSize' : labelSize + 'px',
				'labelAlign' : 'lm',
				'labelSelect' : labelSelect
			});

			// レイヤにstyle設定
			var _ds = {'default' : defaultStyle, 'select' : selectStyle};
			layerStyleMap = new OpenLayers.StyleMap(_ds);

			// 作図用に設定
			affixStyle = {
				'name' : 'textStyle',
				'type' : 'SYMBOL',
				'display' : 'ON',
				'displaylevel' : 'all',
				'selection' : 'ON',
				'transparent' : 'ON',
				'rgb' : Sakuzu.cssColorToDeci(fontArray[0]), //文字色
				'fontOpacity' : fontArray[1],
				'paint' : 'ON',
				'symbol' : {
					'size' : iconSize + ',static',
					'uri' : icon
				},
				'mode':'lm',          // 修正前はCC
				'font' : {
					'name' : 'ＭＳ ゴシック',
					'style' : '標準',
					'size' : labelSize + 'px'
				}
			};

		}else if(subLayers[l].data.type == 'string'){
			// 線
			var lineGeom = geoJson.parseGeometry(subLayers[l].data.geometry);
			lineGeom = lineGeom.transform(resultProjection, projection);
			geometry = new OpenLayers.Geometry.LineString(lineGeom.components);
			var strokeWidth = '2';
			var strokeColor = 'FF0000FF';

			var lineStyle = subLayers[l].data.style.LineStyle;
			if(lineStyle != undefined){
				if(lineStyle.width != undefined && lineStyle.width != 0){
					strokeWidth = lineStyle.width;
				}

				if(lineStyle.color != undefined){
					strokeColor = lineStyle.color;
				}
			}

			// 線の色と透明度を取得
			strokeArray = Sakuzu.convertColor(strokeColor);

			// style設定
			defaultStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : strokeArray[0],
				'strokeOpacity' : strokeArray[1],
				'strokeWidth' : strokeWidth,
				'strokeLinecap' : 'square',
				'fill' : false
			});

			// レイヤにstyle設定
			var _ds = {'default' : defaultStyle};
			layerStyleMap = new OpenLayers.StyleMap(_ds);

			// 作図用に設定
			affixStyle = {
				'name' : 'lineStringStyle',
				'type' : 'STRING',
				'width' : strokeWidth + ',static',
				'rgb' : Sakuzu.cssColorToDeci(strokeArray[0]),
				'strokeOpacity' : strokeArray[1],
				'display' : 'ON',
				'displaylevel' : 'all',
				'selection' : 'ON',
				'transparent' : 'ON'
			};
		}else if(subLayers[l].data.type == 'polygon'){
			// ポリゴン
			var polyGeom = geoJson.parseGeometry(subLayers[l].data.geometry);
			geometry = polyGeom.transform(resultProjection, projection);
			var strokeWidth = '2';
			var strokeColor = 'FF0000FF';
			var fillColor = 'FF00FF00';
			var fill = true;

			var lineStyle = subLayers[l].data.style.LineStyle;
			if(lineStyle != undefined){
				if(lineStyle.width != undefined && lineStyle.width != 0){
					strokeWidth = lineStyle.width;
				}

				if(lineStyle.color != undefined){
					strokeColor = lineStyle.color;
				}
			}

			var polyStyle = subLayers[l].data.style.PolyStyle;
			if(polyStyle != undefined){
				if(polyStyle.color != undefined){
					fillColor = polyStyle.color;
				}

				if(polyStyle.fill != undefined){
					fill = polyStyle.fill;
				}
			}

			// 線の色と透明度を取得
			strokeArray = Sakuzu.convertColor(strokeColor);
			// 面の色と透明度を取得
			fillArray = Sakuzu.convertColor(fillColor);

			// style設定
			defaultStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : strokeArray[0],
				'strokeOpacity' : strokeArray[1],
				'strokeWidth' : strokeWidth,
				'strokeLinecap' : 'square',
				'fillColor' : fillArray[0],
				'fillOpacity' : fillArray[1],
				'fill' : fill
			});

			// 選択した時のスタイル設定
			var selectStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor': '#0000FF',
				'strokeWidth': strokeWidth,
				'strokeLinecap' : 'square',
				'strokeOpacity' : 0.7,
				'fillOpacity' : 0.7,
				'fillColor' : '#0000FF',
				'fill' : true
			});

			// レイヤにstyle設定
			var _ds = {'default' : defaultStyle, 'select' : selectStyle};
			layerStyleMap = new OpenLayers.StyleMap(_ds);

			var paint;
			if(fill){
				paint = 'ON';
			} else{
				paint = 'OFF';
			}
			// 作図用に設定
			affixStyle = {
				'name' : 'polygonStyle',
				'type' : 'POLYGON',
				'display' : 'ON',
				'displaylevel' : 'all',
				'selection' : 'ON',
				'transparent' : 'ON',
				'width' : strokeWidth + ',static',
				'brgb' : Sakuzu.cssColorToDeci(strokeArray[0]),
				'brush' : 'solid',
				'rgb' : Sakuzu.cssColorToDeci(strokeArray[0]),
				'strokeOpacity' : strokeArray[1],
				'hrgb' : Sakuzu.cssColorToDeci(fillArray[0]),
				'fillOpacity' : fillArray[1],
				'paint': paint
			};
		}else if(subLayers[l].data.type == 'circle'){
			// 円
			var circleGeom = geoJson.parseGeometry(subLayers[l].data.geometry);
			geometry = circleGeom.transform(resultProjection, projection);
			var strokeWidth = '2';
			var strokeColor = 'FF0000FF';
			var fillColor = 'FF00FF00';
			var fill = true;

			var lineStyle = subLayers[l].data.style.LineStyle;
			if(lineStyle != undefined){
				if(lineStyle.width != undefined && lineStyle.width != 0){
					strokeWidth = lineStyle.width;
				}

				if(lineStyle.color != undefined){
					strokeColor = lineStyle.color;
				}
			}

			var polyStyle = subLayers[l].data.style.PolyStyle;
			if(polyStyle != undefined){
				if(polyStyle.color != undefined){
					fillColor = polyStyle.color;
				}

				if(polyStyle.fill != undefined){
					fill = polyStyle.fill;
				}
			}

			// 線の色と透明度を取得
			strokeArray = Sakuzu.convertColor(strokeColor);
			// 面の色と透明度を取得
			fillArray = Sakuzu.convertColor(fillColor);

			// style設定
			defaultStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor' : strokeArray[0],
				'strokeOpacity' : strokeArray[1],
				'strokeWidth' : strokeWidth,
				'strokeLinecap' : 'square',
				'fillColor' : fillArray[0],
				'fillOpacity' : fillArray[1],
				'fill' : fill
			});

			// 選択した時のスタイル設定
			var selectStyle = new OpenLayers.Style({
				'stroke' : true,
				'strokeColor': '#0000FF',
				'strokeWidth': strokeWidth,
				'strokeLinecap' : 'square',
				'strokeOpacity' : 0.7,
				'fillOpacity' : 0.7,
				'fillColor' : '#0000FF',
				'fill' : true
			});

			// レイヤにstyle設定
			var _ds = {'default' : defaultStyle, 'select' : selectStyle};
			layerStyleMap = new OpenLayers.StyleMap(_ds);

			var paint;
			if(fill){
				paint = 'ON';
			} else{
				paint = 'OFF';
			}
			// 作図用に設定
			affixStyle = {
				'name' : 'circleStyle',
				'type' : 'CIRCLE',
				'display' : 'ON',
//				'displaylevel' : 'all',
				'selection' : 'ON',
				'transparent' : 'ON',
				'width' : strokeWidth + ',static',
//				'brgb' : Sakuzu.cssColorToDeci(strokeArray[0]),
				'brush' : 'solid',
				'rgb' : Sakuzu.cssColorToDeci(strokeArray[0]),
				'strokeOpacity' : strokeArray[1],
				'hrgb' : Sakuzu.cssColorToDeci(fillArray[0]),
				'fillOpacity' : fillArray[1],
				'paint': paint
			};
		}else if(subLayers[l].data.type == 'text'){
			// 文字
			// → 内部的にシンボルとして扱うよう読み替える
			var pointGeom = geoJson.parseGeometry(subLayers[l].data.geometry);
			geometry = pointGeom.transform(resultProjection, projection);
			//geometry = new webtis.Geometry.TextRectangle(geometry.x, geometry.y, true);
			geometry.bounds = new OpenLayers.Bounds(geometry.x, geometry.y, geometry.x, geometry.y);
			geometry.components = [new OpenLayers.Geometry.Point(geometry.x, geometry.y)];
			geometry.selectDisplay = true;
			geometry.label = subLayers[l].data.name;
			var icon = '';
			var iconScale = 1;
			var labelScale = 1;
			var labelColor = 'FF000000';
			var iconSize = 0;
			var fillOpa = 1;
			var offset = 0;
			var labelSelect = true;

			var iconStyle = subLayers[l].data.style.IconStyle;
			if(iconStyle == undefined){
				iconStyle = {
					heading: 0,
					href: "sys/v4/symbols/dot.png",
					scale: 1
				}
			}
			if(iconStyle.href == undefined || iconStyle.href == ""){
				iconStyle.href = "sys/v4/symbols/dot.png";
			}
			icon = iconStyle.href;
			
			if(iconStyle.scale == undefined || iconStyle.scale == 0) {
				iconStyle.scale = 1;
			}
			iconScale = iconStyle.scale;
			iconSize = 20 * iconScale;

			var labelStyle = subLayers[l].data.style.LabelStyle;
			if(labelStyle != undefined){
				if(labelStyle.scale != undefined && labelStyle.scale != 0){
					labelScale = labelStyle.scale;
				}

				if(labelStyle.color != undefined && labelStyle.color != ''){
					labelColor = labelStyle.color;
				}
			}
			// テキストの基本サイズを10とする
			var labelSize = 10 * labelScale;

			// 文字の色と透明度を取得　文字色の指定がない場合は、デフォルトで黒を指定
			fontArray = Sakuzu.convertColor(labelColor);

			// アイコン＋ラベルにチェックがついていたら
			// テキストはデフォルトで表示
			var fontOpacity = iconlabel ? 1 : 0.00001;
			
			// style設定
			defaultStyle = new OpenLayers.Style({
				'fillOpacity' : fillOpa,
				'fill' : true,
				'externalGraphic' : icon,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': iconSize/2,
				'fontColor' : fontArray[0],
				'fontOpacity' : fontOpacity,
				'fontFamily' : 'ＭＳ ゴシック',
				'fontSize' : labelSize + 'px',
				'labelAlign' : 'lm',
				'labelSelect' : labelSelect
			});

			// 選択した時のスタイル
			var selectStyle = new OpenLayers.Style({
				'fillOpacity' : fillOpa,
				'fill' : true,
				'externalGraphic' : icon,
				'graphicWidth' : iconSize,
				'graphicHeight' : iconSize,
				'graphicXOffset' : -(iconSize/2),
				'graphicYOffset' : -(iconSize/2),
				'labelXOffset': iconSize/2,
				'fontColor' : fontArray[0],
				'fontOpacity' : fontOpacity,
				'fontFamily' : 'ＭＳ ゴシック',
				'fontSize' : labelSize + 'px',
				'labelAlign' : 'lm',
				'labelSelect' : labelSelect
			});

			// レイヤにstyle設定
			var _ds = {'default' : defaultStyle, 'select' : selectStyle};
			layerStyleMap = new OpenLayers.StyleMap(_ds);

			// 作図用に設定
			affixStyle = {
				'name' : 'textStyle',
				'type' : 'SYMBOL', // 'TEXT',
				'display' : 'ON',
				'displaylevel' : 'all',
				'selection' : 'ON',
				'transparent' : 'ON',
				'rgb' : Sakuzu.cssColorToDeci(fontArray[0]), //文字色
				'fontOpacity' : fontArray[1],
				'paint' : 'ON',
				'symbol' : {
					'size' : iconSize + ',static',
					'uri' : icon
				},
				'mode':'lm',          // 修正前はCC
				'font' : {
					'name' : 'ＭＳ ゴシック',
					'style' : '標準',
					'size' : labelSize + 'px'
				}
			};
			
			// テキスト→シンボルに読み替え
			subLayers[l].data.type = 'symbol';
		}

		// feature作成
		if (geometry) {
			//var feature = new OpenLayers.Feature.Vector(geometry, attributes, style);
			var attributes = {};
			attributes["name"] = subLayers[l].data.name ? subLayers[l].data.name : "";
			attributes["description"] = subLayers[l].data.description ? subLayers[l].data.description : "";
			var feature = new OpenLayers.Feature.Vector(geometry, attributes);
			features.push(feature);
		}

		// 読み込んだ地物情報を表示するのに、Sakuzu.LayerVectorを使用する
		var layerName = subLayers[l].data.layerName ? subLayers[l].data.layerName : "レイヤー";
		var layer = new Sakuzu.LayerVector(layerName, layerStyleMap ? {styleMap: layerStyleMap} : null);
		layer.description = subLayers[l].data.description;
		layer.visibility = true;
		layer.styleType = subLayers[l].data.type;
		// 選択出来るか否かを設定
		layer.JSGISelection = true;
		// レイヤの表示/非表示切り替え用
		layer.filename = subLayers[l].filename;
		layer.affixStyle = affixStyle;
		layer.addFeatures(features);
		sakuzuModule.addLayer(layer);
		var layerBounds = layer.getDataExtent();
		if (layerBounds) {
			if (!bounds) {
				bounds = new OpenLayers.Bounds(layerBounds.left, layerBounds.bottom, layerBounds.right, layerBounds.top);
			} else {
				bounds.extend(layerBounds);
			}
		}
		fileName = subLayers[l].filename;
		// ループの最後で切り替えエリアに読み込んだファイル名を表示する
		if(l == subLayers.length - 1){
			Sakuzu.addLayerList(fileName);
		}
	}

	if(dispFlg){
		// ポップアップ表示ONの時だけ実施
		sakuzuModule.enablePopupLayer();
	}
	if(bounds && zoomflg){
		map.zoomToExtent(bounds, false);
	}
};

/**
 * 色を変換する
 */
Sakuzu.convertColor = function(strColor) {
	var colorArray = [];
	var color = null;
	var opacity = 0;
	if(strColor == '' || strColor == undefined){
		color = '#00FF00';
		colorArray.push(color);
		opacity = 0.5;
		colorArray.push(opacity);
	} else{
		if(strColor.length == 8){
			// 文字列の長さが8桁だったら、変換対象にする
			color = '#' + strColor.substring(6,8) + strColor.substring(4,6) + strColor.substring(2,4);
			colorArray.push(color);
			var aa = strColor.substring(0,2);
			aa = (parseInt(aa,16) / 255) * 100;
			opacity = Math.round(aa) / 100;
			colorArray.push(opacity);
		} else{
			// 文字列の長さが8桁以外だったら、デフォルト値を設定する
			color = '#00FF00';
			colorArray.push(color);
			opacity = 0.5;
			colorArray.push(opacity);
		}
	}
	return colorArray;
};

/**
 * 現在の時刻を文字列で取得(yyyymmddhhmmss)
 */
Sakuzu.getCurrent = function(){
	var current = new Date();
	
	var Year = current.getFullYear();
	var Month = current.getMonth() + 1;
	var Day = current.getDate();
	var Hour = current.getHours();
	var Minute = current.getMinutes();
	var Second = current.getSeconds();

	var ret;
	ret = String(Year) + ("0" + String(Month)).slice(-2) + ("0" + String(Day)).slice(-2) + ("0" + String(Hour)).slice(-2) + ("0" + String(Minute)).slice(-2) + ("0" + String(Second)).slice(-2);
	
	return ret;
}

Sakuzu.addLayerList = function(fileName) {
	layerModule.addNode({name: fileName});
};

Sakuzu.isTableDescription = function(description) {
	var key = [];
	var value = [];

	// 属性情報入力方法切り替え
	// HTML指定フォーマット定義
	var table_start = '<table'
	var tr_start = 'tr'
	var key_start = 'td style="color:#0000FF;padding-right:1em;"'
	var val_start = 'td'
	var link_start = 'a href'
	var link_end = '/a'
	var td_end = '/td'
	var tr_end = '/tr'
	var table_end = '/table>'

	var okflg = 0;				// 構文チェックフラグ
	var status = 0;				// 0:文頭構文チェックＯＫ　1:項目名_取得準備完了　2:値_取得準備完了
	var key = new Array();		// 項目名
	var value = new Array();	// 値
	var j = 0;					// データ数

	if (description){
		var splitItems = description.split("><");
		for(var i = 0; i < splitItems.length; i++) {
			var item = splitItems[i];
			if(i == 0){	
			// 文頭が<table>か？
				if(item != table_start){
					break;
				}
				status = 1;
			} else if(i == splitItems.length-1){
			// 文末が</table>か？
				if(status != 1){
					break;
				}
				if(item != table_end){
					break;
				}
				okflg = 1;
			} else if(status == 1){
			// 【項目名のチェック＆取得】
				// 項目名の文頭構文チェック
				if(item != tr_start){				// <tr>かチェック
					break;
				}
				i = i + 1;
				var item = splitItems[i];
				var keyitem1 = item.split(">");
				if(keyitem1[0] != key_start){		// <td ・・・>かチェック
					break;
				}
				if(keyitem1.length == 2){
				// 項目名の構文チェック＜項目名データあり＞
					var keyitem2 = keyitem1[1].split("<");
					if(keyitem2.length != 2){		//「<」区切りの要素が2個かチェック
						break;
					}
					if(keyitem2[1] != td_end){		// </td>かチェック
						break;
					}
					key[j] = keyitem2[0];			// 項目名データを取得
				} else {
				// 項目名の構文チェック＜項目名データなし(空欄)＞
					i = i + 1;
					var item = splitItems[i];
					if(item != td_end){				// </td>かチェック
						break;
					}
					key[j] = "";					// 項目名データ(空)を取得
				}
				status = 2;
			} else if(status == 2){
			// 【値のチェック＆取得】
				var valitem1 = item.split(">");
				if(valitem1[0] != val_start){		// <td ・・・>かチェック
					break;
				}
				// 値の文末構文チェック＜値データあり(文字列)＞
				if(valitem1.length == 2){
					var valitem2 = valitem1[1].split("<");
					if(valitem2.length != 2){		//「<」区切りの要素が2個かチェック
						break;
					}
					if(valitem2[1] != td_end){		// </td>かチェック
						break;
					}
					i = i + 1;
					var item = splitItems[i];
					if(item != tr_end){				// </tr>かチェック
						break;
					}
					value[j] = valitem2[0];			// 値データを取得
					j = j + 1;
					status = 1;
				} else if(valitem1.length == 1){
					i = i + 1;
					var item = splitItems[i];
					if(item == td_end){				//「/td」かチェック
				// 値の文末構文チェック＜値データなし(空欄)＞
						i = i + 1;
						var item = splitItems[i];
						if(item != tr_end){			// </tr>かチェック
							break;
						}
						value[j] = "";				// 値データ(空)を取得
					} else {
				// 値の文末構文チェック＜値データあり(リンク)＞
						// リンクの文頭構文チェック
						var linkitem1 = item.split("=");
						if(linkitem1[0] != link_start){	// <a href>かチェック
							break;
						}
						// リンクの文末構文チェック
						linkitem1 = item.split(">");
						if(linkitem1.length != 2){		// 「>」区切りの要素が2個かチェック
							break;
						}
						var linkitem2 = linkitem1[1].split("<");
						if(linkitem2.length != 2){		// 「<」区切りの要素が2個かチェック
							break;
						}
						if(linkitem2[1] != link_end){	// </a>かチェック
							break;
						}
						i = i + 1;
						var item = splitItems[i];
						if(item != td_end){				// </td>かチェック
							break;
						}
						i = i + 1;
						var item = splitItems[i];
						if(item != tr_end){				// </tr>かチェック
							break;
						}
						value[j] = linkitem2[0];		// 値データ(リンク)を取得
					}
					j = j + 1;
					status = 1;
				}else{
					break;
				}
			} else {
				break;
			}
		}
	}

	return (okflg == 1 && j > 0 || !description);
}

Sakuzu.escapeDescription = function(str) {
	var parts = [];

	var str = str.replace(/\n/g, "");

	while (str.length > 0) {
		var m = str.match(/<[^>]+>/i);
		if (!m) {
			parts.push({
				part: str,
				istag: false
			});
			break;
		}
		
		if (m.index > 0) {
			parts.push({
				part: str.substr(0, m.index),
				istag: false
			});
		}
		
		parts.push({
			part: m[0],
			istag: true
		});
		str = str.substr(m.index + m[0].length);
	}

	var ret = "";

	var wlist = [
		{
			tag: "a",
			attr: [
				{ name: "href" },
				{ name: "style" }
			],
			force: [
				{ name: "target", value: "_blank" }
			]
		},
		{ tag: "br" },
		{ tag: "hr" },
		{ tag: "b" },
		{ tag: "i" },
		{ tag: "u" },
		{
			tag: "font",
			attr: [
				{ name: "size" },
				{ name: "color" },
				{ name: "style" }
			]
		},
		{
			tag: "table",
			attr: [
				{ name: "width" },
				{ name: "style" }
			]
		},
		{
			tag: "tr",
			attr: [
				{ name: "align" },
				{ name: "style" }
			]
		},
		{
			tag: "td",
			attr: [
				{ name: "align" },
				{ name: "height" },
				{ name: "width" },
				{ name: "colspan" },
				{ name: "rowspan" },
				{ name: "style" }
			]
		},
	]

	for (var i = 0; i < parts.length; i++) {
		if (parts[i].istag) {
		
			var part = parts[i].part;
		
			if (part.match(/javascript/i)){
				continue;
			}
		
			var tag = part.match(/<(\S+)(?:\s+.+)?>/);

			if (tag) {
				// タグ
				for (var j = 0; j < wlist.length; j++) {
					if (!wlist[j]) break;
					
					var re = new RegExp("\/?" + wlist[j].tag + "$", "i");
					var ma = tag[1].match(re);

					if (ma) {
						var vals = [];
						var attrs = wlist[j].attr ? wlist[j].attr : [];
						
						// 属性チェック
						for(var k = 0; k < attrs.length; k++) {
							// ダブルクォーテーションなし
							var re1 = new RegExp(".+<?\\s" + attrs[k].name + "=\\s*(.*?)[\\s|>].*", "i");
							var val1 = part.match(re1);
							if (val1 && !val1[1].match(/[\'|"]/i)) {
								vals.push({
									name: attrs[k].name,
									value: val1[1]
								});
								continue;
							}

							// ダブルクォーテーションあり
							var re2 = new RegExp(".+<?\\s" + attrs[k].name + "=[\\'|\"](.*?)[\\'|\"].*", "i");
							var val2 = part.match(re2);
							if (val2) {
								vals.push({
									name: attrs[k].name,
									value: val2[1]
								});
								continue;
							}
						}

						// 必須属性
						if (wlist[j].force) {
							vals = vals.concat(wlist[j].force);
						}

						if (vals.length > 0) {
							ret = ret + "<" +  wlist[j].tag;
							for (var m = 0; m < vals.length; m++) {
								ret = ret + ' ' + vals[m].name + '="' + vals[m].value + '"';
							}
							ret = ret + ">";
						}
						else {
							ret = ret + "<" + ma[0] + ">";
						}
					}
				}
			}
		}
		else {
			// タグ以外の文字をエスケープ
			ret = ret + webtis.Format.JSGIJSON.escapeHTML(parts[i].part);
		}
	}
	
	return ret;
};

Sakuzu.LayerVector = OpenLayers.Class(webtis.Layer.Vector, {
	
	displayLevel: "all",
	
	initialize: function(name, options) {
		this.renderers = [Sakuzu.RendererSVG, Sakuzu.RendererVML, 'Canvas'];
		//this.renderers = [webtis.Renderer.SVG, Sakuzu.RendererVML, 'Canvas'];
		OpenLayers.Layer.Vector.prototype.initialize.apply(this, arguments);
	},

	CLASS_NAME: "Sakuzu.LayerVector"
});

Sakuzu.RendererVML = OpenLayers.Class(webtis.Renderer.VML, {
	setStyle: function(node, style, options, geometry) {
		style = style  || node._style;
		options = options || node._options;
		var fillColor = style.fillColor;

		if (node._geometryClass === "OpenLayers.Geometry.Point") {
			if (style.externalGraphic && style.fillOpacity!=0) {
				if (style.graphicTitle) {
					node.title=style.graphicTitle;
				} 
				var width = style.graphicWidth || style.graphicHeight;
				var height = style.graphicHeight || style.graphicWidth;
				width = width ? width : style.pointRadius*2;
				height = height ? height : style.pointRadius*2;

				var resolution = this.getResolution();
				
				var xOffset = (style.graphicXOffset != undefined) ?
						style.graphicXOffset : -(0.5 * width);
				var yOffset = (style.graphicYOffset != undefined) ?
						style.graphicYOffset : -(0.5 * height);

				node.style.left = (((geometry.x/resolution - this.offset.x)+xOffset) | 0) + "px";
				node.style.top = (((geometry.y/resolution - this.offset.y)-(yOffset+height)) | 0) + "px";
				
				node.style.width = width + "px";
				node.style.height = height + "px";
				node.style.flip = "y";

				// modify fillColor and options for stroke styling below
				fillColor = "none";
				options.isStroked = false;
			} else if (this.isComplexSymbol(style.graphicName)) {
				var cache = this.importSymbol(style.graphicName);
				node.path = cache.path;
				node.coordorigin = cache.left + "," + cache.bottom;
				var size = cache.size;
				node.coordsize = size + "," + size;
				this.drawCircle(node, geometry, style.pointRadius);
				node.style.flip = "y";
			} else {
				this.drawCircle(node, geometry, style.pointRadius);
			}
		}

		// fill 
		if (options.isFilled) { 
			node.fillcolor = fillColor; 
		} else { 
			node.filled = "false"; 
		}
		var fills = node.getElementsByTagName("fill");
		var fill = (fills.length == 0) ? null : fills[0];
		if (!options.isFilled) {
			if (fill) {
				node.removeChild(fill);
			}
		} else {
			if (!fill) {
				fill = this.createNode('olv:fill', node.id + "_fill");
			}
			fill.opacity = style.fillOpacity;

			if (node._geometryClass === "OpenLayers.Geometry.Point" &&
					style.externalGraphic) {

				// override fillOpacity
				if (style.graphicOpacity) {
					fill.opacity = style.graphicOpacity;
				}

				fill.src = style.externalGraphic;
				fill.type = "frame";

				if (!(style.graphicWidth && style.graphicHeight)) {
					fill.aspect = "atmost";
				}
			}
			if (fill.parentNode != node) {
				node.appendChild(fill);
			}
		}

		if(node._geometryClass === "OpenLayers.Geometry.Point") {
			node.style.rotation = 0;
		}

		// stroke 
		var strokes = node.getElementsByTagName("stroke");
		var stroke = (strokes.length == 0) ? null : strokes[0];
		if (!options.isStroked) {
			node.stroked = false;
			if (stroke) {
				stroke.on = false;
			}
		} else {
			if (!stroke) {
				stroke = this.createNode('olv:stroke', node.id + "_stroke");
				node.appendChild(stroke);
			}
			stroke.on = true;
			stroke.color = style.strokeColor; 
			stroke.weight = style.strokeWidth + "px"; 
			stroke.opacity = style.strokeOpacity;
			stroke.endcap = style.strokeLinecap == 'butt' ? 'flat' :
				(style.strokeLinecap || 'round');
			if (style.strokeDashstyle) {
				stroke.dashstyle = this.dashStyle(style);
			}
		}

		if (style.cursor != "inherit" && style.cursor != null) {
			node.style.cursor = style.cursor;
		}
		return node;
	},
	_drawText: function(featureId, style, location, label) {
		var labelText = label;
		var label = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX, "olv:rect");
		var textbox = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX + "_textbox", "olv:textbox");
		
		var labelFontSize = 12.0;
		if (style.fontSize) {
			labelFontSize = parseFloat(style.fontSize);
		}
		if (labelFontSize%2!=0) {
			labelFontSize+=1;
		}
		
		var labelWidth = this._calcLabelWidth(labelText,labelFontSize,style.fontWeight == "bold")+(labelFontSize/2);
		var labelHeight = ((labelFontSize * 1.5) | 0);
		
		var resolution = this.getResolution();
		
		var labelLeft = (location.x/resolution - this.offset.x) | 0;
		var labelTop = (location.y/resolution - this.offset.y) | 0;
		labelTop -= labelHeight;

		label.style.left = labelLeft + "px";
		label.style.top = labelTop + "px";
		label.style.width = labelWidth + "px";
		label.style.height = labelHeight + "px";
		label.style.flip = "y";

		//背景色・囲いは常になし
		label.stroked = false;
		label.filled = false;

		if (style.fill) { 
			label.fillcolor = style.fillColor;
			var fill = fill = this.createNode('olv:fill', featureId + "_fill");;
			fill.opacity = style.fillOpacity;
			label.appendChild(fill);
		}

		textbox.innerText = labelText;
		textbox.style.fontFamily = "monospace";
		textbox.style.fontSize = labelFontSize + "px";
		textbox.style.lineHeight = labelFontSize + "px";
		if (style.fontColor) {
			textbox.style.color = style.fontColor;
			if (style.orgStyle == 'select') textbox.style.color = "#0000ff";
		}
		if (style.fontOpacity) {
			textbox.style.filter = 'alpha(opacity=' + (style.fontOpacity * 100) + ')';
			if (style.orgStyle == 'select') textbox.style.filter = 'alpha(opacity=50)';
		}
		if (style.fontFamily) {
			textbox.style.fontFamily = style.fontFamily;
		}
		if (style.fontWeight) {
			textbox.style.fontWeight = style.fontWeight;
		}
		
		if(style.labelSelect === true) {
			label._featureId = featureId;
			textbox._featureId = featureId;
			textbox._geometry = location;
			textbox._geometryClass = location.CLASS_NAME;
		}else{
			textbox._featureId = null;
		}
		
		textbox.style.whiteSpace = "nowrap";
		
		var inset = ((labelFontSize/4) | 0) + "px";
		textbox.inset = inset + "," + inset + "," + inset + "," + inset;
		//if(!label.parentNode) {
			label.appendChild(textbox);
			this.textRoot.appendChild(label);
		//}
		
		var align = style.labelAlign || "cm";
		if (align.length == 1) {
			align += "m";
		}
		textbox.style.textAlign="center";
		var labelHeight = textbox.clientHeight;
		var xshift = 0;
		if (align.indexOf("l") == 0) {
			xshift = 0;;
		} else if (align.indexOf("r") == 0) {
			xshift = (labelWidth+(labelFontSize/2));
		} else {
			xshift = (labelWidth+(labelFontSize/2))/2;
		}
		var yshift = (labelHeight+(labelFontSize/2))/2;
		
		labelLeft = labelLeft - xshift - 1;
		labelTop = labelTop + yshift;
		
		label.style.left = (labelLeft | 0) + "px";
		label.style.top = (labelTop | 0) + "px";
		
	},

	CLASS_NAME: "Sakuzu.RendererVML"

});

Sakuzu.RendererSVG = OpenLayers.Class(webtis.Renderer.SVG, {
	_drawText: function(featureId, style, location, _label, _bbox) {
		var resolution = this.getResolution();
		
		var x = (location.x / resolution + this.left);
		var y = (location.y / resolution - this.top);
		
		var label = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX, "text");
		var tspan = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX + "_tspan", "tspan");
		label.setAttributeNS(null, "x", x);
		label.setAttributeNS(null, "y", -y);

		if (style.fontColor) {
			label.setAttributeNS(null, "fill", style.fontColor);
			if (style.orgStyle == 'select'){
				label.setAttributeNS(null, "fill", "#0000ff");
			}
		}
		if (style.fontOpacity) {
			label.setAttributeNS(null, "opacity", style.fontOpacity);
			if (style.orgStyle == 'select'){
				label.setAttributeNS(null, "opacity", 0.5);
			}
		}
		if (style.fontFamily) {
			label.setAttributeNS(null, "font-family", style.fontFamily);
		}
		if (style.fontSize) {
			label.setAttributeNS(null, "font-size", style.fontSize);
			label.setAttributeNS(null,"style","line-height:1em;");
		}
		if (style.fontWeight) {
			label.setAttributeNS(null, "font-weight", style.fontWeight);
		}
		if(style.labelSelect === true) {
			label.setAttributeNS(null, "pointer-events", "visible");
			label._featureId = featureId;
			tspan._featureId = featureId;
			tspan._geometry = location;
			tspan._geometryClass = location.CLASS_NAME;
		} else {
			label.setAttributeNS(null, "pointer-events", "none");
		}
		var align = style.labelAlign || "cm";
		label.setAttributeNS(null, "text-anchor",
				OpenLayers.Renderer.SVG.LABEL_ALIGN[align[0]] || "middle");
		if (OpenLayers.IS_GECKO === true) {
			label.setAttributeNS(null, "dominant-baseline",
				OpenLayers.Renderer.SVG.LABEL_ALIGN[align[1]] || "central");
		}
		if (OpenLayers.IS_GECKO === false) {
			if (OpenLayers.BROWSER_NAME != "msie") {
				tspan.setAttributeNS(null, "baseline-shift",
					OpenLayers.Renderer.SVG.LABEL_VSHIFT[align[1]] || "-35%");
			}
		}
		tspan.textContent = _label;
		if(!label.parentNode) {
			label.appendChild(tspan);
			this.textRoot.appendChild(label);
		}
		var textBbox = label.getBBox();
		if(OpenLayers.BROWSER_NAME == "msie") {
			var ratio = 0;
			if (align[1] == "t") {
				ratio = 0.85;// 微調整済み
			} else if (align[1] == "b") {
				ratio = 0;
			} else {
				ratio = 0.35;
			}
			label.setAttributeNS(null, "y", -y+(textBbox.height*ratio));
			textBbox = label.getBBox();
		}
		
		// くくり線を設定。
		if (_bbox) {
			_bbox.setAttributeNS(null,"x",textBbox.x-5);
			_bbox.setAttributeNS(null,"y",textBbox.y);
			_bbox.setAttributeNS(null,"width",textBbox.width+10);
			_bbox.setAttributeNS(null,"height",textBbox.height);
		}
	},
	
	CLASS_NAME: "Sakuzu.RendererSVG"
});


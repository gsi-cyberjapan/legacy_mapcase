/** 印刷プレビュー用Javascript実装 **/

//プリンタボタンインスタンス
var printerControl;

//プリント画面フラグ
var printMapFlg = 0;

//printsizeコントロールのインスタンス(セレクトメニューを開くためのボタン)
var printsize = null;
 
//printsizecloseコントロールのインスタンス(セレクトメニューを閉じるためのボタン)
var printsizeclose = null;

// 右上のプリントアイコンを定義
webtis.Control.Printer = OpenLayers.Class(OpenLayers.Control, {
	
	createCtrlImage: function(url, left, handler) {
		var	image = document.createElement('img');
		image.src = url;
		image.id = "img_printer";
		image.disabled = false;
		image.title = "プリント";
		image.style.position = "absolute";
		image.style.left = left + "px";
		image.style.width = '31px';
		image.style.height = '31px';
		if (handler) {
			// only handle click
			OpenLayers.Event.observe(image, "mousedown", 
				OpenLayers.Function.bindAsEventListener(handler, this));
			OpenLayers.Event.observe(image, "click", 
			OpenLayers.Function.bindAsEventListener(function(e) {
					OpenLayers.Event.stop(e);
					return false;
				}, this));
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
			this.div.style.right = 175 + "px";
 
			this.createCtrlImage("sys/v4/image/printer.PNG", 0, function(e) {
				printmap(1);
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
	
	CLASS_NAME: "webtis.Control.Printer"
});

// 右上のプリントサイズ選択アイコンを定義
webtis.Control.PrintSize = OpenLayers.Class(OpenLayers.Control, {
	
	createCtrlImage: function(url, left, handler) {
		var	image = document.createElement('img');
		image.src = url;
		image.id = "img_allow_open";
		image.disabled = false;
		image.title = "プリントサイズ選択";
		image.style.position = "absolute";
		image.style.left = left + "px";
		image.style.width = '15px';
		image.style.height = '31px';
		if (handler) {
			// only handle click
			OpenLayers.Event.observe(image, "mousedown", 
				OpenLayers.Function.bindAsEventListener(handler, this));
			OpenLayers.Event.observe(image, "click", 
			OpenLayers.Function.bindAsEventListener(function(e) {
					OpenLayers.Event.stop(e);
					return false;
				}, this));
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
			this.div.style.right = 145 + "px";
 
			this.createCtrlImage("sys/v4/image/arrow.PNG", 0, function(e) {
				printsizeselect();
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
	
	CLASS_NAME: "webtis.Control.PrintSize"
});
// 右上のプリントサイズ選択セレクトボックスを閉じるためのコントロール定義
webtis.Control.PrintSizeClose = OpenLayers.Class(OpenLayers.Control, {
	
	createCtrlImage: function(url, left, handler) {
		var	image = document.createElement('img');
		image.src = url;
		image.title = "プリントサイズ選択";
		image.style.position = "absolute";
		image.style.left = left + "px";
		image.style.width = '15px';
		image.style.height = '31px';
		if (handler) {
			// only handle click
			OpenLayers.Event.observe(image, "mousedown", 
				OpenLayers.Function.bindAsEventListener(handler, this));
			OpenLayers.Event.observe(image, "click", 
			OpenLayers.Function.bindAsEventListener(function(e) {
					OpenLayers.Event.stop(e);
					return false;
				}, this));
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
			this.div.style.right = 145 + "px";
 
			this.createCtrlImage("sys/v4/image/arrow.PNG", 0, function(e) {
				printsizeselectclose();
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
	
	CLASS_NAME: "webtis.Control.PrintSizeClose"
});

/*印刷サイズメニューを表示する関数*/
function printsizeselect()	{

	if (!document.getElementById("img_allow_open").disabled){
//		var mod = counter % 2;
		if (!fullscreenMode){	//標準表示
			var top = 98;
		} else {				//全画面表示
			var top = 98 - 62;
		}

		var showprintsize = document.getElementById("showprintsize");
		showprintsize.style.top  = top + 'px';	//表示位置設定
		showprintsize.style.display = 'block';		//表示

		//コントロールを入れ替え
		map.removeControl(printsize);
		printsizeclose = new webtis.Control.PrintSizeClose();
		map.addControl(printsizeclose);
	}
}
 
/*印刷サイズメニューを非表示にする関数*/
function printsizeselectclose()	{
	var selectpanel = document.getElementById('showprintsize');
	if (selectpanel.style.display == 'block'){
		selectpanel.style.display = "none";		//ウインドウを非表示にする
		//コントロールを入れ替え
		map.removeControl(printsizeclose);
		printsize = new webtis.Control.PrintSize();
		map.addControl(printsize);
	}
}

/*印刷プレビュー画面表示*/
function printmap(size){
	
	if (!document.getElementById("img_printer").disabled){
		webtis.Layer.BaseMap.isShowLegend = false;

		//表示・非表示の切り替え
		document.getElementById("header").style.display = "none";			//ヘッダ
		document.getElementById("Left").style.display = "none";				//地図検索パネル
//		document.getElementById("showprintsize").style.display = "none";	//プリント用紙選択メニュー
//		document.getElementById("showcoordinate").style.display = "none";	//緯度、経度の表示ウィンドウ
		document.getElementById("submenu").style.display = "none";			//右クリックサブメニュー

		document.getElementById("printheader").style.display = "block";		//印刷プレビューヘッダ
		
		printsizeselectclose();
		clickmapclosefloating();											//背景地図選択ウィンドウ

		//コントロールの削除
		map.removeControl(printerControl);		//プリンタボタン
		map.removeControl(printsize);			//プリント用紙サイズ選択ボタン(メニュー閉)
		map.removeControl(printsizeclose);		//プリント用紙サイズ選択ボタン(メニュー開)
		map.removeControl(zoomcontrol);			//パンズームバー
		map.removeControl(mapfloating);			//背景地図・写真選択ボタン(閉)
		map.removeControl(mapclosefloating);	//背景地図・写真選択ボタン(開)
		map.removeControl(keisokuControl);		//計測ボタン
		map.removeControl(overViewControl);		//広域地図表示ボタン
		map.removeControl(shrinkcontrol);		//全画面表示切り替えボタン
		map.removeControl(sz_buttonControl);	//作図ボタン
		mapoClick.deactivate();					//右クリック操作無効
		setPrintSize(size);

		if(popupflag)	{
			map.removePopup(popup);				//ポップアップを閉じる
			popupflag = 0;
		}
		sakuzuModule.disablePopupLayer();		//ポップアップ非表示モードに設定
		sakuzuModule.unselectFeature();			//セレクト状態のオブジェクトがあれば、解除
	}
}

/*印刷用紙サイズの設定*/
function setPrintSize(size) {
	printMapFlg = size;					//印刷フラグON
	arrange_print(printMapFlg);			//印刷プレビュー画面構成に切り替え
}

/*印刷用マップのスタイル設定*/
function arrange_print(flg) {

	document.body.style.overflow = "auto";
    var header_style = document.getElementById("printheader").style;
    header_style.position = "absolute";
    header_style.left = 0 + "px";
    header_style.top = 0 + "px";
    header_style.overflow = "hidden";
    var map_style = document.getElementById("map").style;
    map_style.position = "absolute";
    map_style.left = 25 + "px";
    map_style.top = 50 + "px";
    map_style.overflow = "hidden";
    map_style.border = "solid 1px #000";
	var strHTML = '';

	if (printMapFlg == 1){
		//A4縦印刷
		header_style.width = 600 + "px";
		header_style.height = 50 + "px";
		map_style.width = 600 + "px";
		map_style.height = 900 + "px";
		strHTML += '<div style="position:absolute;top:12px;right:200px;font-size:13px;font-weight:bold;" class="insatu">A4縦</div>';
		strHTML += '<div style="position:absolute;top:29px;right:200px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(2);return false;" style="font-size:13px;">A4横</a></div>';
		strHTML += '<div style="position:absolute;top:12px;right:160px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(3);return false;" style="font-size:13px;">A3縦</a></div>';
		strHTML += '<div style="position:absolute;top:29px;right:160px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(4);return false;" style="font-size:13px;">A3横</a></div>';
	} else if (printMapFlg == 2){
		//A4横印刷
		header_style.width = 850 + "px";
		header_style.height = 50 + "px";
		map_style.width = 950 + "px";
		map_style.height = 550 + "px";
		strHTML += '<div style="position:absolute;top:12px;right:200px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(1);return false;" style="font-size:13px;">A4縦</a></div>';
		strHTML += '<div style="position:absolute;top:29px;right:200px;font-size:13px;font-weight:bold;" class="insatu">A4横</div>';
		strHTML += '<div style="position:absolute;top:12px;right:160px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(3);return false;" style="font-size:13px;">A3縦</a></div>';
		strHTML += '<div style="position:absolute;top:29px;right:160px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(4);return false;" style="font-size:13px;">A3横</a></div>';
	} else if (printMapFlg == 3){
		//A3縦印刷
		header_style.width = 850 + "px";
		header_style.height = 50 + "px";
		map_style.width = 950 + "px";
		map_style.height = 1350 + "px";
		strHTML += '<div style="position:absolute;top:12px;right:200px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(1);return false;" style="font-size:13px;">A4縦</a></div>';
		strHTML += '<div style="position:absolute;top:29px;right:200px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(2);return false;" style="font-size:13px;">A4横</a></div>';
		strHTML += '<div style="position:absolute;top:12px;right:160px;font-size:13px;font-weight:bold;" class="insatu">A3縦</div>';
		strHTML += '<div style="position:absolute;top:29px;right:160px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(4);return false;" style="font-size:13px;">A3横</a></div>';
	} else {
		//A3横印刷
		header_style.width = 850 + "px";
		header_style.height = 50 + "px";
		map_style.width = 1400 + "px";
		map_style.height = 900 + "px";
		strHTML += '<div style="position:absolute;top:12px;right:200px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(1);return false;" style="font-size:13px;">A4縦</a></div>';
		strHTML += '<div style="position:absolute;top:29px;right:200px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(2);return false;" style="font-size:13px;">A4横</a></div>';
		strHTML += '<div style="position:absolute;top:12px;right:160px;" class="insatu"><a href="javascript:void(0);" onclick="setPrintSize(3);return false;" style="font-size:13px;">A3縦</a></div>';
		strHTML += '<div style="position:absolute;top:29px;right:160px;font-size:13px;font-weight:bold;" class="insatu">A3横</div>';
	}
	document.getElementById('printlink').innerHTML = strHTML;

	//マップ領域のリサイズ設定
	map.updateSize();
}

/*元の画面に戻る*/
function mainwindow() {

	webtis.Layer.BaseMap.isShowLegend = true;

	document.body.style.overflow = "hidden";
	document.getElementById("header").style.display = "block";
	document.getElementById("Left").style.display = "block";
	document.getElementById("printheader").style.display = "none";

	if (hasZoomCtrl) {
		//パンズームバーコントロール表示
		zoomcontrol = new OpenLayers.Control.PanZoomBar({slideFactor:100});	
		map.addControl(zoomcontrol);
	}

	//MapFloatingコントロール表示
	mapfloating = new webtis.Control.MapFloating();
	map.addControl(mapfloating);

	//計測ボタンコントロール表示
	keisokuControl = new webtis.Control.keisoku();
	map.addControl(keisokuControl);
	
	//プリンタボタンコントロール表示
	printerControl = new webtis.Control.Printer();
	map.addControl(printerControl);
	
	//プリントサイズコントロール表示
	printsize = new webtis.Control.PrintSize();
	map.addControl(printsize);

	//右下に広域図スイッチを設置
	overViewControl = new webtis.Control.GisOverviewMap();
	map.addControl(overViewControl);

	if (isSakuzu) {
		//作図ボタンコントロール表示
		sz_buttonControl = new webtis.Control.sz_button();
		map.addControl(sz_buttonControl);
	}

//	var mod = counter % 2;
	if ( fullscreenMode ){
	    //地図表示領域左上に地図表示縮小ボタンを追加する
	    shrinkcontrol = new webtis.Control.ShrinkMap();
	    map.addControl(shrinkcontrol);
	}

	mapoClick.activate();				//右クリック操作有効

	printMapFlg = 0;					//印刷フラグOFF
	arrange();							//標準画面構成に切り替え
	map.updateSize();					//マップ領域のリサイズ設定

	sakuzuModule.enablePopupLayer();	//ポップアップ表示モードに設定
	sakuzuModule.unselectFeature();		//セレクト状態のオブジェクトがあれば、解除

	webtisMap.redraw(true);
}
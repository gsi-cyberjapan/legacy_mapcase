/* 電子国土右上のプルダウンメニューの設定 */
var ConfigMenu = {};

(function($){
jQuery.fn.ConfigMenu = function(config) {

	// メニュー表示用のパネル
	ConfigMenu.popup = config.panel;

	// ボタン
	var menuButton = $("<div class='legendattr panelbutton' border='1' id='linkButtonBody'><a href='#'>他のWeb地図で見る</a></div>\
						<div class='legendattr panelbutton' border='1' id='configButtonBody'><a href='#'>表示</a></div>\
						<div class='legendattr panelbutton' border='1' id='getButtonBody'><a href='#'>入手</a></div>");
	this.append(menuButton);

	// メニューの定義
	var linkMenuDiv = 
		"<div class='configMenu' style='position:absolute; right:214px; top:50px;'>\
			<div style='float:right'>\
				<table border=1 cellspacing=0 cellpadding=3 valign='center'>\
					<tr>\
						<td class='configMenuTitle' style='width:127px;'>他のサイトに移動</td>\
					</tr>\
					<tr>\
						<td id='item_mapion' class='configMenuItem'><img src='http://www.mapion.co.jp/img/logo/L120_40.gif'></td>\
					</tr>\
					<tr>\
						<td id='item_itsumonavi' class='configMenuItem'><img src='sys/v4/map_link/banner/itsumo_navi.gif'></td>\
					</tr>\
				</table>\
			</div>\
		</div>";

	var shareMenuDiv = 
		"<div class='configMenu' style='position:absolute; right:120px; top:50px;'>\
			<div style='float:right'>\
				<table border=1 cellspacing=0 cellpadding=3 valign='center'>\
					<tr>\
						<td class='configMenuTitle' style='width:195px;'>共有方法を選択</td>\
					</tr>\
					<tr>\
						<td id='item_url' class='configMenuItem'>メールやチャット用リンクを取得</td>\
					</tr>\
					<tr>\
						<td id='item_iframe' class='configMenuItem'>ウェブサイトに埋め込み</td>\
					</tr>\
					<tr>\
						<td id='item_html' class='configMenuItem'>名前をつけて保存</td>\
					</tr>\
				</table>\
			</div>\
		</div>";

	var configMenuDiv = 
		"<div class='configMenu' style='position:absolute; right:66px; top:50px;'>\
			<div style='float:right'>\
				<table border=1 cellspacing=0 cellpadding=3 valign='center'>\
					<tr>\
						<td class='configMenuTitle' style='width:140px;'>表示を切替</td>\
					</tr>\
					<tr>\
						<td id='item_center' class='configMenuItem'>中心位置の十字線<span id='marker_center' class='configMenuMarker'>off</span></td>\
					</tr>\
					<tr>\
						<td id='item_iconlabel' class='configMenuItem'>アイコンのラベル<span id='marker_iconlabel' class='configMenuMarker'>on</span></td>\
					</tr>\
					<tr>\
						<td id='item_flash' class='configMenuItem'>フラッシュ版</td>\
					</tr>\
				</table>\
			</div>\
		</div>";

	var getMenuDiv =
		"<div class='configMenu' style='position:absolute; right:12px; top:50px;'>\
			<div style='float:right'>\
				<table border=1 cellspacing=0 cellpadding=3 valign='center'>\
					<tr>\
						<td class='configMenuTitle' style='width:140px;'>地図やデータを入手</td>\
					</tr>\
					<tr>\
						<td id='item_getbasemap' class='configMenuItem'>基盤地図情報</td>\
					</tr>\
					<tr>\
						<td id='item_getmaponline' class='configMenuItem'>数値地図（オンライン）</td>\
					</tr>\
					<tr>\
						<td id='item_getmapcddvd' class='configMenuItem'>数値地図（CD/DVD）</td>\
					</tr>\
					<tr>\
						<td id='item_getmappaper' class='configMenuItem'>紙地図</td>\
					</tr>\
					<tr>\
						<td id='item_getphoto' class='configMenuItem'>空中写真</td>\
					</tr>\
					<tr>\
						<td id='item_getinfo' class='configMenuItem'>国土地理院技術資料</td>\
					</tr>\
				</table>\
			</div>\
		</div>";

	// ボタン押下時のイベント
	$(".panelbutton").mousedown(function(){
		// メニューが表示されていれば閉じ、閉じられていれば表示する
		if (ConfigMenu.popup.css("visibility") == "visible"){
			ConfigMenu.close();
		}
		else{
			ConfigMenu.popup.empty();
			
			switch($(this)[0].id){
			// 「他のWeb地図で見る」メニューを作成
			case 'linkButtonBody':
				ConfigMenu.popup.append(linkMenuDiv);
				$("#item_mapion").mousedown(onMapion);
				$("#item_itsumonavi").mousedown(onItsumoNavi);

				break;
			
			// 「地図を共有」メニューを作成
			case 'shareButtonBody':
				ConfigMenu.popup.append(shareMenuDiv);
				
				$("#item_url").mousedown(onUrl);
				$("#item_iframe").mousedown(onIframe);
				$("#item_html").mousedown(onHtml);
				break;

			// 「表示」メニューを作成
			case 'configButtonBody':
				ConfigMenu.popup.append(configMenuDiv);
				updateMarker();
				
				$("#item_center").mousedown(onCenter);
				$("#item_iconlabel").mousedown(onIconLabel);
				$("#item_flash").mousedown(onFlash);
				break;

			// 「入手」メニューを作成
			case 'getButtonBody':
				ConfigMenu.popup.append(getMenuDiv);

				$("#item_getbasemap").mousedown(onLink);
				$("#item_getmaponline").mousedown(onLink);
				$("#item_getmapcddvd").mousedown(onLink);
				$("#item_getmappaper").mousedown(onLink);
				$("#item_getphoto").mousedown(onLink);
				$("#item_getinfo").mousedown(onLink);

				break;
			}

			ConfigMenu.open();
		}
	});

	
	// 「他のWeb地図で見る」メニュー --------
	// マピオンのメニューを選択時
	var onMapion = $.proxy(function() {
		openMapLink(LinkKey.Mapion);
		ConfigMenu.close()
	}, this);
	
	// いつもNAVIのメニューを選択時
	var onItsumoNavi = $.proxy(function() {
		openMapLink(LinkKey.ItsumoNavi);
		ConfigMenu.close()
	}, this);
	
	// 「地図を共有」メニュー --------------------
	// 「メールやチャット用リンクを取得」選択時
	var onUrl = $.proxy(function() {
		sakuzuModule.urlSave(true);
		ConfigMenu.close();
	}, this);

	// 「ウェブサイトに埋め込み」選択時
	var onIframe = $.proxy(function() {
		sakuzuModule.urlSave(false);
		ConfigMenu.close();
	}, this);

	// 「名前をつけて保存」選択時
	var onHtml = $.proxy(function() {
		sakuzuModule.htmlIfrSave();
		ConfigMenu.close();
	}, this);
	
	// 「表示」メニュー --------------------
	// 「中心位置マーカー」メニュー選択時
	var onCenter = $.proxy(function() {
		// メニューのon/offを反転
		centercross = !centercross;
		updateMarkerCenterCross();

		// 十字マーカーを表示/非表示
		if (centercross){
			createScaleCross();
		}
		else{
			removeScaleCross();
		}
	}, this);

	// 「アイコンラベル」メニュー選択時
	var onIconLabel = $.proxy(function() {
		// メニューのon/offを反転
		sakuzuModule.changeIconlabel(!iconlabel);
		updateMarkerIconLabel();
	}, this);

	// 「フラッシュ」メニュー選択時
	var onFlash = $.proxy(function() {
		var mapinfo = sakuzuModule.createParameter();
		var lat = String(Math.floor(mapinfo.lat * 1000000) / 1000000);
		var lon = String(Math.floor(mapinfo.lon * 1000000) / 1000000);
		var url = "http://portal.cyberjapan.jp/site/mapusef/?lat=" + lat + "&lon=" + lon + "&z=" + mapinfo.zoomLevel;
		window.open(url);
		ConfigMenu.close();
	}, this);

	var onLink = $.proxy(function(e) {
		var link = {
			"item_getbasemap":	"http://fgd.gsi.go.jp/download/",
			"item_getmaponline":"http://net.jmc.or.jp/digital_data_gsiol.html",
			"item_getmapcddvd":	"http://www.jmc.or.jp/data/index.html",
			"item_getmappaper":	"http://www.jmc.or.jp/map/index.html",
			"item_getphoto":	"http://www.jmc.or.jp/photo/index.html",
			"item_getinfo":		"http://www.gsi.go.jp/REPORT/TECHNICAL/technical.html"
		};
		if (link[e.currentTarget.id]) {
			setTimeout('window.open("' + link[e.currentTarget.id] + '");', 200);
			// window.open(link[e.currentTarget.id]);
		}
		ConfigMenu.close();
	}, this);

	// 表示メニューのマーカーを更新
	var updateMarker = $.proxy(function() {
		updateMarkerCenterCross();
		updateMarkerIconLabel();
	}, this);

	// 「中心位置マーカー」メニューのマーカーを更新
	var updateMarkerCenterCross = $.proxy(function() {
		$("#marker_center").text(centercross ? "on" : "off");
		$("#marker_center").css("color", centercross ? "#F06222" : "#22AAAA");
	}, this);
	
	// 「アイコンラベル」メニューのマーカーを更新
	var updateMarkerIconLabel = $.proxy(function() {
		$("#marker_iconlabel").text(iconlabel ? "on" : "off");
		$("#marker_iconlabel").css("color", iconlabel ? "#F06222" : "#22AAAA");
	}, this);

	return this;
};
})(jQuery);

// メニューを閉じる
ConfigMenu.close = function() {
	ConfigMenu.popup.css("visibility", "hidden");
	
	if (dispFlg){
		sakuzuModule.enablePopupLayer();
	}
	
	changeDisable("img_measure", false);
	changeDisable("img_allow_open", false);
	changeDisable("img_printer", false);
	changeDisable("img_sakuzu", false);
	
	// 背景地図選択制御再開
	mousecontrol();
};

// メニューを開く
ConfigMenu.open = function() {
	ConfigMenu.popup.css("visibility", "visible");
	
	sakuzuModule.disablePopupLayer();

	/* 各画面非表示設定 */
	printsizeselectclose();
	clickmapclosefloating();
	closePopup();

	/* 各ボタン非活性設定 */
	changeDisable("img_measure", true);
	changeDisable("img_allow_open", true);
	changeDisable("img_printer", true);
	changeDisable("img_sakuzu", true);

	/* 背景地図選択制御解除 */
	document.onmousemove=null;
};

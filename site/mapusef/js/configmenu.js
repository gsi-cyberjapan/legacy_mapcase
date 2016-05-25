/* 電子国土右上のプルダウンメニューの設定 */
var ConfigMenu = {};

(function($){
jQuery.fn.ConfigMenu = function(config) {

	// メニュー表示用のパネル
	ConfigMenu.popup = config.panel;

	// ボタン
	var menuButton = $("<div class='legendattr panelbutton' border='1' id='linkButtonBody'><a href='#'>他のWeb地図で見る</a></div>\
						<div class='legendattr panelbutton' border='1' id='configButtonBody'><a href='#'>表示</a></div>");
	this.append(menuButton);

	// メニューの定義
	var linkMenuDiv = 
		"<div class='configMenu' style='position:absolute; right:160px; top:50px;'>\
			<div style='float:right'>\
				<TABLE border=1 cellspacing=0 cellpadding=3 valign='center'>\
					<tr>\
						<td class='configMenuTitle' style='width:127px;'>他のサイトに移動</td>\
					</tr>\
					<tr>\
						<td id='item_mapion' class='configMenuItem'><img src='http://www.mapion.co.jp/img/logo/L120_40.gif'></td>\
					</tr>\
					<tr>\
						<td id='item_itsumonavi' class='configMenuItem'><img src='http://portal.cyberjapan.jp/site/mapuse4/map_link/banner/itsumo_navi.gif'></td>\
					</tr>\
				</table>\
			</div>\
		</div>";

	var shareMenuDiv = 
		"<div class='configMenu' style='position:absolute; right:66px; top:50px;'>\
			<div style='float:right'>\
				<TABLE border=1 cellspacing=0 cellpadding=3 valign='center'>\
					<tr>\
						<td class='configMenuTitle' style='width:200px;'>共有方法を選択</td>\
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
		"<div class='configMenu' style='position:absolute; right:12px; top:50px;'>\
			<div style='float:right'>\
				<TABLE border=1 cellspacing=0 cellpadding=3 valign='center'>\
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
						<td id='item_html_ver' class='configMenuItem'>HTML版</td>\
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
				$("#item_html_ver").mousedown(onHtmlVer);
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
		saveSakuzuURL(true);
//		alert("未実装");
//		sakuzuModule.urlSave(true);
		ConfigMenu.close();
	}, this);

	// 「ウェブサイトに埋め込み」選択時
	var onIframe = $.proxy(function() {
		saveSakuzuURL(false);
//		sakuzuModule.urlSave(false);
		ConfigMenu.close();
	}, this);

	// 「名前をつけて保存」選択時
	var onHtml = $.proxy(function() {
		saveAsHTML();
		ConfigMenu.close();
	}, this);
	
	// 「表示」メニュー --------------------
	// 「中心位置マーカー」メニュー選択時
	var onCenter = $.proxy(function() {
		// メニューのon/offを反転
		centerMarkFlag = !centerMarkFlag;
		updateMarkerCenterCross();

		// 十字マーカーを表示/非表示
		webtis.showCenterMark(centerMarkFlag);
	}, this);

	// 「アイコンラベル」メニュー選択時
	var onIconLabel = $.proxy(function() {
		// メニューのon/offを反転
		iconLabelFlag = !iconLabelFlag;
		updateMarkerIconLabel();
		
		webtis.showLabel(iconLabelFlag);
	}, this);

	// 「HTML」メニュー選択時
	var onHtmlVer = $.proxy(function() {
		var lat = String(Math.floor(webtis.getCy() * 1000000) / 1000000);
		var lon = String(Math.floor(webtis.getCx() * 1000000) / 1000000);
		var zoomlevel = webtis.getZoomLevel();
		var url = "http://portal.cyberjapan.jp/site/mapuse4/?lat=" + lat + "&lon=" + lon + "&z=" + zoomlevel;
		window.open(url, "_blank");
		ConfigMenu.close();
	}, this);

	// 表示メニューのマーカーを更新
	var updateMarker = $.proxy(function() {
		updateMarkerCenterCross();
		updateMarkerIconLabel();
	}, this);

	// 「中心位置マーカー」メニューのマーカーを更新
	var updateMarkerCenterCross = $.proxy(function() {
		$("#marker_center").text(centerMarkFlag ? "on" : "off");
		$("#marker_center").css("color", centerMarkFlag ? "#F06222" : "#22AAAA");
	}, this);
	
	// 「アイコンラベル」メニューのマーカーを更新
	var updateMarkerIconLabel = $.proxy(function() {
		$("#marker_iconlabel").text(iconLabelFlag ? "on" : "off");
		$("#marker_iconlabel").css("color", iconLabelFlag ? "#F06222" : "#22AAAA");
	}, this);

	return this;
};
})(jQuery);

// メニューを閉じる
ConfigMenu.close = function() {
	ConfigMenu.popup.css("visibility", "hidden");
	
//	if (dispFlg){
//		sakuzuModule.enablePopupLayer();
//	}
	
//	changeDisable("img_measure", false);
//	changeDisable("img_allow_open", false);
//	changeDisable("img_printer", false);
//	changeDisable("img_sakuzu", false);
/*
	var img_measure = document.getElementById("img_measure");
	if (img_measure)
		img_measure.disabled = false;
	
	var img_allow_open = document.getElementById("img_allow_open");
	if (img_allow_open)
		img_allow_open.disabled = false;

	var img_printer = document.getElementById("img_printer");
	if (img_printer)
		img_printer.disabled = false;

	var img_sakuzu = document.getElementById("img_sakuzu");
	if (img_sakuzu)
		img_sakuzu.disabled = false;
*/
//	document.getElementById("disppopup").disabled = false;
	
//	mousecontrol();
};

// メニューを開く
ConfigMenu.open = function() {
	ConfigMenu.popup.css("visibility", "visible");
	
//	sakuzuModule.disablePopupLayer();

	/* 各画面非表示設定 */
//	printsizeselectclose();
//	clickmapclosefloating();
//	closePopup();
//	document.getElementById("showlink").style.display = "none";
//	document.getElementById("showcoordinate").style.display = "none";

	/* 各ボタン非活性設定 */
//	changeDisable("img_measure", true);
//	changeDisable("img_allow_open", true);
//	changeDisable("img_printer", true);
//	changeDisable("img_sakuzu", true);
/*
	var measure = document.getElementById("img_measure");
	if (measure) measure.disabled = true;
	
	var allow_open = document.getElementById("img_allow_open");
	if (allow_open) allow_open.disabled = true;
	
	var printer = document.getElementById("img_printer");
	if (printer) printer.disabled = true;
	
	var sakuzu = document.getElementById("img_sakuzu");
	if (sakuzu) sakuzu.disabled = true;
	
//	document.getElementById("disppopup").disabled = true;
*/
	/* 背景地図選択制御解除 */
//	document.onmousemove=null;
};

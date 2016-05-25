/**
*
* DenshiKokudo Web API for OpenScales
*
* Copyright 2013, Geospatial Information Authority of Japan
*
**/

var webtis = {
	// 初期化関数 -------------------------------------------------------------------

	init : function() {
		// UTMポイント表示用のProjectionをあらかじめ初期化しておく。
		// （これをやらないと、必要なソースがロードされる前にprojectionの変換が走り、最初の１回は必ずエラーとなってしまう）
		new Proj4js.Proj('EPSG:3097');
		new Proj4js.Proj('EPSG:3098');
		new Proj4js.Proj('EPSG:3099');
		new Proj4js.Proj('EPSG:3100');
		new Proj4js.Proj('EPSG:3101');
		new Proj4js.Proj('SR-ORG:1235');
	},
	
	forceEnableMouseWheel : function() {
		if ( !document.attachEvent )
		{
			var map = this.getFlashElement();
			if (map != null) {
				map.addEventListener('DOMMouseScroll', this.scrollListener, false);
				map.addEventListener('mousewheel', this.scrollListener, false);
			}
		}
	},

	// 地図表示、座標・縮尺関連 ------------------------------------------------------------

	/**
	 * 現在の座標・縮尺設定に従って地図を表示する
	 */
	openMap : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.openMap();
		}
	},

	/**
	 * 地図上にスケールバーを表示する
	 */
	createScaleBar : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.createScaleBar();
		}
	},

	/**
	 * 地図上に広域表示地図を表示する
	 */
	createOverviewMap : function(visible) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.createOverviewMap(visible);
		}
	},

	/**
	 * 計測ツールバーの表示/非表示を切り替える
	 */
	showMeasureBar : function(state) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.showMeasureBar(state);
		}
	},

	/**
	 * オブジェクトクリックしたときに情報をポップアップ表示するかどうかを指定する
	 */
	showPopup : function(state) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.setObjInfoPopup(state);
		}
	},

	/**
	 * 中心位置の表示・非表示を切り替える。
	 */
	showCenterMark : function(visible) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.showCenterMark(visible);
		}
	},

	/**
	 * 中心座標を取得する
	 */
	getCenter : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getCenter();
		}
	},

	/**
	 * 中心座標の経度を取得する
	 */
	getCx : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getCx();
		}
	},

	/**
	 * 中心座標の緯度を取得する
	 */
	getCy : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getCy();
		}
	},

	/**
	 * 表示範囲を取得する
	 */
	getRect : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getRect();
		}
	},

	/**
	 * 表示範囲の西端の経度を取得する
	 */
	getLeft : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getLeft();
		}
	},

	/**
	 * 表示範囲の南端の緯度を取得する
	 */
	getBottom : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getBottom();
		}
	},

	/**
	 * 表示範囲の東端の経度を取得する
	 */
	getRight : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getRight();
		}
	},

	/**
	 * 表示範囲の北端の緯度を取得する
	 */
	getTop : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getTop();
		}
	},

	/**
	 * 地図のズームレベルを取得する
	 */
	getZoomLevel : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getZoomLevel();
		}
	},

	/**
	 * 地図の縮尺を取得する
	 */
	getMapScale : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getMapScale();
		}
	},

	getResolution : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getResolution();
		}
	},

	/**
	 * 地図の縮尺を設定する
	 */
	setMapScale : function(scale) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setMapScale(scale);
		}
	},

	/**
	 * 地図の中心座標および縮尺を設定する
	 */
	setMapCenter : function(x, y, scale) {
		if(typeof scale === 'undefined') scale = -1;
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setMapCenter(x, y, scale);
		}
	},

	/**
	 * 地図の表示範囲を南西端、北東端の緯度経度で設定する
	 * 縮尺はこれらの経緯度で構成される矩形を含むもっとも大きな縮尺に設定される
	 * 中心座標はこれらの経緯度で構成される矩形の中心座標に設定される地図の中心座標および縮尺を設定する
	 */
	setMapRect : function(left, bottom, right, top) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setMapRect(left, bottom, right, top);
		}
	},

	event : function(type, callback) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.event(type, callback);
		}
	},

	setMetadata : function(callback) {
		if (callback === 'undefined') {
			callback = "";
		}
		var map = webtis.getFlashElement();
		if (map != null)
		{
			map.setInnerMetadata(callback);
		}
		//var urlstr = "http://cyberjapandata.gsi.go.jp/cgi-bin/get-available-maps.php";
		//$.ajax({
		//	dataType: "jsonp",
		//	url: urlstr,
		//	success: function (data) {
		//		var map = webtis.getFlashElement();
		//		if(map != null)
		//		{
		//			map.setMetadata(JSON.stringify(data.items), callback);
		//		}
		//	}
		//});
	},

	getMapID : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getMapID();
		}
	},

	changeMap : function(mapID) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.changeMap(mapID);
		}
	},

	setMapKind : function(json) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setMapKind(json);
		}
	},

	/**
	 * ズームレベルを設定する
	 */
	setZoomLevel : function(zoomLevel) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setZoomLevel(zoomLevel);
		}
	},

	/**
	 * 現在表示している地図のメタデータを返す
	 */
	getCurrentMetadataObject : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getCurrentMetadataObject();
		}
	},

	showEditIconsInPopup : function(value) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.showEditIconsInPopup(value);
		}
	},

	// レイヤー操作 --------------------------------------------------------
	/**
	 * 指定したレイヤー名のレイヤーがすでに地図上に存在するかどうかを返す
	 */
	layerExists : function(layer) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.layerExists(layer);
		}
	},

	/**
	 * 指定したレイヤーを最前面に表示する
	 */
	focusLayer : function(layer) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.focusLayer(layer);
		}
	},

	/**
	 * 指定したレイヤーを削除する
	 */
	clearLayer : function(layer) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.clearLayer(layer);
		}
	},

	/**
	 * 指定したレイヤーを最前面に表示する
	 */
	displayLayer : function(layer, onoff) {
		if(typeof onoff === 'undefined') onoff = -1;
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.displayLayer(layer, onoff);
		}
	},

	/**
	 * 背景地図を含むすべてのレイヤーを削除する
	 */
	clearMap : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.clearMap();
		}
	},

	loadExif : function(name, url, useProxy) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.loadExif(name, url, useProxy);
		}
	},

	loadKML : function(name, url, useProxy)
	{
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.loadKML(name, url, useProxy);
		}
	},

	loadKMLFromString : function(name, data, basePath, useProxy)
	{
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.loadKMLFromString(name, data, basePath, useProxy);
		}
	},

	addWMSLayer : function(name, version, url, layers, style, format, projection) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.addWMSLayer(name, version, url, layers, style, format, projection);
		}
	},

	addMapLayer : function(name, dataset, zindex) {
		if (typeof zindex === 'undefined') zindex = -1;
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.addMapLayer(name, dataset, zindex);
		}
	},

	addTileJSONLayer : function(name, data, useProxy) {
		if (typeof useProxy === 'undefined') useProxy = true;
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.addTileJSONLayer(name, data, useProxy);
		}
	},
	
	loadGeoJSON : function(name, url, useProxy)
	{
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.loadGeoJSON(name, url, useProxy);
		}
	},

	/*
	 * ロゴ
	 */
	showOriginator : function (visible) {
		var map = webtis.getFlashElement();
		if(map != null)
		{
			return map.showOriginator(visible);
		}		
	},
	
	/**
	 * 経緯度線
	 */
	createGraticule : function () {
		var map = webtis.getFlashElement();
		if(map != null)
		{
			return map.createGraticule();
		}
	},
	setGraticuleInterval : function (interval, minZoomLevel) {
		if (typeof minZoomLevel === 'undefined') minZoomLevel = 0;
		var map = webtis.getFlashElement();
		if(map != null)
		{
			return map.setGraticuleInterval(interval, minZoomLevel);
		}
	},
	 
	/**
	 * UTMグリッド
	 */
	showUtmGrid : function (visible, zoomLv, rect) {
		var map = webtis.getFlashElement();
		if(map != null)
		{
			return map.showUtmGrid(visible, zoomLv, rect);
		}
	},
	
	/**
	 * イメージを表示する。
	 */
	addImageLayer : function(name, left, bottom, right, top, url, useProxy) {
		if (typeof useProxy === 'undefined') useProxy = true;
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.addImageLayer(name, left, bottom, right, top, url, useProxy);
		}
	},

	/**
	 * 指定したレイヤーの透過度を返す。
	 */
	getLayerOpacity : function(name) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getLayerOpacity(name);
		}
	},

	/**
	 * 指定したレイヤーの透過度を設定する。
	 */
	setLayerOpacity : function(name, value) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.setLayerOpacity(name, value);
		}
	},

	setLayerAsLibrary : function(name) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.setLayerAsLibrary(name);
		}
	},

	openKMLFiles : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.openKMLFiles();
		}
	},

	exportKML : function(layername) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.exportKML(layername);
		}
	},

	addSearchResult : function(lon, lat, clearPrevious) {
		if(typeof clearPrevious === 'undefined') clearPrevious = true;
		var map = this.getFlashElement();
		if(map != null)
		{
		return map.addSearchResult(lon, lat, clearPrevious);
		}
	},

	clearSearchResult : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.clearSearchResult();
		}
	},

	showLabel : function(value) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.showLabel(value);
		}
	},

	// オブジェクト描画系 --------------------------------------------------------
	/**
	 * Map上のすべてのVectorLayerのオブジェクト情報をObject配列のJSONで取得する
	 */
	getObjects : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getObjects();
		}
	},

	/**
	 * 選択しているオブジェクト情報を取得する
	 */
	getObject : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getObject();
		}
	},

	/**
	 * 指定した情報をもとに複数のオブジェクトを描画します
	 */
	setObjects : function(objects) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setObjects(objects);
		}
	},

	/**
	 * 指定した情報をもとにオブジェクトを描画します
	 */
	setObject : function(obj) {
		var map = this.getFlashElement();
		if(map != null)
		{
			// ObjectをJSON文字列にして渡す
			map.setObject(obj);
			//var json = JSON.stringify(obj);
			//map.setObject(json);
		}
	},

	/**
	 * Map上のすべてのVectorLayerのオブジェクト情報をObject配列のJSONで取得する
	 */
	getObjectsForServer : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getObjectsForServer();
		}
	},

	/**
	 * 指定した情報をもとに複数のオブジェクトを描画します
	 */
	setObjectsForServer : function(objects) {
		var map = this.getFlashElement();
		if(map != null)
		{
			map.setObjectsForServer(objects);
		}
	},

	/**
	 * 地図上で選択状態になったオブジェクトの作図情報（名称・属性・形状等）をJSON形式で返す
	 */
	getSelectedObject : function() {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getSelectedObject();
		}
	},

	/**
	 * 指定された範囲に含まれるすべてのオブジェクトの作図情報をJSON形式で返す
	 */
	getObjectsInRect : function(left, bottom, right, top) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.getObjectsInRect(left, bottom, right, top);
		}
	},

	showPopupMessage : function(text, title) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.showPopupMessage(text, title);
		}
	},

	saveAsHTML : function(url) {
		var map = this.getFlashElement();
		if(map != null)
		{
			return map.saveAsHTML(url);
		}
	},
	
	// 各種ツールバー表示 --------------------------------------------------------

	/**
	 * 作図ツールバー表示用ボタンを配置する
	 */
	createDrawingBtn : function(btnX, btnY, toolX, toolY){
		var map = this.getFlashElement();
		if(map != null)
		{
			map.createDrawingBtn(btnX, btnY, toolX, toolY);
		}		
	},

	/**
	 * 計測ツールバー表示用ボタンを配置する
	 */
	createMeasureBtn : function(btnX, btnY, toolX, toolY){
		var map = this.getFlashElement();
		if(map != null)
		{
			map.createMeasureBtn(btnX, btnY, toolX, toolY);
		}		
	},

	/**
	 * 印刷ツールバー表示用ボタンを配置する
	 */
	createPrintBtn : function(btnX, btnY/*, toolX, toolY*/){
		var map = this.getFlashElement();
		if(map != null)
		{
			map.createPrintBtn(btnX, btnY/*, toolX, toolY*/);
		}
	},

	/**
	 * 地図ツールバー表示用ボタンを配置する
	 */
	createMapChangerBtn : function(btnX, btnY, toolX, toolY){
		var map = this.getFlashElement();
		if(map != null)
		{
			map.createMapChangerBtn(btnX, btnY, toolX, toolY);
		}
	},

	// 標高取得 --------------------------------------------------------
	// JavaScript側でJSONPで取ってきて、Flashに渡す。
	getAltitude : function(lat, lon) {
		var urlstr = "http://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=" + lon + "&lat=" + lat;
		$.ajax({
			dataType: "jsonp",
			url: urlstr,
			success: function (data) {
				var altitude = data.elevation + "m（" + data.hsrc + "）";
				var map = webtis.getFlashElement();
				if(map != null)
				{
					map.altitudeLoaded(altitude);
				}
			}
		});
	},
	
// hamas : 13.08.09 住所表示
	// 住所取得 --------------------------------------------------------
	// JavaScript側でJSONPで取ってきて、Flashに渡す。
	getAddress : function(lat, lon) {
		var urlstr = "http://portal.cyberjapan.jp/GsiJsLibrary/LonLatToLv01.php?longitude=" + lon + "&latitude=" + lat;
		
		var ulr_chimei_search_interface = "http://portal.cyberjapan.jp/GsiJsLibrary/interface.php";
		
		var parameter = {};
		parameter['request'] = urlstr;
//		parameter['longitude'] = lon;
//		parameter['latitude'] = lat;

		function readyStateChangeHandler(json){
			if (json){
			
				var address = "";
			
				if (json.indexOf('{"result":[') != -1){
					var result = json;
					var obj;
					obj = eval("obj=" + result);
					
					var addObj = obj.result[0];
					if (addObj){
						if (addObj.prefNm) address += addObj.prefNm;
						if (addObj.conNm) address += addObj.conNm;
						if (addObj.muniNm) address += addObj.muniNm;
						if (addObj.lv01Nm) address += addObj.lv01Nm;
					}
				}

				var map = webtis.getFlashElement();
				if(map != null)
				{
					map.addressLoaded(address);
				}
			}
		}

		function getRusult(json){
			$.proxy(readyStateChangeHandler, this)(json['result']);
		}
	
		$.ajax({
			type: "GET",
			url: ulr_chimei_search_interface,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult
		});
	},

// hamas : 13.08.12 UTMポイント表示
	// UTMポイント取得 --------------------------------------------------------
	// JavaScript側でJSONPで取ってきて、Flashに渡す。
	getUtmPoint : function(py, px) {
		//経度の値から、UTFのゾーン番号を計算
		var zone = Math.floor(px/6) + 31;
		
		//変換したい座標
		var lonlatP = new Proj4js.Point(px, py);
		
		//変換元の測地系オブジェクト
		var source = new Proj4js.Proj('EPSG:4326');
		
		//変換先の測地系オブジェクト
		var dest = null;
		
		//経度の値によって、UTMゾーンを変える
		if(zone==51)	{
			dest = new Proj4js.Proj('EPSG:3097');
		}else if(zone==52)	{
			dest = new Proj4js.Proj('EPSG:3098');
		}else if(zone==53)	{
			dest = new Proj4js.Proj('EPSG:3099');
		}else if(zone==54)	{
			dest = new Proj4js.Proj('EPSG:3100');
		}else if(zone==55)	{
			dest = new Proj4js.Proj('EPSG:3101');
		}else if(zone==56)	{
			dest = new Proj4js.Proj('SR-ORG:1235');
		}
		
		if( dest == null ){
			// TODO : 日本以外のエリアは対象外
			ExternalInterface.call('console.log', "getUtmPoint : dest is null");
		}

		var mark;
		//緯度の値によって、アルファベット一文字を格納
		if(py >= 16 && py < 24) {
			mark = "Q";
		} else if(py >= 24 && py < 32) {
			mark = "R";
		} else if(py >= 32 && py < 40) {
			mark = "S";
		} else if(py >= 40 && py < 48) {
			mark = "T";
		}

		if( source.readyToUse && dest.readyToUse ){
			// 成功
		}else{
			// Proj4jsエラー発生時の動作を登録
			Proj4js.reportError = function(msg) { alert(msg); }
		}

		//UTMの座標値に変換
		var utmP = Proj4js.transform(source, dest, lonlatP);	
		
		//以下、1kmのグリッドを書くために計算
		//桁落ち対策のためUTM座標を四捨五入しておく
		var utmx10m = Math.floor(Math.round(utmP.x)/10);		//UTM座標値（10m）
		var utmy10m = Math.floor(Math.round(utmP.y)/10);		//UTM座標値（10m）

		var utmx10m = String(utmx10m);
		var utmy10m = String(utmy10m);

		utmx10m = ('0000' + utmx10m).slice(-4);
		utmy10m = ('0000' + utmy10m).slice(-4);
		
		//000-000を正しく表示するため
		var utmPx = Math.round(utmP.x);
		var utmPy = Math.round(utmP.y);

		var urlstr = "http://portal.cyberjapan.jp/site/mapuse4/grid/utm_point.php?utmx=" + utmPx + "&utmy=" + utmPy + "&utmzone=" + zone + "&lon=" + px + "&lat=" + py;
		
		function utmPointHandler(mgrs_id){
			if (mgrs_id){
				// pointFeatureの'name'
				var name = zone + mark + mgrs_id + utmx10m + utmy10m;
				var map = webtis.getFlashElement();
				if(map != null){
					map.utmPointLoaded(px, py, name);
				}
			}
		}

		function getRusult(json){
			$.proxy(utmPointHandler, this)(json['mgrs_id']);
		}
		
		//jQueryを経由して、JSONPを使用
		$.ajax({
			dataType: "jsonp",		// ここは固定文字列
			url: urlstr,			// データを送ってくるPHPスクリプトを指定する。
			timeout: 30000,
			success: getRusult
		});
	},

	// 共通関数 --------------------------------------------------------
	/**
	 * 指定されたElemntを追加します
	 */
	getElement : function(name){
		var obj = null;
		if( this.isMicrosoft() )
		{
			obj = document.getElementById(name);
		}
		else
		{
			obj = document[name];
		}
		return obj;
	},

	getFlashElement : function(){
		return this.getElement("externalMap");
	},

	/**
	 * ブラウザがIEか否かを判定します
	 */
	isMicrosoft : function(){
		return navigator.appName.indexOf("Microsoft") != -1;
	},

	/**
	 * 幅を取得する
	 */
	getFxmapWidth : function() {
		var width = 0;
		var map = this.getFlashElement();
		if(map != null)
		{
			width = map.getFxmapWidth();
		}
		return width;
	},
	
	// マウスホイール操作捕捉 -------------------------------------------------------------

	scrollListener : function(e) {
		var delta;
		if ( e.wheelDelta )
		{
			delta = e.wheelDelta / 40;
		}
		else if ( e.detail )
		{
			delta = -e.detail;
		}
		var map = webtis.getFlashElement();
		if (map != null) {
			map.mousewheelHandler(e.screenX, e.screenY, delta);
		}
		//do stuff with delta
	}
};

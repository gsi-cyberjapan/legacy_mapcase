/****************************************/
/* 右クリックポップアップメニュー       */
/*   各メニューの処理                   */
/*                                      */
/****************************************/

/************************************/
/* この位置へのリンク表示           */
/************************************/
function httplink(lon, lat){
	//m単位を経緯度単位に変換
	var lonlat = new OpenLayers.LonLat(lon,lat).transform(projection900913,projection4326);
	var lon4 = lonlat.lon;
	var lat4 = lonlat.lat;

    var zoom = map.getZoom();
    
    //経緯度は小数点以下6桁に丸める
    lat = lat * 1000000;
    lat = Math.round(lat) / 1000000;
    lon = lon * 1000000;
    lon = Math.round(lon) / 1000000;
    
    //メタデータ取得(表示地図を反映させるため)
	var mapMeta = webtisMap.getCurrentMetaData();
	str = mapMeta.dataId;
	
    //現在表示地図のhttp表示
    http = hikisu_all[0] + "?lat=" + lat4 + "&lon=" + lon4 + "&z=" + zoom + "&did=" + str;

	//現在表示位置情報(Twitter用)
	var getURL = "?lat=" + lat4 + "&lon=" + lon4 + "&z=" + zoom + "&did=" + str; //deleted the old domain.

	// URLをセット
	$("#twitter").html('<a href="https://twitter.com/share" id="twitter" class="twitter-share-button" data-url="'+ getURL + '" data-text="電子国土Web.Next" data-lang="ja" data-count="none" data-hashtags="cyberjapan_next">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>');
	document.getElementById('urllink').value = http;
}

/************************************/
/* 磁北線の表示/削除                */
/************************************/
/*磁北線の表示*/
function JihokuLineDraw(lon,lat)	{

	//m単位を経緯度単位に変換
	lonlat2 = new OpenLayers.LonLat(lon,lat).transform(projection900913,projection4326);
	
	var px = lonlat2.lon;
	var py = lonlat2.lat;	

	//経緯度座標(10進数)を小数点以下6桁に丸める
	px = px * 1000000;
	px = parseInt(px);
	px = px / 1000000;
	py = py * 1000000;
	py = parseInt(py);
	py = py / 1000000;

	//円周率
	var pi = Math.PI;
 
	//西偏角計算
	var KEE=px-138;
	var KNN=py-37;
	//var KKK=(7+40.644/60)+(18.976/60)*KNN-(6.224/60)*KEE+(0.003/60)*KNN*KNN+(0.024/60)*KNN*KEE-(0.586/60)*KEE*KEE;		//20110928	2010年の値に変更
	var KKK=(7+40.585/60)+(19.003/60)*KNN-(6.265/60)*KEE+(0.009/60)*KNN*KNN+(0.024/60)*KNN*KEE-(0.591/60)*KEE*KEE;		//20140129	修正（物理測地課阿部様）
	KKK=parseInt(KKK*100 + 0.5)/100;
	var KKK_NUM=parseInt(KKK*10 + 0.5)/10;		//テキストの文字列で使用する
	
	//緯度：経度の比率（距離）
	//度からラジアンに
	KKK=KKK*pi/180;
	var HHH=Math.sin(KKK)/Math.cos(KKK);
	
	//1kmあたりの度単位
	var EEE_D=6378.137*pi*Math.cos(py*pi/180);
	EEE_D=180/EEE_D;
	var NNN_D=180/6378.137/pi;
 
	//上下3kmあたりの磁北線範囲
	var LLL=3;
	var H1=px-LLL*HHH*EEE_D;
	var H2=px+LLL*HHH*EEE_D;
	var V1=py+LLL*NNN_D;
	var V2=py-LLL*NNN_D;
	//ここまでは計算
		
	var points = new Array(
		new OpenLayers.Geometry.Point(H1,V1),
		new OpenLayers.Geometry.Point(H2,V2)
	);
	var line = new OpenLayers.Geometry.LineString(points);
	line.transform(projection4326,projection900913);
	
	//ラベルを中央に表示するためにポイントフィーチャを作成
	var cPoint = new OpenLayers.Geometry.Point(px,py);
	cPoint.transform(projection4326,projection900913);
	
	//線のスタイル
	var style = {
		strokeColor: '#ff0000',
		strokeOpacity: 0.8,
		strokeWidth: 1
	};
	
	var lineFeature = new OpenLayers.Feature.Vector(line, null, style);
	var pointFeature = new OpenLayers.Feature.Vector(cPoint);
	pointFeature.attributes = {
		label: KKK_NUM
	}
	
	// 磁北線レイヤにfeatureを追加
	jihokuLayer.addFeatures([lineFeature,pointFeature]); //線, ラベル
	
	if(popupflag)	{
		map.removePopup(popup);		//ポップアップを閉じる
		popupflag = 0;
	}
}
 
/*磁北線の削除*/
function JihokuLineClear()	{
	// 磁北線レイヤのfeaturesを全て削除
	jihokuLayer.removeAllFeatures();
	
	if(popupflag)	{
		map.removePopup(popup);		//ポップアップを閉じる
		popupflag = 0;
	}
}


/************************************/
/* UTMポイントの表示/削除   */
/************************************/
/*UTMポイントの表示*/
function utmPointDraw(px,py)	{
	var zone = Math.floor(px/6) + 31;							//経度の値から、UTFのゾーン番号を計算
	var lonlatP = new Proj4js.Point(px,py);				//ポイントオブジェクトを作成（経緯度）
	
	//経度の値によって、UTMゾーンを変える
	if(zone==51)	{
		projUTM = new Proj4js.Proj('EPSG:3097');
	}else if(zone==52)	{
		projUTM = new Proj4js.Proj('EPSG:3098');
	}else if(zone==53)	{
		projUTM = new Proj4js.Proj('EPSG:3099');
	}else if(zone==54)	{
		projUTM = new Proj4js.Proj('EPSG:3100');
	}else if(zone==55)	{
		projUTM = new Proj4js.Proj('EPSG:3101');
	}else if(zone==56)	{
		projUTM = new Proj4js.Proj('SR-ORG:1235');
	}else{
		projUTM = null;
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
	
	var utmP = Proj4js.transform(projLonLat,projUTM,lonlatP);		//UTMの座標値に変換
	
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
	var urlstr = "?utmx=" + utmPx + "&utmy=" + utmPy + "&utmzone=" + zone + "&lon=" + px + "&lat=" + py; // deleted the old domain.
	
	//jQueryを経由して、JSONPを使用
	$.ajax({
		dataType: "jsonp",		//ここは固定誇示列
		url: urlstr,			// データを送ってくるPHPスクリプトを指定する。
		
		// callback関数は、jQueryが自動的に生成してくれますので記述不要
		success: function (data) {		//PHPの戻り値はJSONP形式。「data」にはJSON形式の文字列が入っています。
			var outPutMGRS = data.mgrs_id;			//結果出力文字列
			var pointFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(px,py).transform(projection4326,projection900913)); 

			//属性を設定
			pointFeature.attributes = {
				zone : zone,
				mark : mark,
				mgrs : outPutMGRS,
				utmx10m : utmx10m,
				utmy10m : utmy10m
			}
	
			utmPointLayer.addFeatures([pointFeature]);
	
			if(popupflag)	{
				map.removePopup(popup);		//ポップアップを閉じる
				popupflag = 0;
			}
		}
	});
}
/*UTMポイントの削除*/
function utmPointClear()	{
	utmPointLayer.removeAllFeatures();
	
	if(popupflag)	{
		map.removePopup(popup);		//ポップアップを閉じる
		popupflag = 0;
	}
}


/************************************/
/* UTMグリッドの表示/削除   */
/************************************/
/*UTMグリッド表示*/
function utmGridDraw()	{
	var rect = map.getExtent().transform(projection900913,projection4326);
	if(map.getZoom() <= 13){
		var url = "?rectLonLat="+rect; // deleted the old domain.
	} else {
		var url = "?rectLonLat="+rect; // deleted the old domain.
	}
	
	var myutmgridStyles = new OpenLayers.StyleMap({
		"default": new OpenLayers.Style({
			strokeColor: "#FF0000",
			strokeWidth:1,
			fillColor:"#ffffff",
			fillOpacity: 0,
			label : "${name}",
			labelAlign : "lm",
			fontSize:"${getFontSize}",
			fontColor: "#FF0000"
		},
		{
			context : {
				getFontSize : function(feature) {
					if( feature.geometry.CLASS_NAME == 'OpenLayers.Geometry.Polygon') {
						return "0px";
					} else {
						return "15px";
					}
				}
			}
		})
	});
	
	$.ajax({
		dataType: "jsonp",
		url: "./kml2jsonp.php?lf=0&url=" + encodeURIComponent(url),
		//url: "?lf=0&url=" + encodeURIComponent(url), //deleted the old domain.
		jsonpCallback: "kml_loaded",
		success: function(json) {
			var utmGridLayer = new OpenLayers.Layer.Vector("utmGrid", {
				styleMap: myutmgridStyles,
				projection: projection4326	// KMLは緯度経度
				//strategies: [new OpenLayers.Strategy.Fixed()],
			});
			map.addLayer(utmGridLayer);

			var format = new OpenLayers.Format.KML({
				extractStyles: false,
				extractAttriburtes: true,
				externalProjection: projection4326,
				internalProjection: projection900913
			});
			utmGridLayer.addFeatures(format.read(json.data));
			utmGridLayer.redraw();
		},
		error: function() {
			alert('UTMグリッド情報の取得に失敗しました。');
		}
	});
	
	utmgv =1;

	if(popupflag)	{
		map.removePopup(popup);		//ポップアップを閉じる
		popupflag = 0;
	}
}

/*UTMグリッド削除*/
function utmGridClear()	{
	if(utmgv==1)	{
		var layernames = map.getLayersByName('utmGrid');
		for (var i = 0; i < layernames.length; i++){	//UTMグリッドレイヤは全て削除
			map.removeLayer(layernames[i]);
		}
		utmgv =0;
	}
	
	if(popupflag)	{
		map.removePopup(popup);		//ポップアップを閉じる
		popupflag = 0;
	}
}


/************************************/
/* 経度緯度グリッドの表示/削除   */
/************************************/
/*経度緯度グリッドの表示*/
function lonlatGridDraw(interval)	{
	lonlatGridClear();
	
	var rect = map.getExtent().transform(projection900913,projection4326);
	var url1 = "?rectLonLat="+rect + "&interval=" + interval;	//ライン用 deleted the old domain.
	var url2 = "?rectLonLat="+rect + "&interval=" + interval;	//ラベル用 deleted thd old domain.

	// ラインスタイル
	var myLineStyles = new OpenLayers.StyleMap({
		"default": new OpenLayers.Style({
			strokeColor: "#000080"
		})
	});
	
	// テキストスタイル
	var myFontStyles = new OpenLayers.StyleMap({
		"default": new OpenLayers.Style({
			labelAlign:"lb",
			labelXOffset: 3,
			labelYOffset: 3,
			label:"${label}",
			fontSize:"15px",
			fontColor: "#000080"
		})
	});
	
	// ラインとラベルのKMLをajaxで取得
	// => ただし、同時にmapへの更新が走るのを防ぐため、ライン->ラベルの順で取得する。
	$.ajax({
		dataType: "jsonp",
		url: "./kml2jsonp.php?lf=1&url=" + encodeURIComponent(url1), jsonpCallback: "kml_loaded",
		//url: "?lf=1&url=" + encodeURIComponent(url1), jsonpCallback: "kml_loaded", // deleted the old domain.
		success: function(json) {
			var data1 = json.data.replace(/\\n/g, "\n");
			var kmlLayer1 = new OpenLayers.Layer.Vector("LonLatLine", {
				styleMap: myLineStyles,
				projection: projection4326	// KMLは緯度経度
			});
			map.addLayer(kmlLayer1);
			var format = new OpenLayers.Format.KML({
				extractStyles: false,
				extractAttributes: true,
				maxDepth: 2,
				externalProjection: projection4326,
				internalProjection: projection900913
			});
			//kmlLayer1.addFeatures(format.read(json.data));
			kmlLayer1.addFeatures(format.read(data1));
			kmlLayer1.redraw();
			$.ajax({
				dataType: "jsonp",
				url: "./kml2jsonp.php?lf=1&url=" + encodeURIComponent(url2),
				//url: "?lf=1&url=" + encodeURIComponent(url2), // deleted the old domain.
				jsonpCallback: "kml_loaded",
				success: function(json) {
					var data2 = json.data.replace(/\\n/g, "\n");
					var kmlLayer2 = new OpenLayers.Layer.Vector("LonLatStr", {
						styleMap: myFontStyles,
						projection: projection4326	// KMLは緯度経度
					});
					map.addLayer(kmlLayer2);
					var format = new OpenLayers.Format.KML({
						extractStyles: true,
						extractAttributes: true,
						externalProjection: projection4326,
						internalProjection: projection900913
					});
					//kmlLayer2.addFeatures(format.read(json.data));
					kmlLayer2.addFeatures(format.read(data2));
					kmlLayer2.redraw();
				},
				error: function() {
					alert('経緯度線（ラベル）の取得に失敗しました。');
				}
			});
		},
		error: function() {
			alert('経緯度線（ライン）の取得に失敗しました。');
		}
	});

	
	lonlatgv =1;
}

/*経度緯度グリッドの削除*/
function lonlatGridClear()	{
	if(lonlatgv==1)	{
		var layernames = map.getLayersByName('LonLatLine');
		for (var i = 0; i < layernames.length; i++){
			map.removeLayer(layernames[i]);
		}
		layernames = map.getLayersByName('LonLatStr');
		for (var i = 0; i < layernames.length; i++){
			map.removeLayer(layernames[i]);
		}
		lonlatgv =0;
	}
	
	if(popupflag)	{
		map.removePopup(popup);		//ポップアップを閉じる
		popupflag = 0;
	}
}


/************************************/
/* 他の地図閲覧サービスへのリンク   */
/************************************/
// 表示モード切替
function displayMode(mode) {
	if(mode == 1){
		document.getElementById('submenu').style.display = 'block';
	}else{
		document.getElementById('submenu').style.display = 'none';
	}
}

/* 他の地図へのリンク */
function mapLink(lon, lat, posw, posh)	{

	// サブメニューのスタイル
	var stylesheet = "";
	stylesheet = " style='width:190px;";
	stylesheet += "cursor:default;";
	stylesheet += "padding:3px 0px 2px 5px;";
	stylesheet += "background-color:#DDF1F4;";
	stylesheet += "border-top:1px solid #ffeeee;";
	stylesheet += "border-right:1px solid maroon;";
	stylesheet += "border-bottom:1px solid maroon;";
	stylesheet += "border-left:1px solid #ffeeee;' ";

	// サブメニュー上のマウス操作
	var onmouse = "";
	onmouse += " onMouseOver='cellOver(this);displayMode(1);' onMouseOut='cellOut(this);displayMode(0);' ";

	// メニュー項目
	var menuItem = new Array();
	menuItem.push("Mapion","Mapion（マピオン）", "http://www.mapion.co.jp/img/logo/L120_40.gif");

	// メニュー作成
	var layer;
	var roop;
	var menuID;
	var menuTitle;
	var menuImg;
	layer = "<TABLE border=1 cellspacing=0 cellpadding=3 valign='center'>\n";
	roop = menuItem.length / 3;
	for (i=0; i<roop; i++) {
		menuID = i * 2;
		menuTitle = i * 2 + 1;
		menuImg = i * 2 + 2;
		layer += "	<tr " + stylesheet + onmouse + "onclick='moveOtherMap("+lon+","+lat+",\""+menuItem[menuID]+"\"); closePopup();'>\n";
		layer += "		<td><img src='"+menuItem[menuImg]+"' width='60' height='16' border='0' alt='"+menuItem[menuID]+"'></td>\n";
		layer += "		<td><FONT size='-1'>"+menuItem[menuTitle]+"</FONT></td>\n";
		layer += "	</tr>\n";
	}
	layer += "</TABLE>";

	// ポップアップメニュー表示
	var submenu = document.getElementById("submenu");
	submenu.innerHTML = layer;				//サブメニューHTML置換え
	submenu.style.position = 'absolute';	//表示位置設定
	submenu.style.left = posw + 'px';
	submenu.style.top  = posh + 'px';
	submenu.style.display = 'block';		//表示
}

function moveOtherMap(lon, lat, name)	{				//リンク先に移動する

	//m単位を経緯度単位に変換
	var lonlat = new OpenLayers.LonLat(lon,lat).transform(projection900913,projection4326);
	var x = lonlat.lon;
	var y = lonlat.lat;

	var scale = map.getZoom();
	
	//縮尺は1000万÷2のズームレベル乗で適当に計算
	scale = 10000000/(Math.pow(2,scale));

	var url = createLinkURL(x, y, scale, name);		//createLinkURL関数でリンク先のURLを生成する
	window.open(url,"_blank");

}

function createLinkURL(cx, cy, scale, name)	{		//リンクのURLを作成する関数
	var linkURL;						//この変数にリンク先のURLを入れる
	
	switch(name)	{					//個別の判定をする		//増えるごとに「case」に続けて追加する
		case "osm":				//オープンストリートマップの場合
			linkURL = "http://www.openstreetmap.org/index.html?mlat=" + cy + "&mlon=" + cx + "&zoom=" + zoomLevel(scale, 1);
			break;

		case "Mapion":				//マピオンの場合
			linkURL = "http://www.mapion.co.jp/m/" + cy + "_" + cx + "_" + zoomLevel(scale, 2) + "/?wgs=1";
			break;
		default:				//どこにも当てはまらない場合（エラー処理）
			linkURL = "http://maps.gsi.go.jp/"; // deleted the old domain.
			break;
	}
	return linkURL;		//URLを返す
}

//ズームレベルはサイトによって異なるので、ズームレベルを取得する関数を対応表を何種類か用意しておく
function zoomLevel(scale, id)	{
	var zoomLevel;			//ここにズームレベルを格納する
	
	if(id==1)	{			//その1（OSM）
		if(scale < 1500)			{zoomLevel = 19;}
		else if(scale < 3000)		{zoomLevel = 18;}
		else if(scale < 7000)		{zoomLevel = 17;}
		else if(scale < 12000)		{zoomLevel = 16;}
		else if(scale < 24000)		{zoomLevel = 15;}
		else if(scale < 50000)		{zoomLevel = 14;}
		else if(scale < 100000)		{zoomLevel = 13;}
		else if(scale < 200000)		{zoomLevel = 12;}
		else if(scale < 400000)		{zoomLevel = 11;}
		else if(scale < 800000)		{zoomLevel = 10;}
		else if(scale < 1800000)	{zoomLevel = 9;}
		else if(scale < 3500000)	{zoomLevel = 8;}
		else if(scale < 7000000)	{zoomLevel = 7;}
		else						{zoomLevel = 6;}
	}else if(id==2)	{		//その2（マピオン）
		// マピオンとのズームレベルを調整
		if(scale < 50)				{zoomLevel = 10;}
		else if(scale < 100)		{zoomLevel = 9;}
		else if(scale < 300)		{zoomLevel = 8;}
		else if(scale < 700)		{zoomLevel = 7;}
		else if(scale < 2000)		{zoomLevel = 6;}
		else if(scale < 5000)		{zoomLevel = 5;}
		else if(scale < 10000)		{zoomLevel = 4;}
		else if(scale < 20000)		{zoomLevel = 3;}
		else if(scale < 50000)		{zoomLevel = 2;}
		else						{zoomLevel = 1;}
	}
	return zoomLevel;
}
//ズームレベルを取得する関数ここまで


//表の色変え操作をする関数ここから
function cellOver(obj){						//onMouseOverイベントで行の背景色を変更する
	obj.style.backgroundColor="#00FFFF";
//	submenuflg = 1;
}

function cellOut(obj){						//onMouseOutイベントで行の背景色をデフォルトの色に戻す
	obj.style.backgroundColor="#DDF1F4";
}
//表の色変え操作をする関数ここまで

/*リンク表示のサブメニューを非表示にする関数*/
function closeSubmenu()	{
	var submenu = document.getElementById('submenu');

	if( submenu.style.display == "block"){
		submenu.style.display = "none";		//ウインドウを非表示にする
	}
}


//	地理院地図３Dを開く 
function open3d(lon, lat, scale) 
{
	if( isBrawzerPossible_3D( ) == false )
	{
		alert('お使いのWebブラウザは地理院地図3Dに対応していません。\nChrome、Firefox、IE11　をご使用ください。');
		return;
	}
	var url = createLink3DURL( lon, lat, scale, "3d" );		//createLinkURL関数でリンク先のURLを生成する
	window.open(url,"_blank");
}



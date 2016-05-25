// 作図機能のURL保存（Flashからの呼び出し）
function saveSakuzuURL(isURL) {
	// 作図情報の取得
	var json = webtis.getObjectsForServer();

	// geometryの順番を type -> coordinates に置き換える （coordinates -> type だとサーバが受け付けないため）
	var objs = JSON.parse(json);
	var layers = objs.layer;
	for (var i = 0; i < layers.length; i++) {
		var data = layers[i].data;
		for (var j = 0; j < data.length; j++) {
			var geometry = data[j].geometry;
			var type = geometry.type;
			var coords = geometry.coordinates;
			delete geometry.type;
			delete geometry.coordinates;
			geometry["type"] = type;
			geometry["coordinates"] = coords;
		}
	}
	json = JSON.stringify(objs);
	
//	var cnt = JSON.parse(json).layer.length;
	var cnt = layers.length;

	if (cnt > 0) {
		var ret = confirm("作図情報を含むURLは、発行後30日間、そのURLをご存じの方にはどなたにもアクセス可能となります。\n" +
                  "作図情報は、国土地理院のサーバに保存されます。よろしいですか。\n\n" +
                  "尚、読み込んだKMLファイルを含む作図情報が大容量の場合等、システムからの警告なしに上記保存に失敗するケースがございます事を予めご了承下さい。\n" +
                  "（詳細調査中）");
                      
        if (!ret) {
           	return;
        }
	}
		           
	if (cnt > 0) {
		// 作図情報ファイル名を作成
		if(!kmlid){
			// ランダムなファイル名を作成
			var n = 62;
			var RandomString = '';
			var BaseString ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			//文字列生成  
			for(var i=0; i<8; i++) {
				RandomString += BaseString.charAt( Math.floor( Math.random() * n));
			}
			var filename = "drawfile_" + RandomString;
		} else {
			var filename = kmlid;
		}

		// 作図情報ファイルを作成(サーバにて実行)
		var saveForm = $("#sz_url_form");
		saveForm.attr("action",SAVEURL);
		saveForm.find("#sz_url_content").val(json);
		saveForm.find("#sz_url_savefile").val(filename);
		saveForm.find("#sz_url_mode").val("url");
		saveForm.submit();
	}

	var delimiter = "|";
	var url = createURL(filename);
	window.sendArgument = url;
	window.hideURL = !isURL;
	window.hideIFRAME = isURL;
	var windowParam = url + delimiter + hideURL + delimiter + hideIFRAME;
	if (isMapCase) {
		window.open("http://portal.cyberjapan.jp/site/mapusef/httplink.html?httplinkparam=" + windowParam,"httplink","width=480,height=200,menubar=no,toolbar=no,scrollbar=no");
	} else {
		window.open("httplink.html?httplinkparam=" + windowParam,"httplink","width=480,height=200,menubar=no,toolbar=no,scrollbar=no");
	}
}

function saveAsHTML()
{
	var url = createURL(null);
	url = url + "&rvg=1&fsc=1";
	webtis.saveAsHTML(url);
		           
}

function createURL(filename)
{
	//現在表示地図のhttp表示
	var lat = String(Math.floor(webtis.getCy() * 1000000) / 1000000);
	var lon = String(Math.floor(webtis.getCx() * 1000000) / 1000000);
	var zoomlevel = webtis.getZoomLevel();
	var did = webtis.getMapID();
//	var did = "JAIS";
//	var metadata = webtis.getCurrentMetadataObject();
//	if (metadata != null) {
//		did = metadata["dataId"];
//	}
//	var url = "http://portal.cyberjapan.jp/site/mapuse4/index.html?lat=" + lat + "&lon=" + lon + "&z=" + zoomlevel + "&did=" + did;
	var url = location.href;
	if (url.indexOf("?") >= 0) {
		url = url.substring(0, url.indexOf("?"));
	}
	if (url.indexOf("#") >= 0) {
		url = url.substring(0, url.indexOf("#"));
	}
//	if (url.indexOf("/") >= 0) {
//		url = url.substring(0, url.lastIndexOf("/"));
//		url = url + "/";
//	}
//	if (url.indexOf("index.html") >= 0) {
//		url = url.substring(0, url.indexOf("index.html"));
//	}
//	var url = location.href.substring(0, location.href.indexOf("index.html", 0)) + "index.html?lat=" + lat + "&lon=" + lon + "&z=" + zoomlevel + "&did=" + did;
//	url = url + "index.html?lat=" + lat + "&lon=" + lon + "&z=" + zoomlevel + "&did=" + did;
	url = url + "?lat=" + lat + "&lon=" + lon + "&z=" + zoomlevel + "&did=" + did;
	if (filename) url += ("&fid=" + filename);
	var treeparam = treeModule.getSelectedLayerString();
	if (treeparam) url = url + "&" + treeparam;
	return url;
}


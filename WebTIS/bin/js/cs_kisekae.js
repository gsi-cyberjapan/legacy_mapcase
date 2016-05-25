/** 地名検索用 JQueryプラグイン実装  **/
var ChimeiSearch = {};
ChimeiSearch.SIMPLE_GEOCODING = "http://geocode.csis.u-tokyo.ac.jp/cgi-bin/simple_geocode.cgi";
/* ChimeiSearch.GEOCODE = "http://portal.cyberjapan.jp/GsiJsLibrary/geocode.php"; */
/* ChimeiSearch.GEOCODE = "http://portal.cyberjapan.jp/GsiJsLibrary/geocode.php"; */
ChimeiSearch.INTERFACE = "http://portal.cyberjapan.jp/GsiJsLibrary/interface.php";
ChimeiSearch.SHISETSU_SEARCH = "http://portal.cyberjapan.jp/GsiJsLibrary/shisetsu.php";
ChimeiSearch.CHIMEI_SEARCH = "http://portal.cyberjapan.jp/GsiJsLibrary/chimei.php";
ChimeiSearch.CENTER_SEARCH = "http://portal.cyberjapan.jp/GsiJsLibrary/LonLatToLv01.php";

var flagmarker = 0;

ChimeiSearch.SERVER_ROOT = "http://search.cyberjapan.jp/cs4/cs/";

var LON_LAT_SPLIT = ['・', '、', ',', ' ', '　'];

var CurrentPage=0;
var CurrentSelectId = -1;
var CurrentResultsList = new Array();
var BaseZoomLevel = 5; //背景地図で日本地図が表示されるズームレベル

//都道府県テーブル
//トップページと異なり、県コード順に並んでいます
var PREF_TABLE = [
					['北海道', 141.3469444, 43.06416667],
					['青森県', 140.74,      40.82444444],
					['岩手県', 141.1525,    39.70361111],
					['宮城県', 140.8719444, 38.26888889],
					['秋田県', 140.1023688, 39.71863238],
					['山形県', 140.3633333, 38.24055556],
					['福島県', 140.4677778, 37.75],
					['茨城県', 140.446812,  36.34173897],
					['栃木県', 139.8836111, 36.56583333],
					['群馬県', 139.0608333, 36.39111111],
					['埼玉県', 139.649007,  35.85703327],
					['千葉県', 140.1231502, 35.60456052],
					['東京都', 139.6916667, 35.68944444],
					['神奈川県', 139.6425,    35.44777778],
					['新潟県', 139.0236111, 37.90222222],
					['富山県', 137.2113889, 36.69527778],
					['石川県', 136.6255556, 36.59444444],
					['福井県', 136.2219444, 36.06527778],
					['山梨県', 138.5683333, 35.66388889],
					['長野県', 138.1811111, 36.65138889],
					['岐阜県', 136.7222222, 35.39111111],
					['静岡県', 138.3830556, 34.97694444],
					['愛知県', 136.9066667, 35.18027778],
					['三重県', 136.5086111, 34.73027778],
					['滋賀県',   135.8683333, 35.00444444],
					['京都府',   135.7555556, 35.02138889],
					['大阪府',   135.52,      34.68638889],
					['兵庫県',   135.1830556, 34.69138889],
					['奈良県',   135.8327778, 34.68527778],
					['和歌山県', 135.1675,    34.22611111],
					['鳥取県', 134.2383333, 35.50361111],
					['島根県', 133.0505556, 35.47222222],
					['岡山県', 133.935,     34.66166667],
					['広島県', 132.4594444, 34.39638889],
					['山口県', 131.4713889, 34.18583333],
					['徳島県', 134.5594189, 34.06570976],
					['香川県', 134.0432238, 34.340088],
					['愛媛県', 132.7661111, 33.84166667],
					['高知県', 133.5311111, 33.55972222],
					['福岡県',   130.4180556, 33.60638889],
					['佐賀県',   130.2988889, 33.24944444],
					['長崎県',   129.8736111, 32.74472222],
					['熊本県',   130.7416667, 32.78972222],
					['大分県',   131.6125,    33.23805556],
					['宮崎県',   131.4238889, 31.91111111],
					['鹿児島県', 130.5580556, 31.56027778],
					['沖縄県',   127.6811111, 26.2125]
				];
				
(function($){
jQuery.fn.ChimeiSearch = function(config) {
	this.config = config;
	if (this.config.mapEventHandler) {
		// 地名検索で行われた処理に対しての委譲先
		this.mapEventHandler = this.config.mapEventHandler;
	}

	// this.sakuzuObj = config.sakuzuObj;
	// this.mapKeyboardControl = config.mapKeyboardControl;
	
	var CS_Obj = this;

	this.append("\
			<div id=\"cs_main\" class=\"ui-widget-content ui-corner-all\">\
				<div class=\"cs_block\">\
					<div id=\"cs_result_block\" >\
					<span class=\"cs_label\">地名</span>&nbsp;<input type=\"text\" id=\"cs_chimei_text\" name=\"\" value=\"\" style=\"width:130px;\">　<span id=\"syousaiBox\"><a href=\"javascript:void(0)\" onClick=\"syousai(1);\"><font size=2>詳細設定</font></a></span>\
					</div>\
				</div>\
				<div style=\"display:none;\" id=\"syousaiSetting\">\
					<span class=\"cs_label\">範囲指定</span>\
					<table>\
						<tr>\
							<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>\
							<td>&nbsp;都道府県&nbsp;&nbsp;&nbsp;</td>\
							<td><select id=\"cs_area_pref\" style=\"width:150px;\"></select></td>\
						</tr>\
						<tr>\
							<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>\
							<td>&nbsp;市区町村&nbsp;&nbsp;&nbsp;</td>\
							<td><select id=\"cs_area_muni\" style=\"width:150px;\"></select></t>\
						</tr>\
					</table>\
					<div class=\"cs_block\">\
						<span class=\"cs_label\">検索対象</span>\
						<br>\
						&nbsp;&nbsp;&nbsp;&nbsp;<font size=2>\<input type=\"checkbox\" name=\"cs_target\" value=\"cs_address\" checked>住所　<input type=\"checkbox\" name=\"cs_target\" value=\"cs_station\" checked>駅　<input type=\"checkbox\" name=\"cs_target\" value=\"shisetsu\" checked>公共施設　<input type=\"checkbox\" name=\"cs_target\" value=\"chimei\" checked>地名\</span>\</font>\
					</div>\
				</div>\
				<div class=\"cs_block\">\
					<div id=\"cs_buttons\" style=\"float:left\">\
						<button id=\"cs_search_button\"><font size=2>検索</font></button>&nbsp;<button title=\"検索結果と地図上のマーカーを消去します\" id=\"cs_clear_button\"><font size=2>クリア</font></button>\
					</div>\
					<div style=\"float:right\">\
						<font size=1>　</font><br>\
						<font size=1><a href=\"http://newspat.csis.u-tokyo.ac.jp/geocode/\" target=\"_blank\">CSISシンプルジオコーディング実験</a><br />（街区レベル位置参照情報、国土数値情報）利用</font>\
					</div>\
				</div>\
				<div class=\"cs_block\" style=\"clear:both;\">\
					<div id=\"cs_result\">\
					</div>\
				</div>\
			</div>\
	");
	
	
	// プラグインにメソッドを追加
	this.showResults = $.proxy(showResults,this);
	this.searchAddress = $.proxy(searchAddress,this);
	this.searchStation = $.proxy(searchStation,this);
	this.searchPlace = $.proxy(searchPlace,this);
	this.searchFacility = $.proxy(searchFacility,this);
	this.prncenter = $.proxy(prncenter,this);
	this.executeSearch = $.proxy(executeSearch,this);
	this.clickResult = $.proxy(clickResult,this);
	this.writeResultsList = $.proxy(writeResultsList,this);
	this.getAddress = $.proxy(getAddress, this);

	this.loadLayerList = $.proxy(loadLayerList,this);
	this.loadAreaObjectList = $.proxy(loadAreaObjectList,this);
//	this.searchChimei = $.proxy(searchChimei,this);
	
	// サーバからレイヤリストを取得
	this.loadLayerList();
	
	$("#cs_chimei_text").focus($.proxy(
		function(event) {
			var element = event.currentTarget;
			if (element.className == "default_text"){
				element.className = "";
				element.value="";
			}
			// this.sakuzuObj.oKeyboard.deactivate();
			// this.mapKeyboardControl.deactivate();
		},this)
	);

	// テキストボックスでエンターキーを押すと、検索を実行
	$("#cs_chimei_text").keypress(
		function(e) {
			if (e.which == 13) {
				if (!document.getElementById("cs_search_button").disabled) mapsearch();
			}else if (e.which==37){
				e.cancelBubble =true;
			}
		}
	);

	// エリアレイヤを変更したときに、オブジェクトを再読み込み
	var areaLayersElement = this.find("#cs_area_pref");
	areaLayersElement.change(
		$.proxy(function(event) {
			var areaLayerId = event.target.selectedIndex;
			var areaObjectsElement = this.find("#cs_area_muni");
			
			if (areaLayerId != "") {
				areaObjectsElement[0].disabled = true;
				areaObjectsElement.empty();
				this.loadAreaObjectList(areaLayerId);
				
				var pref = PREF_TABLE[areaLayerId - 1];
				var zoom = 9;
				//map.setCenter(new OpenLayers.LonLat(pref[1], pref[2]).transform(projection4326,projection900913), zoom);
				webtis.setMapCenter(pref[1], pref[2], zoom);
				
			} else {
				// 消します
				areaObjectsElement.empty();
			}
			
			// 検索ボタンを押せるようにする
			var searchButtonElement = document.getElementById("cs_search_button");
			searchButtonElement.disabled = false;
		},this)
	);

	// エリアレイヤを変更したときに、オブジェクトを再読み込み
	var areaObjectsElement = this.find("#cs_area_muni");
	areaObjectsElement.change(
		$.proxy(function(event) {
			// 地図を移動
			var areaObjectId = event.target.options[event.target.selectedIndex].value;
			if (areaObjectId!=null && areaObjectId.charAt(0)=="@") {
				return;
			}
			var geom = this.currentAreaObjects[areaObjectId];
			var zoom = 15;
			//this.mapEventHandler.areaChanged(geom.clone());
			if (geom) {
				webtis.setMapCenter(geom.lon, geom.lat, zoom);
			}
			
			// 北海道の振興局が選択された場合は、検索ボタンを押せないようにする
			var areaObjectsElement = this.find("#cs_area_pref")[0];
			var searchButtonElement = document.getElementById("cs_search_button");
			searchButtonElement.disabled = (Number(areaObjectsElement.value) == 1 && Number(areaObjectId) >= 9900);
			
		},this)
	);

	// 検索ボタン
	var searchButtonElement = this.find("#cs_search_button");
	searchButtonElement.click(
		$.proxy(function(event) {
			this.executeSearch("autoMove");
		},this)
	);

	// クリアボタン
	var clearButtonElement = this.find("#cs_clear_button");
	clearButtonElement.click(
		$.proxy(function(event) {
			var searchButtonElement = this.find("#cs_search_button")[0];
			searchButtonElement.disabled = false;
			// 検索結果の消去
			var resultElement = this.find("#cs_result");
			resultElement.empty();
			
			// 検索条件のリセット
			this.find("#cs_chimei_text").val("");
//			this.find('input[name="cs_area_type"]').val(["none"]);
			this.find('input[name="cs_logical_condition"]').val(["AND"]);
			this.find('input[name="cs_textmatch_condition"]').val(["PARTIAL"]);
			
			//前のマーカーを消す
			if(flagmarker == 1){
//				clearLayer('Marker');
				webtis.clearSearchResult();
				flagmarker = 0;
			}

			this.find("#cs_area_pref").val([""]);
			var areaObjectsElement = this.find("#cs_area_muni");
			areaObjectsElement.empty();
			var targetLayers = this.find("input[name='cs_target']");
			for (var i = 0; i < targetLayers.length; i++) {
				targetLayers[i].checked;	// = (i == 0);
			}
			// 
			this.mapEventHandler.stopDrawArea();

		},this)
	);
	
	//********* 関数 *************//
	/*中心位置の経緯度表示*/
	function prncenter() {
		//現在の中心経緯度・ズームレベルの取得
//		var center=this.mapEventHandler.mapObj.getCenter();
		var center = webtis.getCenter();
//		var center2=center.transform(projection900913,projection4326);
//		var lat = center2.lat;
//		var lon = center2.lon;
		var lat = center[1];
		var lon = center[0];
//		var zoom = this.mapEventHandler.mapObj.getZoom();
		var zoom = webtis.getZoomLevel();

		//経緯度は小数点以下6桁に丸める
		lat = lat * 1000000;
		lat = Math.round(lat) / 1000000;
		lon = lon * 1000000;
		lon = Math.round(lon) / 1000000;

		var url = ChimeiSearch.CENTER_SEARCH;
		url += "?longitude=" + lon + "&latitude=" + lat;

		var parameter = {};
		parameter['request'] = url;
//		parameter['longitude'] = lon;
//		parameter['latitude'] = lat;

		function getRusult(json){
			$.proxy(readyStateChangeHandler, this)(json['result']);
		}

		$.ajax({
			type: "GET",
			url:ChimeiSearch.INTERFACE,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult
		});


		function readyStateChangeHandler(json){
			if (json){
				if (json.indexOf('{"result":[') != -1){
					var result = json;
					var obj;
					var html="";
					obj = eval("obj=" + result);
					
					var prefNm = obj.result[0].prefNm;
					var muniNm = obj.result[0].muniNm;
					var muniCd = obj.result[0].muniCd;
					var lv01Nm = obj.result[0].lv01Nm;
					var lon,lat;

					
					if (zoom <= BaseZoomLevel || prefNm == ""){
						html += "<span id=\"cs_level0\"><font size=2>全国</font></span>"; // -- merge1227
					} else {
						//初期表示と同じ経緯度
						lon=140.0852778;
						lat=36.10416667;
						html += "<span id=\"cs_level0\"><a href=\"javascript:void(0);\" class=\"cs_breadcrumbs\" onClick=\"csModule.mapEventHandler.moveCenter(" + lon + "," + lat + ",''," + BaseZoomLevel + ");\">全国</a></span>";
					}

					if (zoom > BaseZoomLevel){
						/*if (zoom <= 4 || muniNm == ""){
							html += "<span id=\"cs_level1\">" + prefNm + "</span>";
						}else{*/
							var prefCd = obj.result[0].prefCd;
							lon = PREF_TABLE[prefCd-1][1];
							lat = PREF_TABLE[prefCd-1][2];
							html += "<span id=\"cs_level1\"> > <a href=\"javascript:void(0);\" class=\"cs_breadcrumbs\" onClick=\"csModule.mapEventHandler.moveCenter(" + lon + "," + lat + ",'" + prefNm + "'," + (BaseZoomLevel+3) + ");\">" + prefNm + "</a></span>"; // -- merge1227
						//}
					}

					if (zoom > BaseZoomLevel+3){ // merge1227
						/*if (zoom <= 7 || lv01Nm == ""){
							html += "<span id=\"cs_level2\">" + muniNm + "</span>";
						}else{*/
							var gsi = new GsiJsLibrary(muniCd);
							var tmp = gsi.getMunicipality();
							var mobj = eval("mobj=" + tmp);
							lon = mobj.result[0].longitude;
							lat = mobj.result[0].latitude;

							html += "<span id=\"cs_level2\"> > <a href=\"javascript:void(0);\" class=\"cs_breadcrumbs\" onClick=\"csModule.mapEventHandler.moveCenter(" + lon + "," + lat + ",'"+ prefNm + muniNm + "'," + (BaseZoomLevel+8) + ");\">" + muniNm + "</a></span>"; // -- merge1227
						//}
					}

					if (zoom > BaseZoomLevel+8){ // -- merge1227
						lon = obj.result[0].longitude;
						lat = obj.result[0].latitude;
						html += "<span id=\"cs_level3\"> > <a href=\"javascript:void(0);\" class=\"cs_breadcrumbs\" onClick=\"csModule.mapEventHandler.moveCenter(" + lon + "," + lat + ",'"+ prefNm + muniNm + lv01Nm + "'," + (BaseZoomLevel+10) + ");\">" + lv01Nm + "</a></span>"; // -- merge1227
						//html += "<span id=\"cs_level3\">" + lv01Nm + "</span>";
					}

					$("#jus").empty();
					$("#jus").append(html);
				}
			}else{
				var html="";
				if (zoom <= BaseZoomLevel){
					html += "<span id=\"cs_level0\"><font size=2>全国</font></span>"; // -- merge1227
					$("#jus").empty();
					$("#jus").append(html);
				}
			}
		}
	}

	function getAddress(lon, lat){
	
		var address = "";
/*	
		//現在の中心経緯度・ズームレベルの取得
		var center=this.mapEventHandler.mapObj.getCenter();
		var center2=center.transform(projection900913,projection4326);
		var lat = center2.lat;
		var lon = center2.lon;
		var zoom = this.mapEventHandler.mapObj.getZoom();

		//経緯度は小数点以下6桁に丸める
		lat = lat * 1000000;
		lat = Math.round(lat) / 1000000;
		lon = lon * 1000000;
		lon = Math.round(lon) / 1000000;
*/
		var url = ChimeiSearch.CENTER_SEARCH;
		url += "?longitude=" + lon + "&latitude=" + lat;

		var parameter = {};
		parameter['request'] = url;
//		parameter['longitude'] = lon;
//		parameter['latitude'] = lat;

		function getRusult(json){
			$.proxy(readyStateChangeHandler, this)(json['result']);
		}

		$.ajax({
			type: "GET",
			url:ChimeiSearch.INTERFACE,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult
		});
		
		function readyStateChangeHandler(json){
			if (json){
			
				var address = "";
			
				if (json.indexOf('{"result":[') != -1){
					var result = json;
					var obj;
					var html="";
					obj = eval("obj=" + result);
					
					var addObj = obj.result[0];
					if (addObj){
						if (addObj.prefNm) address += addObj.prefNm;
						if (addObj.conNm) address += addObj.conNm;
						if (addObj.muniNm) address += addObj.muniNm;
						if (addObj.lv01Nm) address += addObj.lv01Nm;
					}
				}
				
				$("#popupAddress").empty();
				$("#popupAddress").append(address ? address : "---");
			}
		}
	}

	function executeSearch(autoMove) {
		var resultElement = this.find("#cs_result");
		// 検索結果の消去
		resultElement.empty();

		//前のマーカーを消す
		if(flagmarker == 1){
//			clearLayer('Marker');
			webtis.clearSearchResult();
			flagmarker = 0;
		}

		var parameter = {};

		$("#config_cs").animate({height: "hide", opacity: "toggle"},500);

		// 検索キーワード
		var chimeiElement = document.getElementById('cs_chimei_text');
		var chimeiText = chimeiElement.value.replace(/^\s+|\s+$/g, "");
		if (!chimeiText || chimeiElement.className == 'default_text') {
			resultElement.append($("<div style='padding:10px;text-align:center;color:red;'>キーワードを入力してください</div>"));
			return;
		}

		//経度・緯度が入力されているか判定します。
		//if ($.proxy(searchLonLat, this)(chimeiText)) return;

		// 範囲指定
		// 選択されているレイヤーとObjetIDから
		var areaLayer = this.find('#cs_area_pref option:selected')[0];
		parameter['pref'] = "";
		parameter['muni'] = "";
		
		if (areaLayer.index > 0 && areaLayer.innerText != "") {
			this.currentAreaObjects[areaLayer.index]
			parameter['pref'] = areaLayer.innerText + "|" + areaLayer.index;
			var areaObject = this.find('#cs_area_muni option:selected')[0];
			if (areaObject.innerText != "") {
				parameter['muni'] = areaObject.index == 0 ? "" : areaObject.innerText + "|" + areaObject.value;
			}			
		}

		// 検索対象
		var targetLayers = this.find("input[name='cs_target']:checked");
		if (targetLayers.length == 0) {
			resultElement.append($("<div style='padding:10px;text-align:center;color:red;'>検索対象を選択してください</div>"));
			return;
		}
		var tl = targetLayers[0].value;
		var length = targetLayers.length;
		for (var i = 1; i < length; i++) {
			tl += "|"+ targetLayers[i].value;
		} 
		parameter['tl'] = tl;
		// 一致方法
		var logicalCondition = this.find("input[name='cs_logical_condition']:checked").val();
		var textMatchCondition = this.find("input[name='cs_textmatch_condition']:checked").val();
		parameter['qt'] = logicalCondition+"|"+textMatchCondition;
		
		$("#cs_search_button")[0].disabled = true;

		parameter['query'] = encodeURIComponent(chimeiText);

//		parameter['pref'] = configArray['pref'];
//		if (configArray['muni']) parameter['muni'] = configArray['muni'];

//		var tl = configArray['target'];
//		parameter['tl'] = tl;
		
		if (autoMove){
			parameter['am'] = autoMove;
		}
		document.getElementById("cs_search_button").disabled = true;

		// 検索開始
		resultElement.append(("<div style='padding:10px;text-align:center;color:red;'>検索中</div>"));

		CurrentResultsList = new Array();
		CurrentSelectId = -1;

		if (tl.indexOf('address')>=0){
			$.proxy(searchAddress,this)(parameter);
		}else if (tl.indexOf('station')>=0){
			$.proxy(searchStation,this)(parameter);
		}else if (tl.indexOf('shisetsu')>=0){
			$.proxy(searchFacility,this)(parameter);
		}else if (tl.indexOf('chimei')>=0){
			$.proxy(searchPlace,this)(parameter);
		}
	}

	function clickResult(event) {
		if (this.mapEventHandler) {
			// 行がクリックされたときの処理を委譲
			var i = $(event.currentTarget).attr("_feature_index");
			var x = CurrentResultsList[i]["longitude"];
			var y = CurrentResultsList[i]["latitude"];
			var v;
			if (CurrentResultsList[i]['histNm']){
				v = CurrentResultsList[i]["histNm"];
			}else{
				v = CurrentResultsList[i]["value"];
			}
			this.mapEventHandler.moveCenter(x,y,v);
			CurrentSelectId = i;
			$.proxy(writeResultsList,this)(CurrentPage);
		}
	}


	function searchLonLat(key){
		var num;
		var param;

//		var tmp = key.replace(/^\s+|\s+$/g, "");
		var tmp = key;

		//経度、緯度が入力されているか判定します。
		//判定基準：1.半角数字が２種類入力されていて、経度・緯度の範囲に収まっている
		//			2.２種類の数字が「,、-」のいずれかで区切られている。
		for(var i=0; i<LON_LAT_SPLIT.length; i++){
			num = tmp.split(LON_LAT_SPLIT[i]);
			if (num.length == 2){
				
				if ((!isNaN(num[0])) && (!isNaN(num[1]))){
					var lon="", lat="";
					for(var t=0; t<2; t++){
						if (parseInt(num[t])>=15 && parseInt(num[t])<=55){
							lat = num[t];
						}else if(parseInt(num[t])>=110 && parseInt(num[t])<=165){
							lon = num[t];
						}
					}
					
					if (lon!="" && lat!=""){
						this.mapEventHandler.moveCenter(lon,lat,key);
						return(true);
					}
				}
			}
		}
		return(false);
	}

	function escapeHTML(val) {
       	 return $('<div>').text(val).html();
	}
	
	/**
	 * 検索を実行します。
	 */
	/*住所検索 ここから*/
	function searchAddress(parameter) {
		var url = "";
		var target = parameter['tl'];
		url = ChimeiSearch.SIMPLE_GEOCODING
				+ '?addr=' + parameter['query']
				+ '&charset=UTF8' 
				+ '&geosys=world'
				+ '&series=ADDRESS';
		
		var constraint="";
		var tmp;
		
		if (parameter['pref'] != ""){
			tmp = parameter['pref'].split('|');
			constraint += tmp[0];
		}

		if(parameter['muni']) {
			tmp = parameter['muni'].split('|');
			constraint += tmp[0];
		}

		if (constraint!="") url += "&constraint=" + encodeURIComponent(constraint);

		parameter['request'] = url;

		function getRusult(json){
			var xmlDoc;
			if (window.ActiveXObject)
			{
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = false;
				xmlDoc.loadXML(json['result']);
			}
			else if (window.DOMParser)
			{
				xmlDoc = new DOMParser().parseFromString(
					json['result'],
					"application/xml"
				);
			}
			$.proxy(readyStateChangeHandler_address, this)(xmlDoc);
		}

		$.ajax({
			type: "GET",
			url:ChimeiSearch.INTERFACE,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult,
			error:function(){
				var resultElement = $("#cs_result");
				resultElement.empty();
				resultElement.append($("<div style='padding:10px;text-align:center;color:red;'>住所検索に失敗しました。</div>"));
				document.getElementById("cs_search_button").disabled = false;
			}
		});


		function readyStateChangeHandler_address(json){
			var xmlObj = $(json);
			xmlObj.find("candidate").each(function(){
				if ($(this).find('iLvl').text() > 0){
					temp=$(this).find('address').text().split('/');
					addr=new Array();
					dispAddr = "";
					for (var i=0; i<temp.length; i++){
						if (temp[i].substr(temp[i].length-1) == '郡'){
							//郡は省きます
						}else if (temp[i].substr(temp[i].length-1) == '区'){
							if (temp[i-1].substr(temp[i-1].length-1) == '市'){
								//政令指定都市の区は市名と合わせます
								addr[addr.length-1] += temp[i];
							}
						}else{
							addr[addr.length] = temp[i];
						}
						dispAddr += temp[i];
					}

					n = CurrentResultsList.length;
					CurrentResultsList[n] = new Array();
					if (addr[0]) CurrentResultsList[n]['pref']=addr[0];
					if (addr[1]) CurrentResultsList[n]['muniNm']=addr[1];
					if (addr[2]) CurrentResultsList[n]['lv01']=addr[2];
					CurrentResultsList[n]['longitude'] = $(this).find('longitude').text();
					CurrentResultsList[n]['latitude'] = $(this).find('latitude').text();
					CurrentResultsList[n]['value'] = dispAddr;
					CurrentResultsList[n]['series'] = "ADDRESS";
				}
				
			});

			if (target.indexOf('station')>=0){
				$.proxy(searchStation,CS_Obj)(parameter);
			}else if(target.indexOf('shisetsu')>=0){
				$.proxy(searchFacility,CS_Obj)(parameter);
			}else if (target.indexOf('chimei')>=0){
				$.proxy(searchPlace,CS_Obj)(parameter);
			}else{
				$.proxy(showResults,$(CS_Obj))(parameter);
			}
		}
	}
	/*住所検索 ここまで*/

	/*駅検索 ここから*/
	function searchStation(parameter) {

		var url = "";
		var target = parameter['tl'];

		url = ChimeiSearch.SIMPLE_GEOCODING
				+ '?addr=' + parameter['query']
				+ '&charset=UTF8' 
				+ '&geosys=world'
				+ '&series=STATION';

		parameter['request'] = url;

		function getRusult(json){
			var xmlDoc;
			if (window.ActiveXObject)
			{
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = false;
				xmlDoc.loadXML(json['result']);
			}
			else if (window.DOMParser)
			{
				xmlDoc = new DOMParser().parseFromString(
					json['result'],
					"application/xml"
				);
			}
			$.proxy(readyStateChangeHandler_station, this)(xmlDoc);
		}

		$.ajax({
			type: "GET",
			url:ChimeiSearch.INTERFACE,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult,
			error:function(){
				var resultElement = $("#cs_result");
				resultElement.empty();
				resultElement.append($("<div style='padding:10px;text-align:center;color:red;'>駅検索に失敗しました。</div>"));
				document.getElementById("cs_search_button").disabled = false;
			}
		});

		function readyStateChangeHandler_station(json){
			var xmlObj = $(json);
			var temp,n;
			var dispAddr;
			var addr="";
			xmlObj.find("candidate").each(function(){
				if ($(this).find('iLvl').text() > 0){
				
					var subUrl = ChimeiSearch.CENTER_SEARCH + "?longitude=" + $(this).find('longitude').text() + "&latitude=" + $(this).find('latitude').text();
					var err = true;
					
					// 駅の検索結果に対し、同期処理で都道府県コード・市町村コードをチェックする
					$.ajax({
						async: false,
						type: "POST",
						data: $(this),
						dataType: 'json',
						timeout: 1000,
						error: function() {
						},
						url: subUrl,
						success: function(data, status){
							if (data.error) return;

							var prefCd = parameter['pref'] ? parameter['pref'].split('|')[1] : "";
							var muniCd = parameter['muni'] ? parameter['muni'].split('|')[1] : "";

							if (!prefCd ||
							    (prefCd == data.result[0]['prefCd'] && !muniCd) ||
							    (prefCd == data.result[0]['prefCd'] && muniCd == data.result[0]['muniCd'])){
							    err = false;
							}
						}
					});
				
					if (!err) {
						temp=$(this).find('address').text().split('/');
						addr=new Array();
						dispAddr = "";
						for (var i=0; i<temp.length; i++){
							addr[addr.length] = temp[i];
							dispAddr += temp[i];
						}

						n = CurrentResultsList.length;
						CurrentResultsList[n] = new Array();
						if (addr[0]) CurrentResultsList[n]['pref']=addr[0];
						if (addr[1]) CurrentResultsList[n]['muniNm']=addr[1];
						if (addr[2]) CurrentResultsList[n]['lv01']=addr[2];
						CurrentResultsList[n]['longitude'] = $(this).find('longitude').text();
						CurrentResultsList[n]['latitude'] = $(this).find('latitude').text();
						CurrentResultsList[n]['value'] = dispAddr;
						CurrentResultsList[n]['series'] = "STATION";
					}
				}
			});

			if(target.indexOf('shisetsu')>=0){
				$.proxy(searchFacility,CS_Obj)(parameter);
			}else if (target.indexOf('chimei')>=0){
				$.proxy(searchPlace,CS_Obj)(parameter);
			}else{
				$.proxy(showResults,CS_Obj)(parameter);
			}
		}
	}
	/*駅検索 ここまで*/

	/*公共施設検索 ここから*/
	function searchFacility(parameter){
		var url = "";

		var target = parameter['tl'];

		var constraint="";
		var tmp;
		if (parameter['pref'] != ""){
			tmp = parameter['pref'].split('|');
			constraint += "&prefCd=" + encodeURIComponent(tmp[1]);
		}
		if(parameter['muni']) {
			tmp = parameter['muni'].split('|');
			constraint += "&muniCd=" + encodeURIComponent(tmp[1]);
		}
		url = ChimeiSearch.SHISETSU_SEARCH + 
			'?searchWord=' + parameter['query'] + constraint;

		parameter['request'] = url;

		function getRusult(json){
			$.proxy(readyStateChangeHandler_shisetsu, this)(json['result']);
		}

		$.ajax({
			type: "GET",
			url:ChimeiSearch.INTERFACE,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult,
			error:function(){
				var resultElement = $("#cs_result");
				resultElement.empty();
				resultElement.append($("<div style='padding:10px;text-align:center;color:red;'>公共施設検索に失敗しました。</div>"));
				document.getElementById("cs_search_button").disabled = false;
			}
		});

		function readyStateChangeHandler_shisetsu(json){
			if (json.indexOf('{"result":[') != -1){
				var result = json;
				var n, pref;
				var obj;
				obj = eval("obj=" + result);

				for(var i=0; i<obj.result.length; i++){
					n = CurrentResultsList.length;
					CurrentResultsList[n] = new Array();
					pref=obj.result[i].muniCd.substr(0, obj.result[i].muniCd.length-3);
					CurrentResultsList[n]['pref']=pref;
					CurrentResultsList[n]['muniCd']=obj.result[i].muniCd;
					CurrentResultsList[n]['longitude'] = obj.result[i].longitude;
					CurrentResultsList[n]['latitude'] = obj.result[i].latitude;
					CurrentResultsList[n]['series'] = "FACILITY";

					pref = parseInt(pref);
					CurrentResultsList[n]['value']=obj.result[i].shisetsuNm;
				}
			}

			if(target.indexOf('chimei')>=0){
				$.proxy(searchPlace,CS_Obj)(parameter);
			}else{
				$.proxy(showResults,CS_Obj)(parameter);
			}
		}
	}
	/*公共施設検索 ここまで*/

	/*地名検索 ここから*/
	function searchPlace(parameter){
		var url = "";
		var target = parameter['tl'];

		var constraint="";
		var tmp;
		if (parameter['pref'] != ""){
			tmp = parameter['pref'].split('|');
			constraint += "&prefCd=" + encodeURIComponent(tmp[1]);
		}
		if(parameter['muni']) {
			tmp = parameter['muni'].split('|');
			constraint += "&muniCd=" + encodeURIComponent(tmp[1]);
		}

		url = ChimeiSearch.CHIMEI_SEARCH + 
			'?searchWord=' + parameter['query'] + constraint;

		parameter['request'] = url;

		function getRusult(json){
			$.proxy(readyStateChangeHandler_chimei, this)(json['result']);
		}

		$.ajax({
			type: "GET",
			url:ChimeiSearch.INTERFACE,
			data: parameter,
			dataType: "jsonp",
			timeout: 30000,
			success: getRusult,
			error:function(){
				var resultElement = $("#cs_result");
				resultElement.empty();
				resultElement.append($("<div style='padding:10px;text-align:center;color:red;'>地名検索に失敗しました。</div>"));
				document.getElementById("cs_search_button").disabled = false;
			}
		});

		function readyStateChangeHandler_chimei(json){
			if (json.indexOf('{"result":[') != -1){
				var result = json;
				var n, pref;
				var obj;
				obj = eval("obj=" + result);

				for(var i=0; i<obj.result.length; i++){
					n = CurrentResultsList.length;
					CurrentResultsList[n] = new Array();
					pref=obj.result[i].muniCd.substr(0, obj.result[i].muniCd.length-3);
					CurrentResultsList[n]['pref']=pref;
					CurrentResultsList[n]['muniCd']=obj.result[i].muniCd;
					CurrentResultsList[n]['longitude'] = obj.result[i].longitude;
					CurrentResultsList[n]['latitude'] = obj.result[i].latitude;
					CurrentResultsList[n]['series'] = "PLACE";

					CurrentResultsList[n]['value']=obj.result[i].chimeiNm;
				}
			}
			$.proxy(showResults,CS_Obj)(parameter);
		}
	}
	/*地名検索 ここまで*/

	function showResults(parameter){

		var searchButtonElement = document.getElementById("cs_search_button");

		if (CurrentResultsList.length == 0) {
			var resultElement = $("#cs_result");
			resultElement.empty();
			resultElement.append($("<div style='padding:10px;color:red;'></div>").append("「"+ decodeURIComponent(parameter['query']) +"」は見つかりませんでした。"));
			searchButtonElement.disabled = false;
			return;
		} else {
			CurrentPage = 1;
			if (parameter['am']) CurrentSelectId = 0;
			$.proxy(writeResultsList, this)(CurrentPage);
		}

		searchButtonElement.disabled = false;
		//地図を自動的に移動
		if (parameter['am']){
			var x = CurrentResultsList[0]["longitude"];
			var y = CurrentResultsList[0]["latitude"];
			var v;
			if (CurrentResultsList[0]['histNm']){
				v = CurrentResultsList[0]["histNm"];
			}else{
				v = CurrentResultsList[0]["value"];
			}
			var zoom = 15;
			//map.setCenter(new OpenLayers.LonLat(x, y).transform(projection4326, projection900913), zoom);
			webtis.setMapCenter(x, y, zoom);
			this.mapEventHandler.moveCenter(x,y,v,(BaseZoomLevel+10));
			webtis.addSearchResult(x, y, true);
		}
	}

	function writeResultsList(page){
		var resultElement = $("#cs_result");
		resultElement.empty();

		resultElement.append("<div class='cs_result_top'><font color='green' size='2'>　検索結果:"+ (CurrentResultsList.length) +"件</font>　</div>"); // -- merge1227
		var results = $("<div></div>");
		resultElement.append(results);

		var from = (page-1) * 10;
		var to = from + 10;

		if (CurrentResultsList.length < to) to = CurrentResultsList.length;

		for (var i=from; i<to; i++){
			var line ="";
			
			if (CurrentSelectId == i){
				line ="<div class='cs_block_select'><span class='cs_result_line_select'>";
				line += CurrentResultsList[i]['value'];
				line += "</span>";
			}else{
				line ="<div class='cs_block2'><a href='javascript:void(0);' class='cs_result_line2'>";
				line += CurrentResultsList[i]['value'];
				line += "</a>";
			}

			if (CurrentResultsList[i]['series'] == "PLACE" || CurrentResultsList[i]['series'] == "FACILITY"){
				var gsi,result,obj;
				var pref = CurrentResultsList[i]['pref'];
				var muniCd = CurrentResultsList[i]['muniCd'];
				var muniNm="";

				gsi = new GsiJsLibrary(muniCd);
				result = gsi.getMunicipality();
				if (!result) continue;
				
				obj = eval("obj=" + result);
				muniNm = obj.result[0].muniNm;
				muniNm = muniNm.replace('　', '');

				line += "<p style=\"padding-left:5px;\"><font size=1>" + PREF_TABLE[pref-1][0] + muniNm + "</font></p>";
				CurrentResultsList[i]['histNm'] = CurrentResultsList[i]['value'] + "（" + PREF_TABLE[pref-1][0] + muniNm + ")";
			}
			line += "</div>";
			// 検索結果を行にマッピング
			var lineObj = $(line);
			lineObj.attr({"_feature_index":i});
			lineObj.click(CS_Obj.clickResult);
			results.append(lineObj);
		}

		if (page > 1 || CurrentResultsList.length > page*10){
			var table = "<br><table><tr>";
			from = 0;
			to = 0;

			table += "<td width = '80' align='left'>";
			if (page > 1){
				table += "<a href='javascript:void(0);' class='cs_result_line2' id='prev'><<</a>";
			}
			table += "</td>";

			table += "<td width = '80' align='center'>";

			from = page-2;
			if (from<1) from=1;
			to = from+4;

			var tmp;
			if (parseInt(CurrentResultsList.length%10) == 0){
				tmp = parseInt(CurrentResultsList.length/10);
			}else{
				tmp = parseInt(CurrentResultsList.length/10) + 1;
			}

			if (to>tmp){
				to = tmp;
			}
			
			for(var i=from; i<=to; i++){
				if (i==page){
					table += "<span class='cs_result_line2'>" + i + "</span>";
				}else{
					table += "<a href='javascript:void(0);' class='cs_result_line2' id='page" + i + "'>" + i + "</a>";
				}
			}

			table += "</td>";

			table += "<td width = '80' align='right'>";
			if (CurrentResultsList.length > page*10){
				table += "<a href='javascript:void(0);' class='cs_result_line2' id='next'>>></a>";
			}
			table += "</td>";
			table += "</tr></table>";
			resultElement.append(table);

			resultElement.find("#prev").click($.proxy(function(){
				$.proxy(writeResultsList, this)(page-1);
//				this.writeResultsList(page-1);
			},this));

			resultElement.find("#next").click($.proxy(function(){
				$.proxy(writeResultsList, this)(page+1);
				//this.writeResultsList(page+1);
			},this));

			if (from>0){
				var start = from;
				for(var i=from; i<=to; i++){
					
					resultElement.find("#page" + i).click($.proxy(function(e){
						$.proxy(writeResultsList, this)(parseInt(e.currentTarget.id.replace("page","")));
//						this.writeResultsList(parseInt(e.currentTarget.id.replace("page","")));
					},this));
				}
			}
		}
		CurrentPage = page;
	}
	
	/**
	 * 地名検索で使用できるレイヤーの一覧を取得します。
	 */
	function loadLayerList() {
	
		// コンボボックスに格納
		var areaLayersElement = this.find("#cs_area_pref");
		areaLayersElement.empty();
		var targetLayersElement = this.find("#cs_target_layers");
		targetLayersElement.empty();
		
		var optStr = "<option value=''>未選択</option>";
		areaLayersElement.append($(optStr));

		for (var i in PREF_TABLE) {
			var pref = PREF_TABLE[i];
			
			optStr = "<option value='" + (i + 1) + "'>" + pref[0] + "</option>";
			areaLayersElement.append($(optStr));
		}
	}

	/**
	 * 地名検索で使用するレイヤーオブジェクトの一覧を取得します。
	 */
	function loadAreaObjectList(areaLayerId) {
	
		if (areaLayerId) {
			var gsi = new GsiJsLibrary(areaLayerId)						//オブジェクトを作成
			
			var data;
			if (areaLayerId == 1){
				data = gsi.getHokkaidoMuniList();							//市町村リストを取得
			}
			else {
				data = gsi.getMunicipalityList();						//市町村リストを取得
			}
			var jsonData = eval("(" + data + ")");						//JSONに変換

			var areaObjectsElement = this.find("#cs_area_muni");
			
			var optStr = "<option value='*'>未選択</option>";
			areaObjectsElement.append($(optStr));
			var extents = [];
//			var OpenLayers = this.mapEventHandler.getOpenLayers();
//			var geojson_format = new OpenLayers.Format.GeoJSON();

			for (var i = 0; i < jsonData.result.length; i++){
			
				var data = jsonData.result[i];
			
				optStr = "<option value='";
				optStr += data.muniCd;
				optStr += "'>";
				optStr += data.muniNm;
				optStr +="</option>";
				areaObjectsElement.append($(optStr));
				
				// muniCdをキーにして、矩形を保存
				//var geom = new OpenLayers.LonLat(data.longitude, data.latitude);
				var geom = { "lon" : data.longitude, "lat" : data.latitude };
				extents[data.muniCd] = geom;
			}
			this.currentAreaObjects = extents;
			areaObjectsElement[0].disabled = false;
		} else {
			// コンボボックスに格納
			var areaObjectsElement = this.find("#cs_area_muni");
			areaObjectsElement.empty();
		}
	}
};
})(jQuery);




/** OpenLayersのクラスの簡易版 **/
ChimeiSearch.Class = function() {
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
        ChimeiSearch.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;
};

ChimeiSearch.extend = function(destination, source) {
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



//-- OpenLayersのハンドラ
ChimeiSearch.OpenLayersDefaultHandler = ChimeiSearch.Class({
	initialize: function(config) {
		this.mapObj = config.mapObj;
		if (config.webtis) {
			this.webtis = config.webtis;
		}
		if (config.OpenLayers) {
			this.OpenLayers = config.OpenLayers;
		}
	},
	// 初期化
	initHandler : function() {
		// 描画用のレイヤを用意
		// OpenLayersのMapオブジェクトを取り出して、描画を行います。
		var OpenLayers = this.getOpenLayers();
		this.layer = new OpenLayers.Layer.Vector("temp");
		this.mapObj.addLayer(this.layer);							
		this.drawControl = new OpenLayers.Control.DrawFeature(this.layer, OpenLayers.Handler.Polygon);
		this.drawControl.featureAdded = $.proxy(function(newFeature) {
			// 選択用の範囲オブジェクトは、一つだけ。
			for (var i = 0; i < this.layer.features.length; i++) {
				if (newFeature != this.layer.features[i]) {
					this.layer.removeFeatures(this.layer.features[i]);
				}
			}
			if (newFeature.geometry.components[0].components.length <= 3) {
				this.layer.removeFeatures(newFeature);
				return;
			}
		},this);
	},
	getProjection : function() {
		if (!this.projection) {
			var OpenLayers = this.getOpenLayers();
			this.projection = new OpenLayers.Projection("EPSG:4326");
		}
		return this.projection;
	},
	// 検索結果を選択したときの処理
	resultSelected : function (feature,csSearch) {
		var point = feature.geometry.getCentroid();
		// 地図の投影法に合わせる
		var a = point.transform(this.getProjection(),this.mapObj.getProjectionObject());
		var OpenLayers = this.getOpenLayers();
		var zoomLevel = this.getNumZoomLevels()-4;
		if (zoomLevel < 0) {
			zoomLevel = this.getNumZoomLevels()-1;
		}
		this.mapObj.setCenter(new OpenLayers.LonLat(a.x,a.y),zoomLevel);
		
		//2回目以降は前のマーカーを消す
		if(flagmarker == 1){
		map.removeLayer(map.getLayersByName('Marker')[0]);
		}
		//マーカーをおく
		var marker = new OpenLayers.Layer.Markers("Marker");
		this.mapObj.addLayer(marker);
		marker.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(a.x,a.y)));
		flagmarker = 1;
	},
	// S 復元
	// 地図上でエリアを描画を開始するときの処理
	startDrawArea : function () {
		if (this.layer == null) {
			this.initHandler();
		}
		this.mapObj.addControl(this.drawControl);
		this.drawControl.activate();					
	},
	// 地図上でエリアを描画を終了するときの処理
	stopDrawArea : function () {
		if (this.layer == null) {
			this.initHandler();
		}
		this.mapObj.removeControl(this.drawControl);
		this.layer.removeAllFeatures();
		this.drawControl.deactivate();
	},
	// 描画した形状を取得
	getDrawArea :  function() {
		if (this.layer == null) {
			this.initHandler();
		}
		if (this.layer.features.length == 0) {
			// 描画した範囲は、存在しません。
			return null;
		}
		// WKTでかえします。
		var a = this.layer.features[0].geometry.clone().transform(this.mapObj.getProjectionObject(), this.getProjection());
		return a.toString();
	},
	// エリアが選択されたときに呼び出されます。
	areaChanged : function(geom) {
//		var webtis = this.getWebtis();
//		var a = geom.getBounds().transform(this.getProjection(),webtis.map.getProjectionObject());
//		webtis.map.zoomToExtent(a);
		var a = geom.getBounds();
	},
	// E 復元
	// 検索結果を選択したときの処理
	moveCenter : function (x,y,v,zoom) {
//		var OpenLayers = this.getOpenLayers();
		var zoomLevel;

		if (zoom){
			zoomLevel = zoom;
		}else{
			zoomLevel = this.getNumZoomLevels();
		}
		
		// 地図の投影法に合わせる
//		this.mapObj.setCenter(new OpenLayers.LonLat(x,y).transform(this.getProjection(),this.mapObj.getProjectionObject()),zoomLevel);
		webtis.setMapCenter(x, y, zoomLevel);
		
		// TODO: マーカー
		//2回目以降は前のマーカーを消す
		if(flagmarker == 1){
//			map.removeLayer(map.getLayersByName('Marker')[0]);
			webtis.clearSearchResult();
			flagmarker = 0;
		}

		if (zoomLevel > BaseZoomLevel){
			//マーカーをおく
//			var marker = new OpenLayers.Layer.Markers("Marker");
//			this.mapObj.addLayer(marker);
			
//			var size = new OpenLayers.Size(30,30);
//			var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
//			var icon = new OpenLayers.Icon("./image/marker_icon.PNG", size, offset);
//			marker.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(x,y).transform(this.getProjection(),this.mapObj.getProjectionObject()),icon));
//			marker.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(x,y).transform(this.getProjection(),this.mapObj.getProjectionObject())));
			webtis.addSearchResult(x, y, true);
			flagmarker = 1;
		}

/*
		if (v!=""){
			var mapMeta = webtisMap.getCurrentMetaData();
			var str = "";
			if (mapMeta) str = mapMeta.dataId;
			var histURL = "http://portal.cyberjapan.jp/site/mapuse/index.html?lon=" + x + "&lat=" + y + "&z=" + (zoomLevel);	// -- merge1227
			if (str!="") histURL += "&did=" + str;
			document.cookie = "hist=" + encodeURIComponent(v) + "; expires=Tue, 1-Jan-2030 00:00:00 GMT; path=/";
			document.cookie = "histURL=" + histURL + "; expires=Tue, 1-Jan-2030 00:00:00 GMT; path=/;";
		}
*/
	},
	
	getNumZoomLevels : function() {
//		return this.mapObj.getNumZoomLevels();
		// TODO: 暫定
		return 19;
	}
});

//20120905 sato add
function syousai(flag)	{
/*
		$("#syousaiSetting").animate(
	      {height: "toggle", opacity: "toggle"},
	      500
		);
*/
	var str;
	if(flag)	{
		str = "<a href='javascript:void(0)' onClick='syousai(0);'><font size=2>閉じる▲</font></a>";
		document.getElementById("syousaiBox").innerHTML=str;
		document.getElementById("syousaiSetting").style.display="block";
	}else{
		str = "<a href='javascript:void(0)' onClick='syousai(1);'><font size=2>詳細設定▼</font></a>";
		document.getElementById("syousaiBox").innerHTML=str;
		document.getElementById("syousaiSetting").style.display="none";
	}
}



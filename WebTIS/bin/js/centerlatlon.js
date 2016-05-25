/**
 * 中心位置表示に関する実装
 */

/*中心位置の経緯度表示*/
function prncenter() {
	//現在の中心経緯度・ズームレベルの取得
    var lat = webtis.getCy();
    var lon = webtis.getCx();
    var roundMe=100;
    //六十進数表示のために経緯度の絶対値を取る
    if(lon < 0){
    	var lon2 = -1 * lon;
    }else{
    	lon2 = lon;
    }
    if(lat < 0){
    	var lat2 = -1 * lat;
    }else{
    	lat2 = lat;
    }
    
    if(dmsflag == 1){	//中心経緯度が六十進数表示のときは北緯or南緯、西経or東経の切り替えをする
	    if(lat < 0 && lon < 0){
			document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心南緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　西経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
		}else if(lat < 0 && lon >= 0){
			document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心南緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　東経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
		}else if(lat >= 0 && lon < 0){
			document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心北緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　西経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
		}else if(lat >= 0 && lon >= 0){
			document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心北緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　東経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
		}
	}
	var EH=parseInt(lon2);
	var EM=parseInt((lon2-EH)*60);
	var ES=(lon2-EH-(EM/60))*3600	;
	var ESS=(Math.round(ES*roundMe)/roundMe);
	if(ESS==60){ESS=0; EM=EM+1;};
	if(EM==60){EM=0; EH=EH+1;};
	var NH=parseInt(lat2);
	var NM=parseInt((lat2-NH)*60);
	var NS=(lat2-NH-(NM/60))*3600;
	var NSS=(Math.round(NS*roundMe)/roundMe);
	if(NSS==60){NSS=0; NM=NM+1;};
	if(NM==60){NM=0; NH=NH+1;};
    var zoom = webtis.getZoomLevel();	//ズームレベルを相対から絶対に変換
    
    //経緯度は小数点以下6桁に丸める
    lat = lat * 1000000;
    lat = Math.round(lat) / 1000000;
    lon = lon * 1000000;
    lon = Math.round(lon) / 1000000;
	
	//中心経緯度表示
    var html= lat + "," + lon;
    if(document.getElementById('center')){
    	document.getElementById('center').value = html;
    }else{
    	document.getElementById('deglon').value = EH;
		document.getElementById('minlon').value = EM;
		document.getElementById('seclon').value = ESS;
		document.getElementById('deglat').value = NH;
		document.getElementById('minlat').value = NM;
		document.getElementById('seclat').value = NSS;
	}

	if (csModule != null) {
		csModule.prncenter();
	}
	//URLに表示する情報をセット
	location.hash="#zoom="+zoom+"&lat="+lat+"&lon="+lon;
}

/*中心位置座標を度分秒表示に切り替える*/
function ddmmss(){
    var lat = webtis.getCy();
    var lon = webtis.getCx();
    //負の値になったときは南緯・西経に切り替える
    document.getElementById('centerform').innerHTML = "";
    if(lat < 0 && lon < 0){
		document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心南緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　西経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
	}else if(lat < 0 && lon >= 0){
		document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心南緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　東経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
	}else if(lat >= 0 && lon < 0){
		document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心北緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　西経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
	}else if(lat >= 0 && lon >= 0){
		document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="2">中心北緯</font> <input type="text" size="2" id="deglat" name="deglat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">度</font><input type="text" size="2" id="minlat" name="minlat" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclat" name="seclat" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒　東経</font> <input type="text" size="3" id="deglon" name="deglon" style="font-weight:500;font-size:15px;width:30px;"><font size="2">度</font><input type="text" size="2" id="minlon" name="minlon" style="font-weight:500;font-size:15px;width:20px;"><font size="2">分</font><input type="text" size="4" id="seclon" name="seclon" style="font-weight:500;font-size:15px;width:45px;"><font size="2">秒</font><input type="button" value="移動" onclick="moveto()"><input type="button" value="十進" onclick="ddd()"></form><div id="outText"></div>';
	};
	dmsflag = 1	//六十進数表示ON
	prncenter();
}
 
/*中心位置座標を十進表示に切り替える*/
function ddd(){
	document.getElementById('centerform').innerHTML = "";
	document.getElementById('centerform').innerHTML = '<form action="index.html" onsubmit="return moveto()"><font size="3">中心緯度経度：</font> <input type="text" id="center" name="center" size="21" style="padding-left:5px;font-weight:500;font-size:15px;border:2px #6495ED solid;width:190px;"> <input type="button" value="移動" onclick="moveto()"><input type="button" value="度分秒" onclick="ddmmss()"></form><div id="outText"></div>';
	dmsflag = 0;	//六十進数表示OFF
	prncenter();
}

/* 移動ボタンで中心位置を移動させる */
function moveto() {
	if(document.getElementById('center')){
		var center = document.getElementById("center").value;
		if(center) {
			/*UTMパラメータが入力されたときの処理*/
			if(center.substring(2, 3).match(/^[A-Z]/)){
				var mark;
				var newMgrs;
				var pointX;
				var pointY;
				mark = center.substring(2,3);
				newMgrs = center.substring(3,5);
				pointX = center.substring(5,9);
				pointY = center.substring(9,13);
				
				$.ajax({
					url: 'http://portal.cyberjapan.jp/site/mapuse4/grid/mgrsXY.php?mgrs=' + newMgrs + '&mark=' + mark,
					type: 'GET',
					dataType: 'jsonp',
					/*返却されたJSONデータを処理*/
					success: function(data) {
					
						/*UTM座標の作成*/
						var topX = data.topX;
						var topY = data.topY;
						var utmZone = data.utmZone;
						pointX = (pointX * 10) + (topX * 100000);
						pointY = (pointY * 10) + (topY * 100000);
						var wsPoint = new Proj4js.Point(pointX, pointY);
						var projUTM = null;
						
						/* UTMゾーンによって投影法を設定 */
						if(utmZone==51)	{
							projUTM = new Proj4js.Proj('EPSG:3097');
						}else if(utmZone==52)	{
							projUTM = new Proj4js.Proj('EPSG:3098');
						}else if(utmZone==53)	{
							projUTM = new Proj4js.Proj('EPSG:3099');
						}else if(utmZone==54)	{
							projUTM = new Proj4js.Proj('EPSG:3100');
						}else if(utmZone==55)	{
							projUTM = new Proj4js.Proj('EPSG:3101');
						}else if(utmZone==56)	{
							projUTM = new Proj4js.Proj('SR-ORG:1235');
						}else{
							projUTM = null;
						}
						
						/* Webメルカトルに投影変換して中心位置を移動 */
						var destProj = new Proj4js.Proj('EPSG:4326');
						var wsTrmPoint = Proj4js.transform(projUTM, destProj, wsPoint);
						webtis.setMapCenter(wsPoint.x, wsPoint.y, 15);
//						map.setCenter(new OpenLayers.LonLat(wsTrmPoint.x, wsTrmPoint.y), 15);
						
						/* UTMポイントを表示する */
//						var lonlatPoint = wsTrmPoint.transform(projection900913, projection4326);
//						utmPointDraw(lonlatPoint.x, lonlatPoint.y);
					}
				});
				return false;
			} else {
				lonlat = center.split(",");
				lat = Number(lonlat[0]);
				lon = Number(lonlat[1]);
				zoom = 15;
				webtis.setMapCenter(lon,lat, zoom);
				return false;
			}
		}
	}else{
    	//度分秒のそれぞれの入力値を取得
		var EH = Number(document.getElementById("deglon").value);
		var EN = Number(document.getElementById("minlon").value);
		var ESS = Number(document.getElementById("seclon").value);
		var NH = Number(document.getElementById("deglat").value);
		var NN = Number(document.getElementById("minlat").value);
		var NSS = Number(document.getElementById("seclat").value);
		var lon = EH + EN/60.0 + ESS/3600.0;
		var lat = NH + NN/60.0 + NSS/3600.0;
		//下記の場合わけのために現在の中心経緯度・ズームレベルの取得
    	var lat2 = webtis.getCy();
    	var lon2 = webtis.getCx();
    	//南緯の場合は入力値の符号を逆にする
		if(lat2 < 0){
			lat = lat * -1;
		}
		//西経の場合は入力値の符号を逆にする
		if(lon2 < 0){
			lon = lon * -1;
		}
		
		var zoom = 15;
		webtis.setMapCenter(lon,lat,zoom);
		return false;
	}
}

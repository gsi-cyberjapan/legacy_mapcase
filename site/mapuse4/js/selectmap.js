/** 背景地図変換画面用Javascript実装 **/

//地図の種類画面フラグ
var mapSelectFlg = 0;

//ボタンのOFF/ONフラグ
var offonflg = 0;

//MapFloatingコントロールのインスタンス(フローティングウィンドウを開くためのボタン)
var mapfloating = null;
 
//MapCloseFloatingコントロールのインスタンス(フローティングウィンドウを閉じるためのボタン)
var mapclosefloating = null;

//コントロール定義
// 右上の地図種別展開アイコンを定義
webtis.Control.MapFloating = OpenLayers.Class(OpenLayers.Control, {
	
	createCtrlImage: function(url, left, handler) {
		var	image = document.createElement('img');
		image.src = url;
		image.title = "地図・空中写真切り替え";
		image.style.position = "absolute";
		image.style.left = left + "px";
		image.style.width = '74px';
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
			this.div.style.right = 80 + "px";
			
			this.createCtrlImage("sys/v4/image/floatbefore07.png", 0, function(e) {
//				clickmapfloating();
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
	
	CLASS_NAME: "webtis.Control.MapFloating"
});
 
// 右上の地図種別展開後、閉じるためのコントロール定義
webtis.Control.MapCloseFloating = OpenLayers.Class(OpenLayers.Control, {
	
	createCtrlImage: function(url, left, handler) {
		var	image = document.createElement('img');
		image.src = url;
		image.style.position = "absolute";
		image.style.left = left + "px";
		image.style.width = '74px';
		image.style.height = '32px';
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
			this.div.style.right = 80 + "px";
			
			this.createCtrlImage("sys/v4/image/floatafter07.png", 0, function(e) {
				clickmapclosefloating();
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
	
	CLASS_NAME: "webtis.Control.MapCloseFloating"
});

/* マップフローティングを表示するときの処理 */
function clickmapfloating(top) {
	//フローティングウィンドウを出す
//	new $pop( 'mapfloat.html', { type: 'iframe', title: '地図・写真の種類', width: 480, height: 400, varName: 'mapfloat', resize:true } );

	//コントロールを入れ替え
	map.removeControl(mapfloating);
	mapclosefloating = new webtis.Control.MapCloseFloating();
	map.addControl(mapclosefloating);
	mapSelectFlg = 1;	//ウィンドウ表示状態(表示)

	selectmapinit();	//初期化

	var selectmap = document.getElementById("selectmap");
	selectmap.style.top  = top + 'px';		//表示位置設定
	selectmap.style.right = '6px';
	$("#selectmap").animate({height:"show"},"fast");
	selectmap.style.display = 'block';		//表示
}
 
/* マップフローティングを非表示するときの処理 */
function clickmapclosefloating() {
	//フローティングウィンドウを閉じる
//	mapfloat.close();
	var selectmap = document.getElementById('selectmap');

	if (selectmap.style.display == "block"){
		//コントロールの入れ替え
		map.removeControl(mapclosefloating);
		mapfloating = new webtis.Control.MapFloating();
		map.addControl(mapfloating);
		mapSelectFlg = 0;	//ウィンドウ表示状態(非表示)
		$("#selectmap").animate({height:"hide"},"fast",null,function(){selectmap.style.display = "none";});
//		selectmap.style.display = "none";		//非表示する
	}
}

/*フローティングウィンドウから背景地図を変更するための関数*/
function changeOrtho(mapid){
	changeMap(mapid);
}

/*現在使用している地図データにチェックを入れる*/
function selectmapinit(){
	
	//ズームレベル5のデータIDでチェック
	var dataId = webtisMap.dataSet[5].dataId;
	switch (dataId) {
		case 'JAIS' :
			switch (webtisMap.dataSet[15].dataId){
				case 'DJBMO':		document.getElementById('djbmo').checked = true; break;
				case 'D25K2BRWN':	document.getElementById('25000_n').checked = true;  break;
				default:			document.getElementById('25000').checked = true; break;
			}
			break;
		case 'JAISE' :
		case 'english':
			document.getElementById('jaise').checked = true; break;
		case 'RELIEF' :
			document.getElementById('relief').checked = true; break;
		case 'std' :
			switch (webtisMap.dataSet[15].dataId){
				case 'std2012':	document.getElementById('25000').checked = true; break;
				case 'pale' :	document.getElementById('pale').checked = true; break;
				case 'ort' :	document.getElementById('djbmo').checked = true; break;
				default:		document.getElementById('25000_n').checked = true; break;
			}
			break;
	}

	//ズームレベル9のデータIDでチェック
	dataId = webtisMap.dataSet[9].dataId;
	switch (dataId) {
		case 'SPRING' :
			document.getElementById('spring').checked = true;
			break;
		case 'SUMMER' :
		case 'greenshade2012':
			document.getElementById('summer').checked = true;
			break;
		case 'AUTUMN' :
		case 'brownshade2012':
			document.getElementById('autumn').checked = true;
			break;
		case 'WINTER' :
			document.getElementById('winter').checked = true;
			break;
		case 'GRAY' :
		case 'monotoneshade2012':
			document.getElementById('grey').checked = true;
			break;
		case 'BLANK' :
		case 'blank' :
			document.getElementById('blank').checked = true;
	}

}
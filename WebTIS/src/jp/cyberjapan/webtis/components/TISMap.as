package jp.cyberjapan.webtis.components
{
	import com.adobe.serialization.json.JSON;
	import flash.system.Security;
	import jp.cyberjapan.webtis.tile.TISMapTile;
	import mx.logging.ILogger;
	import mx.logging.Log;
	import org.openscales.core.basetypes.Resolution;
	import org.openscales.core.events.MapEvent;
	import org.openscales.core.layer.originator.ConstraintOriginator;
	import org.openscales.core.layer.originator.DataOriginator;
	import org.openscales.core.layer.TMS;
	import org.openscales.core.tile.ImageTile;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.geometry.basetypes.Size;

	/**
	 * 電子国土地図.
	 * 電子国土地図の表示および地図の切替機能を提供します。
	 * @author T. Nakayama
	 */
	public class TISMap extends TMS 
	{

		/**
		 * ベースマップのURL
		 */
		//private const BASEMAP_TILE_SERVER:String = "http://cyberjapandata.gsi.go.jp/sqras/all";
		//private const BASEMAP_TILE_SERVER2:String = "http://cyberjapandata2.gsi.go.jp/sqras/all";

		[Embed(source="../../../../../assets/map/tiledef.json", mimeType="application/octet-stream")]
		private var _tiledefClass:Class;
		private var _tiledef:Object = com.adobe.serialization.json.JSON.decode(new _tiledefClass());

		private static const DEFAULT_TILE_WIDTH:int = 256;
		private static const DEFAULT_TILE_HEIGHT:int = 256;
		
		/**
		 * データIDが"TRANSPARENT"の場合は、メタデータが地理院サーバーから取れないので、自分で設定する。
		 */
		private static const TRANSPARENT_METADATA:Object = {
			"dataId":"TRANSPARENT",
			"title":"",
			"description":"",
			"imageFormat":"png",
			"owner":"",
			"ellipsoid":"WGS84",
			"projection":"Mercator",
			"license":"",
			"serverURL":"",
			"serverRevisionURL":"",
			"label":"",
			"legendURL":"",
			"mapType":"2"
		};

		/**
		 * データオリジネータ
		 */
		private static const ORIGINATOR:DataOriginator = new DataOriginator("電子国土", "http://portal.cyberjapan.jp/", "image/icon01.gif");

		/**
		 * ズームレベルごとの地図の種類の定義
		 */
		private var _mapKind:Object = null;

		/**
		 * 現在表示中の地図の種類
		 */
		private var _mapID:String = null;

		/**
		 * 表示優先度
		 */
		private var _displayPriority:int = int.MAX_VALUE;

		private var logger:ILogger = Log.getLogger("TISMap");

	// hamas : 13.08.27 空中写真のズーム対応
		private var _tileWidth18:Number = NaN;
		private var _tileHeight18:Number = NaN;
		
		/**
		 * コンストラクタ
		 * @param	identifier レイヤーのID
		 */
		public function TISMap(identifier:String) 
		{
			super(identifier, null, "base");
//			if (Security.sandboxType == Security.REMOTE) {
//				this.proxy = "proxy.php?url=";
//			}
			this.projection = "EPSG:900913";
			this.generateResolutions(19, 156543.03390625);
			this.minResolution = new Resolution(this.resolutions[this.resolutions.length -1], this.projection);
			this.maxResolution = new Resolution(this.resolutions[2], this.projection);
//			this.maxExtent = new Bounds( -180, -85.051128779807, 180, 85.051128779807, "ESPG:4326");
			this.maxExtent = new Bounds( -128 * 156543.03390625, -128 * 156543.03390625, 128 * 156543.03390625, 128 * 156543.03390625, this.projection);
			var constraint:ConstraintOriginator = new ConstraintOriginator(this.maxExtent, this.minResolution, this.maxResolution);
			ORIGINATOR.constraints.push(constraint);
			this.originators.push(ORIGINATOR);
			this._tileOrigin = new Location(this.maxExtent.left, this.maxExtent.top, this.projection);
			this.finest = false;
			
			// デフォルトの地図の種類を設定
			this._mapID = "JAIS";
			this._mapKind = {
				0: "std",
				1: "std",
				2: "std",
				3: "std",
				4: "std",
				5: "std",
				6: "std",
				7: "std",
				8: "std",
				9: "std",
				10: "std",
				11: "std",
				12: "std",
				13: "std",
				14: "std",
				15: "std",
				16: "std",
				17: "std",
				18: "std"
			};
		}

		/**
		 * 取得するタイルのURLを返します。
		 * @param	bounds タイルの範囲
		 * @return  地図画像のURL
		 */
		override public function getURL(bounds:Bounds):String
		{
			var res:Resolution = this.getSupportedResolution(this.map.resolution.reprojectTo(this.projection));
			var z:Number = this.getZoomForResolution(res.value);
			var currentMetadata:Object = this.getCurrentMetadata(z);
			if (currentMetadata == null) {
				return null;
			}
			if (!currentMetadata.hasOwnProperty("dataId")) {
				return null;
			}
			var dataID:String = currentMetadata["dataId"];

//			var newTileWidth:Number = this.tileWidth;
//			var newTileHeight:Number = this.tileHeight;
			if (dataID == "NLII1"
					|| dataID == "NLII2"
					|| dataID == "NLII3"
					|| dataID == "NLII4"
					|| dataID == "DJBMO")
			{
				if (z == 18) {
					z = 17;
				}
			} else if (dataID == "RELIEF") {
				if (z > 15) {
					z = 15;
				}
			}
			
//			var x:Number = Math.round((bounds.left - this.maxExtent.left) / (res.value * newTileWidth));
//			var y:Number = Math.round((this.maxExtent.top - bounds.top) / (res.value * newTileHeight));
			var x:Number = Math.round((bounds.left - this.maxExtent.left) / (res.value * this.tileWidth));
			var y:Number = Math.round((this.maxExtent.top - bounds.top) / (res.value * this.tileHeight));
			// logger.debug("z : " + z + ", resolution : " + res.value + ", bounds : " + bounds.left + " " + bounds.top + ", extent : " + this.maxExtent.left + " " + this.maxExtent.top);
			var limit:Number = Math.pow(2, z);
			if (y < 0 || y >= limit)
			{
				return null;
			}
			x = ((x % limit) + limit) % limit;

			var ext:String = currentMetadata["imageFormat"];
			if (ext == "jpeg") {
				ext = "jpg";
			}

			var url:String = null;
			if (!this._tiledef.hasOwnProperty("url") || !this._tiledef.hasOwnProperty("data")) {
				return null;
			}
			if (!this._tiledef["data"].hasOwnProperty(dataID) || !this._tiledef["data"][dataID].hasOwnProperty("url")) {
				return null;
			}
			var urlTemplate:String = this._tiledef["data"][dataID]["url"];
			if (!this._tiledef["url"].hasOwnProperty(urlTemplate)) {
				return null;
			}
			url = this._tiledef["url"][urlTemplate];
			
			// 部品を作る
			var xs:String = this.zeroPad(x as int, 6);
			var ys:String = this.zeroPad(y as int, 6);
			var dir:String = "";
			for (var i:int = 0; i < 6; i++) {
				dir = dir + "/" + xs.charAt(i) + ys.charAt(i);
			}
			
			// プレースホルダの置き換え
			url = url.replace(/\(xs\)/g, xs);
			url = url.replace(/\(ys\)/g, ys);
			url = url.replace(/\(x\)/g, x.toString());
			url = url.replace(/\(y\)/g, y.toString());
			url = url.replace(/\(z\)/g, z.toString());
			url = url.replace(/\(dataid\)/g, dataID);
			url = url.replace(/\(ext\)/g, ext);
			url = url.replace(/\(dir\)/g, dir);
			
/*
			// 取得先のサーバ調整
			if (dataID == "JAIS2"
					|| dataID == "BAFD1000K2"
					|| dataID == "BAFD200K2"
					|| dataID == "D25K2"
					|| dataID == "JAISG"
					|| dataID == "BAFD1000KG"
					|| dataID == "BAFD200KG"
					|| dataID == "D25KG"
					|| dataID == "BLANK"
					|| dataID == "BLANKM"
					|| dataID == "BLANKC"
					|| dataID == "D2500"
					|| dataID == "D2500G"
					|| dataID == "SPRING"
					|| dataID == "SUMMER"
					|| dataID == "AUTUMN"
					|| dataID == "WINTER"
					|| dataID == "GRAY") {
				url = this.BASEMAP_TILE_SERVER2 + "/" + dataID + "/latest/" + z;
			} else {
				url = this.BASEMAP_TILE_SERVER + "/" + dataID + "/latest/" + z;
			}

			var xs:String = this.zeroPad(x as int, 6);
			var ys:String = this.zeroPad(y as int, 6);
			for (var i:int = 0; i < 6; i++) {
				url = url + "/" + xs.charAt(i) + ys.charAt(i);
			}
			var ext:String = currentMetadata["imageFormat"];
			if (ext == "jpeg") {
				ext = "jpg";
			}
			url = url + "/" + xs + ys + "." + ext;
*/
			if (this.altUrls != null) {
				url = this.selectUrl(this.url, this.getUrls());
			}

			//logger.debug("URL : " + url);
			return url;
		}
		
		public function getErrorURL(bounds:Bounds):String
		{
			var errorURL:String = "";
			var res:Resolution = this.getSupportedResolution(this.map.resolution.reprojectTo(this.projection));
			var z:Number = this.getZoomForResolution(res.value);

			var currentMetadata:Object = this.getCurrentMetadata(z);
			if (currentMetadata == null) {
				errorURL = null;
			} else if (!currentMetadata.hasOwnProperty("dataId")) {
				errorURL = null;
			} else {
				var dataID:String = currentMetadata["dataId"];
				if (!this._tiledef.hasOwnProperty("errorurl") || !this._tiledef.hasOwnProperty("data")) {
					errorURL = null;
				} else if (!this._tiledef["data"].hasOwnProperty(dataID) || !this._tiledef["data"][dataID].hasOwnProperty("errorurl")) {
					errorURL = null;
				} else {
					var urlTemplate:String = this._tiledef["data"][dataID]["errorurl"];
					errorURL = this._tiledef["errorurl"][urlTemplate];
				}
			}
			return errorURL;
			//logger.debug("errorurl : " + errorURL);
		}

		override public function redraw(fullRedraw:Boolean = false):void
		{
			var res:Resolution = this.getSupportedResolution(this.map.resolution.reprojectTo(this.projection));
			var z:Number = this.getZoomForResolution(res.value);
			var currentMetadata:Object = this.getCurrentMetadata(z);
			if (currentMetadata == null) {
//				trace(this.displayedName + " : NO METADATA");
				return;
			}
			if (!currentMetadata.hasOwnProperty("dataId")) {
//				trace(this.displayedName + " : NO dataID");
				return;
			}
			var dataID:String = currentMetadata["dataId"];

//			var newTileWidth:Number = this.tileWidth;
//			var newTileHeight:Number = this.tileHeight;
			if (dataID == "NLII1"
					|| dataID == "NLII2"
					|| dataID == "NLII3"
					|| dataID == "NLII4"
					|| dataID == "DJBMO")
			{
				if (z == 18) {
//					newTileWidth = this.tileWidth * 2;
//					newTileHeight = this.tileHeight * 2;
					this.tileWidth = DEFAULT_TILE_WIDTH * 2;
					this.tileHeight = DEFAULT_TILE_HEIGHT * 2;
				} else {
					this.tileWidth = DEFAULT_TILE_WIDTH;
					this.tileHeight = DEFAULT_TILE_HEIGHT;
				}
			} else if (dataID == "RELIEF") {
				if (z > 15) {
					this.tileWidth = DEFAULT_TILE_WIDTH * Math.pow(2.0, z - 15);
					this.tileHeight = DEFAULT_TILE_HEIGHT * Math.pow(2.0, z - 15);
				} else {
					this.tileWidth = DEFAULT_TILE_WIDTH;
					this.tileHeight = DEFAULT_TILE_HEIGHT;
				}
			} else {
				this.tileWidth = DEFAULT_TILE_WIDTH;
				this.tileHeight = DEFAULT_TILE_HEIGHT;
			}
//			super.reset();
			super.redraw(fullRedraw);
		}

		/**
		 * タイルを取得します。
		 * @param	bounds   タイル画像範囲
		 * @param	position 表示位置
		 * @return タイル画像
		 */
		override public function addTile(bounds:Bounds, position:Pixel):ImageTile {
		// hamas : 13.08.27 空中写真のズーム対応
//			var width:Number = isNaN(this._tileWidth18) ? this.tileWidth : this._tileWidth18;
//			var height:Number = isNaN(this._tileHeight18) ? this.tileHeight : this._tileHeight18;
			var width:Number = this.tileWidth;
			var height:Number = this.tileHeight;
			return new TISMapTile(this, position, bounds, this.getURL(bounds), this.getErrorURL(bounds), new Size(width, height));
		}

		override public function initGriddedTiles(bounds:Bounds, clearTiles:Boolean = true):void {
//			trace("TISMap::initGriddedTiles  map=" + this.name + "  clearTiles=" + clearTiles + "  tileWidth=" + tileWidth + "  tileHeight=" + tileHeight);
			super.initGriddedTiles(bounds, clearTiles);
			var grid:Vector.<Vector.<ImageTile>> = this.grid;
			for each (var row:Vector.<ImageTile> in grid) {
				for each (var column:ImageTile in row) {
//					trace("        position = " + column.position.x + ", " + column.position.y + "    size = " + column.size.w + ", " + column.size.h);
					column.size.w = this.tileWidth;
					column.size.h = this.tileHeight;
				}
			}
		}
		/**
		 * 表示中の地図のメタデータ取得.
		 * 現在表示している地図のメタデータを返します。
		 * @param	z ズームレベル
		 * @return 現在表示している地図のメタデータ
		 */
		public function getCurrentMetadata(z:int):Object
		{
			if (this.metaData == null) {
				return null;
			}
			var kind:String = null;
			if (this._mapKind.hasOwnProperty(z)) {
				kind = this._mapKind[z];
			} else {
				return null;
			}
			if (kind == "TRANSPARENT") {
				return TRANSPARENT_METADATA;
			} else if (this.metaData.hasOwnProperty(kind)) {
				return this.metaData[kind];
			} else {
				return null;
			}
		}

		/**
		 * 地図切替.
		 * 表示する地図の種類を切り替えます。
		 * @param	json
		 */
		public function setMapKind(json:String):void
		{
			this._mapKind = com.adobe.serialization.json.JSON.decode(json);
			this.redraw(true);
		}

		/**
		 * 現在表示している地図の種類を返します。
		 */
		public function get mapID():String
		{
			return this._mapID;
		}

		/**
		 * 現在表示している地図の種類を設定します。
		 * ただし、このメソッドでは地図の切替は行いません。
		 */
		public function set mapID(value:String):void
		{
			this._mapID = value;
		}

		public function get displayPriority():int
		{
			return this._displayPriority;
		}
		
		public function set displayPriority(value:int):void
		{
			this._displayPriority = value;
		}

		public function getDataID(z:int):String
		{
			if (this.metaData == null) {
				return null;
			}
			if (this._mapKind.hasOwnProperty(z)) {
				return this._mapKind[z];
			} else {
				return null;
			}
		}

		/**
		 * 0埋めされた文字列の生成.
		 * 与えられた数値を、指定の桁数に適合するように先頭を0で埋めて、文字列を生成して返します。
		 * たとえば、zeroPad(123, 5)の結果は"00123"となります。
		 * @param	num     元の数値
		 * @param	digits  生成する文字列の桁数
		 * @return  0埋めされた文字列
		 */
		private function zeroPad(num:int, digits:int):String
		{
			var str:String = num.toString();
			var length:int = str.length;
			for (var i:int = length; i <= digits; i++) {
				str = '0' + str;
			}
			return str;
		}
		
	}

}
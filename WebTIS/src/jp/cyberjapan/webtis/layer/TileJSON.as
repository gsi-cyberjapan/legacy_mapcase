package jp.cyberjapan.webtis.layer 
{
	import flash.events.Event;
	import flash.net.URLLoader;
	import org.openscales.core.basetypes.Resolution;
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.layer.TMS;
	import org.openscales.core.request.XMLRequest;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.proj4as.ProjProjection;
	import flash.system.Security;
	import com.adobe.serialization.json.JSON;
	import org.openscales.core.utils.Trace;
	import org.openscales.core.Map;
	
	/**
	 * ...
	 * @author 
	 */
	public class TileJSON extends TMS 
	{
		protected var _tileDef:Object = null;

		public function get tileDef():Object
		{
			return this._tileDef;
		}

		public function TileJSON(identifier:String, data:Object) 
		{
			super(identifier, null, "json");
			this.projection = ProjProjection.getProjProjection("EPSG:900913");
			this.generateResolutions(19, 156543.03390625);
			this.minResolution = new Resolution(this.resolutions[this.resolutions.length -1], this.projection);
			this.maxResolution = new Resolution(this.resolutions[0], this.projection);
//			this.maxExtent = new Bounds( -180, -90, 180, 90, "ESPG:4326");
			this.maxExtent = new Bounds( -128 * 156543.03390625, -128 * 156543.03390625, 128 * 156543.03390625, 128 * 156543.03390625, this.projection);
			this._tileOrigin = new Location(this.maxExtent.left, this.maxExtent.top, this.projection);
			this.finest = false;
			this._tileDef = data;
			
			// JSONから地図を設定
			if (this._tileDef.hasOwnProperty("name")) {
				this.name = this._tileDef["name"];
			}
			if (this._tileDef.hasOwnProperty("minzoom")) {
				var minZoom:int = parseInt(this._tileDef["minzoom"]);
				this.maxResolution = new Resolution(this.resolutions[minZoom], this.projection);
			}
			if (this._tileDef.hasOwnProperty("maxzoom")) {
				var maxZoom:int = parseInt(this._tileDef["maxzoom"]);
				// maxzoomがうまく読めないので暫定的に0.9を掛けている。
				this.minResolution = new Resolution(this.resolutions[maxZoom] * 0.9 , this.projection);
			}
			if (this._tileDef.hasOwnProperty("bounds") && this._tileDef["bounds"] is Array) {
				var boundArray:Array = this._tileDef["bounds"] as Array;
				if (boundArray.length == 4) {
					this.maxExtent = new Bounds(boundArray[0], boundArray[1], boundArray[2], boundArray[3], "EPSG:4326");
				}
			}
			if (this._tileDef.hasOwnProperty("tiles") && this._tileDef["tiles"] is Array) {
				var tileArray:Array = this._tileDef["tiles"] as Array;
				if (tileArray.length > 0) {
					this.url = tileArray[0];
				}
				if (tileArray.length > 1) {
					this.altUrls = tileArray.slice(1);
				}
			}
		}

		override public function getURL(bounds:Bounds):String
		{
			// URLチェック
			if (this.url == null || this.url.length == 0) {
				return null;
			}

			// xyz計算
			var res:Resolution = this.getSupportedResolution(this.map.resolution.reprojectTo(this.projection));
			var x:Number = Math.round((bounds.left - this.maxExtent.left) / (res.value * this.tileWidth));
			var y:Number = Math.round((this.maxExtent.top - bounds.top) / (res.value * this.tileHeight));
			var z:Number = this.getZoomForResolution(res.value);
			// logger.debug("z : " + z + ", resolution : " + res.value + ", bounds : " + bounds.left + " " + bounds.top + ", extent : " + this.maxExtent.left + " " + this.maxExtent.top);
			var limit:Number = Math.pow(2, z);
			if (y < 0 || y >= limit)
			{
				return null;
			}
			x = ((x % limit) + limit) % limit;

			// URLの選択
			var url:String = this.selectUrl((x + y + z as int).toString(), this.getUrls());
			
			// プレースホルダの置き換え
			url = url.replace(/\${x}/g, (x as int).toString());
			url = url.replace(/\${y}/g, (y as int).toString());
			url = url.replace(/\${z}/g, z.toString());
			
			return url;
		}
		
	}

}
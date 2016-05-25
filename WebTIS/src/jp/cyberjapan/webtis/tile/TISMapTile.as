package jp.cyberjapan.webtis.tile 
{
	import flash.events.IOErrorEvent;
	import jp.cyberjapan.webtis.components.TISMap;
	import org.openscales.core.layer.Layer;
	import org.openscales.core.tile.ImageTile;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.geometry.basetypes.Size;
	import org.openscales.core.utils.Trace;
	
	/**
	 * 電子国土のタイル画像
	 * onTileLoadErrorが発生したときに白タイルを表示するため、ImageTileをオーバーライドした。
	 * @author T. Nakayama
	 */
	public class TISMapTile extends ImageTile 
	{
		/**
		 * 白タイル画像URL
		 */
		private static const WHITE_IMAGE_URL:String = "http://cyberjapandata.gsi.go.jp/sqras/white.png";

		/**
		 * マップなし（青）画像URL ⇒ 電子国土基本図（地図情報）の場合に使用する。
		 */
		private static const NO_MAP_IMAGE_URL:String = "http://cyberjapandata.gsi.go.jp/sqras/no_map.png";

		/**
		 * エラー時の表示タイル画像URL
		 */
		private var _errorTileURL:String;

		/**
		 * コンストラクタ
		 * @param	layer
		 * @param	position
		 * @param	bounds
		 * @param	url
		 * @param	size
		 */
		public function TISMapTile(layer:Layer, position:Pixel, bounds:Bounds, url:String, errorUrl:String, size:Size) 
		{
			this._errorTileURL = errorUrl;
			super(layer, position, bounds, url, size);
			//this._errorTileURL = WHITE_IMAGE_URL;
		}

		override public function draw():Boolean
		{
			this._errorTileURL = (this.layer as TISMap).getErrorURL(this.bounds);
			return super.draw();
		}
		
		/**
		 * タイル画像取得エラー
		 * エラー時には白タイル（基本図の場合には青タイル）画像を描画する。それも取れない場合はエラーとする。
		 * @param	event 通知されたイベント
		 */
		override public function onTileLoadError(event:IOErrorEvent):void {
			if (this.url != this._errorTileURL && this.layer && this.layer.map) {
				Trace.log("ImageTile - onTileLoadError: Error while loading tile " + this.url + " ; draw empty tile with " + this._errorTileURL);
				this.url = this._errorTileURL;
				this.draw();
			} else {
				// Maximum number of tries reached
				Trace.error("ImageTile - onTileLoadError: Error while loading tile " + this.url);
				this.loading = false;
				
			}
		}
	}

}
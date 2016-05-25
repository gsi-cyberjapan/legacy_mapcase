package jp.cyberjapan.webtis.components 
{
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	import jp.cyberjapan.webtis.event.UtmPointLoadEvent;
	import mx.formatters.NumberFormatter;

	/**
	 * UTMポイント取得.
	 * UTMポイントデータを国土地理院のサーバから取得し、また、取得が完了した際にアプリケーションい通知する役割を担います。
	 * この処理はJavaScript APIと連動して動作します。
	 */
	public class UtmPointLoader extends EventDispatcher
	{

		/**
		 * コンストラクタ
		 */
		public function UtmPointLoader()
		{
			if (ExternalInterface.available) {
				ExternalInterface.addCallback("utmPointLoaded", utmPointLoaded);
			}
		}

		/**
		 * UTMポイント取得開始.
		 * 国土地理院のサーバに対して、JavaScript APIを通じて、UTMポイント取得APIにリクエストを送信します。
		 * UTMポイントの取得が完了すると、JavaScript APIを通じて、utmPointLoadedメソッドが呼び出されます。
		 * @param	lat 緯度
		 * @param	lon 経度
		 */
		public function beginLoadUtmPoint(lat:Number, lon:Number):void
		{
			if (ExternalInterface.available) {
				var nf:NumberFormatter = new NumberFormatter();
				nf.precision = 6;
				ExternalInterface.call("webtis.getUtmPoint", nf.format(lat), nf.format(lon));
			}
		}
		
		/**
		 * UTMポイント取得完了.
		 * UTMポイントの取得が完了すると、JavaScript APIを通じて、このメソッドが呼び出されます。
		 * ここでは、UTMポイントの取得が完了したことを示すイベントを発生させ、アプリケーションに通知します。
		 * @param	lat 緯度
		 * @param	lon 経度
		 * @param	name　表示名
		 */
		public function utmPointLoaded(lon:Number, lat:Number, name:String):void
		{
			this.dispatchEvent(new UtmPointLoadEvent(UtmPointLoadEvent.UTMPOINT_LOADED, lon, lat, name));
		}
	}

}

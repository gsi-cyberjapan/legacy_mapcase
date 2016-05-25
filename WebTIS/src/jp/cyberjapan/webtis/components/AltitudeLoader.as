package jp.cyberjapan.webtis.components 
{
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	import jp.cyberjapan.webtis.event.AltitudeLoadEvent;
	import mx.formatters.NumberFormatter;

	/**
	 * 標高取得.
	 * 標高データを国土地理院のサーバから取得し、また、取得が完了した際にアプリケーションい通知する役割を担います。
	 * この処理はJavaScript APIと連動して動作します。
	 * @author T. Nakayama
	 */
	public class AltitudeLoader extends EventDispatcher
	{

		/**
		 * コンストラクタ
		 */
		public function AltitudeLoader()
		{
			if (ExternalInterface.available) {
				ExternalInterface.addCallback("altitudeLoaded", altitudeLoaded);
			}
		}

		/**
		 * 標高取得開始.
		 * 国土地理院のサーバに対して、JavaScript APIを通じて、標高取得APIにリクエストを送信します。
		 * 標高の取得が完了すると、JavaScript APIを通じて、altitudeLoadedメソッドが呼び出されます。
		 * @param	lat 緯度
		 * @param	lon 経度
		 */
		public function beginLoadAltitude(lat:Number, lon:Number):void
		{
			if (ExternalInterface.available) {
				var nf:NumberFormatter = new NumberFormatter();
				nf.precision = 6;
				ExternalInterface.call("webtis.getAltitude", nf.format(lat), nf.format(lon));
			}
		}
		
		/**
		 * 標高取得完了.
		 * 標高の取得が完了すると、JavaScript APIを通じて、このメソッドが呼び出されます。
		 * ここでは、標高の取得が完了したことを示すイベントを発生させ、アプリケーションに通知します。
		 * @param	altitude 取得した標高
		 */
		public function altitudeLoaded(altitude:String):void
		{
			this.dispatchEvent(new AltitudeLoadEvent(AltitudeLoadEvent.ALTITUDE_LOADED, altitude));
		}
	}

}
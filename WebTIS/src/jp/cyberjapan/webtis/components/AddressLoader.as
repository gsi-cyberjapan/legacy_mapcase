package jp.cyberjapan.webtis.components 
{
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	import jp.cyberjapan.webtis.event.AddressLoadEvent;
	import mx.formatters.NumberFormatter;

	/**
	 * 住所取得.
	 * 住所データを国土地理院のサーバから取得し、また、取得が完了した際にアプリケーションい通知する役割を担います。
	 * この処理はJavaScript APIと連動して動作します。
	 * @author T. Nakayama
	 */
	public class AddressLoader extends EventDispatcher
	{

		/**
		 * コンストラクタ
		 */
		public function AddressLoader()
		{
			if (ExternalInterface.available) {
				ExternalInterface.addCallback("addressLoaded", addressLoaded);
			}
		}

		/**
		 * 住所取得開始.
		 * 国土地理院のサーバに対して、JavaScript APIを通じて、住所取得APIにリクエストを送信します。
		 * 住所の取得が完了すると、JavaScript APIを通じて、addressLoadedメソッドが呼び出されます。
		 * @param	lat 緯度
		 * @param	lon 経度
		 */
		public function beginLoadAddress(lat:Number, lon:Number):void
		{
			if (ExternalInterface.available) {
				var nf:NumberFormatter = new NumberFormatter();
				nf.precision = 6;
				ExternalInterface.call("webtis.getAddress", nf.format(lat), nf.format(lon));
			}
		}
		
		/**
		 * 住所取得完了.
		 * 住所の取得が完了すると、JavaScript APIを通じて、このメソッドが呼び出されます。
		 * ここでは、住所の取得が完了したことを示すイベントを発生させ、アプリケーションに通知します。
		 * @param	address 取得した住所
		 */
		public function addressLoaded(address:String):void
		{
			this.dispatchEvent(new AddressLoadEvent(AddressLoadEvent.ADDRESS_LOADED, address));
		}
	}

}
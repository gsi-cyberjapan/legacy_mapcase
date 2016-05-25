package jp.cyberjapan.webtis.components 
{
	import flash.events.*;
	import flash.net.*;
	import jp.cyberjapan.webtis.api.*;
	import jp.cyberjapan.webtis.util.StringUtil;
	import mx.controls.Alert;
	import mx.events.CloseEvent;
	import org.openscales.core.Map;
	
	/**
	 * 作図HTML保存
	 * @author ...
	 */
	public class SaveHTML 
	{
		public static var baseSaveTemplete:String;
		public static var url_loader:URLLoader;

		private var _url:String = null;
		private var _json:String = null;

		public function SaveHTML() 
		{
			// init
		}

		/**
		 * テンプレートファイルを読み込む
		 */
		public static function readSaveTemplete():void
		{
			url_loader = new URLLoader();
			var url : URLRequest = new URLRequest(Constant.getTemplateURL());

			// 読み込み
			url_loader.load(url);
			url_loader.addEventListener(Event.COMPLETE, readTempleteFileComplete);
			//trace("テンプレートファイル読み込み開始");
		}

		/**
		 * HTML保存を実行する
		 * @param	map			MAP
		 * @param	lat			中心緯度
		 * @param	lon			中心経度
		 * @param	zoomLevel	ズームレベル
		 * @param	did			背景地図ID
		 * @return
		 */
		public function save(map:Map, url:String):void
		{
			this._url = url;
			var objAPI:ObjectAPI = new ObjectAPI(map);
			this._json = objAPI.getObjects();
			this._json = this._json.replace(/\\\"/g, "\\\\\"");

			Alert.show("HTMLファイルを作成します。\n作図情報を含め、情報が国土地理院のサーバに転送されることはありません。", "確認", Alert.YES | Alert.NO, map, saveConfirmed);
		}

		private function saveConfirmed(e:CloseEvent):void
		{
			if (e.detail == Alert.YES) {
				try {
					// すでに読み込んでいるテンプレートファイルの一部のデータを置換
					var str:String = baseSaveTemplete;
					// 置換
					str = str.replace("%mapurl%", this._url);
					str = str.replace("%jsondata%", this._json);
					var fr:FileReference = new FileReference();
					var filename:String = "gsi" + StringUtil.getCurrentDateTimeAsString() + ".html";
					fr.save(str, filename);
				} catch (e:Error) {
					Alert.show(e.message, "エラーが発生しました");
				}
			}
		}
		/**
		 * 読み込み終了時イベント
		 * @param	event
		 */
		public static function readTempleteFileComplete (event : Event) : void
		{
			// どうやらここでsave()するとうまくいかないようだ
			// 直接の呼び出しではないからか

			// 読み込み完了
			baseSaveTemplete = url_loader.data;
			//trace("読み込み終了");
		}

	}

}
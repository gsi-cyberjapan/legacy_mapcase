package jp.cyberjapan.webtis.control.exif 
{
	import flash.events.HTTPStatusEvent;
	import flash.events.ProgressEvent;
	import flash.events.SecurityErrorEvent;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.URLRequest;
	import jp.shichiseki.exif.ExifInfo;
	import jp.shichiseki.exif.ExifLoader;
	import mx.controls.Alert;
	import flash.system.Security;

	/**
	 * ...
	 * @author T. Nakayama
	 */
	public class ExifURLLoader 
	{
		private var _exifLoader:ExifLoader = null;
		private var _plotter:ExifDataPlotter = null;
		private var _name:String = null;
		private var _proxy:String = null;
		private var _url:String = null;

		public function ExifURLLoader()
		{
		}

		public function set plotter(value:ExifDataPlotter):void
		{
			this._plotter = value;
		}

		public function set name(value:String):void
		{
			this._name = value;
		}
		
		public function set proxy(value:String):void
		{
			this._proxy = value;
		}

		public function load(url:String):void
		{
			if (Security.sandboxType == Security.REMOTE && this._proxy) {
				url = this._proxy + url;
			}
			_url = url;
			var req:URLRequest = new URLRequest(url);
			_exifLoader = new ExifLoader();
			_exifLoader.addEventListener(Event.COMPLETE, onURLLoadComplete);
			_exifLoader.addEventListener(IOErrorEvent.IO_ERROR, onURLLoadError);
			_exifLoader.addEventListener(ProgressEvent.PROGRESS, onProgress);
			_exifLoader.addEventListener(Event.OPEN, onOpen);
			_exifLoader.addEventListener(HTTPStatusEvent.HTTP_STATUS, onHttpStatus);
			_exifLoader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onSecurityError);
			_exifLoader.load(req);
			
		}

		private function onURLLoadComplete(e:Event):void
		{
//			_datasFile = urlLoader.data as ByteArray;
//			var exif:ExifInfo = new ExifInfo(_datasFile);
			var exif:ExifInfo = this._exifLoader.exif;
			if (this._plotter != null) {
				this._plotter.plot(this._name, _url, exif);
			}
		}

		private function onURLLoadError(e:IOErrorEvent):void
		{
			trace("Error loading url : " + e.text);
			Alert.show("URLの読み込みに失敗しました。");
		}

		private function onProgress(e:ProgressEvent):void
		{
//			Alert.show("読み込み中");
		}
		
		private function onOpen(e:Event):void
		{
//			Alert.show("open");
		}
		private function onHttpStatus(e:HTTPStatusEvent):void
		{
//			Alert.show("httpstatus");
		}
		private function onSecurityError(e:SecurityErrorEvent):void
		{
			trace("SecurityError loading url : " + e.text);
			Alert.show("URLの読み込みに失敗しました。");
		}
	}

}
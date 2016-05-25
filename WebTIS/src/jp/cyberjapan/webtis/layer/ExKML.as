package jp.cyberjapan.webtis.layer 
{
	import flash.system.Security;
	import jp.cyberjapan.webtis.format.ExKMLFormat;
	import org.openscales.core.layer.KML;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.basetypes.Bounds;
	import jp.cyberjapan.webtis.util.StringUtil;

// hamas : 13.10.11 自動再描画
	import org.openscales.core.request.XMLRequest;
	import flash.events.TimerEvent;
	import flash.utils.Timer;

	/**
	 * ...
	 * @author minami.kobayashi
	 */
	public class ExKML extends ExKMLBase 
	{
		protected var _isLibrary:Boolean = false;
		protected var _baseURL:String = null;

	// hamas : 13.10.11 自動再描画
		private var _timer:Timer = null;
		private var _timerOn:Boolean = false;
			
		public function get isLibrary():Boolean
		{
			return this._isLibrary;
		}
		public function set isLibrary(value:Boolean):void
		{
			this._isLibrary = value;
		}
		public function set basePath(value:String):void
		{
			this._kmlFormat.basePath = value;
		}
		
		public function ExKML(identifier:String, useProxy:Boolean, url:String=null, data:XML=null, style:Style=null, bounds:Bounds=null) 
		{
			if (Security.sandboxType == Security.REMOTE && useProxy)
			{
				this.proxy = Constant.getFullProxyURL();
			}
			_baseURL = url;
			url = createNoCacheURL();
			super(identifier, url, data, style, bounds);
			_kmlFormat = new ExKMLFormat();
			if (url != null && url.length > 0) {
				_kmlFormat.basePath = StringUtil.getPathFromURL(url);
			}
			if (Security.sandboxType == Security.REMOTE && useProxy)
			{
				proxy = Constant.getFullProxyURL();
				_kmlFormat.proxy = proxy;
			}
			this.cacheAsBitmap = false;
		}
		
	// hamas : 13.10.11 自動再描画
		/**
		 * URL読み込みの場合、一定間隔で更新
		 * @param	refreshDelay	更新間隔(分) -> ミリ秒に変換すること
		 */
		public function setTimer(refreshDelay:int):void {
			if ( refreshDelay <= 0 ) {
				// 1分～設定する
				return;
			}
			this._timer = new Timer(refreshDelay * 60000, 1);
			this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this.onCompleteTimer,false,0,true);
			this._timer.start();
			this._timerOn = true;
		}
		
	// hamas : 13.10.11 自動再描画
		override public function destroy():void {
			super.destroy();
			if( this._timer ){
				this._timer.removeEventListener(TimerEvent.TIMER_COMPLETE,this.onCompleteTimer);
				this._timer.stop();
			}
		}
		
		public override function redraw(fullRedraw:Boolean = false):void
		{
			super.redraw(fullRedraw);
			this.cacheAsBitmap = false;

		// hamas : 13.10.11 自動再描画	
			if (this.map == null){
				return;
			}			
			//if the user chooses not to display this layer, stop timer to save ressources
			if (!this.displayed) {
				this.clear();
				if (this._timerOn) {
					if( this._timer ) {
						this._timer.removeEventListener(TimerEvent.TIMER_COMPLETE,this.onCompleteTimer);
						this._timer.stop();
						this._timerOn = false;
					}
				}
				return;
			}
			else{
				if (!this._timerOn) {
					if( this._timer ) {
						this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this.onCompleteTimer,false,0,true);
						this._timer.start();	
						this._timerOn = true;
					}
				}		
			}
		}
		
	// hamas : 13.10.11 自動再描画
		private function onCompleteTimer(event:TimerEvent):void {
			if ( this._timer ) {
				this._timer.start();
				var format:ExKMLFormat = new ExKMLFormat();
				format.basePath = this._kmlFormat.basePath;
				format.proxy = this._kmlFormat.proxy;
				this._kmlFormat = format;
				this._request = null;
				this._featureVector = null;
				this.url = createNoCacheURL();
				this.reset();
//				this.redraw(true);
//				this.drawFeatures(true);
			}
		}
		
		private function createNoCacheURL():String
		{
			if (_baseURL == null) {
				return null;
			}
			var datetime:String = StringUtil.getCurrentDateTimeAsString();
			if (_baseURL.indexOf("?") < 0) {
				return _baseURL + "?nocache=" + datetime;
			} else {
				return _baseURL + "&nocache=" + datetime;
			}
		}
	}
}
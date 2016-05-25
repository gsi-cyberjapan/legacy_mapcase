package jp.cyberjapan.webtis.api 
{
	import flash.events.ContextMenuEvent;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.system.Security;
	import org.openscales.core.events.FeatureEvent;
	import org.openscales.core.events.MapEvent;
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.handler.mouse.ClickHandler;
	import org.openscales.core.Map;
	import org.openscales.geometry.basetypes.Pixel;
	import jp.cyberjapan.webtis.event.LayerAddEvent;
	
	/**
	 * イベント関連
	 * @author minami.kobayashi
	 */
	public class EventAPI 
	{
		private var map:Map = null;
		private var _handler:ClickHandler = null;
		
		public function EventAPI(map : Map) 
		{
			this.map = map;
			this.addCallbacks();
		}
		
		public function addCallbacks() : void
		{
			Security.allowDomain( "*" );
			if (ExternalInterface.available)
			{
				ExternalInterface.addCallback("event", event);
				ExternalInterface.addCallback("mousewheelHandler", mousewheelHandler);
			}
		}
		
		/**
		 * typeで指定したイベントの捕捉を開始する。
		 * イベントが発生した場合には、callbackで指定した関数が呼び出される。
		 * @param	type イベントの種類
		 * @param	callback イベント発生時に呼び出す関数名
		 */
		public function event(type : String, callback : String) : void
		{
			var eventInfo : Array = getEventType(type);
			switch(eventInfo[1]) {
				case "map":
					this.map.addEventListener(eventInfo[0], function(event:Event) : void {
						// イベントリスナの登録
						ExternalInterface.call(callback);
					});
					break;
				case "menu":
					this.map.contextMenu.addEventListener(eventInfo[0], function(event:Event) : void {
						// イベントリスナの登録
						ExternalInterface.call(callback);
					});
					break;
				case "handler":
					if (!_handler)
					{
						_handler = new ClickHandler(map, true);
					}
					_handler.doubleClick = function(LastPX:Pixel = null) : void {
						if (map.doubleClickEnabled)
						{
							// イベントリスナの登録
							ExternalInterface.call(callback);
							//Alert.show("call");
						}
					};
					map.doubleClickEnabled = true;
					break;
				case "filelayer":
					this.map.addEventListener(eventInfo[0], function(event:Event) : void {
						// イベントリスナの登録
						ExternalInterface.call(callback, (event as LayerAddEvent).layerName);
					});
					break;
				default:
					break;
			}
					
			//if(eventInfo[1] == "map") {
				//this.map.addEventListener(eventInfo[0], function(event:Event) : void {
					// イベントリスナの登録
					//ExternalInterface.call(callback);
				//});
			//}
			//else if(eventInfo[1] == "menu") {
				//this.map.contextMenu.addEventListener(eventInfo[0], function(event:Event) : void {
					// イベントリスナの登録
					//ExternalInterface.call(callback);
				//});
			//}
			
			//Alert.show(eventInfo[0] + " " + eventInfo[1]);
			//this.map.addEventListener(eventType, function(event:Event) : void {
				// イベントリスナの登録
				//ExternalInterface.call(callback);
			//});
			//Alert.show(eventType);
		}
		
		public function mousewheelHandler(screenX:Number, screenY:Number, delta:Number):void {
			var event:MouseEvent = new MouseEvent(MouseEvent.MOUSE_WHEEL, true, false, screenX, screenY, null, false, false, false, false, int(delta));
//			val > 0 ? flowForward(null) : flowBack(null);
			this.map.dispatchEvent(event);
		}

		/**
		 * 
		 * @param	jstype
		 * @return
		 */
		private function getEventType(jstype : String) : Array
		{
			var type : String;
			var objname : String;
			switch(jstype)
			{
				case "leftdown":
					type = MouseEvent.MOUSE_DOWN;
					objname = "map";
					break;
				case "leftup":
					type = MouseEvent.MOUSE_UP;
					objname = "map";
					break;
				case "rightdown":
					type = ContextMenuEvent.MENU_SELECT;
					objname = "menu";
					break;
				case "rightup":
					type = "rightMouseUp";
					objname = "map";
					break;
				case "dblclick":
					type = MouseEvent.DOUBLE_CLICK;
					objname = "handler";
					break;
				case "dblrightclick":
					type = MouseEvent.MOUSE_DOWN;
					objname = "map";
					break;
				case "mapload":
					type = MapEvent.MAP_LOADED;
					objname = "map";
					break;
				case "mapmove":
					type = MapEvent.CENTER_CHANGED;
					objname = "map";
					break;
				case "zoomchange":
					type = MapEvent.RESOLUTION_CHANGED;
					objname = "map";
					break;
				case "selected":
					type = /*FeatureEvent.FEATURE_SELECTED*/"FEATURE_SELECTED";
					objname = "map";
					break;
				case "unselected":
					type = /*FeatureEvent.FEATURE_UNSELECTED*/"FEATURE_UNSELECTED";
					objname = "map";
					break;
				case "layeradded":
					type = LayerAddEvent.FILE_LAYER_ADDED;
					objname = "filelayer";
					break;
				default:
					type = "";
					objname = "map";
					break;
			}
			return new Array(type, objname);
		}
	}

}
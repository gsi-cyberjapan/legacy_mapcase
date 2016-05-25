package jp.cyberjapan.webtis.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author 
	 */
	public class LayerAddEvent extends Event 
	{

		private var _layername:String = null;
		public static const FILE_LAYER_ADDED:String = "fileLayerAdded";
		
		public function LayerAddEvent(type:String, layername:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{
			super(type, bubbles, cancelable);
			this._layername = layername;
		}
		
		public override function clone():Event 
		{ 
			return new LayerAddEvent(type, this._layername, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("LayerAddEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}

		public function get layerName():String
		{
			return this._layername;
		}
	}

}
package jp.cyberjapan.webtis.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author T. Nakayama
	 */
	public class MapChangeEvent extends Event 
	{
		private var _dataId:String = null;

		public function MapChangeEvent(type:String, dataId:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			this._dataId = dataId;
			
		} 
		
		public override function clone():Event 
		{ 
			return new MapChangeEvent(type, this._dataId, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("MapChangeEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}

		public function get dataId():String
		{
			return this._dataId;
		}
	}
	
}
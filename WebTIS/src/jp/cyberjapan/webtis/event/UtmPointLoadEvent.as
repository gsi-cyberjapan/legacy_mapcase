package jp.cyberjapan.webtis.event 
{
	import flash.events.Event;
	
	public class UtmPointLoadEvent extends Event 
	{
		private var _lon:Number = NaN;
		private var _lat:Number = NaN;
		private var _name:String = null;

		public static const UTMPOINT_LOADED:String = "utmPointLoaded";

		public function UtmPointLoadEvent(type:String, lon:Number, lat:Number, name:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			this._lon = lon;
			this._lat = lat;
			this._name = name;
		} 
		
		public override function clone():Event 
		{ 
			return new UtmPointLoadEvent(type, this._lon, this._lat, this._name, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("UtmPointLoadEvent", "lon", "lat", "name", "bubbles", "cancelable", "eventPhase"); 
		}

		public function get lon():Number
		{
			return this._lon;
		}
		public function get lat():Number
		{
			return this._lat;
		}
		public function get name():String
		{
			return this._name;
		}
	}
	
}
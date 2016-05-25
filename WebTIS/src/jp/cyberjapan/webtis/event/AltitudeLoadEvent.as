package jp.cyberjapan.webtis.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author T. Nakayama
	 */
	public class AltitudeLoadEvent extends Event 
	{
		private var _altitude:String = null;

		public static const ALTITUDE_LOADED:String = "altitudeLoaded";

		public function AltitudeLoadEvent(type:String, altitude:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			this._altitude = altitude;
			
		} 
		
		public override function clone():Event 
		{ 
			return new AltitudeLoadEvent(type, this._altitude, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("AltitudeLoadEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}

		public function get altitude():String
		{
			return this._altitude;
		}
	}
	
}
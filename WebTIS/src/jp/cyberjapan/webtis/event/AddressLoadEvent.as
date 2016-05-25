package jp.cyberjapan.webtis.event 
{
	import flash.events.Event;
	
	public class AddressLoadEvent extends Event 
	{
		private var _address:String = null;

		public static const ADDRESS_LOADED:String = "addressLoaded";

		public function AddressLoadEvent(type:String, address:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			this._address = address;
			
		} 
		
		public override function clone():Event 
		{ 
			return new AddressLoadEvent(type, this._address, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("AddressLoadEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}

		public function get address():String
		{
			return this._address;
		}
	}
	
}
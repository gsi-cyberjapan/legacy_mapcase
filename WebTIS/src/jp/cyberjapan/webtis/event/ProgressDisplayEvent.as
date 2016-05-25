package jp.cyberjapan.webtis.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author 
	 */
	public class ProgressDisplayEvent extends Event 
	{
		
		public static const PROGRESS_CANCELLED:String = "progressCancelled";

		public function ProgressDisplayEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{
			super(type, bubbles, cancelable);
			
		}
		
		public override function toString():String 
		{ 
			return formatToString("ProgressCancelEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}
	}

}
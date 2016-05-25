package jp.cyberjapan.webtis.util 
{
	/**
	 * ...
	 * @author 
	 */
	public class PopUpLock 
	{
		private static var _lock:Boolean = false;

		public static function isLock():Boolean
		{
			return _lock;
		}

		public static function lock():void
		{
			_lock = true;
		}
		
		public static function unlock():void
		{
			_lock = false;
		}
	}

}
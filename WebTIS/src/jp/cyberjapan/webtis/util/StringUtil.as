package jp.cyberjapan.webtis.util 
{
	import mx.formatters.DateFormatter;
	/**
	 * ...
	 * @author T.Nakayama
	 */
	public class StringUtil 
	{
		public static function getCurrentDateTimeAsString():String
		{
			var df:DateFormatter = new DateFormatter();
			df.formatString = "YYYYMMDDJJNNSS";
			return df.format(new Date());
			
		}
		
		public static function getFileNameFromURL(url:String):String
		{
			var index:int = url.lastIndexOf("/");
			if (index < 0) {
				return url;
			} else if (index == url.length - 1) {
				return "";
			} else {
				return url.substring(index+1);
			}
		}
		
		public static function getPathFromURL(url:String):String
		{
			var index:int = url.lastIndexOf("/");
			if (index < 0) {
				return "";
			} else {
				return url.substring(0, index);
			}
		}
	}
}
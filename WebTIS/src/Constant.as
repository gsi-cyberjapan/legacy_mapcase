package  
{
	import mx.core.FlexGlobals;
	import mx.utils.URLUtil;

	/**
	 * ...
	 * @author minami.kobayashi
	 */
	public class Constant 
	{
		/**
		 * プロキシのURL
		 */
		//public static const PROXY:String = "proxy.php?url="

		/**
		 * アプリケーションのURL
		 */
		public static var THIS_URL:String = FlexGlobals.topLevelApplication.url;

		/**
		 * 作図レイヤー名
		 */
		public static const DRAWING_LAYER_NAME:String = "作図情報";

		/**
		 * プロキシURLのフルパス取得
		 * @return
		 */
		public static function getFullProxyURL():String
		{
			var path:String = THIS_URL.substring(0, THIS_URL.lastIndexOf("/"));
			return path + "/" + "proxy.php?url=";
		}
		
		public static function getSaveURL():String
		{
			var path:String = THIS_URL.substring(0, THIS_URL.lastIndexOf("/"));
			return path + "/" + "index.html";
		}

		public static function getTemplateURL():String
		{
			var path:String = THIS_URL.substring(0, THIS_URL.lastIndexOf("/"));
			return path + "/ifrtemplate.html";
		}
	}

}
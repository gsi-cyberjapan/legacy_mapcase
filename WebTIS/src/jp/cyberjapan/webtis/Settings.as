package jp.cyberjapan.webtis 
{
	import flash.events.MouseEvent;
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.events.MapEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.layer.Layer;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import mx.controls.Alert;
	/**
	 * ...
	 * @author 
	 */
	public class Settings 
	{
		/**
		 * アイコンの横にラベルを表示するかどうか
		 */
		private static var _drawsLabel:Boolean = false;
		
		/**
		 * ポップアップの下部に編集用アイコンを表示するかどうか
		 */
		private static var _showsEditIconsOnPopup:Boolean = false;

		private static var _map:Map = null;

		public static function set map(value:Map):void
		{
			Settings.map = value;
		}

		public static function get drawsLabel():Boolean
		{
			return Settings._drawsLabel;
		}
		
		public static function set drawsLabel(value:Boolean):void
		{
			Settings._drawsLabel = value;
		}
		
		public static function get showsEditIconsOnPopup():Boolean
		{
			return Settings._showsEditIconsOnPopup;
		}
		
		public static function set showsEditIconsOnPopup(value:Boolean):void
		{
			Settings._showsEditIconsOnPopup = value;
		}
	}

}
package jp.cyberjapan.webtis.control.exif 
{
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import jp.cyberjapan.webtis.control.exif.ImportExifWindow;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import org.openscales.core.Map;

	/**
	 * ...
	 * @author T. Nakayama
	 */
	public class ImportExifPopupController 
	{
		private var _map:Map;
		private var _parent:DisplayObject;
		private var _importExif:ImportExifWindow = new ImportExifWindow();
		private var _plotter:ExifDataPlotter;

		public function get map():Map
		{
			return this._map;
		}
		public function get parent():DisplayObject
		{
			return this._parent;
		}
		public function set parent(parent:DisplayObject):void
		{
			this._parent = parent;
		}
		public function ImportExifPopupController(map:Map)
		{
			this._map = map;
			this._plotter = new ExifDataPlotter(map);
		}
		public function get plotter():ExifDataPlotter
		{
			return this._plotter;
		}
		public function readExif():void
		{
			this._importExif = new jp.cyberjapan.webtis.control.exif.ImportExifWindow();
			this._importExif.x = this.map.width / 2 - this._importExif.width / 2;
			this._importExif.y = this.map.height / 2 - this._importExif.height / 2;
			this._importExif.map = this.map;
			this._importExif.controller = this;
			this._importExif.addEventListener(FlexEvent.CREATION_COMPLETE, onExifPopupCreationComplete);
			PopUpManager.addPopUp(this._importExif, this._parent, true);
		}
		private function onExifPopupCreationComplete(event:Event):void
		{
			this._importExif.closeButton.addEventListener(MouseEvent.CLICK, onCloseExif);
			this._importExif.inputName.setFocus();
		}

		private function onCloseExif(event:Event):void
		{
			closePopup();
		}

		public function closePopup():void
		{
			PopUpManager.removePopUp(this._importExif);
//			this._importExif = null;
		}
	}

}
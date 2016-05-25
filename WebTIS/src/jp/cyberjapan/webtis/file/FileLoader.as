package jp.cyberjapan.webtis.file 
{
	import flash.events.Event;
	import jp.cyberjapan.webtis.components.TISMap;
	import jp.cyberjapan.webtis.file.FileLoadForm;
	import spark.components.TitleWindow;
	import mx.managers.PopUpManager;
	import flash.events.MouseEvent;
	import mx.events.FlexEvent;
	import org.openscales.core.i18n.Catalog;
	import org.openscales.core.Map;
	import mx.controls.Alert;
	import jp.cyberjapan.webtis.util.PopUpLock;

	/**
	 * ...
	 * @author 
	 */
	public class FileLoader 
	{
		private static var _instance:FileLoader = new FileLoader();
		
		private var _window:TitleWindow = null;
		private var _form:FileLoadForm = null;
		private var _map:Map = null;
		private var _baseMap:TISMap = null;
		
		public static function getInstance():FileLoader
		{
			return _instance;
		}

		/**
		 * The layer linked to the import button
		 */
		public function get map():Map
		{
			return this._map;
		}
			
		/**
		 *
		 */
		public function set map(value:Map):void
		{
			this._map = value;
		}

		/**
		 * The layer linked to the import button
		 */
		public function get baseMap():TISMap
		{
			return this._baseMap;
		}
			
		/**
		 *
		 */
		public function set baseMap(value:TISMap):void
		{
			this._baseMap = value;
		}

		public function loadFile():void
		{
			if (PopUpLock.isLock()) {
				return;
			}

			// ダイアログを作成
			this._window = new TitleWindow();
			this._window.title = Catalog.getLocalizationForKey('drawing.import');
			this._window.addEventListener(FlexEvent.CREATION_COMPLETE, this.onPopUpCreationComplete);
			
			populateWindow();
				
			// place at the center
			this._window.x = (this.map.width / 2) - (this._form.width / 2);
			this._window.y = (this.map.height / 2) - (this._form.height / 2);
				
			// Use the PopUpManager to display the TitleWindow container.
			PopUpLock.lock();
			PopUpManager.addPopUp(this._window, this.map, true);
		}
		
		/**
		 * Close the PopUp window
		 */
		public function closePopUp(event:MouseEvent = null):void
		{
			// close the pop up file
			PopUpManager.removePopUp(this._window);
			this._window = null;
			PopUpLock.unlock();
		}

		private function onPopUpCreationComplete(e:Event):void
		{
			this._window.closeButton.addEventListener(MouseEvent.CLICK, this.closePopUp);
//			this._form.inputName.setFocus();
		}
			
		/**
		 * Function that fill the popUp
		 */
		private function populateWindow():void 
		{	
			this._form = new FileLoadForm();
			this._form.loader = this;
			this._window.addElement(this._form); 
		}

	}

}
package jp.cyberjapan.webtis.file 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.net.FileReference;
	import flash.xml.XMLDocument;
	import jp.cyberjapan.webtis.format.ExKMLFormat;
	import jp.cyberjapan.webtis.layer.ExifLayer;
	import org.openscales.core.layer.Layer;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import mx.controls.Alert;
	import jp.cyberjapan.webtis.api.MapAPI;
	import jp.cyberjapan.webtis.file.KMLFileSaveForm;
	import spark.components.TitleWindow;
	import mx.events.FlexEvent;
	import org.openscales.core.i18n.Catalog;
	import mx.managers.PopUpManager;
	import flash.events.IOErrorEvent;
	import jp.cyberjapan.webtis.util.PopUpLock;
	import jp.cyberjapan.webtis.util.StringUtil;

	/**
	 * ...
	 * @author 
	 */
	public class KMLFileExporter 
	{
		
		private var _window:TitleWindow = null;
		private var _form:KMLFileSaveForm = null;
		private var _map:Map = null;
		private var _layerNames:* = null;
		private static const DEFAULT_FILE_NAME:String = "export.kml";

		/**
		 * The layer linked to the import button
		 */
		public function get map():Map
		{
			return this._map;
		}
			
		/**
		 * @private
		 */
		public function set map(value:Map):void
		{
			this._map = value;
			/*
			if(this._map)
			{
				this._map.addEventListener(I18NEvent.LOCALE_CHANGED, this.onMapLanguageChange);
			}
			*/
		}

		public function get layerNames():*
		{
			return this._layerNames;
		}

		public function exportFile(layerNames:*):void
		{
			if (PopUpLock.isLock()) {
				return;
			}

			this._layerNames = layerNames;

			// ダイアログを作成
			this._window = new TitleWindow();
			this._window.title = Catalog.getLocalizationForKey('drawing.export');
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
			PopUpLock.unlock();
			this._window = null;
		}

		private function onPopUpCreationComplete(e:Event):void
		{
			this._window.closeButton.addEventListener(MouseEvent.CLICK, this.closePopUp);
			// this._form.inputName.setFocus();
		}
			
		/**
		 * Function that fill the popUp
		 */
		private function populateWindow():void 
		{	
			this._form = new KMLFileSaveForm();
			this._form.exporter = this;
			this._window.addElement(this._form); 
		}

		/**
		 * 指定したレイヤー名に一致するレイヤーのオブジェクト情報をKMLファイルに出力する
		 * @param	layername	identifier
		 */
		public function exportLayer(map:Map, layername:String) : void
		{
			//logger.debug("exportKML: " + layername);
			var layer:Layer = map.getLayerByIdentifier(layername);
			if (!layer)
			{
				Alert.show("レイヤー " + layername + " は存在しません。");
				return;
			}
			if(layer is VectorLayer)
			{
				if ((layer as VectorLayer).features.length > 0) {
					var docname:String = layer.displayedName;
					if (layer.displayedName == Constant.DRAWING_LAYER_NAME) {
						docname = "gsi" + StringUtil.getCurrentDateTimeAsString() + ".kml";
					} else {
						// レイヤー名が".kml"で終わっていなければ、末尾に".kml"を付ける
						var extIndex:int = docname.lastIndexOf(".kml");
						if (extIndex < 0 || extIndex != docname.length - 4) {
							docname = docname + ".kml";
						}
					}
					var format: ExKMLFormat = new ExKMLFormat(docname);
					(layer as VectorLayer).saveFormatExport(format, docname, MapAPI.DISPLAY_PROJECTION);
				} else {
					Alert.show("保存する作図情報がありません。");
				}
			} else {
				Alert.show("レイヤー " + layername + " は作図レイヤーではありません。");
			}
			//logger.debug("exportKML: export comp.");
		}
		
		/**
		 * すべてのレイヤーのオブジェクト情報をKMLファイルで一括保存する
		 * @param	filename	ファイル名(.kml拡張子不要)
		 */
		public function exportLayers(map:Map, layernames:Array, filename:String=null) : void
		{
			if (!filename)
			{
//				filename = DEFAULT_FILE_NAME;
				filename = "gsi" + StringUtil.getCurrentDateTimeAsString() + ".kml";
			}
			else
			{
				filename += ".kml";
			}
			var kmlFormat:ExKMLFormat = new ExKMLFormat(filename);
			var exData:Object = kmlFormat.writeEmptyKmlFile(filename);

			// 一時保存用
			var styleNodes:XML = <styles></styles>;
			var folderNodes:XML = <folders></folders>;
			
			// 全レイヤーのXMLデータを取得
			for each (var layername:String in layernames)
			{
				var layer:Layer = map.getLayerByIdentifier(layername);
				if (layer)
				{
					// 非表示レイヤーは出力しない
					if (!layer.visible) continue;
					
					var kmlns:Namespace;
					if (layer is VectorLayer && !(layer is ExifLayer))
					{
						if ((layer as VectorLayer).features.length == 0) {
							// featureがなければ出力しない
							continue;
						}
						//var kmldata:Object = (layer as VectorLayer).getFormatExport(kmlFormat, MapAPI.DISPLAY_PROJECTION);
						var kmldoc:XMLDocument = (layer as VectorLayer).getFormatExport(kmlFormat, MapAPI.DISPLAY_PROJECTION) as XMLDocument;
						var kmldata:XML = new XML(kmldoc.toString());
						kmlns = kmldata.namespace("");
						// <Style>ノードのみ抜き出す
						styleNodes.appendChild(kmldata..kmlns::Style);
						// <Foler>ノードのみ抜き出す
						folderNodes.appendChild(kmldata..kmlns::Folder);
					}
				}
			}

			kmlns = exData.namespace("");
			// <Style>ノードをまとめて追加
			exData.kmlns::Document[0].appendChild(styleNodes.children());
			if (styleNodes.children().length() == 0) {
				Alert.show("保存する作図情報がありません。");
				return;
			}

			// <Foler>ノードをまとめて追加
			exData.kmlns::Document[0].appendChild(folderNodes.children());
			if (folderNodes.children().length() == 0) {
				Alert.show("保存する作図情報がありません。");
				return;
			}
			
			// XML宣言を先頭に挿入
			var result:XMLDocument = new XMLDocument((exData as XML).toXMLString());
			result.xmlDecl = ExKMLFormat.XML_DECLARATION;
			
			//create the FileReference instance
			var fileReference:FileReference = new FileReference();
			fileReference.addEventListener(Event.COMPLETE, onSaveComplete);
			fileReference.addEventListener(Event.CANCEL,onCancel);
			fileReference.addEventListener(IOErrorEvent.IO_ERROR, onSaveError);
			
			// ファイルとして保存
			fileReference.save(result, filename);
		}

		/**
		 * Called when the user cancel the browse process
		 */
		public function onCancel(e:Event):void				
		{
		}
			
		/**
		 * private
		 * called when the file has completed loading
		 */
		private function onSaveComplete(e:Event):void
		{
			//clean up the FileReference instance
		}
			
		//called if an error occurs while loading the file contents
		private function onSaveError(e:IOErrorEvent):void
		{
			trace("Error saving file : " + e.text);
			Alert.show("ファイルを保存できませんでした : " + e.text);
		}
			
	}

}
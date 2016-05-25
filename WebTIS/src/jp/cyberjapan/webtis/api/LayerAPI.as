package jp.cyberjapan.webtis.api 
{
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.external.ExternalInterface;
	import flash.net.FileFilter;
	import flash.net.FileReference;
	import flash.net.FileReferenceList;
	import flash.system.Security;
	import flash.utils.ByteArray;
	import flash.xml.XMLDocument;
	import jp.cyberjapan.webtis.components.TISMap;
	import jp.cyberjapan.webtis.control.drawing.ExImportFeatureForm;
	import jp.cyberjapan.webtis.control.exif.ExifDataPlotter;
	import jp.cyberjapan.webtis.control.exif.ExifURLLoader;
	import jp.cyberjapan.webtis.file.KMLFileExporter;
	import jp.cyberjapan.webtis.format.ExKMLFormat;
	import jp.cyberjapan.webtis.layer.ExifLayer;
	import jp.cyberjapan.webtis.layer.ExKML;
	import jp.cyberjapan.webtis.layer.ExKMLBase;
	import jp.cyberjapan.webtis.layer.ExKMLForUtmGrid;
	import jp.cyberjapan.webtis.layer.GeoJSON;
	import jp.cyberjapan.webtis.layer.TileJSON;
	import jp.cyberjapan.webtis.style.marker.ExCustomMarker;
	import jp.cyberjapan.webtis.style.symbolizer.ExTextSymbolizer;
	import jp.cyberjapan.webtis.util.LoadingPicture;
	import mx.containers.TitleWindow;
	import mx.controls.Alert;
	import mx.styles.StyleManager;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.Marker;
	import org.openscales.core.style.halo.Halo;
	import org.openscales.core.style.marker.WellKnownMarker;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.basetypes.Bounds;

// hamas : 13.08.12 UTMポイント表示
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.font.Font;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.core.style.symbolizer.TextSymbolizer;
	import org.openscales.core.style.marker.CustomMarker;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.feature.LabelFeature;
// hamas : 13.08.14 磁北線表示
	import org.openscales.core.style.stroke.Stroke;
	import org.openscales.core.style.symbolizer.LineSymbolizer;
	import org.openscales.geometry.LineString;
	import org.openscales.core.feature.LineStringFeature;

// hamas : 13.09.04 画像表示
	import org.openscales.core.layer.ImageLayer;

//	import org.openscales.core.layer.KML;
	import org.openscales.core.layer.Layer;
	import org.openscales.core.layer.ogc.WMS;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import org.openscales.core.i18n.Catalog;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager
	import jp.cyberjapan.webtis.file.FileLoader;
	import org.openscales.geometry.Point;
	import org.openscales.proj4as.ProjProjection;
	import jp.cyberjapan.webtis.Settings;
	
	/**
	 * レイヤー操作関連
	 * @author minami.kobayashi
	 */
	public class LayerAPI 
	{
		private var map:Map = null;
		private var _baseMap:TISMap = null;
		
		private var _fileReference:FileReference;
		private static const DEFAULT_FILE_NAME:String = "export.kml";
		
		private var _fileReferenceList:FileReferenceList;
		
		private var _kmlList:Vector.<Layer> = null;
		private var _kmlLoading:LoadingPicture = null;
		
		public function LayerAPI(map : Map, baseMap : TISMap) 
		{
			this.map = map;
			this._baseMap = baseMap;
			//this.addCallbacks();
			
			_kmlList = new Vector.<Layer>();
		}		

		public function addCallbacks() : void
		{
			Security.allowDomain( "*" );
			if (ExternalInterface.available)
			{
				ExternalInterface.addCallback("clearMap", clearMap);
				ExternalInterface.addCallback("layerExists", layerExists);
				ExternalInterface.addCallback("displayLayer", displayLayer);
				ExternalInterface.addCallback("focusLayer", focusLayer);
				ExternalInterface.addCallback("clearLayer", clearLayer);
				ExternalInterface.addCallback("loadExif", loadExif);
				ExternalInterface.addCallback("loadKML", loadKML);
				ExternalInterface.addCallback("loadKMLFromString", loadKMLFromString);
				ExternalInterface.addCallback("loadGeoJSON", loadGeoJSON);
				ExternalInterface.addCallback("addWMSLayer", addWMSLayer);
				ExternalInterface.addCallback("getLayerOpacity", getLayerOpacity);
				ExternalInterface.addCallback("setLayerOpacity", setLayerOpacity);
				ExternalInterface.addCallback("openKMLFiles", openKMLFiles);
				ExternalInterface.addCallback("exportKML", exportKML);
				ExternalInterface.addCallback("addSearchResult", addSearchResult);
				ExternalInterface.addCallback("addTileJSONLayer", addTileJSONLayer);
				ExternalInterface.addCallback("clearSearchResult", clearSearchResult);
				ExternalInterface.addCallback("setLayerAsLibrary", setLayerAsLibrary);
				ExternalInterface.addCallback("showLabel", showLabel);
				ExternalInterface.addCallback("addImageLayer", addImageLayer);
				
				ExternalInterface.addCallback("showUtmGrid", showUtmGrid);
			}
		}
		
		/**
		 * 背景地図を含むすべてのレイヤーを削除する
		 * 結果、コントロールを除いて何も表示されないこととなる
		 */
		public function clearMap() : void
		{
			this.map.removeAllLayers();
		}
		
		/**
		 * 指定したレイヤーが存在するかどうかを返す
		 * @param	layername レイヤー名
		 * @return  そのレイヤーが存在すればtrue、存在しなければfalse
		 */
		public function layerExists(layername:String) : Boolean
		{
			var exists:Boolean = null != getLayerByDisplayName(layername);
			return exists;
		}

		/**
		 * 指定したレイヤーの表示・非表示を切り替え、現在の表示状態を返す
		 * @param	layername	レイヤー名（完全一致）
		 * @param	onoff		1:表示、0:非表示
		 * @return	[onoff]を指定した場合は、その[onoff]の値をそのまま返す。[onoff]を省略した場合は、次のいずれかを返す。
		 *          0…レイヤーが非表示状態, 1…レイヤーが表示状態
		 *          ただし、指定のレイヤーが存在しない場合は、[onoff]の指定および値に関わらず-1を返す。
		 */
		public function displayLayer(layername : String, onoff : Number = -1) : Number
		{
			var result : Number = -1;
//			var layer : Layer = this.map.getLayerByIdentifier(layername);
			var tmplayer : Layer = getLayerByDisplayName(layername);
			if (tmplayer == null) {
				return -1;
			}
			if(onoff != -1)
			{
				tmplayer.visible = Boolean(onoff);
				result = onoff;
			} else {
				result = tmplayer.visible ? 1 : 0;
			}
			if (tmplayer.visible)
			{
				tmplayer.redraw(true);
			}
			return result;
		}
			
		/**
		 * 指定したレイヤーを最前面に表示する
		 * @param	layername
		 */
		public function focusLayer(layername : String) : void
		{
//			var layer : Layer = this.map.getLayerByIdentifier(layername);
			var layer : Layer = getLayerByDisplayName(layername);
			if (layer != null)
			{
				this.map.changeLayerIndex(layer, this.map.layers.length-1);
			}				
		}
		
		/**
		 * 指定したレイヤーを削除する
		 * @param	layername
		 */
		public function clearLayer(layername : String) : void
		{
//			var layer : Layer = this.map.getLayerByIdentifier(layername);
			var layer : Layer = getLayerByDisplayName(layername);
			if (layer != null)
			{
				this.map.removeLayer(layer);
			}				
		}
		
		/**
		 * KMLファイルを解析してマップ上にオブジェクトを追加する
		 * @param	dataFile
		 */
		public function addKML(dataFile:ByteArray):void
		{
			default xml namespace = new Namespace("http://www.opengis.net/kml/2.2");
			var baseXml:XML = new XML(dataFile.readUTFBytes(dataFile.bytesAvailable));
			//var kmlns:Namespace = baseXml.namespace("");
			var folders:XMLList = baseXml..Folder;
			trace(folders.length());
			if (folders.length() > 1)
			{
				// Folder数分のKMLレイヤーを作成
				for each(var folder:XML in folders)
				{
					// 空のKMLデータにStyle全部とFolderタグ追加
					var format:ExKMLFormat = new ExKMLFormat();
					var newXml:XML = format.writeEmptyKmlFile(folder.name) as XML;
					newXml.Document.appendChild(baseXml..Style);
					newXml.Document.appendChild(folder);
					//var newXml:XML = baseXml.copy();
					//var newDoc:XML = newXml.kmlns::Document.replace("Folder", folder);
					//newXml = newXml.setChildren(newDoc);
					// displayedName対策
					//newXml.kmlns::Document.name = folder.name;
					var kml:ExKMLBase = new ExKML(folder.name, true, null, newXml);
					_kmlList.push(kml);	// add
				}
			}
			else
			{
				// displayedName対策
				trace("doc\n" + baseXml.Document);
				trace("doc_fl_name\n" + baseXml.Document.Folder.name);
				var layername:String = baseXml.Document.Folder.name;
				baseXml.Document.name = layername;
				var nkml:ExKMLBase = new ExKML(layername, true, null, baseXml);
				_kmlList.push(nkml);	// add
			}
		}
		
		/**
		 * KMLファイル読み込み（複数ファイル可）
		 */
		public function openKMLFiles():void
		{
			var loader:FileLoader = FileLoader.getInstance();
			loader.map = this.map;
			loader.baseMap = this._baseMap;
			loader.loadFile();
		}
		
		/**
		 * Called when a file is selected on 
		 * KMLファイル読み込みで、ファイルが選択された場合
		 */
		public function onFileSelect(e:Event):void
		{
			// 先頭要素のファイルを処理する
			// 複数ファイルが指定されている場合、処理中のファイルの読み込みが完了してから次のファイルを処理する
			
			// ローディング画面を開始
			if (_kmlLoading == null) {
				//ローディング画像オブジェクト生成
				// 半径, バーの数, バーの太さ, バーの長さ
				_kmlLoading = new LoadingPicture(30, 15, 4, 8);
				//ローディング画像表示
				_kmlLoading.show(this.map, this.map.width/2, this.map.height/2);
				//ローディング画像の回転開始
				_kmlLoading.start(8);
			}
			
			trace("選択ファイル数 : " + _fileReferenceList.fileList.length);
			
			//listen for when the file has loaded
			_fileReference = FileReference(_fileReferenceList.fileList[0]);
			
			_fileReference.addEventListener(Event.COMPLETE, onLoadComplete);
			_fileReference.addEventListener(IOErrorEvent.IO_ERROR, onLoadError);
			
			//　選択したファイルのロード
			_fileReference.load();
		}
		
		/**
		 * private
		 * called when the file has completed loading
		 * KMLファイル読み込みで、ファイル読み込みが完了された場合
		 */
		private function onLoadComplete(e:Event):void
		{
			//get the data from the file as a ByteArray
			var datasFile:ByteArray = _fileReference.data;
			
			addKML(datasFile);
			
			//clean up the FileReference instance
			_fileReference.removeEventListener(Event.COMPLETE, onLoadComplete);
			_fileReference.removeEventListener(IOErrorEvent.IO_ERROR, onLoadError);
			_fileReference = null;
			
			_fileReferenceList.fileList.splice(0, 1);
			trace("残りファイル数 : " + _fileReferenceList.fileList.length);
			if (_fileReferenceList.fileList.length > 0) {
				// ファイルが残っている場合
				trace("ファイルが残っているので読み込み処理を継続");
				onFileSelect(new Event("select_"));	// 自作イベント
			}
			else {
				//　終了
				trace("ファイルが残っていないので読み込み処理を完了");
				_fileReferenceList = null;
				
				// ファイルから読み込んだデータを一括で追加
				this.map.addLayers(_kmlList);
				
				// ローディング画面を終了
				if (_kmlLoading != null) {
					_kmlLoading.stop();
					_kmlLoading.remove();
					_kmlLoading = null;
				}
				
				// リスト要素を全削除
				_kmlList.splice(0, _kmlList.length);
			}
		}
		
		//called if an error occurs while loading the file contents
		private function onLoadError(e:IOErrorEvent):void
		{
			trace("Error loading file : " + e.text);
			//Alert.show("Error loading file : " + e.text);
			
			if (_fileReference != null) {
				_fileReference = null;
			}
			if (_fileReferenceList != null) {
				_fileReferenceList = null;
			}
			if (_kmlLoading != null) {
				_kmlLoading.stop();
				_kmlLoading.remove();
				_kmlLoading = null;
			}
		}

		/**
		 * 指定したレイヤー名に一致するレイヤーのオブジェクト情報をKMLファイルに出力する
		 * @param	layername	identifier
		 */
		public function exportKML(layernames:*) : void
		{
			var exporter:KMLFileExporter = new KMLFileExporter();
			exporter.map = this.map;
			exporter.exportFile(layernames);
		}
		
		/**
		 * すべてのレイヤーのオブジェクト情報をKMLファイルで一括保存する
		 * @param	filename	ファイル名(.kml拡張子不要)
		 */
		public function exportAllLayers(filename:String=null) : void
		{
			if (!filename)
			{
				filename = DEFAULT_FILE_NAME;
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
			for each (var layer: Layer in this.map.layers)
			{
				// base地図は飛ばす
				if (layer.identifier == MapAPI.BASE_MAP_IDENTIFIER)	continue;
				// 非表示レイヤーは出力しない
				if (!layer.visible) continue;
				//
				var kmlns:Namespace;
				if (layer is VectorLayer && !(layer is ExifLayer))
				{
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
			// <Style>ノードをまとめて追加
			exData.Document.appendChild(styleNodes.children());
			// <Foler>ノードをまとめて追加
			exData.Document.appendChild(folderNodes.children());
			
			// XML宣言を先頭に挿入
			var result:XMLDocument = new XMLDocument((exData as XML).toXMLString());
			result.xmlDecl = ExKMLFormat.XML_DECLARATION;
			
			//create the FileReference instance
			_fileReference = new FileReference();
			_fileReference.addEventListener(Event.COMPLETE, onFileSave);
			_fileReference.addEventListener(Event.CANCEL,onCancel);
			_fileReference.addEventListener(IOErrorEvent.IO_ERROR, onSaveError);
			
			// ファイルとして保存
			_fileReference.save(result, filename);
		}

		/**
		 * called once the fihg sle has been saved
		 */
		private function onFileSave(e:Event):void
		{
			//logger.info("Complete Saving File");
		}
		
		/**
		 * called if the user cancels out of the file save dialog
		 */
		private function onCancel(e:Event):void
		{
			//logger.info("Cancel Saving File");
		}
		
		/**
		 * called if an error occurs while saving the file
		 */
		private function onSaveError(e:IOErrorEvent):void
		{
			//logger.info("Error Saving File : " + e.text);
		}

		/**
		 * EXIFデータを読み込む
		 * @param	layername	レイヤー名
		 * @param	url			Exif画像ファイルのURL
		 * @param	useProxy	Exif画像取得時にプロキシを使用するならtrue、プロキシを使用しないならfalse
		 */
		public function loadExif(name : String, url : String, useProxy : Boolean = true) : void
		{
			var loader:ExifURLLoader = new ExifURLLoader();
			loader.plotter = new ExifDataPlotter(this.map);
			loader.name = name;
			if (Security.sandboxType == Security.REMOTE && useProxy && "file" != url.substring(0, 4)) {
				loader.proxy = Constant.getFullProxyURL();
			}
			loader.load(url);
		}

		/**
		 * KMLデータを読んで地物情報からレイヤーを作成し、地図に追加する。
		 * @param	name		レイヤー名
		 * @param	url			KMLファイルのURL
		 * @param	useProxy	KMLファイル取得時にプロキシを使用するならtrue、プロキシを使用しないならfalse
		 */
		public function loadKML(name:String, url:String, useProxy : Boolean = true) : void
		{
			var isUtmGrid:Boolean = name == "utmGrid";
			
			var layer:Layer
				= isUtmGrid ? new ExKMLForUtmGrid(name, useProxy, url) : new ExKML(name, useProxy, url);
			if (Security.sandboxType == Security.REMOTE && useProxy && "file" != url.substring(0, 4)) {
				layer.proxy = Constant.getFullProxyURL();
			}
			this.map.addLayer(layer);
			layer.redraw(true);
		}

		/**
		 * KMLデータを読んで地物情報からレイヤーを作成し、地図に追加する。
		 * @param	name		レイヤー名
		 * @param	data		KMLデータ
		 * @param	useProxy	KMLファイル取得時にプロキシを使用するならtrue、プロキシを使用しないならfalse
		 */
		public function loadKMLFromString(name:String, data:String, basePath:String, useProxy:Boolean = false) : void
		{
			var layer:ExKML = new ExKML(name, useProxy, null, new XML(data), null, null);
			if (Security.sandboxType == Security.REMOTE && useProxy) {
				layer.proxy = Constant.getFullProxyURL();
			}
			layer.basePath = basePath;
			this.map.addLayer(layer);
			layer.redraw(true);
		}

		public function setLayerAsLibrary(name:String):void
		{
			var layer : Layer = getLayerByDisplayName(name);
			if (layer != null)
			{
				if (layer is ExKML) {
					(layer as ExKML).isLibrary = true;
				}
			}
		}

		/**
		 * WMSレイヤーを追加する
		 * @param	name
		 * @param	version
		 * @param	url
		 * @param	layers
		 * @param	format
		 */
		public function addWMSLayer(name:String, version:String, url:String, layers:String, style:String, format:String, projection:String):void
		{
			var layer:WMS = new WMS(name, url, layers, style, format);
			layer.version = version;
			if (projection != null && projection != "") {
				layer.projection = projection;
			}
			if (Security.sandboxType == Security.REMOTE) {
				layer.proxy = Constant.getFullProxyURL();
			}
			this.map.addLayer(layer);
		}

		/**
		 * GeoJSONデータを読んで地物情報からレイヤーを作成し、地図に追加する。
		 * @param	name レイヤー名
		 * @param	url GeoJSONファイルのURL
		 * @param	useProxy GeoJSONファイルの取得時にプロキシを使用する必要があればtrue、プロキシを使わなければfalse
		 */
		public function loadGeoJSON(name:String, url:String, useProxy : Boolean = true) : void
		{
			var layer:GeoJSON = new GeoJSON(name, useProxy);
			layer.url = url;
			if (Security.sandboxType == Security.REMOTE && useProxy && "file" != url.substring(0, 4)) {
				layer.proxy = Constant.getFullProxyURL();
			}
			this.map.addLayer(layer);
			layer.redraw(true);
		}

		/**
		 * 指定したレイヤーの不透過度を返す。
		 * 値は0.0～1.0の範囲とし、0.0は完全に透明、1.0は完全に不透明となる。
		 * @param	layername レイヤー名
		 * @return  不透過度の値（指定したレイヤーが存在しない場合は、負の値を返す）
		 */
		public function getLayerOpacity(layername:String):Number
		{
			var layer : Layer = getLayerByDisplayName(layername);
			if (layer != null)
			{
				return layer.alpha;
			} else {
				return -1.0;
			}
		}

		/**
		 * 指定したレイヤーの不透過度を設定する。
		 * 値は0.0～1.0の範囲とし、0.0は完全に透明、1.0は完全に不透明となる。
		 * これを超える範囲が指定された場合は何もしない。
		 * @param	layername レイヤー名
		 * @param	transparency 設定する不透過度の値
		 */
		public function setLayerOpacity(layername:String, opacity:Number):void
		{
			if (opacity < 0.0 || opacity > 1.0) {
				return;
			}

			var layer : Layer = getLayerByDisplayName(layername);
			if (layer != null)
			{
				layer.alpha = opacity;
			}
		}

		/**
		 * 地名検索等の検索結果を地図上にマーカー表示する。
		 * マーカーは検索結果表示用の固定のレイヤーに設置される。
		 * @param	lon マーカーの経度
		 * @param	lat マーカーの緯度
		 * @param	deletePrevious 以前のマーカーをすべて消去する場合はtrue、以前のマーカーを残す場合はfalse
		 */
		public function addSearchResult(lon:Number, lat:Number, deletePrevious:Boolean = true):void
		{
			var layer:Layer = getLayerByDisplayName("search");
			if (layer == null) {
				layer = new VectorLayer("search");
				this.map.addLayer(layer);
			} else if (!(layer is VectorLayer)) {
				return;
			}
			if (deletePrevious) {
				clearSearchResult();
			}
			var marker:Marker = new Marker(new Point(lon, lat, new ProjProjection("EPSG:4326")));
			// marker.attributes["name"] = name;
			// marker.attributes["description"] = description;
			marker.selectable = false;
			marker.mouseEnabled = false;
			(layer as VectorLayer).addFeature(marker);
		}

		/**
		 * 地名検索等の検索結果をすべて消去する。
		 */
		public function clearSearchResult():void
		{
			var layer:Layer = getLayerByDisplayName("search");
			if (layer == null || !(layer is VectorLayer)) {
				return;
			}
			for each (var feature:Feature in (layer as VectorLayer).features)
			{
				(layer as VectorLayer).removeFeature(feature);
			}
		}

		/**
		 * TileJSONの定義情報からタイル地図レイヤーを作成し、地図に追加する。
		 * @param	name レイヤー名
		 * @param	data レイヤー定義情報（TileJSON形式）
		 * @param	useProxy タイル画像の取得時にプロキシを使用する必要があればtrue、プロキシを使わなければfalse
		 */
		public function addTileJSONLayer(name:String, data:Object, useProxy:Boolean = true) : void
		{
			var layer:TileJSON = new TileJSON(name, data);
			if (Security.sandboxType == Security.REMOTE && useProxy) {
				layer.proxy = Constant.getFullProxyURL();
			}
			this.map.addLayer(layer);
			layer.redraw(true);
		}
		
	// hamas : 13.09.04 画像表示
		/**
		 * 地図上の指定の位置に指定の画像を貼り付ける。
		 * @param	swLon 南西端の座標(経度)
		 * @param	swLat 南西端の座標(緯度)
		 * @param	neLon 北東端の座標(経度)
		 * @param	neLat 北東端の座標(緯度)
		 * @param	url	画像URL
		 * @param	useProxy 画像の取得時にプロキシを使用する必要があればtrue、プロキシを使わなければfalse
		 */
		public function addImageLayer( name:String, swLon:Number, swLat:Number, neLon:Number, neLat:Number, url:String, useProxy:Boolean = true):void
		{
			var layer:ImageLayer = new ImageLayer(
				name,
				url,
				new Bounds(swLon, swLat, neLon, neLat, new ProjProjection("EPSG:4326"))
			);
			layer.projection = this.map.projection;
			layer.maxResolution = this.map.maxResolution;
			layer.minResolution = this.map.minResolution;
			if (Security.sandboxType == Security.REMOTE && useProxy) {
				layer.proxy = Constant.getFullProxyURL();
			}
			this.map.addLayer(layer);
//			layer.redraw(true);
		}
		
	// hamas : 13.08.12 UTMポイント表示
		/**
		 * 地図上にUTMポイントを表示する。
		 * マーカーは固定のレイヤーに設置される。
		 * @param	px マーカーの経度
		 * @param	py マーカーの緯度
		 * @param	name マーカーの属性
		 */
		public function addUtmPoint(px:Number, py:Number, name:String):void
		{
			var layer:VectorLayer = getLayerByDisplayName("utmPoint")　as VectorLayer;
			if (layer == null) {
				layer = new VectorLayer("utmPoint");
				layer.projection = new ProjProjection("EPSG:4326");
				layer.style = Style.getDefaultPointStyle();			
				this.map.addLayer(layer);
			} else if (!(layer is VectorLayer)) {
				return;
			}
			
			var loc:Location = new Location(px, py);

			// 外観の設定
			var styleMarker:Style = new Style();
			styleMarker.name = "UtmPoint_Marker_Style";
			var ruleMarker:Rule = new Rule();
			// スタイル設定
			{
				var scale:Number = 1;	// default
				var heading:Number = 0;	// default

				var wMarker:WellKnownMarker = new WellKnownMarker("circle");
				wMarker.fill.color = 0xFF0000;
				wMarker.stroke.color = 0xFF0000;
				wMarker.size = 12;
				ruleMarker.symbolizers.push(new PointSymbolizer(wMarker));
			}
			styleMarker.rules.push(ruleMarker);
			
			// マーカー
			var marker:PointFeature = PointFeature.createPointFeature(loc, null, styleMarker);
			marker.mouseEnabled = false;
			layer.addFeature(marker);

			// 外観の設定
			var styleLabel:Style = new Style();
			styleLabel.name = "UtmPoint_Label_Style";
			var ruleLabel:Rule = new Rule();
			// スタイル設定
			{
				var size:Number = 20;			// default = 10;
				var color:Number = 0xFF0000;	// default = 0;
				var opacity:Number = 1;			// default
				var family:String = null;		// default
				var style:String = null;		// default
				var weight:String = Font.BOLD;	// default = null;
				var font:Font = new Font();
				font.size = size;
				font.color = color;
				font.opacity = opacity;
				font.family = family;
				font.style = style;
				font.weight = weight;
//				ruleLabel.symbolizers.push(new TextSymbolizer(null, font));
				var symbolizer:ExTextSymbolizer = new ExTextSymbolizer(null, font);
				symbolizer.showsAlways = true;
				symbolizer.offsetX = 10;
//				symbolizer.halo = new Halo();
//				symbolizer.halo.color = 0xFFFFFF;
//				symbolizer.halo.opacity = 1;
				ruleLabel.symbolizers.push(symbolizer);
			}
			styleLabel.rules.push(ruleLabel);
			
			// テキスト
			var label:LabelFeature = LabelFeature.createLabelFeature(loc);
			label.mouseEnabled = false;
			label.text = name;
			label.layer = layer;
			label.style = styleLabel;
			layer.addFeature(label);
		}

		/**
		 * UTMポイントをすべて消去する。
		 */
		public function clearUtmPoint():void
		{
			var layer:Layer = getLayerByDisplayName("utmPoint");
			if (layer == null || !(layer is VectorLayer)) {
				return;
			}
			for each (var feature:Feature in (layer as VectorLayer).features)
			{
				(layer as VectorLayer).removeFeature(feature);
			}
			// レイヤを削除する
			this.map.removeLayer(layer);
		}
		
	// hamas : 13.08.23　UTMグリッドの表示
		public function showUtmGrid(visible: Boolean, zoomLv:Number = -1, rect:Array = null):void
		{
			var name:String = "utmGrid";
			
			if ( visible ) {
				var urlstr:String = "../mapuse4/grid/";
				//var urlstr:String = "http://portal.cyberjapan.jp/site/mapuse4/grid/";
				if( zoomLv <= 12 ){
					urlstr += "10k_grid.php?rectLonLat="+rect;
				} else {
					urlstr += "1k_grid.php?rectLonLat="+rect;
				}				
				this.loadKML(name, urlstr, true);
			} else {
				var layer:Layer = this.map.getLayerByIdentifier(name)
				if (layer != null) {
					// レイヤを削除する
					this.map.removeLayer(layer);
				}
			}
		}
		
	// hamas : 13.08.14 磁北線の表示
		/**
		 * 地図上に磁北線を表示する。
		 * @param	px 経度
		 * @param	py 緯度
		 */
		public function mnLineDraw(px:Number, py:Number):void
		{
			// 磁北線レイヤを取得
			var mnLineLayer:Layer = getLayerByDisplayName("mnLine");
			if (mnLineLayer == null || !(mnLineLayer is VectorLayer)) {
				// initMapで追加されているハズなので作成はしない
				return;
			}
			
/*			// m単位を経緯度単位に変換
			var lonlat2 = new OpenLayers.LonLat(lon,lat).transform(projection900913, projection4326);
			var px = lonlat2.lon;
			var py = lonlat2.lat;
			//経緯度座標(10進数)を小数点以下6桁に丸める
			px = px * 1000000;
			px = parseInt(px);
			px = px / 1000000;
			py = py * 1000000;
			py = parseInt(py);
			py = py / 1000000;
*/
			//経緯度は小数点以下6桁に丸める
			py = py * 1000000;
			py = Math.round(py) / 1000000;
			px = px * 1000000;
			px = Math.round(px) / 1000000;
			
			//円周率
//			var pi = Math.PI;
		 
			//西偏角計算
			var KEE:Number = px-138;
			var KNN:Number = py-37;
			var KKK:Number = (7+40.644/60)+(18.976/60)*KNN-(6.224/60)*KEE+(0.003/60)*KNN*KNN+(0.024/60)*KNN*KEE-(0.586/60)*KEE*KEE;		//20110928	2010年の値に変更
			KKK = Math.round(KKK * 100 + 0.5) / 100;			
			var KKK_NUM:Number = Math.round(KKK*10 + 0.5) / 10;		//テキストの文字列で使用する
			
			//緯度：経度の比率（距離）
			//度からラジアンに
			KKK = KKK*Math.PI/180;
			var HHH:Number = Math.sin(KKK)/Math.cos(KKK);
			
			//1kmあたりの度単位
			var EEE_D:Number = 6378.137*Math.PI*Math.cos(py*Math.PI/180);
			EEE_D = 180/EEE_D;
			var NNN_D:Number = 180/6378.137/Math.PI;
		 
			//上下3kmあたりの磁北線範囲
			var LLL:Number = 3;
			var H1:Number = px-LLL*HHH*EEE_D;
			var H2:Number = px+LLL*HHH*EEE_D;
			var V1:Number = py+LLL*NNN_D;
			var V2:Number = py-LLL*NNN_D;
			//ここまでは計算

			// 外観の設定
			var styleLine:Style = new Style();
			styleLine.name = "MnLine_Line_Style";
			var ruleLine:Rule = new Rule();
			// スタイル設定
			{
				var color:Number = 0xFF0000;	// default = 0;
				var width:Number = 3;			// default
				var opacity:Number = 0.8;		// default = 1;
				var linecap:String = Stroke.LINECAP_ROUND;		// default
				var linejoin:String = Stroke.LINEJOIN_ROUND;	// default
				var pWhiteSize:uint = 0;		// default
				var pDottedSize:uint = 0;		// default
				var stroke:Stroke = new Stroke(color, width, opacity, linecap, linejoin, pWhiteSize, pDottedSize);	
				ruleLine.symbolizers.push(new LineSymbolizer(stroke));
			}
			styleLine.rules.push(ruleLine);
			
			// line
			var points:Vector.<Number> = new Vector.<Number>();
			points.push(H1,V1, H2,V2);
			var line:LineString = new LineString(points);
			var lineFeature:LineStringFeature = new LineStringFeature(line, null, styleLine);
			(mnLineLayer as VectorLayer).addFeature(lineFeature);
			
			// label
			var labelFeature:LabelFeature = LabelFeature.createLabelFeature(new Location(px,py));
			labelFeature.text = String(KKK_NUM) + "度";
//			labelFeature.style = Style.getDefaultLabelStyle();
			// 外観の設定
			var styleLabel:Style = new Style();
			labelFeature.style = styleLabel;
			styleLabel.name = "UtmPoint_Label_Style";
			var ruleLabel:Rule = new Rule();
			// スタイル設定
			{
				var size:Number = 20;			// default = 10;
				var labelColor:Number = 0xFF0000;	// default = 0;
				var labelOpacity:Number = 1;			// default
				var family:String = null;		// default
				var style:String = null;		// default
				var weight:String = Font.BOLD;	// default = null;
				var font:Font = new Font();
				font.size = size;
				font.color = labelColor;
				font.opacity = labelOpacity;
				font.family = family;
				font.style = style;
				font.weight = weight;
//				ruleLabel.symbolizers.push(new TextSymbolizer(null, font));
				var symbolizer:ExTextSymbolizer = new ExTextSymbolizer(null, font);
//				symbolizer.halo = new Halo();
//				symbolizer.halo.color = 0xFFFFFF;
//				symbolizer.halo.opacity = 1;
				symbolizer.offsetX = 10;
				symbolizer.showsAlways = true;
				ruleLabel.symbolizers.push(symbolizer);
			}
			styleLabel.rules.push(ruleLabel);
			
			(mnLineLayer as VectorLayer).addFeature(labelFeature);
		}
		 
		/* 磁北線の削除 */
		public function clearMnLine():void
		{
			var layer:Layer = getLayerByDisplayName("mnLine");
			if (layer == null || !(layer is VectorLayer)) {
				return;
			}
			for each (var feature:Feature in (layer as VectorLayer).features)
			{
				(layer as VectorLayer).removeFeature(feature);
			}
			// レイヤは削除しない
		}
		
		public function showLabel(value:Boolean):void
		{
			Settings.drawsLabel = value;
			// 再描画
			for(var cnt:int = 0; cnt < this.map.layers.length; cnt++){
				this.map.layers[cnt].redraw(true);
			}
		}

		private function getLayerByDisplayName(layername:String):Layer
		{
			var layer:Layer = null;
			for each (layer in this.map.layers) {
				if (layer.displayedName == layername) {
					return layer;
				}
			}
			return null;
		}
	}
}
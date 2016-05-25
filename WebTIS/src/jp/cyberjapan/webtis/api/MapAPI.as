package jp.cyberjapan.webtis.api 
{
	import com.adobe.serialization.json.JSON;
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.net.*;
	import flash.system.Security;
	import flash.ui.ContextMenu;
	import jp.cyberjapan.webtis.api.ObjectAPI;
	import jp.cyberjapan.webtis.components.*;
	import jp.cyberjapan.webtis.control.CenterMark;
	import jp.cyberjapan.webtis.control.exif.ExifFeature;
	import jp.cyberjapan.webtis.control.exif.ExifPopupRenderer;
	import jp.cyberjapan.webtis.control.ExScaleLine;
	import jp.cyberjapan.webtis.control.map.MapKind;
	import jp.cyberjapan.webtis.layer.ExKML;
	import jp.cyberjapan.webtis.popup.renderer.ExFxPopupRenderer;
	import jp.cyberjapan.webtis.layer.ExGraticule;		// hamas : 13.07.25 経緯度線表示
	import mx.containers.TitleWindow;
	import mx.controls.Text;
	import mx.events.CloseEvent;
	import mx.managers.PopUpManager;
	import org.openscales.core.basetypes.Resolution;
	import org.openscales.core.events.DrawingEvent;
	import org.openscales.core.events.FeatureEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.handler.mouse.ClickHandler;
	import org.openscales.core.layer.Layer;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import org.openscales.fx.control.*;
	import spark.components.VGroup;
// hamas : 13.07.30	import org.openscales.fx.control.ScaleLine;
	import org.openscales.fx.FxMap;
	import org.openscales.fx.handler.mouse.FxClickHandler;
	import org.openscales.fx.popup.FxPopup;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.geometry.basetypes.Unit;
	import org.openscales.geometry.Geometry;
	import org.openscales.proj4as.ProjProjection;
	import org.openscales.core.events.MapEvent;
	import spark.components.TextArea;
	import mx.controls.Alert;
	import jp.cyberjapan.webtis.control.ExFxOverviewMapRatio;
	import jp.cyberjapan.webtis.Settings;
	import jp.cyberjapan.webtis.control.map.MapChanger;
	import jp.cyberjapan.webtis.util.PopUpLock;
	//import mx.controls.TextArea;

// hamas : 13.08.01 右クリックメニュー追加
	import flash.events.ContextMenuEvent;

	/**
	 * 座標・縮尺操作関連API
	 * @author T. Nakayama
	 */
	public class MapAPI
	{
		public static var BASE_MAP_IDENTIFIER:String = "base";
		public static var BASE_MAP2_IDENTIFIER:String = "base2";
		public static var DISPLAY_PROJECTION:ProjProjection = ProjProjection.getProjProjection("EPSG:4326");

		private var _map:Map = null;
		private var _fxmap : FxMap = null;
//		private var baseMap:Mapnik = new Mapnik(BASE_MAP_IDENTIFIER);
		private var _baseMap:TISMap = null;

//　座標・標高表示用
// hamas : 13.07.30	ScaleLine->ExScaleLine
		private var _sLine:ExScaleLine = null;
		
		private var _overview:ExFxOverviewMapRatio = null;
		private var _termOfService:Text = null;
		private var _centerMark:jp.cyberjapan.webtis.control.CenterMark = null;
		private var _clickHandler:FxClickHandler = null;

// hamas : 13.07.25 経緯度線表示
		public static var GRATICULE_IDENTIFIER:String = "graticule";
		private var _graticule:ExGraticule = null;
		
		private var _fxpopup:FxPopup = null;
		private var _fxpopupRenderer:ExFxPopupRenderer;
		private var _popupEnabled:Boolean;					// ポップアップ表示ON/OFF
		private var _featureClickAdded:Boolean = false;		// 内部使用
		
		private var _printer:MapPrinter = new MapPrinter();
		
// hamas : 13.10.28 ロゴ表示切替
		private var _originatorLogo:DataOriginatorsDisplay = null;
		
		// オブジェクト選択/選択解除イベント用 現在選択中のオブジェクト
		private var _selectedFeature:Feature = null;
		
		// 選択オブジェクト取得・オブジェクト範囲取得
		private var _objAPI:ObjectAPI = null;
		//private var _drawContainer:Sprite = new Sprite();
		
		// 右クリックメニュー
		private var _menu:ContextMenu = null;
		
		// 地図切替ウィンドウ
		private var _mapChanger:MapChanger = null;
		
	// hamas : 13.07.30	ScaleLine->ExScaleLine
		public function MapAPI(map:Map, baseMap:TISMap, fxmap:FxMap, menu:ContextMenu, sLine:ExScaleLine = null) 
		{
			this._map = map;
			this._baseMap = baseMap;
			this._fxmap = fxmap;
			this._fxpopupRenderer = new ExFxPopupRenderer();
		//  hamas : 13.09.09 オブジェクト編集呼出
			this._fxpopupRenderer.setMap(map, fxmap);
			
			this.addCallbacks();

		// hamas : 13.08.01 右クリックメニュー追加
			this._menu = menu;

			// 作図HTML保存のためにテンプレートを読み込んでおく
			SaveHTML.readSaveTemplete();
			
			// 印刷
			this._printer.map = this._map;
			
			// 選択オブジェクト取得・オブジェクト範囲取得
			this._objAPI = new ObjectAPI(this._map);
			//this._map.addChild(_drawContainer);
			
			// イベント登録
			this._map.addEventListener(DrawingEvent.CHANGE_ACTIVE_HANDLER, onChangeActiveHandler);
			this._map.addEventListener(DrawingEvent.DRAW_HANDLER_DESACTIVATED, onFuncHandlerDesactivated);
			this._map.addEventListener(DrawingEvent.EDIT_HANDLER_DESACTIVATED, onFuncHandlerDesactivated);
			this._map.addEventListener(DrawingEvent.MOVE_HANDLER_DESACTIVATED, onFuncHandlerDesactivated);
			this._map.addEventListener(DrawingEvent.DELETE_HANDLER_DESACTIVATED, onFuncHandlerDesactivated);
			this._map.addEventListener(DrawingEvent.SELECT_HANDLER_DESACTIVATED, onFuncHandlerDesactivated);
		}
		
	// hamas : 13.07.30	ScaleLine->ExScaleLine
		public function get scaleLine() : ExScaleLine
		{
			return this._sLine;
		}
	// hamas : 13.07.30	ScaleLine->ExScaleLine
		public function set scaleLine(sLine : ExScaleLine) : void
		{
			this._sLine = sLine;
		}

		public function get overview() : ExFxOverviewMapRatio
		{
			return this._overview;
		}
		
		public function set overview(ov: ExFxOverviewMapRatio):void
		{
			this._overview = ov;
		}

		public function get termOfService() : Text
		{
			return this._termOfService;
		}

		public function set termOfService(tos : Text):void
		{
			this._termOfService = tos;
		}

		public function get centerMark() : CenterMark
		{
			return this._centerMark;
		}

		public function set centerMark (mark : CenterMark):void
		{
			this._centerMark = mark;
		}
		
		public function set clickHandler(handler : FxClickHandler):void
		{
			this._clickHandler = handler;
			setDoubleClickZoomIn();
		}

		// hamas : 13.10.28 ロゴ表示切替
		public function get originatorLogo() : DataOriginatorsDisplay
		{
			return this._originatorLogo;
		}
		public function set originatorLogo (originator : DataOriginatorsDisplay):void
		{
			this._originatorLogo = originator;
		}
		
		public function get mapChanger():MapChanger
		{
			return this._mapChanger;
		}
		public function set mapChanger(mapchanger:MapChanger):void
		{
			this._mapChanger = mapchanger;
		}
		
		public function addCallbacks() : void
		{
			Security.allowDomain( "*" );
			if (ExternalInterface.available)
			{
				ExternalInterface.addCallback("openMap", openMap);
				ExternalInterface.addCallback("createScaleBar", createScaleBar);
				ExternalInterface.addCallback("createOverviewMap", createOverviewMap);
				ExternalInterface.addCallback("showPopup", showPopup);
				ExternalInterface.addCallback("getCenter", getCenter);
				ExternalInterface.addCallback("getCx", getCx);
				ExternalInterface.addCallback("getCy", getCy);
				ExternalInterface.addCallback("getRect", getRect);
				ExternalInterface.addCallback("getLeft", getLeft);
				ExternalInterface.addCallback("getBottom", getBottom);
				ExternalInterface.addCallback("getRight", getRight);
				ExternalInterface.addCallback("getTop", getTop);
				ExternalInterface.addCallback("getZoomLevel", getZoomLevel);
				ExternalInterface.addCallback("getMapScale", getMapScale);
				ExternalInterface.addCallback("setMapScale", setMapScale);
				ExternalInterface.addCallback("setMapCenter", setMapCenter);
				ExternalInterface.addCallback("setMapRect", setMapRect);
				ExternalInterface.addCallback("setMetadata", setMetadata);
				ExternalInterface.addCallback("getMapID", getMapID);
				ExternalInterface.addCallback("setMapKind", setMapKind);
				ExternalInterface.addCallback("changeMap", changeMap);
				ExternalInterface.addCallback("showCenterMark", showCenterMark);
				ExternalInterface.addCallback("setZoomLevel", setZoomLevel);
				//ExternalInterface.addCallback("getCurrentMetadata", getCurrentMetadata);
				ExternalInterface.addCallback("getCurrentMetadataObject", getCurrentMetadataObject);
				ExternalInterface.addCallback("getResolution", getResolution);
				ExternalInterface.addCallback("getFxmapWidth", getFxmapWidth);
				ExternalInterface.addCallback("setObjInfoPopup", setObjInfoPopup);
				ExternalInterface.addCallback("addMapLayer", addMapLayer);
				ExternalInterface.addCallback("getSelectedObject", getSelectedObject);
				ExternalInterface.addCallback("getObjectsInRect", getObjectsInRect);
				ExternalInterface.addCallback("showPopupMessage", showPopupMessage);
				ExternalInterface.addCallback("showEditIconsInPopup", showEditIconsInPopup);

			// hamas : 13.07.25 経緯度線表示			
				ExternalInterface.addCallback("createGraticule", createGraticule);
				ExternalInterface.addCallback("setGraticuleInterval", setGraticuleInterval);
				
			// hamas : 13.10.28 ロゴ表示切替
				ExternalInterface.addCallback("showOriginator", showOriginator);

				ExternalInterface.addCallback("saveAsHTML", saveAsHTML);
			}
		}
		
		/**
		 * 現在の座標・縮尺設定に従って地図を表示する。
		 */
		public function openMap():void
		{
			if (this._map.getLayerByIdentifier(BASE_MAP_IDENTIFIER) == null) {
				this._map.addLayer(this._baseMap);
			} else {
				this._baseMap.redraw();
			}
		}
		
	// hamas : 13.10.28 ロゴ表示切替	
		/**
		 * ロゴの表示・非表示を切り替える。
		 * @param	visible 表示・非表示設定
		 */
		public function showOriginator(visible:Boolean):void {
			if (this._originatorLogo != null) {
				this._originatorLogo.visible = visible;
			}
		}
		
	// hamas : 13.07.25 地図上に経緯度線レイヤを追加する
		public function createGraticule():void
		{
			if (this._map.getLayerByIdentifier(GRATICULE_IDENTIFIER) == null)
			{
				var gr:ExGraticule = new ExGraticule(GRATICULE_IDENTIFIER, null);
				gr.map = this._map;
				gr.mouseChildren = false;
				
				this._graticule = gr;
				this._map.addLayer(this._graticule);
			} else {
				this._graticule.redraw(true);
			}
		}
		
	// hamas : 13.08.14　経緯度線の設定
		public function setGraticuleInterval(value:Number, minZoomLevel:int):void
		{
			this._graticule.interval_custom = value;
			this._graticule.maxDisplayResolution = new Resolution(this._baseMap.resolutions[minZoomLevel], this._baseMap.projection);
			this._graticule.visible = (value > 0);
			this._graticule.redraw(true);
		}
		
		/**
		 * 地図上にスケールバーを表示する。
		 */
		public function createScaleBar(visible: Boolean = true):void
		{
			if (this._map.hasControl(this._sLine))
			{
				this._sLine.visible = visible;
			}
			else
			{
				var sl:ExScaleLine = new ExScaleLine();
				sl.map = this._map;
				sl.x = this._map.x + 15;
				sl.y = this._map.height - 30;
				sl.scaleBottomValue.visible = false;
				sl.scaleBottomWidth.visible = false;

				this._map.addControl(this._sLine);
				this._sLine = sl;
			}
		}
		
		/**
		 * 広域表示コントロールの表示/非表示を切り替える
		 * @param	state
		 */
		public function createOverviewMap(visible : Boolean) : void
		{
			if (this._overview != null) {
				this._overview.visible = visible;
			}
		}
		
		/**
		 * 中心座標を取得する
		 */
		public function getCenter() : Array
		{
			var center : Location = this._map.center.reprojectTo(DISPLAY_PROJECTION);
			return new Array(center.lon, center.lat);
		}

		/**
		 * 中心座標の経度を取得する
		 */ 
		public function getCx() : Number
		{
			return this._map.center.reprojectTo(DISPLAY_PROJECTION).lon;
		}

		/**
		 * 中心座標の緯度を取得する
		 */ 
		public function getCy() : Number
		{
			return this._map.center.reprojectTo(DISPLAY_PROJECTION).lat;
		}
		
		/**
		 * 表示範囲を取得する
		 */
		public function getRect() : Array
		{
			var rect : Bounds = this._map.extent.reprojectTo(DISPLAY_PROJECTION);
			return new Array(rect.left, rect.bottom, rect.right, rect.top);
		}

		/**
		 * 表示範囲の西端の経度を取得する
		 */
		public function getLeft() : Number
		{
			return this._map.extent.reprojectTo(DISPLAY_PROJECTION).left;
		}

		/**
		 * 表示範囲の南端の緯度を取得する
		 */
		public function getBottom() : Number
		{
			return this._map.extent.reprojectTo(DISPLAY_PROJECTION).bottom;
		}

		/**
		 * 表示範囲の東端の経度を取得する
		 */
		public function getRight() : Number
		{
			return this._map.extent.reprojectTo(DISPLAY_PROJECTION).right;
		}

		/**
		 * 表示範囲の北端の緯度を取得する
		 */
		public function getTop() : Number
		{
			return this._map.extent.reprojectTo(DISPLAY_PROJECTION).top;
		}
		
		/**
		 * ズームレベルを取得する
		 * @return	0～18の整数　0...小縮尺, 18...大縮尺
		 */
		public function getZoomLevel() : Number
		{
//			return this._baseMap.getZoomForResolution(this._map.resolution.value);
			return this._baseMap.getZoomForResolution(this._baseMap.getSupportedResolution(this._map.resolution).value);
		}

		/**
		 * 地図の縮尺を取得する
		 */
		public function getMapScale() : Number
		{
			var res: Number = this._map.resolution.reprojectTo(DISPLAY_PROJECTION).value;
			return Unit.getScaleDenominatorFromResolution(res);
		}

		public function getResolution() : Number
		{
			return this._map.resolution.value;
		}

		/**
		 * 地図の縮尺を設定する
		 * @param	scale	縮尺
		 */
		public function setMapScale(scale : Number) : void
		{
			// 分母をresolutionに変換
			var resScale : Number = Unit.getResolutionFromScaleDenominator(scale);
			this._map.resolution = new Resolution(resScale);
		}

		/**
		 * 地図の中心座標および縮尺を設定する
		 * @param	x		中心のx座標
		 * @param	y		中心のy座標
		 * @param	zoomlevel	縮尺
		 */
		public function setMapCenter(x : Number, y : Number, zoomlevel : Number = -1) : void
		{
			this._map.center = new Location(x, y).reprojectTo(this._map.projection);
			if (zoomlevel >= 0)
			{
				setZoomLevel(zoomlevel);
			}
		}

		/**
		 * 地図の表示範囲を南西端、北東端の緯度経度で設定する
		 * 縮尺はこれらの経緯度で構成される矩形を含むもっとも大きな縮尺に設定される
		 * 中心座標はこれらの経緯度で構成される矩形の中心座標に設定される
		 * @param	left		西端経度
		 * @param	bottom		南端緯度
		 * @param	right		東端経度
		 * @param	top			北端緯度
		 */
		public function setMapRect(left : Number, bottom : Number, right : Number, top : Number) : void
		{
			var newBounds:Bounds = this._map.maxExtent.getIntersection(new Bounds(left, bottom, right, top).reprojectTo(this._map.projection));

			if( newBounds )
			{
				this._map.dispatchEvent(new MapEvent(MapEvent.MOVE_START, this._map));
				if(newBounds.projection != this._map.projection)
				newBounds = newBounds.reprojectTo(this._map.projection);

				var x:Number = (newBounds.left + newBounds.right)/2;
				var y:Number = (newBounds.top + newBounds.bottom)/2;
				this._map.center = new Location(x, y, this._map.projection);

				var resolutionX:Number = (newBounds.right - newBounds.left) / this._map.size.w;
				var resolutionY:Number = (newBounds.top - newBounds.bottom) / this._map.size.h;

				// choose max resolution to be sure that all the extent is include in the current map
				var resolution:Number = (resolutionX > resolutionY) ? resolutionX : resolutionY;
				var zoomLevel:Number = Math.floor(22 - 4.74380021493083 - 2 * Math.log(resolution) / Math.log(4));
				resolution = Math.pow(10, ((22 - 4.74380021493083 - zoomLevel) * Math.log(4) / (2 * Math.log(10))));
				this._map.resolution = new Resolution(resolution, this._map.projection);

				this._map.dispatchEvent(new MapEvent(MapEvent.MOVE_END, this._map));
			}
			
			//this._map.zoomToExtent(new Bounds(left, bottom, right, top).reprojectTo(this._map.projection));
		}

		/**
		 * 地図にメタデータをセットする
		 * @param	json
		 */
		public function setMetadata(json:String, callback:String = null):void
		{
			this._baseMap.metaData = com.adobe.serialization.json.JSON.decode(json);
			this._baseMap.redraw(true);
			if (this._overview != null) {
				(this._overview.layer as TISMap).metaData = com.adobe.serialization.json.JSON.decode(json);
				this._overview.layer.redraw(true);
			}
			updateTermOfService();
			if (ExternalInterface.available && callback != null && callback.length > 0) {
				ExternalInterface.call(callback);
			}
		}

		/**
		 * 地図にswf内部にあるメタデータをセットする
		 * @param	callback
		 */
		public function setInnerMetadata(callback:String = null):void
		{
			//[Embed(source="../../../../../assets/map/metadata.json", mimeType="application/octet-stream")]
			//var innerMetadata:Class;

			//Alert.show("innermeta");
			//var metadataText:String = new innerMetadata();

			//this._baseMap.metaData = com.adobe.serialization.json.JSON.decode(metadataText);
			this._baseMap.redraw(true);
			if (this._overview != null) {
				(this._overview.layer as TISMap).metaData = this._baseMap.metaData;
				this._overview.layer.redraw(true);
			}
			updateTermOfService();
			if (ExternalInterface.available && callback != null && callback.length > 0) {
				ExternalInterface.call(callback);
			}
		}

		/**
		 * 現在表示している地図のメタデータを返す
		 * @return	JSON文字列
		 */
		public function getCurrentMetadata() : String
		{
			var metadataStr:String = "";
			var metadata:Object = this._baseMap.getCurrentMetadata(getZoomLevel());
			if (metadata == null)
			{
				return '';
			}
			else
			{
				metadataStr = com.adobe.serialization.json.JSON.encode(metadata);
				//Alert.show(metadataStr);		// JSON文字列が取れている
				//var strmetadataStr.parse(metadataStr);
				return metadataStr;
			}
		}

		/**
		 * 現在表示している地図のメタデータを返す
		 * @return	obj
		 */
		public function getCurrentMetadataObject():Object
		{
			return this._baseMap.getCurrentMetadata(getZoomLevel());
		}

		/**
		 * 地図の種類を設定する
		 * @param	json
		 */
		public function setMapKind(json:String):void
		{
			this._baseMap.setMapKind(json);
			if (this._overview != null) {
				(this._overview.layer as TISMap).setMapKind(json);
			}
			this.updateTermOfService();
		}

		public function setOverviewMapKind(json:String):void
		{
			if (this._overview != null) {
				(this._overview.layer as TISMap).setMapKind(json);
			}
		}

		public function getMapID():String
		{
			return this._baseMap.mapID;
		}

		public function changeMap(mapID:String):void
		{
			var kind:Object = MapKind.getMapKind(mapID);
			if (kind != null) {
				this._baseMap.mapID = mapID;
				setMapKind(com.adobe.serialization.json.JSON.encode(kind));
			}
			if (this._mapChanger != null) {
				this._mapChanger.changeSelection(mapID);
			}
			this.updateTermOfService();

			// 二重レイヤーの調整
			var secondLayer:Layer = this._map.getLayerByIdentifier(BASE_MAP2_IDENTIFIER);
			if (mapID == "SPRING"
					|| mapID == "SUMMER"
					|| mapID == "AUTUMN"
					|| mapID == "WINTER"
					|| mapID == "GREY") {
				// 段彩地図の場合、レイヤーを２段重ねにする。
				if (secondLayer != null) {
					this._map.removeLayer(secondLayer);
				}
				if (mapID == "GREY") {
					this.addBaseLayer(BASE_MAP2_IDENTIFIER, "MONO");
				} else {
					this.addBaseLayer(BASE_MAP2_IDENTIFIER, "COLOR");
				}
				// 段彩地図の場合、広域地図は標準地図とする。
				//this.setOverviewMapKind(com.adobe.serialization.json.JSON.encode(MapKind.getMapKind("JAIS")));
			} else {
				// 段彩地図から別の地図に切り替わった場合、２つめのレイヤーを削除する。
				if (secondLayer != null) {
					this._map.removeLayer(secondLayer);
				}
			}
			//常に広域地図は標準地図とする。
			this.setOverviewMapKind(com.adobe.serialization.json.JSON.encode(MapKind.getMapKind("std")));
		}

		/**
		 * ズームレベルを設定する
		 * @return	0～18の整数　0...小縮尺, 18...大縮尺
		 */
		public function setZoomLevel(zoomLevel : Number) : void
		{
			if (zoomLevel < 0 || zoomLevel >= this._baseMap.resolutions.length)
			{
				return;
			}

			var newResolution:Number = this._baseMap.resolutions[zoomLevel];
			this._map.resolution = new Resolution(newResolution, this._map.projection);
		}
		
		public function updateTermOfService():void
		{
			var text:String = "";
			var dataIDArray:Array = new Array();
			var isDansai:Boolean = false;
			for each (var layer:Layer in this._map.layers) {
				if (layer is TISMap && layer.visible) {
					var meta:Object = (layer as TISMap).getCurrentMetadata(getZoomLevel());
					if (meta == null) {
						continue;
					}
					var dataId:String = (layer as TISMap).getDataID(getZoomLevel());
					if (dataIDArray.indexOf(dataId) >= 0) {
						// 同じタイル画像を複数表示するような場合は、著作権表示は１回のみとする。
						continue;
					}
					if (isDansai && (layer.identifier == MapAPI.BASE_MAP2_IDENTIFIER)) {
						// 段彩地図の場合、サブレイヤーの著作権表示はしない
						continue;
					}
					dataIDArray.push(dataId);
					var title:String = "";
					if (meta.hasOwnProperty("title")) {
						title = meta["title"];
					}
					// 20130809 Label追加
					var label:String = "";
					if (meta.hasOwnProperty("label")) {
						title = meta["label"];
					}					
					var owner:String = "";
					if (meta.hasOwnProperty("owner")) {
						owner = meta["owner"];
					}
					while (title.search("”") >= 0) {
						title = title.replace("”", "\"");
					}
					while (owner.search("”") >= 0) {
						owner= owner.replace("”", "\"");
					}
					dataId = meta["dataId"];
					if (dataId=='SPRING' || dataId=='SUMMER' || dataId=='AUTUMN' || dataId=='WINTER' || dataId=='GRAY')
					{
						var zoom:Number = getZoomLevel();
						// 段彩の場合の特殊処理
						if (zoom >= 12 && zoom <= 14) {
							title += '20万 ' + createLegendLink("../../legend/200000c-legend.pdf", "凡例");
							isDansai = true;
						} else if (zoom >= 9 && zoom <= 11) {
							title += '100万 ' + createLegendLink("../../legend/1000000c-legend.pdf", "凡例");
							isDansai = true;
						}
					}
					else
					{
						//凡例表示用
						var legendurl:String = meta["legendURL"];
						var subLabel:String = "";
						if (legendurl != null && legendurl.length > 0) {
							if (label.length > 0) {
								title = label;
							}
							if ((dataId=='NLII1')||(dataId=='NLII2')||(dataId=='NLII3')||(dataId=='NLII4')||(dataId=='DJBMO'))
							{
								subLabel = "関連情報";
							} 
							else 
							{
								subLabel = "凡例";
							}

							title += createLegendLink(legendurl, subLabel);
						}
					}
					var subtext:String = owner + " " + title;
					text += " " + subtext;
				}
			}
			text = '<span class="olControlAttribution">' + text + '</span>';
			this._termOfService.htmlText = text;

			/*
			var meta:Object = this.getCurrentMetadataObject();
			if (meta != null) {
				var title:String = meta["title"];
				var owner:String = meta["owner"];
				while (title.search("”") >= 0) {
					title = title.replace("”", "\"");
				}
				while (owner.search("”") >= 0) {
					owner= owner.replace("”", "\"");
				}
				this._termOfService.htmlText = title + " " + owner;
			}
			*/
		}

		/**
		 * 地図を印刷する
		 */
		public function print():void
		{
			this._printer.scaleLine = this._sLine;
			this._printer.termOfService = this._termOfService;
			this._printer.print(this._map);
		}

		/**
		 * 中心位置の表示・非表示を切り替える。
		 * @param	visible 表示・非表示設定
		 */
		public function showCenterMark(visible:Boolean):void
		{
			if (this._centerMark != null) {
				this._centerMark.visible = visible;
			}
		}

		/**
		 * オブジェクト情報のポップアップ表示の切り替えを設定します
		 * @param	state
		 */
		public function setObjInfoPopup(state:Boolean):void
		{
			_popupEnabled = state;
			//_featureClickAdded = state;
		}
		
		/**
		 * ポップアップ表示（リスナー登録）
		 * @param	e
		 */
		public function showPopup(e:DrawingEvent):void
		{
			if (!_featureClickAdded)
			{
				this._map.addEventListener(FeatureEvent.FEATURE_CLICK, onFeatureClick);
				this._map.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);	// オブジェクト選択/選択解除イベントの選択解除用
			}
			_featureClickAdded = true;
		}
		
		/**
		 * ポップアップ表示（リスナー解除）
		 * @param	e
		 */
		public function hidePopup(e:DrawingEvent):void
		{
			if (_featureClickAdded)
			{
				this._map.removeEventListener(FeatureEvent.FEATURE_CLICK, onFeatureClick);
				this._map.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);	// オブジェクト選択/選択解除イベントの選択解除用
			}
			_featureClickAdded = false;
			if(_fxpopup){
				_fxpopup.destroy();
				_fxpopupRenderer.destroy();
			}
			
			// オブジェクト選択/選択解除イベント用 登録済みのオブジェクトを解除
			_selectedFeature = null;
		}
		
		/**
		 * オブジェクト選択時（オブジェクトを選択した際に判定される）
		 * ・ポップアップ表示ONの場合、クリックされたオブジェクト情報をポップアップで表示する
		 * ・オブジェクト選択/選択解除のイベントを送る
		 * @param	event
		 */
		public function onFeatureClick(event:FeatureEvent):void {
			// ポップアップウィンドウを削除
			if(_fxpopup){
				//  hamas : 13.09.09 オブジェクト編集呼出
				_fxpopupRenderer.clearTarget();

				_fxpopup.destroy();
				_fxpopupRenderer.destroy();
			}
			_fxpopup = null;
			
			// ポップアップ表示
			// ポップアップ表示の設定がfalseの場合、ポップアップはNOP（＝表示しない）
			if (_popupEnabled) {
				_fxpopup = new FxPopup();
				_fxpopup.WIDTH = 240;
				//  hamas : 13.09.09 オブジェクト編集呼出 140→180
				_fxpopup.HEIGHT = 180;
				_fxpopup.fxmap = _fxmap;
				
				var feature:Feature = event.feature;
				_fxpopup.feature = feature;
				
				if (feature is ExifFeature)
				{
					var exif:ExifFeature = feature as ExifFeature;
					var renderer:ExifPopupRenderer = new ExifPopupRenderer();
					_fxpopup.popupRenderer = renderer;
					_fxpopup.feature = feature;
					renderer.setContents(exif.exif);

					// ポップアップのタイトル
					renderer.titleContent = feature.name;
					
					_fxpopup.WIDTH = 160;
					_fxpopup.HEIGHT = 120 + 40;
				}
				else
				{
					_fxpopup.popupRenderer = _fxpopupRenderer;
				
					// 編集アイコンを表示するか
					if (Settings.showsEditIconsOnPopup && !(feature.layer is ExKML && (feature.layer as ExKML).isLibrary))
					{
						_fxpopupRenderer.showsIcon = true;
					} else {
						_fxpopupRenderer.showsIcon = false;
					}
					// ポップアップのタイトル
					_fxpopupRenderer.titleContent = feature.attributes.name;
					// 本文(属性)
					var description:String = feature.attributes.description;
					_fxpopupRenderer.setContents(description);
					
					//  hamas : 13.09.09 オブジェクト編集呼出				
					_fxpopupRenderer.setTarget(feature);
				}
				_fxpopup.position = feature.lonlat;
				_fxmap.addFxPopup(_fxpopup);
			}
			
			// オブジェクト選択/選択解除イベント
			onSelectFeature(event);
		}
		
		/**
		 * 操作コマンドがACTIVE化した場合
		 * @param	event
		 */
		private function onChangeActiveHandler(event:DrawingEvent):void
		{
			//trace("onChangeActiveHandler");
			hidePopup(new DrawingEvent("draw_event"));	// イベントはダミー
			removeDoubleClickZoomIn();
			
		// hamas : 13.08.01	コンテキストメニューを抑制
			var cMenu:ContextMenu = new ContextMenu();
			cMenu.hideBuiltInItems();
			this._map.contextMenu = cMenu;
		}
		
		/**
		 * 操作コマンドが非ACTIVE化した場合
		 * @param	event
		 */
		private function onFuncHandlerDesactivated(event:DrawingEvent):void
		{
			//trace("onFuncHandlerDesactivated");
			showPopup(new DrawingEvent("draw_event"));	// イベントはダミー
			setDoubleClickZoomIn();
			
		// hamas : 13.08.01	コンテキストメニューを戻す
			this._map.contextMenu = this._menu;
		}
		
		/**
		 * オブジェクト選択時（オブジェクトを選択した際に判定される）
		 * @param	event
		 */
		private function onSelectFeature(event:FeatureEvent):void
		{
			//trace("onSelectFeature(event:FeatureEvent)");
			
			// 選択したオブジェクトを登録
			_selectedFeature = event.feature;
			
			// イベント送出
			var fevt:FeatureEvent = new FeatureEvent(/*FeatureEvent.FEATURE_SELECTED*/"FEATURE_SELECTED", event.feature);
			this._map.dispatchEvent(fevt);
		}
		
		/**
		 * マウス左クリック時（地図上を選択した際に判定される）
		 * オブジェクト選択解除時に用いる
		 * @param	event
		 */
		private function onMouseDown(event:MouseEvent):void
		{
			//trace("onMouseDown(event:MouseEvent)");
			
			if (_selectedFeature != null) {
				// イベント送出
				var fevt:FeatureEvent = new FeatureEvent(/*FeatureEvent.FEATURE_UNSELECTED*/"FEATURE_UNSELECTED", _selectedFeature);
				this._map.dispatchEvent(fevt);
				
				// 登録済みのオブジェクトを解除
				_selectedFeature = null;
			}
		}
		
		/**
		 * 幅を取得
		 * @return 幅
		 */
		public function getFxmapWidth() : Number {
			var width:Number = 0;
			if(_fxmap) {
				width = _fxmap.width;
			}
			return width;
		}
		
		private function addBaseLayer(name:String, mapID:String):void
		{
			var kind:Object = MapKind.getMapKind(mapID);
			if (kind != null) {
				var layer:TISMap = new TISMap(name);
				this._map.addLayer(layer);
				this._map.changeLayerIndex(layer, 1);	// 必ずbaseレイヤーのすぐ上に来るように
				layer.mapID = mapID;
				layer.setMapKind(com.adobe.serialization.json.JSON.encode(kind));
				var baseLayer:Layer = this._map.getLayerByIdentifier(MapAPI.BASE_MAP_IDENTIFIER);
				if (baseLayer != null) {
					layer.metaData = baseLayer.metaData;
				}
				layer.redraw(true);
			}
		}
		
		public function addMapLayer(name:String, dataset:Object, zindex:Number = -1):void
		{
			var kind:Object = { };
			for (var i:int = 0; i <= 18; i++) {
				if (dataset[i]) {
					kind[i] = dataset[i].dataId;
				}
			}
			var layer:TISMap = new TISMap(name);
			if (zindex >= 0) {
				var newIndex:int = 0;
				for (var j:int = 0; j < this._map.layers.length; j++) {
					if (this._map.layers[j] is TISMap) {
						if ((this._map.layers[j] as TISMap).displayPriority < zindex) {
							break;
						}
					} else {
						break;
					}
					newIndex++;
				}
			}
			this._map.addLayer(layer);
			this._map.changeLayerIndex(layer, newIndex);
			layer.setMapKind(com.adobe.serialization.json.JSON.encode(kind));
			
			// ベースマップからメタデータをコピー
			var baseLayer:Layer = this._map.getLayerByIdentifier(MapAPI.BASE_MAP_IDENTIFIER);
			if (baseLayer != null) {
				layer.metaData = baseLayer.metaData;
			}
			layer.redraw(true);
			updateTermOfService();
		}

		/**
		 * 地図上で選択状態になったオブジェクトの作図情報（名称・属性・形状等）をJSON形式で返す
		 * @return
		 */
		public function getSelectedObject():String
		{
			var json:Object = "";
			
			if (_selectedFeature == null) {
				return json.toString();
			}
			
			json = _objAPI.getObject(_selectedFeature, true);
			//Alert.show(json.toString());
			
			return json.toString();
		}
		
		/**
		 * 指定された範囲に含まれるすべてのオブジェクトの作図情報をJSON形式で返す
		 * @param	left	取得範囲の左端経度
		 * @param	bottom	取得範囲の下端緯度
		 * @param	right	取得範囲の右端経度
		 * @param	top	取得範囲の上端緯度
		 * @return
		 */
		public function getObjectsInRect(left : Number, bottom : Number, right : Number, top : Number):String
		{
			var json:Object = "";
			
			// input error
			if (left == right || bottom == top) {
				return json.toString();
			}
			
			var minPx:Pixel = this._map.getMapPxFromLocation(new Location(left, bottom).reprojectTo(this._map.projection), this._map.resolution, this._map.extent);
			var maxPx:Pixel = this._map.getMapPxFromLocation(new Location(right, top).reprojectTo(this._map.projection), this._map.resolution, this._map.extent);
			// check
			//_drawContainer.graphics.clear();
			//_drawContainer.graphics.lineStyle(/*this.selectionAreaBorderThin*/2, /*this.selectionAreaBorderColor*/0xFFCC00);
			//_drawContainer.graphics.beginFill(/*this.selectionAreaFillColor*/0xCC0000, /*this.selectionAreaFillOpacity*/0.33);
			//_drawContainer.graphics.drawRect(minPx.x, minPx.y, maxPx.x-minPx.x, maxPx.y-minPx.y);
			//_drawContainer.graphics.endFill();
			
			// SelectFeatureHandler　selectByGeometry()を参考に作成
			// 引数geom
			var geom:Geometry = null;
			var bottomLeft:Location = this._map.getLocationFromMapPx(minPx);
			var topRight:Location = this._map.getLocationFromMapPx(maxPx);
			var sbox:Bounds = new Bounds(bottomLeft.lon, bottomLeft.lat, topRight.lon, topRight.lat, this._map.projection);
			geom = sbox.toGeometry();
			// その他
			var _unselectableFeatures:Vector.<Feature> = new Vector.<Feature>();
			var _enableMultipleSelection:Boolean = true;	// 複数可
			
			// Look for all the features that intersect the selection geometry
			var featuresToSelect:Vector.<Feature> = new Vector.<Feature>();
			if (geom) {
				var layersToTest:Vector.<VectorLayer> = this._map.featureLayers;
				var layer:VectorLayer, layersTmp:Vector.<VectorLayer> = new Vector.<VectorLayer>();
				// Remove invisible layers from the list of selectable layers
				for each (layer in layersToTest) {
					if (layer && layer.displayed) {
						layersTmp.push(layer);
					}
				}
				layersToTest = layersTmp;
				// 
				for each (layer in layersToTest) {
					for(var i:uint = layer.features.length; i > 0; i--){
						if (geom.intersects(layer.features[i-1].geometry)) {
							if(_unselectableFeatures.indexOf(layer.features[i-1])==-1){
								if (layer.features[i-1].selectable)
								{
									featuresToSelect.push(layer.features[i-1]);
									if(!_enableMultipleSelection)
										break;
								}
							}
						}
					}
				}
			}
			
			// featuresToSelectの各オブジェクトを処理
			var objects:Array = new Array();
			for each (var feature:Feature in featuresToSelect) {
				//trace(feature.name);
				objects.push(_objAPI.getObject(feature, false));
			}
			
			json = com.adobe.serialization.json.JSON.encode(objects);
			//Alert.show(json.toString());
			
			return json.toString();
		}
		
		private var dialog:TitleWindow
		public function showPopupMessage(text:String, title:String):void
		{
			dialog = new TitleWindow();
			dialog.title = title;
			var box:VGroup = new VGroup();
			box.paddingLeft = 5;
			box.paddingRight = 5;
			box.paddingTop = 5;
			box.paddingBottom = 5;
			var textArea:Text = new Text();
			textArea.htmlText = text;
			box.addElement(textArea);
			dialog.addElement(box);
			dialog.showCloseButton = true;
			dialog.addEventListener(CloseEvent.CLOSE, closePopUp);
			PopUpLock.lock();
			PopUpManager.addPopUp(dialog, _map, true);
			PopUpManager.centerPopUp(dialog);
		}
		
		public function showEditIconsInPopup(value:Boolean):void
		{
			Settings.showsEditIconsOnPopup = value;
		}

		public function saveAsHTML(url:String):void
		{
			var saver:SaveHTML = new SaveHTML();
			saver.save(this._map, url);
		}

		private function setFocus(e:Event):void 
		{
			(e.currentTarget as TextArea).selectAll();
		}
		
		private function closePopUp(e:Event):void
		{
			PopUpLock.unlock();
			PopUpManager.removePopUp(dialog);
		}
		
		private function setDoubleClickZoomIn():void
		{
			if (this._clickHandler) {
				(this._clickHandler.handler as ClickHandler).doubleClick = function(LastPX:Pixel = null):void {
					var location:Location = this.map.getLocationFromMapPx(LastPX);
					this.map.zoomBy(0.5, null);
					this.map.center = location;
				};
			}
		}
		
		private function removeDoubleClickZoomIn():void
		{
			if (this._clickHandler) {
				(this._clickHandler.handler as ClickHandler).doubleClick = null;
			}
		}
		
		private function createLegendLink(url:String, label:String):String
		{
			return '<span class="legendattr"><a HREF="' + url + '" class="legendattr"'
				+ ' onClick="window.open(this.href,\'win\',\'width=500,height=400,menubar=no,toolbar=no,status=yes,scrollbars=yes,resizable=yes\'); return false;" target="_blank">'
				+ label + '</a></span>';
		}
	}
}
package jp.cyberjapan.webtis.api 
{
	import com.adobe.serialization.json.JSON;
	import flash.external.ExternalInterface;
	import flash.system.Security;
	import jp.cyberjapan.webtis.handler.feature.draw.DrawCircleHandler;
	import jp.cyberjapan.webtis.layer.ExKML;
	import jp.cyberjapan.webtis.style.marker.ExCustomMarker;
	import mx.logging.ILogger;
	import mx.logging.Log;
	import org.openscales.core.events.FeatureEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.LabelFeature;
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.core.handler.feature.SelectFeaturesHandler;
	import org.openscales.core.layer.Layer;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import org.openscales.core.style.fill.Fill;
	import org.openscales.core.style.fill.SolidFill;
	import org.openscales.core.style.font.Font;
	import org.openscales.core.style.halo.Halo;
	import org.openscales.core.style.marker.CustomMarker;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.stroke.Stroke;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.symbolizer.LineSymbolizer;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.core.style.symbolizer.PolygonSymbolizer;
	import org.openscales.core.style.symbolizer.Symbolizer;
	import org.openscales.core.style.symbolizer.TextSymbolizer;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.LinearRing;
	import org.openscales.geometry.LineString;
	import org.openscales.geometry.Point;
	import org.openscales.geometry.Polygon;
	import org.openscales.proj4as.ProjProjection;
	
	/**
	 * ...
	 * @author minami.kobayashi
	 */
	public class ObjectAPI 
	{
		private static var INTERNAL_PROJECTION:ProjProjection =  ProjProjection.getProjProjection("EPSG:900913");
		private static var DISPLAY_PROJECTION:ProjProjection = ProjProjection.getProjProjection(Geometry.DEFAULT_SRS_CODE);

		private var map:Map = null;
		
		private var _layerNum:Number = 0;
		private static var _styleIds:Vector.<String> = new Vector.<String>();
		
		public static const MARKER_STYLE_ID_BASE:String = "Marker_Style";
		public static const LABEL_STYLE_ID_BASE:String = "Label_Style";
		public static const LINE_STYLE_ID_BASE:String = "Line_Style";
		public static const POLYGON_STYLE_ID_BASE:String = "Polygon_Style";
		public static const CIRCLE_STYLE_ID_BASE:String = "Circle_Style";
		
		public static const MARKER_TYPE:String = "marker";
		public static const LABEL_TYPE:String = "label";
		public static const LINE_TYPE:String = "line";
		public static const POLYGON_TYPE:String = "polygon";
		// 描画時のみ使用
		public static const CIRCLE_TYPE:String = "circle";
		
		private var logger:ILogger = Log.getLogger("ObjectAPI");
		
		/**
		 * 選択オブジェクト
		 */
		private var selectFeature:Feature = null;
		
		public function ObjectAPI(map : Map) 
		{
			this.map = map;
			this.addCallbacks();
			
			this.map.addEventListener(FeatureEvent.FEATURE_CLICK, setFeature);
		}	
		
		public function addCallbacks() : void
		{
			Security.allowDomain( "*" );
			if (ExternalInterface.available)
			{
				ExternalInterface.addCallback("getObject", getObject);
				ExternalInterface.addCallback("getObjects", getObjects);
				ExternalInterface.addCallback("setObject", setObject);
				ExternalInterface.addCallback("setObjects", setObjects);
				//ExternalInterface.addCallback("drawText", drawText);
				//ExternalInterface.addCallback("drawLineString", drawLineString);
				//ExternalInterface.addCallback("drawPolygon", drawPolygon);
				//ExternalInterface.addCallback("drawCircle", drawCircle);
				ExternalInterface.addCallback("getObjectForServer", getObjectForServer);
				ExternalInterface.addCallback("getObjectsForServer", getObjectsForServer);
				ExternalInterface.addCallback("setObjectForServer", setObjectForServer);
				ExternalInterface.addCallback("setObjectsForServer", setObjectsForServer);
			}
		}
		
		/**
		 * アイコンのマウスオーバー時の表示対策
		 * @param	feature
		 * @return
		 */
		//public function selectedStyle(feature:Feature):Style
		//{
			//if (feature is PointFeature && !(feature is LabelFeature))
			//{
				//return feature.style;
			//}
			//else 
			//{
				//return SelectFeaturesHandler.defaultSelectedStyle(feature);
			//}
		//}
		
		/**
		 * Map上のすべてのVectorLayerのオブジェクト情報をObject配列のJSONで返す
		 * @return
		 */
		public function getObjects():String
		{
			var objects:Array = new Array();
			for each(var layer:Layer in map.layers)
			{
				if (!(layer is VectorLayer))
				{
					continue;
				}
				else if (layer.identifier == "search" || layer.identifier == "mnLine")
				{
					// 検索結果マーカー用レイヤー・磁北線レイヤーは飛ばす
					continue;
				}
				else if (layer is ExKML && (layer as ExKML).isLibrary)
				{
					// ライブラリレイヤーなら飛ばす
					continue;
				}
				else if (layer.visible == false) {
					// 表示中でなければ飛ばす
					continue;
				}
				var vecLayer:VectorLayer = layer as VectorLayer;
				for each(var feature:Feature in vecLayer.features)
				{
					objects.push(getObject(feature, false));
				}
			}
			return com.adobe.serialization.json.JSON.encode(objects);
		}
		
		/**
		 * オブジェクト情報を返す
		 * @param	feature	指定しない場合は選択オブジェクトを返す
		 * @param	encode	JSON形式に変換するかどうか
		 */
		public function getObject(feature:Feature=null, encode:Boolean=true): Object
		{
			if (!feature)
			{
				feature = selectFeature;
			}
			var obj : Object = {};
			if (feature)
			{
				if (feature is LabelFeature)
				{
					// テキストオブジェクトのみ
					obj.text = (feature as LabelFeature).text;
				}
				// レイヤー
				obj.layer = feature.layer.identifier;
				// オブジェクトタイプ
				var objType:String = getObjectType(feature);
				obj.type = objType;
				// スタイル
				var symbolizers:Array = new Array();
				for each (var symbolizer:Symbolizer in feature.style.rules[0].symbolizers)
				{
					symbolizers.push(symbolizer.clone());
				}
				obj.style = symbolizers;
				// 座標
				var geometry:Geometry = feature.geometry.clone();
				geometry.transform(DISPLAY_PROJECTION);
				// 経度1,緯度1,経度2,緯度2,...の配列に変換
				var geom:Array = new Array();
				for each(var point:Point in geometry.toVertices())
				{
					geom.push(point.x);
					geom.push(point.y);
				}
				obj.geom = geom;
				// 属性
				var name:String = feature.attributes.name;
				var description:String = feature.attributes.description;
				obj.attributes = { "name":name, "description":description };
			}
			if (encode)
			{
				// Object→JSON
				return com.adobe.serialization.json.JSON.encode(obj)
			}
			else
			{
				return obj;
			}
		}

		/**
		 * 指定した情報をもとに複数のオブジェクトを描画します
		 * @return
		 */
		public function setObjects(objects:String):void
		{
			var objArray:Array = com.adobe.serialization.json.JSON.decode(objects) as Array;
			for each(var obj:Object in objArray)
			{
				setObject(obj, false);
			}
		}

		/**
		 * 指定した情報をもとにオブジェクトを描画します
		 * @param	obj
		 */
		public function setObject(obj:Object, decode:Boolean=true) : void
		{
			var data : Object;
			if (decode)
			{
				// JSON→Object
				data = com.adobe.serialization.json.JSON.decode(obj as String);
			}
			else
			{
				data = obj;
			}
			
			var layer : VectorLayer = getVectorLayer(data.layer);
			
			switch(data.type)
			{
				case MARKER_TYPE:
					drawMarker(data);
					break;
				case LABEL_TYPE:
					drawText(data);
					break;
				case LINE_TYPE:
					drawLineString(data);
					break;
				case POLYGON_TYPE:
					drawPolygon(data);
					break;
				case CIRCLE_TYPE:
					drawCircle(data);
					break;
			}
		}
		
		/**
		 * マーカーオブジェクトを描画します
		 * @param	data	[ layer, type, style, geom, attributes ]をもつObject
		 */
		public function drawMarker(obj : Object) : void
		{
			// 指定した名前のレイヤーを取得
			var layer : VectorLayer = getVectorLayer(obj.layer);
			
			// 外観の設定
			var style:Style = new Style();
			style.name = getStyleId(MARKER_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			for each (var symb:Object in obj.style)
			{
				rule.symbolizers.push(createSymbolizer(symb));
			}
			style.rules.push(rule);
			
			var pt:Point = new Point(obj.geom[0], obj.geom[1], DISPLAY_PROJECTION);
			var marker:PointFeature = new PointFeature(pt, obj.attributes, style);
			marker.layer = layer;
			marker.layer.scaleX = 1;
			marker.layer.scaleY = 1;

			layer.addFeature(marker);
			map.addLayer(layer);
			logger.debug("drawMarker comp");
		}
		
		/**
		 * テキストオブジェクトを描画します
		 * @param	data	[ layer, type, text, style, geom, attributes ]をもつObject
		 */
		public function drawText(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
			var layer : VectorLayer = getVectorLayer(obj.layer);
			
			// 外観の設定
			var style:Style = new Style();
			style.name = getStyleId(LABEL_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			for each (var symb:Object in obj.style)
			{
				rule.symbolizers.push(createSymbolizer(symb));
			}
			style.rules.push(rule);
			
			// テキスト
			var pt:Point = new Point(obj.geom[0], obj.geom[1], DISPLAY_PROJECTION);
			var label:LabelFeature = new LabelFeature(pt, obj.attributes);
			label.text = obj.text;
			label.style = style;
			label.layer = layer;
			label.layer.scaleX = 1;
			label.layer.scaleY = 1;

			layer.addFeature(label);
			map.addLayer(layer);			
			logger.debug("drawText comp");
		}
		
		/**
		 * ラインオブジェクトを描画します
		 * @param	data	[ layer, type, style, geom, attributes ]をもつObject
		 */
		public function drawLineString(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
			var layer : VectorLayer = getVectorLayer(obj.layer);
			
			var style:Style = new Style();
			style.name = getStyleId(LINE_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			for each (var symb:Object in obj.style)
			{
				rule.symbolizers.push(createSymbolizer(symb));
			}
			style.rules.push(rule);
			
			// インスタンス作成
			var geom:LineString = new LineString(Vector.<Number>(obj.geom), DISPLAY_PROJECTION);
			var ls:LineStringFeature = new LineStringFeature(geom, obj.attributes, style, true);
			layer.addFeature(ls);
			map.addLayer(layer);
			logger.debug("drawLineString comp");
		}
		
		/**
		 * ポリゴンオブジェクトを描画します
		 * @param	data	[ layer, type, style, geom, attributes ]をもつObject
		 */
		public function drawPolygon(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
			var layer : VectorLayer = getVectorLayer(obj.layer);
			
			var style:Style = new Style();
			style.name = getStyleId(POLYGON_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			for each (var symb:Object in obj.style)
			{
				rule.symbolizers.push(createSymbolizer(symb));
			}
			style.rules.push(rule);
			// インスタンス作成
			var lRing : LinearRing = new LinearRing(Vector.<Number>(obj.geom), DISPLAY_PROJECTION);
			var rings : Vector.<Geometry> = new Vector.<Geometry>();
			rings.push(lRing);
			var plygon:Polygon = new Polygon(rings, DISPLAY_PROJECTION);
			var plObj:PolygonFeature = new PolygonFeature(plygon, obj.attributes, style);
			layer.addFeature(plObj);
			map.addLayer(layer);
			logger.debug("drawPolygon comp");
		}
		
		/**
		 * 円オブジェクトを描画します
		 * @param	data	[ layer, type, style, geom, radius, attributes ]をもつObject
		 */
		public function drawCircle(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
			var layer : VectorLayer = getVectorLayer(obj.layer);
			
			var style:Style = new Style();
			style.name = getStyleId(CIRCLE_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			for each (var symb:Object in obj.style)
			{
				rule.symbolizers.push(createSymbolizer(symb));
			}
			style.rules.push(rule);
			// インスタンス作成
			var cp:Point = new Point(obj.geom[0], obj.geom[1]);
			cp.transform(INTERNAL_PROJECTION);
			var handle:DrawCircleHandler = new DrawCircleHandler();
			var circle : Polygon = handle.createRegularPolygon(cp, obj.radius, 73, 0);
			circle.projection = cp.projection;
			var circleObj:PolygonFeature = new PolygonFeature(circle, obj.attributes, style);
			layer.addFeature(circleObj);
			map.addLayer(layer);
			logger.debug("drawCircle comp");
		}
		
		/**
		 * 指定した名前のベクタレイヤーを取得する。既存のレイヤーに一致するものがない場合は新規作成したものを返す
		 * @param	name
		 * @return
		 */
		private function getVectorLayer(layerName : String) : VectorLayer
		{
			if (layerName == null || layerName == "")
			{
				layerName = "default" + _layerNum++;
			}
			var layer : VectorLayer;
			var tmpLayer : Layer = this.map.getLayerByIdentifier(layerName);
			if (tmpLayer != null && tmpLayer is VectorLayer)
			{
				layer = tmpLayer as VectorLayer;
			}
			else
			{
				layer = new VectorLayer(layerName);
				layer.editable = true;
			}
			return layer;
		}
		
		/**
		 * オブジェクトタイプを返す
		 * @param	feature
		 * @return
		 */
		private function getObjectType(feature:Feature):String
		{
			var type:String = "";
			if(feature is LabelFeature)
				type = LABEL_TYPE;
			else if (feature is PointFeature)
				type = MARKER_TYPE;
			else if(feature is LineStringFeature)
				type = LINE_TYPE;
			else if(feature is PolygonFeature)
				type = POLYGON_TYPE;
				
			return type;
		}
		
		/**
		 * styleの値で判別したsymbolizerを作成する
		 * @param	style
		 * @return
		 */
		private function createSymbolizer(style:Object):Symbolizer
		{
			// マーカー(画像アイコンのみ)
			if (style.graphic)
			{
				var url:String = style.graphic.url;
				var opacity:Number = style.graphic.opacity ? style.graphic.opacity : 1;
				var xOffset:Number = style.graphic.xOffset ? style.graphic.xOffset : 0.5;
				var xUnit:String = style.graphic.xUnit ? style.graphic.xUnit : "fraction";
				var yOffset:Number = style.graphic.yOffset ? style.graphic.yOffset : 0.5;
				var yUnit:String = style.graphic.yUnit ? style.graphic.yUnit : "fraction";
				var proxy:String = style.graphic.proxy;
				// リモート接続のときはproxy設定
				if (Security.sandboxType == Security.REMOTE) {
					proxy = Constant.getFullProxyURL();
				}
				return new PointSymbolizer(new ExCustomMarker(url, opacity, xOffset, xUnit, yOffset, yUnit, proxy));
			}
			// フォント
			var font:Font;
			if (style.font)
			{
				var propertyName:String = style.propertyName;
				var size:Number = style.font.size ? style.font.size : 10;
				var color:uint = style.font.color ? style.font.color : 0x000000;
				opacity = style.font.opacity ? style.font.opacity : 1;
				var family:String = style.font.family;
				var fStyle:String = style.font.style;
				var weight:String = style.font.weight;
				font = new Font(NaN, color, opacity, family, fStyle, weight);
				font.size = size;
				var halo:Halo;
				if (style.halo)
				{
					color = style.halo.color ? style.halo.color : 0xffffff;
					var radius:Number = style.halo.size ? style.halo.size : 2;
					opacity = style.halo.opacity ? style.halo.opacity : 1;
					halo = new Halo(color, radius, opacity);
				}
				return new TextSymbolizer(propertyName, font, halo);
			}
			// 線
			var stroke:Stroke;
			if (style.stroke)
			{
				color = style.stroke.color ? style.stroke.color : 0x000000;
				var width:Number = style.stroke.width ? style.stroke.width : 1;
				opacity = style.stroke.opacity ? style.stroke.opacity : 1;
				var linecap:String = style.stroke.linecap ? style.stroke.linecap : Stroke.LINECAP_ROUND;
				var linejoin:String = style.stroke.linejoin ? style.stroke.linejoin : Stroke.LINEJOIN_ROUND;
				var pWhiteSize:uint = style.stroke.pWhiteSize ? style.stroke.pWhiteSize : 0;
				var pDottedSize:uint = style.stroke.pDotteSize ? style.stroke.pDotteSize : 0;
				stroke = new Stroke(color, width, opacity, linecap, linejoin, pWhiteSize, pDottedSize);
			}
			// 塗りつぶし(単色塗りのみ)
			if (style.fill)
			{
				var fill:Fill;
				color = style.fill.color ? style.fill.color : 0xffffff;
				opacity = style.fill.opacity ? style.fill.opacity : 1;
				fill = new SolidFill(color, opacity);
				return new PolygonSymbolizer(fill, stroke);
			}
			else
			{
				return new LineSymbolizer(stroke);
			}
		}
		
		/**
		 * 選択したオブジェクトを記憶します
		 * @param	event
		 */
		private function setFeature(event:FeatureEvent):void
		{
			selectFeature = event.feature;
		}
		
		/**
		 * 一意なスタイルIDを返す
		 * @param	featType
		 * @return
		 */
		public static function getStyleId(featType:String):String
		{
			var id:String = featType + new Date().getTime();
			while(_styleIds.indexOf(id) != -1)
			{
				// 重複→別の値に
				id = id + 1;
			}
			_styleIds.push(id);
			return id;
		}
		
		/* ---------------------------------------------------------------------- */
		/* 【サーバで使用している形式のJSON構造のための】　オブジェクトデータをJSONに変換 */
		/* ---------------------------------------------------------------------- */
		
		/**
		 * オブジェクト情報を、サーバで使用している形式のJSON構造に変換する
		 * @param	feature	指定しない場合は選択オブジェクトを返す
		 * @param	encode	JSON形式（サーバ形式）に変換するかどうか
		 * @return	encode=true：JSON（サーバ形式） encode=false：オブジェクト（サーバ形式）
		 */
		public function getObjectForServer(feature:Feature=null, encode:Boolean=true): Object
		{
			if (!feature)
			{
				feature = selectFeature;
			}
			
			// オブジェクトをJSON構造に変換
			var objLayer : Object = { };
			if (feature)
			{
				// MEMO CircleはPolygonとして処理する
				
				// ■name -> レイヤ名
				objLayer.name = feature.layer.displayedName;
				
				// □type
				objLayer.type = getObjectDataTypeForServer(feature);

				// □style
				// 形状ごとに異なる
				var objStyle : Object = { };
				if(feature is LineStringFeature) {
					// stroke
					if (feature.style.rules[0].symbolizers[0].hasOwnProperty("stroke")) {
						var strokeLine:Stroke = feature.style.rules[0].symbolizers[0]["stroke"];
						objStyle.strokeWidth = strokeLine.width.toString();	// 幅
						//objStyle.rgb = stroke.color;	// 色
						objStyle.strokeColor = convertColorHex2RGB(strokeLine.color);	// 色
						objStyle.strokeOpacity = strokeLine.opacity;	// 透明度
						objStyle.strokeLinecap = strokeLine.linecap;	// 端点形状
					}
					else {
						// default
						//objStyle.width = "2,static";	// 幅
						objStyle.width = "2";	// 幅
						objStyle.rgb = "255,0,0";	// 色
						//objStyle.strokeOpacity = 0.5;	// 透明度、不要？
					}
					objStyle.display = "ON";	// 固定？
					objStyle.displaylevel = "all";	// 固定？
					objStyle.selection = "ON";	// 固定？
					objStyle.transparent = "ON";	// 固定？
				}
				else if (feature is PolygonFeature) {
					// stroke
					if (feature.style.rules[0].symbolizers[0].hasOwnProperty("stroke")) {
						var strokePolygon:Stroke = feature.style.rules[0].symbolizers[0]["stroke"];
						objStyle.strokeColor = convertColorHex2RGB(strokePolygon.color);	// 色
						objStyle.strokeWidth = strokePolygon.width.toString();	// 幅
						objStyle.strokeOpacity = strokePolygon.opacity;	// 透明度
					}
					else {
						// default
						objStyle.strokeColor = "255,0,0";	// 色
						objStyle.strokeWidth = "5";	// 幅
						objStyle.strokeOpacity = 0.5;	// 透明度、不要？
					}
					// fill
					if (feature.style.rules[0].symbolizers[0].hasOwnProperty("fill")) {
						var fillPolygon:SolidFill = feature.style.rules[0].symbolizers[0]["fill"];
						objStyle.fill = "1";
						var colorUint:uint = uint(fillPolygon.color);
						objStyle.fillColor = convertColorHex2RGB(colorUint);	// 色
						objStyle.fillOpacity = fillPolygon.opacity;	// 透明度
					}
					else {
						// default
						objStyle.fill = "1";
						objStyle.fillColor = "0,255,0";	// 色
						objStyle.fillOpacity = 0.5;	// 透明度、不要？
					}
				}
				else if (feature is LabelFeature) {
					objStyle.label = (feature as LabelFeature).text;
					// font
					if (feature.style.rules[0].symbolizers[0].hasOwnProperty("font")) {
						var font:Font = feature.style.rules[0].symbolizers[0]["font"];
						objStyle.fontColor = convertColorHex2RGB(font.color);	// 色
						objStyle.fontSize = font.size + "px";	// フォントサイズ
						objStyle.fontOpacity = font.opacity;	// 透明度、不要？
					}
					else {
						objStyle.fontColor = "0,0,0";	// 色
						objStyle.fontSize = "12px";	// フォントサイズ
						objStyle.fontOpacity = 1;	// 透明度、不要？
					}
					// halo
					// TODO Textのhalo設定
					if (feature.style.rules[0].symbolizers[0].hasOwnProperty("halo")) {
						//var haloText:Halo = feature.style.rules[0].symbolizers[0]["halo"];
						// ???
					}
					else {
						// ???
					}
				}
				// Pointは一番最後（TextがPointと判定されるため）
				else if (feature is PointFeature) {
					objStyle.name = "symbolStyle";	// 固定
					objStyle.type = "Point";	// 固定
					// symbol
					if (feature.style.rules[0].symbolizers[0].hasOwnProperty("graphic")) {
						var cMarker:CustomMarker = feature.style.rules[0].symbolizers[0]["graphic"];
						objStyle.externalGraphic = cMarker.url;
						//objStyle.graphicWidth = cMarker.clip.width.toString();
						//objStyle.graphicHeight = cMarker.clip.height.toString();
						objStyle.graphicWidth = cMarker.clip.width;
						objStyle.graphicHeight = cMarker.clip.height;
						objStyle.graphicOpacity = 1;
					}
				}
				objLayer.style = objStyle;

				// ■data
				var datas:Array = new Array();
				{
					var objData : Object = { };
					
					// ■name
					// すべての形状が項目を持つが、データが入るのはTextのみ
					if (feature is LabelFeature) {
						objData.name = (feature as LabelFeature).text;
//					} else {
//						objData.name = "";
					}
					else if (feature.attributes != null && feature.attributes.hasOwnProperty("name")) {
						if (feature.attributes["name"] is XML) {
							objData.name = (feature.attributes["name"] as XML).toString();
						} else if (feature.attributes["name"] is XMLList) {
							objData.name = (feature.attributes["name"] as XMLList).toString();
						} else {
							objData.name = feature.attributes["name"];
						}
					} else {
						objData.name = "";
					}
					
					// □crs
					// Point, Lineのみで、文字列
//					if (feature is PointFeature || feature is LineStringFeature) {
//						objData.crs = "";// "JGD2000 / (L, B)";	// MEMO 必要ないっぽい
//					}
					
					// □type
					// Polygon, Circle, Textのみで、値は固定の文字列
					if (feature is PolygonFeature || feature is LabelFeature) {
						objData.type = "Feature";
					}

					// ■properties（属性）
					if (feature.attributes != null && feature.attributes.hasOwnProperty("description")) {
						// KML（XMLList型）対策でいったんローカル変数に格納
						var properties:String = feature.attributes["description"];
						properties = properties.replace(/"/g, "&quot;");
						objData.properties = properties;
					} else {
						objData.properties = "";
					}

					// ■geometry（座標）
					var objGeometry : Object = { };
					{
						// ■type
						objGeometry.type = getObjectDataTypeForServer(feature);
						
						// ■coordinates
						var geometry:Geometry = feature.geometry.clone();
						geometry.transform(DISPLAY_PROJECTION);
						// [経度1,緯度1],[経度2,緯度2],...の配列に変換
						// MEMO 経緯度は（カンマ連結により）文字列型のため値が"で囲まれるが、そのままではサーバのPHP実行でエラーになる。現状ではencode()後に無理やり置換している
						var geom:Array = new Array();
						for each(var point:Point in geometry.toVertices())
						{
							var str:String = "''" + point.x + "," + point.y + "''";
							//var str:String = "[" + point.x + "," + point.y + "]";
							geom.push(str);
						}
						// Line, Polygonのみ、配列のネスト調整
						if (feature is LineStringFeature) {
							var geomNest:Array = new Array();
							//for each(var strTmp:String in geom) {
								//geomNest.push("[" + strTmp + "]");
							//}
							geomNest.push(geom);
							objGeometry.coordinates = geomNest;
						}
						else if (feature is PolygonFeature) {
							// Polygonの場合、最後に始点と同じ座標を追加する必要がある
							geom.push(geom[0]);
							var geomNest1:Array = new Array();
							var geomNest2:Array = new Array();
							//for each(var strTmp1:String in geom) {
								//geomNest1.push("[" + strTmp1 + "]");
							//}
							geomNest1.push(geom);
							geomNest2.push(geomNest1);
							objGeometry.coordinates = geomNest2;
						}
						else {
							objGeometry.coordinates = geom;
						}
						
						objData.geometry = objGeometry;
					}
					
					// □primitiveId
					// Line, Polygonのみ、文字列
					if (feature is LineStringFeature || feature is PolygonFeature) {
						objData.primitiveId = "";	// primitiveId?
					}

					datas.push(objData);
				}
				objLayer.data = datas;
			}
			
			if (encode)
			{
				// Object→JSON
				var obj : Object = { };
				var objLayers:Array = new Array();
				objLayers.push(objLayer);
				obj.layer = objLayers;
				return modJSONForServerCoordinates(com.adobe.serialization.json.JSON.encode(obj));
			}
			else
			{
				// Object
				return objLayer;
			}
		}

		/**
		 * Map上のすべてのVectorLayerのオブジェクト情報をObject配列のJSONで返す
		 * @return	JSON（サーバ形式）
		 */
		public function getObjectsForServer():String
		{
			var objects:Array = new Array();	// = objLayers
			for each(var layer:Layer in map.layers)
			{
				if (!(layer is VectorLayer))
				{
					// ベクターレイヤーでなければ飛ばす
					continue;
				} else if (layer.identifier == "search" || layer.identifier == "mnLine")
				{
					// 検索結果マーカー用レイヤー・磁北線レイヤーは飛ばす
					continue;
				}
				else if (layer is ExKML && (layer as ExKML).isLibrary)
				{
					// ライブラリレイヤーなら飛ばす
					continue;
				}
				else if (layer.visible == false) {
					// 表示中でなければ飛ばす
					continue;
				}
				var vecLayer:VectorLayer = layer as VectorLayer;
				for each(var feature:Feature in vecLayer.features)
				{
					objects.push(getObjectForServer(feature, false));
				}
			}
			var obj : Object = { };
			obj.layer = objects;
			return modJSONForServerCoordinates(com.adobe.serialization.json.JSON.encode(obj));
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】オブジェクトタイプを返す
		 * @param	feature	オブジェクトデータ
		 * @return	オブジェクトタイプ
		 */
		private function getObjectDataTypeForServer(feature:Feature):String
		{
			var type:String = "";
			if(feature is LabelFeature)	// Text
				type = "Point";
			else if (feature is PointFeature)	// Point
				type = "Point";
			else if(feature is LineStringFeature)	// Line
				type = "LineString";
			else if(feature is PolygonFeature)	// Polygon
				type = "Polygon";
			
			return type;
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】JSON文字列中の座標値表現を修正する
		 * @param	str	JSON（サーバ形式）　（座標値表現が不適切）
		 * @return	str	JSON（サーバ形式）　（座標値表現が適切）
		 */
		private function modJSONForServerCoordinates(str:String):String
		{
			var tmpStr:String = str;
			tmpStr = tmpStr.replace(/\["''/g, "[");
			tmpStr = tmpStr.replace(/''",/g, "],");
			tmpStr = tmpStr.replace(/,"''/g, ",[");
			tmpStr = tmpStr.replace(/''"\]/g, "]");
			//trace(str);
			//trace(tmpStr);
			return tmpStr;
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】uint型の色情報を文字列表現に変換する
		 * @param	hexColor	色情報　（16進）
		 * @return	色情報　（文字列で、RGBカンマ区切り）
		 */
		private function convertColorHex2RGB(hexColor:uint):String
		{
			var rgb_red:uint = (hexColor & 0xff0000) >> 16;
			var rgb_green:uint = (hexColor & 0xff00) >> 8;
			var rgb_blue:uint = (hexColor & 0xff);
			return rgb_red.toString() + "," + rgb_green.toString() + "," + rgb_blue.toString();
		}
		
		
		/* ---------------------------------------------------------------------- */
		/* 【サーバで使用している形式のJSON構造のための】　JSONからオブジェクトを作成 */
		/* サーバから取得したJSONは送った時と構造が変わっている点に注意！ */
		/* ---------------------------------------------------------------------- */
		
		/**
		 * 指定した情報をもとに複数のオブジェクトを描画します（サーバで使用している形式のJSON構造用）
		 * @param	objects	JSON（サーバ形式）
		 */
		public function setObjectsForServer(objects:String):void
		{
			objects = objects.replace(/&amp;quot;/g, "\\\"");
			var objArray:Array = com.adobe.serialization.json.JSON.decode(objects) as Array;
			for each(var obj:Object in objArray)
			{
				setObjectForServer(obj, false);
			}
		}

		/**
		 * 指定した情報をもとにオブジェクトを描画します（サーバで使用している形式のJSON構造用）
		 * @param	obj		
		 * @param	decode	
		 */
		public function setObjectForServer(obj:Object, decode:Boolean=true) : void
		{
			var data : Object;
			if (decode)
			{
				// JSON→Object
				data = com.adobe.serialization.json.JSON.decode(obj as String);
			}
			else
			{
				data = obj;
			}
			
			for each (var dataLayer:Object in data.layer) {
				switch(dataLayer.data.type)
				{
					case "symbol"://MARKER_TYPE:
						drawMarkerForServer(dataLayer);
						break;
					case "text"://LABEL_TYPE:
						drawTextForServer(dataLayer);
						break;
					case "string"://LINE_TYPE:
						drawLineStringForServer(dataLayer);
						break;
					case "polygon"://POLYGON_TYPE:
						drawPolygonForServer(dataLayer);
						break;
					/*
					case CIRCLE_TYPE:
						drawCircleForServer(dataLayer);
						break;
					*/
					default:
						break;
				}
			}
		}		
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】マーカーオブジェクトを描画します
		 * @param	obj	[ data, filename ]をもつObject
		 */
		public function drawMarkerForServer(obj : Object) : void
		{
			// 指定した名前のレイヤーを取得
			// var layer : VectorLayer = getVectorLayer(obj.data.layerName);
			var layer : VectorLayer = getVectorLayer(Constant.DRAWING_LAYER_NAME);
			
			// 外観の設定
			var style:Style = new Style();
			style.name = getStyleId(MARKER_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			// スタイル設定
			{
				var scale:Number = 1;	// default
				var heading:Number = 0;	// default
				var href:String = "";	// default
				if (obj.data.style.IconStyle) {
					// scale
					if (obj.data.style.IconStyle.scale) {
						scale = obj.data.style.IconStyle.scale;
					}
					else {
						//scale = 1;	// default
					}
					// heading
					if (obj.data.style.IconStyle.heading) {
						heading = obj.data.style.IconStyle.heading;
					}
					else {
						//heading = 0;	// default
					}
					// href
					if (obj.data.style.IconStyle.href) {
						href = obj.data.style.IconStyle.href;
					}
					else {
						//href = "";	// default
					}
				}
				//var cMarker:CustomMarker = new CustomMarker(href);
				// リモート接続のときはproxy設定
				var proxy:String = null;
				if (Security.sandboxType == Security.REMOTE) {
					proxy = Constant.getFullProxyURL();
				}
				var cMarker:ExCustomMarker = new ExCustomMarker(href, 1, 0.5, "fraction", 0.5, "fraction", proxy);
				rule.symbolizers.push(new PointSymbolizer(cMarker));
			}
			style.rules.push(rule);
			
			// 座標値を整形
			var tmpCoordinate:String = obj.data.geometry.coordinates;
			var coordinatesArray:Array = createCoordinatesArrayForServer(tmpCoordinate);

			// インスタンス作成
			var pt:Point = new Point(coordinatesArray[0], coordinatesArray[1], DISPLAY_PROJECTION);
			var marker:PointFeature = new PointFeature(pt, null/*obj.attributes*/, style);
			marker.layer = layer;
			marker.layer.scaleX = 1;
			marker.layer.scaleY = 1;

			// 属性値セット
			if (obj.data.name) {
//				marker.name = obj.data.name;
				marker.attributes.name = obj.data.name;
			}
			if (obj.data.description) {
				marker.attributes.description = obj.data.description;
			}

			layer.addFeature(marker);
			map.addLayer(layer);
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】テキストオブジェクトを描画します
		 * @param	obj	[ data, filename ]をもつObject
		 */
		public function drawTextForServer(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
			//var layer : VectorLayer = getVectorLayer(obj.data.layerName);
			var layer : VectorLayer = getVectorLayer(Constant.DRAWING_LAYER_NAME);
			
			// 外観の設定
			var style:Style = new Style();
			style.name = getStyleId(LABEL_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			// スタイル設定
			{
				// font
				var color:Number = 0;	// default
				var size:Number = 12;	// default
				var opacity:Number = 1;
				if (obj.data.style.LabelStyle) {
					// color
					if (obj.data.style.LabelStyle.color) {
						var colorStr:String = obj.data.style.LabelStyle.color;
						color = convertColorToUint(colorStr);
						opacity = (parseInt(colorStr.substr(0, 2), 16) / 255);
					}
					else {
						//color = 0;	// default
					}
					// scale = size ?
					if (obj.data.style.LabelStyle.scale) {
						size = parseFloat(obj.data.style.LabelStyle.scale) * 10.0;
						// アップロード時の値が12、ダウンロード時の値が1.2だった -> ここで10倍してみた
					}
					else {
						//size = 12;	// default
					}
				}
				var font:Font = new Font(size, color, opacity);
				font.size = size;

				// halo
				var colorHalo:Number = 16777215;	// default ffffff
				//var opacityHalo:Number = 1;
				// TODO Textのhalo設定
				/*
				if (obj.data.style.*****Style) {
					// color
					if (obj.data.style.*****Style.color) {
						colorHalo = convertColorToUint(obj.data.style.*****Style.color);
					}
					else {
						//colorHalo = 16777215;	// default
					}
				}
				*/
				var halo:Halo = new Halo(colorHalo);
				
				//rule.symbolizers.push(new TextSymbolizer(null/*propertyName*/, font, halo));
				rule.symbolizers.push(new TextSymbolizer(null/*propertyName*/, font, null));
			}
			style.rules.push(rule);
			
			// 座標値を整形
			var tmpCoordinate:String = obj.data.geometry.coordinates;
			var coordinatesArray:Array = createCoordinatesArrayForServer(tmpCoordinate);

			// インスタンス作成
			var pt:Point = new Point(coordinatesArray[0], coordinatesArray[1], DISPLAY_PROJECTION);
			var label:LabelFeature = new LabelFeature(pt/*, obj.attributes*/);
			label.text = obj.data.name;
			label.style = style;
			label.layer = layer;
			label.layer.scaleX = 1;
			label.layer.scaleY = 1;

			// 属性値セット
			if (obj.data.name) {
//				label.name = obj.data.name;
				label.attributes.name = obj.data.name;
				label.text = obj.data.name;
			}
			if (obj.data.description) {
				label.attributes.description = obj.data.description;
			}

			layer.addFeature(label);
			map.addLayer(layer);
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】ラインオブジェクトを描画します
		 * @param	obj	[ data, filename ]をもつObject
		 */
		public function drawLineStringForServer(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
//			var layer : VectorLayer = getVectorLayer(obj.data.layerName);
			var layer : VectorLayer = getVectorLayer(Constant.DRAWING_LAYER_NAME);
			
			var style:Style = new Style();
			style.name = getStyleId(LINE_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			// スタイル設定 stroke
			{
				var color:uint = 0;		// default
				var width:Number = 3;	// default
				var opacity:Number = 1;
				if (obj.data.style.LineStyle) {
					// color
					if (obj.data.style.LineStyle.color) {
						var colorStr:String = obj.data.style.LineStyle.color;
						color = convertColorToUint(colorStr);
						//opacity = (parseInt(colorStr.substr(0, 2), 16) / 255);
					}
					else {
						//color = 0;	// default
					}
					// width
					if (obj.data.style.LineStyle.width) {
						width = obj.data.style.LineStyle.width;
					}
					else {
						//width = 3;	// default
					}
				}
				var stroke:Stroke = new Stroke(color, width, opacity);
				rule.symbolizers.push(new LineSymbolizer(stroke));
			}
			style.rules.push(rule);
			
			// 座標値を整形
			var tmpCoordinate:String = obj.data.geometry.coordinates;
			var coordinatesArray:Array = createCoordinatesArrayForServer(tmpCoordinate);
			
			// インスタンス作成
			var geom:LineString = new LineString(Vector.<Number>(coordinatesArray), DISPLAY_PROJECTION);
			var ls:LineStringFeature = new LineStringFeature(geom, null/*obj.attributes*/, style, true);

			// 属性値セット
			if (obj.data.name) {
//				ls.name = obj.data.name;
				ls.attributes.name = obj.data.name;
			}
			if (obj.data.description) {
				ls.attributes.description = obj.data.description;
			}

			layer.addFeature(ls);
			map.addLayer(layer);
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】ポリゴンオブジェクトを描画します
		 * @param	obj	[ data, filename ]をもつObject
		 */
		public function drawPolygonForServer(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
//			var layer : VectorLayer = getVectorLayer(obj.data.layerName);
			var layer : VectorLayer = getVectorLayer(Constant.DRAWING_LAYER_NAME);
			
			var style:Style = new Style();
			style.name = getStyleId(POLYGON_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			// スタイル設定
			{
				// stroke
				var color:uint = 0;		// default
				var width:Number = 3;	// default
				var opacity:Number = 1;	// default
				if (obj.data.style.LineStyle) {
					// color
					if (obj.data.style.LineStyle.color) {
						var colorStr:String = obj.data.style.LineStyle.color;
						color = convertColorToUint(colorStr);
						opacity = (parseInt(colorStr.substr(0, 2), 16) / 255);
					}
					else {
						//color = 0;	// default
					}
					// width
					if (obj.data.style.LineStyle.width) {
						width = obj.data.style.LineStyle.width;
					}
					else {
						//width = 3;	// default
					}
				}
				var stroke:Stroke = new Stroke(color, width, opacity);
				
				// fill
				var colorFill:uint = 0;	// default
				var opacityFill:Number = 1;	// default
				if (obj.data.style.PolyStyle) {
					// color
					if (obj.data.style.PolyStyle.color) {
						var colorFillStr:String = obj.data.style.PolyStyle.color;
						colorFill = convertColorToUint(colorFillStr);
						opacityFill = (parseInt(colorFillStr.substr(0, 2), 16) / 255);
					}
					else {
						//colorFill = 0;	// default
					}
				}
				var fill:SolidFill = new SolidFill(colorFill, opacityFill);

				rule.symbolizers.push(new PolygonSymbolizer(fill, stroke));
			}
			style.rules.push(rule);

			// 座標値を整形
			var tmpCoordinate:String = obj.data.geometry.coordinates;
			var coordinatesArray:Array = createCoordinatesArrayForServer(tmpCoordinate);

			// インスタンス作成
			var lRing : LinearRing = new LinearRing(Vector.<Number>(coordinatesArray), DISPLAY_PROJECTION);
			var rings : Vector.<Geometry> = new Vector.<Geometry>();
			rings.push(lRing);
			var plygon:Polygon = new Polygon(rings, DISPLAY_PROJECTION);
			var plObj:PolygonFeature = new PolygonFeature(plygon, null/*obj.attributes*/, style);

			// 属性値セット
			if (obj.data.name) {
//				plObj.name = obj.data.name;
				plObj.attributes.name = obj.data.name;
			}
			if (obj.data.description) {
				plObj.attributes.description = obj.data.description;
			}

			layer.addFeature(plObj);
			map.addLayer(layer);
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】円オブジェクトを描画します
		 * @param	data	[ layer, type, style, geom, radius, attributes ]をもつObject
		 */
		/*
		public function drawCircleForServer(obj:Object) : void
		{
			// 指定した名前のレイヤーを取得
			var layer : VectorLayer = getVectorLayer(obj.layer);
			
			var style:Style = new Style();
			style.name = getStyleId(CIRCLE_STYLE_ID_BASE);
			var rule:Rule = new Rule();
			for each (var symb:Object in obj.style)
			{
				rule.symbolizers.push(createSymbolizer(symb));
			}
			style.rules.push(rule);
			// インスタンス作成
			var cp:Point = new Point(obj.geom[0], obj.geom[1]);
			cp.transform(INTERNAL_PROJECTION);
			var handle:DrawCircleHandler = new DrawCircleHandler();
			var circle : Polygon = handle.createRegularPolygon(cp, obj.radius, 73, 0);
			circle.projection = cp.projection;
			var circleObj:PolygonFeature = new PolygonFeature(circle, obj.attributes, style);
			layer.addFeature(circleObj);
			map.addLayer(layer);
		}
		*/
		
		/**
		 * 座標値を分割する
		 * @param	coordinates
		 * @return
		 */
		private function createCoordinatesArrayForServer(coordinates:String):Array
		{
			var str:String = coordinates;
			return str.split(",");
		}
		
		/**
		 * 【サーバで使用している形式のJSON構造のための】16進8桁の色情報をuintに変換する
		 * @param	hexColor	色情報　（16進8桁）
		 * @return	色情報　uint
		 */
		private function convertColorToUint(color:String):int
		//private function convertColorToUint(color:String):Array
		{
			// 8桁、書式は"AABBGGRR"
			// AAはアルファ、RGBは逆順で入っている
			// 
			// これを、以下の順に変更して配列に格納する
			// [AA][RR][GG][BB]
			/*
			var colorArray:Array = new Array();
			var clr:String = color;

			// アルファ
			var alpha:String = clr.substr(0, 2);
			colorArray.push(alpha);
			// RGB -> 逆順に格納（＝正しい順に戻す）
			var blue:String = clr.substr(2, 2);
			var green:String = clr.substr(4, 2);
			var red:String = clr.substr(6, 2);
			colorArray.push(red);
			colorArray.push(green);
			colorArray.push(blue);
			
			return colorArray;
			*/

			var clr:String = color;
			var blue:String = clr.substr(2, 2);
			var green:String = clr.substr(4, 2);
			var red:String = clr.substr(6, 2);
			// 正しい順で再連結
			clr = red + green + blue;
			// 16進から10進に変換
			return parseInt(clr, 16);
		}
		
	}
}
package jp.cyberjapan.webtis.format 
{
	import mx.controls.Alert;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.feature.MultiLineStringFeature;
	import org.openscales.core.feature.MultiPointFeature;
	import org.openscales.core.feature.MultiPolygonFeature;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.core.format.Format;
	import org.openscales.core.style.fill.SolidFill;
	import org.openscales.core.style.font.Font;
	import org.openscales.core.style.marker.WellKnownMarker;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.stroke.Stroke;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.symbolizer.LineSymbolizer;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.core.style.symbolizer.PolygonSymbolizer;
	import org.openscales.core.style.symbolizer.TextSymbolizer;
	import org.openscales.geometry.Collection;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.LinearRing;
	import org.openscales.geometry.LineString;
	import org.openscales.geometry.MultiLineString;
	import org.openscales.geometry.MultiPoint;
	import org.openscales.geometry.MultiPolygon;
	import org.openscales.geometry.Point;
	import org.openscales.geometry.Polygon;
	
	/**
	 * GeoJSONの読み書きを行うクラス。OpenLayersのGeoJSONクラスを移植する。
	 * @author T.Nakayama
	 */
	public class GeoJSONFormat extends Format 
	{
		/**
		 * 2次元を超える次元のデータを無視するかどうか
		 */
		protected const ignoreExtraDims:Boolean = false;
		protected var defaultStyle:Style = null;

		/**
		 * コンストラクタ
		 */
		public function GeoJSONFormat() 
		{
			super();
		}

		/**
		 * JSONを解析
		 * @param	data JSONデータ
		 * @return 解析結果のオブジェクト
		 */
		public override function read(data:Object):Object
		{
			if (!data || !data.type) {
				Alert.show("Bad JSON : " + data);
				return null;
			}
			var results:Object = new Vector.<Feature>;
			var type:String = getJSONType(data.type);
			switch (type) {
			case "Geometry":
				results = parseGeometry(data);
				break;
			case "Feature":
				var feature:Feature = parseFeature(data);
				if (feature != null) {
					results.push(feature);
				}
				break;
			case "FeatureCollection":
				if (!data.features || !(data.features is Array)) {
					return null;
				}
				var features:Array = data.features as Array;
				for (var i:int = 0; i < features.length; i++) {
					var f:Feature = parseFeature(features[i]);
					if (f == null) {
						return null;
					}
					results.push(f);
				}
				break;
			}
			return results;
		}

		protected function getJSONType(type:String):String
		{
			var jsonType:String = null;
			switch (type) {
			case "FeatureCollection":
				jsonType = "FeatureCollection";
				break;
			case "Point":
			case "MultiPoint":
			case "LineString":
			case "MultiLineString":
			case "Polygon":
			case "MultiPolygon":
			case "Box":
			case "GeometryCollection":
				jsonType = "Geometry";
				break;
			case "Feature":
				jsonType = "Feature";
				break;
			default:
				break;
			}
			return jsonType;
		}

		/**
		 * featureを解析してFeatureオブジェクトを生成する。
		 * 基本OpenLayersの移植だが、構造の違いにより、次の処置を行う。
		 * <ol>
		 *   <li>bboxの解析はやらない（featureにboundsを持っていないため）。</li>
		 *   <li>idはfeatureのnameプロパティに入れる（featureにidを持っていないため）。</li>
		 * </ol>
		 * @param	obj featureを示すJSONオブジェクト
		 * @return OpenLayersのFeatureオブジェクト
		 */
		protected function parseFeature(obj:Object):Feature
		{
			var feature:Feature = null;
			var geometry:Geometry = parseGeometry(obj.geometry);
			if (geometry is Point) {
				feature = new PointFeature(geometry as Point);
			} else if (geometry is LineString || geometry is LinearRing) {
				feature = new LineStringFeature(geometry as LineString);
			} else if (geometry is MultiPoint) {
				feature = new MultiPointFeature(geometry as MultiPoint);
			} else if (geometry is MultiLineString) {
				feature = new MultiLineStringFeature(geometry as MultiLineString);
			} else if (geometry is Polygon) {
				feature = new PolygonFeature(geometry as Polygon);
			} else if (geometry is MultiPolygon) {
				feature = new MultiPolygonFeature(geometry as MultiPolygon);
			} else if (geometry is Collection) {
				feature = new Feature(geometry);
			}
			if (obj.properties) {
				feature.attributes = obj.properties;
			}
			if (obj.id) {
				feature.name = obj.id;
			}
			return feature;
		}

		protected function parseGeometry(obj:Object):Geometry
		{
			if (!obj || !obj.type) {
				return null;
			}
			var geometry:Geometry = null;
			var isCollection:Boolean = false;
			if (obj.type == "GeometryCollection") {
				if (!(obj.geometries is Array)) {
					Alert.show("GeometryCollection must have geometries array: " + obj);
					return null;
				}
				var geometries:Array = obj.geometries as Array;
				var components:Vector.<Geometry> = new Vector.<Geometry>();
				for each (var geomObj:Object in geometries) {
					var geom:Geometry = parseGeometry(geomObj);
					if (geom == null) {
						return null;
					}
					components.push(geom);
				}
				geometry = new Collection(components);
				isCollection = true;
			} else {
				if (!(obj.coordinates is Array)) {
					Alert.show("Geometry must have coordinates array: " + obj);
					return null;
				}
				geometry = parseCoords(obj.type, obj.coordinates);
				if (geometry == null) {
					return null;
				}
				geometry.projection = this.internalProjection;
				if (this.internalProjection && this.externalProjection) {
					geometry.transform(this.externalProjection);
				}
			}
			return geometry;
		}

		protected function parseCoords(type:String, obj:Object):Geometry {
			if (!obj || !(obj is Array)) {
				return null;
			}
			var array:Array = obj as Array;
			if (type == "Point") {
				return parsePointCoords(array);
			} else if (type == "MultiPoint") {
				return parseMultiPointCoords(array);
			} else if (type == "LineString") {
				return parseLineStringCoords(array);
			} else if (type == "MultiLineString") {
				return parseMultiLineStringCoords(array);
			} else if (type == "Polygon") {
				return parsePolygonCoords(array);
			} else if (type == "MultiPolygon") {
				return parseMultiPolygonCoords(array);
			} else if (type == "Box") {
				return parseBoxCoords(array);
			} else {
				return null;
			}
		}

		protected function parsePointCoords(obj:Object):Point
		{
			if (!isArray(obj)) {
				return null;
			}
			var array:Array = obj as Array;
			if (!this.ignoreExtraDims && array.length != 2) {
				return null;
			}
			return new Point(array[0], array[1]);
		}

		protected function parseMultiPointCoords(obj:Object):MultiPoint
		{
			if (!isArray(obj)) {
				return null;
			}
			var array:Array = obj as Array;
			var geometry:MultiPoint = new MultiPoint();
			for each (var element:Object in array) {
				var point:Point = parsePointCoords(element);
				if (point == null) {
					return null;
				}
				geometry.addComponent(point);
			}
			return geometry;
		}

		protected function parseLineStringCoords(obj:Object):LineString
		{
			var mp:MultiPoint = parseMultiPointCoords(obj);
			if (mp == null) {
				return null;
			}
			var geometry:LineString = new LineString(mp.components);
			return geometry;
		}
		
		protected function parseMultiLineStringCoords(obj:Object):MultiLineString
		{
			if (!isArray(obj)) {
				return null;
			}
			var array:Array = obj as Array;
			var geometry:MultiLineString = new MultiLineString();
			for each (var element:Object in array) {
				var ls:LineString = parseLineStringCoords(element);
				if (ls == null) {
					return null;
				}
				geometry.addLineString(ls);
			}
			return geometry;
		}

		protected function parsePolygonCoords(obj:Object):Polygon
		{
			if (!isArray(obj)) {
				return null;
			}
			var array:Array = obj as Array;
			var rings:Vector.<Geometry> = new Vector.<Geometry>();
			for each (var element:Object in array) {
				var ls:LineString = parseLineStringCoords(element);
				if (ls == null) {
					return null;
				}
				var lr:LinearRing = new LinearRing(ls.components);
				rings.push(lr);
			}
			var geometry:Polygon = new Polygon(rings);
			return geometry;
		}
		
		protected function parseMultiPolygonCoords(obj:Object):MultiPolygon
		{
			if (!isArray(obj)) {
				return null;
			}
			var array:Array = obj as Array;
			var geometry:MultiPolygon = new MultiPolygon();
			for each (var element:Object in array) {
				var p:Polygon = parsePolygonCoords(element);
				if (p == null) {
					return null;
				}
				geometry.addPolygon(p);
			}
			return geometry;
		}
		
		protected function parseBoxCoords(obj:Object):LinearRing
		{
			if (!isArray(obj)) {
				return null;
			}
			var array:Array = obj as Array;
			if (array.length != 2) {
				return null;
			}
			if (!(array[0] is Array) || !(array[1] is Array)) {
				return null;
			}
			var southwest:Array = array[0] as Array;
			var northeast:Array = array[1] as Array;
			var south:Number = southwest[0];
			var west:Number = southwest[1];
			var north:Number = northeast[0];
			var east:Number = northeast[1];
			var geometry:LinearRing = new LinearRing();
			geometry.addPoint(south, west);
			geometry.addPoint(north, west);
			geometry.addPoint(north, east);
			geometry.addPoint(south, east);
			geometry.addPoint(south, west);
			return geometry;
		}
		
		private function isArray(obj:Object):Boolean
		{
			return obj && (obj is Array);
		}
	}
}
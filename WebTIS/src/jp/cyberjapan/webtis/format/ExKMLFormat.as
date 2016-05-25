package jp.cyberjapan.webtis.format 
{
	import flash.xml.XMLDocument;
	import jp.cyberjapan.webtis.style.marker.ExCustomMarker;
	import org.openscales.core.basetypes.maps.HashMap;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.LabelFeature;
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.feature.MultiLineStringFeature;
	import org.openscales.core.feature.MultiPointFeature;
	import org.openscales.core.feature.MultiPolygonFeature;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.core.style.fill.Fill;
	import org.openscales.core.style.fill.SolidFill;
	import org.openscales.core.style.font.Font;
	import org.openscales.core.style.marker.ArrowMarker;
	import org.openscales.core.style.marker.CustomMarker;
	import org.openscales.core.style.marker.Marker;
	import org.openscales.core.style.marker.WellKnownMarker;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.stroke.Stroke;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.symbolizer.ArrowSymbolizer;
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

	/**
	 * ...
	 * @author minami.kobayashi
	 */
	public class ExKMLFormat extends ExKMLFormatBase 
	{
		private namespace opengis="http://www.opengis.net/kml/2.2";
		private namespace google = "http://earth.google.com/kml/2.0";
		
		protected static const GXNS:Namespace = new Namespace("gx", "http://www.google.com/kml/ext/2.2");
		protected static const KMLNS:Namespace = new Namespace("kml", "http://www.opengis.net/kml/2.2");
		protected static const ATOMNS:Namespace = new Namespace("atom", "http://www.w3.org/2005/Atom");
		
		protected static const DEFCOLOR_STROKE:Number = 0x888888;
		protected static const DEFCOLOR_POLY:Number = 0x888888;
		/**
		 * XML宣言
		 */
		public static const XML_DECLARATION:String = '<?xml version="1.0" encoding="UTF-8" ?>\n';
		private var _docName:String;
		
		public function ExKMLFormat(docName:String=null) 
		{
			super();
			_docName = docName;
		}

		override public function read(data:Object):Object 
		{
			var dataXML:XML = data as XML;

			use namespace google;
			use namespace opengis;
			
			// Ex改修 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			// StyleMap対応
			var styleMaps:XMLList = dataXML..StyleMap;
			for each (var styleMap:XML in styleMaps) 
			{
				var id:String = "";
				if (styleMap.@id == "")
					continue;
				id = styleMap.@id.toString();
				// StyleMapのnormalキーに対応するstyleUrlと一致するStyleをコピー
				var styleUrl:String = styleMap.Pair.(key == "normal").styleUrl;
				var nStyle:XMLList = dataXML..Style.("#" + @id == styleUrl).copy();
				// idをStyleMapのものに差し替えてStyleノードとして追加する
				nStyle.@id = id;
				dataXML.Document.appendChild(nStyle);
			}
			// ここまで <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			
			if(!this.userDefinedStyle)
			{
				var styles:XMLList = dataXML..Style;
				loadStyles(styles.copy());
			}
			
			var placemarks:XMLList = dataXML..Placemark;
			var groundOverlays:XMLList = dataXML..GroundOverlay;
			var features:Vector.<Feature> = new Vector.<Feature>();
			return features.concat(readPlacemarks(placemarks),readGroundOverlay(groundOverlays));
			//return readPlacemarks(placemarks);
			//return super.read(data);
		}
		
		override public function getStyle(style:XML):Style
		{
			// >>>Ex改修：>>>>>>>>>>>
			var mstyle:XML = style.copy();
			//XML styleを分解し、色設定がない場合は設定する。
			if (style == null)
			{
				return null;
			} else {
				var styleList:XMLList = mstyle.children();
				var numberOfStyles:uint = styleList.length();
				var colorxml:XML;
				var i:uint;
				for (i = 0; i < numberOfStyles; i++) {
					var xmlstr:String = null;
					if (styleList[i].localName() == "PolyStyle") 
					{
						var polyColor:XMLList = styleList[i]..*::color;
						if(polyColor.length() == 0) 
						{
							colorxml = buildColorNode(DEFCOLOR_POLY , 0.5);
							styleList[i].appendChild(colorxml);
						}
					}
					else if(styleList[i].localName() == "LineStyle") 
					{
						var lineColor:XMLList = styleList[i]..*::color;
						if(lineColor.length() == 0) 
						{
							colorxml = buildColorNode(DEFCOLOR_STROKE ,1);
							styleList[i].appendChild(colorxml);
						}
					}
				}
			}
			// >>>ここまで>>>>>>>>>>>>>>>>>>
//			var result:Style = super.getStyle(style);
			var result:Style = super.getStyle(mstyle);

			return result;
		}
		
		override public function readPlacemarks(placemarks:XMLList):Vector.<Feature> 
		{
			var features:Vector.<Feature> = super.readPlacemarks(placemarks);
			// Ex改修箇所 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			for each (var feature:Feature in features) 
			{
				if (feature is PolygonFeature)
				{
					// 始点==終点だったら終点を削除する
					var poly:Polygon = (feature as PolygonFeature).polygon;
					var geom:Vector.<Geometry> = poly.getcomponentsClone();
					var lRing:LinearRing = geom[0] as LinearRing;
					var sp:Point = lRing.getPointAt(0);
					var ep:Point = lRing.getLastPoint();
					if (sp.equals(ep))
					{
						// MultiPointの関数：始点は終点されないか？
						lRing.removePoint(ep);
						poly.components = geom;
					}
					
					// 不要なSymbolizerを削除
					//for each(var symbolizer:Symbolizer in feature.style.rules[0].symbolizers)
					var symbolizers:Vector.<Symbolizer> = feature.style.rules[0].symbolizers;
					var symbnum:uint = symbolizers.length;
					for (var i:uint = 0; i < symbolizers.length; i++)
					{
						if ((symbolizers[i] is PolygonSymbolizer))
						{
							// PolygonSymbolizerのみ取り出す→再設定
							feature.style.rules[0].symbolizers = symbolizers.splice(i, 1);
						//	break;
						}
					}
				}
			}
			// ここまで　<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			return features;
		}
		
		/**
		 * 【Ex改修版】※ただし親クラスのは関数名がそもそもミスタイプだと思われるのでオーバーライドせずに新規作成
		 * 空のKMLデータを作成する
		 * ・名前空間の接頭辞はkmlでなくデフォルトに
		 * @param	kmlName	kml.Document.nameに指定する値
		 */
		public function writeEmptyKmlFile(kmlName:String):Object
		{
			var kmlns:Namespace = new Namespace("http://www.opengis.net/kml/2.2");
			var kmlFile:XML =
				<kml xmlns="http://www.opengis.net/kml/2.2">
					<Document>
						<name>{kmlName}</name>
					</Document>
				</kml>;
			kmlFile.addNamespace(GXNS);
			kmlFile.addNamespace(KMLNS);
			kmlFile.addNamespace(ATOMNS);
			//kmlFile.setNamespace(kmlns);
			return kmlFile; 
		}

		/**
		 * 【Ex改修版】
		 * ・先頭にXML宣言を挿入
		 * ・<Placemark>は<Folder>の入れ子に
		 * @param	features
		 * @return
		 */
		override public function write(features:Object):Object
		{
			var i:uint;
			var kmlns:Namespace = new Namespace("http://www.opengis.net/kml/2.2");
			var kmlFile:XML = 
					//<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:xal="urn:oasis:names:tc:ciq:xsdschema:xAL:2.0">
					<kml xmlns="http://www.opengis.net/kml/2.2"></kml>;
					//<kml></kml>;
			kmlFile.addNamespace(GXNS);
			kmlFile.addNamespace(KMLNS);
			kmlFile.addNamespace(ATOMNS);
			//kmlFile.setNamespace("http://www.opengis.net/kml/2.2");
			var listOfFeatures:Vector.<Feature> = features as Vector.<Feature>;
			var numberOfFeat:uint = listOfFeatures.length;
			var layerName:String = "";
			var visible:uint = 1;
			//var filename:String = "export.kml";
			if (numberOfFeat > 0 && listOfFeatures[0].layer)
			{
				layerName = listOfFeatures[0].layer.displayedName;
				if (!_docName)
				{
					_docName = layerName;
				}
				visible = uint(listOfFeatures[0].layer.visible);
				//filename = layerName + ".kml";
				//var name:XML = new XML("<name>"+listOfFeatures[0].layer.displayedName+"</name>");
				//doc.appendChild(name);
			}
			var doc:XML =
					<Document>
						<name>{_docName}</name>
					</Document>; 
			kmlFile.appendChild(doc);
			
			// gather Style list
			var styleHashMap:HashMap = new HashMap();
			for(i = 0; i < numberOfFeat; ++i)
			{
				if(listOfFeatures[i].style)
				{
					styleHashMap.put("#"+(listOfFeatures[i] as Feature).style.name, (listOfFeatures[i] as Feature).style);
				}
			}
			
			//build the style nodes first
			var keysArray:Array = styleHashMap.getKeys();
			var keyLength:Number = keysArray.length;
			for(i = 0; i < keyLength; ++i)
			{
				var style:XML = this.buildStyleNode(styleHashMap.getValue(keysArray[i]));
				if (style)
					doc.appendChild(style);
			}

			// Folderタグでさらに囲む
			var folder:XML = 
				<Folder>
					<name>{layerName}</name>
					<visibility>{visible}</visibility>
					<open>1</open>
				</Folder>;
			
			//build the placemarks
			for (i = 0; i < numberOfFeat; i++)
			{
				folder.appendChild(this.buildPlacemarkNode(listOfFeatures[i],i));
			}
			doc.appendChild(folder);
			
			//return kmlFile; 
			var result:XMLDocument = new XMLDocument(kmlFile.toXMLString());
			// XML宣言を先頭に挿入
			result.xmlDecl = ExKMLFormat.XML_DECLARATION;
			return result;
		}
		
		/**
		 * @return a kml placemark
		 * @call buildPolygonNode
		 * @call buildCoordsAsString 
		 */
		override protected function buildPlacemarkNode(feature:Feature,i:uint):XML
		{
			var lineNode:XML;
			var pointNode:XML;
			var extendedData:XML;
			
			var placemark:XML = new XML("<Placemark></Placemark>");
			var att:Object = feature.attributes;
			
			placemark.appendChild(new XML("<id>" + feature.name + "</id>"));
			if (att.hasOwnProperty("name") && att["name"] != "") {
				placemark.appendChild(new XML("<name>" + att["name"] + "</name>"));
			}
			else {
				//since we build the styles first, the feature will have an id for sure
				placemark.appendChild(new XML("<name>" + feature.name + "</name>"));
			}
			
			placemark.appendChild(new XML("<styleUrl>#" + feature.style.name + "</styleUrl>"));
			
			if (att.hasOwnProperty("description"))
				placemark.appendChild(new XML("<description><![CDATA[" + att["description"] + "]]></description>"));
			
			var coords:String;
			if(feature is LineStringFeature)
			{
				lineNode = new XML("<LineString></LineString>");
				var line:LineString = (feature as LineStringFeature).lineString;
				coords = this.buildCoordsAsString(line.getcomponentsClone());
				if(coords.length != 0)
					lineNode.appendChild(new XML("<coordinates>" + coords + "</coordinates>"));
				placemark.appendChild(lineNode);
			}
			else if(feature is PolygonFeature)
			{
				var poly:Polygon = (feature as PolygonFeature).polygon;
				// Ex改修箇所 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				//　始点と終点を一致させるために始点を最後尾にコピー
				var geom:Vector.<Geometry> = poly.getcomponentsClone();
				var lRing:LinearRing = geom[0] as LinearRing;
				var sp:Point = lRing.getPointAt(0);
				var ep:Point = lRing.getLastPoint();
				if (!sp.equals(ep))
				{
					lRing.addPoint(sp.x, sp.y);
					poly.components = geom;
				}
				// ここまで <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
				placemark.appendChild(this.buildPolygonNode(poly));
			}
			else if(feature is PointFeature)
			{
				pointNode = new XML("<Point></Point>");
				var point:Point = (feature as PointFeature).point;
				pointNode.appendChild(new XML("<coordinates>" + point.x + "," + point.y + "</coordinates>"));
				placemark.appendChild(pointNode);
			}
			else if(feature is MultiPointFeature || feature is MultiLineStringFeature || feature is MultiPolygonFeature)
			{
				var multiGNode:XML = new XML("<MultiGeometry></MultiGeometry>");
				if(feature is MultiPointFeature)
				{
					var points:Vector.<Point> = (feature as MultiPointFeature).points.toVertices();
					var numberOfPoints:uint = points.length;
					for(i = 0; i < numberOfPoints; i++)
					{
						pointNode =	new XML("<Point></Point>");
						pointNode.appendChild(new XML("<coordinates>" + point.x + "," + point.y + "</coordinates>"));
						multiGNode.appendChild(pointNode);
						
					}
				}
				else if (feature is MultiLineStringFeature)
				{
					var lines:Vector.<Geometry> = (feature as MultiLineStringFeature).lineStrings.getcomponentsClone();
					var numberOfLines:uint = lines.length;
					for(i = 0; i < numberOfLines; i++)
					{
						var Line:LineString = lines[i] as LineString;
						coords = this.buildCoordsAsString(Line.getcomponentsClone());
						lineNode =	new XML("<LineString></LineString>");
						lineNode.appendChild(new XML("<coordinates>" + coords + "</coordinates>"));
						multiGNode.appendChild(lineNode);
						
					}	
				}
				else//multiPolygon
				{
					
				}
				placemark.appendChild(multiGNode);
			}
			
			//Donnees attributaires
			var data:XML;
			var displayName:XML;
			var value:XML;
			if(feature.layer || feature is LabelFeature) {
				extendedData =	new XML("<ExtendedData></ExtendedData>");
				if(feature is LabelFeature) {
					var l:Point = (feature as LabelFeature).geometry as Point;
					data = new XML("<Data name=\"label\"></Data>");
					value = new XML("<value>" + (feature as LabelFeature).text + "</value>");
					data.appendChild(value);
					extendedData.appendChild(data);
				}
				if(feature.layer) {
					var j:uint = feature.layer.attributesId.length;
					if(j>0 || feature is LabelFeature) {
						
						for(var i:uint = 0 ;i<j;++i) {
							var key:String = feature.layer.attributesId[i];
							//everything except name and description
							if(excludeFromExtendedData.indexOf(key) <0 ) {
								data = new XML("<Data name=\"attribute" + i + "\"></Data>");
								displayName = new XML("<displayName>" + key + "</displayName>");
								value = new XML("<value>" + att[key] + "</value>");
								data.appendChild(displayName);
								data.appendChild(value);
								extendedData.appendChild(data);
							}
						}
					}
				}
				placemark.appendChild(extendedData);
			}
			
			return placemark;
		}
		
// 20130807 継承元変更のため、コピーしていたFunctionの削除
//		private function buildStyleNode(style:Style):XML
//		private function buildColorNode(color:uint,opacity:Number):XML
		
		public function get docName():String 
		{
			return _docName;
		}
		
		public function set docName(value:String):void 
		{
			_docName = value;
		}
	}

}
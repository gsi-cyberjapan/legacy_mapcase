package jp.cyberjapan.webtis.control.exif 
{
	import flash.utils.ByteArray;
	import jp.cyberjapan.webtis.layer.ExifLayer;
	import jp.shichiseki.exif.ExifInfo;
	import jp.shichiseki.exif.IFDEntry;
	import mx.controls.Alert;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import org.openscales.core.style.marker.CustomMarker;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.Point;
	import org.openscales.proj4as.ProjProjection;

	/**
	 * ...
	 * @author T.Nakayama
	 */
	public class ExifDataPlotter 
	{
		private var _layerName:String = null;
		private var _map:Map = null;
		private var _style:Style = null;

		public function ExifDataPlotter(map:Map):void
		{
			this._map = map;
			this._layerName = "ExifLayer";
			this._style = new Style();
			this._style.rules.push(new Rule());
			this._style.rules[0].symbolizers.push(
				new PointSymbolizer(
//					new WellKnownMarker("square", null, null, 12, 1, 0)
					new CustomMarker()
				)
			);
		}

		public function get layerName():String
		{
			return this._layerName;
		}

		public function plot(name:String, data:Object, exif:ExifInfo):void
		{
			if (!exif.ifds) {
				Alert.show("IFDを取得できませんでした。");
				return;
			}
			if (!exif.ifds.gps) {
				Alert.show("GPS情報を取得できませんでした。");
				return;
			}
			var latref:IFDEntry = exif.ifds.gps.getEntryByTagID(0x0001);
			var lat:IFDEntry = exif.ifds.gps.getEntryByTagID(0x0002);
			var lonref:IFDEntry = exif.ifds.gps.getEntryByTagID(0x0003);
			var lon:IFDEntry = exif.ifds.gps.getEntryByTagID(0x0004);
			if (!(latref && lat && lonref && lon)) {
				Alert.show("緯度経度情報を取得できませんでした。");
				return;
			}
			if (exif.thumbnailData == null) {
				Alert.show("サムネイルが取得できませんでした。");
				return;
			}

			// 必要に応じてレイヤー追加
			var layer:VectorLayer = this._map.getLayerByIdentifier(this._layerName) as ExifLayer;
			if (layer == null) {
				layer = new ExifLayer(this._layerName);
				layer.projection = "EPSG:4326";
				//layer.editable = true;
				this._map.addLayer(layer);
			}
			
			// プロット
			var latArray:Array = lat.data as Array;
			var lonArray:Array = lon.data as Array;
			var latValue:Number = (latArray[0] as Number) + (latArray[1] as Number) / 60 + (latArray[2] as Number) / 3600;
			var lonValue:Number = (lonArray[0] as Number) + (lonArray[1] as Number) / 60 + (lonArray[2] as Number) / 3600;
			if ("S" == (latref.data as String)) {
				latValue = latValue * -1;
			}
			if ("W" == (lonref.data as String)) {
				lonValue = lonValue * -1;
			}
//			Alert.show("緯度：" + latValue + "  経度：" + lonValue);
//			Alert.show(("南北" + latref.data as String) + "(" + latref.typeID + ")");
//			Alert.show(("東西" + lonref.data as String) + "(" + lonref.typeID + ")");
//			var point:Point = new org.openscales.geometry.Point(latValue, lonValue, this._map.projection);
//			layer.addFeature(new PointFeature(point,{'name':StringUtil.getCurrentDateTimeAsString()},this._style));
//			var feature:PointFeature = 	PointFeature.createPointFeature(
//				new Location(lonValue, latValue),
//				{ 'name':StringUtil.getCurrentDateTimeAsString() },
//				this._style
//			);
			var feature:ExifFeature = new ExifFeature(data, exif, new Point(lonValue, latValue, new ProjProjection("EPSG:4326")), null, this._style);
//			var feature:org.openscales.core.feature.Marker = new org.openscales.core.feature.Marker(new Point(lonValue, latValue));
			feature.name = name;
			layer.addFeature(feature);
			this._map.center = new Location(lonValue, latValue);
		}
		
	}

}
package jp.cyberjapan.webtis.feature
{
	import flash.display.DisplayObject;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.core.style.symbolizer.Symbolizer;
	import org.openscales.core.style.symbolizer.TextSymbolizer;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.MultiPoint;
	import org.openscales.geometry.Point;

	/**
	 * Feature used to draw a MultiPoint geometry on FeatureLayer
	 */
	public class GroundOverlayFeature extends Feature {
		private var maxExtent:Bounds;
		private var roNum:Number = 0;
		
		public function GroundOverlayFeature(geom:MultiPoint=null, ro:Number=0,data:Object=null, style:Style=null, isEditable:Boolean=false) {
			super(geom, data, style, isEditable);
			maxExtent = geom.bounds;
			roNum = ro;
		}

		public function get points():MultiPoint {
			return this.geometry as MultiPoint;
		}

		/**
		 * @inheritdoc
		 */
		override protected function acceptSymbolizer(symbolizer:Symbolizer):Boolean
		{
			if (symbolizer is PointSymbolizer || symbolizer is TextSymbolizer)
				return true;
			else
				return false;
		}
		
		/**
		 * @inheritdoc
		 */
		override protected function executeDrawing(symbolizer:Symbolizer):void {
			
			var x:Number;
			var y:Number;
			if(!this.layer || !this.layer.map) {
				return;
			}
			var resolution:Number = this.layer.map.resolution.value;
			this.x = 0;
			this.y = 0;
			
			var pt0:Point = this.points.componentByIndex(0) as Point;
			var pt1:Point = this.points.componentByIndex(1) as Point;
			
			var nx:Number = (pt0.x + pt1.x )/ 2;
			var ny:Number = (pt0.y + pt1.y )/ 2;

			var px0:Pixel = this.layer.getLayerPxForLastReloadedStateFromLocation(new Location(nx, ny, this.projection));			
			x = px0.x;
			y = px0.y;

			this.graphics.drawRect(x, y, 5, 5);
			this.graphics.endFill();

			if (symbolizer is PointSymbolizer) {
				var pointSymbolizer:PointSymbolizer = (symbolizer as PointSymbolizer);
				if (pointSymbolizer.graphic) {
					var render:DisplayObject = pointSymbolizer.graphic.getDisplayObject(this);
					render.x = x;
					render.y = y;
					var extent:Bounds = this.maxExtent.reprojectTo(this.layer.map.projection);
					var width:Number = extent.width / resolution;
					var height:Number = extent.height / resolution;
					render.width = width;
					render.height = height;
					render.rotation = 0 - roNum;			//rotationは反時計回り指定のため、0からマイナスする。
					this.addChild(render);
				}
				pointSymbolizer.geometry = maxExtent.toString();
			} else if (symbolizer is TextSymbolizer) {
				(symbolizer as TextSymbolizer).drawTextField(this);
			}

		}

		/**
		 * To obtain feature clone
		 * */
		override public function clone():Feature {
			var geometryClone:Geometry = this.geometry.clone();
			var GroundOverlayFeatureClone:GroundOverlayFeature = new GroundOverlayFeature(geometryClone as MultiPoint, roNum,null, this.style, this.isEditable);
			GroundOverlayFeatureClone._originGeometry = this._originGeometry;
			GroundOverlayFeatureClone.layer = this.layer;
			return GroundOverlayFeatureClone;

		}
	}
}


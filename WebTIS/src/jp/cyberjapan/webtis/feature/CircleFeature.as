package jp.cyberjapan.webtis.feature 
{
	import flash.geom.Rectangle;
	import jp.cyberjapan.webtis.handler.feature.draw.DrawCircleHandler;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.Point;
	import org.openscales.geometry.Polygon;
	
	/**
	 * ...
	 * @author 
	 */
	public class CircleFeature extends PolygonFeature 
	{
		private var _orgCenter:Location = null;
		private var _orgRadius:Number = 0.0;

		public function CircleFeature(geom:Polygon=null, data:Object=null, style:Style=null, isEditable:Boolean=false) 
		{
			super(geom, data, style, isEditable);
			this._orgCenter = getCenter().clone().reprojectTo("EPSG:4326");
			this._orgRadius = getRadius();
		}

		public function setNewGeometry():void
		{
			var center:Location = getCenter().reprojectTo("EPSG:4326");
			var orgScale:Number = Math.abs(this.projection.a / (Math.cos(this._orgCenter.lat * Math.PI / 180 ) * this.projection.a));
			var newScale:Number = Math.abs(this.projection.a / (Math.cos(center.lat * Math.PI / 180 ) * this.projection.a));
			var radius:Number = this._orgRadius * (newScale / orgScale);
			var handler:DrawCircleHandler = new DrawCircleHandler();
			this.geometry = handler.createRegularPolygon(new Point(getCenter().lon, getCenter().lat, this.projection), radius, 73, 0);
		}

		private function getCenter():Location
		{
			return this.geometry.bounds.center;
		}
		
		private function getRadius():Number
		{
			return (this.geometry.bounds.right - this.geometry.bounds.left) / 2.0;
		}
	}

}
package jp.cyberjapan.webtis.control 
{
	import flash.events.Event;
	import org.openscales.core.basetypes.Resolution;
	import org.openscales.core.control.OverviewMapRatio;
	import org.openscales.core.layer.Layer;
	import org.openscales.geometry.basetypes.Pixel;
	
	/**
	 * ...
	 * @author 
	 */
	public class ExOverviewMapRatio extends OverviewMapRatio 
	{
		
		public function ExOverviewMapRatio(position:Pixel=null, layer:Layer=null) 
		{
			super(position, layer);
		}
		
		override protected function mapChanged(event:Event = null):void
		{
			//computeResolutionLevel();
			if (this.map != null)
			{
				this._overviewMap.center = this.map.center.reprojectTo(this._overviewMap.projection);
				var mapRes:Resolution = this._map.resolution;
				mapRes = mapRes.reprojectTo(this.overviewMap.projection);
//				var mapsRatio:Number =(this.map.size.w / this._overviewMap.size.w); 
//				var newRes:Resolution =  new Resolution(mapRes.value*ratio*mapsRatio, mapRes.projection);
				var newRes:Resolution =  new Resolution(mapRes.value*ratio, mapRes.projection);
				if (newRes.value > this._overviewMap.maxResolution.value)
				{
					newRes = this._overviewMap.maxResolution;
				}
				if (newRes.value < this._overviewMap.minResolution.value)
				{
					newRes = this._overviewMap.minResolution;
				}
				this._overviewMap.resolution = newRes
			}
			this.drawCenter();	
		}
	}

}
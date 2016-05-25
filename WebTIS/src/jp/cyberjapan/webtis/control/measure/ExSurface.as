package jp.cyberjapan.webtis.control.measure 
{
	import flash.events.MouseEvent;
	import jp.cyberjapan.webtis.layer.ExVectorLayer;
	
	import org.openscales.core.Map;
	import org.openscales.core.basetypes.maps.HashMap;
	import org.openscales.core.events.MapEvent;
	import org.openscales.core.events.MeasureEvent;
	import org.openscales.core.handler.IHandler;
	import org.openscales.core.handler.feature.draw.DrawPolygonHandler;
	import org.openscales.core.handler.mouse.ClickHandler;
	import org.openscales.core.handler.mouse.DragHandler;
	import org.openscales.core.handler.mouse.MouseHandler;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.utils.Util;
	import org.openscales.geometry.LinearRing;
	import org.openscales.geometry.Polygon;
	import org.openscales.geometry.basetypes.Unit;
	import org.openscales.proj4as.ProjProjection;
	import org.openscales.core.measure.IMeasure;
	import jp.cyberjapan.webtis.handler.feature.draw.ExDrawPolygonHandler;
	
	// EX改修箇所 親クラスを拡張クラスに変更
	/**
	 * ...
	 * @author k-hatakeyama
	 */
	public class ExSurface extends ExDrawPolygonHandler implements IMeasure
	{	
		private var _result:String = "";
		private var _lastUnit:String = null;
		
		private var _displaySystem:String = "metric";

		public function get displaySystem():String
		{
			return _displaySystem;
		}

		public function set displaySystem(value:String):void
		{
			_displaySystem = value;
		}
		
		private var _accuracies:HashMap = null;

		public function get accuracies():HashMap
		{
			return _accuracies;
		}

		public function set accuracies(value:HashMap):void
		{
			_accuracies = value;
		}
		
		public function ExSurface(map:Map=null)
		{
			super(map);
			super.active = false;
			var layer:VectorLayer = new ExVectorLayer("MeasureLayer");
			layer.editable = true;
			layer.displayInLayerManager = false;
			this.drawLayer = layer;
			
			this._accuracies = new HashMap();
			this._accuracies.put(Unit.KILOMETER,3);
			this._accuracies.put(Unit.METER,2);
		}
		
		override public function set active(value:Boolean):void {
			if(value == this.active)
				return;
			
			super.active = value;
			if(this.map) {
				if(value) {
					this.drawLayer.projection = map.projection;
					this.drawLayer.minResolution = this.map.minResolution;
					this.drawLayer.maxResolution = this.map.maxResolution;
					this.map.addLayer(this.drawLayer);
				} else {
					this.drawFinalPoly();
					this.clearFeature();
					this.map.removeLayer(this.drawLayer);
				}
			}
		}
		private function clearFeature():void {
			if(newFeature && _polygonFeature){
				this.drawLayer.removeFeature(_polygonFeature);
				_polygonFeature.destroy();
				_polygonFeature = null;
			}
		}
		
		/**
		 * マウスクリックイベント
		 * @param	event
		 */
		override protected function mouseClick(event:MapEvent):void {
			this.clearFeature();
			super.mouseClick(event);
			
			// EX改修箇所 ポリゴンの構成点が２点以上になったら面積計算を開始するよう変更
			var mEvent:MeasureEvent = null;
			if(_polygonFeature && (this._polygonFeature.geometry as Polygon).componentsLength == 1
			&& ((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).componentsLength >= 2) {
				//dispatcher event de calcul
				mEvent = new MeasureEvent(MeasureEvent.MEASURE_AVAILABLE,this);//,null,null);
				
			} else {
				mEvent = new MeasureEvent(MeasureEvent.MEASURE_UNAVAILABLE,this);//,null,null);
			}
			_result = "";
			_lastUnit = null;
			
			this.map.dispatchEvent(mEvent);
		}
		
		public function getMeasure():String {
			var area:Number = 0;
			area = this.getArea();
			
			var inPerDisplayUnit:Number;
			var inPerMapUnit:Number;
			
			switch (_displaySystem.toLowerCase()) {
				case "km":
					area = this.getGeodesicArea();
					
						area=area/1000000;
						_lastUnit = "km²";
						this._result= this.trunc(area,_accuracies.getValue(Unit.KILOMETER));

					break;
				
				case Unit.METER :
					area = this.getGeodesicArea();
				

						_lastUnit = "m²";
						this._result= this.trunc(area,_accuracies.getValue(Unit.METER));

					break;
				
				case "metric":
					area = this.getGeodesicArea();


						area=area/1000000;
						_lastUnit = "km²";
						this._result= this.trunc(area,_accuracies.getValue(Unit.KILOMETER));
						
						if(area<1){
							area=area*1000000;
							_lastUnit = "m²";
							this._result= this.trunc(area,_accuracies.getValue(Unit.METER));
					}
					
					break;
				
				default:
					_lastUnit = null;
					_result="0";
					break;
			}
			return this._result;
		}
		
		private function trunc(val:Number,unit:Number):String{
			if(!unit){
				unit=2;
			}
			return Util.truncate(val,unit);
		}
		
		private function getArea():Number{
			var area:Number = 0;
			
			if(_polygonFeature && (this._polygonFeature.geometry as Polygon).componentsLength == 1
			&& ((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).componentsLength>2){
				
				((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).units = ProjProjection.getProjProjection(drawLayer.projection).projParams.units;
				
				area = ((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).area;
				area = Math.abs(area);
				
			}
			
			
			return area;
		}
		
		private function getGeodesicArea():Number{
			var area:Number = 0;
			
			if(_polygonFeature && (this._polygonFeature.geometry as Polygon).componentsLength == 1
				&& ((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).componentsLength>2){
				
				((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).units = ProjProjection.getProjProjection(drawLayer.projection).projParams.units;
				
				area = ((this._polygonFeature.geometry as Polygon).componentByIndex(0) as LinearRing).geodesicArea;
				area = Math.abs(area);
				
			}
			
			
			return area;
		}
		
		public function getUnits():String {
			if(!_lastUnit)
				this.getMeasure();
			return _lastUnit;
		}
	}
}
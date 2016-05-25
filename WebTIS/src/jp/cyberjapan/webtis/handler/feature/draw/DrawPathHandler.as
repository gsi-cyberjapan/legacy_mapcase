package  jp.cyberjapan.webtis.handler.feature.draw
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import org.openscales.core.Map;
	import org.openscales.core.events.FeatureEvent;
	import org.openscales.core.events.MapEvent;
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.handler.mouse.ClickHandler;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.LineString;
	import org.openscales.geometry.Point;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	
	import org.openscales.core.handler.feature.draw.AbstractDrawHandler;
	
	/** 
	 * @eventType org.openscales.core.events.FeatureEvent.FEATURE_DRAWING_END
	 */ 
	[Event(name="org.openscales.feature.drawingend", type="org.openscales.core.events.FeatureEvent")]
	
	/**
	 * This handler manage the function draw of the LineString (path).
	 * Active this handler to draw a path.
	 */
	public class DrawPathHandler extends AbstractDrawHandler
	{
		/**
		 * Single id of the path
		 */ 
		private var _id:Number = 0;
		
		/**
		 * The lineString which contains all points
		 * use for draw MultiLine for example
		 */
		private var _lineString:LineString=null;
		
		/**
		 * The LineStringfeature currently drawn
		 * */
		protected var _currentLineStringFeature:LineStringFeature=null;
		
		/**
		 * The last point of the lineString. 
		 */
		private var _lastPoint:Point = null; 

		/**
		 * To know if we create a new feature, or if some points are already added
		 */
		private var _newFeature:Boolean = true;
		
		/**
		 * The container of the temporary line
		 */
		private var _drawContainer:Sprite = new Sprite();
		
		/**
		 * The start point of the temporary line
		 */
		private var _startLocation:Location=null;
		
		/**
		 * Handler which manage the doubleClick, to finalize the lineString
		 */
		protected var _dblClickHandler:ClickHandler = new ClickHandler();
		
		/**
		 * 
		 */
		private var _style:Style = Style.getDefaultLineStyle();
		
		/**
		 * DrawPathHandler constructor
		 *
		 * @param map
		 * @param active
		 * @param drawLayer The layer on which we'll draw
		 */
		public function DrawPathHandler(map:Map=null, active:Boolean=false, drawLayer:org.openscales.core.layer.VectorLayer=null)
		{
			super(map, active, drawLayer);
		}
		
		override protected function registerListeners():void{
			this._dblClickHandler.active = true;
			this._dblClickHandler.doubleClick = this.mouseDblClick;
			if (this.map) {
				this.map.addEventListener(MapEvent.MOUSE_CLICK, this.drawLine);
				this.map.addEventListener(MapEvent.MOVE_END, this.updateZoom);
	// hamas : 13.08.08 右クリックイベントを追加
				this.map.addEventListener(MouseEvent.RIGHT_CLICK, this.mouseRightClick);
			} 
		}
		
		override protected function unregisterListeners():void{
			this._dblClickHandler.active = false;
			if (this.map) {
				this.map.removeEventListener(MapEvent.MOUSE_CLICK, this.drawLine);
				this.map.removeEventListener(MapEvent.MOVE_END, this.updateZoom);
	// hamas : 13.08.08 右クリックイベントを削除
				this.map.removeEventListener(MouseEvent.RIGHT_CLICK, this.mouseRightClick);
			}
		}
		/**
		 * This function occured when a double click occured
		 * during the drawing operation
		 * @param Lastpx: The position of the double click pixel
		 * */
		public function mouseDblClick(Lastpx:Pixel=null):void {
			this.drawFinalPath();
		} 
		
		/**
		 * Finish the LineString
		 */
		public function drawFinalPath():void{			
			if(!newFeature){
				newFeature = true;
				//clear the temporary line
				_drawContainer.graphics.clear();
				this.map.removeEventListener(MouseEvent.MOUSE_MOVE,temporaryLine);
				this.map.removeEventListener(MapEvent.CENTER_CHANGED, temporaryLine);
				this.map.removeEventListener(MapEvent.RESOLUTION_CHANGED, temporaryLine);
				
				if(this._currentLineStringFeature!=null){
					//this._currentLineStringFeature.style=Style.getDefaultLineStyle();
					this._currentLineStringFeature.style=this._style;
					this.map.dispatchEvent(new FeatureEvent(FeatureEvent.FEATURE_DRAWING_END,this._currentLineStringFeature));
					drawLayer.redraw(true);
				}
			}	
		}
		
		protected function drawLine(event:MapEvent=null):void{
			
			drawLayer.scaleX=1;
			drawLayer.scaleY=1;
			//we determine the point where the user clicked
			var pixel:Pixel = new Pixel(this.map.mouseX,this.map.mouseY );
			var lonlat:Location = this.map.getLocationFromMapPx(pixel); //this.map.getLocationFromLayerPx(pixel);
			//manage the case where the layer projection is different from the map projection
			var point:Point = new Point(lonlat.lon,lonlat.lat);
			//initialize the temporary line
			_startLocation = lonlat;
			
			//The user click for the first time
			if(newFeature){
				_lineString = new LineString(new <Number>[point.x,point.y]);
				_lineString.projection = this.map.projection;
				lastPoint = point;
				//the current drawn linestringfeature
				this._currentLineStringFeature= new LineStringFeature(_lineString,null, Style.getDefaultSelectedLineStyle(),true);
				this._currentLineStringFeature.name = "path." + drawLayer.idPath.toString();
				drawLayer.idPath++;
				drawLayer.addFeature(_currentLineStringFeature);
				_currentLineStringFeature.cacheAsBitmap = false;
				
				newFeature = false;
				//draw the temporary line, update each time the mouse moves		
				this.map.addEventListener(MouseEvent.MOUSE_MOVE,temporaryLine);	
				this.map.addEventListener(MapEvent.CENTER_CHANGED, temporaryLine);
				this.map.addEventListener(MapEvent.RESOLUTION_CHANGED, temporaryLine);
			}
			else {								
				if(!point.equals(lastPoint)){
					_lineString.addPoint(point.x,point.y);
					_currentLineStringFeature.geometry = _lineString;
					drawLayer.redraw(true);
					lastPoint = point;
				}								
			}
		}
		
		/**
		 * Update the temporary line
		 */
		public function temporaryLine(evt:Event):void{
			_drawContainer.graphics.clear();
			_drawContainer.graphics.lineStyle(2, Style.getDefaultSelectedColor());
			_drawContainer.graphics.moveTo(this.map.getMapPxFromLocation(_startLocation).x, this.map.getMapPxFromLocation(_startLocation).y);
			_drawContainer.graphics.lineTo(map.mouseX, map.mouseY);
			_drawContainer.graphics.endFill();
		}
		
		/**
		 * @inherited
		 */
		override public function set map(value:Map):void{
			super.map = value;
			this._dblClickHandler.map = value;
			if(map != null){
				map.addChild(_drawContainer);
			}
		}
		
		protected function updateZoom(evt:MapEvent):void{
			
			if(evt.zoomChanged) {
				_drawContainer.graphics.clear();
				//we update the pixel of the last point which has changed
				var tempPoint:Point = _lineString.getLastPoint();
				_startLocation = new Location(tempPoint.x, tempPoint.y);
			}
		}
		
		//Getters and Setters
		public function get id():Number {
			return _id;
		}
		public function set id(nb:Number):void {
			_id = nb;
		}
		
		public function get newFeature():Boolean {
			return _newFeature;
		}
		
		public function set newFeature(newFeature:Boolean):void {
			if(newFeature == true) {
				lastPoint = null;
			}
			_newFeature = newFeature;
		}
		
		public function get lastPoint():Point {
			return _lastPoint;
		}
		public function set lastPoint(value:Point):void {
			_lastPoint = value;
		}
		
		public function get drawContainer():Sprite{
			return _drawContainer;
		}
		
		public function get startLocation():Location{
			return _startLocation;
		}
		public function set startLocation(value:Location):void{
			_startLocation = value;
		}
		
		/**
		 * The style of the path
		 */
		public function get style():Style{
			
			return this._style;
		}
		public function set style(value:Style):void{
			
			this._style = value;
		}
		public function get lineString():LineString{
			return _lineString;
		}
		public function set lineString(value:LineString):void{
			_lineString = value;
		}
		
		public function get currentLineStringFeature():LineStringFeature{
			return _currentLineStringFeature;
		}
		public function set currentLineStringFeature(value:LineStringFeature):void{
			_currentLineStringFeature = value;
		}

	// hamas : 13.08.08 右クリック（ライン）直前の描画点を削除
		protected function mouseRightClick(event:MouseEvent):void {
			if(_lineString.componentsLength >= 2) {
			// ラインの構成点が２点以上になったら
				_lineString.removePoint(lastPoint);
				
				_drawContainer.graphics.clear();
				//we update the pixel of the last point which has changed
				lastPoint = _lineString.getLastPoint();
				_startLocation = new Location(lastPoint.x, lastPoint.y);

				drawLayer.redraw(true);
			}
		}
	}
}
package  jp.cyberjapan.webtis.handler.feature.draw
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import jp.cyberjapan.webtis.api.MapAPI;
	import jp.cyberjapan.webtis.feature.CircleFeature;
	import mx.logging.ILogger;
	import mx.logging.Log;
	import org.openscales.core.events.FeatureEvent;
	import org.openscales.core.events.MapEvent;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.core.handler.feature.draw.AbstractDrawHandler;
	import org.openscales.core.handler.mouse.ClickHandler;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.Map;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.LinearRing;
	import org.openscales.geometry.Point;
	import org.openscales.geometry.Polygon;
	import org.openscales.proj4as.ProjProjection;
	
	/**
	 * @eventType org.openscales.core.events.FeatureEvent.FEATURE_DRAWING_END
	 */
	[Event(name="org.openscales.feature.drawingend",type="org.openscales.core.events.FeatureEvent")]
	
	/**
	 * This handler manage the function draw of the circle.
	 * Active this handler to draw a circle.
	 */
	public class DrawCircleHandler extends AbstractDrawHandler
	{
		private var logger:ILogger = Log.getLogger("DrawCircleHandler");
		private const CALC_PROJECTION:ProjProjection = ProjProjection.getProjProjection("EPSG:900913");

		/**
		 * circle feature which is currently drawn
		 * */
		
		protected var _circleFeature:CircleFeature = null;
		
		/**
		 *  @private
		 * */
		private var _newFeature:Boolean = true;

		/**
		 *@private
		 */
		private var _clickHandler:ClickHandler = new ClickHandler();
		
		/**
		 * Single id of the circle
		 */
		private var id:Number = 0;
		
		/**
		 * The Sprite used for drawing the temporary line
		 */
		private var _drawContainer:Sprite = new Sprite();
		/**
		 * position of the first point drawn
		 * */
		private var _firstPointLocation:Location = null;
		
		/**
		 * 半径固定円かどうか
		 */
		private var _isFixed:Boolean = false;
		/**
		 * 半径(メートル)
		 */
		private var _radius:Number = 0;
		
		/**
		 *
		 */
		private var _style:Style = Style.getDefaultPolygonStyle();
		
		/**
		 * Constructor of the circle handler
		 *
		 * @param map the map reference
		 * @param active determine if the handler is active or not
		 * @param drawLayer The layer on which we'll draw
		 */
		public function DrawCircleHandler(map:Map = null, active:Boolean = false, drawLayer:org.openscales.core.layer.VectorLayer = null)
		{
			super(map, active, drawLayer);
		}
		
		/**
		 * 初期化処理
		 * set active(true)としたとき呼び出される
		 */
		override protected function registerListeners():void
		{
			_clickHandler.active = true;
			if (this.isFixed)
			{
				newFeature = false;
				if (this.map)
				{
					_clickHandler.click = this.drawFixedPoly;
					this.map.addEventListener(MouseEvent.MOUSE_MOVE, drawTemporaryCircle);
					this.map.addEventListener(MapEvent.CENTER_CHANGED, drawTemporaryCircle);
					this.map.addEventListener(MapEvent.RESOLUTION_CHANGED, drawTemporaryCircle);
				}
			}
			else
			{
				if (this.map)
				{
				//	_clickHandler.doubleClick = this.drawFinalPoly;
				//	_clickHandler.click = this.mouseClick;
				// 13.10.31 hamas : unfixed drawing				
					this.map.addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);		
					this.map.addEventListener(MouseEvent.MOUSE_UP, drawFinalPoly);
				}
			}
		}
		

		/**
		 * 終了処理
		 */
		override protected function unregisterListeners():void
		{
			_clickHandler.active = false;
			if (this.isFixed)
			{
				if (this.map)
				{
					this.map.removeEventListener(MouseEvent.MOUSE_MOVE, drawTemporaryCircle);
					this.map.removeEventListener(MapEvent.CENTER_CHANGED, drawTemporaryCircle);
					this.map.removeEventListener(MapEvent.RESOLUTION_CHANGED, drawTemporaryCircle);
				}
			}
			else
			{
			// 13.10.31 hamas : unfixed drawing
				if (this.map)
				{
					this.map.removeEventListener(MouseEvent.MOUSE_DOWN, mouseDown);		
					this.map.removeEventListener(MouseEvent.MOUSE_UP, drawFinalPoly);
				}				
			}
			_clickHandler.click = null;
			_isFixed = false;
			_radius = 0;
		}
		
		/**
		 * ドラッグ描画でのみ使用
		 * @param	event
		 */
		protected function mouseDown(event:MouseEvent):void
		{
			if (drawLayer != null)
			{
				drawLayer.scaleX = 1;
				drawLayer.scaleY = 1;
				
				_drawContainer.graphics.clear();
				// クリック位置の取得
				var pixel:Pixel = new Pixel(map.mouseX, map.mouseY);
				
				var lonlat:Location = this.map.getLocationFromMapPx(pixel);
				
				// 最初のクリック→中心に設定
				if (newFeature)
				{
					this._firstPointLocation = lonlat;
					
					newFeature = false;
					
					this.map.addEventListener(MouseEvent.MOUSE_MOVE, drawTemporaryCircle);
					this.map.addEventListener(MapEvent.CENTER_CHANGED, drawTemporaryCircle);
					this.map.addEventListener(MapEvent.RESOLUTION_CHANGED, drawTemporaryCircle);
				}
				
				//final redraw layer
				drawLayer.redraw(true);
				
			}
		}
		
		/**
		 * 暫定円の描画
		 * @param	event
		 */
		public function drawTemporaryCircle(event:Event = null):void
		{
			var debug:String = "drawTemporaryCircle";
			var mouseX:Number = map.mouseX;
			var mouseY:Number = map.mouseY;
			var cx:Number;
			var cy:Number;
			var rd : Number = 0;
			
			if (this._isFixed)
			{
				debug += " fix ";
				cx = mouseX;
				cy = mouseY;
				//緯度に対する縮尺率を取得
				var r:Number = CALC_PROJECTION.a;
				var mousepoint:Location = this.map.getLocationFromMapPx(new Pixel(mouseX, mouseY)).reprojectTo(MapAPI.DISPLAY_PROJECTION);
				var scale:Number = Math.abs(r / (Math.cos(mousepoint.lat * Math.PI / 180 ) * r));
				rd = (this._radius / this.map.resolution.value) * scale;
			}
			else
			{
				var orgX:Number = this.map.getMapPxFromLocation(this._firstPointLocation).x;
				var orgY:Number = this.map.getMapPxFromLocation(this._firstPointLocation).y;
				cx = orgX;
				cy = orgY;
				rd = Math.sqrt(Math.pow((mouseX - orgX), 2) + Math.pow((mouseY - orgY), 2));
			}
			logger.debug("cx: " + cx + ",cy: " + cy + ",rd: " + rd);
			
			_drawContainer.graphics.clear();
			_drawContainer.graphics.beginFill(0x00ff00, 0.5);
			_drawContainer.graphics.lineStyle(2, Style.getDefaultSelectedColor());
			_drawContainer.graphics.moveTo(mouseX, mouseY);
			_drawContainer.graphics.drawCircle(cx, cy, rd);
			_drawContainer.graphics.endFill();
		}
		
		public function clearTemporaryCircle(event:Event = null):void
		{			
			_drawContainer.graphics.clear();
			newFeature = true;
			
			if (!this.isFixed)
			{
				//remove listener for temporaries polygons
				this.map.removeEventListener(MouseEvent.MOUSE_MOVE, drawTemporaryCircle);
				this.map.removeEventListener(MapEvent.CENTER_CHANGED, drawTemporaryCircle);
				this.map.removeEventListener(MapEvent.RESOLUTION_CHANGED, drawTemporaryCircle);
			}
		}
		
		/**
		 * ドラッグから確定した円の描画
		 */
		public function drawFinalPoly(event:MouseEvent = null):void
		{
			// 13.10.31 hamas : unfixed drawing
			var lastPX:Pixel = new Pixel(map.mouseX, map.mouseY);
	
			//Change style of finished polygon
			//var style:Style = Style.getDefinedPolygonStyle(0x00FFFF,0.2);
			_drawContainer.graphics.clear();
			//We finalize the last feature (of course, it's a polygon)
			
			if (this._firstPointLocation != null)
			{
				drawLayer.scaleX = 1;
				drawLayer.scaleY = 1;
				
				var mouseLocation:Location = this.map.getLocationFromMapPx(lastPX);
				var orgX:Number = this._firstPointLocation.x;
				var orgY:Number = this._firstPointLocation.y;
				var mouseX:Number = mouseLocation.x;
				var mouseY:Number = mouseLocation.y;
				var cp : Point = new Point(orgX, orgY);
				var dist : Number = Math.sqrt(Math.pow((mouseX - orgX), 2) + Math.pow((mouseY - orgY), 2));
				logger.debug("cp: " + cp.x + ", " + cp.y + ",dist: " + dist);
				cp.projection = CALC_PROJECTION;
				
				var name:String = "circle." + drawLayer.idPolygon.toString();
				drawLayer.idPolygon++;
				var circle:Polygon = this.createRegularPolygon(cp, dist, 73, 0);
				circle.projection = cp.projection;
				
				this._circleFeature = new CircleFeature(circle, null, this._style, true);
				this._circleFeature.name = name;
				drawLayer.addFeature(this._circleFeature);
				
				this._circleFeature.registerListeners();
				this.map.dispatchEvent(new FeatureEvent(FeatureEvent.FEATURE_DRAWING_END, this._circleFeature));
				
				drawLayer.redraw(true);
			}
			//the polygon is finished
			newFeature = true;
			
			//remove listener for temporaries polygons
		// 13.10.31 hamas : unfixed drawing
			this.map.removeEventListener(MouseEvent.MOUSE_MOVE, drawTemporaryCircle);
			this.map.removeEventListener(MapEvent.CENTER_CHANGED, drawTemporaryCircle);
			this.map.removeEventListener(MapEvent.RESOLUTION_CHANGED, drawTemporaryCircle);
			
		}
		
		/**
		 * 半径固定円で中心確定したときの描画
		 * @param	e
		 */
		public function drawFixedPoly(lastPX:Pixel):void
		{
			_drawContainer.graphics.clear();
				
			drawLayer.scaleX = 1;
			drawLayer.scaleY = 1;
			
			var mouseLocation:Location = this.map.getLocationFromMapPx(lastPX);
			var mousepoint:Location = this.map.getLocationFromMapPx(lastPX).reprojectTo(MapAPI.DISPLAY_PROJECTION);
			var cp : Point = new Point(mouseLocation.x, mouseLocation.y);
			var r:Number = CALC_PROJECTION.a;
			var scale:Number = Math.abs(r / (Math.cos(mousepoint.lat * Math.PI / 180 ) * r));
			var rd : Number = this._radius * scale;
			cp.projection = CALC_PROJECTION;
			
			var name:String = "circle." + drawLayer.idPolygon.toString();
			drawLayer.idPolygon++;
			var circle:Polygon = this.createRegularPolygon(cp, rd, 73, 0);
			circle.projection = cp.projection;
			
			this._circleFeature = new CircleFeature(circle, null, this._style, true);
			this._circleFeature.name = name;
			drawLayer.addFeature(this._circleFeature);
			
			this._circleFeature.registerListeners();
			this.map.dispatchEvent(new FeatureEvent(FeatureEvent.FEATURE_DRAWING_END, this._circleFeature));
			
			drawLayer.redraw(true);
		}
		
		override public function set map(value:Map):void
		{
			super.map = value;
			_clickHandler.map = value;
			if (map != null)
				map.addChild(_drawContainer);
		}
		
		//Getters and Setters
		
		/**
		 * @private
		 * */
		public function set newFeature(value:Boolean):void
		{
			_newFeature = value;
		}
		
		/**
		 * To know if we create a new feature, or if some points are already added
		 */
		public function get newFeature():Boolean
		{
			return _newFeature;
		}
		
		public function get drawContainer():Sprite
		{
			return _drawContainer;
		}
		
// 13.10.31 hamas : unfixed drawing
		/**
		 * Handler which manage the doubleClick, to finalize the polygon
		public function get clickHandler():ClickHandler
		{
			return _clickHandler;
		}
		 */
		
		/**
		 * The style of the path
		 */
		public function get style():Style
		{
			
			return this._style;
		}
		
		public function set style(value:Style):void
		{
			
			this._style = value;
		}
		
		/**
		 * 固定円かどうか
		 */
		public function get isFixed():Boolean
		{
			
			return this._isFixed;
		}
		
		public function set isFixed(value:Boolean):void
		{
			
			this._isFixed = value;
		}
			
		/**
		 * 半径
		 */
		public function get radius():Number
		{
			return this._radius;
		}
		
		public function set radius(value:Number):void
		{
			this._radius = value;
		}
	
		/**
		 * Create a regular polygon around a radius. Useful for creating circles
		 * and the like.
		 *
		 * @param origin 中心
		 * @param radius 半径
		 * @param sides Number of sides. 20 approximates a circle.
		 * @param rotation original angle of rotation, in degrees.
		 */
		public function createRegularPolygon(origin:Point, radius:Number, sides:Number, rotation:Number):Polygon
		{
			var angle:Number = Math.PI * ((1 / sides) - (1 / 2));
			if (rotation)
			{
				angle += (rotation / 180) * Math.PI;
			}
			var rotatedAngle:Number, x:Number, y:Number;
			var realLength:uint = sides * 2;
			var points:Vector.<Number> = new Vector.<Number>(realLength);
			
			for (var i:uint = 0; i < realLength; ++i)
			{
				rotatedAngle = angle + (i * Math.PI / sides);
				x = origin.x + (radius * Math.cos(rotatedAngle));
				y = origin.y + (radius * Math.sin(rotatedAngle));
				points[i] = x
				points[++i] = y;
			}
			var ring:LinearRing = new LinearRing(points, CALC_PROJECTION);
			return new Polygon(new <Geometry>[ring]);
		}
	
	}
}


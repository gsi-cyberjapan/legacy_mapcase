//package org.openscales.core.layer
package jp.cyberjapan.webtis.layer 
{
	import mx.core.ResourceModuleRSLItem;
	import org.openscales.core.basetypes.Resolution;
	import org.openscales.core.Map;
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.feature.LabelFeature;
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.ns.os_internal;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.LineString;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.proj4as.ProjProjection;

	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.utils.Util;
	import mx.utils.StringUtil;

	use namespace os_internal;
	
	/**
	 * Graticule control.
	 * Displays a grid on the map, based on geographical coordinates.
	 * The possible intervals are defined by default, but can be overrided by the developper.
	 * The graticule layer appears in the layer switcher.
	 * @author xlaprete
	 */
	public class ExGraticule extends VectorLayer
	{
	// hamas : 13.08.14　経緯度線表示
		// graticule width in degrees(fixed)
		private var _interval_custom:Number = -1;
		// Maximum number of lines to display for the graticule.
//		private var _maxNumberOfLines:uint = 12;
		private var _maxDisplayResolution:Resolution = null;

		/**
		 * @private
		 * Minimum number of lines to display for the graticule.
		 * 
		 * @default 3
		 */
//		private var _minNumberOfLines:uint = 1;
		
		/**
		 * Default constructor.
		 * @param name Name of the graticule layer.
		 * @param style Style of the graticule layer.
		 */
		public function ExGraticule(name:String, style:Style = null) 
		{
			// default init
			super(name);
			
			// style setup
			if(style){
				this.style = style;
			} else {
				this.style = Style.getDefaultGraticuleStyle();
			}
			
			// puts layer in geographical coordinates
			this._projection = ProjProjection.getProjProjection(Geometry.DEFAULT_SRS_CODE);
			this.maxExtent = new Bounds(-180,-90,180,90,Geometry.DEFAULT_SRS_CODE);
			
			// hides layer in LayerManager
			this.displayInLayerManager = false;
			
		// hamas : 13.08.01 デフォルトOFF
			this.visible = false;
		}
		
		/**
		 * @inheritDoc
		 */
		override public function set map(map:Map):void {
			if (this.map != null) {
				this.map.removeEventListener(LayerEvent.LAYER_ADDED, this.putGraticuleOnTop);
			}
			super.map = map;
			if (this.map != null) {
				this.map.addEventListener(LayerEvent.LAYER_ADDED, this.putGraticuleOnTop);
			}
		}
		
		/**
		 * Method called when a layer is added, so that graticule is always on top.
		 */
		public function putGraticuleOnTop(event:LayerEvent):void {
			this.map.changeLayerIndex(this, this.map.layers.length-1);
		}

		/**
		 * @inheritDoc
		 */
		override protected function draw():void {
			// remove old features
			if(this.features)
				this.removeFeatures(this.features);
			
			// gets bounds in geographical coordinates
			var intersection:Bounds = this.map.maxExtent.getIntersection(this.map.extent);
			intersection = intersection.reprojectTo(this.projection);
			var xmin:Number=intersection.left;
			var xmax:Number=intersection.right;
			var ymin:Number=intersection.bottom;
			var ymax:Number = intersection.top;
			
		// hamas : 13.08.30　経緯度線の表示用
			var loc0:Location = this.map.getLocationFromMapPx(new Pixel( 0, 0)).reprojectTo(ProjProjection.getProjProjection("EPSG:4326"));
			var loc1:Location = this.map.getLocationFromMapPx(new Pixel(10,10)).reprojectTo(ProjProjection.getProjProjection("EPSG:4326"));
			var label_xmin:Number = xmin + 7.5 * Math.abs(loc0.lon - loc1.lon);
			var label_ymin:Number = ymin + 3.5 * Math.abs(loc0.lat - loc1.lat);
			
		//	// calculates which interval to use
		//	var interval:Number = getBestInterval(xmin, xmax, ymin, ymax);
			var interval:Number = _interval_custom;
		
		// hamas : 13.08.14　インターバル判定
//			var minMapSize:Number = Math.min(xmax-xmin, ymax-ymin);
//			var numberOfLines:Number = minMapSize / _interval_custom;
//			var bDraw:Boolean = (numberOfLines > _minNumberOfLines && numberOfLines < _maxNumberOfLines);
			var bDraw:Boolean = (this._maxDisplayResolution == null || this._maxDisplayResolution.value >= this.map.resolution.value);
			
			// verifies interval has been found
			if (bDraw) {
				
				// offset for labels
				var offset:Number = interval/10;
				
				// style for labels
				var labelStyle:Style = Style.getDefaultGraticuleLabelStyle();
				
				//
				// draw vertical lines
				//
				
				// calculates first x coordinate
				var firstX:Number = getFirstCoordinateForGraticule(xmin, interval);
				
				// loop till xmax is reached
				var currentX:Number = firstX;
				while (currentX<xmax) {	
					// lines
					var points:Vector.<Number> = new Vector.<Number>();
					points.push(currentX, ymin, currentX, ymax);
					var line:LineString = new LineString(points);
					var lineFeature:LineStringFeature = new LineStringFeature(line,null,this.style);
					this.addFeature(lineFeature);
					// labels
					var degreeLabel:String = getFormattedLabel(currentX);
					var labelFeature:LabelFeature = LabelFeature.createLabelFeature(new Location(currentX, label_ymin));
					labelFeature.text = degreeLabel;
					labelFeature.style = labelStyle;
					this.addFeature(labelFeature);
					// iterates
					currentX = currentX+interval;
				}
				
				//
				// draw horizontal lines
				//
				
				// calculates first y coordinate
				var firstY:Number = getFirstCoordinateForGraticule(ymin, interval);
				
				// loop till ymax is reached
				var currentY:Number = firstY;
				while (currentY<ymax) {	
					// lines
					points = new Vector.<Number>();
					points.push(xmin, currentY, xmax, currentY);
					line = new LineString(points);
					lineFeature = new LineStringFeature(line,null,this.style);
					this.addFeature(lineFeature);
					// labels
					degreeLabel = getFormattedLabel(currentY);
					labelFeature = LabelFeature.createLabelFeature(new Location(label_xmin, currentY));
					labelFeature.text = degreeLabel;
					labelFeature.style = labelStyle;
					this.addFeature(labelFeature);
					// iterates
					currentY = currentY+interval;
				}
			}
		}
	
		/**
		 * Gets first coordinate for the graticule line.
		 * @param firstCoordinateOfMap x coordinate on the left of the map or y coordinate on the bottom of the map.
		 * @param interval Interval used for the graticule.
		 * @return The first coordinate to use for the graticule line.
		 */
		os_internal function getFirstCoordinateForGraticule(firstCoordinateOfMap:Number, interval:Number):Number {
			var firstCoordinate:Number = interval*Math.floor(firstCoordinateOfMap/interval)+interval;
			return firstCoordinate;
		}

		/**
		 * Gets formatted label to display on the map.
		 * @param coordinate coordinate to display.
		 * @param interval Interval used for the graticule.
		 * @return The formatted label to display on the map.
		 */
		os_internal function getFormattedLabel(coordinate:Number):String {
	// hamas : 13.08.14 表示をDMSに変換
			var orgDms:String = Util.degToDMS(coordinate, null, 0);
			// 誤差の修正
			var dd:String = orgDms.substr(0, 4);
			var mm:String = orgDms.substr(5, 3);
			var ss:String = orgDms.substr(9, 3);
			var i_dd:int = parseInt(dd);
			var i_mm:int = parseInt(mm);
			var i_ss:int = parseInt(ss);
			var ex_ss:int = i_ss % 15;
			if ( ex_ss != 0 ) {
				if ( ex_ss == 59 ) {
					i_mm += 1;
					i_ss = 0;
				} else {
					// 14",29",44"
					i_ss += 1;				
				}
			}
			// 補正で60秒になった場合を考慮
			if( i_ss == 60 ) {
				i_mm += 1;
				i_ss = 0;
			}
			// 補正で60分になった場合も考慮
			if( i_mm == 59 || i_mm == 60 ) {
				i_dd += 1;
				i_mm = 0;
			}
			// 0埋め
			dd = String(i_dd);
			mm = String("00" + i_mm).slice( -2);
			ss = String("00" + i_ss).slice( -2);

			return StringUtil.substitute(" {0}° {1}' {2}\"", dd, mm, ss);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function set projection(value:*):void {
			// SRS code cannot be overriden. Graticule is always built in EPSG:4326
			// and then reprojected to the projection of the map.
		}
	
		/**
		 * Minimum number of lines to display for the graticule.
		 * 
		 * @default 3
		 */
//		public function get minNumberOfLines():uint
//		{
//			return _minNumberOfLines;
//		}
		
		/**
		 * @private
		 */
//		public function set minNumberOfLines(value:uint):void
//		{
//			_minNumberOfLines = value;
//		}
		
		/**
		 * @private
		 */
		public function set interval_custom(value:Number):void
		{
			_interval_custom = value;
		}

		/**
		 * @private
		 */
//		public function set maxNumberOfLines(value:uint):void
//		{
//			_maxNumberOfLines = value;
//		}
		
		public function set maxDisplayResolution(value:Resolution):void
		{
			_maxDisplayResolution = value;
		}
	}
}
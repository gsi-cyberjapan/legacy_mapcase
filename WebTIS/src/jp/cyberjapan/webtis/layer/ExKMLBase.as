package jp.cyberjapan.webtis.layer
{
	import flash.events.Event;
	import flash.net.URLLoader;
	
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.LabelFeature;
	import org.openscales.core.format.Format;
	import jp.cyberjapan.webtis.format.ExKMLFormat;
	import org.openscales.core.request.XMLRequest;
	import org.openscales.core.style.Style;
	import org.openscales.core.utils.Trace;
	import org.openscales.core.layer.IFileUser;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import org.openscales.proj4as.ProjProjection;
	
	/**
	 * KML layer, most useful features of ExKMLBase 2.0 and 2.2 specifications are supported
	 */
	public class ExKMLBase extends VectorLayer implements IFileUser
	{
		private static const ACCEPTED_FILE_EXTENSIONS:Vector.<String> = new <String>["xml","kml"];
		
		protected var _request:XMLRequest = null;
		protected var _kmlFormat:ExKMLFormat = null;
		protected var _featureVector:Vector.<Feature> = null;
		
		public function ExKMLBase(identifier:String,
							url:String = null,
							data:XML = null,
							style:Style = null,
							bounds:Bounds = null) 
		{
			super(identifier);
			this.editable = true;
			this.url = url;
			this.data = data;
			this.maxExtent = bounds;
			this._kmlFormat = new ExKMLFormat();
			this._kmlFormat.userDefinedStyle = style;
			var name:String = this._kmlFormat.readName(data);
			
			if (name && name!="")
				this.displayedName = name;
			
			if (url)
			{
				if (! this._request) {
					this.loading = true;
					this._request = new XMLRequest(url, onSuccess, onFailure);
					this._request.proxy = this.proxy;
					this._request.security = this.security;
					this._request.send();
				}
			}
		}
		
		override public function destroy():void {
			if (this._request) {
				this._request.destroy();
				this._request = null;
			}
			this.loading = false;
			super.destroy();
		}
		
		override public function redraw(fullRedraw:Boolean = false):void {
			
			if (this.map == null)
				return;
			
			if (fullRedraw)
			{
				this.clear();
			}
			
			if (url)
			{
				if (! this._request) {
					this.loading = true;
					this._request = new XMLRequest(url, onSuccess, onFailure);
					this._request.proxy = this.proxy;
					this._request.security = this.security;
					this._request.send();
				} else {
					//this.clear();
					//this.draw();
					super.redraw(fullRedraw);
				}
			}
			else if (this.data)
			{	
				this.drawFeatures(fullRedraw);
			}
			else
			{
				//this.clear();
				//this.draw();
				super.redraw(fullRedraw);
			}
			this._initialized = true;
		}
		
		public function drawFeatures(fullRedraw:Boolean = false):void{
			
			if(this._featureVector == null) 
			{
				
				if (this.map.projection != null && this.projection != null && this.projection != this.map.projection) {
					// KML reference documentation specify that format projection is EPSG:4326
					this._kmlFormat.externalProjection = ProjProjection.getProjProjection("EPSG:4326");
					this._kmlFormat.internalProjection = this.projection;
				}
				this._kmlFormat.proxy = this.proxy;
				
				this._featureVector = this._kmlFormat.read(this.data) as Vector.<Feature>;
				var name:String = this._kmlFormat.readName(this.data);
				if (name && name!="")
					this.displayedName = name;
				var i:uint;
				var vectorLength:uint = this._featureVector.length;
				for (i = 0; i < vectorLength; i++){					
					this.addFeature(this._featureVector[i], true, true);
					this._featureVector[i].cacheAsBitmap = false;
				}
				this.maxExtent = featuresBbox;
				
				var evt:LayerEvent = new LayerEvent(LayerEvent.LAYER_CHANGED, this);
				this.map.dispatchEvent(evt);
			}
			else {
				//this.clear();
				//this.draw();
				super.redraw(fullRedraw);
			}			
		}
		
		public function onSuccess(event:Event):void
		{
			
			var loader:URLLoader = event.target as URLLoader;
			
			// To avoid errors if the server is dead
			try {
				this.data = new XML(loader.data);
				this.drawFeatures(true);
				var evt:LayerEvent = new LayerEvent(LayerEvent.LAYER_LOAD_END, this);
				this.dispatchEvent(evt);
				
				/*if (this.map.projection != null && this.projection != null && this.projection != this.map.projection) {
					this._kmlFormat.externalProjection = this.projection;
					this._kmlFormat.internalProjection = this.map.projection;
				}
				this._kmlFormat.proxy = this.proxy;
				var features:Vector.<Feature> = this._kmlFormat.read(this._xml) as Vector.<Feature>;
				this.addFeatures(features);
				this.clear();
				this.draw();*/
			}
			catch(error:Error) {
				// Empty catch is evil, but here it's fair.
			}
			this.loading = false;
		}
		
		public function onFailure(event:Event):void {
			this.loading = false;
			Trace.error("Error when loading kml " + this.url);			
		}

		override public function getURL(bounds:Bounds):String {
			return this.url;
		}
		
		override public function addFeature(feature:Feature, dispatchFeatureEvent:Boolean=true, reproject:Boolean=true):void
		{
			if (this._initialized)
			{
				this.edited = true;
			}
			super.addFeature(feature, dispatchFeatureEvent, reproject);
		}
		
		/**
		 * Getters and Setters
		 */
		override public function set projection(value:*):void {
			// KML must be in EPSG:4326
		}
		
		public function get kmlFormat():ExKMLFormat
		{
			return _kmlFormat;
		}
		
		/**
		 * Set a style to every features of the ExKMLBase layer
		 * Be carefull, this will override  other styles and will take effect on all the features
		 */
		override public function set style(value:Style):void
		{
			super.style = value;
			var featureLength:Number = this.features.length - 1;
			for (;featureLength >= 0; --featureLength)
			{
				this.features[featureLength].style = value;
				this.features[featureLength].draw();
			}
		}
		
		public function get acceptedFileExtensions():Vector.<String>{
			return ACCEPTED_FILE_EXTENSIONS;
		}
		
		
		
		/**
		 * Return the kml name stored in the ExKMLBase data
		 */
		public function getDataName():String
		{
			return this._kmlFormat.readName(this.data);
		}
	}
}
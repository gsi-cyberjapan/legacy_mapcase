package jp.cyberjapan.webtis.layer 
{
	import flash.events.Event;
	import flash.net.URLLoader;
	import jp.cyberjapan.webtis.format.GeoJSONFormat;
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.feature.MultiLineStringFeature;
	import org.openscales.core.feature.MultiPointFeature;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.layer.IFileUser;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.request.XMLRequest;
	import org.openscales.core.style.marker.Marker;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.stroke.Stroke;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.symbolizer.LineSymbolizer;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.geometry.basetypes.Bounds;
	import org.openscales.proj4as.ProjProjection;
	import flash.system.Security;
	import org.openscales.core.utils.Trace;
	import com.adobe.serialization.json.JSON;
	
	/**
	 * ...
	 * @author 
	 */
	public class GeoJSON extends VectorLayer implements IFileUser 
	{
		private static const ACCEPTED_FILE_EXTENSIONS:Vector.<String> = new <String>["json"];

		protected var _request:XMLRequest = null;
		protected var _geoJsonFormat:GeoJSONFormat = null;
		protected var _obj:Object = null;
		protected var _featureVector:Vector.<Feature> = null;
	
		public function GeoJSON(identifier:String,
								useProxy:Boolean,
								url:String = null,
								data:Object = null,
								style:Style = null) 
		{
			super(identifier);
			this._projection = ProjProjection.getProjProjection("EPSG:4326");
			this._obj = data;
			if (style) {
				this.style = style;
				this.style.rules.push(new Rule());
			} else {
				this.style = null;
			}
			this._geoJsonFormat = new GeoJSONFormat();
			if (useProxy && Security.sandboxType == Security.REMOTE)
			{
				this.proxy = Constant.getFullProxyURL();
			}
			if (url)
			{
				if (!this._request)
				{
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
					super.redraw(fullRedraw);
				}
			}
			else if (this._obj)
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
					this._geoJsonFormat.externalProjection = ProjProjection.getProjProjection("EPSG:4326");
					this._geoJsonFormat.internalProjection = this.projection;
				}
				
				this._featureVector = this._geoJsonFormat.read(this._obj) as Vector.<Feature>;
				this.displayedName = this.identifier;
				var pointStyle:Style = Style.getDefaultPointStyle();
				var lineStyle:Style = Style.getDefaultLineStyle();
				var surfStyle:Style = Style.getDefaultPolygonStyle();
				pointStyle.rules.push(new Rule());
				lineStyle.rules.push(new Rule());
				pointStyle.rules[0].symbolizers.push(new PointSymbolizer(new Marker(7, 3,2)));
				lineStyle.rules[0].symbolizers.push(new LineSymbolizer(new Stroke(0x008800,3,1,Stroke.LINECAP_BUTT)));
				var i:uint;
				var vectorLength:uint = this._featureVector.length;
				for (i = 0; i < vectorLength; i++) {
					if (this._featureVector[i] is PointFeature || this._featureVector[i] is MultiPointFeature) {
						this._featureVector[i].style = pointStyle;
					} else if (this._featureVector[i] is LineStringFeature || this._featureVector[i] is MultiLineStringFeature) {
						this._featureVector[i].style = lineStyle;
					} else {
						this._featureVector[i].style = surfStyle;
					}
					this.addFeature(this._featureVector[i],true,true);
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
				this._obj = com.adobe.serialization.json.JSON.decode(loader.data as String);
				var evt:LayerEvent = new LayerEvent(LayerEvent.LAYER_LOAD_END, this);
				this.dispatchEvent(evt);
				this.drawFeatures(true);
			}
			catch(error:Error) {
				// Empty catch is evil, but here it's fair.
			}
			this.loading = false;
		}
		
		protected function onFailure(event:Event):void {
			this.loading = false;
			Trace.error("Error when loading geojson " + this.url);			
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

		public function get acceptedFileExtensions():Vector.<String>{
			return ACCEPTED_FILE_EXTENSIONS;
		}

	}

}
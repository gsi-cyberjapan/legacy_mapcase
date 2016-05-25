package jp.cyberjapan.webtis.style.marker 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.request.DataRequest;
	import org.openscales.core.style.marker.CustomMarker;
	import flash.events.MouseEvent;
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import org.openscales.core.style.marker.Marker;
	import org.openscales.geometry.basetypes.Bounds;
	
	/**
	 * ...
	 * @author 
	 */
	public class OverlayImage extends CustomMarker 
	{
		/**
		 * The data request that will be used to request the image
		 */
		private var _req:DataRequest = null;
		private var _feature:Feature = null;

		/**
		 * A vector that stores a reference to all the returned temporary display object
		 * to actualize them when the requested marker will be loaded 
		 */
		private var _givenTemporaryMarker:Vector.<DisplayObject>;
		private var _displayObject:Sprite = null;
		
		public function OverlayImage(url:String=null, opacity:Number=1, xOffset:Number=0.5, xUnit:String="fraction", yOffset:Number=0.5, yUnit:String="fraction", proxy:String=null) 
		{
			this._givenTemporaryMarker = new Vector.<DisplayObject>();
			this._displayObject = new Sprite();
			this._displayObject.addChild(new Bitmap());
			super(url, opacity, xOffset, xUnit, yOffset, yUnit, proxy);
		}
		
		override public function loadUrl(url:String):void {
			this._req = new DataRequest(url, onSuccess, onFailure);
			this._req.proxy = this.proxy;
			this._req.send();
		}
		
		override public function getDisplayObject(feature:Feature):DisplayObject {
			return this._displayObject;
		}

		override public function clone():Marker
		{
			var oi:OverlayImage = new OverlayImage(this.url, this.opacity, this.xOffset, this.xUnit, this.yOffset, this.yUnit,this.proxy);
			return oi;
		}

		private function onSuccess(e:Event):void {
			trace("OverlayImage::onSuccess()");
			if (this.clip)
			{
				this.clip.removeEventListener(MouseEvent.CLICK, onMarkerClick);
			}
			this.clip = Bitmap(this._req.loader.content);
			this.clip.addEventListener(MouseEvent.CLICK, onMarkerClick);
			this._req.destroy();
			this._req = null;
			this._displayObject.removeChildAt(0);
			var result:DisplayObject;
			result = new Bitmap(clip.bitmapData);
			if (xUnit == "fraction")
			{
				result.x += -result.width*xOffset;
			}else if (xUnit == "pixels")
			{
				result.x += -xOffset;
			}
			
			if (yUnit == "fraction")
			{
				result.y += -result.height*yOffset;
			}else if (yUnit == "pixels")
			{
				result.y += -yOffset;
			}
			this._displayObject.addChild(result);
			result.addEventListener(MouseEvent.CLICK, onMarkerClick);
			this._feature.draw();
		}
		
		private function onFailure(e:Event):void 
		{
			this._req.destroy();
			this._req = null;
		}
		
		private function onMarkerClick(event:MouseEvent):void
		{
			if (this.clip.parent && this.clip.parent is Feature)
			{
				(this.clip.parent as Feature).onMouseClick(event);
			}
		}
		
		public function set feature(value:Feature):void
		{
			this._feature = value;
		}
	}

}
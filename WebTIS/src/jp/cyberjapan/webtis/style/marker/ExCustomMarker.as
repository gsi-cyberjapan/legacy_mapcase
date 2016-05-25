package jp.cyberjapan.webtis.style.marker 
{
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.style.marker.CustomMarker;
	
	/**
	 * マーカー表示設定の拡張クラス
	 * @author minami.kobayashi
	 */
	public class ExCustomMarker extends CustomMarker 
	{
		private var _scale:Number = 1.0;

		public function get Scale():Number
		{
			return this._scale;
		}
		public function set Scale(value:Number):void
		{
			this._scale = value;
		}
		public function ExCustomMarker(url:String=null, opacity:Number=1, xOffset:Number=0.5, xUnit:String="fraction", yOffset:Number=0.5, yUnit:String="fraction", proxy:String=null) 
		{
			super(url, opacity, xOffset, xUnit, yOffset, yUnit, proxy);
		}
		
		override public function getDisplayObject(feature:Feature):DisplayObject 
		{
			var resultContainer:Sprite = super.getDisplayObject(feature) as Sprite;
			if (!this.clip)
			{
				// デフォルトマーカーを表示しない
				resultContainer.removeChildAt(0);
				resultContainer.addChild(new Bitmap());
			}
			resultContainer.scaleX = this._scale;
			resultContainer.scaleY = this._scale;
			return resultContainer;
		}
	}

}
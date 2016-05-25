package jp.cyberjapan.webtis.style.symbolizer 
{
	import flash.text.TextField;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.style.font.Font;
	import org.openscales.core.style.halo.Halo;
	import org.openscales.core.style.symbolizer.TextSymbolizer;
	import org.openscales.geometry.basetypes.Location;
	import org.openscales.geometry.basetypes.Pixel;
	import flash.text.AntiAliasType;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import jp.cyberjapan.webtis.Settings;

	/**
	 * ...
	 * @author 
	 */
	public class ExTextSymbolizer extends TextSymbolizer 
	{
		private var _offsetX:Number = 0.0;
		private var _showsAlways:Boolean = false;
		
		public function get offsetX():Number
		{
			return this._offsetX;
		}
		
		public function set offsetX(value:Number):void
		{
			this._offsetX = value;
		}

		public function get showsAlways():Boolean
		{
			return this._showsAlways;
		}
		
		public function set showsAlways(value:Boolean):void
		{
			this._showsAlways = value;
		}

		public function ExTextSymbolizer(propertyName:String=null, font:Font=null, halo:Halo=null) 
		{
			super(propertyName, font, halo);
			
		}
		
		/**
		 * 
		 */
		override public function drawTextField(f:Feature, text:String = null):void {

			if (!this._showsAlways && !Settings.drawsLabel) {
				return;
			}
			if(this.propertyName && f.attributes && f.attributes[this.propertyName]) {
				text = f.attributes[this.propertyName];
			} else if(!text){
				return;
			}
			
			var label:TextField = new TextField();
			label.selectable = true;
			label.mouseEnabled = false;
			label.autoSize = TextFieldAutoSize.LEFT;
			label.antiAliasType = AntiAliasType.ADVANCED;
			label.text = text;
			if(font) {
				var textFormat:TextFormat = new TextFormat();
				textFormat.color = this.font.color;
				textFormat.size = this.font.size;
				if(this.font.weight == Font.BOLD) {
					textFormat.bold = true;
				}
				if(this.font.style == Font.ITALIC) {
					textFormat.italic = true;
				}
				if(this.font.family) {
					textFormat.font = this.font.family;
				}
				label.alpha = this.font.opacity;
				label.setTextFormat(textFormat);
			}
			
			if(this.halo) {
				label.filters=[this.halo.getFilter()];
			}
			
			// on calcul le centre et on place le label
			var loc:Location = f.geometry.bounds.center;
			//var px:Pixel = f.layer.map.getMapPxFromLocation(loc);
			var px:Pixel = f.layer.getLayerPxForLastReloadedStateFromLocation(loc);
//			label.x += px.x-label.textWidth/2;
			label.x += px.x + offsetX;
			label.y += px.y-label.textHeight/2;
			f.addChild(label);
		}
	}

}
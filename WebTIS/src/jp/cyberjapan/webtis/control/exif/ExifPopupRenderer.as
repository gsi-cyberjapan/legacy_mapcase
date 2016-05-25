package jp.cyberjapan.webtis.control.exif 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import jp.cyberjapan.webtis.popup.renderer.ExFxPopupRenderer;
	import jp.shichiseki.exif.ExifInfo;
	import mx.containers.Canvas;
	import mx.containers.TitleWindow;
	import mx.controls.Image;
	import mx.events.CloseEvent;
	import mx.events.ResizeEvent;
	import mx.managers.PopUpManager;
	import org.openscales.core.events.I18NEvent;
	import org.openscales.core.i18n.Catalog;
	import org.openscales.fx.popup.FxPopup;
	
	/**
	 * Exifデータのポップアップレンダラー
	 * @author T. Nakayama
	 */
	public class ExifPopupRenderer extends ExFxPopupRenderer 
	{
		private static const ORGPOPUP_MAX_WIDTH:Number = 840;
		private static const ORGPOPUP_MAX_HEIGHT:Number = 640;
		
		private var _info:ExifInfo;
		private var _orgBase:TitleWindow;
		
		[Bindable]
		private var _thumbnailTooltip:String = Catalog.getLocalizationForKey("exifpopup.showOriginalImage");
		
		[Bindable]
		private var _orgImageTooltip:String = Catalog.getLocalizationForKey("exifpopup.closepopup");
		
		public function ExifPopupRenderer(info:ExifInfo=null) 
		{
			_info = info;
		}
		
		private function localize(e:I18NEvent=null):void {
			_thumbnailTooltip = Catalog.getLocalizationForKey("exifpopup.showOriginalImage");
			_orgImageTooltip = Catalog.getLocalizationForKey("exifpopup.closepopup");
		}
		
		override public function setContents(value:Object):void
		{
			if (value is ExifInfo)
			{
				//_feature = value as ExifFeature;
				_info = value as ExifInfo;
				var canvas:Canvas = new Canvas();
				var img:Image = new Image();
				img.source = _info.thumbnailData;
				img.x = 2;
				img.toolTip = _thumbnailTooltip;
				canvas.addElement(img);
			//  hamas : 13.10.08 Grid/Table対策
			//	_contents = canvas;
				_contentStructure.addElement(canvas);
				
				img.addEventListener(ResizeEvent.RESIZE, onResize);
				img.addEventListener(MouseEvent.CLICK, showOriginalImage);
			}
		}
		
		private function onResize(e:Event):void 
		{
			fxpopup.WIDTH = (e.currentTarget as Image).width + 4;
			fxpopup.HEIGHT = (e.currentTarget as Image).height + 64/*TITLE_HEIGHT + VERTICAL_PADDING * 4*/;
			closeButton.x = fxpopup.WIDTH - closeButton.width - HORIZONAL_PADDING;
		}
		
		private function showOriginalImage(e:Event):void 
		{
			_orgBase = new TitleWindow();
			_orgBase.showCloseButton = true;
			_orgBase.setStyle("paddingTop", 0);
			_orgBase.setStyle("paddingLeft", 0);
			_orgBase.setStyle("paddingBottom", 0);
			_orgBase.setStyle("paddingRight", 0);
			var img:Image = new Image();
			var orgWidth:Number = _info.ifds.exif.getEntryByTagName("PixelXDimension").data as Number;
			var orgHeight:Number = _info.ifds.exif.getEntryByTagName("PixelYDimension").data as Number;
			var tmpWidth:Number = orgWidth;
			var tmpHeight:Number = orgHeight + 33;
			var hScroll:Boolean = false;
			var vScroll:Boolean = false;
			if (tmpWidth > fxpopup.fxmap.width - 100)
			{
				_orgBase.width = fxpopup.fxmap.width - 100;
				tmpWidth = _orgBase.width;
				hScroll = true;
			}
			if (tmpHeight > fxpopup.fxmap.height - 100)
			{
				_orgBase.height = fxpopup.fxmap.height - 100;
				tmpHeight = _orgBase.height;
				vScroll = true;
			}
			_orgBase.x = (fxpopup.fxmap.width - tmpWidth) / 2;
			_orgBase.y = (fxpopup.fxmap.height - tmpHeight) / 2;
			img.source = (fxpopup.feature as ExifFeature).imgData;
			img.toolTip = _orgImageTooltip;
			img.addEventListener(MouseEvent.CLICK, closeOrgImage);
			_orgBase.addEventListener(CloseEvent.CLOSE, closeOrgImage);
			_orgBase.addElement(img);
			PopUpManager.addPopUp(_orgBase, this.fxpopup);
		}
		
		private function closeOrgImage(e:Event):void 
		{
			PopUpManager.removePopUp(_orgBase);
		}
		
		override public function set fxpopup(value:FxPopup):void 
		{
			super.fxpopup = value;
			if (value.fxmap)
			{
				value.fxmap.map.addEventListener(I18NEvent.LOCALE_CHANGED, localize);
			}
		}
	}

}
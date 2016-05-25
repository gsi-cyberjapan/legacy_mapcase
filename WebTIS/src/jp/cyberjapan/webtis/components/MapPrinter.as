package jp.cyberjapan.webtis.components 
{
	import flash.display.Bitmap;
	import jp.cyberjapan.webtis.control.ExScaleLine;
	import mx.containers.Box;
	import mx.containers.Canvas;
	import mx.controls.Image;
	import mx.controls.Text;
	import mx.graphics.ImageSnapshot;
	import mx.logging.ILogger;
	import mx.logging.Log;
	import mx.managers.PopUpManager;
	import mx.printing.FlexPrintJob;
	import org.openscales.core.Map;
	import org.openscales.fx.control.ScaleLine;

	/**
	 * 地図印刷.
	 * 現在表示されている地図を印刷する機能を提供します。
	 * @author T. Nakayama
	 */
	public class MapPrinter 
	{
		private static var logger:ILogger = Log.getLogger("MapPrinter");

		private var _map:Map = null;
		
	// hamas : 13.07.30	ScaleLine->ExScaleLine
		private var _scaleLine:ExScaleLine;
		
		private var _termOfService:Text;

		[Embed(source="../../../../../assets/images/logo.gif")]
		private var _logo:Class;

		/**
		 * 印刷する地図
		 */
		public function set map(value:Map):void
		{
			this._map = value;
		}

	// hamas : 13.07.30	ScaleLine->ExScaleLine
		/**
		 * スケールバー
		 */
		public function set scaleLine(value:ExScaleLine):void
		{
			this._scaleLine = value;
		}

		/**
		 * 著作権表示
		 */
		public function set termOfService(value:Text):void
		{
			this._termOfService = value;
		}

		/**
		 * 印刷.
		 * 地図の印刷を実行します。
		 * @param	map 印刷対象の地図
		 */
		public function print(map:Map):void
		{
			if (this._map == null) {
				return;
			}
			var canvas:Canvas = new Canvas();
			canvas.styleName = "PrintCanvas";
			canvas.height = map.height;
			canvas.width = map.width;
			canvas.horizontalScrollPolicy = "off";
			canvas.verticalScrollPolicy = "off";
			// 地図画像
			{
				var bm:Bitmap = new Bitmap(ImageSnapshot.captureBitmapData(map));
				var img:Image = new Image();
				img.source = bm;
				bm.scaleX = 1.0;
				bm.scaleY = 1.0;
				var box:Box = new Box();
				box.addChild(img);
				canvas.addChild(box);
			}
			// ロゴ
			/*******************************************************************
			{
				var logoimg:Image = new Image();
				logoimg.source = _logo;
				logoimg.left = 5;
				logoimg.bottom = 5;
				canvas.addChild(logoimg);
			}
			*******************************************************************/
			// スケールバー
			if (this._scaleLine != null && this._scaleLine.visible)
			{
				var sline:ExScaleLine = new ExScaleLine();
				sline.map = this._map;
				sline.bottom = 5;
				sline.left = 50;
				canvas.addChild(sline);
			}
			// 著作権表示
			if (this._termOfService != null)
			{
				var tos:Text = new Text();
				tos.htmlText = this._termOfService.htmlText;
				tos.right = 0;
				tos.bottom = 0;
				canvas.addChild(tos);
			}
			canvas.visible = false;
			PopUpManager.addPopUp(canvas, map);

			var pj:FlexPrintJob = new FlexPrintJob();
			pj.printAsBitmap = false;
			if (pj.start()) {
				try {
					pj.addObject(canvas);
				} catch (error:Error) {
				}
				pj.send();
				}
		}
	}

}
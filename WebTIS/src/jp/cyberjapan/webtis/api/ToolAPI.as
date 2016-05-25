package jp.cyberjapan.webtis.api 
{
	import flash.external.ExternalInterface;
	import flash.system.Security;
	import jp.cyberjapan.webtis.control.measure.ExMeasureToolbar;
	import org.openscales.core.events.DrawingEvent;
	import org.openscales.core.i18n.Catalog;
	import org.openscales.fx.control.layer.LayerManager;
	import spark.components.Button;
	import jp.cyberjapan.webtis.control.drawing.ExDrawingToolbar;
	
	/**
	 * 各種ツール操作関連API
	 * @author minami.kobayashi
	 */
	public class ToolAPI 
	{
		[Bindable]
		private var _drawingBtnLabel:String = Catalog.getLocalizationForKey("drawingBtn.toolTip");

		[Bindable]
		private var _printBtnLabel:String = Catalog.getLocalizationForKey("printBtn.toolTip");

		[Bindable]
		private var _measureBtnLabel:String = Catalog.getLocalizationForKey("measureBtn.toolTip");

		[Bindable]
		private var _floatBtnLabel:String = Catalog.getLocalizationForKey("floatBtn.toolTip");

		// 描画ツールバー
		private var _drawingBtn:Button = null;
		private var _dbar:ExDrawingToolbar = null;
		// 計測ツールバー
		private var _measureBtn:Button = null;
		private var _mbar:ExMeasureToolbar = null;
		// 印刷ボタン
		private var _printBtn:Button = null;
		// 地図ボタン
		private var _floatBtn:Button = null;
		//private var _fbar:??? = null;
		
		/**
		 * 
		 * @param	mBtn
		 * @param	mbar
		 * @param	dBtn
		 * @param	dbar
		 * @param	pBtn
		 * @param	fBtn
		 */
		public function ToolAPI(mBtn:Button, mbar:ExMeasureToolbar, dBtn:Button, dbar:jp.cyberjapan.webtis.control.drawing.ExDrawingToolbar, pBtn:Button, fBtn:Button)
		{
			// 作図
			this._drawingBtn = dBtn;
			this._drawingBtn.toolTip = _drawingBtnLabel;
			this._dbar = dbar;
			// 計測
			this._measureBtn = mBtn;
			this._measureBtn.toolTip = _measureBtnLabel;
			this._mbar = mbar;
			// 印刷
			this._printBtn = pBtn;
			this._printBtn.toolTip = _printBtnLabel;
			// 地図
			this._floatBtn = fBtn;
			this._floatBtn.toolTip = _floatBtnLabel;
			
			this.addCallbacks();
		}
		
		public function addCallbacks() : void
		{
			Security.allowDomain( "*" );
			if (ExternalInterface.available)
			{
				//ExternalInterface.addCallback("createScaleBar", createScaleBar);
				ExternalInterface.addCallback("createDrawingBtn", createDrawingBtn);
				ExternalInterface.addCallback("createMeasureBtn", createMeasureBtn);
				ExternalInterface.addCallback("createPrintBtn", createPrintBtn);
				ExternalInterface.addCallback("createMapChangerBtn", createMapChangerBtn);
			}
		}

		/**
		 * 作図ツールバー表示用ボタンを配置する
		 * @param	x		ボタン位置のx座標
		 * @param	y		ボタン位置のy座標
		 * @param	toolX	ツールバー位置のx座標
		 * @param	toolY	ツールバー位置のy座標
		 */
		public function createDrawingBtn(x:Number, y:Number, toolX:Number, toolY:Number) : void
		{
			_drawingBtn.x = x;
			_drawingBtn.y = y;
			_dbar.x = toolX;
			_dbar.y = toolY;
			_drawingBtn.visible = true;
			_dbar.visible = false;	// 初期状態は非表示
		}			

		/**
		 * [内部使用]
		 * 描画ツールバーの表示/非表示を切り替える
		 */
		public function setVisibleDrawingToolbar() : void
		{
			_dbar.visible = !_dbar.visible;
			if (!_dbar.visible) {
				// 表示から非表示にするときは、ダミーのイベントを投げて描画モードを終了する。
				this._dbar.map.dispatchEvent(new DrawingEvent(DrawingEvent.DRAW_HANDLER_ACTIVATED));
				this._dbar.map.dispatchEvent(new DrawingEvent(DrawingEvent.DRAW_HANDLER_DESACTIVATED));
			}
		}			

		/**
		 * 計測ツールバー表示用ボタンを配置する
		 * @param	x		ボタン位置のx座標
		 * @param	y		ボタン位置のy座標
		 * @param	toolX	ツールバー位置のx座標
		 * @param	toolY	ツールバー位置のy座標
		 */
		public function createMeasureBtn(x:Number, y:Number, toolX:Number, toolY:Number) : void
		{
			_measureBtn.x = x;
			_measureBtn.y = y;
			_mbar.x = toolX;
			_mbar.y = toolY;
			_measureBtn.visible = true;
		}			

		/**
		 * [内部使用]
		 * 計測ツールバーの表示/非表示を切り替える
		 */
		public function setVisibleMeasureToolbar() : void
		{
			_mbar.visible = !_mbar.visible;
		}
		
		/**
		 * 印刷ツールバー表示用ボタンを配置する
		 * @param	x		ボタン位置のx座標
		 * @param	y		ボタン位置のy座標
		 * @param	toolX	ツールバー位置のx座標
		 * @param	toolY	ツールバー位置のy座標
		 */
		public function createPrintBtn(x:Number, y:Number/*, toolX:Number, toolY:Number*/) : void
		{
			_printBtn.x = x;
			_printBtn.y = y;
			_printBtn.visible = true;
		}

		/**
		 * 地図ツールバー表示用ボタンを配置する
		 * @param	x		ボタン位置のx座標
		 * @param	y		ボタン位置のy座標
		 * @param	toolX	ツールバー位置のx座標
		 * @param	toolY	ツールバー位置のy座標
		 */
		public function createMapChangerBtn(x:Number, y:Number, toolX:Number, toolY:Number) : void
		{
			_floatBtn.x = x;
			_floatBtn.y = y;
			//_fbar.x = toolX;
			//_fbar.y = toolY;
			_floatBtn.visible = true;
		}

		/**
		 * [内部使用]
		 * 地図ツールバーの表示/非表示を切り替える
		 */
		public function setVisibleFloatToolbar() : void
		{
			//_fbar.visible = !_fbar.visible;
		}

	}

}
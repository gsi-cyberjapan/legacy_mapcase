package jp.cyberjapan.webtis.popup.renderer 
{
	import assets.fxg.ButtonCloseOver;
	import assets.fxg.ButtonCloseUp;
	import flash.events.MouseEvent;
	import flash.text.engine.FontWeight;
	import flash.text.StyleSheet;
	import mx.containers.Canvas;
	import mx.containers.Grid;
	import mx.containers.GridRow;
	import mx.containers.GridItem;
	import mx.controls.TextArea;
	import mx.controls.Text;
	import mx.core.UIComponent;
	import mx.graphics.SolidColorStroke;
	import org.openscales.fx.control.IconButton;
	import org.openscales.fx.popup.renderer.FxPopupRenderer;
	import spark.components.RichText;
//  hamas : 13.10.08 Grid/Table対策
	import spark.components.Scroller;
	import spark.components.VGroup;
	import spark.primitives.Path;
	import mx.controls.Alert;

//  hamas : 13.09.09 オブジェクト編集呼出
	import spark.components.HGroup;
	import spark.primitives.BitmapImage;
	import org.openscales.core.Map;
	import org.openscales.fx.FxMap;
	import org.openscales.core.layer.VectorLayer;
	import org.openscales.core.feature.Feature;
	import jp.cyberjapan.webtis.control.drawing.popup2.SelectFeature;
	import jp.cyberjapan.webtis.control.drawing.popup2.DeleteFeature;
//	import jp.cyberjapan.webtis.control.drawing.popup2.EditFeature;
//	import jp.cyberjapan.webtis.control.drawing.popup2.MoveFeature;
	import jp.cyberjapan.webtis.control.drawing.popup2.PopEditStyle;
	import jp.cyberjapan.webtis.control.drawing.popup2.PopDispInformation;
	import jp.cyberjapan.webtis.Settings;
	
	/**
	 * ポップアップレンダラーの標準カスタム
	 * @author minami.kobayashi
	 */
	public class ExFxPopupRenderer extends FxPopupRenderer
	{		
		protected static const HORIZONAL_PADDING:Number = 8;
		protected static const VERTICAL_PADDING:Number = 6;
		protected static const TITLE_HEIGHT:Number = 16;
		
		// タイトル部分
		protected var _titleStructure:Canvas;
		protected var closeButton:IconButton;
		// 区切り線
		protected var _separatorLine:Path;
		// コンテンツ
	//  hamas : 13.10.08 Grid/Table対策
		protected var _contentScroller:Scroller;
		protected var _contentStructure:VGroup;
	//	protected var _contents:UIComponent;
		
	//  hamas : 13.09.09 オブジェクト編集呼出
		// 区切り線
		protected var _separatorLine2:Path;
		// アイコン表示
		protected var _iconStructure:HGroup;
		protected var btnEditAttr:SelectFeature;
		protected var btnDeleteFeature:DeleteFeature;
//		protected var btnEditFeature:EditFeature;
//		protected var btnMoveFeature:MoveFeature;
		protected var btnEditStyle:PopEditStyle;
		protected var btnDispInformation:PopDispInformation;

		// ポップアップの下に編集アイコンをｓ表示するかどうか
		protected var _showsIcon:Boolean = false;

		public function ExFxPopupRenderer()
		{
			// タイトル
			var title:RichText = new RichText();
			title.setStyle("lineBreak", "toFit");
			title.maxDisplayedLines = 1;
			title.setStyle("backgroundAlpha", 0);
			title.setStyle("fontWeight", FontWeight.BOLD);
			title.setStyle("fontSize", 14);
			
			// ×ボタン
			//var closeButton:IconButton = new IconButton();
			closeButton = new IconButton();
			closeButton.width = 16;
			closeButton.setStyle("icon", new ButtonCloseUp());
			closeButton.setStyle("iconOver", new ButtonCloseOver());
			closeButton.setStyle("iconDown", new ButtonCloseOver());
			//closeButton.setStyle("bottom", 3);
			
			_titleStructure = new Canvas();
			//_titleStructure.paddingLeft = HORIZONAL_PADDING;
			//_titleStructure.paddingRight = HORIZONAL_PADDING;
			_titleStructure.addElement(title);
			_titleStructure.addElement(closeButton);
			
			// 区切り線
			_separatorLine = new Path();
			_separatorLine.data = "M0 0 300 0";
			var stroke:SolidColorStroke = new SolidColorStroke();
			stroke.weight = 0.1;
			stroke.scaleMode = "none";
			stroke.caps = "none";
			stroke.pixelHinting = true;
			stroke.color = 0x959595;
			_separatorLine.stroke = stroke;
			
		//  hamas : 13.10.08 Grid/Table対策
			_contentScroller = new Scroller();
			
			// コンテンツ部
			_contentStructure = new VGroup();
			
		//  hamas : 13.09.09 オブジェクト編集呼出
			// アイコン表示
			_separatorLine2 = new Path();
			_separatorLine2.data = "M0 0 300 0";
			var stroke2:SolidColorStroke = new SolidColorStroke();
			stroke2.weight = 0.1;
			stroke2.scaleMode = "none";
			stroke2.caps = "none";
			stroke2.pixelHinting = true;
			stroke2.color = 0x959595;
			_separatorLine2.stroke = stroke2;
			
			_iconStructure = new HGroup();
			_iconStructure.gap = 5;
		}
		
		override public function draw():void
		{
			if (fxpopup.relativePosition == "tl" || fxpopup.relativePosition == "tr")
			{
				fxpopup.popupContentGroup.top = 7;
			}
			else if (fxpopup.relativePosition == "bl" || fxpopup.relativePosition == "br")
			{
				fxpopup.popupContentGroup.top = 11;
			}
		//  hamas : 13.10.08 Grid/Table対策
			if ( _contentStructure.numElements == 0 ) {
				setContents("");
			}
			
			// 全体の組み立て
			var structure:VGroup = new VGroup();
			structure.paddingTop = VERTICAL_PADDING;
			structure.setStyle("contentBackgroundAlpha", 0);
			structure.gap = 5;
			structure.addElement(_titleStructure);
			structure.addElement(_separatorLine);			
		//  hamas : 13.10.08 Grid/Table対策
			_contentScroller.viewport = _contentStructure;
			structure.addElement(_contentScroller);

		//  hamas : 13.09.09 オブジェクト編集呼出
//			if (Settings.showsEditIconsOnPopup) {
			if (this._showsIcon) {
				structure.addElement(_separatorLine2);
				structure.addElement(_iconStructure);
			}
			
			if (fxpopup.popupContentGroup && fxpopup.popupContentGroup.initialized)
			{
				fxpopup.popupContentGroup.addElement(structure);
			}
			
			fxpopup.visible = true;
		}
		
		/**
		 * タイトルの設定
		 * @param	title
		 */
		override public function set titleContent(value:String):void
		{
			super.titleContent = value;
			
			var title:RichText = (_titleStructure.getElementAt(0) as RichText);
			title.text = this.titleContent;
			//title.toolTip = titleContent;	
			title.height = TITLE_HEIGHT;
			if (fxpopup)
			{
				title.x = HORIZONAL_PADDING;
				//title.width = fxpopup.WIDTH - 36;
				closeButton.x = fxpopup.WIDTH - closeButton.width - HORIZONAL_PADDING;
				_titleStructure.getElementAt(1).addEventListener(MouseEvent.MOUSE_UP, fxpopup.destroy);
			}
		}
		
		public function set showsIcon(value:Boolean):void
		{
			this._showsIcon = value;
		}

		//  hamas : 13.09.09 オブジェクト編集呼出
		public function setMap(map:Map, fxMap:FxMap):void
		{
			btnEditAttr = new SelectFeature();
			btnDeleteFeature = new DeleteFeature();
//			btnEditFeature = new EditFeature();
//			btnMoveFeature = new MoveFeature();
			btnEditStyle = new PopEditStyle();
			btnDispInformation = new PopDispInformation();
			
			btnEditAttr.map = map;
			btnDeleteFeature.map = map;
//			btnEditFeature.map = map;
//			btnMoveFeature.map = map;
			btnEditStyle.map = map;
			btnDispInformation.map = map;
			btnEditAttr.fxMap = fxMap;
			btnDispInformation.fxMap = fxMap;

			_iconStructure.addElement(btnEditAttr);
			_iconStructure.addElement(btnDeleteFeature);
//			_iconStructure.addElement(btnEditFeature);
//			_iconStructure.addElement(btnMoveFeature);
			_iconStructure.addElement(btnEditStyle);
			_iconStructure.addElement(btnDispInformation);			
		}
		public function setTarget(feature:Feature):void
		{
			if( feature != null ){
				btnEditAttr.targetFeature = feature;				
				btnDeleteFeature.targetFeature = feature;
//				btnEditFeature.targetFeature = feature;
//				btnMoveFeature.targetFeature = feature;
				btnEditStyle.setTarget(feature);
				btnDispInformation.targetFeature = feature;		
			}
		}
		public function clearTarget():void
		{
			btnEditAttr.target = null;
			btnDeleteFeature.target = null;
//			btnEditFeature.target = null;
//			btnMoveFeature.target = null;
			btnEditStyle.target = null;
			btnDispInformation.target = null;
		}
		
		override public function destroy():void 
		{
			super.destroy();
		//  hamas : 13.10.08 Grid/Table対策
			_contentStructure.removeAllElements();
		}
		
	// hamas : 13.09.25 KMLのdescriptionにおけるtableタグの対応
		/**
		 * コンテンツ部の設定
		 * @param	contents
		 */
		public function setContents(contents:Object):void
		{
		//  hamas : 13.10.08 Grid/Table対策
			if (contents is String)
			{
				var str:String = (contents as String).replace("\n", "");
				var exp:RegExp = /<table>.*.<\/table>/;
				var tableStr:Array = str.match(exp);
				var otherStr:Array = str.split(exp);
				
				if ( !tableStr ) {
					addContents(contents as String);
				} else {
					if ( tableStr.length != 1) {
						return ;
					}
					addContents(otherStr[0] as String);
					addContents(tableStr[0] as String);
					if ( otherStr.length > 1 ) {
						addContents(otherStr[1] as String);
					}
				}
			}
			else if(contents is UIComponent) 
			{
				_contentStructure.addElement(contents as UIComponent);
			}

			if (fxpopup)
			{
				_contentScroller.width = fxpopup.WIDTH - HORIZONAL_PADDING/2;
			//  hamas : 13.09.09 オブジェクト編集呼出 (-30)
//				if (Settings.showsEditIconsOnPopup) {
				if (this._showsIcon) {
					_contentScroller.height = fxpopup.HEIGHT - TITLE_HEIGHT - 46 - 30;
				} else {
					_contentScroller.height = fxpopup.HEIGHT - TITLE_HEIGHT - 46;
				}
			}	
		}
		
	//  hamas : 13.10.08 Grid/Table対策
		private function addContents(targetStr:String):void
		{
			if ( targetStr == "") {
				return ;
			}
			// t-nakayama : 暫定対応（<table>タグがあればGridを作り、なければTextAreaを作る）
			var component:UIComponent = null;
			if (targetStr.match(/<table/)) {
				var gd:Grid = setGridItems(targetStr);
				gd.setStyle("borderVisible", false);
				gd.setStyle("contentBackgroundAlpha", 0);
				gd.setStyle("paddingLeft", HORIZONAL_PADDING);
				gd.setStyle("paddingRight", HORIZONAL_PADDING);
				gd.setStyle("verticalGap", 2);
				component = gd;
			} else {
				this.content = targetStr;
				var textArea:TextArea = new TextArea();
				textArea.percentWidth = 100;
				textArea.percentHeight = 100;
				textArea.setStyle("borderVisible", false);
				textArea.setStyle("contentBackgroundAlpha", 0);
				textArea.setStyle("paddingLeft", HORIZONAL_PADDING);
				textArea.setStyle("paddingRight", HORIZONAL_PADDING);
				textArea.htmlText = this.content;
				textArea.editable = false;
				component = textArea;
			}
			
			_contentStructure.addElement(component);
		}		

		private function setGridItems(contents:String):Grid
		{
			var gd:Grid = new Grid();
			
			var pos:int = 0;
			var startExp:RegExp = /<table[\n\s>]/gi;
			var endExp:RegExp = /<\/table>/gi;
			var startTag:Object = null;
			var endTag:Object = null;
			
			while (null != (startTag = startExp.exec(contents))) {

				// 終了タグのマッチング
				endTag = endExp.exec(contents);
				if (endTag == null) {
					// 開始タグがあるのに終了タグがなければ、HTMLが不正のため、入力をそのまま返す。
					return null;
				}
				pos = endTag["index"] + endTag[0].length;

				// TABLEタグの切り出し
				var tableText:String = contents.substring(startTag["index"], endTag["index"] + endTag[0].length);
				{
					// タグの属性値が""で囲まれていないとXMLが読めないので、TABLE, TR, TDについては属性を削除
					tableText = tableText.replace(/<table[^>]*>/gi, "<table>");
					tableText = tableText.replace(/<tr[^>]*>/gi, "<tr>");
					tableText = tableText.replace(/<td[^>]*>/gi, "<td>");
					tableText = tableText.replace(/<\/table>/gi, "</table>");
					tableText = tableText.replace(/<\/tr>/gi, "</tr>");
					tableText = tableText.replace(/<\/td>/gi, "</td>");
				}				
				var xml:XML = new XML(tableText);
				
				for each (var tableElement:XML in xml.children()) {
					if (tableElement.nodeKind() == "element" && tableElement.localName().toLowerCase() == "tr")
					{
						var gr:GridRow = new GridRow();
						for each (var rowElement:XML in tableElement.children()) {
							if (rowElement.nodeKind() == "element" && rowElement.localName().toLowerCase() == "td")
							{
								var item:GridItem = new GridItem();	
								{
									var txt: Text = new Text();
									txt.htmlText = rowElement.children().toXMLString();

									var style:StyleSheet = new StyleSheet();
									var styleText:String = "a {color:#0000FF;text-decoration:underline;}";
									style.parseCSS(styleText);
									txt.styleSheet = style;

//									var cv: Canvas = new Canvas();
//									cv.addChild(txt);
								}
//								item.addChild(cv);
								item.addChild(txt);
								gr.addChild(item);	
							}
						}
						gd.addChild(gr);
					}
				}
			}
			return gd;
		}
		
	// hamas : 13.09.25 #105の対応に伴い削除
		/*
		public function setContents(contents:Object):void
		{
			if (contents is String)
			{
				// <table>タグを<textformat>タグに置き換え
				var text:String = contents as String;
				text = replaceHtmlTableToTextformat(text); // <table>タグを<textformat>タグに置き換え

				// StringデータはTextAreaに表示
				this.content = text;
				var textArea:TextArea = new TextArea();
				textArea.setStyle("borderVisible", false);
				textArea.setStyle("contentBackgroundAlpha", 0);
				textArea.setStyle("paddingLeft", HORIZONAL_PADDING);
				textArea.setStyle("paddingRight", HORIZONAL_PADDING);
				if (fxpopup)
				{
					textArea.width = fxpopup.WIDTH - HORIZONAL_PADDING/2;
					//  hamas : 13.09.09 オブジェクト編集呼出 (-30)
					if (Settings.showsEditIconsOnPopup) {
						textArea.height = fxpopup.HEIGHT - TITLE_HEIGHT - 46 - 30;
					} else {
						textArea.height = fxpopup.HEIGHT - TITLE_HEIGHT - 46;
					}
				}
				//textArea.textFlow = TextConverter.importToFlow(content, TextConverter.TEXT_FIELD_HTML_FORMAT);
				textArea.htmlText = this.content;
				textArea.editable = false;
				_contents = textArea;
			}
			else if(contents is UIComponent) 
			{
				_contents = contents as UIComponent;
			}
		}

		private function replaceHtmlTableToTextformat(contents:String):String
		{
			var pos:int = 0;
			var startExp:RegExp = /<table[\n\s>]/gi;
			var endExp:RegExp = /<\/table>/gi;
			var startTag:Object = null;
			var endTag:Object = null;
			var replaced:String = "";
			while (null != (startTag = startExp.exec(contents))) {
				// 開始タグにマッチするまでの文字列をそのまま出力
				if (startTag["index"] > pos) {
					replaced += contents.substring(pos, startTag["index"]);
				}
				
				// 終了タグのマッチング
				endTag = endExp.exec(contents);
				if (endTag == null) {
					// 開始タグがあるのに終了タグがなければ、HTMLが不正のため、入力をそのまま返す。
					return contents;
				}
				pos = endTag["index"] + endTag[0].length;

				// TABLEタグの切り出し
				var tableText:String = contents.substring(startTag["index"], endTag["index"] + endTag[0].length);
				{
					// タグの属性値が""で囲まれていないとXMLが読めないので、TABLE, TR, TDについては属性を削除
					tableText = tableText.replace(/<table[^>]*>/gi, "<table>");
					tableText = tableText.replace(/<tr[^>]*>/gi, "<tr>");
					tableText = tableText.replace(/<td[^>]*>/gi, "<td>");
					tableText = tableText.replace(/<\/table>/gi, "</table>");
					tableText = tableText.replace(/<\/tr>/gi, "</tr>");
					tableText = tableText.replace(/<\/td>/gi, "</td>");
				}
				var xml:XML = new XML(tableText);
				replaced += "<textformat leftmargin=\"2\" rightmargin=\"2\">";
				var trcount:int = 0;
				for each (var tableElement:XML in xml.children()) {
					if (tableElement.nodeKind() == "element" && tableElement.localName().toLowerCase() == "tr") {
						if (trcount > 0) {
							replaced += "&#x0A;";
						}
						++trcount;
						var tdcount:int = 0;
						for each (var rowElement:XML in tableElement.children()) {
							if (rowElement.nodeKind() == "element" && rowElement.localName().toLowerCase() == "td") {
								if (tdcount > 0) {
									replaced += "&#x09;";
								}
								++tdcount;
								replaced += rowElement.children().toXMLString();
							}
						}
					}
				}
				replaced += "</textformat>";
			}
			// 最後の終了タグから文字列の末尾までをそのまま出力
			if (contents.length >= pos) {
				replaced += contents.substring(pos, contents.length + 1);
			}
			return replaced;
		}
		*/
	}
}
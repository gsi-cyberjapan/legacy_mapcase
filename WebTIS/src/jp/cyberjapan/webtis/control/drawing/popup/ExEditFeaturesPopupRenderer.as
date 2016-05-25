package jp.cyberjapan.webtis.control.drawing.popup 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.text.engine.FontWeight;
	import flash.text.engine.TextLine;
	import flash.text.TextField;
	import jp.cyberjapan.webtis.popup.renderer.ExFxPopupRenderer;
	import mx.collections.ArrayCollection;
	import mx.containers.Canvas;
	import mx.core.Container;
	import mx.core.UIComponent;
	import mx.graphics.SolidColorStroke;
	import org.openscales.core.events.I18NEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.i18n.Catalog;
	import spark.components.Button;
	import spark.components.Group;
	import spark.components.HGroup;
	import spark.components.Label;
	import spark.components.RichText;
	import spark.components.TextArea;
	import spark.components.TextInput;
	import spark.components.VGroup;
	import spark.primitives.Path;
// hamas : 13.09.10 追加
	import org.openscales.core.Map;
	
	/**
	 * 属性編集ダイアログのレンダラー
	 * @author minami.kobayashi
	 */
	public class ExEditFeaturesPopupRenderer extends ExFxPopupRenderer 
	{
		private static const LABEL_WIDTH:Number = 84;
		private static const INPUT_WIDTH:Number = 140;
		private static const BUTTON_WIDTH:Number = 46;
		public static const ATTR_NAME:String = "name";
		public static const ATTR_DESCRIPTION:String = "description";
		public static const ATTR_TYPE:String = "type";
		public static const ATTR_ITEM:String = "item";
		public static const ATTR_VALUE:String = "value";
		public static const TYPE_FREE:String = "free";
		public static const TYPE_TABLE:String = "table";
		
		// オブジェクト名
		protected var _nameInput:TextInput;
		// 概要
		protected var _descriptionArea:TextArea;
		// 情報（表）
		protected var _discriptionItem:TextField;
		protected var _discriptionValue:TextField;
		// 保存ボタン
		protected var _btnValid:Button;
		// キャンセルボタン
		protected var _btnDiscard:Button;
		// 削除ボタン
		protected var _btnDelete:Button;
		// 項目追加ボタン
		protected var _btnItemadd:Button;
		// リンク追加ボタン
		protected var _btnLink:Button;
		// 画像追加ボタン
		protected var _btnImage:Button;

		protected var _labelDiscription:TextLine;
		protected var _tableDiscription:VGroup;

		// 画面切り替えフラグ(true:free/false:table)
		protected var viewflg:Boolean;
		// 表示用領域
		protected var viewTable:Container;

	// hamas : 13.09.10 追加
		private var _map:Map;
		public function set map(value:Map):void {
			this._map = value;
		}
		
		public function ExEditFeaturesPopupRenderer() 
		{
			super();
		}
		
		override public function draw():void {
			if (this.fxpopup.feature){
				setFeature(this.fxpopup.feature);
			}

			// 保存ボタン・キャンセルボタン
			var group:HGroup = new HGroup();
			group.setStyle("backgroundColor", 0x666666);
			group.width = fxpopup.WIDTH;
			group.gap = 6;
			group.horizontalAlign = "center";
			
			if(!_btnValid) {
				_btnValid = new Button();
				_btnValid.addEventListener(MouseEvent.CLICK, valid);
				_btnValid.label = Catalog.getLocalizationForKey("editfeatureattributes.valid");
			}
			if(!_btnDiscard) {
				_btnDiscard = new Button();
				_btnDiscard.addEventListener(MouseEvent.CLICK, close);
				_btnDiscard.label = Catalog.getLocalizationForKey("editfeatureattributes.discard");
			}
			
			group.addElement(_btnValid);
			group.addElement(_btnDiscard);
			
		//  hamas : 13.10.08 Grid/Table対策
		//	(_structure as Group).addElement(group);
			_contentStructure.addElement(group);
			
			super.draw();
		}
		
		private function setFeature(feature:Feature):void 
		{
			if (this.fxpopup.feature.attributes[ATTR_TYPE] == null || this.fxpopup.feature.attributes[ATTR_TYPE] == TYPE_TABLE) {
				viewflg = false;
				this.fxpopup.feature.attributes[ATTR_TYPE] = TYPE_TABLE;
			}else {
				viewflg = true;
				this.fxpopup.feature.attributes[ATTR_TYPE] = TYPE_FREE;
			}

			var _vgroup:VGroup = new VGroup();
			_vgroup.gap = 8;
			_vgroup.paddingTop = 5;
			_vgroup.paddingLeft = HORIZONAL_PADDING;
			_vgroup.paddingRight = HORIZONAL_PADDING;
			
			// オブジェクト名
			_vgroup.verticalAlign = "middle";
			_vgroup.gap = 8;
			var lb:Label = new Label();
			lb.width = LABEL_WIDTH + INPUT_WIDTH;
			lb.text = Catalog.getLocalizationForKey("editfeatureattributes.name")
			+ Catalog.getLocalizationForKey("editfeatureattributes.nameattr")
			+ " : ";
			_vgroup.addElement(lb);
			_nameInput = new TextInput();
			_nameInput.id = ATTR_NAME;
			_nameInput.width = LABEL_WIDTH + INPUT_WIDTH + BUTTON_WIDTH;
			if(feature.attributes[ATTR_NAME]) {
				_nameInput.text = feature.attributes[ATTR_NAME];
			} else {
				_nameInput.text = "";
			}
//			_vgroup.addElement(_nameInput);
			var nameInputGroup:HGroup = new HGroup();
			nameInputGroup.paddingLeft = 10;
			nameInputGroup.addElement(_nameInput);	// 字下げするためにHGroupを間に挟む
			_vgroup.addElement(nameInputGroup);
			_vgroup.addElement(super._separatorLine);

			// 区切り線
			var separator1:Path = new Path();
			separator1.data = "M0 0 300 0";
			var stroke:SolidColorStroke = new SolidColorStroke();
			stroke.weight = 0.1;
			stroke.scaleMode = "none";
			stroke.caps = "none";
			stroke.pixelHinting = true;
			stroke.color = 0x959595;
			separator1.stroke = stroke;
			var separatorGroup1:VGroup = new VGroup();
			separatorGroup1.paddingTop = VERTICAL_PADDING;
			separatorGroup1.paddingBottom = VERTICAL_PADDING;
			separatorGroup1.addElement(separator1);
			_vgroup.addElement(separatorGroup1);
			
			// 概要(タイトルラベル)
			var group:HGroup;
			group = makeTitle();
			_vgroup.addElement(group);

			// 概要
			group = new HGroup();
			group.paddingLeft = 10;
			group.verticalAlign = "top";
			group.x = 10;
			group.gap = 6;
			
			if ( viewflg ) {
				//自由文の場合
				if(!_btnLink) {
					_btnLink = new Button();
					_btnLink.addEventListener(MouseEvent.CLICK, link);
					_btnLink.label = Catalog.getLocalizationForKey("editfeatureattributes.link");
				}
/* >>>>>>>>>>>>> NEXTで画像のボタンが消えていたので、いったん削除				
				if(!_btnImage) {
					_btnImage = new Button();
					_btnImage.addEventListener(MouseEvent.CLICK, image);
					_btnImage.label = Catalog.getLocalizationForKey("editfeatureattributes.image");
				}
*/				
				group.addElement(_btnLink);
//				group.addElement(_btnImage);
				_vgroup.addElement(group);
				
				_descriptionArea = new TextArea();
				_descriptionArea.id = ATTR_DESCRIPTION;
				_descriptionArea.width = LABEL_WIDTH + INPUT_WIDTH + BUTTON_WIDTH;
				_descriptionArea.height = 98;
				if(feature.attributes[ATTR_DESCRIPTION])
					_descriptionArea.text = feature.attributes[ATTR_DESCRIPTION];
				else
					_descriptionArea.text = "";
				
				group = new HGroup();
				group.verticalAlign = "top";
				group.paddingLeft = 10;
				group.addElement(_descriptionArea);
				_vgroup.addElement(group);
			} else {
				// 表の場合
				lb = new Label();
				lb.text = Catalog.getLocalizationForKey("editfeatureattributes.item");
				lb.width = LABEL_WIDTH;
				group.addElement(lb);
				lb = new Label();
				lb.text = Catalog.getLocalizationForKey("editfeatureattributes.value");
				lb.width = INPUT_WIDTH - BUTTON_WIDTH;
				group.addElement(lb);
				lb = new Label();
				lb.width = BUTTON_WIDTH;
				group.addElement(lb);
				_vgroup.addElement(group);
				// 登録済みのTABLEデータを配列に取り出す
				var table :ArrayCollection = replaceTableToInputformat(feature.attributes[ATTR_DESCRIPTION])
				if (table.length > 0) {
					for each (var data:Array in table){
						additem(data[0], data[1], null);
					}
				}else {
					if(_tableDiscription == null){
						additem("", "", null);
					}
				}
				var tableGroup:HGroup = new HGroup();
				tableGroup.paddingLeft = 10;
				viewTable = new Container();
				viewTable.width = 260;
				viewTable.height = 78;
				viewTable.verticalScrollPolicy = "auto";
				viewTable.scrollRect = new Rectangle(0, 0, 260, 78);
				viewTable.addElement(_tableDiscription);
				tableGroup.addElement(viewTable);
//				_vgroup.addElement(viewTable);
				_vgroup.addElement(tableGroup);
				
				if (!_btnItemadd ) {
					_btnItemadd = new Button();
					_btnItemadd.addEventListener(MouseEvent.CLICK, itemadd);
					_btnItemadd.label = Catalog.getLocalizationForKey("editfeatureattributes.itemadd");
				}
				var btnGroup:HGroup = new HGroup();
				btnGroup.paddingLeft = 10;
				btnGroup.addElement(_btnItemadd);
//				_vgroup.addElement(_btnItemadd);
				_vgroup.addElement(btnGroup);
			}
			
			// 区切り線
			var separator2:Path = new Path();
			separator2.data = "M0 0 300 0";
			separator2.stroke = stroke;
			var separatorGroup2:VGroup = new VGroup();
			separatorGroup2.paddingTop = VERTICAL_PADDING;
			separatorGroup2.paddingBottom = VERTICAL_PADDING;
			separatorGroup2.addElement(separator2);
			_vgroup.addElement(separatorGroup2);
			
		//  hamas : 13.10.08 Grid/Table対策
			_contentStructure = _vgroup;
		//	_structure = _vgroup;
		}
		
		override public function setContents(contents:Object):void 
		{
			if (content is UIComponent)
			{
		//  hamas : 13.10.08 Grid/Table対策
				_contentStructure.addElement(contents as UIComponent);
		//		_contents = contents as UIComponent;
			}
		}
		
		private function valid(e:Event):void {
			this.fxpopup.feature.attributes[ATTR_NAME] = _nameInput.text;
			if (this.fxpopup.feature.attributes[ATTR_TYPE] == TYPE_FREE) {
				this.fxpopup.feature.attributes[ATTR_DESCRIPTION] = _descriptionArea.text;
				
			}else {
				var num:int = _tableDiscription.numChildren;
				var i:int;
				var obj:UIComponent;
				var item:TextInput;
				var value:TextInput;
				var table:String = "";

				for (i = 0; i < num; i++) {
					obj = _tableDiscription.getChildAt(i) as UIComponent;
					item = obj.getChildAt(0) as TextInput;
					value = obj.getChildAt(1) as TextInput;
					if (item.text != "" && value.text != "") {
						table += "<tr><td>"+item.text+"</td><td>"+value.text+"</td></tr>";
					}
				}
				if ( table.length > 0) {
					this.fxpopup.feature.attributes[ATTR_DESCRIPTION] = "<table>" + table + "</table>";
				}
			}
			
			this.close(null);
		}
		
		/**
		 * Window Close
		 */
		private function close(event:Event = null):void {
		// hamas : 13.09.10 追加
			if ( this._map != null ) {
				this._map.dispatchEvent(new Event("POP_CLOSE_SELECT"));
			}
			fxpopup.destroy(event);
		}
		
		/** 
		 *　削除ボタン押下時処理 
		 */
		private function delitem(event:Event=null):void {

			var num:int = _tableDiscription.numElements;
			var obj:UIComponent;
			var button:Button;
			var target:int = 0;
			for (var i:int = 0; i < num; i++) {
				obj = _tableDiscription.getElementAt(i) as UIComponent;
				button = obj.getChildAt(2) as Button;
				if (button.name == event.currentTarget.name) {
					target = i;
					break;
				}
			}
			_tableDiscription.removeElementAt(target);
			_tableDiscription.height = (_tableDiscription.numElements) * 26;
			viewTable.verticalScrollPosition = viewTable.maxVerticalScrollPosition;
		}

		/** 
		 *　リンクボタン押下時処理 
		 */
		private function link(event:Event=null):void {
			_descriptionArea.appendText("<a href=\"\" target=\"_blank\"></a>");
		}
		
		/** 
		 *　画像ボタン押下時処理 
		 */
		private function image(event:Event=null):void {
			_descriptionArea.appendText("<img src=\"\" />");
		}
		/** 
		 *　項目追加ボタン押下時処理 
		 */
		private function itemadd(event:Event=null):void {
			additem("", "", null);
		}		
		/** 
		 *　レイアウト変更処理 
		 */
		private function changeField(event:Event=null):void {
			// フラグ変更
			if(viewflg){
				viewflg = false;
				this.fxpopup.feature.attributes[ATTR_TYPE] = TYPE_TABLE;
				if (_tableDiscription) {
					_tableDiscription = null;
				}
			} else {
				viewflg = true;
				this.fxpopup.feature.attributes[ATTR_TYPE] = TYPE_FREE;
			}
			// 再描画>>>>>>>>>>>>>>>>>>>
			// タイトル
			var title:RichText = new RichText();
			title.setStyle("lineBreak", "toFit");
			title.maxDisplayedLines = 1;
			title.setStyle("backgroundAlpha", 0);
			title.setStyle("fontWeight", FontWeight.BOLD);
			title.setStyle("fontSize", 14);
			title.text = titleContent;
			_titleStructure = new Canvas();
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

			var structure:VGroup = new VGroup();
			structure.paddingTop = VERTICAL_PADDING;
			structure.setStyle("contentBackgroundAlpha", 0);
			structure.gap = 5;
			structure.addElement(_titleStructure);
			structure.addElement(_separatorLine);
		//  hamas : 13.10.08 Grid/Table対策
			_contentScroller.viewport = _contentStructure;
			structure.addElement(_contentScroller);

			if (fxpopup.popupContentGroup && fxpopup.popupContentGroup.initialized)
			{
				fxpopup.popupContentGroup.removeAllElements();
			}
			draw();
		}
		
		/** 
		 *　項目設定処理 
		 */
		private function additem(strItem:String= null,strValue:String= null,event:Event = null):void {
			if (!_tableDiscription) {
				_tableDiscription = new VGroup;
				_tableDiscription.width = 220;
				_tableDiscription.height = 20;
				_tableDiscription.autoLayout = true;
			}
			var hg:HGroup = new HGroup();
			hg.autoLayout = true;
			hg.height = 20;
			hg.width = 220;
			var item:TextInput = new TextInput();
			var value:TextInput = new TextInput();
			item.id = ATTR_ITEM;
			item.width = LABEL_WIDTH;
			item.text = strItem;
			value.id = ATTR_VALUE;
			value.width = INPUT_WIDTH - BUTTON_WIDTH;
			value.text = strValue;
			_btnDelete = new Button();
			_btnDelete.addEventListener(MouseEvent.CLICK, delitem);
			_btnDelete.label = Catalog.getLocalizationForKey("editfeatureattributes.delete");
			_btnDelete.width = BUTTON_WIDTH;

			hg.addElementAt(item, 0);
			hg.addElementAt(value,1);
			hg.addElementAt(_btnDelete,2);
			_tableDiscription.addElement(hg);

			if(viewTable){
				_tableDiscription.height = (_tableDiscription.numElements) * 26;
				viewTable.verticalScrollPosition = viewTable.maxVerticalScrollPosition;
			}
		}
		/**
		 * 概要タイトル行作成
		 * @param	event
		 * @return	HGroup
		 */
		private function makeTitle(event:Event=null):HGroup {
			var group:HGroup = new HGroup();
			var lb:Label = new Label();
			var rt:RichText　 = new RichText();
			
			lb.text = Catalog.getLocalizationForKey("editfeatureattributes.description");
			group.addElement(lb);
			lb = new Label();
			lb.text = " (" ;
			group.addElement(lb);
			
			lb = new Label();
			lb.text = Catalog.getLocalizationForKey("editfeatureattributes.table");
			if ( viewflg ) {
				lb.addEventListener(MouseEvent.CLICK, changeField);
				lb.setStyle("color",0X0000CC);
				lb.setStyle("textDecoration","underline");
			} else {
				lb.setStyle("fontWeight", "bold");
			}
			group.addElement(lb);
			
			lb = new Label();
			lb.text = " | " ;
			group.addElement(lb);
			
			lb = new Label();
			lb.text = Catalog.getLocalizationForKey("editfeatureattributes.free");
			if( !viewflg ){
				lb.addEventListener(MouseEvent.CLICK, changeField);
				lb.setStyle("color",0X0000CC);
				lb.setStyle("textDecoration","underline");
			} else {
				lb.setStyle("fontWeight", "bold");
			}
			group.addElement(lb);
			lb = new Label();
			lb.text = ") : " ;
			group.addElement(lb);
			return group;
		}

		/**
		 * feature.attributes[ATTR_DESCRIPTION]の値をTDタグで分解します。
		 * @param	tableText
		 * @return	ArrayCollection
		 */
		private function replaceTableToInputformat(tableText:String):ArrayCollection
		{
			var pos:int = 0;
			var replaced:ArrayCollection = new ArrayCollection();
			var data:Array;

		//  hamas : 13.10.08 Grid/Table対策
			var targetText:String = "";
			if( tableText != null ){
				var str:String = (tableText as String).replace("\n", "");
				var exp:RegExp = /<table>.*.<\/table>/;
				var tableStr:Array = str.match(exp);
//				var otherStr:Array = str.split(exp);
				targetText = tableStr[0];
			}
			
			// TABLEタグの切り出し
			var xml:XML = new XML(targetText);
			for each (var tableElement:XML in xml.children()) {
				if (tableElement.nodeKind() == "element" && tableElement.localName().toLowerCase() == "tr") {
					var tdcount:int = 0;
					data = new Array();
					for each (var rowElement:XML in tableElement.children()) {
						if (rowElement.nodeKind() == "element" && rowElement.localName().toLowerCase() == "td") {
							data[tdcount] = rowElement.children().toXMLString();
							++tdcount;
						}
					}
					replaced.addItem(data);
				}
			}
			return replaced;
		}
		private function localize(e:I18NEvent=null):void {
			this.titleContent = Catalog.getLocalizationForKey("editfeatureattributes.title");
			_btnValid.label = Catalog.getLocalizationForKey("editfeatureattributes.valid");
			_btnDiscard.label = Catalog.getLocalizationForKey("editfeatureattributes.discard");
		}

	
	}

}
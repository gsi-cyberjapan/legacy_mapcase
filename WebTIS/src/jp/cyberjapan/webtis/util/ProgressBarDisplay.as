package jp.cyberjapan.webtis.util {

    import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
    import flash.events.*;
    import flash.net.FileReference;
    import flash.net.URLRequest;
	import jp.cyberjapan.webtis.event.ProgressDisplayEvent;
	import org.openscales.core.Map;
	import spark.components.VGroup;
    
    import mx.controls.Button;
    import mx.controls.ProgressBar;
    import mx.controls.ProgressBarMode;
	import mx.managers.PopUpManager;

	
    public class ProgressBarDisplay extends Sprite {

		private var vg:VGroup;
        private var pb:ProgressBar;
        private var btn:Button;
		
		private var totalCnt:int;
		private var currentCnt:int;
		
		private var condition:Boolean;

        public function ProgressBarDisplay(totalCnt:int = 1) {
			this.totalCnt = totalCnt;
			init();
        }
		
		public function isStat():Boolean 
		{
			return this.condition;
		}

        public function init():void {

			condition = true;
			vg = new VGroup();
			vg.width = 150;
			vg.height = 80;
			vg.verticalAlign = "top";
			vg.gap = 15;
			
			pb = new ProgressBar();
			pb.width = 150;
			pb.height = 20;
			pb.labelPlacement = 'center';
			pb.mode = ProgressBarMode.MANUAL;

			btn = new Button();
			btn.label = "中止";
			btn.verticalCenter;
			btn.addEventListener(MouseEvent.CLICK, onLoadCancel);

        }

        public function onLoadCancel(e:MouseEvent):void {
			condition = false;
            btn.enabled = false;
			pb = null;
			PopUpManager.removePopUp(vg);
			this.dispatchEvent(new jp.cyberjapan.webtis.event.ProgressDisplayEvent(jp.cyberjapan.webtis.event.ProgressDisplayEvent.PROGRESS_CANCELLED));
        }

        public function show(mapParent:DisplayObjectContainer):void {
			currentCnt = 0;
			vg.addElement(pb);
			vg.addElement(btn);
			vg.move((mapParent.width / 2) - 75, (mapParent.height / 2) - 10);
			PopUpManager.addPopUp(vg, mapParent, true);
			//pb.setProgress(currentCnt, totalCnt);
			onProgress(currentCnt);
        }

        public function onProgress(cnt:int):void {
//            pb.label = "UPLOADING %3%%";
            pb.setProgress(cnt, totalCnt);
			pb.label = "loading " + cnt +" / " + totalCnt;
			this.currentCnt = cnt;
        }

        public function completeHandler():void {
			onProgress(currentCnt);
			pb = null;
			PopUpManager.removePopUp(vg);
        }

        public function onErrorHandler():void {
			pb.label = "ERROR";
			pb = null;
			condition = false;
			PopUpManager.removePopUp(vg);
        }

	}
}
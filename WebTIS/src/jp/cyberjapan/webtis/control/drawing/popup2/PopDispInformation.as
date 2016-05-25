package jp.cyberjapan.webtis.control.drawing.popup2
{
	import jp.cyberjapan.webtis.control.drawing.DispInformation;
	import org.openscales.core.events.FeatureEvent;
	import org.openscales.core.feature.Feature;
	
	public class PopDispInformation extends DispInformation 
	{
		private var _targetFeature:Feature = null;
		public function set targetFeature( feature:Feature ) : void {
			this._targetFeature =  feature;
			this.target = feature.layer;
		}
		
		override protected function onClick():void
		{
			if ( this._targetFeature != null ) {
				super.onClick();
				this.map.dispatchEvent(new FeatureEvent(FeatureEvent.FEATURE_SELECTED, this._targetFeature));
				super.onClick();
			}
		}
	}
}

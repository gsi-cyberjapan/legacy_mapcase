package jp.cyberjapan.webtis.layer 
{
	import org.openscales.core.layer.VectorLayer;
	
	/**
	 * OpenScalesのVectorLayerは、cacheAsBitmapをtrueにする処理が入っているため、
	 * ズームレベルを上げていくとメモリ使用量が急増してクラッシュする問題がある。
	 * このため、描画時にcacheAsBitmapを無理やりfalseに変えてメモリ使用量を抑えるクラスを作成した。
	 * @author t-nakayama
	 */
	public class ExVectorLayer extends VectorLayer 
	{
		
		public function ExVectorLayer(identifier:String) 
		{
			super(identifier);
		}
		
		override public function redraw(fullRedraw:Boolean = false) : void
		{
			super.redraw(fullRedraw);
			this.cacheAsBitmap = false;
		}
	}

}
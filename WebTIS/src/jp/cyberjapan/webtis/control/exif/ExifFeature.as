package jp.cyberjapan.webtis.control.exif 
{
	import flash.utils.ByteArray;
	import jp.shichiseki.exif.ExifInfo;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.style.Style;
	import org.openscales.geometry.Point;
	
	/**
	 * ...
	 * @author T. Nakayama
	 */
	public class ExifFeature extends PointFeature 
	{
		/**
		 * 画像データ(ByteArray)またはURL(String)
		 */
		private var _imgData:Object;
		
		private var _exif:ExifInfo;
		
		public function get exif():ExifInfo
		{
			return this._exif;
		}
		
		public function get imgData():Object 
		{
			return _imgData;
		}

		public function ExifFeature(imgData:Object, exif:ExifInfo, geom:Point=null, data:Object=null, style:Style=null) 
		{
			this._imgData = imgData;
			this._exif = exif;
			super(geom, data, style);
		}
		
	}

}
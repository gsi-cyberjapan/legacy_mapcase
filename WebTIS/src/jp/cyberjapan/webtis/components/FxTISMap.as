package jp.cyberjapan.webtis.components
{
	import jp.cyberjapan.webtis.components.TISMap;
	import org.openscales.core.basetypes.Resolution;
	import org.openscales.fx.layer.FxTMS;
	import org.openscales.geometry.basetypes.Bounds;
	
	/**
	 * 電子国土地図のFlexラッパー.
	 * このクラスは、電子国土地図(TISMap)をFlexのオブジェクトとして直接MXML内に定義できるようにしたものです。
	 * @author T. Nakayama
	 */
	public class FxTISMap extends FxTMS
	{
		/**
		 * コンストラクタ.
		 */
		public function FxTISMap()
		{
			this._layer = new TISMap("base");
			/*
			this.numZoomLevels = 20;
			this.maxResolution = new Resolution(156543.03390625, "EPSG:900913");
			this.minResolution = new Resolution(0.29858214169740677, "EPSG:900913");
			this.maxExtent = new Bounds(-20037508.342789244, -20037508.342789777, 20037508.342789244, 20037508.34278977, "EPSG:900913");
			this.projection = "EPSG:900913";
			this.resolutions = "156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677";
			*/
			super();
		}
	
	}

}
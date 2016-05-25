package jp.cyberjapan.webtis.layer
{
	import mx.accessibility.LabelAccImpl;
	import org.openscales.core.events.LayerEvent;
	import org.openscales.core.feature.Feature;
	import org.openscales.core.feature.LabelFeature;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.proj4as.ProjProjection;

	import org.openscales.core.style.Style;
	import org.openscales.geometry.basetypes.Bounds;
	
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.font.Font;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import jp.cyberjapan.webtis.style.symbolizer.ExTextSymbolizer;
	import org.openscales.core.style.symbolizer.PolygonSymbolizer;
	
	public class ExKMLForUtmGrid extends ExKML
	{
		public function ExKMLForUtmGrid(identifier:String,
							useProxy:Boolean, 
							url:String = null,
							data:XML = null,
							style:Style = null,
							bounds:Bounds = null) 
		{
			super( identifier, useProxy, url, data, style, bounds );
			this.mouseChildren = false;
		}
		
		override public function drawFeatures(fullRedraw:Boolean = false):void
		{
			if (this._featureVector == null)
			{
				if (this.map.projection != null && this.projection != null && this.projection != this.map.projection)
				{
					// KML reference documentation specify that format projection is EPSG:4326
					this._kmlFormat.externalProjection = ProjProjection.getProjProjection("EPSG:4326");
					this._kmlFormat.internalProjection = this.projection;
				}
				this._kmlFormat.proxy = this.proxy;
				
				this._featureVector = this._kmlFormat.read(this.data) as Vector.<Feature>;
				var name:String = this._kmlFormat.readName(this.data);
				if (name && name != ""){
					this.displayedName = name;
				}
				
				var vectorLength:uint = this._featureVector.length;
				for (var i:uint = 0; i < vectorLength; i++)
				{
					// 13.09.02 UTMグリッド表示 : PointFeatureをLabelFeatureに更新
					var feat:Feature = this._featureVector[i];
					if (feat is PointFeature && feat.style.rules[0].symbolizers[0] is PointSymbolizer)
					{
						// スタイル設定
						var styleLabel:Style = new Style();
						styleLabel.name = "UtmGrid_Label_Style";
						var ruleLabel:Rule = new Rule();
						{
							var size:Number = 20;			// default = 10;
							var color:Number = 0xFF0000;	// default = 0;
							var opacity:Number = 1;			// default
							var family:String = null;		// default
							var style:String = null;		// default
							var weight:String = Font.BOLD;	// default = null;
							var font:Font = new Font();
							font.size = size;
							font.color = color;
							font.opacity = opacity;
							font.family = family;
							font.style = style;
							font.weight = weight;
							var symbolizer:ExTextSymbolizer = new ExTextSymbolizer(null, font);
							symbolizer.showsAlways = true;
							symbolizer.offsetX = 0;
							ruleLabel.symbolizers.push(symbolizer);
						}
						styleLabel.rules.push(ruleLabel);
						
						// テキスト
						var label:LabelFeature = LabelFeature.createLabelFeature((feat as PointFeature).lonlat);
						label.mouseEnabled = false;
						label.text = (feat as PointFeature).data["name"];
						label.style = styleLabel;						
						
						this._featureVector[i] = label;
					}
					else if (feat is PolygonFeature)
					{
						// 13.09.03 UTMグリッド表示 : PolygonFeatureの塗りつぶしを解除
						(feat.style.rules[0].symbolizers[0] as PolygonSymbolizer).fill = null;
					}
					this.addFeature(this._featureVector[i], true, true);
				}
				this.maxExtent = featuresBbox;
				
				var evt:LayerEvent = new LayerEvent(LayerEvent.LAYER_CHANGED, this);
				this.map.dispatchEvent(evt);
			}
			else
			{
				super.redraw(fullRedraw);
			}
		}
	}
}

// 保存したHTMLファイルに含まれる作図情報のレイヤー
var jsonLayers = [];

// 作図情報をHTMLファイルから受け取る
function jsonReceiver(e) {
	$(window).unbind('message', jsonReceiver);

	var iframejson = html_entity_decode(e.data, "ENT_NOQUOTES");
	
	if (!iframejson) return;
	
	var jsondata = JSON.parse(iframejson);
	for (var i = 0; i < jsondata.layer.length; i++) {
		readgeojson(jsondata.layer[i]);
	}
	
	// 作図ポップアップ
	sakuzuModule.disablePopupLayer();
	if (dispFlg && sakuzuModule.CurrentMode == "none"){
		sakuzuModule.enablePopupLayer();
	}
}

// 作図情報/緯度経度ズームレベルを地理院地図から受け取る（高画質印刷プレビュー用）
function jsonPrintDataReceiver(e) {
	$(window).unbind('message', jsonPrintDataReceiver);

	var iframejson = e.data
	if (!iframejson) return;
	
	var jsondata = JSON.parse(iframejson);
	
	if (jsondata.mode == "lonlat_fromParent"){	
		
		$("#map")[0].style.display = "none";
		
		var cx = parseFloat(jsondata.lon);
		var cy = parseFloat(jsondata.lat);
		var zoom = parseInt(jsondata.z, 10);
		
		map.setCenter(new OpenLayers.LonLat(cx, cy).transform(projection4326,projection900913), zoom);
		
		$("#map")[0].style.display = "block";
	}
	else if (jsondata.mode == "lonlat_toParent"){
		receivedLonLat = jsondata;
	}
	else if (jsondata.mode == "map_resize"){
		var width = parseInt(jsondata.width);
		var height = parseInt(jsondata.height);

		$("#map")[0].style.height = height + "px";
		$("#map")[0].style.width = width + "px";
		map.updateSize();
	}
	else {	
		for (var i = 0; i < jsondata.layer.length; i++) {
			readgeojson(jsondata.layer[i], true);
		}
	}
}

// 作図情報(geojsonデータ)の読込み
function readgeojson(jsondata, hidePopup) {

	var defaultStyle = new OpenLayers.Style(OpenLayers.Util.applyDefaults(jsondata["style"]));
	var styleType = "";
	var cnt = jsonLayers.length;
	
	if (defaultStyle.defaultStyle.fillColor) {
		styleType = "polygon";
	} else if (defaultStyle.defaultStyle.strokeColor) {
		styleType = "string";
	}

	if (defaultStyle.defaultStyle.label){
		styleType = "symbol";
		defaultStyle.defaultStyle.labelAlign = 'lm';
		defaultStyle.defaultStyle.fontOpacity = 0.00001;
		if (defaultStyle.defaultStyle.externalGraphic){
			defaultStyle.defaultStyle.labelSelect = false;
			var iconSize = defaultStyle.defaultStyle.graphicWidth;
			defaultStyle.defaultStyle.labelXOffset = iconSize / 2;
		} else {
			defaultStyle.defaultStyle.labelSelect = true;
		}
	} else if (defaultStyle.defaultStyle.externalGraphic){
		styleType = "symbol";
	}

	var selectStyle = defaultStyle.clone();
	if (selectStyle.defaultStyle.fontColor) {
		selectStyle.defaultStyle.fontColor = "#0000FF";
	}
	if (selectStyle.defaultStyle.strokeColor) {
		selectStyle.defaultStyle.strokeColor = "#0000FF";
	}
	if (selectStyle.defaultStyle.fillColor) {
		selectStyle.defaultStyle.fillColor = "#0000FF";
		selectStyle.defaultStyle.fillOpacity = 0.5;
	}

	var myStyles = new OpenLayers.StyleMap({
		"default": defaultStyle,
		"select": selectStyle
	});
	
//	var geojsonLayer = new OpenLayers.Layer.Vector(jsondata["name"], {styleMap:myStyles});
	var geojsonLayer = new webtis.Layer.Vector(jsondata["name"], {styleMap:myStyles});
	geojsonLayer.styleType = styleType;

	geojsonParser = new OpenLayers.Format.GeoJSON({
		'internalProjection': projection900913,
		'externalProjection': projection4326
	});

	for (i=0; i<jsondata["data"].length;i++){
		geojsonLayer.addFeatures(geojsonParser.read(jsondata["data"][i]));

		geojsonLayer.features[i].data = jsondata["data"][i];
		geojsonLayer.features[i].attributes = jsondata["data"][i];

		// ポップアップ情報設定
		var attr_title = geojsonLayer.features[i].attributes.name;
		var description = geojsonLayer.features[i].attributes.properties;
		
		if (description && description != ""){
			geojsonLayer.features[i].attributes.description = description;
		}
	}
	jsonLayers[cnt] = geojsonLayer;
	map.addLayer(geojsonLayer);
	if (!hidePopup){
		geojsonLayer.JSGISelection = true;
	}
	geojsonLayer.setZIndex(700);
}

// html_entity_decodeのjavascript版
function html_entity_decode(string, quote_style) {
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    delete(hash_map['&']);
    hash_map['&'] = '&amp;';

    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity)
        .join(symbol);
    }
    tmp_str = tmp_str.split('&#039;')
    .join("'");

    return tmp_str;
}

// get_html_translation_tableのjavascript版
function get_html_translation_table (table, quote_style) {
    var entities = {}, hash_map = {}, decimal;
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
		entities['160'] = '&nbsp;';
		entities['161'] = '&iexcl;';
		entities['162'] = '&cent;';
		entities['163'] = '&pound;';
		entities['164'] = '&curren;';
		entities['165'] = '&yen;';
		entities['166'] = '&brvbar;';
		entities['167'] = '&sect;';
		entities['168'] = '&uml;';
		entities['169'] = '&copy;';
		entities['170'] = '&ordf;';
		entities['171'] = '&laquo;';
		entities['172'] = '&not;';
		entities['173'] = '&shy;';
		entities['174'] = '&reg;';
		entities['175'] = '&macr;';
		entities['176'] = '&deg;';
		entities['177'] = '&plusmn;';
		entities['178'] = '&sup2;';
		entities['179'] = '&sup3;';
		entities['180'] = '&acute;';
		entities['181'] = '&micro;';
		entities['182'] = '&para;';
		entities['183'] = '&middot;';
		entities['184'] = '&cedil;';
		entities['185'] = '&sup1;';
		entities['186'] = '&ordm;';
		entities['187'] = '&raquo;';
		entities['188'] = '&frac ;';
		entities['189'] = '&frac ;';
		entities['190'] = '&frac34;';
		entities['191'] = '&iquest;';
		entities['192'] = '&Agrave;';
		entities['193'] = '&Aacute;';
		entities['194'] = '&Acirc;';
		entities['195'] = '&Atilde;';
		entities['196'] = '&Auml;';
		entities['197'] = '&Aring;';
		entities['198'] = '&AElig;';
		entities['199'] = '&Ccedil;';
		entities['200'] = '&Egrave;';
		entities['201'] = '&Eacute;';
		entities['202'] = '&Ecirc;';
		entities['203'] = '&Euml;';
		entities['204'] = '&Igrave;';
		entities['205'] = '&Iacute;';
		entities['206'] = '&Icirc;';
		entities['207'] = '&Iuml;';
		entities['208'] = '&ETH;';
		entities['209'] = '&Ntilde;';
		entities['210'] = '&Ograve;';
		entities['211'] = '&Oacute;';
		entities['212'] = '&Ocirc;';
		entities['213'] = '&Otilde;';
		entities['214'] = '&Ouml;';
		entities['215'] = '&times;';
		entities['216'] = '&Oslash;';
		entities['217'] = '&Ugrave;';
		entities['218'] = '&Uacute;';
		entities['219'] = '&Ucirc;';
		entities['220'] = '&Uuml;';
		entities['221'] = '&Yacute;';
		entities['222'] = '&THORN;';
		entities['223'] = '&szlig;';
		entities['224'] = '&agrave;';
		entities['225'] = '&aacute;';
		entities['226'] = '&acirc;';
		entities['227'] = '&atilde;';
		entities['228'] = '&auml;';
		entities['229'] = '&aring;';
		entities['230'] = '&aelig;';
		entities['231'] = '&ccedil;';
		entities['232'] = '&egrave;';
		entities['233'] = '&eacute;';
		entities['234'] = '&ecirc;';
		entities['235'] = '&euml;';
		entities['236'] = '&igrave;';
		entities['237'] = '&iacute;';
		entities['238'] = '&icirc;';
		entities['239'] = '&iuml;';
		entities['240'] = '&eth;';
		entities['241'] = '&ntilde;';
		entities['242'] = '&ograve;';
		entities['243'] = '&oacute;';
		entities['244'] = '&ocirc;';
		entities['245'] = '&otilde;';
		entities['246'] = '&ouml;';
		entities['247'] = '&divide;';
		entities['248'] = '&oslash;';
		entities['249'] = '&ugrave;';
		entities['250'] = '&uacute;';
		entities['251'] = '&ucirc;';
		entities['252'] = '&uuml;';
		entities['253'] = '&yacute;';
		entities['254'] = '&thorn;';
		entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';

    // ascii decimals to real symbols
    for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            hash_map[String.fromCharCode(decimal)] = entities[decimal];
        }
    }

    return hash_map;
}

/** ここから旧HTMLのロジック
function onFeatureSelect(event){
	var feature = event.feature;
	if (feature.popup) return;
	
	// タイトルを取得
	var attr_title = feature.attributes.name;
	// 属性情報(<description>要素)を取得
	var description = feature.attributes.properties;
	
	if (description && (description != "")) {
		var attrs = '<table><tr><td colspan="2" style="color:#FF0000;">' + webtis.Format.JSGIJSON.escapeHTML(attr_title) + '</td></tr></table>' + description;
	}
	else if (attr_title != "") {
		var attrs = '<table><tr><td colspan="2" style="color:#FF0000;">' + webtis.Format.JSGIJSON.escapeHTML(attr_title) + '</td></tr></table>';
	}
	else {
		return;
	}

	var popup = new OpenLayers.Popup.FramedCloud("popup",
		feature.geometry.getBounds().getCenterLonLat(),
		null,
		attrs,
		null,
		true, onPopupClose
	);
	popup.panMapIfOutOfView = false;
	
	feature.popup = popup;
	map.addPopup(popup);
}

function createTableTag(feature)
{
	var tag = "";
	var properties = feature.attributes.properties;

	var title = feature.attributes.name;

	if (properties) {
		// TABLEタグを<TR>で分割
		list = properties.match(/m|<TR>.+?<\/TR>|/ig);
		line = spliceList(list);
		
		var tableTag = "";
		
		for (i = 0; i < line.length; i++)
		{
			if (line[i].length == 0) continue;
			tableTag += line[i];
		}
		
		if (tableTag != "" || title != "") {
			tableTag = properties.replace(/<TR>.+<\/TR>/ig, tableTag);
			tag = title + "<BR>" + tableTag;
		}
	} else {
		tag = title;
	}

	return tag;
}

function spliceList(list)
{
	for (j = list.length - 1; j >= 0; j--)
	{
		if (list[j].length == 0)
		{
			list.splice(j, 1);
		}
	}
	
	return list;
}

function onFeatureUnselect(event){
	var feature = event.feature;
	if (feature.popup) {
		map.removePopup(feature.popup);
		feature.popup.destroy();
		feature.popup = null;
	}
}

// ポップアップを閉じたとき
function onPopupClose(evt) {
	clickCtrl.unselectAll();
}
	
// オブジェクト選択の初期化
function initClickSelection(layers){

	// コントロールを再作成
	clickCtrl = new webtis.Control.SelectFeature(layers, { hover : false });
//	clickCtrl = new OpenLayers.Control.SelectFeature(layers, { hover : false });
	map.addControl(clickCtrl);
	clickCtrl.activate();

	for (var i = 0; i < layers.length; i++)
	{
		layers[i].events.on({
			'featureselected': onFeatureSelect,
			'featureunselected': onFeatureUnselect
		});
	}
}
**/

var LinkKey = {};
LinkKey.Mapion = 1;
LinkKey.ItsumoNavi = 2;

function openMapLinkCenter(linkKey, lon, lat) {

	//中心経緯度・ズームレベルを取得
    var cy = lat;
    var cx = lon;
	var z = webtis.getZoomLevel();

	var url;

	switch (linkKey) {
	case LinkKey.Mapion:
		url = getMapionLink(cx, cy, z);
		break;
		
	case LinkKey.ItsumoNavi:
		url = getItsumoNaviLink(cx, cy, z);
		break;
		
	default:
		return false;
	}

	window.open(url, 'new');

	return true;
}

function openMapLink(linkKey) {

	//中心経緯度・ズームレベルを取得
	return openMapLinkCenter(linkKey, webtis.getCx(), webtis.getCy());
}

function openMapLinkPos(linkKey, lon, lat) {
	return openMapLinkCenter(linkKey, lon, lat);
}

// いつもNAVIへのリンクを取得
function getItsumoNaviLink(cx, cy, z) {
	
	var japanP = world2japan(cx, cy);
	var y = Math.round(japanP.y * 3600 * 1000);
	var x = Math.round(japanP.x * 3600 * 1000);

	if(z <= 5)			{zoomLevel = 1;}
	else if(z <= 6)		{zoomLevel = 2;}
	else if(z <= 7)		{zoomLevel = 3;}
	else if(z <= 8)		{zoomLevel = 4;}
	else if(z <= 9)		{zoomLevel = 6;}
	else if(z <= 10)	{zoomLevel = 7;}
	else if(z <= 11)	{zoomLevel = 8;}
	else if(z <= 12)	{zoomLevel = 9;}
	else if(z <= 13)	{zoomLevel = 10;}
	else if(z <= 14)	{zoomLevel = 11;}
	else if(z <= 15)	{zoomLevel = 13;}
	else if(z <= 16)	{zoomLevel = 14;}
	else if(z <= 17)	{zoomLevel = 16;}
	else				{zoomLevel = 18;}

	var linkURL = "http://www.its-mo.com/z-" + y +"-" + x + "-" + zoomLevel + ".htm";
	return linkURL;
}

// マピオンへのリンクを取得
function getMapionLink(cx, cy, z) {

	if(z <= 6)			{zoomLevel = 1;}
	else if(z <= 8)		{zoomLevel = 2;}
	else if(z <= 9)		{zoomLevel = 3;}
	else if(z <= 10)	{zoomLevel = 4;}
	else if(z <= 11)	{zoomLevel = 5;}
	else if(z <= 13)	{zoomLevel = 6;}
	else if(z <= 14)	{zoomLevel = 7;}
	else if(z <= 16)	{zoomLevel = 8;}
	else if(z <= 17)	{zoomLevel = 9;}
	else				{zoomLevel = 10;}

	var linkURL = "http://www.mapion.co.jp/m/" + cy + "_" + cx + "_" + zoomLevel + "/?wgs=1";
	return linkURL;
}

// 世界測地系経緯度から日本測地系経緯度への変換
function world2japan(cx,cy)	{
	var worldLonLat = new Proj4js.Proj('EPSG:4326');		//世界測地系
	var japanLonLat = new Proj4js.Proj('EPSG:4301');		//日本測地系
	var worldP = new Proj4js.Point(cx,cy);					//ポイントオブジェクトを作成（世界測地系経緯度）
	var japanP = Proj4js.transform(worldLonLat,japanLonLat,worldP);		//日本測地系の経緯度に変換
	return {x:japanP.x, y:japanP.y}
}

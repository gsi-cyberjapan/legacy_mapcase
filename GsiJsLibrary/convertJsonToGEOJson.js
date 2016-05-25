
//中心、半径から円データをポリゴンデータ(正72角形)に変換
function calcDistantCoordinate(centerx, centery, radiusByMeter){
	var lonlat = new Array();
	var lonlatList = new Array();

	var a = 6378137.0;
	var lonRad = centerx * Math.PI / 180.0;
	var latRad = centery * Math.PI / 180.0;

	for (var deg = 0; deg <= 360; deg += 5) {
		var rad = deg / 180.0 * Math.PI;
		var dx = Math.cos(rad) * radiusByMeter;
		var dy = Math.sin(rad) * radiusByMeter;

		var nlon = (dx / (a * Math.cos(latRad)) + lonRad) * (180.0 / Math.PI);
		var nlat = (dy / a + latRad) * (180.0 / Math.PI);
		
		lonlat = new Array();
		
		lonlat[0] = nlon;
		lonlat[1] = nlat;
		
		lonlatList[parseInt(deg/5)] = lonlat;
	}
	
	return lonlatList;
}

//10進数 10より小さいときは、スペースを付加
function padDigit(val, padLen, pad) {
	var str = val + "";

	while (str.length < padLen) {
		str = pad + str;
	}
	return str;
};

//rgbを16進数に変換
function deciColorToHex(colorStr){
	var rgb = colorStr.split(",");
	var r = parseInt(rgb[0],10);
	var g = parseInt(rgb[1],10);
	var b = parseInt(rgb[2],10);
	return ("#"+padDigit(r.toString(16),2,"0")+padDigit(g.toString(16),2,"0")+padDigit(b.toString(16),2,"0")).toUpperCase();
}


function convertGeoJSON(json){
	var fromObj = JSON.parse(json);

	var layerNode = [];

	for (i = 0; i < fromObj.layer.length; i++){
		var layer =  fromObj.layer[i];
		var dataNode = [];
		
		for  (j = 0; j < layer.data.length; j++){
			var data = {};
			var geoNode = {};
			
			if ( layer.data[j].geometry.type == "Circle"){
				geoNode.type = "Polygon";
				var coordinates = new Array();
				coordinates[0] = calcDistantCoordinate(layer.data[j].geometry.coordinates[0], layer.data[j].geometry.coordinates[1], layer.data[j].geometry.circle);
				geoNode.coordinates = coordinates;
			} else {
				geoNode =  layer.data[j].geometry;
			}
			
			data.name =  layer.data[j].name;
			data.type =  layer.data[j].type;
			data.geometry = geoNode;
			if (layer.data[j].properties){
				data.properties = layer.data[j].properties
			}
			
			dataNode[j] = data;
		}

		var styleNode = layer.style;
		if (layer.style.fillColor){
			styleNode.fillColor = deciColorToHex(layer.style.fillColor);
		}
		if (layer.style.strokeColor){
			styleNode.strokeColor = deciColorToHex(layer.style.strokeColor);
		}
		if (layer.style.fontColor){
			styleNode.fontColor = deciColorToHex(layer.style.fontColor);
		}

		layerNode[i] = {
			"name" : layer.name,
			"style" : styleNode,
			"data" : dataNode
		};
	}
	
	var topNode = new Array({"layer":layerNode});
	
	var result = JSON.stringify(topNode);
	result = result.substring(1,result.length-1);
	result = result.substring(result.indexOf("{"),result.lastIndexOf("}")+1);
	return result;
}


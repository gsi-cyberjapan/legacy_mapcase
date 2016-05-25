var overLayer;

// HTML保存したファイルから呼び出される
function changeDataSet(dataId){
	var mapId = dataId2mapId(dataId);
	changeMap(mapId);
}

function dataId2mapId(dataId)
{
	var mapId;
	switch (dataId) {
		case "GLMD":
		case "JAIS":
		case "BAFD1000K":
		case "BAFD200K":
		case "DJBMM":
			// 標準地図
			mapId = "Default";
			break;
			
		case "JAISG":
		case "GRAY":
		case "D25KG":
		case "D2500G":
			// モノトーン
			mapId = "Grey";
			break;
			
		case "JAIS2":
		case "D25K2":
		case "D2500":
			// 春夏秋冬の区別ができないもの
			mapId = "Season";
			break;
			
		case "DJBMO":
			// 2007～
			mapId = "DJBMO";
			break;
			
		case "NLII1":
			// 1974
			mapId = "NLII1";
			break;
			
		case "NLII2":
			// 1979
			mapId = "NLII2";
			break;
			
		case "NLII3":
			// 1984
			mapId = "NLII3";
			break;
			
		case "NLII4":
			// 1988
			mapId = "NLII4";
			break;
			
		case "SPRING":
			mapId = "Spring";
			break;
			
		case "SUMMER":
			mapId = "Summer";
			break;
			
		case "AUTUMN":
			mapId = "Autumn";
			break;
			
		case "WINTER":
			mapId = "Winter";
			break;
			
		case "BLANK":
			// 白地図
			mapId = "Blank";
			break;
			
		case "JAISE":
			// 英語
			mapId = "Jaise";
			break;
			
		case "RELIEF":
			// 色別標高図
			mapId = "Relief";
			break;
			
		default:
			mapId = "Default";
			break;
	}

	return mapId;
}

function changeMap(mapid){
	var tmpDataSet;
	var overLayerZindex = 110;
	
	if(overLayer){
		map.removeLayer(overLayer);
		overLayer = null;
	}

	var overlayDataSet = null;
	var overlayName;

	switch (mapid){
		case 'Spring':	tmpDataSet = dataSet_Spring; overlayName = "Color"; overlayDataSet = dataSetOverlay_Color; break;
		case 'Summer':	tmpDataSet = dataSet_Summer; overlayName = "Color"; overlayDataSet = dataSetOverlay_Color; break;
		case 'Autumn':	tmpDataSet = dataSet_Autumn; overlayName = "Color"; overlayDataSet = dataSetOverlay_Color; break;
		case 'Winter':	tmpDataSet = dataSet_Winter; overlayName = "Color"; overlayDataSet = dataSetOverlay_Color; break;
		case 'Grey':	tmpDataSet = dataSet_Mono;   overlayName = "Grey";  overlayDataSet = dataSetOverlay_Mono;  break;

		case 'Season':	tmpDataSet = dataSet_Season;	break;
		case 'Blank':	tmpDataSet = dataSet_Blank;		break;
		case 'Relief':	tmpDataSet = dataSet_Relief;	break;
		case 'Jaise': 	tmpDataSet = dataSet_Jaise;		break;
		case 'DJBMO':	tmpDataSet = dataSet_Y2K7;		break;
		case 'NLII4':	tmpDataSet = dataSet_YK88;		break;
		case 'NLII3':	tmpDataSet = dataSet_YK84;		break;
		case 'NLII2':	tmpDataSet = dataSet_YK79;		break;
		case 'NLII1':	tmpDataSet = dataSet_YK74;		break;
		case 'Default':
		default:		tmpDataSet  = dataSet_Default;	break;
	}

	if (overlayDataSet != null) {
		overLayer = new webtis.Layer.BaseMap(overlayName, {
			isBaseLayer: false,
			dataSet: overlayDataSet,
			wrapDateLine: true
		});
		map.addLayer(overLayer);
		overLayer.setZIndex(overLayerZindex);
	}

	webtisMap.setDataSet(tmpDataSet);
}

/* 地図切り替え時のデータセットを定義 */
// 段彩陰影パターン春
var dataSet_Spring = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS2" },
	6: { "dataId" : "JAIS2" },
	7: { "dataId" : "JAIS2" },
	8: { "dataId" : "JAIS2" },
	
	9: { "dataId" : "SPRING" },
	10: { "dataId" : "SPRING" },
	11: { "dataId" : "SPRING" },
	12: { "dataId" : "SPRING" },
	13: { "dataId" : "SPRING" },
	14: { "dataId" : "SPRING" },
	
	15: { "dataId" : "D25K2" },
	16: { "dataId" : "D25K2" },
	17: { "dataId" : "D25K2" },
	
	18: { "dataId" : "D2500" }
};

// 段彩陰影パターン夏
var dataSet_Summer = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS2" },
	6: { "dataId" : "JAIS2" },
	7: { "dataId" : "JAIS2" },
	8: { "dataId" : "JAIS2" },
	
	9: { "dataId" : "SUMMER" },
	10: { "dataId" : "SUMMER" },
	11: { "dataId" : "SUMMER" },
	12: { "dataId" : "SUMMER" },
	13: { "dataId" : "SUMMER" },
	14: { "dataId" : "SUMMER" },
	
//	15: { "dataId" : "D25K2" },
//	16: { "dataId" : "D25K2" },
//	17: { "dataId" : "D25K2" },
	
//	18: { "dataId" : "D2500" }

	15: { "dataId" : "DJBMM" },
	16: { "dataId" : "DJBMM" },
	17: { "dataId" : "DJBMM" },

	18: { "dataId" : "FGD" }
};

// 段彩陰影パターン秋
var dataSet_Autumn = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS2" },
	6: { "dataId" : "JAIS2" },
	7: { "dataId" : "JAIS2" },
	8: { "dataId" : "JAIS2" },
	
	9: { "dataId" : "AUTUMN" },
	10: { "dataId" : "AUTUMN" },
	11: { "dataId" : "AUTUMN" },
	12: { "dataId" : "AUTUMN" },
	13: { "dataId" : "AUTUMN" },
	14: { "dataId" : "AUTUMN" },
	
//	15: { "dataId" : "D25K2" },
//	16: { "dataId" : "D25K2" },
//	17: { "dataId" : "D25K2" },
	
//	18: { "dataId" : "D2500" }
	15: { "dataId" : "DJBMM" },
	16: { "dataId" : "DJBMM" },
	17: { "dataId" : "DJBMM" },

	18: { "dataId" : "FGD" }
};

// 段彩陰影パターン冬
var dataSet_Winter = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS2" },
	6: { "dataId" : "JAIS2" },
	7: { "dataId" : "JAIS2" },
	8: { "dataId" : "JAIS2" },
	
	9: { "dataId" : "WINTER" },
	10: { "dataId" : "WINTER" },
	11: { "dataId" : "WINTER" },
	12: { "dataId" : "WINTER" },
	13: { "dataId" : "WINTER" },
	14: { "dataId" : "WINTER" },
	
	15: { "dataId" : "D25K2" },
	16: { "dataId" : "D25K2" },
	17: { "dataId" : "D25K2" },
	
	18: { "dataId" : "D2500" }
};

// 段彩陰影パターン特殊
var dataSet_Season = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS2" },
	6: { "dataId" : "JAIS2" },
	7: { "dataId" : "JAIS2" },
	8: { "dataId" : "JAIS2" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },
	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },
	
	15: { "dataId" : "D25K2" },
	16: { "dataId" : "D25K2" },
	17: { "dataId" : "D25K2" },
	
	18: { "dataId" : "D2500" }
};

// モノトーン地図
var dataSet_Mono = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAISG" },
	6: { "dataId" : "JAISG" },
	7: { "dataId" : "JAISG" },
	8: { "dataId" : "JAISG" },
	
	9: { "dataId" : "GRAY" },
	10: { "dataId" : "GRAY" },
	11: { "dataId" : "GRAY" },
	12: { "dataId" : "GRAY" },
	13: { "dataId" : "GRAY" },
	14: { "dataId" : "GRAY" },
	
//	15: { "dataId" : "D25KG" },
//	16: { "dataId" : "D25KG" },
//	17: { "dataId" : "D25KG" },
	
//	18: { "dataId" : "D2500G" }

	15: { "dataId" : "DJBMM" },
	16: { "dataId" : "DJBMM" },
	17: { "dataId" : "DJBMM" },

	18: { "dataId" : "FGD" }
};

// 白地図
var dataSet_Blank = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "BLANK" },
	6: { "dataId" : "BLANK" },
	7: { "dataId" : "BLANK" },
	8: { "dataId" : "BLANK" },
	9: { "dataId" : "BLANK" },
	10: { "dataId" : "BLANK" },
	11: { "dataId" : "BLANK" },
	
	12: { "dataId" : "BLANK" },
	13: { "dataId" : "BLANK" },
	14: { "dataId" : "BLANK" },
	
	15: { "dataId" : "BLANK" },
	16: { "dataId" : "BLANK" },
	17: { "dataId" : "BLANK" },

	18: { "dataId" : "BLANK" }
};

// 標準地図
var dataSet_Default = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS" },
	6: { "dataId" : "JAIS" },
	7: { "dataId" : "JAIS" },
	8: { "dataId" : "JAIS" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },
	
	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },
	
	15: { "dataId" : "DJBMM" },
	16: { "dataId" : "DJBMM" },
	17: { "dataId" : "DJBMM" },

	18: { "dataId" : "FGD" }
};

// 色別標高図
var dataSet_Relief = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "RELIEF" },
	6: { "dataId" : "RELIEF" },
	7: { "dataId" : "RELIEF" },
	8: { "dataId" : "RELIEF" },
	9: { "dataId" : "RELIEF" },
	10: { "dataId" : "RELIEF" },
	11: { "dataId" : "RELIEF" },
	12: { "dataId" : "RELIEF" },
	13: { "dataId" : "RELIEF" },
	14: { "dataId" : "RELIEF" },
	15: { "dataId" : "RELIEF" },
	13: { "dataId" : "RELIEF" },
	14: { "dataId" : "RELIEF" },
	15: { "dataId" : "RELIEF" },
	16: { "dataId" : "RELIEF" },
	17: { "dataId" : "RELIEF" },
	18: { "dataId" : "RELIEF" }
};

// 英語
var dataSet_Jaise = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAISE" },
	6: { "dataId" : "JAISE" },
	7: { "dataId" : "JAISE" },
	8: { "dataId" : "JAISE" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "DJBMM" },
	16: { "dataId" : "DJBMM" },
	17: { "dataId" : "DJBMM" },

	18: { "dataId" : "FGD" }
};

// 2007-
var dataSet_Y2K7 = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS" },
	6: { "dataId" : "JAIS" },
	7: { "dataId" : "JAIS" },
	8: { "dataId" : "JAIS" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "DJBMO" },
	16: { "dataId" : "DJBMO" },
	17: { "dataId" : "DJBMO" },

	18: { "dataId" : "DJBMO" }
};

// 1988-90
var dataSet_YK88 = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS" },
	6: { "dataId" : "JAIS" },
	7: { "dataId" : "JAIS" },
	8: { "dataId" : "JAIS" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "NLII4" },
	16: { "dataId" : "NLII4" },
	17: { "dataId" : "NLII4" },

	18: { "dataId" : "NLII4" }
};

// 1984-87
var dataSet_YK84 = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS" },
	6: { "dataId" : "JAIS" },
	7: { "dataId" : "JAIS" },
	8: { "dataId" : "JAIS" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "NLII3" },
	16: { "dataId" : "NLII3" },
	17: { "dataId" : "NLII3" },

	18: { "dataId" : "NLII3" }
};

// 1979-83
var dataSet_YK79 = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS" },
	6: { "dataId" : "JAIS" },
	7: { "dataId" : "JAIS" },
	8: { "dataId" : "JAIS" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "NLII2" },
	16: { "dataId" : "NLII2" },
	17: { "dataId" : "NLII2" },

	18: { "dataId" : "NLII2" }
};

// 1974-78
var dataSet_YK74 = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },
	
	5: { "dataId" : "JAIS" },
	6: { "dataId" : "JAIS" },
	7: { "dataId" : "JAIS" },
	8: { "dataId" : "JAIS" },
	
	9: { "dataId" : "BAFD1000K" },
	10: { "dataId" : "BAFD1000K" },
	11: { "dataId" : "BAFD1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "NLII1" },
	16: { "dataId" : "NLII1" },
	17: { "dataId" : "NLII1" },

	18: { "dataId" : "NLII1" }
};

// 彩色地図用レイヤー
var dataSetOverlay_Color = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },
	
	9: { "dataId" : "BAFD1000K2" },
	10: { "dataId" : "BAFD1000K2" },
	11: { "dataId" : "BAFD1000K2" },

	12: { "dataId" : "BAFD200K2" },
	13: { "dataId" : "BAFD200K2" },
	14: { "dataId" : "BAFD200K2" },
	
	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// モノトーン地図用レイヤー
var dataSetOverlay_Mono = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },

	9: { "dataId" : "BAFD1000KG" },
	10: { "dataId" : "BAFD1000KG" },
	11: { "dataId" : "BAFD1000KG" },

	12: { "dataId" : "BAFD200KG" },
	13: { "dataId" : "BAFD200KG" },
	14: { "dataId" : "BAFD200KG" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 土地条件図レイヤー（初期整備版）
var dataSetOverlay_LCM25K = {
	0: { "dataId" : "LCM25K" },
	1: { "dataId" : "LCM25K" },
	2: { "dataId" : "LCM25K" },
	3: { "dataId" : "LCM25K" },
	4: { "dataId" : "LCM25K" },
	5: { "dataId" : "LCM25K" },
	6: { "dataId" : "LCM25K" },
	7: { "dataId" : "LCM25K" },
	8: { "dataId" : "LCM25K" },
	9: { "dataId" : "LCM25K" },
	10: { "dataId" : "LCM25K" },
	11: { "dataId" : "LCM25K" },
	12: { "dataId" : "LCM25K" },
	13: { "dataId" : "LCM25K" },

	14: { "dataId" : "LCM25K" },
	15: { "dataId" : "LCM25K" },
	16: { "dataId" : "LCM25K" },

	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 土地条件図レイヤー（人工地形更新版）
var dataSetOverlay_LCM25K_2011 = {
	0: { "dataId" : "LCM25K_2011" },
	1: { "dataId" : "LCM25K_2011" },
	2: { "dataId" : "LCM25K_2011" },
	3: { "dataId" : "LCM25K_2011" },
	4: { "dataId" : "LCM25K_2011" },
	5: { "dataId" : "LCM25K_2011" },
	6: { "dataId" : "LCM25K_2011" },
	7: { "dataId" : "LCM25K_2011" },
	8: { "dataId" : "LCM25K_2011" },
	9: { "dataId" : "LCM25K_2011" },
	10: { "dataId" : "LCM25K_2011" },
	11: { "dataId" : "LCM25K_2011" },
	12: { "dataId" : "LCM25K_2011" },
	13: { "dataId" : "LCM25K_2011" },

	14: { "dataId" : "LCM25K_2011" },
	15: { "dataId" : "LCM25K_2011" },
	16: { "dataId" : "LCM25K_2011" },

	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 色別標高図レイヤー
var dataSetOverlay_Relief = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },

	5: { "dataId" : "RELIEF" },
	6: { "dataId" : "RELIEF" },
	7: { "dataId" : "RELIEF" },
	8: { "dataId" : "RELIEF" },
	9: { "dataId" : "RELIEF" },
	10: { "dataId" : "RELIEF" },
	11: { "dataId" : "RELIEF" },
	12: { "dataId" : "RELIEF" },
	13: { "dataId" : "RELIEF" },
	14: { "dataId" : "RELIEF" },
	15: { "dataId" : "RELIEF" },

	16: { "dataId" : "RELIEF" },
	17: { "dataId" : "RELIEF" },
	18: { "dataId" : "RELIEF" }
};

// 2007-
var dataSetOverlay_Y2K7 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },
	9: { "dataId" : "TRANSPARENT" },
	10: { "dataId" : "TRANSPARENT" },
	11: { "dataId" : "TRANSPARENT" },
	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },

	15: { "dataId" : "DJBMO" },
	16: { "dataId" : "DJBMO" },
	17: { "dataId" : "DJBMO" },

	18: { "dataId" : "DJBMO" }
};

// 1988-
var dataSetOverlay_YK88 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },
	9: { "dataId" : "TRANSPARENT" },
	10: { "dataId" : "TRANSPARENT" },
	11: { "dataId" : "TRANSPARENT" },
	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },
	
	15: { "dataId" : "NLII4" },
	16: { "dataId" : "NLII4" },
	17: { "dataId" : "NLII4" },
	
	18: { "dataId" : "NLII4" }
};

// 1984-
var dataSetOverlay_YK84 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },
	9: { "dataId" : "TRANSPARENT" },
	10: { "dataId" : "TRANSPARENT" },
	11: { "dataId" : "TRANSPARENT" },
	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },

	15: { "dataId" : "NLII3" },
	16: { "dataId" : "NLII3" },
	17: { "dataId" : "NLII3" },

	18: { "dataId" : "NLII3" }
};

// 1979-
var dataSetOverlay_YK79 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },
	9: { "dataId" : "TRANSPARENT" },
	10: { "dataId" : "TRANSPARENT" },
	11: { "dataId" : "TRANSPARENT" },
	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },

	15: { "dataId" : "NLII2" },
	16: { "dataId" : "NLII2" },
	17: { "dataId" : "NLII2" },

	18: { "dataId" : "NLII2" }
};

// 1974-
var dataSetOverlay_YK74 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },
	9: { "dataId" : "TRANSPARENT" },
	10: { "dataId" : "TRANSPARENT" },
	11: { "dataId" : "TRANSPARENT" },
	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },
	
	15: { "dataId" : "NLII1" },
	16: { "dataId" : "NLII1" },
	17: { "dataId" : "NLII1" },

	18: { "dataId" : "NLII1" }
};


// 雌阿寒岳・阿寒岳
var dataSetOverlay_akandake = {
	0: { "dataId" : "16akandake" },
	1: { "dataId" : "16akandake" },
	2: { "dataId" : "16akandake" },
	3: { "dataId" : "16akandake" },
	4: { "dataId" : "16akandake" },
	5: { "dataId" : "16akandake" },
	6: { "dataId" : "16akandake" },
	7: { "dataId" : "16akandake" },
	8: { "dataId" : "16akandake" },
	9: { "dataId" : "16akandake" },
	10: { "dataId" : "16akandake" },
	11: { "dataId" : "16akandake" },
	12: { "dataId" : "16akandake" },
	13: { "dataId" : "16akandake" },
	14: { "dataId" : "16akandake" },
	15: { "dataId" : "16akandake" },
	16: { "dataId" : "16akandake" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 十勝岳
var dataSetOverlay_tokachidake = {
	0: { "dataId" : "02tokachidake" },
	1: { "dataId" : "02tokachidake" },
	2: { "dataId" : "02tokachidake" },
	3: { "dataId" : "02tokachidake" },
	4: { "dataId" : "02tokachidake" },
	5: { "dataId" : "02tokachidake" },
	6: { "dataId" : "02tokachidake" },
	7: { "dataId" : "02tokachidake" },
	8: { "dataId" : "02tokachidake" },
	9: { "dataId" : "02tokachidake" },
	10: { "dataId" : "02tokachidake" },
	11: { "dataId" : "02tokachidake" },
	12: { "dataId" : "02tokachidake" },
	13: { "dataId" : "02tokachidake" },
	14: { "dataId" : "02tokachidake" },
	15: { "dataId" : "02tokachidake" },
	16: { "dataId" : "02tokachidake" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 樽前山
var dataSetOverlay_tarumaesan = {
	0: { "dataId" : "10tarumaesan" },
	1: { "dataId" : "10tarumaesan" },
	2: { "dataId" : "10tarumaesan" },
	3: { "dataId" : "10tarumaesan" },
	4: { "dataId" : "10tarumaesan" },
	5: { "dataId" : "10tarumaesan" },
	6: { "dataId" : "10tarumaesan" },
	7: { "dataId" : "10tarumaesan" },
	8: { "dataId" : "10tarumaesan" },
	9: { "dataId" : "10tarumaesan" },
	10: { "dataId" : "10tarumaesan" },
	11: { "dataId" : "10tarumaesan" },
	12: { "dataId" : "10tarumaesan" },
	13: { "dataId" : "10tarumaesan" },
	14: { "dataId" : "10tarumaesan" },
	15: { "dataId" : "10tarumaesan" },
	16: { "dataId" : "10tarumaesan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 有珠山
var dataSetOverlay_usuzan = {
	0: { "dataId" : "09usuzan" },
	1: { "dataId" : "09usuzan" },
	2: { "dataId" : "09usuzan" },
	3: { "dataId" : "09usuzan" },
	4: { "dataId" : "09usuzan" },
	5: { "dataId" : "09usuzan" },
	6: { "dataId" : "09usuzan" },
	7: { "dataId" : "09usuzan" },
	8: { "dataId" : "09usuzan" },
	9: { "dataId" : "09usuzan" },
	10: { "dataId" : "09usuzan" },
	11: { "dataId" : "09usuzan" },
	12: { "dataId" : "09usuzan" },
	13: { "dataId" : "09usuzan" },
	14: { "dataId" : "09usuzan" },
	15: { "dataId" : "09usuzan" },
	16: { "dataId" : "09usuzan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 北海道駒ケ岳
var dataSetOverlay_komagatake = {
	0: { "dataId" : "05komagatake" },
	1: { "dataId" : "05komagatake" },
	2: { "dataId" : "05komagatake" },
	3: { "dataId" : "05komagatake" },
	4: { "dataId" : "05komagatake" },
	5: { "dataId" : "05komagatake" },
	6: { "dataId" : "05komagatake" },
	7: { "dataId" : "05komagatake" },
	8: { "dataId" : "05komagatake" },
	9: { "dataId" : "05komagatake" },
	10: { "dataId" : "05komagatake" },
	11: { "dataId" : "05komagatake" },
	12: { "dataId" : "05komagatake" },
	13: { "dataId" : "05komagatake" },
	14: { "dataId" : "05komagatake" },
	15: { "dataId" : "05komagatake" },
	16: { "dataId" : "05komagatake" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};


// 栗駒山
var dataSetOverlay_kurikomayama = {
	0: { "dataId" : "00kurikomayama" },
	1: { "dataId" : "00kurikomayama" },
	2: { "dataId" : "00kurikomayama" },
	3: { "dataId" : "00kurikomayama" },
	4: { "dataId" : "00kurikomayama" },
	5: { "dataId" : "00kurikomayama" },
	6: { "dataId" : "00kurikomayama" },
	7: { "dataId" : "00kurikomayama" },
	8: { "dataId" : "00kurikomayama" },
	9: { "dataId" : "00kurikomayama" },
	10: { "dataId" : "00kurikomayama" },
	11: { "dataId" : "00kurikomayama" },
	12: { "dataId" : "00kurikomayama" },
	13: { "dataId" : "00kurikomayama" },
	14: { "dataId" : "00kurikomayama" },
	15: { "dataId" : "00kurikomayama" },
	16: { "dataId" : "00kurikomayama" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};


// 安達太良山
var dataSetOverlay_adatarayama = {
	0: { "dataId" : "14adatarayama" },
	1: { "dataId" : "14adatarayama" },
	2: { "dataId" : "14adatarayama" },
	3: { "dataId" : "14adatarayama" },
	4: { "dataId" : "14adatarayama" },
	5: { "dataId" : "14adatarayama" },
	6: { "dataId" : "14adatarayama" },
	7: { "dataId" : "14adatarayama" },
	8: { "dataId" : "14adatarayama" },
	9: { "dataId" : "14adatarayama" },
	10: { "dataId" : "14adatarayama" },
	11: { "dataId" : "14adatarayama" },
	12: { "dataId" : "14adatarayama" },
	13: { "dataId" : "14adatarayama" },
	14: { "dataId" : "14adatarayama" },
	15: { "dataId" : "14adatarayama" },
	16: { "dataId" : "14adatarayama" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};


// 磐梯山
var dataSetOverlay_bandaisan = {
	0: { "dataId" : "11bandaisan" },
	1: { "dataId" : "11bandaisan" },
	2: { "dataId" : "11bandaisan" },
	3: { "dataId" : "11bandaisan" },
	4: { "dataId" : "11bandaisan" },
	5: { "dataId" : "11bandaisan" },
	6: { "dataId" : "11bandaisan" },
	7: { "dataId" : "11bandaisan" },
	8: { "dataId" : "11bandaisan" },
	9: { "dataId" : "11bandaisan" },
	10: { "dataId" : "11bandaisan" },
	11: { "dataId" : "11bandaisan" },
	12: { "dataId" : "11bandaisan" },
	13: { "dataId" : "11bandaisan" },
	14: { "dataId" : "11bandaisan" },
	15: { "dataId" : "11bandaisan" },
	16: { "dataId" : "11bandaisan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 伊豆大島
var dataSetOverlay_izuoshima = {
	0: { "dataId" : "13izuoshima" },
	1: { "dataId" : "13izuoshima" },
	2: { "dataId" : "13izuoshima" },
	3: { "dataId" : "13izuoshima" },
	4: { "dataId" : "13izuoshima" },
	5: { "dataId" : "13izuoshima" },
	6: { "dataId" : "13izuoshima" },
	7: { "dataId" : "13izuoshima" },
	8: { "dataId" : "13izuoshima" },
	9: { "dataId" : "13izuoshima" },
	10: { "dataId" : "13izuoshima" },
	11: { "dataId" : "13izuoshima" },
	12: { "dataId" : "13izuoshima" },
	13: { "dataId" : "13izuoshima" },
	14: { "dataId" : "13izuoshima" },
	15: { "dataId" : "13izuoshima" },
	16: { "dataId" : "13izuoshima" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 三宅島
var dataSetOverlay_miyakezima = {
	0: { "dataId" : "06miyakezima" },
	1: { "dataId" : "06miyakezima" },
	2: { "dataId" : "06miyakezima" },
	3: { "dataId" : "06miyakezima" },
	4: { "dataId" : "06miyakezima" },
	5: { "dataId" : "06miyakezima" },
	6: { "dataId" : "06miyakezima" },
	7: { "dataId" : "06miyakezima" },
	8: { "dataId" : "06miyakezima" },
	9: { "dataId" : "06miyakezima" },
	10: { "dataId" : "06miyakezima" },
	11: { "dataId" : "06miyakezima" },
	12: { "dataId" : "06miyakezima" },
	13: { "dataId" : "06miyakezima" },
	14: { "dataId" : "06miyakezima" },
	15: { "dataId" : "06miyakezima" },
	16: { "dataId" : "06miyakezima" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 草津白根山
var dataSetOverlay_kusatsushiranesan = {
	0: { "dataId" : "03kusatsushiranesan" },
	1: { "dataId" : "03kusatsushiranesan" },
	2: { "dataId" : "03kusatsushiranesan" },
	3: { "dataId" : "03kusatsushiranesan" },
	4: { "dataId" : "03kusatsushiranesan" },
	5: { "dataId" : "03kusatsushiranesan" },
	6: { "dataId" : "03kusatsushiranesan" },
	7: { "dataId" : "03kusatsushiranesan" },
	8: { "dataId" : "03kusatsushiranesan" },
	9: { "dataId" : "03kusatsushiranesan" },
	10: { "dataId" : "03kusatsushiranesan" },
	11: { "dataId" : "03kusatsushiranesan" },
	12: { "dataId" : "03kusatsushiranesan" },
	13: { "dataId" : "03kusatsushiranesan" },
	14: { "dataId" : "03kusatsushiranesan" },
	15: { "dataId" : "03kusatsushiranesan" },
	16: { "dataId" : "03kusatsushiranesan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 富士山
var dataSetOverlay_fujisan = {
	0: { "dataId" : "12fujisan" },
	1: { "dataId" : "12fujisan" },
	2: { "dataId" : "12fujisan" },
	3: { "dataId" : "12fujisan" },
	4: { "dataId" : "12fujisan" },
	5: { "dataId" : "12fujisan" },
	6: { "dataId" : "12fujisan" },
	7: { "dataId" : "12fujisan" },
	8: { "dataId" : "12fujisan" },
	9: { "dataId" : "12fujisan" },
	10: { "dataId" : "12fujisan" },
	11: { "dataId" : "12fujisan" },
	12: { "dataId" : "12fujisan" },
	13: { "dataId" : "12fujisan" },
	14: { "dataId" : "12fujisan" },
	15: { "dataId" : "12fujisan" },
	16: { "dataId" : "12fujisan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 御嶽山
var dataSetOverlay_ontakesan = {
	0: { "dataId" : "00ontakesan" },
	1: { "dataId" : "00ontakesan" },
	2: { "dataId" : "00ontakesan" },
	3: { "dataId" : "00ontakesan" },
	4: { "dataId" : "00ontakesan" },
	5: { "dataId" : "00ontakesan" },
	6: { "dataId" : "00ontakesan" },
	7: { "dataId" : "00ontakesan" },
	8: { "dataId" : "00ontakesan" },
	9: { "dataId" : "00ontakesan" },
	10: { "dataId" : "00ontakesan" },
	11: { "dataId" : "00ontakesan" },
	12: { "dataId" : "00ontakesan" },
	13: { "dataId" : "00ontakesan" },
	14: { "dataId" : "00ontakesan" },
	15: { "dataId" : "00ontakesan" },
	16: { "dataId" : "00ontakesan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// くじゅう連山
var dataSetOverlay_kujirenzan = {
	0: { "dataId" : "15kujirenzan" },
	1: { "dataId" : "15kujirenzan" },
	2: { "dataId" : "15kujirenzan" },
	3: { "dataId" : "15kujirenzan" },
	4: { "dataId" : "15kujirenzan" },
	5: { "dataId" : "15kujirenzan" },
	6: { "dataId" : "15kujirenzan" },
	7: { "dataId" : "15kujirenzan" },
	8: { "dataId" : "15kujirenzan" },
	9: { "dataId" : "15kujirenzan" },
	10: { "dataId" : "15kujirenzan" },
	11: { "dataId" : "15kujirenzan" },
	12: { "dataId" : "15kujirenzan" },
	13: { "dataId" : "15kujirenzan" },
	14: { "dataId" : "15kujirenzan" },
	15: { "dataId" : "15kujirenzan" },
	16: { "dataId" : "15kujirenzan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 阿蘇山
var dataSetOverlay_asosan = {
	0: { "dataId" : "04asosan" },
	1: { "dataId" : "04asosan" },
	2: { "dataId" : "04asosan" },
	3: { "dataId" : "04asosan" },
	4: { "dataId" : "04asosan" },
	5: { "dataId" : "04asosan" },
	6: { "dataId" : "04asosan" },
	7: { "dataId" : "04asosan" },
	8: { "dataId" : "04asosan" },
	9: { "dataId" : "04asosan" },
	10: { "dataId" : "04asosan" },
	11: { "dataId" : "04asosan" },
	12: { "dataId" : "04asosan" },
	13: { "dataId" : "04asosan" },
	14: { "dataId" : "04asosan" },
	15: { "dataId" : "04asosan" },
	16: { "dataId" : "04asosan" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 雲仙岳
var dataSetOverlay_unzendake = {
	0: { "dataId" : "07unzendake" },
	1: { "dataId" : "07unzendake" },
	2: { "dataId" : "07unzendake" },
	3: { "dataId" : "07unzendake" },
	4: { "dataId" : "07unzendake" },
	5: { "dataId" : "07unzendake" },
	6: { "dataId" : "07unzendake" },
	7: { "dataId" : "07unzendake" },
	8: { "dataId" : "07unzendake" },
	9: { "dataId" : "07unzendake" },
	10: { "dataId" : "07unzendake" },
	11: { "dataId" : "07unzendake" },
	12: { "dataId" : "07unzendake" },
	13: { "dataId" : "07unzendake" },
	14: { "dataId" : "07unzendake" },
	15: { "dataId" : "07unzendake" },
	16: { "dataId" : "07unzendake" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 霧島山
var dataSetOverlay_kirishimayama = {
	0: { "dataId" : "08kirishimayama" },
	1: { "dataId" : "08kirishimayama" },
	2: { "dataId" : "08kirishimayama" },
	3: { "dataId" : "08kirishimayama" },
	4: { "dataId" : "08kirishimayama" },
	5: { "dataId" : "08kirishimayama" },
	6: { "dataId" : "08kirishimayama" },
	7: { "dataId" : "08kirishimayama" },
	8: { "dataId" : "08kirishimayama" },
	9: { "dataId" : "08kirishimayama" },
	10: { "dataId" : "08kirishimayama" },
	11: { "dataId" : "08kirishimayama" },
	12: { "dataId" : "08kirishimayama" },
	13: { "dataId" : "08kirishimayama" },
	14: { "dataId" : "08kirishimayama" },
	15: { "dataId" : "08kirishimayama" },
	16: { "dataId" : "08kirishimayama" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 桜島
var dataSetOverlay_sakurazima = {
	0: { "dataId" : "01sakurazima" },
	1: { "dataId" : "01sakurazima" },
	2: { "dataId" : "01sakurazima" },
	3: { "dataId" : "01sakurazima" },
	4: { "dataId" : "01sakurazima" },
	5: { "dataId" : "01sakurazima" },
	6: { "dataId" : "01sakurazima" },
	7: { "dataId" : "01sakurazima" },
	8: { "dataId" : "01sakurazima" },
	9: { "dataId" : "01sakurazima" },
	10: { "dataId" : "01sakurazima" },
	11: { "dataId" : "01sakurazima" },
	12: { "dataId" : "01sakurazima" },
	13: { "dataId" : "01sakurazima" },
	14: { "dataId" : "01sakurazima" },
	15: { "dataId" : "01sakurazima" },
	16: { "dataId" : "01sakurazima" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 薩摩硫黄島
var dataSetOverlay_satsumaiojima = {
	0: { "dataId" : "17satsumaiojima" },
	1: { "dataId" : "17satsumaiojima" },
	2: { "dataId" : "17satsumaiojima" },
	3: { "dataId" : "17satsumaiojima" },
	4: { "dataId" : "17satsumaiojima" },
	5: { "dataId" : "17satsumaiojima" },
	6: { "dataId" : "17satsumaiojima" },
	7: { "dataId" : "17satsumaiojima" },
	8: { "dataId" : "17satsumaiojima" },
	9: { "dataId" : "17satsumaiojima" },
	10: { "dataId" : "17satsumaiojima" },
	11: { "dataId" : "17satsumaiojima" },
	12: { "dataId" : "17satsumaiojima" },
	13: { "dataId" : "17satsumaiojima" },
	14: { "dataId" : "17satsumaiojima" },
	15: { "dataId" : "17satsumaiojima" },
	16: { "dataId" : "17satsumaiojima" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-2005
var dataSetOverlay_capital2005 = {
	0: { "dataId" : "capital2005" },
	1: { "dataId" : "capital2005" },
	2: { "dataId" : "capital2005" },
	3: { "dataId" : "capital2005" },
	4: { "dataId" : "capital2005" },
	5: { "dataId" : "capital2005" },
	6: { "dataId" : "capital2005" },
	7: { "dataId" : "capital2005" },
	8: { "dataId" : "capital2005" },
	9: { "dataId" : "capital2005" },
	10: { "dataId" : "capital2005" },
	11: { "dataId" : "capital2005" },
	12: { "dataId" : "capital2005" },
	13: { "dataId" : "capital2005" },
	14: { "dataId" : "capital2005" },
	15: { "dataId" : "capital2005" },
	16: { "dataId" : "capital2005" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-2000
var dataSetOverlay_capital2000 = {
	0: { "dataId" : "capital2000" },
	1: { "dataId" : "capital2000" },
	2: { "dataId" : "capital2000" },
	3: { "dataId" : "capital2000" },
	4: { "dataId" : "capital2000" },
	5: { "dataId" : "capital2000" },
	6: { "dataId" : "capital2000" },
	7: { "dataId" : "capital2000" },
	8: { "dataId" : "capital2000" },
	9: { "dataId" : "capital2000" },
	10: { "dataId" : "capital2000" },
	11: { "dataId" : "capital2000" },
	12: { "dataId" : "capital2000" },
	13: { "dataId" : "capital2000" },
	14: { "dataId" : "capital2000" },
	15: { "dataId" : "capital2000" },
	16: { "dataId" : "capital2000" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-1994
var dataSetOverlay_capital1994 = {
	0: { "dataId" : "capital1994" },
	1: { "dataId" : "capital1994" },
	2: { "dataId" : "capital1994" },
	3: { "dataId" : "capital1994" },
	4: { "dataId" : "capital1994" },
	5: { "dataId" : "capital1994" },
	6: { "dataId" : "capital1994" },
	7: { "dataId" : "capital1994" },
	8: { "dataId" : "capital1994" },
	9: { "dataId" : "capital1994" },
	10: { "dataId" : "capital1994" },
	11: { "dataId" : "capital1994" },
	12: { "dataId" : "capital1994" },
	13: { "dataId" : "capital1994" },
	14: { "dataId" : "capital1994" },
	15: { "dataId" : "capital1994" },
	16: { "dataId" : "capital1994" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-1989
var dataSetOverlay_capital1989 = {
	0: { "dataId" : "capital1989" },
	1: { "dataId" : "capital1989" },
	2: { "dataId" : "capital1989" },
	3: { "dataId" : "capital1989" },
	4: { "dataId" : "capital1989" },
	5: { "dataId" : "capital1989" },
	6: { "dataId" : "capital1989" },
	7: { "dataId" : "capital1989" },
	8: { "dataId" : "capital1989" },
	9: { "dataId" : "capital1989" },
	10: { "dataId" : "capital1989" },
	11: { "dataId" : "capital1989" },
	12: { "dataId" : "capital1989" },
	13: { "dataId" : "capital1989" },
	14: { "dataId" : "capital1989" },
	15: { "dataId" : "capital1989" },
	16: { "dataId" : "capital1989" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-1984
var dataSetOverlay_capital1984 = {
	0: { "dataId" : "capital1984" },
	1: { "dataId" : "capital1984" },
	2: { "dataId" : "capital1984" },
	3: { "dataId" : "capital1984" },
	4: { "dataId" : "capital1984" },
	5: { "dataId" : "capital1984" },
	6: { "dataId" : "capital1984" },
	7: { "dataId" : "capital1984" },
	8: { "dataId" : "capital1984" },
	9: { "dataId" : "capital1984" },
	10: { "dataId" : "capital1984" },
	11: { "dataId" : "capital1984" },
	12: { "dataId" : "capital1984" },
	13: { "dataId" : "capital1984" },
	14: { "dataId" : "capital1984" },
	15: { "dataId" : "capital1984" },
	16: { "dataId" : "capital1984" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-1979
var dataSetOverlay_capital1979 = {
	0: { "dataId" : "capital1979" },
	1: { "dataId" : "capital1979" },
	2: { "dataId" : "capital1979" },
	3: { "dataId" : "capital1979" },
	4: { "dataId" : "capital1979" },
	5: { "dataId" : "capital1979" },
	6: { "dataId" : "capital1979" },
	7: { "dataId" : "capital1979" },
	8: { "dataId" : "capital1979" },
	9: { "dataId" : "capital1979" },
	10: { "dataId" : "capital1979" },
	11: { "dataId" : "capital1979" },
	12: { "dataId" : "capital1979" },
	13: { "dataId" : "capital1979" },
	14: { "dataId" : "capital1979" },
	15: { "dataId" : "capital1979" },
	16: { "dataId" : "capital1979" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-首都圏-1974
var dataSetOverlay_capital1974 = {
	0: { "dataId" : "capital1974" },
	1: { "dataId" : "capital1974" },
	2: { "dataId" : "capital1974" },
	3: { "dataId" : "capital1974" },
	4: { "dataId" : "capital1974" },
	5: { "dataId" : "capital1974" },
	6: { "dataId" : "capital1974" },
	7: { "dataId" : "capital1974" },
	8: { "dataId" : "capital1974" },
	9: { "dataId" : "capital1974" },
	10: { "dataId" : "capital1974" },
	11: { "dataId" : "capital1974" },
	12: { "dataId" : "capital1974" },
	13: { "dataId" : "capital1974" },
	14: { "dataId" : "capital1974" },
	15: { "dataId" : "capital1974" },
	16: { "dataId" : "capital1974" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-中部圏-2003
var dataSetOverlay_chubu2003 = {
	0: { "dataId" : "chubu2003" },
	1: { "dataId" : "chubu2003" },
	2: { "dataId" : "chubu2003" },
	3: { "dataId" : "chubu2003" },
	4: { "dataId" : "chubu2003" },
	5: { "dataId" : "chubu2003" },
	6: { "dataId" : "chubu2003" },
	7: { "dataId" : "chubu2003" },
	8: { "dataId" : "chubu2003" },
	9: { "dataId" : "chubu2003" },
	10: { "dataId" : "chubu2003" },
	11: { "dataId" : "chubu2003" },
	12: { "dataId" : "chubu2003" },
	13: { "dataId" : "chubu2003" },
	14: { "dataId" : "chubu2003" },
	15: { "dataId" : "chubu2003" },
	16: { "dataId" : "chubu2003" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-中部圏-1997
var dataSetOverlay_chubu1997 = {
	0: { "dataId" : "chubu1997" },
	1: { "dataId" : "chubu1997" },
	2: { "dataId" : "chubu1997" },
	3: { "dataId" : "chubu1997" },
	4: { "dataId" : "chubu1997" },
	5: { "dataId" : "chubu1997" },
	6: { "dataId" : "chubu1997" },
	7: { "dataId" : "chubu1997" },
	8: { "dataId" : "chubu1997" },
	9: { "dataId" : "chubu1997" },
	10: { "dataId" : "chubu1997" },
	11: { "dataId" : "chubu1997" },
	12: { "dataId" : "chubu1997" },
	13: { "dataId" : "chubu1997" },
	14: { "dataId" : "chubu1997" },
	15: { "dataId" : "chubu1997" },
	16: { "dataId" : "chubu1997" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-中部圏-1991
var dataSetOverlay_chubu1991 = {
	0: { "dataId" : "chubu1991" },
	1: { "dataId" : "chubu1991" },
	2: { "dataId" : "chubu1991" },
	3: { "dataId" : "chubu1991" },
	4: { "dataId" : "chubu1991" },
	5: { "dataId" : "chubu1991" },
	6: { "dataId" : "chubu1991" },
	7: { "dataId" : "chubu1991" },
	8: { "dataId" : "chubu1991" },
	9: { "dataId" : "chubu1991" },
	10: { "dataId" : "chubu1991" },
	11: { "dataId" : "chubu1991" },
	12: { "dataId" : "chubu1991" },
	13: { "dataId" : "chubu1991" },
	14: { "dataId" : "chubu1991" },
	15: { "dataId" : "chubu1991" },
	16: { "dataId" : "chubu1991" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-中部圏-1987
var dataSetOverlay_chubu1987 = {
	0: { "dataId" : "chubu1987" },
	1: { "dataId" : "chubu1987" },
	2: { "dataId" : "chubu1987" },
	3: { "dataId" : "chubu1987" },
	4: { "dataId" : "chubu1987" },
	5: { "dataId" : "chubu1987" },
	6: { "dataId" : "chubu1987" },
	7: { "dataId" : "chubu1987" },
	8: { "dataId" : "chubu1987" },
	9: { "dataId" : "chubu1987" },
	10: { "dataId" : "chubu1987" },
	11: { "dataId" : "chubu1987" },
	12: { "dataId" : "chubu1987" },
	13: { "dataId" : "chubu1987" },
	14: { "dataId" : "chubu1987" },
	15: { "dataId" : "chubu1987" },
	16: { "dataId" : "chubu1987" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-中部圏-1982
var dataSetOverlay_chubu1982 = {
	0: { "dataId" : "chubu1982" },
	1: { "dataId" : "chubu1982" },
	2: { "dataId" : "chubu1982" },
	3: { "dataId" : "chubu1982" },
	4: { "dataId" : "chubu1982" },
	5: { "dataId" : "chubu1982" },
	6: { "dataId" : "chubu1982" },
	7: { "dataId" : "chubu1982" },
	8: { "dataId" : "chubu1982" },
	9: { "dataId" : "chubu1982" },
	10: { "dataId" : "chubu1982" },
	11: { "dataId" : "chubu1982" },
	12: { "dataId" : "chubu1982" },
	13: { "dataId" : "chubu1982" },
	14: { "dataId" : "chubu1982" },
	15: { "dataId" : "chubu1982" },
	16: { "dataId" : "chubu1982" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-中部圏-1977
var dataSetOverlay_chubu1977 = {
	0: { "dataId" : "chubu1977" },
	1: { "dataId" : "chubu1977" },
	2: { "dataId" : "chubu1977" },
	3: { "dataId" : "chubu1977" },
	4: { "dataId" : "chubu1977" },
	5: { "dataId" : "chubu1977" },
	6: { "dataId" : "chubu1977" },
	7: { "dataId" : "chubu1977" },
	8: { "dataId" : "chubu1977" },
	9: { "dataId" : "chubu1977" },
	10: { "dataId" : "chubu1977" },
	11: { "dataId" : "chubu1977" },
	12: { "dataId" : "chubu1977" },
	13: { "dataId" : "chubu1977" },
	14: { "dataId" : "chubu1977" },
	15: { "dataId" : "chubu1977" },
	16: { "dataId" : "chubu1977" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-2008
var dataSetOverlay_kinki2008 = {
	0: { "dataId" : "kinki2008" },
	1: { "dataId" : "kinki2008" },
	2: { "dataId" : "kinki2008" },
	3: { "dataId" : "kinki2008" },
	4: { "dataId" : "kinki2008" },
	5: { "dataId" : "kinki2008" },
	6: { "dataId" : "kinki2008" },
	7: { "dataId" : "kinki2008" },
	8: { "dataId" : "kinki2008" },
	9: { "dataId" : "kinki2008" },
	10: { "dataId" : "kinki2008" },
	11: { "dataId" : "kinki2008" },
	12: { "dataId" : "kinki2008" },
	13: { "dataId" : "kinki2008" },
	14: { "dataId" : "kinki2008" },
	15: { "dataId" : "kinki2008" },
	16: { "dataId" : "kinki2008" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-2001
var dataSetOverlay_kinki2001 = {
	0: { "dataId" : "kinki2001" },
	1: { "dataId" : "kinki2001" },
	2: { "dataId" : "kinki2001" },
	3: { "dataId" : "kinki2001" },
	4: { "dataId" : "kinki2001" },
	5: { "dataId" : "kinki2001" },
	6: { "dataId" : "kinki2001" },
	7: { "dataId" : "kinki2001" },
	8: { "dataId" : "kinki2001" },
	9: { "dataId" : "kinki2001" },
	10: { "dataId" : "kinki2001" },
	11: { "dataId" : "kinki2001" },
	12: { "dataId" : "kinki2001" },
	13: { "dataId" : "kinki2001" },
	14: { "dataId" : "kinki2001" },
	15: { "dataId" : "kinki2001" },
	16: { "dataId" : "kinki2001" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-1996
var dataSetOverlay_kinki1996 = {
	0: { "dataId" : "kinki1996" },
	1: { "dataId" : "kinki1996" },
	2: { "dataId" : "kinki1996" },
	3: { "dataId" : "kinki1996" },
	4: { "dataId" : "kinki1996" },
	5: { "dataId" : "kinki1996" },
	6: { "dataId" : "kinki1996" },
	7: { "dataId" : "kinki1996" },
	8: { "dataId" : "kinki1996" },
	9: { "dataId" : "kinki1996" },
	10: { "dataId" : "kinki1996" },
	11: { "dataId" : "kinki1996" },
	12: { "dataId" : "kinki1996" },
	13: { "dataId" : "kinki1996" },
	14: { "dataId" : "kinki1996" },
	15: { "dataId" : "kinki1996" },
	16: { "dataId" : "kinki1996" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-1991
var dataSetOverlay_kinki1991 = {
	0: { "dataId" : "kinki1991" },
	1: { "dataId" : "kinki1991" },
	2: { "dataId" : "kinki1991" },
	3: { "dataId" : "kinki1991" },
	4: { "dataId" : "kinki1991" },
	5: { "dataId" : "kinki1991" },
	6: { "dataId" : "kinki1991" },
	7: { "dataId" : "kinki1991" },
	8: { "dataId" : "kinki1991" },
	9: { "dataId" : "kinki1991" },
	10: { "dataId" : "kinki1991" },
	11: { "dataId" : "kinki1991" },
	12: { "dataId" : "kinki1991" },
	13: { "dataId" : "kinki1991" },
	14: { "dataId" : "kinki1991" },
	15: { "dataId" : "kinki1991" },
	16: { "dataId" : "kinki1991" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-1985
var dataSetOverlay_kinki1985 = {
	0: { "dataId" : "kinki1985" },
	1: { "dataId" : "kinki1985" },
	2: { "dataId" : "kinki1985" },
	3: { "dataId" : "kinki1985" },
	4: { "dataId" : "kinki1985" },
	5: { "dataId" : "kinki1985" },
	6: { "dataId" : "kinki1985" },
	7: { "dataId" : "kinki1985" },
	8: { "dataId" : "kinki1985" },
	9: { "dataId" : "kinki1985" },
	10: { "dataId" : "kinki1985" },
	11: { "dataId" : "kinki1985" },
	12: { "dataId" : "kinki1985" },
	13: { "dataId" : "kinki1985" },
	14: { "dataId" : "kinki1985" },
	15: { "dataId" : "kinki1985" },
	16: { "dataId" : "kinki1985" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-1979
var dataSetOverlay_kinki1979 = {
	0: { "dataId" : "kinki1979" },
	1: { "dataId" : "kinki1979" },
	2: { "dataId" : "kinki1979" },
	3: { "dataId" : "kinki1979" },
	4: { "dataId" : "kinki1979" },
	5: { "dataId" : "kinki1979" },
	6: { "dataId" : "kinki1979" },
	7: { "dataId" : "kinki1979" },
	8: { "dataId" : "kinki1979" },
	9: { "dataId" : "kinki1979" },
	10: { "dataId" : "kinki1979" },
	11: { "dataId" : "kinki1979" },
	12: { "dataId" : "kinki1979" },
	13: { "dataId" : "kinki1979" },
	14: { "dataId" : "kinki1979" },
	15: { "dataId" : "kinki1979" },
	16: { "dataId" : "kinki1979" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 宅地利用動向調査-近畿圏-1974
var dataSetOverlay_kinki1974 = {
	0: { "dataId" : "kinki1974" },
	1: { "dataId" : "kinki1974" },
	2: { "dataId" : "kinki1974" },
	3: { "dataId" : "kinki1974" },
	4: { "dataId" : "kinki1974" },
	5: { "dataId" : "kinki1974" },
	6: { "dataId" : "kinki1974" },
	7: { "dataId" : "kinki1974" },
	8: { "dataId" : "kinki1974" },
	9: { "dataId" : "kinki1974" },
	10: { "dataId" : "kinki1974" },
	11: { "dataId" : "kinki1974" },
	12: { "dataId" : "kinki1974" },
	13: { "dataId" : "kinki1974" },
	14: { "dataId" : "kinki1974" },
	15: { "dataId" : "kinki1974" },
	16: { "dataId" : "kinki1974" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 明治前期の低湿地
var dataSetOverlay_MeijiSwale = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "SWALE" },
	6: { "dataId" : "SWALE" },
	7: { "dataId" : "SWALE" },
	8: { "dataId" : "SWALE" },
	9: { "dataId" : "SWALE" },
	10: { "dataId" : "SWALE" },
	11: { "dataId" : "SWALE" },
	12: { "dataId" : "SWALE" },
	13: { "dataId" : "SWALE" },
	14: { "dataId" : "SWALE" },
	15: { "dataId" : "SWALE" },
	16: { "dataId" : "SWALE" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};
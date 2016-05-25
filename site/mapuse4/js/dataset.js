var overLayer;
var dataSetObj = [];

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
		case "std2012":
			// 標準地図シンプルスキーム版（旧）
			mapId = "STD";
			break;

		case "std":
		case "D200K":
		case "D25K2BRWN":
		case "D25K2":
		case "D2500":
			// 標準地図シンプルスキーム版（ハイブリッド）
			mapId = "STD";
			break;

		case "JAISG":
		case "GRAY":
		case "D25KG":
		case "D2500G":
		case "monotoneshade2012":
			// モノトーン
			mapId = "pale";
			break;

		case "JAIS2":
//		case "D25K2":
//		case "D2500":
			// 春夏秋冬の区別ができないもの
			mapId = "STD";
			break;

		case "DJBMO":
		case "ort":
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
			mapId = "STD";
			break;

		case "SUMMER":
		case "greenshade2012":
			mapId = "STD";
			break;

		case "AUTUMN":
		case "brownshade2012":
			mapId = "STD";
			break;

		case "WINTER":
			mapId = "STD";
			break;

		case "BLANK":
		case "blank":
			// 白地図
			mapId = "Blank";
			break;

		case "JAISE":
		case "english":
			// 英語
			mapId = "english";
			break;

		case "RELIEF":
			// 色別標高図
			mapId = "Relief";
			break;

		case "pale":
			// 淡色地図
			mapId = "pale";
			break;

		default:
			mapId = "STD";
			break;
	}

	return mapId;
}

function changeMap(mapid){

	if (!mapid) {
		return;
	}

	var tmpDataSet = dataSetObj.dataSet_Default;
	var overLayerZindex = 110;

	if(overLayer){
		map.removeLayer(overLayer);
		overLayer = null;
	}

	var overlayDataSet = null;
	var overlayName;

	switch (mapid){
		// 新版
		case 'STD':		tmpDataSet = dataSetObj.dataSet_Std;		break;
		case 'pale':	tmpDataSet = dataSetObj.dataSet_Pale;		break;
		case 'Blank':	tmpDataSet = dataSetObj.dataSet_Blank;		break;
		case 'english':	tmpDataSet = dataSetObj.dataSet_English;	break;

		// 旧版
		case 'STD2012':	tmpDataSet = dataSetObj.dataSet_Std2012;	break;
		case 'Summer':	tmpDataSet = dataSetObj.dataSet_Greenshade2012; overlayName = "greenshade2012"; overlayDataSet = dataSetObj.dataSetOverlay_Transparent2012; break;
		case 'Autumn':	tmpDataSet = dataSetObj.dataSet_Brownshade2012; overlayName = "brownshade2012"; overlayDataSet = dataSetObj.dataSetOverlay_Transparent2012; break;
		case 'Grey':	tmpDataSet = dataSetObj.dataSet_MonotoneShade2012;   overlayName = "monotoneshade2012";  overlayDataSet = dataSetObj.dataSetOverlay_Monotone2012;  break;

		// 写真
		case 'DJBMO':	tmpDataSet = dataSetObj.dataSet_Y2K7; overlayName = "IndexY2K7"; overlayDataSet = dataSetObj.dataSetOverlay_IndexY2K7; break;

		// 旧マップID対応
		case 'Season':	tmpDataSet = dataSetObj.dataSet_Season;	break;
		case 'Spring':	tmpDataSet = dataSetObj.dataSet_Spring; overlayName = "Color"; overlayDataSet = dataSetObj.dataSetOverlay_Color; break;
		case 'Summer_n':	tmpDataSet = dataSetObj.dataSet_Summer_n; overlayName = "Color"; overlayDataSet = dataSetObj.dataSetOverlay_Summer_n; break;
		case 'Autumn_n':	tmpDataSet = dataSetObj.dataSet_Autumn_n; overlayName = "Color"; overlayDataSet = dataSetObj.dataSetOverlay_Autumn_n; break;
		case 'Winter':	tmpDataSet = dataSetObj.dataSet_Winter; overlayName = "Color"; overlayDataSet = dataSetObj.dataSetOverlay_Color; break;
		case 'Grey_n':	tmpDataSet = dataSetObj.dataSet_Mono_n;   overlayName = "Grey";  overlayDataSet = dataSetObj.dataSetOverlay_Mono_n;  break;

		case 'Relief':	tmpDataSet = dataSetObj.dataSet_Relief;		break;
		case 'Jaise': 	tmpDataSet = dataSetObj.dataSet_English;	break;
		case 'NLII4':	tmpDataSet = dataSetObj.dataSet_YK88;		break;
		case 'NLII3':	tmpDataSet = dataSetObj.dataSet_YK84;		break;
		case 'NLII2':	tmpDataSet = dataSetObj.dataSet_YK79;		break;
		case 'NLII1':	tmpDataSet = dataSetObj.dataSet_YK74;		break;
		case 'DJBMM_n':	tmpDataSet = dataSetObj.dataSet_Std;		break;
		case 'DJBMM':	tmpDataSet = dataSetObj.dataSet_Std2012;	break;
		default:		tmpDataSet = dataSetObj.dataSet_Std;		break;
	}

	var command = "";

	var baseZIndex = 100;
	if (webtisMap) {
		baseZIndex = webtisMap.getZIndex();
		map.removeLayer(webtisMap);
	}

	var options = {
		wrapDateLine: true,
		dataSet: tmpDataSet,
		errorImagePath: webtis.TILE_URL.NODATA
	};
	if (typeof isReceivePrintData != "undefined" && isReceivePrintData == true) {
		options.tileSide = 128;
	}

	webtisMap = new webtis.Layer.BaseMap("Base map", options);

/*
	webtisMap = new webtis.Layer.BaseMap("Base map", {
		wrapDateLine: true,
		dataSet: tmpDataSet,
		errorImagePath: webtis.TILE_URL.NODATA
	});
*/
	map.addLayer(webtisMap);
	webtisMap.setZIndex(baseZIndex);

	setTimeout('webtisMap.redraw(true);', 3000);

	if (overlayDataSet != null) {
		var options = {
			isBaseLayer: false,
			dataSet: overlayDataSet,
			wrapDateLine: true
		};

		if (typeof isReceivePrintData != "undefined" && isReceivePrintData == true) {
			options.tileSide = 128;
		}
		overLayer = new webtis.Layer.BaseMap(overlayName, options);
/*
		overLayer = new webtis.Layer.BaseMap(overlayName, {
			isBaseLayer: false,
			dataSet: overlayDataSet,
			wrapDateLine: true,
		});
*/
		map.addLayer(overLayer);
		overLayer.setZIndex(overLayerZindex);

		setTimeout('overLayer.redraw(true);', 3000);
	}
}

/* 地図切り替え時のデータセットを定義 */
// 段彩陰影パターン春
dataSetObj.dataSet_Spring = {
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
dataSetObj.dataSet_Summer = {
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

// 段彩陰影パターン夏（新彩色地図用）
dataSetObj.dataSet_Summer_n = {
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
	12: { "dataId" : "D200KGRN" },
	13: { "dataId" : "D200KGRN" },
	14: { "dataId" : "D200KGRN" },

//	15: { "dataId" : "D25K2" },
//	16: { "dataId" : "D25K2" },
//	17: { "dataId" : "D25K2" },

//	18: { "dataId" : "D2500" }

	15: { "dataId" : "D25K2GRN" },
	16: { "dataId" : "D25K2" },
	17: { "dataId" : "D25K2" },

	18: { "dataId" : "D2500" }
};

// 段彩陰影パターン秋
dataSetObj.dataSet_Autumn = {
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
dataSetObj.dataSet_Winter = {
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

// 段彩陰影パターン秋（新彩色地図用）
dataSetObj.dataSet_Autumn_n = {
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
	12: { "dataId" : "D200KBRWN" },
	13: { "dataId" : "D200KBRWN" },
	14: { "dataId" : "D200KBRWN" },

//	15: { "dataId" : "D25K2" },
//	16: { "dataId" : "D25K2" },
//	17: { "dataId" : "D25K2" },

//	18: { "dataId" : "D2500" }
	15: { "dataId" : "D25K2BRWN" },
	16: { "dataId" : "D25K2" },
	17: { "dataId" : "D25K2" },

	18: { "dataId" : "D2500" }
};

// 段彩陰影パターン特殊
dataSetObj.dataSet_Season = {
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
dataSetObj.dataSet_Mono = {
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

// モノトーン地図(シンプルスキーム)
dataSetObj.dataSet_MonotoneShade2012 = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "monotone2012" },
	6: { "dataId" : "monotone2012" },
	7: { "dataId" : "monotone2012" },
	8: { "dataId" : "monotone2012" },

	9: { "dataId" : "monotoneshade2012" },
	10: { "dataId" : "monotoneshade2012" },
	11: { "dataId" : "monotoneshade2012" },

	12: { "dataId" : "monotoneshade2012" },
	13: { "dataId" : "monotoneshade2012" },
	14: { "dataId" : "monotoneshade2012" },

	15: { "dataId" : "std2012" },
	16: { "dataId" : "std2012" },
	17: { "dataId" : "std2012" },

	18: { "dataId" : "std2012" }
};

// 新モノトーン地図
dataSetObj.dataSet_Mono_n = {
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
	12: { "dataId" : "D200KG" },
	13: { "dataId" : "D200KG" },
	14: { "dataId" : "D200KG" },

//	15: { "dataId" : "D25KG" },
//	16: { "dataId" : "D25KG" },
//	17: { "dataId" : "D25KG" },

//	18: { "dataId" : "D2500G" }

	15: { "dataId" : "D25KG" },
	16: { "dataId" : "D25KG" },
	17: { "dataId" : "D25KG" },

	18: { "dataId" : "D2500G" }
};

// 白地図
dataSetObj.dataSet_Blank = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "blank" },
	6: { "dataId" : "blank" },
	7: { "dataId" : "blank" },
	8: { "dataId" : "blank" },
	9: { "dataId" : "blank" },
	10: { "dataId" : "blank" },
	11: { "dataId" : "blank" },

	12: { "dataId" : "blank" },
	13: { "dataId" : "blank" },
	14: { "dataId" : "blank" },

	15: { "dataId" : "blank" },
	16: { "dataId" : "blank" },
	17: { "dataId" : "blank" },

	18: { "dataId" : "blank" }
};

// 標準地図
dataSetObj.dataSet_Default = {
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

// 標準地図(新版)
dataSetObj.dataSet_Default_n = {
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

	12: { "dataId" : "D200K" },
	13: { "dataId" : "D200K" },
	14: { "dataId" : "D200K" },

	15: { "dataId" : "D25K2BRWN" },
	16: { "dataId" : "D25K2" },
	17: { "dataId" : "D25K2" },

	18: { "dataId" : "D2500" }
};

// 標準地図（旧：シンプルスキーム版）
dataSetObj.dataSet_Std2012 = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "std" },
	6: { "dataId" : "std" },
	7: { "dataId" : "std" },
	8: { "dataId" : "std" },

	9: { "dataId" : "std" },
	10: { "dataId" : "std" },
	11: { "dataId" : "std" },

	12: { "dataId" : "std2012" },
	13: { "dataId" : "std2012" },
	14: { "dataId" : "std2012" },

	15: { "dataId" : "std2012" },
	16: { "dataId" : "std2012" },
	17: { "dataId" : "std2012" },

	18: { "dataId" : "std2012" }
};

// 標準地図（ハイブリッド版）
dataSetObj.dataSet_Std = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },
	5: { "dataId" : "std" },
	6: { "dataId" : "std" },
	7: { "dataId" : "std" },
	8: { "dataId" : "std" },
	9: { "dataId" : "std" },
	10: { "dataId" : "std" },
	11: { "dataId" : "std" },
	12: { "dataId" : "std" },
	13: { "dataId" : "std" },
	14: { "dataId" : "std" },
	15: { "dataId" : "std" },
	16: { "dataId" : "std" },
	17: { "dataId" : "std" },
	18: { "dataId" : "std" }
};

// 淡色地図
dataSetObj.dataSet_Pale = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "std" },
	6: { "dataId" : "std" },
	7: { "dataId" : "std" },
	8: { "dataId" : "std" },

	9: { "dataId" : "std" },
	10: { "dataId" : "std" },
	11: { "dataId" : "std" },

	12: { "dataId" : "pale" },
	13: { "dataId" : "pale" },
	14: { "dataId" : "pale" },
	15: { "dataId" : "pale" },
	16: { "dataId" : "pale" },
	17: { "dataId" : "pale" },

	18: { "dataId" : "pale" }
};

dataSetObj.dataSet_Brownshade2012 = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },
	5: { "dataId" : "std" },
	6: { "dataId" : "std" },
	7: { "dataId" : "std" },
	8: { "dataId" : "std" },

	9: { "dataId" : "brownshade2012" },
	10: { "dataId" : "brownshade2012" },
	11: { "dataId" : "brownshade2012" },
	12: { "dataId" : "brownshade2012" },
	13: { "dataId" : "brownshade2012" },
	14: { "dataId" : "brownshade2012" },

	15: { "dataId" : "std2012" },
	16: { "dataId" : "std2012" },
	17: { "dataId" : "std2012" },
	18: { "dataId" : "std2012" }
};

dataSetObj.dataSet_Greenshade2012 = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },
	5: { "dataId" : "std" },
	6: { "dataId" : "std" },
	7: { "dataId" : "std" },
	8: { "dataId" : "std" },

	9: { "dataId" : "greenshade2012" },
	10: { "dataId" : "greenshade2012" },
	11: { "dataId" : "greenshade2012" },
	12: { "dataId" : "greenshade2012" },
	13: { "dataId" : "greenshade2012" },
	14: { "dataId" : "greenshade2012" },

	15: { "dataId" : "std2012" },
	16: { "dataId" : "std2012" },
	17: { "dataId" : "std2012" },
	18: { "dataId" : "std2012" }
};

// 色別標高図
dataSetObj.dataSet_Relief = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "relief" },
	6: { "dataId" : "relief" },
	7: { "dataId" : "relief" },
	8: { "dataId" : "relief" },
	9: { "dataId" : "relief" },
	10: { "dataId" : "relief" },
	11: { "dataId" : "relief" },
	12: { "dataId" : "relief" },
	13: { "dataId" : "relief" },
	14: { "dataId" : "relief" },
	15: { "dataId" : "relief" },
	13: { "dataId" : "relief" },
	14: { "dataId" : "relief" },
	15: { "dataId" : "relief" },
	16: { "dataId" : "relief" },
	17: { "dataId" : "relief" },
	18: { "dataId" : "relief" }
};

// 英語
dataSetObj.dataSet_Jaise = {
	0: { "dataId" : "GLMD" },
	1: { "dataId" : "GLMD" },
	2: { "dataId" : "GLMD" },
	3: { "dataId" : "GLMD" },
	4: { "dataId" : "GLMD" },

	5: { "dataId" : "JAISE" },
	6: { "dataId" : "JAISE" },
	7: { "dataId" : "JAISE" },
	8: { "dataId" : "JAISE" },

	9: { "dataId" : "JAISE1000K" },
	10: { "dataId" : "JAISE1000K" },
	11: { "dataId" : "JAISE1000K" },

	12: { "dataId" : "BAFD200K" },
	13: { "dataId" : "BAFD200K" },
	14: { "dataId" : "BAFD200K" },

	15: { "dataId" : "DJBMM" },
	16: { "dataId" : "DJBMM" },
	17: { "dataId" : "DJBMM" },

	18: { "dataId" : "FGD" }
};

// 英語（シンプルスキーム）
dataSetObj.dataSet_English = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "english" },
	6: { "dataId" : "english" },
	7: { "dataId" : "english" },
	8: { "dataId" : "english" },

	9: { "dataId" : "english" },
	10: { "dataId" : "english" },
	11: { "dataId" : "english" },

	12: { "dataId" : "std" },
	13: { "dataId" : "std" },
	14: { "dataId" : "std" },

	15: { "dataId" : "std" },
	16: { "dataId" : "std" },
	17: { "dataId" : "std" },

	18: { "dataId" : "std" }
};

// 2007-
dataSetObj.dataSet_Y2K7 = {
	0: { "dataId" : "std" },
	1: { "dataId" : "std" },
	2: { "dataId" : "std" },
	3: { "dataId" : "std" },
	4: { "dataId" : "std" },

	5: { "dataId" : "std" },
	6: { "dataId" : "std" },
	7: { "dataId" : "std" },
	8: { "dataId" : "std" },

	9: { "dataId" : "std" },
	10: { "dataId" : "std" },
	11: { "dataId" : "std" },

	12: { "dataId" : "std" },
	13: { "dataId" : "std" },
	14: { "dataId" : "std" },

	15: { "dataId" : "ort" },
	16: { "dataId" : "ort" },
	17: { "dataId" : "ort" },

	18: { "dataId" : "ort" }
};
/*
dataSetObj.dataSet_Y2K7 = {
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
*/

// 1988-90
dataSetObj.dataSet_YK88 = {
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
dataSetObj.dataSet_YK84 = {
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
dataSetObj.dataSet_YK79 = {
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
dataSetObj.dataSet_YK74 = {
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
dataSetObj.dataSetOverlay_Color = {
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

// 彩色地図用レイヤー(シンプルスキーム)
dataSetObj.dataSetOverlay_Transparent2012 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },

	9: { "dataId" : "transparent2012" },
	10: { "dataId" : "transparent2012" },
	11: { "dataId" : "transparent2012" },

	12: { "dataId" : "transparent2012" },
	13: { "dataId" : "transparent2012" },
	14: { "dataId" : "transparent2012" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// モノトーン用レイヤー（シンプルスキーム）
dataSetObj.dataSetOverlay_Monotone2012 = {
	0: { "dataId" : "transparent" },
	1: { "dataId" : "transparent" },
	2: { "dataId" : "transparent" },
	3: { "dataId" : "transparent" },
	4: { "dataId" : "transparent" },
	5: { "dataId" : "transparent" },
	6: { "dataId" : "transparent" },
	7: { "dataId" : "transparent" },
	8: { "dataId" : "transparent" },

	9: { "dataId" : "monotone2012" },
	10: { "dataId" : "monotone2012" },
	11: { "dataId" : "monotone2012" },
	12: { "dataId" : "monotone2012" },
	13: { "dataId" : "monotone2012" },
	14: { "dataId" : "monotone2012" },

	15: { "dataId" : "transparent" },
	16: { "dataId" : "transparent" },
	17: { "dataId" : "transparent" },
	18: { "dataId" : "transparent" }
};

// 新彩色地図（緑）用レイヤー
dataSetObj.dataSetOverlay_Summer_n = {
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

	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// 新彩色地図（茶）用レイヤー
dataSetObj.dataSetOverlay_Autumn_n = {
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

	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// モノトーン地図用レイヤー
dataSetObj.dataSetOverlay_Mono = {
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

// モノトーン地図用レイヤー(シンプルスキーム)
dataSetObj.dataSetOverlay_Monotone2012 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },
	5: { "dataId" : "TRANSPARENT" },
	6: { "dataId" : "TRANSPARENT" },
	7: { "dataId" : "TRANSPARENT" },
	8: { "dataId" : "TRANSPARENT" },

	9: { "dataId" : "monotone2012" },
	10: { "dataId" : "monotone2012" },
	11: { "dataId" : "monotone2012" },

	12: { "dataId" : "monotone2012" },
	13: { "dataId" : "monotone2012" },
	14: { "dataId" : "monotone2012" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

// モノトーン地図用レイヤー
dataSetObj.dataSetOverlay_Mono_n = {
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

	12: { "dataId" : "TRANSPARENT" },
	13: { "dataId" : "TRANSPARENT" },
	14: { "dataId" : "TRANSPARENT" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

dataSetObj.dataSetOverlay_IndexY2K7 = {
	0: { "dataId" : "TRANSPARENT" },
	1: { "dataId" : "TRANSPARENT" },
	2: { "dataId" : "TRANSPARENT" },
	3: { "dataId" : "TRANSPARENT" },
	4: { "dataId" : "TRANSPARENT" },

	5: { "dataId" : "photoarea" },
	6: { "dataId" : "photoarea" },
	7: { "dataId" : "photoarea" },
	8: { "dataId" : "photoarea" },
	9: { "dataId" : "photoarea" },
	10: { "dataId" : "photoarea" },
	11: { "dataId" : "photoarea" },
	12: { "dataId" : "photoarea" },
	13: { "dataId" : "photoarea" },
	14: { "dataId" : "photoarea" },

	15: { "dataId" : "TRANSPARENT" },
	16: { "dataId" : "TRANSPARENT" },
	17: { "dataId" : "TRANSPARENT" },
	18: { "dataId" : "TRANSPARENT" }
};

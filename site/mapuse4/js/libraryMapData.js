var libraryMapData =
[
	{
		"title": "写真", "isFolder": true, "key": "photo", "hideCheckbox": true, "expand": true, "legendFunc": "getLibraryLegend_photo",
		"children": [
			{ "title": "最新（2007年～）", "type": "map", "key": "y2k7", "icon": "photo.png", "dataset": "dataSetOverlay_Y2K7", "zindex": 250 },
			{ "title": "1988年～1990年", "type": "map", "key": "yk88", "icon": "photo.png", "dataset": "dataSetOverlay_YK88", "zindex": 255 },
			{ "title": "1984年～1987年", "type": "map", "key": "yk84", "icon": "photo.png", "dataset": "dataSetOverlay_YK84", "zindex": 260 },
			{ "title": "1979年～1983年", "type": "map", "key": "yk79", "icon": "photo.png", "dataset": "dataSetOverlay_YK79", "zindex": 265 },
			{ "title": "1974年～1978年", "type": "map", "key": "yk74", "icon": "photo.png", "dataset": "dataSetOverlay_YK74", "zindex": 270 }
		]
	},
	{ "title": "簡易空中写真（2004年～）", "type": "map", "key": "airphoto", "icon": "photo.png", "dataset": "dataSetOverlay_Y2K4air", "legendFunc": "getLibraryLegend_Y2K4air" },
	{
		"title": "単写真", "isFolder": true, "key": "photopoint", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_photoPoint",
		"children": [
			{ "title": "2011年～", "type": "kmlurl", "key": "photopoint_2011_", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "2001年～2010年", "type": "kmlurl", "key": "photopoint_2001_2010", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1991年～2000年", "type": "kmlurl", "key": "photopoint_1991_2000", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1981年～1990年", "type": "kmlurl", "key": "photopoint_1981_1990", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1971年～1980年", "type": "kmlurl", "key": "photopoint_1971_1980", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1961年～1970年", "type": "kmlurl", "key": "photopoint_1961_1970", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1951年～1960年", "type": "kmlurl", "key": "photopoint_1951_1960", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1941年～1950年", "type": "kmlurl", "key": "photopoint_1941_1950", "icon": "photo.png", "getURL": "getURL_photoPoint" },
			{ "title": "1931年～1940年", "type": "kmlurl", "key": "photopoint_1931_1940", "icon": "photo.png", "getURL": "getURL_photoPoint" },
		]
	},
	{
		"title": "東日本大震災後オルソ画像", "isFolder": true, "key": "toho", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_toho",
		"children": [
			{ "title": "2012年10月～2013年5月", "type": "map", "key": "toho3", "icon": "photo.png", "dataset": "dataSetOverlay_toho3", "zindex": 475 },
			{ "title": "2011年5月～2012年4月", "type": "map", "key": "toho2", "icon": "photo.png", "dataset": "dataSetOverlay_toho2", "zindex": 476 },
			{ "title": "2011年3月～2011年4月", "type": "map", "key": "toho1", "icon": "photo.png", "dataset": "dataSetOverlay_toho1", "zindex": 477 }
		]
	},
	{ "title": "災害復興計画基図", "type": "map", "key": "fukkokizu", "icon": false, "dataset": "dataSetOverlay_fukkokizu", "zindex": 216, "legendFunc": "getLibraryLegend_fukkokizu" },
	{ "title": "色別標高図", "type": "map", "key": "relief", "icon": false, "dataset": "dataSet_Relief", "zindex": 215, "legendFunc": "getLibraryLegend_relief" },

	{ "title": "都市圏活断層図", "type": "map", "key": "fm", "icon": false, "dataset": "dataSetOverlay_AFM", "zindex": 345, "legendFunc": "getLibraryLegend_FM" },


//	{ "title": "明治前期の低湿地", "type": "map", "key": "meijiswale", "icon": false, "dataset": "dataSetOverlay_MeijiSwale", "zindex": 279, "legendFunc": "getLibraryLegend_meijiswale" },

	//	20140818
	{ "title": "明治前期の低湿地", "type": "map", "key": "meijiswale", "icon": false, "dataset": "dataSetOverlay_MeijiSwale_NewXYZ", "zindex": 278, "legendFunc": "getLibraryLegend_meijiswale" },
	//	20140818


	{
		"title": "土地条件図", "isFolder": true, "key": "LCM", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_lcm25k",
		"children": [
			{ "title": "数値地図25000(土地条件)", "type": "map", "key": "lcm25k_2012", "icon": false, "dataset": "dataSetOverlay_LCM25K_2012", "zindex": 276 },
			{ "title": "初期整備版", "type": "map", "key": "lcm25k", "icon": false, "dataset": "dataSetOverlay_LCM25K", "zindex": 275 }
		]
	},
	{
		"title": "沿岸海域土地条件図", "isFolder": true, "key": "CCM", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_CCM",
		"children": [
			{ "title": "平成元年以降", "type": "map", "key": "ccm2", "icon": false, "dataset": "dataSetOverlay_CCM2", "zindex": 201 },
			{ "title": "昭和63年以前", "type": "map", "key": "ccm1", "icon": false, "dataset": "dataSetOverlay_CCM1", "zindex": 277 }
		]
	},
	/////////////////////////////////////////////////////////////////////////////////////////////
	{
		"title": "治水地形分類図", "isFolder": true, "key": "LCMF", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_LCMFC",
		"children": [
			{ "title": "初版(1976～1978年)"			, "type": "map", "key": "LCMFC01"		, "icon": false, "dataset": "dataSetOverlay_LCMFC01", "legendFunc": "getLibraryLegend_LCMFC", "zindex": 258		 },		//	, "legendFunc": "getLibraryLegend_LCMFC"
			{ "title": "更新版(2007～2012年)"		, "type": "map", "key": "LCMFC02"		, "icon": false, "dataset": "dataSetOverlay_LCMFC02", "legendFunc": "getLibraryLegend_LCMFC2", "zindex": 259	 },
//ORG         	{ "title": "治水地形分類図（初版）"	, "type": "map", "key": "lcmfc", "icon": false, "dataset": "dataSetOverlay_LCMFC01", "zindex": 274, "legendFunc": "getLibraryLegend_LCMFC" },
//			{ "title": "平成元年以降", 				"type": "map", "key": "ccm2", "icon": false, "dataset": "dataSetOverlay_CCM2", "zindex": 278 },
//			{ "title": "昭和63年以前", "type": "map", "key": "ccm1", "icon": false, "dataset": "dataSetOverlay_CCM1", "zindex": 277 }
		]
	},
	/////////////////////////////////////////////////////////////////////////////////////////////


//	{ "title": "治水地形分類図（初版）", "type": "map", "key": "lcmfc", "icon": false, "dataset": "dataSetOverlay_LCMFC", "zindex": 274, "legendFunc": "getLibraryLegend_LCMFC" },



	{
		"title": "火山土地条件図", "isFolder": true, "key": "lcmv", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_volcano",
		"children": [
			{ "title": "雌阿寒岳・雄阿寒岳", "type": "map", "key": "akandake", "icon": false, "dataset": "dataSetOverlay_akandake", "zindex": 350 },
			{ "title": "十勝岳", "type": "map", "key": "tokachidake", "icon": false, "dataset": "dataSetOverlay_tokachidake", "zindex": 351 },
			{ "title": "樽前山", "type": "map", "key": "tarumaesan", "icon": false, "dataset": "dataSetOverlay_tarumaesan", "zindex": 352 },
			{ "title": "有珠山", "type": "map", "key": "usuzan", "icon": false, "dataset": "dataSetOverlay_usuzan", "zindex": 353 },
			{ "title": "北海道駒ヶ岳", "type": "map", "key": "komagatake", "icon": false, "dataset": "dataSetOverlay_komagatake", "zindex": 354 },
			{ "title": "岩手山", "type": "map", "key": "iwatesan", "icon": false, "dataset": "dataSetOverlay_iwatesan", "zindex": 369 },
			{ "title": "栗駒山", "type": "map", "key": "kurikomayama", "icon": false, "dataset": "dataSetOverlay_kurikomayama", "zindex": 355 },
			{ "title": "安達太良山", "type": "map", "key": "adatarayama", "icon": false, "dataset": "dataSetOverlay_adatarayama", "zindex": 356 },
			{ "title": "磐梯山", "type": "map", "key": "bandaisan", "icon": false, "dataset": "dataSetOverlay_bandaisan", "zindex": 357 },
			{ "title": "草津白根山", "type": "map", "key": "kusatsushiranesan", "icon": false, "dataset": "dataSetOverlay_kusatsushiranesan", "zindex": 360 },
			{ "title": "新潟焼山", "type": "map", "key": "yakiyama", "icon": false, "dataset": "dataSetOverlay_yakiyama", "zindex": 499 },
			{ "title": "御嶽山", "type": "map", "key": "ontakesan", "icon": false, "dataset": "dataSetOverlay_ontakesan", "zindex": 362 },
			{ "title": "富士山", "type": "map", "key": "fujisan", "icon": false, "dataset": "dataSetOverlay_fujisan", "zindex": 361 },
			{ "title": "伊豆大島", "type": "map", "key": "izuoshima", "icon": false, "dataset": "dataSetOverlay_izuoshima", "zindex": 358 },
			{ "title": "三宅島", "type": "map", "key": "miyakezima", "icon": false, "dataset": "dataSetOverlay_miyakezima", "zindex": 359 },
			{ "title": "くじゅう連山", "type": "map", "key": "kujirenzan", "icon": false, "dataset": "dataSetOverlay_kujirenzan", "zindex": 363 },
			{ "title": "阿蘇山", "type": "map", "key": "asosan", "icon": false, "dataset": "dataSetOverlay_asosan", "zindex": 364 },
			{ "title": "雲仙岳", "type": "map", "key": "unzendake", "icon": false, "dataset": "dataSetOverlay_unzendake", "zindex": 365 },
			{ "title": "霧島山", "type": "map", "key": "kirishimayama", "icon": false, "dataset": "dataSetOverlay_kirishimayama", "zindex": 366 },
			{ "title": "桜島", "type": "map", "key": "sakurazima", "icon": false, "dataset": "dataSetOverlay_sakurazima", "zindex": 367 },
			{ "title": "薩摩硫黄島", "type": "map", "key": "satsumaiojima", "icon": false, "dataset": "dataSetOverlay_satsumaiojima", "zindex": 368 }
		]
	},
	{
		"title": "火山基本図", "isFolder": true, "key": "vbm", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_vbmc",
		"children": [
			{ "title": "雌阿寒岳", "type": "map", "key": "vbm01meakan", "icon": false, "dataset": "dataSetOverlay_vbm01meakan", "zindex": 280 },
			{ "title": "十勝岳", "type": "map", "key": "vbm02tokachi", "icon": false, "dataset": "dataSetOverlay_vbm02tokachi", "zindex": 281 },
			{ "title": "樽前山", "type": "map", "key": "vbm03tarumae", "icon": false, "dataset": "dataSetOverlay_vbm03tarumae", "zindex": 282 },
			{ "title": "有珠山", "type": "map", "key": "vbm04usu", "icon": false, "dataset": "dataSetOverlay_vbm04usu", "zindex": 283 },
			{ "title": "北海道駒ヶ岳", "type": "map", "key": "vbm05hokkaidokoma", "icon": false, "dataset": "dataSetOverlay_vbm05hokkaidokoma", "zindex": 284 },
			{ "title": "恵山", "type": "map", "key": "vbm35esan", "icon": false, "dataset": "dataSetOverlay_vbm35esan", "zindex": 299 },
			{ "title": "岩木山", "type": "map", "key": "vbm06iwaki", "icon": false, "dataset": "dataSetOverlay_vbm06iwaki", "zindex": 202 },
			{ "title": "秋田焼山", "type": "map", "key": "vbm07akitayake", "icon": false, "dataset": "dataSetOverlay_vbm07akitayake", "zindex": 203 },
			{ "title": "岩手山", "type": "map", "key": "vbm08iwate", "icon": false, "dataset": "dataSetOverlay_vbm08iwate", "zindex": 204 },
			{ "title": "栗駒山", "type": "map", "key": "vbm09kurikoma", "icon": false, "dataset": "dataSetOverlay_vbm09kurikoma", "zindex": 285 },
			{ "title": "秋田駒ケ岳", "type": "map", "key": "vbm10akitakoma", "icon": false, "dataset": "dataSetOverlay_vbm10akitakoma", "zindex": 205 },
			{ "title": "鳥海山", "type": "map", "key": "vbm11chokai", "icon": false, "dataset": "dataSetOverlay_vbm11chokai", "zindex": 206 },
			{ "title": "蔵王山", "type": "map", "key": "vbm12zao", "icon": false, "dataset": "dataSetOverlay_vbm12zao", "zindex": 207 },
			{ "title": "吾妻山", "type": "map", "key": "vbm13azuma", "icon": false, "dataset": "dataSetOverlay_vbm13azuma", "zindex": 208 },
			{ "title": "安達太良山", "type": "map", "key": "vbm14adatara", "icon": false, "dataset": "dataSetOverlay_vbm14adatara", "zindex": 286 },
			{ "title": "磐梯山", "type": "map", "key": "vbm15bandai", "icon": false, "dataset": "dataSetOverlay_vbm15bandai", "zindex": 287 },
			{ "title": "那須岳", "type": "map", "key": "vbm16nasu", "icon": false, "dataset": "dataSetOverlay_vbm16nasu", "zindex": 209 },
			{ "title": "草津白根山", "type": "map", "key": "vbm17kusatsushirane", "icon": false, "dataset": "dataSetOverlay_vbm17kusatsushirane", "zindex": 210 },
			{ "title": "浅間山", "type": "map", "key": "vbm18asama", "icon": false, "dataset": "dataSetOverlay_vbm18asama", "zindex": 211 },
			{ "title": "箱根山", "type": "map", "key": "vbm19hakone", "icon": false, "dataset": "dataSetOverlay_vbm19hakone", "zindex": 212 },
			{ "title": "富士山", "type": "map", "key": "vbm20fuji", "icon": false, "dataset": "dataSetOverlay_vbm20fuji", "zindex": 213 },
			{ "title": "東伊豆単成火山群", "type": "map", "key": "vbm21eastizu", "icon": false, "dataset": "dataSetOverlay_vbm21eastizu", "zindex": 214 },
			{ "title": "伊豆大島", "type": "map", "key": "vbm22izuoshima", "icon": false, "dataset": "dataSetOverlay_vbm22izuoshima", "zindex": 288 },
			{ "title": "三宅島", "type": "map", "key": "vbm23miyake", "icon": false, "dataset": "dataSetOverlay_vbm23miyake", "zindex": 289 },
			{ "title": "焼岳", "type": "map", "key": "vbm24yakedake", "icon": false, "dataset": "dataSetOverlay_vbm24yakedake", "zindex": 217 },
			{ "title": "御岳山", "type": "map", "key": "vbm25ontake", "icon": false, "dataset": "dataSetOverlay_vbm25ontake", "zindex": 290 },
			{ "title": "鶴見岳", "type": "map", "key": "vbm26tsurumi", "icon": false, "dataset": "dataSetOverlay_vbm26tsurumi", "zindex": 218 },
			{ "title": "くじゅう連山", "type": "map", "key": "vbm27kujyu", "icon": false, "dataset": "dataSetOverlay_vbm27kujyu", "zindex": 293 },
			{ "title": "阿蘇山", "type": "map", "key": "vbm28aso", "icon": false, "dataset": "dataSetOverlay_vbm28aso", "zindex": 294 },
			{ "title": "雲仙岳", "type": "map", "key": "vbm29unzen", "icon": false, "dataset": "dataSetOverlay_vbm29unzen", "zindex": 295 },
			{ "title": "霧島山", "type": "map", "key": "vbm30kirishima", "icon": false, "dataset": "dataSetOverlay_vbm30kirishima", "zindex": 296 },
			{ "title": "桜島", "type": "map", "key": "vbm31sakurajima", "icon": false, "dataset": "dataSetOverlay_vbm31sakurajima", "zindex": 297 },
			{ "title": "薩摩竹島", "type": "map", "key": "vbm32satsumatakesima", "icon": false, "dataset": "dataSetOverlay_vbm32satsumatakesima", "zindex": 298 },
			{ "title": "薩摩硫黄島", "type": "map", "key": "vbm33satsumaiojima", "icon": false, "dataset": "dataSetOverlay_vbm33satsumaiojima", "zindex": 219 },
			{ "title": "諏訪之瀬島", "type": "map", "key": "vbm34suwanosejima", "icon": false, "dataset": "dataSetOverlay_vbm34suwanosejima", "zindex": 220 }
		]
	},
	{
		"title": "地球地図", "isFolder": true, "key": "globalm", "hideCheckbox": true, "expand": false, "isLazy": true,
		"children": [
			{
				"title": "地球地図全球版", "isFolder": true, "key": "globalm_zen", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "土地被覆(GLCNMO)", "type": "map", "key": "GLCNMO2", "icon": false, "dataset": "dataSetOverlay_GLCNMO2", "zindex": 342, "legendFunc": "getLibraryLegend_GLCNMO2" },
					{ "title": "植生(樹木被覆率)", "type": "map", "key": "PTC2", "icon": false, "dataset": "dataSetOverlay_PTC2", "zindex": 343, "legendFunc": "getLibraryLegend_PTC2" }
				]
			},

//			///////////////////////////////////////////////////////			20140714
//			{
//				"title": "地球地図日本", "isFolder": true, "key": "globalm_japan", "hideCheckbox": true, "expand": false, "isLazy": true,
//				"children": [
//
//						{ "title": "空港", "type": "map", "key": "TikyuTizuNipponairp", "icon": false, "dataset": "DS_TikyuTizuNippon_airp", "zindex": 	801, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "鉄道駅", "type": "map", "key": "TikyuTizuNipponrstatp", "icon": false, "dataset": "DS_TikyuTizuNippon_rstatp", "zindex": 	802, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "鉄道", "type": "map", "key": "TikyuTizuNipponraill", "icon": false, "dataset": "DS_TikyuTizuNippon_raill", "zindex": 	803, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "道路", "type": "map", "key": "TikyuTizuNipponroadl", "icon": false, "dataset": "DS_TikyuTizuNippon_roadl", "zindex": 	804, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "航路", "type": "map", "key": "TikyuTizuNipponferryl", "icon": false, "dataset": "DS_TikyuTizuNippon_ferryl", "zindex": 	805, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "港湾", "type": "map", "key": "TikyuTizuNipponportp", "icon": false, "dataset": "DS_TikyuTizuNippon_portp", "zindex": 	806, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "行政界（線）", "type": "map", "key": "TikyuTizuNipponpolbndl", "icon": false, "dataset": "DS_TikyuTizuNippon_polbndl", "zindex": 	807, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "行政界（名前）", "type": "map", "key": "TikyuTizuNipponpolbnda", "icon": false, "dataset": "DS_TikyuTizuNippon_polbnda", "zindex": 	808, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "海岸線", "type": "map", "key": "TikyuTizuNipponcoastl", "icon": false, "dataset": "DS_TikyuTizuNippon_coastl", "zindex": 	809, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "河川", "type": "map", "key": "TikyuTizuNipponriverl", "icon": false, "dataset": "DS_TikyuTizuNippon_riverl", "zindex": 	810, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "内水域", "type": "map", "key": "TikyuTizuNipponinwatera", "icon": false, "dataset": "DS_TikyuTizuNippon_inwatera", "zindex": 	811, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "市街地", "type": "map", "key": "TikyuTizuNipponbuiltupa", "icon": false, "dataset": "DS_TikyuTizuNippon_builtupa", "zindex": 	812, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 },
//						{ "title": "市街地（名前）", "type": "map", "key": "TikyuTizuNipponbuiltupp", "icon": false, "dataset": "DS_TikyuTizuNippon_builtupp", "zindex": 	813, "legendFunc": "getLibraryLegend_TikyuTizuNippon"	 }
//
//				]
//			}
//			///////////////////////////////////////////////////////			20140714

		]
	},
	{
		"title": "全国植生指標データ（250m）", "isFolder": true, "key": "NDVI250m", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_NDVI250m",
		"children": [
			{
				"title": "2012年", "isFolder": true, "key": "NDVI250m_2012", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2012_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201212", "zindex": 474 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2012_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201211", "zindex": 473 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2012_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201210", "zindex": 472 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2012_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201209", "zindex": 471 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2012_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201208", "zindex": 470 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2012_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201207", "zindex": 469 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2012_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201206", "zindex": 468 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2012_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201205", "zindex": 467 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2012_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201204", "zindex": 466 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2012_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201203", "zindex": 465 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2012_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201202", "zindex": 464 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2012_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201201", "zindex": 463 }
				]
			},
			{
				"title": "2011年", "isFolder": true, "key": "NDVI250m_2011", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2011_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201112", "zindex": 462 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2011_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201111", "zindex": 461 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2011_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201110", "zindex": 460 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2011_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201109", "zindex": 459 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2011_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201108", "zindex": 458 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2011_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201107", "zindex": 457 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2011_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201106", "zindex": 456 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2011_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201105", "zindex": 455 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2011_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201104", "zindex": 454 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2011_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201103", "zindex": 453 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2011_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201102", "zindex": 452 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2011_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201101", "zindex": 451 }
				]
			},
			{
				"title": "2010年", "isFolder": true, "key": "NDVI250m_2010", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2010_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201012", "zindex": 450 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2010_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201011", "zindex": 449 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2010_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201010", "zindex": 448 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2010_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201009", "zindex": 447 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2010_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201008", "zindex": 446 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2010_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201007", "zindex": 445 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2010_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201006", "zindex": 444 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2010_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201005", "zindex": 443 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2010_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201004", "zindex": 442 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2010_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201003", "zindex": 441 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2010_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201002", "zindex": 440 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2010_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_201001", "zindex": 439 }
				]
			},
			{
				"title": "2009年", "isFolder": true, "key": "NDVI250m_2009", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2009_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200912", "zindex": 438 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2009_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200911", "zindex": 437 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2009_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200910", "zindex": 436 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2009_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200909", "zindex": 435 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2009_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200908", "zindex": 434 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2009_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200907", "zindex": 433 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2009_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200906", "zindex": 432 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2009_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200905", "zindex": 431 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2009_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200904", "zindex": 430 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2009_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200903", "zindex": 429 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2009_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200902", "zindex": 428 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2009_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200901", "zindex": 427 }
				]
			},
			{
				"title": "2008年", "isFolder": true, "key": "NDVI250m_2008", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2008_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200812", "zindex": 426 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2008_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200811", "zindex": 425 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2008_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200810", "zindex": 424 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2008_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200809", "zindex": 423 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2008_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200808", "zindex": 422 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2008_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200807", "zindex": 421 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2008_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200806", "zindex": 420 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2008_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200805", "zindex": 419 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2008_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200804", "zindex": 418 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2008_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200803", "zindex": 417 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2008_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200802", "zindex": 416 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2008_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200801", "zindex": 415 }
				]
			},
			{
				"title": "2007年", "isFolder": true, "key": "NDVI250m_2007", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2007_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200712", "zindex": 414 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2007_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200711", "zindex": 413 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2007_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200710", "zindex": 412 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2007_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200709", "zindex": 411 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2007_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200708", "zindex": 410 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2007_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200707", "zindex": 409 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2007_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200706", "zindex": 408 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2007_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200705", "zindex": 407 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2007_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200704", "zindex": 406 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2007_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200703", "zindex": 405 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2007_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200702", "zindex": 404 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2007_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200701", "zindex": 403 }
				]
			},
			{
				"title": "2006年", "isFolder": true, "key": "NDVI250m_2006", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2006_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200612", "zindex": 402 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2006_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200611", "zindex": 401 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2006_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200610", "zindex": 400 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2006_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200609", "zindex": 399 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2006_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200608", "zindex": 398 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2006_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200607", "zindex": 397 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2006_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200606", "zindex": 396 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2006_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200605", "zindex": 395 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2006_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200604", "zindex": 394 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2006_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200603", "zindex": 393 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2006_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200602", "zindex": 392 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2006_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200601", "zindex": 391 }
				]
			},
			{
				"title": "2005年", "isFolder": true, "key": "NDVI250m_2005", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2005_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200512", "zindex": 390 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2005_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200511", "zindex": 389 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2005_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200510", "zindex": 388 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2005_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200509", "zindex": 387 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2005_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200508", "zindex": 386 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2005_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200507", "zindex": 385 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2005_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200506", "zindex": 384 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2005_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200505", "zindex": 383 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2005_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200504", "zindex": 382 },
					{ "title": "3月", "type": "map", "key": "NDVI250m_2005_03", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200503", "zindex": 381 },
					{ "title": "2月", "type": "map", "key": "NDVI250m_2005_02", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200502", "zindex": 380 },
					{ "title": "1月", "type": "map", "key": "NDVI250m_2005_01", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200501", "zindex": 379 }
				]
			},
			{
				"title": "2004年", "isFolder": true, "key": "NDVI250m_2004", "hideCheckbox": true, "expand": false, "isLazy": true,
				"children": [
					{ "title": "12月", "type": "map", "key": "NDVI250m_2004_12", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200412", "zindex": 378 },
					{ "title": "11月", "type": "map", "key": "NDVI250m_2004_11", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200411", "zindex": 377 },
					{ "title": "10月", "type": "map", "key": "NDVI250m_2004_10", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200410", "zindex": 376 },
					{ "title": "9月", "type": "map", "key": "NDVI250m_2004_09", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200409", "zindex": 375 },
					{ "title": "8月", "type": "map", "key": "NDVI250m_2004_08", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200408", "zindex": 374 },
					{ "title": "7月", "type": "map", "key": "NDVI250m_2004_07", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200407", "zindex": 373 },
					{ "title": "6月", "type": "map", "key": "NDVI250m_2004_06", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200406", "zindex": 372 },
					{ "title": "5月", "type": "map", "key": "NDVI250m_2004_05", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200405", "zindex": 371 },
					{ "title": "4月", "type": "map", "key": "NDVI250m_2004_04", "icon": false, "dataset": "dataSetOverlay_NDVI250m_200404", "zindex": 370 },
				]
			}
		]
	},
	{ "title": "20万分１土地利用図（1982～1983年）", "type": "map", "key": "lum200k", "icon": false, "dataset": "dataSetOverlay_LUM200K", "zindex": 274, "legendFunc": "getLibraryLegend_LUM200K" },
	{
		"title": "宅地利用動向調査", "isFolder": true, "key": "takudo", "hideCheckbox": true, "expand": false, "isLazy": true,
		"children": [
			{
				"title": "首都圏", "isFolder": true, "key": "takudo_cap", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_takudo",
				"children": [
					{ "title": "2005年", "type": "map", "key": "capital2005", "icon": false, "dataset": "dataSetOverlay_capital2005", "zindex": 310 },
					{ "title": "2000年", "type": "map", "key": "capital2000", "icon": false, "dataset": "dataSetOverlay_capital2000", "zindex": 311 },
					{ "title": "1994年", "type": "map", "key": "capital1994", "icon": false, "dataset": "dataSetOverlay_capital1994", "zindex": 312 },
					{ "title": "1989年", "type": "map", "key": "capital1989", "icon": false, "dataset": "dataSetOverlay_capital1989", "zindex": 313 },
					{ "title": "1984年", "type": "map", "key": "capital1984", "icon": false, "dataset": "dataSetOverlay_capital1984", "zindex": 314 },
					{ "title": "1979年", "type": "map", "key": "capital1979", "icon": false, "dataset": "dataSetOverlay_capital1979", "zindex": 315 },
					{ "title": "1974年", "type": "map", "key": "capital1974", "icon": false, "dataset": "dataSetOverlay_capital1974", "zindex": 316 }
				]
			},
			{
				"title": "中部圏", "isFolder": true, "key": "takudo_chu", "hideCheckbox": true, "expand": false,  "legendFunc": "getLibraryLegend_takudo",
				"children": [
					{ "title": "2003年", "type": "map", "key": "chubu2003", "icon": false, "dataset": "dataSetOverlay_chubu2003", "zindex": 320 },
					{ "title": "1997年", "type": "map", "key": "chubu1997", "icon": false, "dataset": "dataSetOverlay_chubu1997", "zindex": 321 },
					{ "title": "1991年", "type": "map", "key": "chubu1991", "icon": false, "dataset": "dataSetOverlay_chubu1991", "zindex": 322 },
					{ "title": "1987年", "type": "map", "key": "chubu1987", "icon": false, "dataset": "dataSetOverlay_chubu1987", "zindex": 323 },
					{ "title": "1982年", "type": "map", "key": "chubu1982", "icon": false, "dataset": "dataSetOverlay_chubu1982", "zindex": 324 },
					{ "title": "1977年", "type": "map", "key": "chubu1977", "icon": false, "dataset": "dataSetOverlay_chubu1977", "zindex": 325 }
				]
			},
			{
				"title": "近畿圏", "isFolder": true, "key": "takudo_kin", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_takudo",
				"children": [
					{ "title": "2008年", "type": "map", "key": "kinki2008", "icon": false, "dataset": "dataSetOverlay_kinki2008", "zindex": 330 },
					{ "title": "2001年", "type": "map", "key": "kinki2001", "icon": false, "dataset": "dataSetOverlay_kinki2001", "zindex": 331 },
					{ "title": "1996年", "type": "map", "key": "kinki1996", "icon": false, "dataset": "dataSetOverlay_kinki1996", "zindex": 332 },
					{ "title": "1991年", "type": "map", "key": "kinki1991", "icon": false, "dataset": "dataSetOverlay_kinki1991", "zindex": 333 },
					{ "title": "1985年", "type": "map", "key": "kinki1985", "icon": false, "dataset": "dataSetOverlay_kinki1985", "zindex": 334 },
					{ "title": "1979年", "type": "map", "key": "kinki1979", "icon": false, "dataset": "dataSetOverlay_kinki1979", "zindex": 335 },
					{ "title": "1974年", "type": "map", "key": "kinki1974", "icon": false, "dataset": "dataSetOverlay_kinki1974", "zindex": 336 }
				]
			}
		]
	},
	{
		"title": "湖沼図", "isFolder": true, "key": "lake", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_LAKE",
		"children": [
			{ "title": "平成3年以降", "type": "map", "key": "lake2", "icon": false, "dataset": "dataSetOverlay_LAKE2", "zindex": 341 },
			{ "title": "平成2年以前", "type": "map", "key": "lake1", "icon": false, "dataset": "dataSetOverlay_LAKE1", "zindex": 340 }
		]
	},
//	{ "title": "基盤地図情報(縮尺レベル2500)", "type": "map", "key": "fgd", "icon": false, "dataset": "dataSetOverlay_kiban", "zindex": 217, "legendFunc": "getLibraryLegend_kiban" },
	{
		"title": "基盤地図情報", "isFolder": true, "key": "teikyo_root", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_fgd",
		"children":
		[
			{
				"title": "基盤地図情報の提供地域", "isFolder": true, "key": "teikyo", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_fgd",
				"children":
				[

					{ "title": "縮尺2500分1相当以上の概ねの範囲", "type": "map", "key": "fgd1_2", "icon": false, "dataset": "DS_KIBANCHIZU", "zindex": 244 },
					{ "title": "5mメッシュDEM（航空レーザー測量）", "type": "tms", "key": "fgd2", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/xyz/KIBANCHIZU/5m_laser/", "getURL": "overlay_getTileURL_KIBAN", "zindex": 246},
					{ "title": "5mメッシュDEM（写真測量）", "type": "tms", "key": "fgd3", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/xyz/KIBANCHIZU/5m_syashin/", "getURL": "overlay_getTileURL_KIBAN", "zindex": 245},
					{ "title": "10mメッシュDEM（火山基本図）", "type": "tms", "key": "fgd5", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/xyz/KIBANCHIZU/10m_kazan/", "getURL": "overlay_getTileURL_KIBAN", "zindex": 247}
				],
			},
			{
				"title": "基盤地図情報更新情報", "isFolder": true, "key": "kiban_koushin", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_fgd",
				"children":
				{

					"title": "2014年更新情報", "isFolder": true, "key": "kiban_koushin2014", "hideCheckbox": true, "expand": false, "isLazy": true, "legendFunc": "getLibraryLegend_fgd",
					"children":
					[
//						{ "title": "10月更新", "type": 	"map", "key": 	"kiban_koushin2014_10", "icon": false, "dataset": 	"dataSetOverlay_kiban_koushin2014_10", 	"zindex": 478 },
						{ title:	"10月更新",type:	"map",	key:	"kiban_koushin2014_10",	icon:	false,"dataset":	"dataSetOverlay_KTZ_KOUSIN_2014_10",	"zindex":478	},
					]
				}
			}
		]
	},



//	//////////////////////////////////
//	{
//		"title": "南極の地理空間情報", "isFolder": true, "key": "antarctic", "hideCheckbox": true, "expand": false, "isLazy": true,
//		"children": [
//			{ "title": "南極の地理空間情報データ"	, "type": "kml"		, "key": "antarctic_0"			, "icon": false		, "path": "http://localhost/site/data/point/antarctic.kml" },
//			{ "title": "1: 2,500　南極地形図XXX"		, "type": "kml"		, "key": "antarctic_2500"		, "icon": false		, "path": "http://localhost/site/data/polygon/antarctic2500.kml" },
////			{ "title": "1: 2,500　南極地形図"		, "type": "kml"		, "key": "antarctic_2500"		, "icon": false		, "path": "http://cyberjapandata.gsi.go.jp/overlay/antarctic2500.kml" },
//			{ "title": "1:25,000　南極地形図CCC"		, "type": "kml"		, "key": "antarctic_25000"		, "icon": false		, "path": "http://localhost/site/data/polygon/antarctic25000.kml" },
//			{ "title": "1:50,000　南極地形図"		, "type": "kml"		, "key": "antarctic_50000"		, "icon": false		, "path": "http://cyberjapandata.gsi.go.jp/overlay/antarctic50000.kml" },
//		]
//	},
//	//////////////////////////////////

	//////////////////////////////////
	{
		"title": "南極の地理空間情報", "isFolder": true, "key": "antarctic", "hideCheckbox": true, "expand": false, "isLazy": true,
		"children": [
			{ "title": "南極の地理空間情報データ"	, "type": "kml"		, "key": "antarctic_0"			, "icon": false		, "path": "http://cyberjapandata.gsi.go.jp/overlay/antarctic.kml" },
			{ "title": "1: 2,500　南極地形図"		, "type": "kml"		, "key": "antarctic_2500"		, "icon": false		, "path": "http://cyberjapandata.gsi.go.jp/overlay/antarctic2500.kml" },
			{ "title": "1:25,000　南極地形図"		, "type": "kml"		, "key": "antarctic_25000"		, "icon": false		, "path": "http://cyberjapandata.gsi.go.jp/overlay/antarctic25000.kml" },
			{ "title": "1:50,000　南極地形図"		, "type": "kml"		, "key": "antarctic_50000"		, "icon": false		, "path": "http://cyberjapandata.gsi.go.jp/overlay/antarctic50000.kml" },
		]
	},
	//////////////////////////////////

	]

;


///////////////////////////////////////////////////////////////////		一時的なタイルURL生成関数
function getTileURL_for_Katudansou( bounds )
{
	var res = this.map.getResolution();

	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();

	return this.url + z + "/" + x + "/" + y + "." + this.type;
}



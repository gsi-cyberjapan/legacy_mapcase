var librarySaigaiData =
[
	{
		"title": "長野県北部地震", "isFolder": true, "key": "1411nagano", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{	"title": "震央", "type": "kml", "key": "sinou1411nagano", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1411nagano/sinou1411nagano.kml"  },
			{	"title": "斜め写真(11/24)", "type": "kml", "key": "naname1411nagano", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1411nagano/naname1411nagano.kml"  },
			{	"title": "電子基準点(点名:白馬)", "type": "kml", "key": "denshi1411nagano", "icon": "obj_denshi.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1411nagano/denshi1411nagano.kml", "legendFunc": "getLibraryLegend_1411nagano"  },
			{	"title": "都市圏活断層図", "type": "map", "key": "fm1411nagano", "icon": false, "dataset": "dataSetOverlay_AFM", "zindex": 338, "legendFunc": "getLibraryLegend_FM" },
			{	"title": "過去の空中写真（2004年～）", "type": "map", "key": "airphoto1411nagano", "icon": "photo.png", "dataset": "dataSetOverlay_Y2K4air", "zindex": 339, "legendFunc": "getLibraryLegend_Y2K4air" },
			{	"title": "基準点成果公表停止範囲(12/1)", "type": "kml", "key": "seikaTeishi1411nagano", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1411nagano/seikaTeishi1411nagano.kml"  },
			{
				"title": "干渉SAR", "isFolder": true, "key": "NGN_SAR", "hideCheckbox": true, "expand": false,
				"children":
					[
						{	"title":"干渉SAR(9/29-11/24)",	type:"map",	key:"BUILD_NGN__http2014.09.29-2014.11.24",	icon:false,	"dataset":"dataSetOverlay_NGN_20140929_1124",	"zindex":495,	 legendFunc:"getLibraryLegend_SAR_NorthNaganoEQ"},
						{	"title":"干渉SAR(9/30-11/25)",	type:"map",	key:"BUILD_NGN__http2014.09.30-2014.11.25",	icon:false,	"dataset":"dataSetOverlay_NGN_20140930_1125",	"zindex":496,	 legendFunc:"getLibraryLegend_SAR_NorthNaganoEQ"},
						{	"title":"干渉SAR(10/14-11/25)",	type:"map",	key:"BUILD_NGN__http2014.10.14-2014.11.25",	icon:false,	"dataset":"dataSetOverlay_NGN_20141014_1125",	"zindex":497,	 legendFunc:"getLibraryLegend_SAR_NorthNaganoEQ"},

						{	"title":"干渉SAR(10/2-11/27)",	type:"map",	key:"BUILD_NGN__http2014.10.02-2014.11.27",	icon:false,	"dataset":"dataSetOverlay_NGN_20021002_1127",	"zindex":498,	 legendFunc:"getLibraryLegend_SAR_NorthNaganoEQ"},
						{	"title": "SAR干渉画像に基づく現地調査", "type": "kml", "key": "genchichosa1411nagano", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1411nagano/genchichosa1411nagano.kml"  },

					]
			},
			{	"title": "余震震源分布(11/29現在)", "type": "kml", "key": "yosin1411nagano", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1411nagano/yosin1411nagano.kml", "legendFunc": "getLibraryLegend_Yoshin_NorthNaganoEQ"  },

		]
	},
	{
		"title": "御嶽山噴火活動", "isFolder": true, "key": "1409ontake", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{	"title": "斜め写真(9/28)", "type": "kml", "key": "naname1409ontake1_l", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/naname1409ontake1_l.kml"  },
			{	"title": "斜め写真(9/29)", "type": "kml", "key": "naname1409ontake2_l", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/naname1409ontake2_l.kml"  },
			{	"title": "正射画像_分割版(9/28)", "type": "kml", "key": "seisyazukaku1409ontake1_l", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/seisyazukaku1409ontake1_l.kml"  },
			{	"title": "正射画像_分割版(9/29)", "type": "kml", "key": "seisyazukaku1409ontake2", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/seisyazukaku1409ontake2.kml"  },
			{	"title": "正射画像(9/28)", "type": "map", "key": "20140928dol", "icon": false, "dataset": "dataSetOverlay_20140928dol", "zindex": 307  },
			{	"title": "正射画像(9/29)", "type": "map", "key": "20140929dol", "icon": false, "dataset": "dataSetOverlay_20140929dol", "zindex": 309  },
			{	"title": "航空機SAR画像(9/29)", "type": "map", "key": "20140929dol2", "icon": false, "dataset": "dataSetOverlay_20140929dol2", "zindex": 317, "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "航空機SAR画像(9/30)", "type": "map", "key": "20140930dol", "icon": false, "dataset": "dataSetOverlay_20140930dol", "zindex": 318, "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "干渉SARコメント(8/18-9/29)", "type": "kml", "key": "0818_0929coment1409ontake", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/0818_0929coment1409ontake.kml"  },
			{	"title": "干渉SAR(8/18-9/29)", "type": "map", "key": "201408180929sar1409ontake", "icon": false, "dataset": "dataSetOverlay_201408180929sar1409ontake", "zindex": 319, "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "干渉SARコメント(8/22-10/3)", "type": "kml", "key": "0822_1003coment1409ontake", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/0822_1003coment1409ontake.kml"  },
			{	"title": "干渉SAR(8/22-10/3)", "type": "map", "key": "201408221003sar1409ontake", "icon": false, "dataset": "dataSetOverlay_201408221003sar1409ontake", "zindex": 328, "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "衛星SAR強度画像(8/18)", "type": "map", "key": "20140818d_mag_ontake", "icon": false, "dataset": "dataSetOverlay_20140818d_mag_ontake", "zindex": 326, "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "衛星SAR強度画像(9/29)", "type": "map", "key": "20140929d_mag_ontake", "icon": false, "dataset": "dataSetOverlay_20140929d_mag_ontake", "zindex": 327, "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "推定火口(9/30暫定版：航空機SAR画像判読)", "type": "kml", "key": "sar1409ontake", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1409ontake/sar1409ontake.kml", "legendFunc": "getLibraryLegend_1409ontake"  },
			{	"title": "火山基本図", "type": "map", "key": "vbm1409ontake", "icon": false, "dataset": "dataSetOverlay_vbm25ontake", "zindex": 304 },
			{	"title": "火山基本図(透過)", "type": "map", "key": "vbmtouka1409ontake", "icon": false, "dataset": "dataSetOverlay_vbmtouka1409ontake", "zindex": 720 },
			{	"title": "火山土地条件図", "type": "map", "key": "volcano1409ontake", "icon": false, "dataset": "dataSetOverlay_ontakesan", "zindex": 305 },
			{	"title": "過去に撮影した空中写真(1991年～2000年)", "type": "kmlurl", "key": "photopoint_1991_2000", "icon": "photo.png", "getURL": "getURL_photoPoint", "extent": "35.970439_137.390098_35.84433_137.585792" },
			{	"title": "過去に撮影した空中写真(1981年～1990年)", "type": "kmlurl", "key": "photopoint_1981_1990", "icon": "photo.png", "getURL": "getURL_photoPoint", "extent": "35.970439_137.390098_35.84433_137.585792" },
			{	"title": "過去に撮影した空中写真(1971年～1980年)", "type": "kmlurl", "key": "photopoint_1971_1980", "icon": "photo.png", "getURL": "getURL_photoPoint", "extent": "35.970439_137.390098_35.84433_137.585792" },
			{	"title": "過去の正射画像(1974年～1978年)", "type": "map", "key": "yk74_1409ontake", "icon": "photo.png", "dataset": "dataSetOverlay_YK74", "zindex": 306 }
		]
	},
	{
		"title": "8月16日からの大雨", "isFolder": true, "key": "1408ooame", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children":
		[
			{
				"title": "広島市内", "isFolder": true, "key": "1408ooame_hiroshima", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
				"children":
					[
						{	"title": "斜め写真(8/20)", "type": "kml", "key": "naname1408ooame_hiroshima_1", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/naname1408ooame_hiroshima.kml"  },
						{	"title": "斜め写真(8/21)", "type": "kml", "key": "naname1408ooame_hiroshima2", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/naname1408ooame_hiroshima2.kml" },
						{	"title": "垂直写真(8/28)", "type": "kml", "key": "suichoku1408ooame_hiroshima_l", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/suichoku1408ooame_hiroshima_l.kml","legendFunc": "getLibraryLegend_suichoku1408ooame_tanba"  },
						{	"title": "垂直写真(8/30)", "type": "kml", "key": "suichoku1408ooame_hiroshima2_l", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/suichoku1408ooame_hiroshima2_l.kml","legendFunc": "getLibraryLegend_suichoku1408ooame_hiroshima2"  },
						{	"title": "垂直写真(8/31)", "type": "kml", "key": "suichoku1408ooame_hiroshima3_l", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/suichoku1408ooame_hiroshima3_l.kml","legendFunc": "getLibraryLegend_saigaiTemp"  },
						{	"title": "写真判読図(8/28・30・31垂直写真)", "type": "kml", "key": "hisai1408ooame_hiroshima3", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/hisai1408ooame_hiroshima3.kml"
							, "legendFunc": "getLibraryLegend_genchi1408ooame_hiroshima3"  },
						{ "title": "正射画像(8/28)", "type": "map", "key": "20140828dol", "icon": false, "dataset": "dataSetOverlay_20140828dol", "zindex": 273
							, "legendFunc": "getLibraryLegend_seisya1408ooame_hiroshima" },
						{ "title": "正射画像(8/30)", "type": "map", "key": "20140830dol", "icon": false, "dataset": "dataSetOverlay_20140830dol", "zindex": 279
							, "legendFunc": "getLibraryLegend_saigaiTemp"  },
						{ "title": "正射画像(8/30・31)", "type": "map", "key": "20140831dol", "icon": false, "dataset": "dataSetOverlay_20140831dol", "zindex": 291
							, "legendFunc": "getLibraryLegend_saigaiTemp" },
						{	"title": "正射画像_図郭版(8/28)", "type": "kml", "key": "seisyazukaku1408ooame_hiroshima_l", "icon": false,  "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/seisyazukaku1408ooame_hiroshima_l.kml"
							, "legendFunc": "getLibraryLegend_seisyazukaku1408ooame_hiroshima" },
						{	"title": "正射画像_図郭版(8/30)", "type": "kml", "key": "seisyazukaku1408ooame_hiroshima2_l", "icon": false,  "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/seisyazukaku1408ooame_hiroshima2_l.kml"
							, "legendFunc": "getLibraryLegend_saigaiTemp" },
						{	"title": "正射画像_図郭版(8/30・31)", "type": "kml", "key": "seisyazukaku1408ooame_hiroshima3_l", "icon": false,  "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/seisyazukaku1408ooame_hiroshima3_l.kml"
							, "legendFunc": "getLibraryLegend_saigaiTemp"},
						{
							"title": "斜め写真による正射画像", "isFolder": true, "key": "1408ooame_hiroshima_nanameseisya", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
							"children":
								[
									{ "title": "斜め写真による正射画像(8/20 安佐南区八木)", "type": "map", "key": "20140820dol", "icon": false, "dataset": "dataSetOverlay_20140820dol", "zindex": 228  },
									{ "title": "斜め写真による正射画像(8/20 安佐南区山本)", "type": "map", "key": "20140820dol2", "icon": false, "dataset": "dataSetOverlay_20140820dol2", "zindex": 229  },
									{ "title": "斜め写真による正射画像(8/20 安佐北区可部)", "type": "map", "key": "20140820dol3", "icon": false, "dataset": "dataSetOverlay_20140820dol3", "zindex": 261 },
								]
						},
						{ 	"title": "数値地図25000(土地条件)", 		"type": "map", "key": "LCM25K_2012_2", "icon": false, "dataset": "dataSetOverlay_LCM25K_2012"
							, "legendFunc": "getLibraryLegend_lcm25k", "zindex": 263 },
						{ 	"title": "治水地形分類図・更新版", 	"type": "map", "key": "LCMFC02_2"		, "icon": false, "dataset": "dataSetOverlay_LCMFC02", "legendFunc": "getLibraryLegend_LCMFC2", "zindex": 262 },
						{	"title": "過去に撮影した空中写真(2005～2009年)", "type": "kml", "key": "airphoto1408ooame_hiroshima", "icon": "080.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/airphoto1408ooame_hiroshima.kml" },

						{	"title": "過去に撮影した空中写真（1948年）", "type": "kml", "key": "airphoto1408ooame_hiroshima2", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/airphoto1408ooame_hiroshima2.kml" },


						{ 	"title": "過去の正射画像(1947～1948年)", 	"type": "map", "key": "19480000dol"		, "icon": false, "dataset": "dataSetOverlay_19480000dol"
							, "zindex": 266 },

						{ "title": "過去の正射画像(1962年)", "type": "map", "key": "19620000dol", "icon": false, "dataset": "dataSetOverlay_19620000dol", "zindex": 272 },
						{ "title": "過去の正射画像(1974～1978年)", "type": "map", "key": "yk74_2", "icon": false, "dataset": "dataSetOverlay_YK74", "zindex": 267},
						{ "title": "過去の正射画像(1979～1983年)", "type": "map", "key": "yk79_2", "icon": false, "dataset": "dataSetOverlay_YK79", "zindex": 268 },
						{ "title": "過去の正射画像(1988～1990年)", "type": "map", "key": "yk88_2", "icon": false, "dataset": "dataSetOverlay_YK88", "zindex": 269},
						{ "title": "過去の正射画像(2007年～)", "type": "map", "key": "y2k7_2", "icon": false, "dataset": "dataSetOverlay_Y2K7", "zindex": 271 },

						{	"title": "立体図", "type": "kml", "key": "3d1408ooame_hiroshima", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/3d1408ooame_hiroshima.kml" },
					]
			},
			{
				"title": "丹波市市島地区", "isFolder": true, "key": "1408ooame_tanba", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
				"children":
					[
						{	"title": "斜め写真(8/19)", "type": "kml", "key": "naname1408ooame_tanba_1", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/naname1408ooame_tanba.kml"  },
						{	"title": "垂直写真(8/19)", "type": "kml", "key": "suichoku1408ooame_tanba", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/suichoku1408ooame_tanba.kml"
							, "legendFunc": "getLibraryLegend_suichoku1408ooame_tanba" },

							{	"title": "写真判読図(8/19)", "type": "kml", "key": "hisai1408ooame_tanba", "icon": false,  "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/hisai1408ooame_tanba.kml"
								, "legendFunc": "getLibraryLegend_suichoku1408ooame_tanba_2" },
							{ "title": "正射画像(8/19)", "type": "map", "key": "20140819dol", "icon": false, "dataset": "dataSetOverlay_20140819dol", "zindex": 230
								, "legendFunc": "getLibraryLegend_suichoku1408ooame_tanba"  },



						{	"title": "正射画像_図郭版(8/19)", "type": "kml", "key": "seisyazukaku1408ooame_tanba", "icon": false,  "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/seisyazukaku1408ooame_tanba.kml"
							, "legendFunc": "getLibraryLegend_suichoku1408ooame_tanba"},
					]
			},
			{
				"title": "福知山市街地区", "isFolder": true, "key": "1408ooame_fukuchiyama", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
				"children":
					[
					{	"title": "斜め写真(8/19)", "type": "kml", "key": "naname1408ooame_fukuchiyama_1", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408ooame/naname1408ooame_fukuchiyama.kml" },
					]
			}
		]
	},



	{
		"title": "台風第11号等による大雨", "isFolder": true, "key": "1408typhoon11", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{	"title": "斜め写真 (8/13)", "type": "kml", "key": "naname1408typhoon11", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408typhoon11/naname1408typhoon11.kml"  },
			{	"title": "垂直写真 (8/13)", "type": "kml", "key": "suichoku1408typhoon11", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1408typhoon11/suichoku1408typhoon11.kml"  },
			{	"title": "正射画像 (8/13)", "type": "map", "key": "20140813dol", "icon": false, "dataset": "dataSetOverlay_20140813dol", "zindex": 243 },
			{	"title": "正射画像_図郭版 (8/13)", "type": "kml", "key": "1408typhoon11", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1408typhoon11/seisyazukaku1408typhoon11.kml"  },
		]
	},
	{
		"title": "台風第8号等による大雨", "isFolder": true, "key": "1407typhoon8", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{	"title": "斜め写真（7/11)", "type": "kml", "key": "naname1407typhoon8", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1407typhoon8/naname1407typhoon8.kml"  },
			{	"title": "斜め写真による正射画像（7/11)", "type": "map", "key": "seisya20140711dol", "icon": false, "dataset": "DS_20140711dol", "zindex": 	254 },
			{	"title": "災害概況図", "type": "kml", "key": "gaikyozu1407typhoon8", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1407typhoon8/gaikyozu1407typhoon8.kml" }
		]
	},
	{
		"title": "西之島付近噴火活動", "isFolder": true, "key": "kaijohoancho", "hideCheckbox": true, "expand": true, "addClass": "Saigai",
		"children": [
			{
				"title": "正射画像", "isFolder": true, "key": "seisyanishinoshima", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_nishinoshimaTemp", "addClass": "Saigai", "expand": true,
				"children": [
					{ "title": "2014.12.10", "type": "map", "key": "20141210doh", "icon": false, "dataset": "dataSetOverlay_20141210doh", "zindex": 501, "addClass": "Saigai" },
					{ "title": "2014.12.4", "type": "map", "key": "20141204doh", "icon": false, "dataset": "dataSetOverlay_20141204doh", "zindex": 500, "addClass": "Saigai" },
					{ "title": "2014.7.4（無人航空機（UAV）撮影）", "type": "map", "key": "20140704dol"				, "icon": false, "dataset": "dataSetOverlay_20140704dol", "zindex": 242 },
					{ "title": "2014.3.22（無人航空機（UAV）撮影）", "type": "map", "key": "seisya1311nishinoshima4"	, "icon": false, "dataset": "dataSetOverlay_seisya1311nishinoshima4", "zindex": 241 },
					{ "title": "2014.2.16", "type": "map", "key": "seisya1311nishinoshima3"								, "icon": false, "dataset": "dataSetOverlay_seisya1311nishinoshima3", "zindex": 240 },
					{ "title": "2013.12.17", "type": "map", "key": "seisya1311nishinoshima2"							, "icon": false, "dataset": "dataSetOverlay_seisya1311nishinoshima2", "zindex": 239 },
					{ "title": "2013.12.4", "type": "map", "key": "seisya1311nishinoshima", "icon": false, "dataset": "dataSetOverlay_seisya1311nishinoshima", "zindex": 238 },
				]
			},
			{ "title": "2014.7.4_飛行経路（無人航空機（UAV）撮影）", "type": "kml", "key": "uavhikou1311nishinoshima_140704", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/uavhikou1311nishinoshima_140704.kml", "legendFunc": "getLibraryLegend_saigaiTemp" },
			{ "title": "2014.3.22_飛行経路（無人航空機（UAV）撮影）", "type": "kml", "key": "uavhikou1311nishinoshima_140322", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/uavhikou1311nishinoshima_140322.kml", "legendFunc": "getLibraryLegend_saigaiTemp" },
			{
				"title": "（上載）地形判読図", "isFolder": true, "key": "handokunishinoshima", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_nishinoshima_shintou", "addClass": "Saigai", "expand": true,
				"children": [
					{ "title": "2014.12.10", "type": "map", "key": "handoku20141210doh2", "icon": false, "dataset": "dataSetOverlay_handoku20141210doh2", "zindex": 502, "addClass": "Saigai" },
					{ "title": "2014.7.4(無人航空機(UAV)撮影)", "type": "map", "key": "handoku1311nishinoshima_20140704dol2", "icon": false, "dataset": "DS_nishinoshima_20140704dol2", "zindex": 719 },
					{ "title": "2014.3.22（無人航空機（UAV）撮影)", "type": "map", "key": "handoku1311nishinoshima4", "icon": false, "dataset": "dataSetOverlay_handoku1311nishinoshima4", "zindex": 718 },
					{ "title": "2014.2.16", "type": "map", "key": "handoku1311nishinoshima3", "icon": false, "dataset": "dataSetOverlay_handoku1311nishinoshima3", "zindex": 717 },
					{ "title": "2013.12.17", "type": "map", "key": "handoku1311nishinoshima2", "icon": false, "dataset": "dataSetOverlay_handoku1311nishinoshima2", "zindex": 716 },
					{ "title": "2013.12.4", "type": "map", "key": "handoku1311nishinoshima", "icon": false, "dataset": "dataSetOverlay_handoku1311nishinoshima", "zindex": 715 }
				]
			},
			{
				"title": "立体図", "isFolder": true, "key": "nishirittaizu", "hideCheckbox": true, "expand": true, "addClass": "Saigai",
				"children": [
					{ "title": "2014.12.4", "type": "kml", "key": "3D1311nishinoshima6", "icon": "080.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/3D1311nishinoshima6.kml", "legendFunc": "getLibraryLegend_saigaiTemp", "addClass": "Saigai" },
					{ "title": "2013.12～2014.7", "type": "kml", "key": "3D1311nishinoshima5", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/3D1311nishinoshima5.kml", "legendFunc": "getLibraryLegend_saigaiTemp" },
				]
			},
			{
				"title": "正射画像_図郭版", "isFolder": true, "key": "seisyazukakunishinoshima", "hideCheckbox": true, "expand": true, "legendFunc": "getLibraryLegend_nishinoshimaTemp", "addClass": "Saigai",
				"children": [
					{ "title": "2014.12.10", "type": "kml", "key": "seisyazukaku1311nishinoshima5", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/seisyazukaku1311nishinoshima5.kml", "addClass": "Saigai" },
					{ "title": "2014.12.4", "type": "kml", "key": "seisyazukaku1311nishinoshima4", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/seisyazukaku1311nishinoshima4.kml", "addClass": "Saigai" },
					{ "title": "2014.2.16", "type": "kml", "key": "seisyazukaku1311nishinoshima3", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/seisyazukaku1311nishinoshima3.kml" },
					{ "title": "2013.12.17", "type": "kml", "key": "seisyazukaku1311nishinoshima2", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/seisyazukaku1311nishinoshima2.kml" },
					{ "title": "2013.12.4", "type": "kml", "key": "seisyazukaku1311nishinoshima", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/seisyazukaku1311nishinoshima.kml" }
				]
			},
			{
				"title": "衛星画像", "isFolder": true, "key": "lsinishinoshima", "hideCheckbox": true, "legendFunc": "getLibraryLegend_nishinoshima", "expand": false,
				"children": [

					{ "title" :"2014.11.25","type" : "map", "key" : "20141125lsi", "icon" : false, "dataset" : "dataSetOverlay_NISHINOSHIMA_20141125lsi","zindex":494, "expand": false },

					{ "title" :"2014.10.24","type" : "map", "key" : "nishinoshima_2014_10_24", "icon" : false, "dataset" : "dataSetOverlay_NISHINOSHIMA_2014_10_24","zindex":493 },
					{ "title": "2014.10.8", "type": "map", "key": "20141008lsi", "icon": false, "dataset": "dataSetOverlay_20141008lsi", "zindex": 337 },
					{ "title": "2014.9.6", "type": "map", "key": "20140906lsi", "icon": false, "dataset": "dataSetOverlay_20140906lsi", "zindex": 292 },
					{ "title": "2014.8.21", "type": "map", "key": "20140821lsi", "icon": false, "dataset": "dataSetOverlay_20140821lsi", "zindex": 264 },
					{ "title": "2014.7.4", "type": "map", "key": "lsi1311nishinoshima7", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima7", "zindex": 237 },
					{ "title": "2014.6.2", "type": "map", "key": "lsi1311nishinoshima6", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima6", "zindex": 236 },
					{ "title": "2014.5.17", "type": "map", "key": "lsi1311nishinoshima4", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima4", "zindex": 235 },
					{ "title": "2014.3.30", "type": "map", "key": "lsi1311nishinoshima3", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima3", "zindex": 234 },
					{ "title": "2014.2.26", "type": "map", "key": "lsi1311nishinoshima2", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima2", "zindex": 233 },
					{ "title": "2013.12.24", "type": "map", "key": "lsi1311nishinoshima", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima", "zindex": 232 },
					{ "title": "2013.9.3", "type": "map", "key": "lsi1311nishinoshima5", "icon": false, "dataset": "dataSetOverlay_lsi1311nishinoshima5", "zindex": 231 },

				]
			},
			{
				"title": "垂直写真", "isFolder": true, "key": "suichokunishinoshima", "hideCheckbox": true, "expand": false,	//		 "legendFunc": "getLibraryLegend_nishinoshima",
				"children": [
				 	{	"title": "2014.7.4(無人航空機(UAV)撮影)"			, "type": "kml", "key": "nishinoshima7", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/suichoku1311nishinoshima_140704.kml"		, "legendFunc": "getLibraryLegend_saigaiTemp"  },
					{ "title": "2014.3.22（無人航空機（UAV）撮影）", "type": "kml", "key": "suichoku1311nishinoshima_140322", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/suichoku1311nishinoshima_140322.kml", "legendFunc": "getLibraryLegend_saigaiTemp" }
				]
			},
			{
				"title": "海岸線(暫定)", "isFolder": true, "key": "coastlinenishinoshima", "hideCheckbox": true, "expand": true, "legendFunc": "getLibraryLegend_nishinoshimaTemp", "addClass": "Saigai",
				"children": [
					{ "title": "2014.12.4", "type": "kml", "key": "coastline1311nishinoshima_141204", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/coastline1311nishinoshima_141204.kml", "addClass": "Saigai" },
					{ "title": "2014.2.16", "type": "kml", "key": "coastline1311nishinoshima_140216", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/coastline1311nishinoshima_140216.kml" },
					{ "title": "2013.12.17", "type": "kml", "key": "coastline1311nishinoshima_1217", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/coastline1311nishinoshima_1217.kml" },
					{ "title": "2013.12.4", "type": "kml", "key": "coastline1311nishinoshima_1204", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/coastline1311nishinoshima_1204.kml" },
					{ "title": "2013.11.21", "type": "kml", "key": "coastline1311nishinoshima_1121", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/coastline1311nishinoshima_1121.kml", "legendFunc": "getLibraryLegend_nishinoshima_shintou" }
				]
			},
			{
				"title": "斜め写真", "isFolder": true, "key": "nanamenishinoshima", "hideCheckbox": true, "expand": true, "legendFunc": "getLibraryLegend_nishinoshima_shintou_naname", "addClass": "Saigai",
				"children": [
					{ "title": "2014.12.4", "type": "kml", "key": "naname1311nishinoshima4", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/naname1311nishinoshima4.kml", "noLegend": true, "addClass": "Saigai" },
					{ "title": "2014.7.4(無人航空機(UAV)撮影)", "type": "kml", "key": "naname1311nishinoshima3", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/naname1311nishinoshima3.kml", "noLegend": true },
					{ "title": "2013.11.21（海上保安庁）", "type": "kml", "key": "naname1311nishinoshima2", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/naname1311nishinoshima2.kml", "noLegend": true },
					{ "title": "2013.11.20（海上保安庁）", "type": "kml", "key": "naname1311nishinoshima", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/naname1311nishinoshima.kml", "noLegend": true }
				]
			},
			{
				"title": "関連情報", "isFolder": true, "key": "elsenishinoshima", "hideCheckbox": true, "expand": false,
				"children": [
					{ "title": "地形等（地理院取得2009ALOS画像）", "type": "kml", "key": "coastline1311nishinoshima_2009alos", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/coastline1311nishinoshima_2009alos.kml", "legendFunc": "getLibraryLegend_nishinoshima_2009alos" },
					{ "title": "垂直写真（1947、76、78撮影）", "type": "kml", "key": "suichoku_old_nishinoshima", "icon": "mobile004.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/suichoku_old_nishinoshima.kml", "legendFunc": "getLibraryLegend_nishinoshimaElse" },
					{ "title": "（参考）国土地理院・気象庁", "type": "kml", "key": "chikeizu1311nishinoshima", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1311nishinoshima/chikeizu1311nishinoshima.kml", "legendFunc": "getLibraryLegend_nishinoshimaElse" }
				]
			}
		]
	},
	{
		"title": "平成25年台風第26・27号の大雨", "isFolder": true, "key": "1310typhoon26", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{	"title": "斜め写真（10/16)", "type": "kml", "key": "naname1310typhoon26", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1310typhoon26/naname1310typhoon26.kml" },
			{	"title": "垂直写真（10/17)", "type": "kml", "key": "suichoku1310typhoon26", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1310typhoon26/suichoku1310typhoon26.kml" },
			{	"title": "土砂流出箇所", "type": "kml", "key": "hisai1310typhoon26", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1310typhoon26/hisai1310typhoon26.kml" },
			{	"title": "土砂流出箇所（断面図）", "type": "kml", "key": "hisaidanmen1310typhoon26", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1310typhoon26/hisaidanmen1310typhoon26.kml" },
			{ 	"title": "正射画像（H24.4）", "type": "map", "key": "laserortho1204", "icon": false, "dataset": "dataSetOverlay_laserortho1204", "zindex": 222 },
			{ 	"title": "正射画像（10/17）", "type": "map", "key": "seisya1310typhoon26", "icon": false, "dataset": "dataSetOverlay_seisya1310typhoon26", "zindex": 225 },
			{ 	"title": "正射画像（10/28）", "type": "map", "key": "seisya1310typhoon27", "icon": false, "dataset": "dataSetOverlay_seisya1310typhoon27", "zindex": 227 },
			{ 	"title": "正射画像_図郭版（10/17）", "type": "kml", "key": "seisyazukaku1310typhoon26", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1310typhoon26/seisyazukaku1310typhoon26.kml" },
			{ 	"title": "正射画像_図郭版（10/28）", "type": "kml", "key": "seisyazukaku1310typhoon27", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1310typhoon26/seisyazukaku1310typhoon27.kml" },
			{ 	"title": "火山土地条件図", "type": "map", "key": "izuoshima2", "icon": false, "dataset": "dataSetOverlay_izuoshima", "zindex": 349 },
			{ 	"title": "火山基本図", "type": "map", "key": "izuoshima_kihon3", "icon": false, "dataset": "dataSetOverlay_izuoshima_kihon", "zindex": 224 },
			{ 	"title": "火山基本図（透過）", "type": "map", "key": "izuoshima_kihon2", "icon": false, "dataset": "dataSetOverlay_izuoshima_kihon2", "zindex": 226 },
			{ 	"title": "色別標高図", "type": "map", "key": "relief2", "icon": false, "dataset": "dataSet_Relief", "zindex": 223, "legendFunc": "getLibraryLegend_relief" }
		]
	},
	{
		"title": "平成25年台風第18号等による大雨", "isFolder": true, "key": "1309typhoon18", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{	"title": "垂直写真(9/20)", "type": "kml", "key": "suichoku1309typhoon18", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1309typhoon18/suichoku1309typhoon18.kml" }
		]
	},
	{
		"title": "平成25年9月2日からの突風", "isFolder": true, "key": "1309saitama", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{ "title": "撮影範囲", "type": "kml", "key": "satueihani1309saitama", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1309saitama/satueihani1309saitama.kml" },
			{ "title": "正射画像(9/9)", "type": "map", "key": "seisya1309saitama", "icon": false, "dataset": "dataSetOverlay_seisyaH1309saitama", "zindex": 346 },
			{ "title": "正射画像/正射地図(9/9)", "type": "kml", "key": "seisyahani1309saitama", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1309saitama/seisyahani1309saitama.kml" },
			{ "title": "被災箇所", "type": "kml", "key": "hisai1309koshigaya_l", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1309saitama/hisai1309koshigaya_l.kml" }
		]
	},
	{
		"title": "平成25年7月17日からの大雨", "isFolder": true, "key": "1307yamaguchi", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{
				"title": "山口地方「須佐地区」", "isFolder": true, "key": "1307yamaguchi_susa", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
				"children": [
					{ "title": "垂直写真(7/31)", "type": "kml", "key": "suichoku1307yamaguchi", "icon": "080.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/suichoku1307yamaguchi.kml" },
					{ "title": "垂直写真(8/7 A)", "type": "kml", "key": "suichoku1307yamaguchi2A", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/suichoku1307yamaguchi2A.kml" },
					{ "title": "垂直写真(8/7 B)", "type": "kml", "key": "suichoku1307yamaguchi2B", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/suichoku1307yamaguchi2B.kml" },
					{ "title": "被災箇所(7/31)", "type": "kml", "key": "hisai1307yamaguchi", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/hisai1307yamaguchi.kml" },
					{ "title": "被災箇所(8/7)", "type": "kml", "key": "hisai1307yamaguchi2", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/hisai1307yamaguchi2.kml" },
					{ "title": "正射画像(7/31)", "type": "map", "key": "seisya1307yamaguchi", "icon": false, "dataset": "dataSetOverlay_seisya1307yamaguchi", "zindex": 348 },
					{ "title": "正射画像(8/7)", "type": "map", "key": "seisya1307yamaguchi2", "icon": false, "dataset": "dataSetOverlay_seisya1307yamaguchi2", "zindex": 221 },
					{ "title": "正射画像_図郭版（7/31)", "type": "kml", "key": "ortho130731yamaguchi", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/ortho130731yamaguchi.kml" },
					{ "title": "正射画像_図郭版（8/7)", "type": "kml", "key": "ortho130807yamaguchi", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/ortho130807yamaguchi.kml" },
					{ "title": "正射写真地図_図郭版（7/31)", "type": "kml", "key": "orthomap130731yamaguchi", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/ortho-map130731yamaguchi.kml" },
					{ "title": "正射写真地図_図郭版（8/7)", "type": "kml", "key": "orthomap130807yamaguchi", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/ortho-map130807yamaguchi.kml" }
				]
			},
			{
				"title": "島根地方「津和野地区」", "isFolder": true, "key": "1307yamaguchi_tsuwano", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
				"children": [
					{ "title": "垂直写真(8/9)", "type": "kml", "key": "suichoku1307tsuwano_l2", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/suichoku1307tsuwano_l2.kml" },
					{ "title": "被災箇所(8/9)", "type": "kml", "key": "hisai1307tsuwano2", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/hisai1307tsuwano2.kml" }
				]
			},
			{
				"title": "山口地方「阿東地区」", "isFolder": true, "key": "1307yamaguchi_atou", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
				"children": [
					{ "title": "垂直写真(8/9)", "type": "kml", "key": "suichoku1307ato_l2", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/suichoku1307ato_l2.kml" },
					{ "title": "被災箇所(8/9)", "type": "kml", "key": "hisai1307ato2", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1307yamaguchi/hisai1307ato2.kml" }
				]
			}
		]
	},
	{
		"title": "平成24年7月九州北部豪雨", "isFolder": true, "key": "1207kyushu", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{ "title": "斜面崩壊(7/25)", "type": "kml", "key": "shamen1207kyushu", "icon": "103BK_new.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/shamenari.kml" },
			{ "title": "斜め写真(7/15)", "type": "kml", "key": "naname1207kyushu", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/naname.kml" },
			{ "title": "堤防決壊(7/15)", "type": "kml", "key": "teibou1207kyushu", "icon": "100R.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/teibou.kml" },
			{ "title": "越水(7/17、7/25)", "type": "kml", "key": "essui1207kyushu", "icon": "101B.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/essuiari.kml" },
			{ "title": "正射画像/正射写真地図(7/15)", "type": "kml", "key": "orthomap1207kyushu", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/ortho_map.kml" },
			{ "title": "正射画像/正射写真地図(7/17)", "type": "kml", "key": "ortho2map1207kyushu", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/ortho2_map.kml" },
			{ "title": "正射画像/正射写真地図(7/25)", "type": "kml", "key": "ortho3map1207kyushu", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1207kyushu/ortho3_map.kml" }
		]
	},
	{
		"title": "平成23年台風12号による大雨", "isFolder": true, "key": "1109typhoon12", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_saigaiTemp",
		"children": [
			{
				"title": "写真判読", "isFolder": true, "key": "1109typhoon12_handoku", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_1109typhoon12",
				"children": [
					{ "title": "河道閉塞（大）", "type": "kml", "key": "kadoudai1109typhoon12", "icon": "dam.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/kadou_dai.kml" },
					{ "title": "土砂崩れ（大）", "type": "kml", "key": "doshadai1109typhoon12", "icon": "100R.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/dosha_dai.kml" },
					{ "title": "土石流（大）", "type": "kml", "key": "dosekidai1109typhoon12", "icon": "101B.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/doseki_dai.kml" },
					{ "title": "家屋流出", "type": "kml", "key": "kaoku1109typhoon12", "icon": "103BK.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/kaoku.kml" },
					{ "title": "河道閉塞（小）", "type": "kml", "key": "kadoushou1109typhoon12", "icon": "dam-s.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/kadou_shou.kml" },
					{ "title": "土砂崩れ（小）", "type": "kml", "key": "doshashou1109typhoon12", "icon": "100Rs.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/dosha_shou.kml" },
					{ "title": "土石流（小）", "type": "kml", "key": "dosekishou1109typhoon12", "icon": "101Bs.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/doseki_shou.kml" }
				]
			},
			{
				"title": "情報収集", "isFolder": true, "key": "1109typhoon12_shushu", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_1109typhoon12_shushu",
				"children": [
					{ "title": "土石流・土砂崩れ", "type": "kml", "key": "dosekidosha1109typhoon12", "icon": "dosya-s.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/doseki-dosha.kml" },
					{ "title": "橋流失", "type": "kml", "key": "hashi1109typhoon12", "icon": "092-s.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/hashi.kml" },
					{ "title": "灯台崩壊", "type": "kml", "key": "todai1109typhoon12", "icon": "096-s.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/todai.kml" }
				]
			},
			{
				"title": "災害前との比較", "isFolder": true, "key": "1109typhoon12_hikaku", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_1109typhoon12",
				"children": [
					{ "title": "新旧比較地点", "type": "kml", "key": "beforeafter1109typhoon12", "icon": "mobile006.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/beforeafter.kml" }
				]
			},
			{
				"title": "正射画像", "isFolder": true, "key": "1109typhoon12_seisya", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_1109typhoon12",
				"children": [
					{ "title": "作成範囲", "type": "kml", "key": "orthophoto1109typhoon12", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1109typhoon12/orthophoto.kml" }
				]
			}
		]
	},
	{
		"title": "東北地方太平洋沖地震", "isFolder": true, "key": "geje", "hideCheckbox": true, "expand": false,
		"children": [
			{
				"title": "地殻変動量", "isFolder": true, "key": "gejechikaku", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_geje",
				"children": [
					{ "title": "青森県", "type": "kml", "key": "gejechikaku_aomori", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/aomori.kml" },
					{ "title": "岩手県", "type": "kml", "key": "gejechikaku_iwate", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/iwate.kml" },
					{ "title": "宮城県", "type": "kml", "key": "gejechikaku_miyagi", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/miyagi.kml" },
					{ "title": "秋田県", "type": "kml", "key": "gejechikaku_akita", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/akita.kml" },
					{ "title": "山形県", "type": "kml", "key": "gejechikaku_yamagata", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/yamagata.kml" },
					{ "title": "福島県", "type": "kml", "key": "gejechikaku_fukushima", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/fukushima.kml" },
					{ "title": "茨城県", "type": "kml", "key": "gejechikaku_ibaraki", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/ibaraki.kml" },
					{ "title": "栃木県", "type": "kml", "key": "gejechikaku_tochigi", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/tochigi.kml" },
					{ "title": "群馬県", "type": "kml", "key": "gejechikaku_gunma", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/gunma.kml" },
					{ "title": "埼玉県", "type": "kml", "key": "gejechikaku_saitama", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/saitama.kml" },
					{ "title": "千葉県", "type": "kml", "key": "gejechikaku_chiba", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/chiba.kml" },
					{ "title": "東京県", "type": "kml", "key": "gejechikaku_tokyo", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/tokyo.kml" },
					{ "title": "神奈川県", "type": "kml", "key": "gejechikaku_kanagawa", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/kanagawa.kml" },
					{ "title": "新潟県", "type": "kml", "key": "gejechikaku_niigata", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/niigata.kml" },
					{ "title": "長野県", "type": "kml", "key": "gejechikaku_nagano", "icon": "geje.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/nagano.kml" }
				]
			},
			{
				"title": "斜め写真", "isFolder": true, "key": "1103tohoku_naname", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_1103tohoku_naname",
				"children": [
					{ "title": "青森県六ヶ所村", "type": "kml", "key": "001naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/001.kml" },
					{ "title": "青森県三沢市", "type": "kml", "key": "002naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/002.kml" },
					{ "title": "青森県おいらせ町", "type": "kml", "key": "003naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/003.kml" },
					{ "title": "青森県八戸市", "type": "kml", "key": "004naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/004.kml" },
					{ "title": "青森県階上町", "type": "kml", "key": "005naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/005.kml" },
					{ "title": "岩手県洋野町", "type": "kml", "key": "006naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/006.kml" },
					{ "title": "岩手県久慈市", "type": "kml", "key": "007naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/007.kml" },
					{ "title": "岩手県野田村", "type": "kml", "key": "008naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/008.kml" },
					{ "title": "岩手県普代村", "type": "kml", "key": "009naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/009.kml" },
					{ "title": "岩手県田野畑村", "type": "kml", "key": "010naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/010.kml" },
					{ "title": "岩手県岩泉町", "type": "kml", "key": "011naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/011.kml" },
					{ "title": "岩手県宮古市", "type": "kml", "key": "012naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/012.kml" },
					{ "title": "岩手県山田町", "type": "kml", "key": "013naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/013.kml" },
					{ "title": "岩手県大槌町", "type": "kml", "key": "014naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/014.kml" },
					{ "title": "岩手県釜石市", "type": "kml", "key": "015naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/015.kml" },
					{ "title": "岩手県大船渡市", "type": "kml", "key": "016naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/016.kml" },
					{ "title": "岩手県陸前高田市", "type": "kml", "key": "017naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/017.kml" },
					{ "title": "宮城県気仙沼市", "type": "kml", "key": "018naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/018.kml" },
					{ "title": "宮城県南三陸町", "type": "kml", "key": "019naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/019.kml" },
					{ "title": "宮城県女川町", "type": "kml", "key": "020naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/020.kml" },
					{ "title": "宮城県石巻市", "type": "kml", "key": "021naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/021.kml" },
					{ "title": "宮城県東松島市", "type": "kml", "key": "022naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/022.kml" },
					{ "title": "宮城県松島町", "type": "kml", "key": "023naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/023.kml" },
					{ "title": "宮城県塩竈市", "type": "kml", "key": "024naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/024.kml" },
					{ "title": "宮城県利府町", "type": "kml", "key": "025naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/025.kml" },
					{ "title": "宮城県七ヶ浜町", "type": "kml", "key": "026naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/026.kml" },
					{ "title": "宮城県多賀城市", "type": "kml", "key": "027naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/027.kml" },
					{ "title": "宮城県仙台市宮城野区", "type": "kml", "key": "028naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/028.kml" },
					{ "title": "宮城県仙台市若林区", "type": "kml", "key": "029naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/029.kml" },
					{ "title": "宮城県名取市", "type": "kml", "key": "030naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/030.kml" },
					{ "title": "宮城県岩沼市", "type": "kml", "key": "031naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/031.kml" },
					{ "title": "宮城県亘理町", "type": "kml", "key": "032naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/032.kml" },
					{ "title": "宮城県山元町", "type": "kml", "key": "033naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/033.kml" },
					{ "title": "福島県新地町", "type": "kml", "key": "034naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/034.kml" },
					{ "title": "福島県相馬市", "type": "kml", "key": "035naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/035.kml" },
					{ "title": "福島県南相馬市", "type": "kml", "key": "036naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/036.kml" },
					{ "title": "福島県浪江町", "type": "kml", "key": "037naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/037.kml" },
					{ "title": "福島県双葉町", "type": "kml", "key": "038naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/038.kml" },
					{ "title": "福島県大熊町", "type": "kml", "key": "039naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/039.kml" },
					{ "title": "福島県富岡町", "type": "kml", "key": "040naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/040.kml" },
					{ "title": "福島県楢葉町", "type": "kml", "key": "041naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/041.kml" },
					{ "title": "福島県広野町", "type": "kml", "key": "042naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/042.kml" },
					{ "title": "福島県いわき市", "type": "kml", "key": "043naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/043.kml" },
					{ "title": "茨城県北茨城市", "type": "kml", "key": "044naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/044.kml" },
					{ "title": "茨城県高萩市", "type": "kml", "key": "045naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/045.kml" },
					{ "title": "茨城県日立市", "type": "kml", "key": "046naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/046.kml" },
					{ "title": "茨城県東海村", "type": "kml", "key": "047naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/047.kml" },
					{ "title": "茨城県ひたちなか市", "type": "kml", "key": "048naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/048.kml" },
					{ "title": "茨城県大洗町", "type": "kml", "key": "049naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/049.kml" },
					{ "title": "茨城県鉾田市", "type": "kml", "key": "050naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/050.kml" },
					{ "title": "茨城県鹿嶋市", "type": "kml", "key": "051naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/051.kml" },
					{ "title": "茨城県神栖市", "type": "kml", "key": "052naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/052.kml" },
					{ "title": "千葉県銚子市", "type": "kml", "key": "053naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/053.kml" },
					{ "title": "千葉県旭市", "type": "kml", "key": "054naname1103tohoku", "icon": "183.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/054.kml" }
				]
			},
			{
				"title": "空中写真", "isFolder": true, "key": "1103tohoku_airphoto", "hideCheckbox": true, "expand": false, "legendFunc": "getLibraryLegend_1103tohoku_airphoto",
				"children": [
					{ "title": "青森県　三八地方沿岸（3月13日撮影）", "type": "kml", "key": "001airphoto1103tohoku", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/aomori_kokudo45n.kml" },
					{ "title": "青森県　三八上北地方沿岸（4月5日撮影）", "type": "kml", "key": "002airphoto1103tohoku", "icon": "097.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/aomori_sanrikukaigan0405.kml" },
					{ "title": "岩手県　沿岸北部（3月13日撮影）", "type": "kml", "key": "003airphoto1103tohoku", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/iwate_kokudo45n.kml" },
					{ "title": "岩手県　沿岸南部（3月13日撮影）", "type": "kml", "key": "004airphoto1103tohoku", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/iwate_kokudo45s.kml" },
					{ "title": "岩手県～宮城県　三陸海岸（4月1日撮影）", "type": "kml", "key": "005airphoto1103tohoku", "icon": "080.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/iwate_sanrikukaigan0401.kml" },
					{ "title": "岩手県　三陸海岸（4月5日撮影）", "type": "kml", "key": "006airphoto1103tohoku", "icon": "097.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/iwate_sanrikukaigan0405.kml" },
					{ "title": "宮城県　沿岸北部（3月13日撮影）", "type": "kml", "key": "007airphoto1103tohoku", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/miyagi_kokudo45s.kml" },
					{ "title": "宮城県　石巻市周辺（3月12日撮影）", "type": "kml", "key": "008airphoto1103tohoku", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/miyagi_ishinomaki.kml" },
					{ "title": "宮城県　仙台市周辺（3月12日撮影）", "type": "kml", "key": "009airphoto1103tohoku", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/miyagi_sendai0312.kml" },
					{ "title": "宮城県　仙台市周辺（3月13日撮影）", "type": "kml", "key": "010airphoto1103tohoku", "icon": "082.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/miyagi_sendai0313.kml" },
					{ "title": "宮城県　沿岸南部（3月12日撮影）", "type": "kml", "key": "011airphoto1103tohoku", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/miyagi_kokudo6.kml" },
					{ "title": "宮城県　三陸海岸（3月19日撮影）", "type": "kml", "key": "012airphoto1103tohoku", "icon": "098.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/miyagi_sanrikukaigan0319.kml" },
					{ "title": "福島県　沿岸北部（3月12日撮影）", "type": "kml", "key": "013airphoto1103tohoku", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/fukushima_kokudo6.kml" },
					{ "title": "茨城県　沿岸北部（3月12日撮影）", "type": "kml", "key": "014airphoto1103tohoku", "icon": "081.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/ibaraki0312.kml" },
					{ "title": "茨城県　沿岸南部（3月27日撮影）", "type": "kml", "key": "015airphoto1103tohoku", "icon": "099.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/ibaraki0327.kml" },
				]
			},
			{ "title": "新旧写真比較", "type": "kml", "key": "beforeafter1103tohoku", "icon": "180.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/beforeafter.kml", "legendFunc": "getLibraryLegend_beforeafter" },
			{ "title": "デジタル標高図", "type": "kml", "key": "digelevmap1103tohoku", "icon": "086.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/digelevmap.kml" },
			{ "title": "震央", "type": "kml", "key": "epicenter1103tohoku", "icon": "092.png", "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/epicenter.kml", "legendFunc": "getLibraryLegend_epicenter"},
			{ "title": "東北地方道路規制情報", "type": "kml", "key": "roadRegulation1103tohoku", "icon": false, "path": "http://cyberjapandata.gsi.go.jp/overlay/1103tohoku/roadRegulation.kml", "legendFunc": "getLibraryLegend_roadRegulation" }
		]
	}
];

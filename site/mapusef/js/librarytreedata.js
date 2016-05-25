/**
 * ライブラリタブ内のレイヤーの定義
 */

var libraryTreeData = [
{
	title: "国土地理院", isFolder: true, hideCheckbox: true, expand: true,
	children: [
	{
		title: "観測点", isFolder: true, hideCheckbox: true, expand: true,
		children: [
			{ title: "験潮場", type: "kml", key: "kenchou", icon: "obj_kenchou.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/kenchou.kml" },
			{
				title: "電子基準点", isFolder: true, hideCheckbox: true, expand: false, legendFunc: getLibraryLegend_denshi,
				children: [
					{ title: "北海道", type: "kml", key: "ekijun_01hokkaido", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_01hokkaido.kml" },
					{ title: "青森県", type: "kml", key: "ekijun_02aomori", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_02aomori.kml" },
					{ title: "岩手県", type: "kml", key: "ekijun_03iwate", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_03iwate.kml" },
					{ title: "宮城県", type: "kml", key: "ekijun_04miyagi", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_04miyagi.kml" },
					{ title: "秋田県", type: "kml", key: "ekijun_05akita", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_05akita.kml" },
					{ title: "山形県", type: "kml", key: "ekijun_06yamagata", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_06yamagata.kml" },
					{ title: "福島県", type: "kml", key: "ekijun_07fukushima", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_07fukushima.kml" },
					{ title: "茨城県", type: "kml", key: "ekijun_08ibaraki", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_08ibaraki.kml" },
					{ title: "栃木県", type: "kml", key: "ekijun_09tochigi", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_09tochigi.kml" },
					{ title: "群馬県", type: "kml", key: "ekijun_10gunma", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_10gunma.kml" },
					{ title: "埼玉県", type: "kml", key: "ekijun_11saitama", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_11saitama.kml" },
					{ title: "千葉県", type: "kml", key: "ekijun_12chiba", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_12chiba.kml" },
					{ title: "東京都", type: "kml", key: "ekijun_13tokyo", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_13tokyo.kml" },
					{ title: "神奈川県", type: "kml", key: "ekijun_14kanagawa", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_14kanagawa.kml" },
					{ title: "新潟県", type: "kml", key: "ekijun_15niigata", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_15niigata.kml" },
					{ title: "富山県", type: "kml", key: "ekijun_16toyama", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_16toyama.kml" },
					{ title: "石川県", type: "kml", key: "ekijun_17ishikawa", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_17ishikawa.kml" },
					{ title: "福井県", type: "kml", key: "ekijun_18fukui", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_18fukui.kml" },
					{ title: "山梨県", type: "kml", key: "ekijun_19yamanashi", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_19yamanashi.kml" },
					{ title: "長野県", type: "kml", key: "ekijun_20nagano", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_20nagano.kml" },
					{ title: "岐阜県", type: "kml", key: "ekijun_21gifu", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_21gifu.kml" },
					{ title: "静岡県", type: "kml", key: "ekijun_22shizuoka", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_22shizuoka.kml" },
					{ title: "愛知県", type: "kml", key: "ekijun_23aichi", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_23aichi.kml" },
					{ title: "三重県", type: "kml", key: "ekijun_24mie", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_24mie.kml" },
					{ title: "滋賀県", type: "kml", key: "ekijun_25shiga", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_25shiga.kml" },
					{ title: "京都府", type: "kml", key: "ekijun_26kyoto", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_26kyoto.kml" },
					{ title: "大阪府", type: "kml", key: "ekijun_27oosaka", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_27oosaka.kml" },
					{ title: "兵庫県", type: "kml", key: "ekijun_28hyogo", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_28hyogo.kml" },
					{ title: "奈良県", type: "kml", key: "ekijun_29nara", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_29nara.kml" },
					{ title: "和歌山県", type: "kml", key: "ekijun_30wakayama", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_30wakayama.kml" },
					{ title: "鳥取県", type: "kml", key: "ekijun_31tottori", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_31tottori.kml" },
					{ title: "島根県", type: "kml", key: "ekijun_32shimane", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_32shimane.kml" },
					{ title: "岡山県", type: "kml", key: "ekijun_33okayama", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_33okayama.kml" },
					{ title: "広島県", type: "kml", key: "ekijun_34hiroshima", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_34hiroshima.kml" },
					{ title: "山口県", type: "kml", key: "ekijun_35yamaguchi", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_35yamaguchi.kml" },
					{ title: "徳島県", type: "kml", key: "ekijun_36tokushima", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_36tokushima.kml" },
					{ title: "香川県", type: "kml", key: "ekijun_37kagawa", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_37kagawa.kml" },
					{ title: "愛媛県", type: "kml", key: "ekijun_38ehime", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_38ehime.kml" },
					{ title: "高知県", type: "kml", key: "ekijun_39kouchi", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_39kouchi.kml" },
					{ title: "福岡県", type: "kml", key: "ekijun_40fukuoka", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_40fukuoka.kml" },
					{ title: "佐賀県", type: "kml", key: "ekijun_41saga", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_41saga.kml" },
					{ title: "長崎県", type: "kml", key: "ekijun_42nagasaki", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_42nagasaki.kml" },
					{ title: "熊本県", type: "kml", key: "ekijun_43kumamoto", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_43kumamoto.kml" },
					{ title: "大分県", type: "kml", key: "ekijun_44ooita", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_44ooita.kml" },
					{ title: "宮崎県", type: "kml", key: "ekijun_45miyazaki", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_45miyazaki.kml" },
					{ title: "鹿児島県", type: "kml", key: "ekijun_46kagoshima", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_46kagoshima.kml" },
					{ title: "沖縄県", type: "kml", key: "ekijun_47okinawa", icon: "obj_denshi.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/denshi/ekijun_47okinawa.kml" }
				]
			}
		]
	},
	{
		title: "主題情報", isFolder: true, hideCheckbox: true, expand: true,
		children: [
			{ title: "明治前期の低湿地", type: "map", key: "meijiswale", icon: false, dataset: dataSetOverlay_MeijiSwale, zindex: 279, legendFunc: getLibraryLegend_meijiswale },
			{
				title: "土地条件図", isFolder: true, hideCheckbox: true, expand: false, legendFunc: getLibraryLegend_lcm25k,
				children: [
					{ title: "初期整備版", type: "map", key: "lcm25k", icon: false, dataset: dataSetOverlay_LCM25K, zindex: 275 },
					{ title: "人工地形更新版", type: "map", key: "lcm25k_2011", icon: false, dataset: dataSetOverlay_LCM25K_2011, zindex: 276 }
				]
			},
			{
				title: "火山土地条件図", isFolder: true, hideCheckbox: true, expand: false, isLazy: true, legendFunc: getLibraryLegend_volcano,
				children: [
					{ title: "雌阿寒岳・雄阿寒岳", type: "map", key: "akandake", icon: false, dataset: dataSetOverlay_akandake, zindex: 280 },
					{ title: "十勝岳", type: "map", key: "tokachidake", icon: false, dataset: dataSetOverlay_tokachidake, zindex: 281 },
					{ title: "樽前山", type: "map", key: "tarumaesan", icon: false, dataset: dataSetOverlay_tarumaesan, zindex: 282 },
					{ title: "有珠山", type: "map", key: "usuzan", icon: false, dataset: dataSetOverlay_usuzan, zindex: 283 },
					{ title: "北海道駒ヶ岳", type: "map", key: "komagatake", icon: false, dataset: dataSetOverlay_komagatake, zindex: 284 },
					{ title: "栗駒山", type: "map", key: "kurikomayama", icon: false, dataset: dataSetOverlay_kurikomayama, zindex: 285 },
					{ title: "安達太良山", type: "map", key: "adatarayama", icon: false, dataset: dataSetOverlay_adatarayama, zindex: 286 },
					{ title: "磐梯山", type: "map", key: "bandaisan", icon: false, dataset: dataSetOverlay_bandaisan, zindex: 287 },
					{ title: "伊豆大島", type: "map", key: "izuoshima", icon: false, dataset: dataSetOverlay_izuoshima, zindex: 288 },
					{ title: "三宅島", type: "map", key: "miyakezima", icon: false, dataset: dataSetOverlay_miyakezima, zindex: 289 },
					{ title: "草津白根山", type: "map", key: "kusatsushiranesan", icon: false, dataset: dataSetOverlay_kusatsushiranesan, zindex: 290 },
					{ title: "富士山", type: "map", key: "fujisan", icon: false, dataset: dataSetOverlay_fujisan, zindex: 291 },
					{ title: "御嶽山", type: "map", key: "ontakesan", icon: false, dataset: dataSetOverlay_ontakesan, zindex: 292 },
					{ title: "くじゅう連山", type: "map", key: "kujirenzan", icon: false, dataset: dataSetOverlay_kujirenzan, zindex: 293 },
					{ title: "阿蘇山", type: "map", key: "asosan", icon: false, dataset: dataSetOverlay_asosan, zindex: 294 },
					{ title: "雲仙岳", type: "map", key: "unzendake", icon: false, dataset: dataSetOverlay_unzendake, zindex: 295 },
					{ title: "霧島山", type: "map", key: "kirishimayama", icon: false, dataset: dataSetOverlay_kirishimayama, zindex: 296 },
					{ title: "桜島", type: "map", key: "sakurazima", icon: false, dataset: dataSetOverlay_sakurazima, zindex: 297 },
					{ title: "薩摩硫黄島", type: "map", key: "satsumaiojima", icon: false, dataset: dataSetOverlay_satsumaiojima, zindex: 298 }
				]
			},
			{
				title: "宅地利用動向調査", isFolder: true, hideCheckbox: true, expand: false, isLazy: true,
				children: [
					{
						title: "首都圏", isFolder: true, hideCheckbox: true, expand: false, legendFunc: getLibraryLegend_takudo,
						children: [
							{ title: "2005年", type: "map", key: "capital2005", icon: false, dataset: dataSetOverlay_capital2005, zindex: 310 },
							{ title: "2000年", type: "map", key: "capital2000", icon: false, dataset: dataSetOverlay_capital2000, zindex: 311 },
							{ title: "1994年", type: "map", key: "capital1994", icon: false, dataset: dataSetOverlay_capital1994, zindex: 312 },
							{ title: "1989年", type: "map", key: "capital1989", icon: false, dataset: dataSetOverlay_capital1989, zindex: 313 },
							{ title: "1984年", type: "map", key: "capital1984", icon: false, dataset: dataSetOverlay_capital1984, zindex: 314 },
							{ title: "1979年", type: "map", key: "capital1979", icon: false, dataset: dataSetOverlay_capital1979, zindex: 315 },
							{ title: "1974年", type: "map", key: "capital1974", icon: false, dataset: dataSetOverlay_capital1974, zindex: 316 }
						]
					},
					{
						title: "中部圏", isFolder: true, hideCheckbox: true, expand: false,  legendFunc: getLibraryLegend_takudo,
						children: [
							{ title: "2003年", type: "map", key: "chubu2003", icon: false, dataset: dataSetOverlay_chubu2003, zindex: 320 },
							{ title: "1997年", type: "map", key: "chubu1997", icon: false, dataset: dataSetOverlay_chubu1997, zindex: 321 },
							{ title: "1991年", type: "map", key: "chubu1991", icon: false, dataset: dataSetOverlay_chubu1991, zindex: 322 },
							{ title: "1987年", type: "map", key: "chubu1987", icon: false, dataset: dataSetOverlay_chubu1987, zindex: 323 },
							{ title: "1982年", type: "map", key: "chubu1982", icon: false, dataset: dataSetOverlay_chubu1982, zindex: 324 },
							{ title: "1977年", type: "map", key: "chubu1977", icon: false, dataset: dataSetOverlay_chubu1977, zindex: 325 }
						]
					},
					{
						title: "近畿圏", isFolder: true, hideCheckbox: true, expand: false, legendFunc: getLibraryLegend_takudo,
						children: [
							{ title: "2008年", type: "map", key: "kinki2008", icon: false, dataset: dataSetOverlay_kinki2008, zindex: 330 },
							{ title: "2001年", type: "map", key: "kinki2001", icon: false, dataset: dataSetOverlay_kinki2001, zindex: 331 },
							{ title: "1996年", type: "map", key: "kinki1996", icon: false, dataset: dataSetOverlay_kinki1996, zindex: 332 },
							{ title: "1991年", type: "map", key: "kinki1991", icon: false, dataset: dataSetOverlay_kinki1991, zindex: 333 },
							{ title: "1985年", type: "map", key: "kinki1985", icon: false, dataset: dataSetOverlay_kinki1985, zindex: 334 },
							{ title: "1979年", type: "map", key: "kinki1979", icon: false, dataset: dataSetOverlay_kinki1979, zindex: 335 },
							{ title: "1974年", type: "map", key: "kinki1974", icon: false, dataset: dataSetOverlay_kinki1974, zindex: 336 }
						]
					}
				]
			}
		]
	},
	{
		title: "地図", isFolder: true, hideCheckbox: true, expand: true,
		children: [
			{ title: "色別標高図", type: "map", key: "relief", icon: false, dataset: dataSet_Relief, zindex: 215, legendFunc: getLibraryLegend_relief }
		]
	},
	{
		title: "写真(拡大すると表示されます)", isFolder: true, hideCheckbox: true, expand: true, legendFunc: getLibraryLegend_photo,
		children: [
			{ title: "最新（2007年～）", type: "map", key: "y2k7", icon: "photo.png", dataset: dataSetOverlay_Y2K7, zindex: 250 },
			{ title: "1988～90年", type: "map", key: "yk88", icon: "photo.png", dataset: dataSetOverlay_YK88, zindex: 255 },
			{ title: "1984～87年", type: "map", key: "yk84", icon: "photo.png", dataset: dataSetOverlay_YK84, zindex: 260 },
			{ title: "1979～83年", type: "map", key: "yk79", icon: "photo.png", dataset: dataSetOverlay_YK79, zindex: 265 },
			{ title: "1974～78年", type: "map", key: "yk74", icon: "photo.png", dataset: dataSetOverlay_YK74, zindex: 270 }
		]
	}]
},
{
	title: "他の機関(イメージ・サンプル)", isFolder: true, hideCheckbox: true, expand: true,
	children: [
	{
		title: "気象庁(サンプル)", isFolder: true, hideCheckbox: true, expand: true,
		children: [
			{ title: "東日本大震災の震度分布(茨城県)", type: "kml", key: "shindo", icon: "5+.png", path: "http://portal.cyberjapan.jp/site/mapuse4/kml/shindo.kml" }
		]
	}]
}];

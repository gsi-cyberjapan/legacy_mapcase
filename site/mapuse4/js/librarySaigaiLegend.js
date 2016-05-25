// 災害用
legendFuncObj.getLibraryLegend_saigaiTemp = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var volvano_legend = "";
	switch(dtnode.data.key){
	case 'izuoshima_kihon2':
		volvano_legend = "legend/legend_vbm22izuoshima.png";
		break;
	case 'izuoshima_kihon3':
		volvano_legend = "legend/legend_vbm22izuoshima.png";
		break;
	case 'izuoshima2':
		volvano_legend = "legend/l_vlcd_13izuo.jpg";
		break;
	}

	if (volvano_legend){
		volvano_legend = createPopupLink(volvano_legend, '凡例') + "<br/>";
		$("#plugin_library_legend" + pluginID)[0].innerHTML = volvano_legend +
		createPopupLink('http://www1.gsi.go.jp/geowww/Volcano/volcano.html', '解説') + "<br/><br/>(c)国土地理院";
	} else {
		$("#plugin_library_legend" + pluginID)[0].innerHTML = "(c)国土地理院";
	}
};

// 火山基本図(伊豆大島)
legendFuncObj.getLibraryLegend_volcano_kihon = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var legend = "";
	switch(dtnode.data.key){
	case 'izuoshima_kihon':
		legend = "legend/legend_vbm22izuoshima.png";
		break;
	}

	if (legend) legend = createPopupLink(legend, '凡例') + "<br/>";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = legend +
		createPopupLink('http://www1.gsi.go.jp/geowww/Volcano/volcano.html', '解説') + "<br/><br/>(c)国土地理院";
};

// 平成23年台風12号による大雨
legendFuncObj.getLibraryLegend_1109typhoon12 = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<a href='http://saigai.gsi.go.jp/2011typhoon12/pdf/info.xls' target='_blank'>一覧表をダウンロード（Excel形式）</a>" + "<br/><br/>(c)国土地理院";
};

// 平成23年台風12号による大雨_情報収集
legendFuncObj.getLibraryLegend_1109typhoon12_shushu = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"一部不明瞭な情報を含みます。また、記号はおおよその位置を示しています。<br/><br/>" +
		"<a href='http://saigai.gsi.go.jp/2011typhoon12/pdf/info.xls' target='_blank'>一覧表をダウンロード（Excel形式）</a>" + "<br/><br/>(c)国土地理院";
};

// 東北地方太平洋沖地震_斜め写真
legendFuncObj.getLibraryLegend_1103tohoku_naname = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<img src='http://saigai.gsi.go.jp/20110311eqObliquePhoto/icon/mobile002.bmp' width='15' height='15'>は、平成24年4月1日に追加した南相馬市～いわき市沿岸の撮影画像です。<br/><br/>" +
		"<img src='http://saigai.gsi.go.jp/20110311eqObliquePhoto/icon/mobile001.bmp' width='15' height='15'>は、平成24年3月31日以前の撮影画像です。" + "<br/><br/>(c)国土地理院";
};

// 東北地方太平洋沖地震_空中写真
legendFuncObj.getLibraryLegend_1103tohoku_airphoto = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"photoURLのリンクをクリックすると、空中写真が見られます。" + "<br/><br/>(c)国土地理院";
};

// 東北地方太平洋沖地震_新旧写真比較
legendFuncObj.getLibraryLegend_beforeafter = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"photoURLのリンクをクリックすると、別画面で、新旧画像を比較することができます。" + "<br/><br/>" +
		"別画面において、画像中央の縦棒をドラッグすると、被災前後の画像をずらして見ることが出来ます。" + "<br/><br/>" +
		"別画面の上方が写真と写真の比較で、下方が地図と写真の比較です。" + "<br/><br/>(c)国土地理院";
};

// 東北地方太平洋沖地震_地殻変動量
legendFuncObj.getLibraryLegend_geje = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink("legend/geje-chikaku_legend.html", '凡例') + "<br/><br/>" +
		"水準測量作業を実施した結果、2011年3月11日の東日本大震災（東北地方太平洋沖地震）に伴う詳細な地殻変動量（上下方向）が確認されました。<br/><br/>" +
		"※ただし、地殻変動量には、地震前までに蓄積していた地殻変動、及び地震後の余効変動等を含みます。" + "<br/><br/>(c)国土地理院";
};

// 東北地方太平洋沖地震_震央
legendFuncObj.getLibraryLegend_epicenter = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"＊電子基準点で検出した地殻変動情報は<a href='http://www.gsi.go.jp/chibankansi/chikakukansi_tohoku.html' target='_blank'>こちら</a><br/>" +
		"＊電子基準点データ解析による震源断層モデル(暫定)は<a href='http://www.gsi.go.jp/cais/topic110313-index.html' target='_blank'>こちら</a><br/>" +
		"＊電子基準点データ解析による滑り分布モデル(地震時，暫定)は<a href='http://www.gsi.go.jp/cais/topic110314.2-index.html' target='_blank'>こちら</a><br/>" +
		"＊電子基準点データ解析による滑り分布モデル(地震後，暫定)は<a href='http://www.gsi.go.jp/cais/topic110314-index.html' target='_blank'>こちら</a>" + "<br/><br/>(c)国土地理院";
};

// 東北地方太平洋沖地震_東北地方道路規制情報
legendFuncObj.getLibraryLegend_roadRegulation = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var now = new Date();
	var nYear = now.getFullYear();
	var nMonth = now.getMonth() + 1;
	var nDate = now.getDate();

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink("legend/1103tohoku_roadRegulation_legend.png", '凡例') + "<br/><br/>" +
		"【2014/3/20　9:00時点情報】<br/>" +
		nYear + "/" + nMonth + "/" + nDate +  "現在情報の変更はありません<br/><br/>" +
		"道路規制情報は、各道路管理者の公表資料を基に作成しています。<br/><br/>" +
		"東北地方整備局　<a href='http://road.thr.mlit.go.jp/index.html' target='_blank'>道路情報提供システム</a><br/>" +
		"岩手県　　<a href='http://www.douro.com/' target='_blank'>道路情報提供サービス</a><br/>" +
		"宮城県　　<a href='http://www.pref.miyagi.jp/road/kiseinow.htm' target='_blank'>道路規制情報</a><br/>" +
		"福島県　　<a href='http://www.pref.fukushima.jp/douro/kisei/kisei-list.htm' target='_blank'>道路総室</a><br/>" +
		"NEXCO東日本　　<a href='http://www.e-nexco.co.jp/pressroom/press_release/tohoku/' target='_blank'>東北支社プレスリリース</a>" + "<br/><br/>(c)国土地理院";
};

// 西之島付近噴火活動
legendFuncObj.getLibraryLegend_nishinoshima = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title + " - " + dtnode.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	switch(dtnode.data.key){
	case 'lsi1311nishinoshima':
	case 'lsi1311nishinoshima2':
	case 'lsi1311nishinoshima3':
	case 'lsi1311nishinoshima4':
	case 'lsi1311nishinoshima5':
	case 'lsi1311nishinoshima6':
	case 'lsi1311nishinoshima7':
	case '20140821lsi':
	case '20140906lsi':
	case '20141008lsi':

	case 'nishinoshima_2014_10_24':
	case '20141125lsi':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"Landsat8画像（GSI, TSIC, GEO Grid/AIST)";
		break;
	default:
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"海上保安庁撮影の空中写真を使用。<br/><br/>" +
		"背景地図は平成3年時点のもの。";
	}
};

// 西之島付近噴火活動_海岸線（地理院特定_2009ALOS画像より）
legendFuncObj.getLibraryLegend_nishinoshima_2009alos = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"2009年2月24日にJAXAの衛星「だいち」で撮影された三方向視の画像を使用し、その位置については現在の地図をもとにして作成したものです。";
};

// 西之島付近噴火活動_新島海岸線
legendFuncObj.getLibraryLegend_nishinoshima_shintou = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title + " - " + dtnode.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	switch(dtnode.data.key){
	case 'coastline1311nishinoshima_1121':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"海上保安庁撮影の空中写真と、東大地震研究所金子隆之助教撮影の空中写真を使用。";
		break;
	case 'handoku1311nishinoshima':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<font color='red'>正射画像2013.12.4 と合わせてご覧下さい。</font>";
		break;
	case 'handoku1311nishinoshima2':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<font color='red'>正射画像2013.12.17 と合わせてご覧下さい。</font>";
		break;
	case 'handoku1311nishinoshima3':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<font color='red'>正射画像2014.2.16 と合わせてご覧下さい。</font>";
		break;
	case 'handoku1311nishinoshima4':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<font color='red'>正射画像2014.3.22 と合わせてご覧下さい。</font>";
		break;
	case 'handoku1311nishinoshima_20140704dol2':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<font color='red'>正射画像2014.7.4 と合わせてご覧下さい。</font>";
		break;

	default:
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"海上保安庁撮影の空中写真を使用。";
	}
};

// 西之島汎用
legendFuncObj.getLibraryLegend_nishinoshimaTemp = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title + " - " + dtnode.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	var legend = dtnode.data.noLegend ? "" : "(c)国土地理院";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = legend;
};

// 西之島その他
legendFuncObj.getLibraryLegend_nishinoshimaElse = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = "(c)国土地理院";
};

//	西之島付近噴火活動_斜め写真（海上保安庁）
legendFuncObj.getLibraryLegend_nishinoshima_shintou_naname = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title + " - " + dtnode.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	switch(dtnode.data.key){
	case 'naname1311nishinoshima3':
		$("#plugin_library_legend" + pluginID)[0].innerHTML =		"協力：（株）エアフォートサービス";
		break;
	default:
		$("#plugin_library_legend" + pluginID)[0].innerHTML =	"";
		break;
	}
};

//	8月16日からの大雨
legendFuncObj.getLibraryLegend_suichoku1408ooame_tanba = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<br/>一部、雲の障害があります" + "<br/><br/>(c)国土地理院";
};

//8月16日からの大雨 「土砂流出箇所」丹波
legendFuncObj.getLibraryLegend_suichoku1408ooame_tanba_2 = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<br/>8月19日撮影垂直写真及び斜め写真の範囲から土砂流出範囲を判読したものです。" + "<br/><br/>(c)国土地理院";
};

//8月16日からの大雨 「写真判読図(8/20)」
legendFuncObj.getLibraryLegend_genchi1408ooame_hiroshima = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<br/>8月20日・21日撮影斜め写真の範囲から土砂流出範囲を判読したものです。" + "<br/><br/>(c)国土地理院";
};

//土地条件図
legendFuncObj.getLibraryLegend_lcm25k = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	switch (dtnode.data.key) {
	case "lcm25k":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('legend/LCM_hanrei.png', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_index.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "lcm25k_2011":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('legend/LCM_2011_hanrei.jpg', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_index.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "lcm25k_2012":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('legend/lcm25k_2012/lc_legend.html', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_cd25000.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "LCM25K_2012_2":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('legend/lcm25k_2012/lc_legend.html', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_cd25000.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	}
};
//土地条件図

//8月16日からの大雨 「写真判読図(8/28垂直写真)」
legendFuncObj.getLibraryLegend_genchi1408ooame_hiroshima2 = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<br/>8月28日撮影垂直写真のうち雲の影響のない部分を対象として、土砂の流出が確認できる範囲を判読したものです。" + "<br/><br/>(c)国土地理院";
};

//8月16日からの大雨 「写真判読図(8/30・31垂直写真)」
legendFuncObj.getLibraryLegend_genchi1408ooame_hiroshima3 = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"<br/>8月28・30・31日撮影垂直写真のうち雲の影響のない部分を対象として、土砂の流出が確認できる範囲を判読したものです。" + "<br/><br/>(c)国土地理院";
};

//8月16日からの大雨  垂直写真（8/30）
legendFuncObj.getLibraryLegend_suichoku1408ooame_hiroshima2 = function(dtnode, pluginID)
{
$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

$("#plugin_library_legend" + pluginID)[0].innerHTML =
	"";
};

//御嶽山噴火活動
legendFuncObj.getLibraryLegend_1409ontake = function(dtnode, pluginID)
{
$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

switch (dtnode.data.key) {
	case "20140929dol2":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			"航空機SAR画像(9/29)のレーダー照射方向は南から北方向";
		break;
	case "20140930dol":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			"航空機SAR画像(9/30)のレーダー照射方向は南西から北東方向";
		break;
	case "sar1409ontake":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			"凡例　赤：火口　黄色：推定される火口";
		break;
	case "201408180929sar1409ontake":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			"衛星:ALOS-2<br/>" +
			"軌道方向:北行(A)<br/>" +
			"観測モード:高分解能(3m)<br/>" +
			"入射角:53°<br/>" +
			"偏波:HH<br/>" +
			"垂直基線長:+97m<br/>" +
			createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + "<br/>" +
			"解析:国土地理院<br/>" +
			"原初データ所有:JAXA<br/>" +
			"本成果は、火山噴火予知連絡会衛星解析グループの活動による";
		break;
	case "20140818d_mag_ontake":
	case "20140929d_mag_ontake":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			"衛星:ALOS-2<br/>" +
			"軌道方向:北行(A)<br/>" +
			"観測モード:高分解能(3m)<br/>" +
			"入射角:53°<br/>" +
			"偏波:HH<br/>" +
			"原初データ所有:JAXA<br/>" +
			"本成果は、火山噴火予知連絡会衛星解析グループの活動による";
		break;
	case "201408221003sar1409ontake":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			"衛星:ALOS-2<br/>" +
			"軌道方向:北行(A)<br/>" +
			"観測モード:高分解能(3m)<br/>" +
			"入射角:36°<br/>" +
			"偏波:HH<br/>" +
			"垂直基線長:-6m<br/>" +
			createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + "<br/>" +
			"解析:国土地理院<br/>" +
			"原初データ所有:JAXA<br/>" +
			"本成果は、火山噴火予知連絡会衛星解析グループの活動による";
}
};

//1411長野県北部地震
legendFuncObj.getLibraryLegend_1411nagano = function(dtnode, pluginID)
{
$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

switch (dtnode.data.key) {
	case "denshi1411nagano":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://www.gsi.go.jp/WNEW/PRESS-RELEASE/chikakukansi_nagano20141122.html', '報道発表資料（平成26年（2014年）11月22日22時08分頃の長野県北部の地震に伴う地殻変動について）');
		break;
}
};


//		長野県北部地震		干渉SAR レジェンド作成
legendFuncObj.getLibraryLegend_SAR_NorthNaganoEQ = function(dtnode, pluginID)
{

	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";


	if( dtnode.data.key == 'BUILD_NGN__http2014.09.29-2014.11.24' )
	{
		$("#plugin_library_legend" + pluginID)[0].innerHTML 			=

			 	"<TABLE>"
			+ 	"<TR><TD>衛星</TD>		<TD>:　</TD><TD>ALOS-2</TD></TR>"
			+ 	"<TR><TD>軌道方向</TD>		<TD>:　</TD><TD>南行</TD></TR>"
			+ 	"<TR><TD>観測方向</TD>		<TD>:　</TD><TD>右</TD></TR>"
			+ 	"<TR><TD>観測モード</TD>	<TD>:　</TD><TD>UBS-UBS</TD></TR>"
			+ 	"<TR><TD>入射角</TD>		<TD>:　</TD><TD>62°</TD></TR>"
			+ 	"<TR><TD>偏波</TD>		<TD>:　</TD><TD>HH</TD></TR>"
			+ 	"<TR><TD>垂直基線長</TD>	<TD>:　</TD><TD>+149m</TD></TR>"


			+ 	"</TD></TR></TABLE><BR/>"
				+	createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例')
				+ "<br/>" +	"	解析:　国土地理院<br/>" +	"原初データ所有:　JAXA<BR/>本成果は、地震予知連絡会SAR解析ワーキンググループの活動による";
	}
	else	if( dtnode.data.key == 'BUILD_NGN__http2014.09.30-2014.11.25' )
	{
		$("#plugin_library_legend" + pluginID)[0].innerHTML 			=

			 	"<TABLE>"
			+ 	"<TR><TD>衛星</TD>		<TD>:　</TD><TD>ALOS-2</TD></TR>"
			+ 	"<TR><TD>軌道方向</TD>		<TD>:　</TD><TD>南行</TD></TR>"
			+ 	"<TR><TD>観測方向</TD>		<TD>:　</TD><TD>右</TD></TR>"
			+ 	"<TR><TD>観測モード</TD>	<TD>:　</TD><TD>UBS-UBS</TD></TR>"
			+ 	"<TR><TD>入射角</TD>		<TD>:　</TD><TD>41°</TD></TR>"
			+ 	"<TR><TD>偏波</TD>		<TD>:　</TD><TD>HH</TD></TR>"
			+ 	"<TR><TD>垂直基線長</TD>	<TD>:　</TD><TD>+6m</TD></TR>"


			+ 	"</TD></TR></TABLE><BR/>"
				+	createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例')
				+ "<br/>" +	"	解析:　国土地理院<br/>" +	"原初データ所有:　JAXA<BR/>本成果は、地震予知連絡会SAR解析ワーキンググループの活動による";
	}
	else	if( dtnode.data.key == 'BUILD_NGN__http2014.10.14-2014.11.25' )
	{
		$("#plugin_library_legend" + pluginID)[0].innerHTML 			=

			 	"<TABLE>"
			+ 	"<TR><TD>衛星</TD>		<TD>:　</TD><TD>ALOS-2</TD></TR>"
			+ 	"<TR><TD>軌道方向</TD>		<TD>:　</TD><TD>南行</TD></TR>"
			+ 	"<TR><TD>観測方向</TD>		<TD>:　</TD><TD>右</TD></TR>"
			+ 	"<TR><TD>観測モード</TD>	<TD>:　</TD><TD>UBS-UBS</TD></TR>"
			+ 	"<TR><TD>入射角</TD>		<TD>:　</TD><TD>41°</TD></TR>"
			+ 	"<TR><TD>偏波</TD>		<TD>:　</TD><TD>HH</TD></TR>"
			+ 	"<TR><TD>垂直基線長</TD>	<TD>:　</TD><TD>-83m</TD></TR>"


			+ 	"</TD></TR></TABLE><BR/>"
				+	createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例')
				+ "<br/>" +	"	解析:　国土地理院<br/>" +	"原初データ所有:　JAXA<BR/>本成果は、地震予知連絡会SAR解析ワーキンググループの活動による";
	}
	else	if( dtnode.data.key == 'BUILD_NGN__http2014.10.02-2014.11.27' )
	{
		$("#plugin_library_legend" + pluginID)[0].innerHTML 			=

			 	"<TABLE>"
			+ 	"<TR><TD>衛星</TD>		<TD>:　</TD><TD>ALOS-2</TD></TR>"
			+ 	"<TR><TD>軌道方向</TD>		<TD>:　</TD><TD>南行</TD></TR>"
			+ 	"<TR><TD>観測方向</TD>		<TD>:　</TD><TD>左</TD></TR>"
			+ 	"<TR><TD>観測モード</TD>	<TD>:　</TD><TD>UBS-UBS</TD></TR>"
			+ 	"<TR><TD>入射角</TD>		<TD>:　</TD><TD>37°</TD></TR>"
			+ 	"<TR><TD>偏波</TD>		<TD>:　</TD><TD>HH</TD></TR>"
			+ 	"<TR><TD>垂直基線長</TD>	<TD>:　</TD><TD>+6m</TD></TR>"


			+ 	"</TD></TR></TABLE><BR/>"
				+	createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例')
				+ "<br/>" +	"	解析:　国土地理院<br/>" +	"原初データ所有:　JAXA<BR/>本成果は、地震予知連絡会SAR解析ワーキンググループの活動による";
	}
};



//	長野県北部地震		余震震源分布(11/23現在)
legendFuncObj.getLibraryLegend_Yoshin_NorthNaganoEQ = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";


	{
		$("#plugin_library_legend" + pluginID)[0].innerHTML 			=

			 	"補足説明"
			+ 	"<BR/>"
			+ 	"震源決定には気象庁、独立行政法人防災科学技術研究所、北海道大学、弘前大学、東北大学、東京大学、名古屋大学、京都大学、高知大学、九州大学、鹿児島大学、独立行政法人産業総合研究所、国土地理院、青森県、東京都、静岡県、神奈川県温泉地学研究所、横浜市、独立行政法人海洋研究開発機構、およびIRISの観測点のデータを使用しています。"
			+ 	"<BR/>"
			+ 	"震源位置やマグニチュードは暫定値であり、変更になる場合があります。  "
			+ 	"<BR/>"
			+ 	"詳細な震源データ（暫定値）については<BR/>"
			+	createPopupLink('http://www.data.jma.go.jp/svd/eqev/data/daily_map/20141123.html', '気象庁のHP')
			+ 	"<BR/>をご覧ください。";

	}
};

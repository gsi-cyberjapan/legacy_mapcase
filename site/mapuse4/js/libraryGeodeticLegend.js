// 電子基準点
legendFuncObj.getLibraryLegend_denshi = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML = "(c)国土地理院";
};

// 験潮場（海岸昇降検知センター）
legendFuncObj.getLibraryLegend_kenchou = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =//createPopupLink('./legend_kenchou.html', '凡例') +
		"＜海岸昇降検知センター登録験潮場＞<br/>国土地理院、気象庁、海上保安庁、国交省等の験潮場<br/>験潮記録から地殻変動を検知しています<br/><br/>" +
		"<img src='sys/v4/symbols/mark1_s.png' alt='国土地理院'>　国土地理院<br/><img src='sys/v4/symbols/mark2_s.png' alt='気象庁'>　気象庁<br/><img src='sys/v4/symbols/mark3_s.png' alt='海上保安庁'>　海上保安庁<br/><img src='sys/v4/symbols/mark4_s.png' alt='その他'>　その他";
};

//観測を強化している地域の地殻変動
legendFuncObj.getLibraryLegend_kansokukyouka = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		 "<b>測量方法</b><br/><img src='sys/v4/symbols/097.png' alt='測距' width='15' height='15'>　測距<span style='vertical-align:super;font-size:0.8em;'>※1</span><br/><img src='http://www.gsi.go.jp/common/000079136.bmp' alt='水準' width='15' height='15'>　水準<span style='vertical-align:super;font-size:0.8em;'>※2</span><br/><img src='sys/v4/symbols/099.png' alt='重力' width='15' height='15'>　重力<span style='vertical-align:super;font-size:0.8em;'>※3</span><br/><p style='text-indent:-2em;padding-left:2em;'><img src='sys/v4/symbols/105.png' alt='火山' width='15' height='15'>　火山（水準、GNSS<span style='vertical-align:super;font-size:0.8em;'>※4</span>、重力、地磁気<span style='vertical-align:super;font-size:0.8em;'>※5</span>、干渉SAR<span style='vertical-align:super;font-size:0.8em;'>※6</span>）</p>"
		+"<br/>地震・火山噴火の調査研究のために地殻変動等の監視を強化している地区。<br/>その地域の特徴を考慮した測量手法で観測。"
		+"<br/><br/>(c)国土地理院";
};

// 磁気図2010.0年値
legendFuncObj.getLibraryLegend_chijiki = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var blackLine ="";
	var whiteLine ="";
	var title = dtnode.data.title.replace(/図/g, "");
	if(dtnode.data.key=='chijikiD'){
		title = "偏角";
	}

	switch(dtnode.data.key){
		case 'chijikiD':
		case 'chijikiI':
			blackLine = "1度";
			whiteLine = "12分";
			break;
		case 'chijikiF':
		case 'chijikiH':
		case 'chijikiZ':
			blackLine = "1000nT";
			whiteLine = "100nT";
			break;
	}
	var legend_str = "2010年1月1日における、"+title+"の分布を図に表したものです。";
	if(dtnode.data.key=='chijikiD')	{
		legend_str += "<br/>拡大すると2次メッシュに対応した偏角値（偏角一覧図）が確認できます。";
	}
	legend_str += "<br/><br/>＜凡例＞<br/>黒線 ： "+blackLine+"ごと<br/>白線 ： "+whiteLine+"ごと";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = legend_str;
};

//干渉SAR
legendFuncObj.getLibraryLegend_SAR = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.parent.data.title + " - " +dtnode.parent.parent.data.title ;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.parent.data.title + "," + dtnode.data.title + ")";

	switch(dtnode.data.key) {
		case 'eq20070621':
			$("#plugin_library_legend" + pluginID)[0].innerHTML =
				"軌道方向:" +
				"観測モード:FBD-FBD<br/>" +
				"オフナディア角:34.3°<br/>" +
				"偏波:HH<br/>" +
				"パス番号:402<br/>" +
				"フレーム番号:760<br/>" +
				"垂直基線長:+181m<br/>" +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +
				"解析:国土地理院<br/>" +
				"原初データ所有:JAXA/METI";
			break;
		case 'eq20070806':
			$("#plugin_library_legend" + pluginID)[0].innerHTML =
				"軌道方向:" +
				"観測モード:FBD-FBS<br/>" +
				"オフナディア角:34.3°<br/>" +
				"偏波:HH<br/>" +
				"パス番号:402<br/>" +
				"フレーム番号:760<br/>" +
				"垂直基線長:-605m<br/>" +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +
				"解析:国土地理院<br/>" +
				"原初データ所有:JAXA/METI";
			break;
		case 'eq20090603':
			$("#plugin_library_legend" + pluginID)[0].innerHTML =
				"軌道方向:南行(D)<br/>" +
				"観測モード:FBS-FBS<br/>" +
				"オフナディア角:34.3°<br/>" +
				"偏波:HH<br/>" +
				"パス番号:57<br/>" +
				"フレーム番号:2840<br/>" +
				"垂直基線長:-238m<br/>" +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +
				"解析:国土地理院<br/>" +
				"原初データ所有:JAXA/METI";
			break;
		case 'eq20100514':
			$("#plugin_library_legend" + pluginID)[0].innerHTML =
				"軌道方向:北行(A)<br/>" +
				"観測モード:FBS-FBD<br/>" +
				"オフナディア角:34.3°<br/>" +
				"偏波:HH<br/>" +
				"パス番号:402<br/>" +
				"フレーム番号:760<br/>" +
				"垂直基線長:+869m<br/>" +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +
				"解析:国土地理院<br/>" +
				"原初データ所有:JAXA/METI";
			break;
		default:
			$("#plugin_library_legend" + pluginID)[0].innerHTML =
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + "<br/>" +
				createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/><br/>(c)国土地理院";
	};
};





//干渉SAR 地震
legendFuncObj.getLibraryLegend_SAR_EQ = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.parent.data.title + " - " +dtnode.parent.parent.data.title ;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.parent.data.title + "," + dtnode.data.title + ")";


	if( dtnode.data.key == 'sar_earthquake_dam' )
	{
		$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
		$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
		$("#plugin_library_legend" + pluginID)[0].innerHTML = "";
	}
	else if( dtnode.data.key == 'BUILD_IMI__http2010.07.22-2010.10.22' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "南行（D）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "57"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "2840"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+660m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2010.06.29-2010.09.29' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBD-FBD"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+710m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2010.05.14-2010.09.29' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBD"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+869m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2010.07.22-2010.09.06' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "南行（D）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "57"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "2840"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+350m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2010.06.06-2010.07.22' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "南行（D）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "57"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "2840"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+11m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2010.05.14-2010.06.29' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBD"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+158m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2008.06.23-2009.09.26' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBD"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-268m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2009.06.03-2009.09.03' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "南行（D）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "57"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "2840"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-238m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2008.07.16-2009.09.03' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "南行（D）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "57"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "2840"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-172m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2008.06.23-2009.06.26' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-626m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2007.08.29-2008.07.16' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "南行（D）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBS-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "57"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "2840"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-765m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2007.08.06-2008.06.23' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBD-FBS"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-605m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2007.08.06-2007.09.21' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBD-FBD"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "-108m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }
	else if( dtnode.data.key == 'BUILD_IMI__http2007.06.21-2007.09.21' )  {$("#plugin_library_legend" + pluginID)[0].innerHTML ="<TABLE><TR><TD>軌道方向</TD><TD>:　</TD><TD>" + "北行（A）"+"</TD></TR><TR><TD>観測モード:　</TD><TD>:　</TD><TD>" + "FBD-FBD"+"</TD></TR><TR><TD>オフナディア角</TD><TD>:　</TD><TD>" + "34.3°"+"</TD></TR><TR><TD>偏波</TD><TD>:　</TD><TD>" + "HH"+"</TD></TR><TR><TD>パス番号</TD><TD>:　</TD><TD>" + "402"+"</TD></TR><TR><TD>フレーム番号:　</TD><TD>:　</TD><TD>" + "760"+"</TD></TR><TR><TD>垂直基線長:　</TD><TD>:　</TD><TD>" + "+181m" + "</TD></TR></TABLE><BR/>" +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/mechanism/interpretation.html', '凡例') + " " +createPopupLink('http://vldb.gsi.go.jp/sokuchi/sar/result/data_routine.html', '解説') + "<br/>" +"解析:　国土地理院<br/>" +"原初データ所有:　JAXA/METI"; }

};

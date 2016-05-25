// 写真
legendFuncObj.getLibraryLegend_photo =  function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = "写真";
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	var link = "";
	switch(dtnode.data.key){
	case 'y2k7':
		link = "http://www.gsi.go.jp/gazochosa/gazochosa40001.html";
		break;
	case 'yk88':
	case 'yk84':
	case 'yk79':
	case 'yk74':
		link = "http://www.gsi.go.jp/johofukyu/kani_ortho_1.html";
		break;
	}

	if (link) link = createPopupLink(link, '関連情報') + "<br/><br/>(c)国土地理院";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = link;
};

// 色別標高図
legendFuncObj.getLibraryLegend_relief = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('site/mapuse4/attension_relief.html', '凡例') + "<br/><br/>(c)国土地理院";
};

// 都市圏活断層図
legendFuncObj.getLibraryLegend_FM = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://www.gsi.go.jp/common/000084060.pdf', '凡例') + "<br/>" +
		createPopupLink('http://www.gsi.go.jp/bousaichiri/guidebook.html', '解説') + "<br/><br/>" +
		"(c)国土地理院";
};

// 明治前期の低湿地
legendFuncObj.getLibraryLegend_meijiswale = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://cyberjapan.jp/legend/SWALE_hanrei.pdf', '凡例') + "<br/>" +
		createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_meiji.html', '解説') + "<br/><br/>(c)国土地理院";
};

// 20万分1土地利用図
legendFuncObj.getLibraryLegend_LUM200K = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://cyberjapan.jp/legend/lum200k_legend.jpg', '凡例') + "<br/>" +
		createPopupLink('http://www1.gsi.go.jp/geowww/LandUse/lum-200k.html', '解説') + "<br/><br/>(c)国土地理院";
};

// 土地条件図
legendFuncObj.getLibraryLegend_lcm25k = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	switch (dtnode.data.key) {
	case "lcm25k":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/LCM_hanrei.png', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_index.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "lcm25k_2011":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/LCM_2011_hanrei.jpg', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_index.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "lcm25k_2012":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/lcm25k_2012/lc_legend.html', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_cd25000.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "LCM25K_2012_2":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/lcm25k_2012/lc_legend.html', '凡例') + "<br/>" +
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_cd25000.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	}
};


// 沿岸海域土地条件図
legendFuncObj.getLibraryLegend_CCM = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	switch (dtnode.data.key) {
	case "ccm1":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/CCM1_hanrei.pdf', '凡例') + "<br/>" +
			createPopupLink('http://www1.gsi.go.jp/geowww/coastmap/index2.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "ccm2":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/CCM2_hanrei.pdf', '凡例') + "<br/>" +
			createPopupLink('http://www1.gsi.go.jp/geowww/coastmap/index2.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	}
};

legendFuncObj.getLibraryLegend_vbmc = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var legend = "";
	switch(dtnode.data.key){
		case 'vbm01meakan' : legend = "http://cyberjapan.jp/legend/l_vbm_meakan.jpg"; break;
		case 'vbm02tokachi' : legend = "http://cyberjapan.jp/legend/l_vbm_tokachi.jpg"; break;
		case 'vbm03tarumae' : legend = "http://cyberjapan.jp/legend/l_vbm_tarumae.jpg"; break;
		case 'vbm04usu' : legend = "http://cyberjapan.jp/legend/l_vbm_usu.jpg"; break;
		case 'vbm05hokkaidokoma' : legend = "http://cyberjapan.jp/legend/l_vbm_hokkaidokoma.jpg"; break;
		case 'vbm06iwaki' : legend = "http://cyberjapan.jp/legend/l_vbm_iwaki.jpg"; break;
		case 'vbm07akitayake' : legend = "http://cyberjapan.jp/legend/l_vbm_akitayake.jpg"; break;
		case 'vbm08iwate' : legend = "http://cyberjapan.jp/legend/l_vbm_iwate.jpg"; break;
		case 'vbm09kurikoma' : legend = "http://cyberjapan.jp/legend/l_vbm_kurikoma.jpg"; break;
		case 'vbm10akitakoma' : legend = "http://cyberjapan.jp/legend/l_vbm_akitakoma.jpg"; break;
		case 'vbm11chokai' : legend = "http://cyberjapan.jp/legend/l_vbm_chokai.jpg"; break;
		case 'vbm12zao' : legend = "http://cyberjapan.jp/legend/l_vbm_zao.jpg"; break;
		case 'vbm13azuma' : legend = "http://cyberjapan.jp/legend/l_vbm_azuma.jpg"; break;
		case 'vbm14adatara' : legend = "http://cyberjapan.jp/legend/l_vbm_adatara.jpg"; break;
		case 'vbm15bandai' : legend = "http://cyberjapan.jp/legend/l_vbm_bandai.jpg"; break;
		case 'vbm16nasu' : legend = "http://cyberjapan.jp/legend/l_vbm_nasu.jpg"; break;
		case 'vbm17kusatsushirane' : legend = "http://cyberjapan.jp/legend/l_vbm_kusatsushirane.jpg"; break;
		case 'vbm18asama' : legend = "http://cyberjapan.jp/legend/l_vbm_asama.jpg"; break;
		case 'vbm19hakone' : legend = "http://cyberjapan.jp/legend/l_vbm_hakone.jpg"; break;
		case 'vbm20fuji' : legend = "http://cyberjapan.jp/legend/l_vbm_fuji.jpg"; break;
		case 'vbm21eastizu' : legend = "http://cyberjapan.jp/legend/l_vbm_higashiizu.jpg"; break;
		case 'vbm22izuoshima' : legend = "http://cyberjapan.jp/legend/l_vbm_izuoshima.jpg"; break;
		case 'vbm23miyake' : legend = "http://cyberjapan.jp/legend/l_vbm_miyake.jpg"; break;
		case 'vbm24yakedake' : legend = "http://cyberjapan.jp/legend/l_vbm_yakedake.jpg"; break;
		case 'vbm25ontake' : legend = "http://cyberjapan.jp/legend/l_vbm_ontake.jpg"; break;
		case 'vbm26tsurumi' : legend = "http://cyberjapan.jp/legend/l_vbm_tsurumi.jpg"; break;
		case 'vbm27kujyu' : legend = "http://cyberjapan.jp/legend/l_vbm_kujyu.jpg"; break;
		case 'vbm28aso' : legend = "http://cyberjapan.jp/legend/l_vbm_aso.jpg"; break;
		case 'vbm29unzen' : legend = "http://cyberjapan.jp/legend/l_vbm_unzen.jpg"; break;
		case 'vbm30kirishima' : legend = "http://cyberjapan.jp/legend/l_vbm_kirishima.jpg"; break;
		case 'vbm31sakurajima' : legend = "http://cyberjapan.jp/legend/l_vbm_sakurajima.jpg"; break;
		case 'vbm32satsumatakesima' : legend = "http://cyberjapan.jp/legend/l_vbm_satsumatakesima.jpg"; break;
		case 'vbm33satsumaiojima' : legend = "http://cyberjapan.jp/legend/l_vbm_satsumaiojima.jpg"; break;
		case 'vbm34suwanosejima' : legend = "http://cyberjapan.jp/legend/l_vbm_suwanosejima.jpg"; break;
		case 'vbm35esan' : legend = "http://cyberjapan.jp/legend/l_vbm_esan.jpg"; break;
	}

	if (legend) legend = createPopupLink(legend, '凡例') + "<br/>";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = legend +
		createPopupLink('http://www1.gsi.go.jp/geowww/Volcano/volcano.html', '解説') + "<br/><br/>(c)国土地理院";
};

// 火山土地条件図
legendFuncObj.getLibraryLegend_volcano = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var legend = "";
	switch(dtnode.data.key){
	case 'akandake':
		legend = "http://cyberjapan.jp/legend/l_vlcd_meakan.jpg";
		break;
	case 'tokachidake':
		legend = "http://cyberjapan.jp/legend/l_vlcd_2tkch.jpg";
		break;
	case 'tarumaesan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_10tarm.jpg";
		break;
	case 'usuzan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_9usu.jpg";
		break;
	case 'komagatake':
		legend = "http://cyberjapan.jp/legend/l_vlcd_5hkkm.jpg";
		break;
	case 'iwatesan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_00iwatesan.jpg";
		break;
	case 'kurikomayama':
		legend = "http://cyberjapan.jp/legend/kurikoma_D2_58_legend.jpg";
		break;
	case 'adatarayama':
		legend = "http://cyberjapan.jp/legend/l_vlcd_adatara.jpg";
		break;
	case 'bandaisan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_11band.jpg";
		break;
	case 'izuoshima':
		legend = "http://cyberjapan.jp/legend/l_vlcd_13izuo.jpg";
		break;
	case 'miyakezima':
		legend = "http://cyberjapan.jp/legend/l_vlcd_6mykj.jpg";
		break;
	case 'kusatsushiranesan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_3ksrn.jpg";
		break;
	case 'yakiyama':
		legend = "http://cyberjapan.jp/legend/l_vlcd_niigatayakeyama.jpg";
		break;
	case 'ontakesan':
		legend = "http://cyberjapan.jp/legend/ontake_legend.jpg";
		break;
	case 'fujisan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_12fuji.jpg";
		break;
	case 'kujirenzan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_kuju.jpg";
		break;
	case 'asosan':
		legend = "http://cyberjapan.jp/legend/l_vlcd_4aso.jpg";
		break;
	case 'unzendake':
		legend = "http://cyberjapan.jp/legend/l_vlcd_7unzn.jpg";
		break;
	case 'kirishimayama':
		legend = "http://cyberjapan.jp/legend/l_vlcd_8krsm.jpg";
		break;
	case 'sakurazima':
		legend = "http://cyberjapan.jp/legend/l_vlcd_1skrj.jpg";
		break;
	case 'satsumaiojima':
		legend = "http://cyberjapan.jp/legend/l_vlcd_satsumaiou.jpg";
		break;
	}

	if (legend) legend = createPopupLink(legend, '凡例') + "<br/>";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = legend +
		createPopupLink('http://www1.gsi.go.jp/geowww/Volcano/volcano.html', '解説') + "<br/><br/>(c)国土地理院";
};

// 土地被覆
legendFuncObj.getLibraryLegend_GLCNMO2 = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://cyberjapan.jp/legend/Legend_GLCNMO.pdf', '凡例') + "<br/><br/>" +
		"(c)国土地理院、千葉大学、地球地図国際運営委員会、協働機関";
};

// 植生
legendFuncObj.getLibraryLegend_PTC2 = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://cyberjapan.jp/legend/Legend_PTC.pdf', '凡例') + "<br/><br/>" +
		"(c)国土地理院、千葉大学、地球地図国際運営委員会、協働機関";
};

// 宅地利用動向調査
legendFuncObj.getLibraryLegend_takudo = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.parent.data.title + "," + dtnode.data.title + ")";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://cyberjapan.jp/legend/takuchi_hanrei.png', '凡例') + "<br/>" +
		createPopupLink('http://www1.gsi.go.jp/geowww/LandUse/lum-takudo.html', '解説') + "<br/><br/>(c)国土地理院";
};

// 湖沼図
legendFuncObj.getLibraryLegend_LAKE = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title ;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	switch (dtnode.data.key) {
	case "lake1":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/LAKE_beforeH2.png', '凡例') + "<br/>" +
			createPopupLink('http://www1.gsi.go.jp/geowww/lake/index.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	case "lake2":
		$("#plugin_library_legend" + pluginID)[0].innerHTML =
			createPopupLink('http://cyberjapan.jp/legend/LAKE_afterH3.png', '凡例') + "<br/>" +
			createPopupLink('http://www1.gsi.go.jp/geowww/lake/index.html', '解説') + "<br/><br/>(c)国土地理院";
		break;
	}
};

// 基盤地図情報
legendFuncObj.getLibraryLegend_kiban = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		"ズームレベル18でのみ表示されます。";
};

// 基盤地図情報の提供地域
legendFuncObj.getLibraryLegend_fgd = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title ;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	var info = "";
	switch (dtnode.data.key) {
	case "fgd1":
		info = "縮尺レベル2500で整備した基盤地図情報の提供範囲";
		break;

	case "fgd2":
		info = "航空レーザ測量により整備した5mメッシュDEMの提供範囲";
		break;

	case "fgd3":
		info = "写真測量により整備した5mメッシュDEMの提供範囲";
		break;

	case "fgd4":
		info = "公共測量成果（航空レーザ測量）を基に作成した5mメッシュDEMの提供範囲";
		break;

	case "fgd5":
		info = "火山基本図の等高線データを基に作成した10mメッシュDEMの提供範囲";
		break;
	}

	$("#plugin_library_legend" + pluginID)[0].innerHTML = info +
		"<br/><br/>　<a href='http://www.gsi.go.jp/kiban/index.html' target='kibanchizu'>基盤地図情報サイト</a>";

};


legendFuncObj.getLibraryLegend_photoPoint = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	var div = '<div>' +
	          '写真は地図の中心に近いものから最大100点まで表示されます。<BR>地図を移動・縮小させた場合には、「写真の再検索」ボタンを押してください。<br/><br/>' +
	          '<input type="button" value="写真の再検索" onclick="onPhotoPoint_reload(\'' + dtnode.data.key + '\',\'' + pluginID + '\');"/>' +
	          '</div>';

	$("#plugin_library_legend" + pluginID)[0].innerHTML = div;
};

legendFuncObj.getLibraryLegend_Y2K4air = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var div = '<div>' +
	          'この画像は測量用写真として撮影したものではないため、測量に用いることはできません。<br/><br/>' +
	          createPopupLink('http://cyberjapan.jp/legend/kannikuchu-description.pdf', '解説') + "<br/><br/>(c)国土地理院";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = div;
};

legendFuncObj.getLibraryLegend_NDVI250m = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.parent.data.title + dtnode.data.title + ")";

	var div = "国土地理院と東海大学との共同研究による。<br/><br/>" +
			  createPopupLink("http://geolib.gsi.go.jp/tiles/thematicmap/NDVI_250m/legend_ndvi250m.pdf", "凡例") + "<br/>" +
			  createPopupLink("http://www1.gsi.go.jp/geowww/EODAS/ndvi.html", "解説") + "<br/>" +
			  createPopupLink("http://www1.gsi.go.jp/geowww/EODAS/ndvi-download.html", "データダウンロード") + "<br/><br/>(c)国土地理院";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = div;
};

legendFuncObj.getLibraryLegend_fukkokizu = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";

	var div = createPopupLink("http://cyberjapan.jp/legend/fukkokizu.pdf", "凡例") + "<br/>" +
			  createPopupLink("http://cyberjapan.jp/legend/fukkokizu_description.pdf", "解説") + "<br/><br/>(c)国土地理院";

	$("#plugin_library_legend" + pluginID)[0].innerHTML = div;

};

legendFuncObj.getLibraryLegend_toho = function(dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "(" + dtnode.data.title + ")";

	var div = createPopupLink("http://cyberjapan.jp/info/geje-ort.pdf", "解説") + "<br/><br/>(c)国土地理院";
	$("#plugin_library_legend" + pluginID)[0].innerHTML = div;
};

// 「再読込」ボタン押下時のイベント
function onPhotoPoint_reload(key, pluginID)
{
	// pluginIDとkeyでツリーのnodeを特定し、そこからレイヤーとKMLファイルのパスを取得
	var module = pluginModule[pluginID];
	var node = module.getTree().getNodeByKey(key);

	var layer = module.getLayer(key);

	if (!layer || !layer.getVisibility()) {
		return;
	}

	var url = dataSetObj[node.data.getURL](node.data);

	var msg = "";
	var style = "";
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();
	if (userAgent.indexOf('msie') != -1 && appVersion.indexOf("msie 8.") != -1) {
		msg = "読み込み中・・・";
		style = {
			padding: '25px',
			bottom: '30px',
			left: '10px',
			top: map.size.h - 35 + 'px'
		};
	}
	else {
		msg = "<h1>ファイルを読み込んでいます・・・・・</h1>";
		style = { padding: '25px' };
	}

	$.blockUI({message: msg, css: style});

	$.ajax({
		dataType: "jsonp",
		url: "http://portal.cyberjapan.jp/site/mapuse4/kml2jsonp.php",
		data: {
			"lf": 0,
			"url": url
		},
		jsonpCallback: "kml_loaded_" + key,
		success: function(json) {
			var format = new OpenLayers.Format.KML({
					extractStyles: true,
					extractAttributes: true,
					maxDepth: 2,
					externalProjection: projection4326,
					internalProjection: projection900913
			});
			layer.removeAllFeatures();
			layer.addFeatures(format.read(json.data));
			layer.redraw();
			$.unblockUI();
			sakuzuModule.disablePopupLayer();
			if (dispFlg && sakuzuModule.CurrentMode == "none"){
				sakuzuModule.enablePopupLayer();
			}
		},
		error: function(xhr, status, error) {
			alert('KMLファイルの読み込みに失敗しました。');
			$.unblockUI();
		}
	});

}



//	治水地形分類図（初版）
legendFuncObj.getLibraryLegend_LCMFC = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title +	"-" + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://www1.gsi.go.jp/geowww/lcmfc/hanrei.gif', '凡例') + "<br/>" +
		createPopupLink('http://www1.gsi.go.jp/geowww/lcmfc/lcmfc.html', '解説') + "<br/><br/>(c)国土地理院";
};


//	治水地形分類図（更新版(2007～2012年)）
legendFuncObj.getLibraryLegend_LCMFC2 = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title +	"-" + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";		//	"-" + dtnode.data.title;
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('http://cyberjapandata.gsi.go.jp/xyz/LCMFC02/fc_legend02.jpg', '凡例') + "<br/>" +
		createPopupLink('http://www1.gsi.go.jp/geowww/lcmfc/lcmfc.html', '解説') + "<br/><br/>(c)国土地理院";
};



/////////////////////////////////		20140714

//  地球地図日本
legendFuncObj.getLibraryLegend_TikyuTizuNippon = function (dtnode, pluginID)
{
	$("#plugin_library_name" + pluginID)[0].innerHTML = dtnode.parent.data.title +	"-" + dtnode.data.title;
	$("#plugin_library_subname" + pluginID)[0].innerHTML = "";
	$("#plugin_library_legend" + pluginID)[0].innerHTML =
		createPopupLink('legend/Legend_GMJ.pdf', '凡例') + "<br/>" +
		 "	<br/>(c)国土地理院";
};

/////////////////////////////////		20140714


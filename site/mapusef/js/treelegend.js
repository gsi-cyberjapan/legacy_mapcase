// 電子基準点
function getLibraryLegend_denshi(dtnode)
{
	$("#sz_library_name")[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#sz_library_subname")[0].innerHTML = "";
	$("#sz_library_legend")[0].innerHTML = "";
}

// 土地条件図
function getLibraryLegend_lcm25k(dtnode)
{
	$("#sz_library_name")[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#sz_library_subname")[0].innerHTML = "";
	switch (dtnode.data.key) {
	case "lcm25k":
		$("#sz_library_legend")[0].innerHTML =
			createPopupLink('./legend/LCM_hanrei.png', '凡例') + "<br>" + // deleted the old domain.
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_index.html', '解説');
		break;
	case "lcm25k_2011":
		$("#sz_library_legend")[0].innerHTML =
			createPopupLink('./legend/LCM_2011_hanrei.jpg', '凡例') + "<br>" + // deleted the old domain.
			createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_index.html', '解説');
		break;
	}
}

// 明治時代の低湿地
function getLibraryLegend_meijiswale(dtnode)
{
	$("#sz_library_name")[0].innerHTML = dtnode.data.title;
	$("#sz_library_subname")[0].innerHTML = "";
	$("#sz_library_legend")[0].innerHTML =
		createPopupLink('./legend/SWALE_hanrei.pdf', '凡例') + "<br>" + // deleted the old domain.
		createPopupLink('http://www.gsi.go.jp/bousaichiri/lc_meiji.html', '解説');
}

// 火山土地条件図
function getLibraryLegend_volcano(dtnode)
{
	$("#sz_library_name")[0].innerHTML = dtnode.parent.data.title + " - " + dtnode.data.title;
	$("#sz_library_subname")[0].innerHTML = "";
	
	var legend = "";
	switch(dtnode.data.key){
	case 'akandake':
		legend = "./legend/l_vlcd_meakan.jpg"; // deleted the old domain.
		break;
	case 'tokachidake':
		legend = "./legend/l_vlcd_2tkch.jpg"; // deleted the old domain.
		break;
	case 'tarumaesan':
		legend = "./legend/l_vlcd_10tarm.jpg"; // deleted the old domain.
		break;
	case 'usuzan':
		legend = "./legend/l_vlcd_9usu.jpg"; // deleted the old domain.
		break;
	case 'komagatake':
		legend = "./legend/l_vlcd_5hkkm.jpg"; // deleted the old domain.
		break;
	case 'kurikomayama':
		legend = "./legend/kurikoma_D2_58_legend.jpg"; // deleted the old domain.
		break;
	case 'adatarayama':
		legend = "./legend/l_vlcd_adatara.jpg"; // deleted the old domain.
		break;
	case 'bandaisan':
		legend = "./legend/l_vlcd_11band.jpg"; // deleted the old domain.
		break;
	case 'izuoshima':
		legend = "./legend/l_vlcd_13izuo.jpg"; // deleted the old domain.
		break;
	case 'miyakezima':
		legend = "./legend/l_vlcd_6mykj.jpg"; // deleted the old domain.
		break;
	case 'kusatsushiranesan':
		legend = "./legend/l_vlcd_3ksrn.jpg"; // deleted the old domain.
		break;
	case 'fujisan':
		legend = "./legend/l_vlcd_12fuji.jpg"; // deleted the old domain.
		break;	
	case 'ontakesan':
		legend = "./legend/ontake_legend.jpg"; // deleted the old domain.
		break;
	case 'kujirenzan':
		legend = "./legend/l_vlcd_kuju.jpg"; // deleted the old domain.
		break;
	case 'asosan':
		legend = "./legend/l_vlcd_4aso.jpg"; // deleted the old domain.
		break;
	case 'unzendake':
		legend = "./legend/l_vlcd_7unzn.jpg"; // deleted the old domain.
		break;	
	case 'kirishimayama':
		legend = "./legend/l_vlcd_8krsm.jpg"; // deleted the old domain.
		break;	
	case 'sakurazima':
		legend = "./legend/l_vlcd_1skrj.jpg"; // deleted the old domain.
		break;	
	case 'satsumaiojima':
		legend = "./legend/l_vlcd_satsumaiou.jpg"; // deleted the old domain.
		break;	
	}
	
	if (legend) legend = createPopupLink(legend, '凡例') + "<br>";
	
	$("#sz_library_legend")[0].innerHTML = legend +
		createPopupLink('http://www1.gsi.go.jp/geowww/Volcano/volcano.html', '解説');
}

// 宅地利用動向調査
function getLibraryLegend_takudo(dtnode)
{
	$("#sz_library_name")[0].innerHTML = dtnode.parent.parent.data.title;
	$("#sz_library_subname")[0].innerHTML = "(" + dtnode.parent.data.title + "," + dtnode.data.title + ")";
	$("#sz_library_legend")[0].innerHTML =
		createPopupLink('./legend/takuchi_hanrei.png', '凡例') + "<br>" + // deleted the old domain.
		createPopupLink('http://www1.gsi.go.jp/geowww/LandUse/lum-takudo.html', '解説');
}


// 色別標高図
function getLibraryLegend_relief(dtnode)
{
	$("#sz_library_name")[0].innerHTML = dtnode.data.title;
	$("#sz_library_subname")[0].innerHTML = "";
	$("#sz_library_legend")[0].innerHTML =
		createPopupLink('./site/mapuse4/attension_relief.html', '凡例');  // deleted the old domain.
}

// 写真
function getLibraryLegend_photo(dtnode)
{
	$("#sz_library_name")[0].innerHTML = "写真";
	$("#sz_library_subname")[0].innerHTML = "(" + dtnode.data.title + ")";
	
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

	if (link) link = createPopupLink(link, '関連情報');

	$("#sz_library_legend")[0].innerHTML = link;
}

function createPopupLink(url, label)
{
	var ret;
	
	ret = "<a href=\"" + url + "\" ";
	ret += "onClick=\"window.open('" + url + "', 'win', 'width=500, height=400, menubar=no, status=yes, scrollbars=yes, resizable=yes'); return false; \" ";
	ret += ">";
	ret += label;
	ret += "</a>";
	
	return ret;
}

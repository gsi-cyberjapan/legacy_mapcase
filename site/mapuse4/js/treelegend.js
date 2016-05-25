/* 「ライブラリー」の下部に表示される凡例の表示 */
legendFuncObj = [];

// 汎用
legendFuncObj.getLibraryLegend_default = function (dtnode, pluginID)
{
	var title = "";
	var subname = "";
	var legend = "";
	
	if (dtnode.data.isFolder) {
		// フォルダ
		title =  dtnode.data.title;
	}
	else if(dtnode.data.noLegend) {
		// 地理院外で作成
		title =  dtnode.data.title;
	}
	else {
		// 地理院内で作成
		title =  dtnode.data.title;
		legend =  "(c)国土地理院";
	}
	
	$("#plugin_library_name" + pluginID)[0].innerHTML = title
	$("#plugin_library_subname" + pluginID)[0].innerHTML = subname;
	$("#plugin_library_legend" + pluginID)[0].innerHTML = legend;
}

//ポップアップリンク
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

/*
	// モノトーン地図
	function getLibraryLegend_mono(dtnode)
	{
		$("#sz_library_name")[0].innerHTML = dtnode.data.title;
		$("#sz_library_subname")[0].innerHTML = "";
		$("#sz_library_legend")[0].innerHTML = '凡例 (' +
			createPopupLink('legend/200000c-legend.pdf', '1/20万') + "・" +
			createPopupLink('legend/1000000c-legend.pdf', '1/100万') + ")" + "<br><br>(c)国土地理院";
	}
*/
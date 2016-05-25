// 作図情報をHTMLファイルから受け取る
function jsonReceiver(e) {
	$(window).unbind('message', jsonReceiver);

	var iframejson = e.data
	
	if (!iframejson) return;

	jsondata = iframejson;
//	webtis.setObjectsForServer(iframejson);
}

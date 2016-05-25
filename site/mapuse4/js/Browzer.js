
//	IEのバージョン判定
function isIE11()
{
	var userAgent = window.navigator.userAgent.toLowerCase();
	if( userAgent.indexOf('gecko') == -1) 
		return	false;

	var ua, isIE, array, version;
 
	// UserAgetn を小文字に正規化
	ua = window.navigator.userAgent.toLowerCase();
 
	// IE かどうか判定
	isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);
 
	// IE の場合、バージョンを取得
	if( isIE) 
	{
	
		if( ua.indexOf('msie') >= 0 )
			return	false;
		else
			return	true;
	}
	else
		return	false;
}




//	ブラウザの種別判定
function isBrawzerPossible_3D( ) 
{
	var userAgent = window.navigator.userAgent.toLowerCase();

	if( userAgent.indexOf('opera') != -1) 
	  	return 		false;
	else if( userAgent.indexOf('firefox') != -1) 
	  	return 		true;
	else if( userAgent.indexOf('msie') != -1) 
	  	return false;
	else if( userAgent.indexOf('chrome') != -1) 
	  	return 		true;
	else if( userAgent.indexOf('safari') != -1) 
	  	return 		false;
	else if( userAgent.indexOf('gecko') != -1) 
	{
		var bRet	=	isIE11();
		if( bRet == true )
		  	return 		true;
	}
  	return false;
}


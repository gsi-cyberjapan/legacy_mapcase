//	3DView.js

//	地理院地図３DへのURLを生成する
function createLink3DURL(cx, cy, scale )	
{		//リンクのURLを作成する関数
	var nZoomLV = scale;

	if( nZoomLV > 14) 
		nZoomLV = 14;
	var linkURL 	= "http://cyberjapandata.gsi.go.jp/3d/site/index.html?z=" + nZoomLV + "&lat=" + cy + "&lon=" + cx;		//この変数にリンク先のURLを入れる
	
	
	var  sKey = lookFor3DDisplayMode( "yk74", "ort" );
	

	if( sKey == "ort" && 15 <= scale && scale <= 18 )
	{
		linkURL = "http://cyberjapandata.gsi.go.jp/3d/site/index.html?did=" + sKey + "&z=" + 14 + "&lat=" + cy + "&lon=" + cx;
	}
	else if( sKey == "gazo1" && 15 <= scale && scale <= 18 )
	{
		linkURL = "http://cyberjapandata.gsi.go.jp/3d/site/index.html?did=" + sKey + "&z=" + nZoomLV + "&lat=" + cy + "&lon=" + cx;
	}
	

	return linkURL;		//URLを返す
}


/*
function is3DPhotoMode()
{
	

	if( lookForLayerOfBaseLayerName( "yk74" ) == true )
	{
		return		true;
	}
	return	false;
}
*/



function lookForLayerOfBaseLayerName( sTargetName )
{
	var pLayers	=	this.map.layers;
	
	
	for (var i = 0; i < pLayers.length; i++) 
	{
		if( pLayers[i].visibility == false )
			continue;
	
		var sName	=	pLayers[i].name;
		
		if( sName == "yk74" )
		{
			return		true;
		}
	}
	return	false;
}


function lookForLayerWhichHaveDataSet( sDataSetName )
{
	var pLayers	=	this.map.layers;
	
	
	for (var i = 0; i < pLayers.length; i++) 
	{
		if( pLayers[i].visibility == false )
			continue;
	
		if( typeof( pLayers[i].dataSet ) == "undefined" )
			continue;
	
		var pDataSets	=	pLayers[i].dataSet;
		
		var ss = pDataSets[15];
		if( ss.dataId == sDataSetName )
				return		true;

/*
		for  each ( var p in  pDataSets )
		{
			if( p.dataID == sDataSetName )
				return		true;
		}
		
		for (var j = 0; j < pDataSets.length; j++ )
		{
			var p = pDataSets[j];
			if( p.dataId == sDataSetName )
				return		true;
		}
		for (var j = 0; j < pDataSets.length; j++ )
		{
			var p = pDataSets[j];
			if( p.dataID == sDataSetName )
				return		true;
		}
*/
	}
	return	null;
}




function lookFor3DDisplayMode( sTargetName, sDataSetName )
{
	var pLayers	=	this.map.layers;
	
	
	for (var i = 0; i < pLayers.length; i++) 
	{
		if( pLayers[i].visibility == false )
			continue;
	
		var sName	=	pLayers[i].name;
		
		if( sName == "yk74" )
		{
			return		"gazo1";
		}
	
		if( typeof( pLayers[i].dataSet ) == "undefined" )
			continue;
	
		var pDataSets	=	pLayers[i].dataSet;

		var ss = pDataSets[15];
		if( ss.dataId == sDataSetName )
			return		 "ort";
	}
	return	false;
}

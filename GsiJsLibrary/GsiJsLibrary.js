//**************************************
//
//  コンストラクタ
//
//**************************************
GsiJsLibrary = function(arg1, arg2, arg3) {
    if (arg2 == undefined) arg2 = '';
    if (arg3 == undefined) arg3 = '';
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
};

GsiJsLibrary.prototype = {

    //**************************************
    //
    //  市区町村リスト作成
    //
    //**************************************
    getMunicipalityList : function(){

        var responseData = '';
        var xmlHttp;
        var searchFlg;
        var count = 0;
        var lineData = '';
        var jsonData = '';
        var xmlData = '';
        var muniData = muniArray;

        if(this.arg1 == null || this.arg1 == ''){
            // arg1がnull、または空欄の場合、処理を終了する
            return '';
        } else{
            // arg1が数字かどうか判定
            if(isNaN(this.arg1)){
                // 都道府県名だった場合
                searchFlg = 1;
                if(this.arg1.length < 2){
                    // 都道府県名が1文字以下の場合、県名を
                    // 1つに特定することは困難なため、処理を終了する
                    return '';
                }
            } else{
                // 都道府県コードだった場合
                searchFlg = 0;
            }
        }
// bug fix 2012/10/4 start muni.dat->muni.jsに変更し、htmlの冒頭で読み込ませる方法に変更
//      xmlHttp.open("GET", root() + "/muni.dat", false);
//      xmlHttp.send(null);
//      responseData = xmlHttp.responseText;
//      muniData = responseData.split("\n");
// bug fix 2012/10/4 end

        if(this.arg2 == ''){
            // this.arg2が未指定の場合はJSON形式でデータを作成
            for(i in muniData){
                if(muniData[i] != ''){
                    lineData = muniData[i].split(",");

                    // 検索条件が都道府県コードだった場合
                    if(searchFlg == 0){
                        // 検索条件が都道府県コードだった場合
                        // 都道府県コードを2桁で0埋めし、第1引数の都道府県コード(this.arg1)と比較
                        if(('00' + lineData[0]).slice(-2) == ('00' + this.arg1).slice(-2)){
                            // 都道府県コードが一致したら、jsonデータを作成
                            if(count == 0){
                                jsonData += '{"result":['
                            } else{
                                jsonData += ','
                            }
                            jsonData += '{"muniCd":"' + lineData[2]
                                        + '","muniNm":"' + lineData[3]
                                        + '","muniKana":"' + lineData[4]
                                        + '","longitude":' + lineData[5]
                                        + ' ,"latitude":' + lineData[6] + '}';
                            count++;
                        }
                    // 検索条件が都道府県名だった場合
                    } else{
                        // 都道府県名で検索(前方一致)
                        if((" " + lineData[1]).indexOf(" " + this.arg1) != -1){
                            // 都道府県名が一致したら、jsonデータを作成
                            if(count == 0){
                                jsonData += '{"result":['
                            } else{
                                jsonData += ','
                            }
                            jsonData += '{"muniCd":"' + lineData[2]
                                        + '","muniNm":"' + lineData[3]
                                        + '","muniKana":"' + lineData[4]
                                        + '","longitude":' + lineData[5]
                                        + ' ,"latitude":' + lineData[6] + '}';
                            count++;
                        }
                    }
                }
            }
            if(count > 0){
                jsonData += ']}'
            }
            // 結果を返す
            return jsonData;

        } else if(this.arg2 == 'xml') {
            // this.arg2に[xml]と指定がある場合は、XML形式でデータを作成
            var result = document.createElement('result');
            var record  = document.createElement('record');
            var code, name, kana, lon, lan;
            var xml = '';
            xml += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

            // 検索条件が都道府県コードだった場合
            if(searchFlg == 0){
                for(i in muniData){
                    lineData = muniData[i].split(",");
                    if(muniData[i] != ''){
                        // 都道府県コードを2桁で0埋めし、第1引数の都道府県コード(this.arg1)と比較
                        if(('00' + lineData[0]).slice(-2) == ('00' + this.arg1).slice(-2)){
                            // 都道府県コードが一致したら、xmlデータを作成
                            code = document.createElement('muniCd');
                            code.appendChild(document.createTextNode(lineData[2]));
                            record.appendChild(code);

                            name = document.createElement('muniNm');
                            name.appendChild(document.createTextNode(lineData[3]));
                            record.appendChild(name);

                            kana = document.createElement('muniKana');
                            kana.appendChild(document.createTextNode(lineData[4]));
                            record.appendChild(kana);

                            lon = document.createElement('longitude');
                            lon.appendChild(document.createTextNode(lineData[5]));
                            record.appendChild(lon);

                            lan = document.createElement('latitude');
                            lan.appendChild(document.createTextNode(lineData[6]));
                            record.appendChild(lan);

                            if(window.XMLSerializer){
                              // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                              xml = new XMLSerializer().serializeToString(record);
                            } else if(record.outerHTML){
                              // 使用ブラウザがIEの場合
                              result.appendChild(record);
                            } else{
                                // ブラウザが判断できない場合は、処理を終了する
                                return '';
                            }
                        }
                    }
                }
            // 検索条件が都道府県名だった場合
            } else{
                for(i in muniData){
                    lineData = muniData[i].split(",");
                    if(muniData[i] != ''){
                        // 都道府県名で検索(前方一致)
                        if((" " + lineData[1]).indexOf(" " + this.arg1) != -1){
                            // 都道府県名が一致したら、xmlデータを作成
                            code = document.createElement('muniCd');
                            code.appendChild(document.createTextNode(lineData[2]));
                            record.appendChild(code);

                            name = document.createElement('muniNm');
                            name.appendChild(document.createTextNode(lineData[3]));
                            record.appendChild(name);

                            kana = document.createElement('muniKana');
                            kana.appendChild(document.createTextNode(lineData[4]));
                            record.appendChild(kana);

                            lon = document.createElement('longitude');
                            lon.appendChild(document.createTextNode(lineData[5]));
                            record.appendChild(lon);

                            lan = document.createElement('latitude');
                            lan.appendChild(document.createTextNode(lineData[6]));
                            record.appendChild(lan);

                            result.appendChild(record);
                        }
                    }
                }
            }

            if(window.XMLSerializer){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                xml += new XMLSerializer().serializeToString(record);
            } else if(record.outerHTML){
                // 使用ブラウザがIEの場合
                xml += result.outerHTML;
            } else{
                // ブラウザが判断できない場合は、処理を終了する
                return '';
            }

            if(window.DOMParser){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                var xmldom = new DOMParser();
                xmldom.async = false;
                var dom = xmldom.parseFromString(xml, "application/xml");
                if (!dom) return '';
                xmlData = document.createElement("result");
                xmlData.innerHTML = xml;

            } else if(window.ActiveXObject){
                // 使用ブラウザがIEの場合
                var xmldom = new ActiveXObject('MSXML2.DOMDocument.6.0');
                xmldom.async = false;
                xmldom.loadXML(xml);
                xmlData = xmldom.documentElement;
            }
            // 結果を返す
            return xmlData;

        } else {
            // this.arg2の指定が未指定と[xml]以外は、データを作成しない
            return '';
        }
    },

    //**************************************
    //
    //  市区町村データ(単一)作成
    //
    //**************************************
    getMunicipality : function(){

        var responseData = '';
        var xmlHttp;
        var searchFlg;
        var count = 0;
        var lineData = '';
        var jsonData = '';
        var xmlData = '';
        var muniData = muniArray;

        if(this.arg1 == null || this.arg1 == ''){
            // 市区町村コード(arg1)がnull、または空欄の場合、処理を終了する
            return '';
        }
// bug fix 2012/10/4 start muni.dat->muni.jsに変更し、htmlの冒頭で読み込ませる方法に変更
//      xmlHttp.open("GET", root() + "/muni.dat", false);
//      xmlHttp.send(null);
//      responseData = xmlHttp.responseText;
//      muniData = responseData.split("\n");
// bug fix 2012/10/4 end
        if(this.arg2 == ''){
            // this.arg2が未指定の場合はJSON形式でデータを作成
            for(i in muniData){
                lineData = muniData[i].split(",");
                if(muniData[i] != ''){
                    // 市区町村コードを2桁で0埋めし、第1引数の市区町村コード(this.arg1)と比較
                    if(('00' + lineData[2]).slice(-5) == ('00' + this.arg1).slice(-5)){
                        // 市区町村コードが一致したら、jsonデータを作成
                        if(count == 0){
                            jsonData += '{"result":['
                        } else{
                            jsonData += ','
                        }
                        jsonData += '{"prefNm":"' + lineData[1]
                                    + '","muniCd":"' + lineData[2]
                                    + '","muniNm":"' + lineData[3]
                                    + '","muniKana":"' + lineData[4]
                                    + '","longitude":' + lineData[5]
                                    + ' ,"latitude":' + lineData[6] + '}';
                        count++;
                    }
                }
            }
            if(count > 0){
                jsonData += ']}'
            }
            // 結果を返す
            return jsonData;

        } else if(this.arg2 == 'xml') {
            // this.arg2に[xml]と指定がある場合は、XML形式でデータを作成
            var result = document.createElement('result');
            var record  = document.createElement('record');
            var code, name, kana, lon, lan;
            var xml = '';
            var xml = xml + "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

            for(i in muniData){
                lineData = muniData[i].split(",");
                if(muniData[i] != ''){
                    // 市区町村コードを2桁で0埋めし、第1引数の市区町村コード(this.arg1)と比較
                    if(('00' + lineData[2]).slice(-5) == ('00' + this.arg1).slice(-5)){
                        // 市区町村コードが一致したら、xmlデータを作成
                        code = document.createElement('prefNm');
                        code.appendChild(document.createTextNode(lineData[1]));
                        record.appendChild(code);
                        
                        code = document.createElement('muniCd');
                        code.appendChild(document.createTextNode(lineData[2]));
                        record.appendChild(code);

                        name = document.createElement('muniNm');
                        name.appendChild(document.createTextNode(lineData[3]));
                        record.appendChild(name);

                        kana = document.createElement('muniKana');
                        kana.appendChild(document.createTextNode(lineData[4]));
                        record.appendChild(kana);

                        lon = document.createElement('longitude');
                        lon.appendChild(document.createTextNode(lineData[5]));
                        record.appendChild(lon);

                        lan = document.createElement('latitude');
                        lan.appendChild(document.createTextNode(lineData[6]));
                        record.appendChild(lan);

                        result.appendChild(record);
                    }
                }
            }

            if(window.XMLSerializer){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                xml += new XMLSerializer().serializeToString(record);
            } else if(record.outerHTML){
                // 使用ブラウザがIEの場合
                xml += result.outerHTML;
            } else{
                // ブラウザが判断できない場合は、処理を終了する
                return '';
            }

            if(window.DOMParser){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                var xmldom = new DOMParser();
                xmldom.async = false;
                var dom = xmldom.parseFromString(xml, "application/xml");
                if (!dom) return '';
                xmlData = document.createElement("result");
                xmlData.innerHTML = xml;

            } else if(window.ActiveXObject){
                // 使用ブラウザがIEの場合
                var xmldom = new ActiveXObject('MSXML2.DOMDocument.6.0');
                xmldom.async = false;
                xmldom.loadXML(xml);
                xmlData = xmldom.documentElement;
            }
            // 結果を返す
            return xmlData;

        } else {
            // this.arg2の指定が未指定と[xml]以外は、データを作成しない
            return '';
        }
    },

    //**************************************
    //
    //  磁北角作成
    //
    //**************************************
    getNorthAngle : function(){

        if(this.arg1 == null || this.arg1 == ''){
            // 経度(arg1)がnull、または空欄の場合、処理を終了する
            return '';
        } else if(this.arg2 == null || this.arg2 == ''){
            // 緯度(arg2)がnull、または空欄の場合、処理を終了する
            return '';
        }
        if(isNaN(this.arg1)){
            // 経度(arg1)が数値でない場合、処理を終了する
            return '';
        } else if(isNaN(this.arg2)){
            // 緯度(arg2)が数値でない場合、処理を終了する
            return '';
        }

        var lonVal = this.arg1 - 138;
        var lanVal = this.arg2 - 37;
        var resultAngle;
        var jsonData = '';
        var xmlData = '';

        // 磁北角の計算
        var resultAngle = (7+40.644/60)
                         + ((18.976/60) * lanVal)
                         - ((6.224/60) * lonVal)
                         + ((0.003/60) * lanVal * lanVal)
                         + ((0.024/60) * lanVal * lonVal)
                         + ((0.586/60) * lonVal * lonVal);

        if(this.arg3 == ''){
            // arg3が未指定の場合はJSON形式でデータを作成
            jsonData += '{"northAngle":"' + resultAngle + '"}';
            return jsonData;

        } else if(this.arg3 == 'xml') {
            // arg3に[xml]と指定がある場合は、XML形式でデータを作成
            var result = document.createElement('result');
            var record  = document.createElement('record');
            var angle = document.createElement('northAngle');
            angle.appendChild(document.createTextNode(resultAngle));
            record.appendChild(angle);
            result.appendChild(record);

            var xml = '';
            xml = xml + "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
            if(window.XMLSerializer){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                xml += new XMLSerializer().serializeToString(record);
            } else if(result.outerHTML){
                // 使用ブラウザがIEの場合
                xml += result.outerHTML;
            } else{
                // ブラウザが判断できない場合は、処理を終了する
                return '';
            }
            if(window.DOMParser){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                var xmldom = new DOMParser();
                xmldom.async = false;
                var dom = xmldom.parseFromString(xml, "application/xml");
                if (!dom) return '';
                xmlData = document.createElement("result");
                xmlData.innerHTML = xml;

            } else if(window.ActiveXObject){
                // 使用ブラウザがIEの場合
                var xmldom = new ActiveXObject('MSXML2.DOMDocument.6.0');
                xmldom.async = false;
                xmldom.loadXML(xml);
                xmlData = xmldom.documentElement;
            }
            // 結果を返す
            return xmlData;

        } else {
            // arg3の指定が未指定と[xml]以外は、データを作成しない
            return '';
        }
    },
    
    //**************************************
    //
    //  北海道の市区町村リスト(振興局順)作成
    //
    //**************************************
    getHokkaidoMuniList : function(){

        var responseData = '';
        var xmlHttp;
        var searchFlg;
        var count = 0;
        var lineData = '';
        var jsonData = '';
        var xmlData = '';
        var muniData = hokkaidoArray;

        if(this.arg2 == ''){
            // this.arg2が未指定の場合はJSON形式でデータを作成
            for(i in muniData){
                if(muniData[i]){
                    lineData = muniData[i].split(",");

                    if(count == 0){
                        jsonData += '{"result":['
                    } else{
                        jsonData += ','
                    }

                    jsonData += '{"muniCd":"' + lineData[2]
                                + '","muniNm":"' + lineData[3]
                                + '","muniKana":"' + lineData[4]
                                + '","longitude":' + lineData[5]
                                + ' ,"latitude":' + lineData[6] + '}';
                    count++;
                }
            }
            if(count > 0){
                jsonData += ']}'
            }
            // 結果を返す
            return jsonData;

        } else if(this.arg2 == 'xml') {
            // this.arg2に[xml]と指定がある場合は、XML形式でデータを作成
            var result = document.createElement('result');
            var record  = document.createElement('record');
            var code, name, kana, lon, lan;
            var xml = '';
            xml += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

            for(i in muniData){
                lineData = muniData[i].split(",");
                if(muniData[i]){
                    // xmlデータを作成
                    code = document.createElement('muniCd');
                    code.appendChild(document.createTextNode(lineData[2]));
                    record.appendChild(code);

                    name = document.createElement('muniNm');
                    name.appendChild(document.createTextNode(lineData[3]));
                    record.appendChild(name);

                    kana = document.createElement('muniKana');
                    kana.appendChild(document.createTextNode(lineData[4]));
                    record.appendChild(kana);

                    lon = document.createElement('longitude');
                    lon.appendChild(document.createTextNode(lineData[5]));
                    record.appendChild(lon);

                    lan = document.createElement('latitude');
                    lan.appendChild(document.createTextNode(lineData[6]));
                    record.appendChild(lan);

                    result.appendChild(record);
                }
            }

            if(window.XMLSerializer){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                xml += new XMLSerializer().serializeToString(record);
            } else if(record.outerHTML){
                // 使用ブラウザがIEの場合
                xml += result.outerHTML;
            } else{
                // ブラウザが判断できない場合は、処理を終了する
                return '';
            }

            if(window.DOMParser){
                // 使用ブラウザがFireFox, Google Chrome, Safariの場合
                var xmldom = new DOMParser();
                xmldom.async = false;
                var dom = xmldom.parseFromString(xml, "application/xml");
                if (!dom) return '';
                xmlData = document.createElement("result");
                xmlData.innerHTML = xml;

            } else if(window.ActiveXObject){
                // 使用ブラウザがIEの場合
                var xmldom = new ActiveXObject('MSXML2.DOMDocument.6.0');
                xmldom.async = false;
                xmldom.loadXML(xml);
                xmlData = xmldom.documentElement;
            }
            // 結果を返す
            return xmlData;

        } else {
            // this.arg2の指定が未指定と[xml]以外は、データを作成しない
            return '';
        }
    }
};

//**************************************
//
//  ドキュメントルート取得用関数
//
//**************************************
/*
function root(){
    // JavaScript設置パス（絶対パス表記）
    var set_js_path = '/GsiJsLibrary/';
    // スクリプト名
    var set_script_name ='GsiJsLibrary.js';

    // パスを取得
    var script_path;
    var re = new RegExp( '(.+)'+ set_script_name + '$', "i");
    var scripts = document.getElementsByTagName("script");
    var i = scripts.length;
    while (i--) {
        var m = scripts[i].src.match(re);
        if ( m ) {
            script_path = m[1];
            script_path = script_path.replace(/\/$/,'');
            break;
        }
    }
    return script_path;
}
*/

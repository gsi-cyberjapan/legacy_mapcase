package jp.cyberjapan.webtis.control.map
{
	
	/**
	 * ...
	 * @author T. Nakayama
	 */
	public class MapKind
	{
		public static function getMapKind(dataId:String):Object
		{
			var mapKind:Object = null;
			switch (dataId)
			{
				// 春
				case "SPRING": 
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "SPRING", 10: "SPRING", 11: "SPRING", 12: "SPRING", 13: "SPRING", 14: "SPRING", 15: "D25K2", 16: "D25K2", 17: "D25K2", 18: "D2500"};
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "SPRING", 10: "SPRING", 11: "SPRING", 12: "SPRING", 13: "SPRING", 14: "SPRING", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
					
				// 夏
				case "SUMMER": 
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "SUMMER", 10: "SUMMER", 11: "SUMMER", 12: "SUMMER", 13: "SUMMER", 14: "SUMMER", 15: "D25K2", 16: "D25K2", 17: "D25K2", 18: "D2500"};
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "SUMMER", 10: "SUMMER", 11: "SUMMER", 12: "SUMMER", 13: "SUMMER", 14: "SUMMER", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
				
				// 秋
				case "AUTUMN": 
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "AUTUMN", 10: "AUTUMN", 11: "AUTUMN", 12: "AUTUMN", 13: "AUTUMN", 14: "AUTUMN", 15: "D25K2", 16: "D25K2", 17: "D25K2", 18: "D2500"};
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "AUTUMN", 10: "AUTUMN", 11: "AUTUMN", 12: "AUTUMN", 13: "AUTUMN", 14: "AUTUMN", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
				
				// 冬
				case "WINTER": 
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "WINTER", 10: "WINTER", 11: "WINTER", 12: "WINTER", 13: "WINTER", 14: "WINTER", 15: "D25K2", 16: "D25K2", 17: "D25K2", 18: "D2500"};
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "WINTER", 10: "WINTER", 11: "WINTER", 12: "WINTER", 13: "WINTER", 14: "WINTER", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
				
				// モノトーン
				case "GREY": 
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAISG", 6: "JAISG", 7: "JAISG", 8: "JAISG", 9: "GRAY", 10: "GRAY", 11: "GRAY", 12: "GRAY", 13: "GRAY", 14: "GRAY", 15: "D25KG", 16: "D25KG", 17: "D25KG", 18: "D2500G"};
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAISG", 6: "JAISG", 7: "JAISG", 8: "JAISG", 9: "GRAY", 10: "GRAY", 11: "GRAY", 12: "GRAY", 13: "GRAY", 14: "GRAY", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
				
				// 白地図
				case "BLANK": 
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "blank", 6: "blank", 7: "blank", 8: "blank", 9: "blank", 10: "blank", 11: "blank", 12: "blank", 13: "blank", 14: "blank", 15: "blank", 16: "blank", 17: "blank", 18: "blank"};
					break;
				
				// 標準地図
				case "JAIS": 
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS", 6: "JAIS", 7: "JAIS", 8: "JAIS", 9: "BAFD1000K", 10: "BAFD1000K", 11: "BAFD1000K", 12: "BAFD200K", 13: "BAFD200K", 14: "BAFD200K", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
				
				// 色別標高図
				case "RELIEF": 
					mapKind = {0: "relief", 1: "relief", 2: "relief", 3: "relief", 4: "relief", 5: "relief", 6: "relief", 7: "relief", 8: "relief", 9: "relief", 10: "relief", 11: "relief", 12: "relief", 13: "relief", 14: "relief", 15: "relief", 16: "relief", 17: "relief", 18: "relief"};
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "RELIEF", 6: "RELIEF", 7: "RELIEF", 8: "RELIEF", 9: "RELIEF", 10: "RELIEF", 11: "RELIEF", 12: "RELIEF", 13: "RELIEF", 14: "RELIEF", 15: "RELIEF", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
				
				// 英語
				case "ENGLISH": 
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "english", 6: "english", 7: "english", 8: "english", 9: "english", 10: "english", 11: "english", 12: "std", 13: "std", 14: "std", 15: "std", 16: "std", 17: "std", 18: "std"};
					break;
					
				// 英語
				case "JAISE": 
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "english", 6: "english", 7: "english", 8: "english", 9: "english", 10: "english", 11: "english", 12: "std", 13: "std", 14: "std", 15: "std", 16: "std", 17: "std", 18: "std"};
					break;
				
				// 2007～写真
				case "DJBMO": 
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "std", 6: "std", 7: "std", 8: "std", 9: "std", 10: "std", 11: "std", 12: "std", 13: "std", 14: "std", 15: "DJBMO", 16: "DJBMO", 17: "DJBMO", 18: "DJBMO"};
					break;
				
				// 1988～90写真
				case "NLII4": 
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS", 6: "JAIS", 7: "JAIS", 8: "JAIS", 9: "BAFD1000K", 10: "BAFD1000K", 11: "BAFD1000K", 12: "BAFD200K", 13: "BAFD200K", 14: "BAFD200K", 15: "NLII4", 16: "NLII4", 17: "NLII4", 18: "NLII4"};
					break;
				
				// 1984～87写真
				case "NLII3": 
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS", 6: "JAIS", 7: "JAIS", 8: "JAIS", 9: "BAFD1000K", 10: "BAFD1000K", 11: "BAFD1000K", 12: "BAFD200K", 13: "BAFD200K", 14: "BAFD200K", 15: "NLII3", 16: "NLII3", 17: "NLII3", 18: "NLII3"};
					break;
				
				// 1979～83写真
				case "NLII2": 
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS", 6: "JAIS", 7: "JAIS", 8: "JAIS", 9: "BAFD1000K", 10: "BAFD1000K", 11: "BAFD1000K", 12: "BAFD200K", 13: "BAFD200K", 14: "BAFD200K", 15: "NLII2", 16: "NLII2", 17: "NLII2", 18: "NLII2"};
					break;
				
				// 1974～78写真
				case "NLII1": 
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS", 6: "JAIS", 7: "JAIS", 8: "JAIS", 9: "BAFD1000K", 10: "BAFD1000K", 11: "BAFD1000K", 12: "BAFD200K", 13: "BAFD200K", 14: "BAFD200K", 15: "NLII1", 16: "NLII1", 17: "NLII1", 18: "NLII1"};
					break;

				// 彩色地図（段彩陰影に重ねる地図）
				case "COLOR":
					//mapKind = { 0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "BAFD1000K2", 10: "BAFD1000K2", 11: "BAFD1000K2", 12: "BAFD200K2", 13: "BAFD200K2", 14: "BAFD200K2", 15: "D25K2", 16: "D25K2", 17: "D25K2", 18: "D2500" };
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS2", 6: "JAIS2", 7: "JAIS2", 8: "JAIS2", 9: "BAFD1000K2", 10: "BAFD1000K2", 11: "BAFD1000K2", 12: "BAFD200K2", 13: "BAFD200K2", 14: "BAFD200K2", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;
					
				// 彩色地図（段彩陰影モノトーンに重ねる地図）
				case "MONO":
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAISG", 6: "JAISG", 7: "JAISG", 8: "JAISG", 9: "BAFD1000KG", 10: "BAFD1000KG", 11: "BAFD1000KG", 12: "BAFD200KG", 13: "BAFD200KG", 14: "BAFD200KG", 15: "D25KG", 16: "D25KG", 17: "D25KG", 18: "D2500G"};
					mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAISG", 6: "JAISG", 7: "JAISG", 8: "JAISG", 9: "BAFD1000KG", 10: "BAFD1000KG", 11: "BAFD1000KG", 12: "BAFD200KG", 13: "BAFD200KG", 14: "BAFD200KG", 15: "DJBMM", 16: "DJBMM", 17: "DJBMM", 18: "FGD"};
					break;

				// 標準地図（新版）
				case "STD":
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "std", 6: "std", 7: "std", 8: "std", 9: "std", 10: "std", 11: "std", 12: "std", 13: "std", 14: "std", 15: "std", 16: "std", 17: "std", 18: "std"};
					break;
				
				// 標準地図（新版）
				case "JAIS2":
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "std", 6: "std", 7: "std", 8: "std", 9: "std", 10: "std", 11: "std", 12: "std", 13: "std", 14: "std", 15: "std", 16: "std", 17: "std", 18: "std"};
					break;

				// 淡色地図
				case "PALE":
					mapKind = {0: "pale", 1: "pale", 2: "pale", 3: "pale", 4: "pale", 5: "pale", 6: "pale", 7: "pale", 8: "pale", 9: "pale", 10: "pale", 11: "pale", 12: "pale", 13: "pale", 14: "pale", 15: "pale", 16: "pale", 17: "pale", 18: "pale"};
					//mapKind = {0: "GLMD", 1: "GLMD", 2: "GLMD", 3: "GLMD", 4: "GLMD", 5: "JAIS", 6: "JAIS", 7: "JAIS", 8: "JAIS", 9: "BAFD1000K", 10: "BAFD1000K", 11: "BAFD1000K", 12: "pale", 13: "pale", 14: "pale", 15: "pale", 16: "pale", 17: "pale", 18: "pale"};
					break;
				
				case "std":
					mapKind = {0: "std", 1: "std", 2: "std", 3: "std", 4: "std", 5: "std", 6: "std", 7: "std", 8: "std", 9: "std", 10: "std", 11: "std", 12: "std", 13: "std", 14: "std", 15: "std", 16: "std", 17: "std", 18: "std"};
					break;

				case "ort":
					mapKind = {0: "ort", 1: "ort", 2: "ort", 3: "ort", 4: "ort", 5: "ort", 6: "ort", 7: "ort", 8: "ort", 9: "ort", 10: "ort", 11: "ort", 12: "ort", 13: "ort", 14: "ort", 15: "ort", 16: "ort", 17: "ort", 18: "ort"};
					break;

				case "english":
					mapKind = {0: "english", 1: "english", 2: "english", 3: "english", 4: "english", 5: "english", 6: "english", 7: "english", 8: "english", 9: "english", 10: "english", 11: "english", 12: "std", 13: "std", 14: "std", 15: "std", 16: "std", 17: "std", 18: "std"};
					break;

				case "blank":
					mapKind = {0: "blank", 1: "blank", 2: "blank", 3: "blank", 4: "blank", 5: "blank", 6: "blank", 7: "blank", 8: "blank", 9: "blank", 10: "blank", 11: "blank", 12: "blank", 13: "blank", 14: "blank", 15: "blank", 16: "blank", 17: "blank", 18: "blank"};
					break;
					
				default: 
					break;
			}
			return mapKind;
		}
	}

}
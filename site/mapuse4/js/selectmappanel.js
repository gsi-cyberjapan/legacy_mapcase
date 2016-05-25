(function($){
jQuery.fn.SelectMapPanel = function() {

	this.append("\
		<div id=\"selectmap\" style=\"position:absolute;width:460px;right:100px;top:100px;display:none;\">\
			<table border=\"0\" width=\"460\" cellspacing=\"0\" cellpadding=\"2\" style=\"background-color:#CCCCCC\">\
			<tr><td style=\"width:100%\">\
				<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%; height:200px;\">\
					<tr><td style=\"cursor:pointer; width:100%;border: 1px #000000 solid;padding:5px;\">\
						<span style=\"color:#000000; font-weight:bold;\">地図・写真の種類</span>\
					</td></tr>\
					<tr>\
					<td style=\"padding:4px; width:100%;padding-left:10px; background-color:White;border: 1px #000000 solid;\">\
						<div>\
							<div class='selmaptitle'>地図\
							</div>\
						</div>\
						<div style=\"clear:both;\">\
							<table width=\"440\"><tbody>\
								<tr align=\"center\">\
								<td width=\"110\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('25000_n').click()\" ondblclick=\"document.getElementById('25000_n').click();\"><img src=\"site/mapuse4/image/tmb_bas_n.png\" width=\"50\" height=\"50\" border=\"0\"></a></td>\
								<td width=\"110\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('pale').click()\" ondblclick=\"document.getElementById('pale').click();\"><img src=\"site/mapuse4/image/tmb_pal_n.png\" width=\"50\" height=\"50\" border=\"0\"></a></td>\
								<td width=\"110\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('blank').click()\" ondblclick=\"document.getElementById('blank').click();\"><img src=\"site/mapuse4/image/icon_white.png\" border=\"0\" height=\"50\" width=\"50\"></a></td>\
								<td width=\"110\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('jaise').click()\" ondblclick=\"document.getElementById('jaise').click();\"><img src=\"site/mapuse4/image/jaise.jpg\" width=\"50\" height=\"50\" border=\"0\"></a></td>\
								</tr>\
								<tr align=\"center\">\
								<td nowrap><input type=\"radio\" name=\"mapkind\" id=\"25000_n\" onclick=\"changeMap('STD');\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('25000_n').click()\" ondblclick=\"document.getElementById('25000_n').click();\">標準地図</a></td>\
								<td nowrap=\"nowrap\"><input type=\"radio\" name=\"mapkind\" id=\"pale\" onclick=\"changeMap('pale');\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('pale').click()\" ondblclick=\"document.getElementById('pale').click();\">淡色地図</a></td>\
								<td nowrap=\"nowrap\"><input name=\"mapkind\" id=\"blank\" onclick=\"changeMap('Blank');\" type=\"radio\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('blank').click()\" ondblclick=\"document.getElementById('blank').click();\">白地図</a></td>\
								<td nowrap=\"nowrap\"><input type=\"radio\" name=\"mapkind\" id=\"jaise\" onclick=\"changeMap('Jaise');\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('jaise').click()\" ondblclick=\"document.getElementById('jaise').click();\">Romanized</a></td>\
								</tr>\
							</tbody></table>\
						</div>\
						<div>　</div>\
						<div style=\"clear:both;padding-top:10px;\">\
							<div class='selmaptitle' style=\"float:left;\">写真\
							</div>\
						</div>\
						<div style=\"clear:both;\">\
							<table width=\"360\"><tbody>\
								<tr align=\"center\">\
								<td><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('djbmo').click()\" ondblclick=\"document.getElementById('djbmo').click();\"><img src=\"site/mapuse4/image/djbmo.jpg\" border=\"0\" height=\"50\" width=\"50\"></a></td>\
								<td width=240>　</td>\
								</tr>\
								<tr align=\"center\">\
								<td nowrap><input type=\"radio\" name=\"mapkind\" id=\"djbmo\" onclick=\"changeMap('DJBMO');\"><a href=\"javascript:void(0);\" class=\"sel\" onclick=\"document.getElementById('djbmo').click()\" ondblclick=\"document.getElementById('djbmo').click();\">最新（2007年～）</a></td>\
								<td width=240>　</td>\
								</tr>\
							</table>\
						</div>\
						<div style=\"height:10px;\"> </div>\
					</td></tr>\
				</table>\
			</td></tr>\
			</table>\
		</div>"
	);
	
	return this;
};
})(jQuery);

var opaSlider = function() {

	var output = document.getElementById('opa-value');
	var opalabel="透過率調節: ";
	var method = {
		// 表示用の透過率から、実際の透過率を求める
		value2opacity: function(value) {
			return (100 - value) / 100;
		},

		// 実際の透過率から、表示用の透過率を求める
		opacity2value: function (opacity){
			return Math.floor(100 - (opacity * 100));
		},

		// スライダーの値を設定する(0 ～100)
		setValue: function(value){
			output.innerHTML = opalabel + value;
			jQuery('#opa-slider').slider('value', value);
		}
	};
		
	jQuery(function(){
	    jQuery('#opa-slider').slider({
	    	value: 0,

	    	// スライダーの値を変更
	        slide: function(event, ui) {
	        	var value = ui.value;
				output.innerHTML = opalabel + value;
				
				var opa = method.value2opacity(value);
				treeModule.changeOpacity(opa);
			}
	    });
	});
	
	// 透過率を設定する(0～1)
	this.setOpacity = function(opa){
		var opacity = (opa == null) ? 1.0 : opa;
		var value = method.opacity2value(opacity);

		method.setValue(value);
	};

	method.setValue(0);
};

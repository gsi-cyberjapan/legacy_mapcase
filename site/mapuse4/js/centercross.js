OpenLayers.Control.CenterCross = OpenLayers.Class(OpenLayers.Control, {

    /**
     * Property: element
     * {Element}
     */
	element: null,

    horizontal: null,

    vertical: null,

	crosslength: 40,

	bold: 2,

	isWhite: false,

	initialize: function(options) {
		OpenLayers.Control.prototype.initialize.apply(this, [options]);

		this.element = document.createElement('div');

		this.element.style.position = 'relative';
		this.element.style.height = '1px';
		this.element.style.width = '1px';

		this.element.className = this.displayClass + 'Wrapper';
	},
	
	destroy: function() {
        this.map.events.unregister('moveend', this, this.onMoveend);
		this.div.innerHTML = "";
		OpenLayers.Control.prototype.destroy.apply(this);
	},

	draw: function() {
		OpenLayers.Control.prototype.draw.apply(this, arguments);

		this.div.appendChild(this.element);
		this.div.style.height = "1px";
		this.div.style.width = "1px";
        this.map.events.register('moveend', this, this.onMoveend);

		this.update();

		return this.div;
	},
	
	onMoveend: function() {
		this.update();
	},

	update: function() {
		var px = new OpenLayers.Pixel(this.map.getCurrentSize().w/2, this.map.getCurrentSize().h/2);
		
		this.element.innerHTML = "";

		this.div.style.left = px.x + "px";
		this.div.style.top = px.y + "px";

		this.createBorder();

		this.horizontal.style.left = ((this.crosslength + this.bold) / -2) + "px";
		this.horizontal.style.top = (this.bold / -2) + "px";

		this.horizontal.style.height = this.bold + "px";
		this.horizontal.style.width = this.crosslength + "px";

		this.vertical.style.left = (this.bold / -2) + "px";
		this.vertical.style.top = ((this.crosslength + this.bold) / -2) + "px";

		this.vertical.style.height = this.crosslength + "px";
		this.vertical.style.width = this.bold + "px";

		if(this.isWhite) {
			this.horizontal.style.backgroundColor = "#ffffff";
			this.vertical.style.backgroundColor = "#ffffff";
		}
		else {
			this.horizontal.style.backgroundColor = "#000000";
			this.vertical.style.backgroundColor = "#000000";
		}

		this.element.appendChild(this.horizontal);
		this.element.appendChild(this.vertical);
	},
	
	createBorder: function() {
		this.horizontal = document.createElement('div');
		this.horizontal.style.position = 'relative';
		this.horizontal.className = this.displayClass + 'Horizon';

		this.vertical = document.createElement('div');
		this.vertical.style.position = 'relative';
		this.vertical.className = this.displayClass + 'Verticality';
	},

	CLASS_NAME: "OpenLayers.Control.CenterCross"
});
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/* Modified by by Geospatial Information Authority of Japan., published under the Clear BSD license. */

/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.ScaleBar
 * A scale bar styled with CSS.
 * 
 * Inherits from:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.ScaleBar = OpenLayers.Class(OpenLayers.Control, {

    /**
     * Property: element
     * {Element}
     */
    element: null,
    
    /**
     * Property: scale
     * {Float} Scale denominator (1 / X) - set on update
     */    
    scale: 1,

    /**
     * APIProperty: displaySystem
     * {String} Display system for scale bar - metric or english supported.
     *     Default is metric.
     */
    displaySystem: 'metric',

    /**
     * APIProperty: minWidth
     * {Integer} Minimum width of the scale bar in pixels.  Default is 100 px.
     */
    minWidth: 100,

    /**
     * APIProperty: maxWidth
     * Maximum width of the scale bar in pixels.  Default is 200 px.
     */
    maxWidth: 200,

    /**
     * APIProperty: divisions
     * {Integer} Number of major divisions for the scale bar.  Default is 2.
     */
    divisions: 2,

    /**
     * APIProperty: subdivisions
     * {Integer} Number of subdivisions per major division.  Default is 2.
     */
    subdivisions: 2,

    /**
     * APIProperty: showMinorMeasures
     * {Boolean} Show measures for subdivisions.  Default is false.
     */
    showMinorMeasures: false,

    /**
     * APIProperty: abbreviateLabel
     * {Boolean} Show abbreviated measurement unit (ft, km).  Default is false.
     */
    abbreviateLabel: false,

    /**
     * APIProperty: geodesic
     * {Boolean} Use geodesic measurement. Default is false. The recommended
     * setting for maps in EPSG:4326 is false, and true EPSG:900913. If set to
     * true, the scale will be calculated based on the horizontal size of the
     * pixel in the center of the map viewport.
     */
    geodesic: true,

    /**
     * APIProperty: div
     * {Element} Optional DOM element to become the container for the scale
     *     bar.  If not provided, one will be created.
     */
    div: null,
    
    /**
     * Property: scaleText
     * Text to prefix the scale denominator used as a title for the scale bar
     *     element.  Default is "scale 1:".
     */
    scaleText: "scale 1:",
    
    /**
     * Property: thousandsSeparator
     * Thousands separator for formatted scale bar measures.  The title
     *     attribute for the scale bar always uses
     *     <OpenLayers.Number.thousandsSeparator> for number formatting.  To
     *     conserve space on measures displayed with markers, the default
     *     thousands separator for formatting is "" (no separator).
     */
    thousandsSeparator: "",

    /**
     * Property: measurementProperties
     * {Object} Holds display units, abbreviations, and conversion to inches
     * (since we're using dpi) per measurement sytem.
     */
    measurementProperties: {
        english: {
            units: ['miles', 'feet', 'inches'],
            abbr: ['mi', 'ft', 'in'],
            inches: [63360, 12, 1]
        },
        metric: {
            units: ['kilometers', 'meters', 'centimeters'],
            abbr: ['km', 'm', 'cm'],
            inches: [39370.07874, 39.370079, 0.393701]
        }
    },

    /**
     * Property: customStyle
     * {Object} For cases where <limitedStyle> is true, a customStyle property
     *     can be set on the options sent to the constructor.  The
     *     <defaultStyles> object will be extended with this custom style
     *     object.
     */
    customStyles: null,

    /**
     * Property: defaultStyles
     * {Object} For cases where <limitedStyle> is true, default scale bar
     *     element offsets are taken from this object.  Values correspond to
     *     pixel dimensions given in the stylesheet.
     */
    defaultStyles: {
        Bar: {
            height: 1, top: 14,
            borderLeftWidth: 0,
            borderRightWidth: 0
        },
        BarAlt: {
            height: 1, top: 14,
            borderLeftWidth: 0,
            borderRightWidth: 0
        },
        MarkerMajor: {
            height: 7, width: 1, top: 11,
            borderLeftWidth: 0,
            borderRightWidth: 0
        },
        MarkerMinor: {
            height: 5, width: 1, top: 12,
            borderLeftWidth: 0,
            borderRightWidth: 0
        },
        NumbersBox: {
            height: 13, width: 40, top: 21
        },
        LabelBox: {
            height: 15, top: -2
        },
        Background: {
        	height: 30, top: 3,
        	borderLeftWidth: 0,
        	borderRightWidth: 0
        }
    },
    
    /**
     * Property: appliedStyles
     * For cases where <limitedStyle> is true, scale bar element offsets will
     *     be determined based on <defaultStyles> extended with any
     *     <customStyles>.
     */
    appliedStyles: null,

    /**
     * Property: displayLabelUnit
     * {Boolean} Display unit label above ScaleBar.
     */
    displayLabelUnit: false,

    /**
     * Property: displayUnit
     * {Boolean} Display unit label next final measure.
     */
    displayUnit: true,

    /**
     * Constructor: OpenLayers.Control.ScaleBar
     * Create a new scale bar instance.
     *
     * Parameters: 
     * options - {Object} Optional object whose properties will be set on this
     *     object.
     */
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.appliedStyles = OpenLayers.Util.extend({}, this.defaultStyles);
        OpenLayers.Util.extend(this.appliedStyles, this.customStyles);

        // create scalebar DOM elements
        this.element = document.createElement('div');
        this.element.style.position = 'relative';
        this.element.className = this.displayClass + 'Wrapper';
        
        this.labelContainer = document.createElement('div');
        this.labelContainer.className = this.displayClass + 'Units';
        this.labelContainer.style.position = 'absolute';
        this.graphicsContainer = document.createElement('div');
        this.graphicsContainer.style.position = 'absolute';
        this.graphicsContainer.className = this.displayClass + 'Graphics';
        this.numbersContainer = document.createElement('div');
        this.numbersContainer.style.position = 'absolute';
        this.numbersContainer.className = this.displayClass + 'Numbers';
        this.backgroundContainer = document.createElement('div');
        this.backgroundContainer.style.position = 'absolute';
        this.backgroundContainer.className = this.displayClass + 'Background';
        
        this.element.appendChild(this.backgroundContainer);
        this.element.appendChild(this.graphicsContainer);
        this.element.appendChild(this.labelContainer);
        this.element.appendChild(this.numbersContainer);
    },
    
    /**
     * APIMethod: destroy
     * Destroy the control.
     */
    destroy: function() {
        this.map.events.unregister('moveend', this, this.onMoveend);
        this.div.innerHTML = "";
        OpenLayers.Control.prototype.destroy.apply(this);
    },

    /**
     * Method: draw
     */    
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        // determine offsets for graphic elements
        this.dxMarkerMajor = (
            this.styleValue('MarkerMajor', 'borderLeftWidth') +
            this.styleValue('MarkerMajor', 'width') +
            this.styleValue('MarkerMajor', 'borderRightWidth')
        ) / 2;
        this.dxMarkerMinor = (
            this.styleValue('MarkerMinor', 'borderLeftWidth') +
            this.styleValue('MarkerMinor', 'width') +
            this.styleValue('MarkerMinor', 'borderRightWidth')
        ) / 2;
        this.dxBar = (
            this.styleValue('Bar', 'borderLeftWidth') +
            this.styleValue('Bar', 'borderRightWidth')
        ) / 2;
        this.dxBarAlt = (
            this.styleValue('BarAlt', 'borderLeftWidth') +
            this.styleValue('BarAlt', 'borderRightWidth')
        ) / 2;
        this.dxNumbersBox = this.styleValue('NumbersBox', 'width') / 2;
        this.dxBackground = (
            this.styleValue('Background', 'borderLeftWidth') +
            this.styleValue('Background', 'borderRightWidth')
        ) / 2;
        
        // set scale bar element height
        var classNames = ['Bar', 'BarAlt', 'MarkerMajor', 'MarkerMinor', 'Background'];
        classNames.push('NumbersBox', 'LabelBox');
        var vertDisp = 0;
        for(var classIndex = 0; classIndex < classNames.length; ++classIndex) {
            var cls = classNames[classIndex];
            vertDisp = Math.max(
                vertDisp,
                this.styleValue(cls, 'top') + this.styleValue(cls, 'height')
            );
        }
        this.element.style.height = vertDisp + 'px';
        
        this.div.appendChild(this.element);
        this.map.events.register('moveend', this, this.onMoveend);
        this.update();
        return this.div;
    },
    
    /**
     * Method: onMoveend
     * Registered as a listener for "moveend".
     */
    onMoveend: function() {
        this.update();
    },
   
    /**
     * APIMethod: update
     * Update the scale bar after modifying properties.
     *
     * Parameters:
     * scale - {Float} Optional scale denominator.  If not specified, the
     *     map scale will be used.
     */
    update: function(scale) {
        if(this.map.baseLayer == null || !this.map.getScale()) {
            return;
        }
        if(this.geodesic === true) {
            var units = this.map.getUnits();
            if(!units) {
                return;
            }
            var inches = OpenLayers.INCHES_PER_UNIT;
            scale = (this.map.getGeodesicPixelSize().w || 0.000001) *
                    inches["km"] * OpenLayers.DOTS_PER_INCH;
                    
        }
        this.scale = (scale != undefined) ? scale : this.map.getScale();
        // update the element title and width
        this.element.title = this.scaleText + OpenLayers.Number.format(this.scale);
        this.element.style.width = this.maxWidth + 'px';
        // check each measurement unit in the display system
        var comp = this.getComp();
        // get the value (subdivision length) with the lowest cumulative score
        this.setSubProps(comp);
        // clean out any old content from containers
        this.labelContainer.innerHTML = "";
        this.graphicsContainer.innerHTML = "";
        this.numbersContainer.innerHTML = "";
        this.backgroundContainer.innerHTML = "";
        // create all divisions
        var numDiv = this.divisions * this.subdivisions;
        var alignmentOffset = this.dxNumbersBox;
        
        this.backgroundContainer.appendChild(this.createElement(
            "Background", " ", 0, this.subProps.pixels * numDiv + alignmentOffset * 2 + this.dxNumbersBox
        ));

        var xPos, measure, divNum, cls, left;
        for(var di=0; di<this.divisions; ++di) {
            // set xPos and measure to start of division
            xPos = di * this.subdivisions * this.subProps.pixels + alignmentOffset;
            // add major marker
            this.graphicsContainer.appendChild(this.createElement(
                "MarkerMajor", " ", xPos - this.dxMarkerMajor
            ));
            // add major measure
            measure = (di == 0) ? 0 :
                OpenLayers.Number.format(
                    (di * this.subdivisions) * this.subProps.length,
                    this.subProps.dec, this.thousandsSeparator
                );
            this.numbersContainer.appendChild(this.createElement(
                "NumbersBox", measure, xPos - this.dxNumbersBox
            ));

            // create all subdivisions
            for(var si=0; si<this.subdivisions; ++si) {
                if((si % 2) == 0) {
                    cls = "Bar";
                    left = xPos - this.dxBar;
                } else {
                    cls = "BarAlt";
                    left = xPos - this.dxBarAlt;
                }
                this.graphicsContainer.appendChild(this.createElement(
                    cls, " ", left, this.subProps.pixels
                ));
                // add minor marker if not the last subdivision
                if(si < this.subdivisions - 1) {
                    // set xPos and measure to end of subdivision
                    divNum = (di * this.subdivisions) + si + 1;
                    xPos = divNum * this.subProps.pixels + alignmentOffset;
                    this.graphicsContainer.appendChild(this.createElement(
                        "MarkerMinor", " ", xPos - this.dxMarkerMinor
                    ));
                    if(this.showMinorMeasures) {
                        // add corresponding measure
                        measure = divNum * this.subProps.length;
                        this.numbersContainer.appendChild(this.createElement(
                            "NumbersBox", measure, xPos - this.dxNumbersBox
                        ));
                    }
                }
            }
        }
        // set xPos and measure to end of divisions
        xPos = numDiv * this.subProps.pixels;
        xPos += alignmentOffset;
        // add the final major marker
        this.graphicsContainer.appendChild(this.createElement(
            "MarkerMajor", " ", xPos - this.dxMarkerMajor
        ));
        // add final measure
        measure = OpenLayers.Number.format(
            numDiv * this.subProps.length,
            this.subProps.dec, this.thousandsSeparator
        );
        this.numbersContainer.appendChild(this.createElement(
            "NumbersBox", measure, xPos - this.dxNumbersBox
        ));
        
        // add unit label next final measure
        if (this.displayUnit) {
            this.numbersContainer.appendChild(this.createElement(
                "NumbersBox", this.subProps.abbr, xPos));
        }
        
        // add content to the label element
        if (this.displayLabelUnit) {
            var labelBox = document.createElement('div');
            labelBox.style.position = 'absolute';
            var labelText;
            labelText = '';
            labelBox.className = this.displayClass + 'LabelBox';
            labelBox.style.textAlign = 'center';
            labelBox.style.width = Math.round(numDiv * this.subProps.pixels) + 'px'
            labelBox.style.left = Math.round(alignmentOffset) + 'px';
            labelBox.style.overflow = 'hidden';
            if(this.abbreviateLabel) {
                labelText += ' ' + this.subProps.abbr;
            } else {
                labelText += ' ' + this.subProps.units;
            }
            labelBox.appendChild(document.createTextNode(labelText));
            this.labelContainer.appendChild(labelBox);
        }
    },
    
    /**
     * Method: createElement
     * Create a scale bar element.  These are absolutely positioned with
     *     hidden overflow and left offset.
     *
     * Parameters:
     * cls - {String} Class name suffix.
     * text - {String} Text for child node.
     * left - {Float} Left offset.
     * width - {Float} Optional width.
     * 
     * Returns:
     * {Element} A scale bar element.
     */
    createElement: function(cls, text, left, width) {
        var element = document.createElement("div");
        element.className = this.displayClass + cls;
        OpenLayers.Util.extend(element.style, {
            position: "absolute",
            textAlign: "center",
            overflow: "hidden",
            left: Math.round(left) + "px"
        });
        element.appendChild(document.createTextNode(text));
        if(width) {
            element.style.width = Math.round(width) + "px";
        }
        return element;
    },
    
    /**
     * Method: getComp
     * Get comparison matrix.
     */
    getComp: function() {
        var system = this.measurementProperties[this.displaySystem];
        var numUnits = system.units.length;
        var comp = new Array(numUnits);
        var numDiv = this.divisions * this.subdivisions;
        for(var unitIndex = 0; unitIndex < numUnits; ++unitIndex) {
            comp[unitIndex] = {};
            var ppdu = OpenLayers.DOTS_PER_INCH *
                system.inches[unitIndex] / this.scale;
            var minSDDisplayLength = ((this.minWidth - this.dxNumbersBox) /
                                       ppdu) / numDiv;
            var maxSDDisplayLength = ((this.maxWidth - this.dxNumbersBox) /
                                       ppdu) / numDiv;
            // add up scores for each marker (even if numbers aren't displayed)
            for(var vi=0; vi<numDiv; ++vi) {
                var minNumber = minSDDisplayLength * (vi + 1);
                var maxNumber = maxSDDisplayLength * (vi + 1);
                var num = this.getHandsomeNumber(minNumber, maxNumber);
                var compNum = {
                    value: (num.value / (vi + 1)),
                    score: 0, tie: 0, dec: 0, displayed: 0
                };
                // tally up scores for all values given this subdivision length
                for(var vi2=0; vi2<numDiv; ++vi2) {
                    var position = num.value * (vi2 + 1) / (vi + 1);
                    var num2 = this.getHandsomeNumber(position, position);
                    var major = ((vi2 + 1) % this.subdivisions == 0);
                    var last = ((vi2 + 1) == numDiv);
                    if(major || this.showMinorMeasures) {
                        // count scores for displayed marker measurements
                        compNum.score += num2.score;
                        compNum.tie += num2.tie;
                        compNum.dec = Math.max(compNum.dec, num2.dec);
                        compNum.displayed += 1;
                    } else {
                        // count scores for non-displayed marker measurements
                        compNum.score += num2.score / this.subdivisions;
                        compNum.tie += num2.tie / this.subdivisions;
                    }
                }
                // adjust scores so numbers closer to 1 are preferred for display
                compNum.score *= (unitIndex + 1) * compNum.tie / compNum.displayed;
                comp[unitIndex][vi] = compNum;
            }
        }
        return comp;
    },
    
    /**
     * Method: setSubProps
     * Set subdivision properties based on comparison matrix.
     */
    setSubProps: function(comp) {
        var system = this.measurementProperties[this.displaySystem];
        var score = Number.POSITIVE_INFINITY;
        var tie = Number.POSITIVE_INFINITY;
        var curUnitIndex;
        
        for(var unitIndex = 0; unitIndex < comp.length; ++unitIndex) {
            var ppdu = OpenLayers.DOTS_PER_INCH *
                system.inches[unitIndex] / this.scale;
            for(var vi in comp[unitIndex]) {
                var compNum = comp[unitIndex][vi];
                if((compNum.score < score) ||
                   ((compNum.score == score) && (compNum.tie < tie))) {
                    this.subProps = {
                        length: compNum.value,
                        pixels: ppdu * compNum.value,
                        units: system.units[unitIndex],
                        abbr: system.abbr[unitIndex],
                        dec: compNum.dec 
                    };
                    score = compNum.score;
                    tie = compNum.tie;
                    
                    curUnitIndex = unitIndex;
                }
            }
        }

		if (this.displaySystem == 'metric')
		{
	        if (this.subProps.length < 1 && curUnitIndex < system.units.length)
	        {
	        	var newUnitIndex = curUnitIndex + 1;
	        	this.subProps.units = system.units[newUnitIndex];
	        	this.subProps.abbr = system.abbr[newUnitIndex];
	        	
	        	var mul = Math.round(system.inches[curUnitIndex] / system.inches[newUnitIndex]);
	        	
	        	this.subProps.length = this.subProps.length * mul;
	        	this.subProps.dec = 0;
	        }
		}
    },
    
    /**
     * Method: styleValue
     * Get an integer value associated with a particular selector and key.
     *     Given a stylesheet with .displayClassSomeSelector {border: 2px solid red},
     *     styleValue('SomeSelector', 'borderWidth') returns 2
     *
     * Returns:
     * {Integer} A value associated with a style selector/key combo.
     */
    styleValue: function(selector, key) {
        var value = 0;
        value = this.appliedStyles[selector][key];
        return value ? value : 0;
    },

    /**
     * Method: getHandsomeNumber
     * Attempts to generate a nice looking positive number between two other
     *     positive numbers.
     *
     * Parameters:
     * small - {Float} Lower positive bound.
     * big - {Float} Upper positive bound.
     * sigFigs - {Integer} Number of significant figures to consider.  Default
     *     is 10.
     *
     * Returns:
     * {Object} Object representing a nice looking number.
     */
    getHandsomeNumber: function(small, big, sigFigs) {
        sigFigs = (sigFigs == null) ? 10 : sigFigs;
        // if all else fails, return a small ugly number
        var num = {
            value: small,
            score: Number.POSITIVE_INFINITY,
            tie: Number.POSITIVE_INFINITY,
            dec: 3
        };
        // try the first three comely multiplicands (in order of comliness)
        var cmult, max, dec, tmult, multiplier, score, tie;
        for(var hexp = 0; hexp < 3; ++hexp) {
            cmult = Math.pow(2, (-1 * hexp));
            max = Math.floor(Math.log(big / cmult) / Math.LN10);
            for(var texp = max; texp > (max - sigFigs + 1); --texp) {
                dec = Math.max(hexp - texp, 0);
                tmult = cmult * Math.pow(10, texp);
                // check if there is an integer multiple of tmult
                // between small and big
                if((tmult * Math.floor(big / tmult)) >= small) {
                    // check if small is an integer multiple of tmult
                    if(small % tmult == 0) {
                        multiplier = small / tmult;
                    } else {
                        // smallest integer multiple between small and big
                        multiplier = Math.floor(small / tmult) + 1;
                    }
                    // test against the best (lower == better)
                    score = multiplier + (2 * hexp);
                    tie = (texp < 0) ? (Math.abs(texp) + 1) : texp;
                    if((score < num.score) || ((score == num.score) &&
                       (tie < num.tie))) {
                        num.value = parseFloat((tmult * multiplier).toFixed(dec));
                        num.score = score;
                        num.tie = tie;
                        num.dec = dec;
                    }
                }
            }
        }
        return num;
    },
    
    CLASS_NAME: "OpenLayers.Control.ScaleBar"
    
});

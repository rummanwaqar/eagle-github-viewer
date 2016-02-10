/*
 * Parses XML files into Eagle JSON Object
 */
var EagleParser = function( raw_xml ) {
	/*
	 * Private Variables
	 * =================
	 */

	// parse xml to jquery object
	var xmlDoc = $.parseXML(raw_xml), $xml = $(xmlDoc);
	// @ todo: remove this line, only for testing
	console.log(xmlDoc);

	/*
	 * Functions
	 * =========
	 */

	// parse version number
	function parseVersion() {
		// output data
		var output = { version: null, err_msg: null };

		// lookup <eagle version="7.2.0"> tag
		var $eagle_version = ($xml.find("eagle").attr("version"));

		// check if eagle tag with this attribute was available
		if( $eagle_version != undefined ) {
			// parse version number
			var version = $eagle_version.split('.');
			if( version.length == 3 ) {
				// version is higher or equal to 6.0.0
				if( version[0] >= 6 ) {
					// return proper version
					output.version = $eagle_version;
				} else {
					// old version
					output.err_msg = 'Eagle file is using a version older than 6.0.0';
				}
			} else {
				// version attribute couldn't be parsed properly
				output.err_msg = "The version number couldn't be parsed";
			}
		} else {
			// not a valid eagle file
			output.err_msg = 'Not a valid eagle file'
		}

		return output;
	} // End-of-Function

	// get grid information
	function parseGrid() {
		// output data
		var output = { err_msg: null };

		// parse grid tag 
		var grid = ($xml.find("grid")[0]);
		if( grid != undefined ) {
			for ( var i = 0, atts = grid.attributes, n = atts.length; i < n; i++){
    			output[atts[i].nodeName] = isNaN(atts[i].nodeValue) ? atts[i].nodeValue : +atts[i].nodeValue;
			}
		} else {
			output.err_msg = 'Could not find the grid data';
		}

		return output;
	} // End-of-Function

	// get values of all the layers
	function parseLayers() {
		// output data
		var output = { err_msg: null };

		// parse layers
		var $layers = $xml.find("layer");
		// validation
		if( $layers.length <= 0) {
			output.err_msg = 'No layers found.';
		}
		// process each layer
		$layers.each(function(_i, _layer) {
			$layer = $(_layer);
			output[+$layer.attr('number')] = {
				name: $layer.attr('name'),
				color: $layer.attr('color'),
				fill: $layer.attr('fill'),
				visible: $layer.attr('visible') == "no" ? false : true,
				active: $layer.attr('active') == "no" ? false : true
			}
		});

		return output;
	} // End-of-Function

	// parse libraries
	function get_libraries() {
		var output = {};

		// parse libraries
		var $libraries = $xml.find("library");
		// validate size
		if( $libraries.length > 0 ) {
			$libraries.each(function(_i, _library) {
				$library = $(_library);
				output[$library.attr('name')] = get_library($library);
			});
		} 

		return output;

	} // End-of-Function

	// parse single library
	function get_library( $library ) {
		var output = {}

		// load symbols
		var $symbols = $library.find("symbol");
		// validate size and parse
		if( $symbols.length > 0 ) {
			$symbols.each(function(_i, _symbol) {
				$symbol = $(_symbol);
				output[$symbol.attr('name')] = get_symbol($symbol);
			});
		}

		return output;
	}

	// parse single symbol
	function get_symbol( $symbol ) {
		var output = {};

		
		
		return output;
	}

	 /*
	  * Public Properties / Methods
	  * ===========================
	  */
	 return {
	 	get_version: parseVersion,
	 	get_grid: parseGrid,
	 	get_layers: parseLayers,
	 	get_libraries: get_libraries
	 };
};

// Test my implementation
$(document).ready(function() {
	// TODO: xml should be input into the system later
	$.get("https://raw.githubusercontent.com/UAlberta-EcoCar/MotorController/master/Motor_Driver_v3.sch", function(xml) {
		// create parsing object
		var schematic_parser = new EagleParser(xml);

		// get eagle version
		// console.log(schematic_parser.get_version());
		// get grid data 
		// console.log(schematic_parser.get_grid());
		// get layer information
		// console.log(schematic_parser.get_layers());
		console.log(schematic_parser.get_libraries());

	});
});
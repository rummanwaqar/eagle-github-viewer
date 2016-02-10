# Parsing Eagle XML Schematic to JSON
The eagle document type definition (DTD) defines the building blocks of the XML document. *(Parts of the DTD that have been implemented will be commented)*

## Reading XML
Using JQuery `get()` method we are reading the XML and converting it into JSON using `parseXML()`. 

#### Sidenote: Classes in JavaScript
I wanted to implement public and private methods in the javascript class.

``` Javascript
var EagleParser = function( raw_xml ) {
	/*
	 * Private Variables
	 */

	// parse xml to jquery object
	var _xmlDoc = $.parseXML(xml), _xml = $(xmlDoc);
	
	/*
	 * Functions
	 */

	 /*
	  * Public Properties / Methods
	  */
	 return {

	 };
};

```

### Parse
* Parsed the version number of the eagle file
* Drawing tag, contains:
	* settings - not handling right now
	* grid - parsed to JSON (don't know what it means though)
	* layers - layer information (ID, name, color, fill, visible, active)
	* schematic - contains the main schematic


* Schematic: don't know what the attributes mean
	* libraries - contains all the libraries used
		* packages - not until implementing pcbs
		* symbols <------------------------------------------
		* devicessets
	* attributes - don't know what this is
	* variantdefs - empty
	* classes - not handling right now
	* parts
	* sheets
	* errors - not handling right now
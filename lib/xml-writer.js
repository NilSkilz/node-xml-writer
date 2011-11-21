function cbtest(haystack, needle) {
	return (haystack & needle) == needle;
}	
function XMLWriter(options) {
	if (!(this instanceof XMLWriter)) {
		return new XMLWriter();
	}
	options = options || {};
	var output = '';
	var stack = [];
	var depth = 0;
	var thickness = 0;
	
	this.toString = function() {
		this.flush();
		return output;
	}

	function write() {
		 for (var i = 0; i < arguments.length; i++) {
			 output += arguments[i];
		 }
	 }

	function attr(s) {
		return '"'+s.replace('"', '&quot;')+'"';
	}

	this.flush = function() {
		for(var i = depth; i < 0; i--) {
			this.endElement();
		}
		depth = 0;
	}


	this.startDocument = function(version, encoding, standalone) {
		if (depth || thickness) return;
		write('<?xml version=');
		if (typeof version == "string") {
			write(attr(version));
		}
		else {
			write(attr('1.0'));
		}
		if (typeof encoding == "string") {
			write(' encoding=', attr(encoding));	
		}
		if (standalone) {
			write(' standalone=', attr('yes'));	
		}
		write('?>');
		write('\n');
	}

	this.endDocument = function() {
		if (thickness) this.endAttributes();
	}

	this.startElement = function(name) { 
		if (thickness) this.endAttributes();
		++depth;
		stack.push({ name:name, depth:depth});
		console.log('STACK');
		write('<',name);
		this.startAttributes();
	}

	this.startAttributes = function() {
		thickness = 1;
	}

	this.endAttributes = function() {
		thickness = 0;
		write('>');
	}

	this.text = function(value) {		
		if (thickness) this.endAttributes();
		++depth;
		write(value.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
	}

	this.endElement = function() { 
		--depth;
		if (thickness > 0) {
			write('/');
			this.endAttributes();
		}
		else if (depth) {
			var t = stack.pop();
			console.log(t);

			write('</',t.name,'>');
		}
	}

}
module.exports = XMLWriter;
/*	this.endAttribute = function() {
	}
	this.endCData = function() {
	}
	this.endComment = function() {
	}
		this.endDTDAttlist = function() {
	}
	this.endDTDElement = function() {
	}
	this.endDTDEntity = function() { 
	}
	this.endDTD = function() {
	}
	this.endPI = function() {
	}
	this.flush = function() {
	}
	this.fullEndElement = function() { 
	}
	this.openMemory = function() {
	}
	this.openURI = function() {
	}
	this.outputMemory = function() {
	}
	this.setIndentString = function() { 
	}
	this.setIndent = function() {
	}
	this.startAttributeNs = function() {
	}
	this.startAttribute = function() { 
	}
	this.startCData = function() {
	}
	this.startComment = function() {
	}
	this.startDTDAttlist = function() {
	}
	this.startDTDElement = function() {
	}
	this.startDTDEntity = function() { 
	}
	this.startDTD = function() {
	}
	this.startElementNs = function() {
	}
	this.startPI = function() {
	}

	this.writeAttributeNs = function() {
	}
	this.writeAttribute = function() { 
	}
	this.writeCData = function() {
	}
	this.writeComment = function() {
	}
	this.writeDTDAttlist = function() {
	}
	this.writeDTDElement = function() {
	}
	this.writeDTDEntity = function() { 
	}
	this.writeDTD = function() {
	}
	this.writeElementNS = function() {
	}
	this.writeElement = function() { 
	}
	this.writePI = function() { 
	}
	this.writeRaw = function() { 
	}
*/
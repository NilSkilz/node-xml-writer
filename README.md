# XMLWriter for NodeJS

It's native and full javascript implementation of the classic XMLWriter class.
The API is complete, flexible and tolerant.
XML is still valid.

# Installation

With [npm](http://npmjs.org) do:

    $ npm install xml-writer


# Examples

## Basic
```javascript
	var XMLWriter = require('xml-writer');
	xw = new XMLWriter;
	xw.startDocument();
	xw.startElement('root');
	xw.writeAttribute('foo', 'value');
	xw.text('Some content');
	xw.endDocument();

	console.log(xw.toString());
```
Output:
```XML
<?xml version="1.0"?>
<root foo="value">Some content</root>
```
## Chaining
```javascript
	var XMLWriter = require('xml-writer');
	xw = new XMLWriter;
	xw.startDocument().startElement('root').writeAttribute('foo', 'value').writeElement('tag', 'Some content');

	console.log(xw.toString());
```
Output:
```xml
    <?xml version="1.0"?>
	<root foo="value"><tag>Some content</tag></root>
```
## Tolerant
```javascript
	var XMLWriter = require('xml-writer');
	xw = new XMLWriter;
	xw.startElement('root').writeAttribute('foo', 'value').text('Some content');

	console.log(xw.toString());
```
Output:
```xml
	<root foo="value">Some content</root>
```

## Extensible
```javascript
	var XMLWriter = require('xml-writer'),
               fs = require('fs');
	var ws = fs.createWriteStream('/tmp/foo.xml');
	ws.on('close', function() {
			console.log(fs.readFileSync('/tmp/foo.xml', 'UTF-8'));
	});
	xw = new XMLWriter(false, function(string, encoding) { 
			ws.write(string, encoding);
	});
	xw.startDocument('1.0', 'UTF-8').startElement(function() {
		return 'root';
	}).text(function() {
		return 'Some content';
	});
	ws.end();
```

Output:
```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<root>Some content</root>
```
	
# Tests

Use [nodeunit](https://github.com/caolan/nodeunit) to run the tests.

    $ npm install nodeunit
    $ nodeunit test

# API Documentation

## Generic

### constructor XMLWriter(Boolean indent, Function writer(string, encoding))
Create an new writer

### text(String content)
Write text

### writeRaw 
Write a raw XML text

## Document
### startDocument(String version = '1.0', String encoding = NULL, Boolean standalone = false) 
Create document tag

### endDocument()
End current document

## Element

### writeElement(String name, String content)
Write full element tag

### writeElementNS
Write full namespaced element tag

### startElementNS
Create start namespaced element tag

### startElement(String name)
Create start element tag

### endElement()
End current element

## Attributes

### writeAttribute(String name, String value)
Write full attribute

### writeAttributeNS
Write full namespaced attribute

### startAttributeNS
Create start namespaced attribute

### startAttribute(String name)
Create start attribute

### endAttribute()
End attribute

## Processing Instruction

### writePI(String name, String content)
Writes a PI

### startPI(String name)
Create start PI tag

### endPI()
End current PI

## CData

### writeCData(String name, String content)
Write full CDATA tag

### startCData(String name)
Create start CDATA tag

### endCData()
End current CDATA

## Comment

### writeComment(String content)
Write full comment tag

### startComment()
Create start comment

### endComment()
Create end comment

# Also

* https://github.com/minchenkov/simple-xml-writer
* https://github.com/wezm/node-genx

# License

[MIT/X11](./LICENSE)

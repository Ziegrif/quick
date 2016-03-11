

function editXML{
	var generatedFile = $('#address').val() + '.xml';
	var dataPointToAdd = $('#dataPointer').val();
	var targetToAdd = $('#targetPointer').val();
	var output = $('#output').val();
	
	$.ajax({
		url: 'changeTheXMLfile.php',
		type: 'GET',
		datatype: 'xml',
		cache: false,
		data: {filename: generatedFile , content: listXML},
		success: function(){
			console.log('success');
			
		}
		
	});
	
});

$('#XMLchanges').click(editXML()); 


$.ajax({
			url: xmlFileName,
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				console.log (returnedXMLResponse)
				$('dataPoint',returnedXMLResponse).each(function(){
					var $content;
					var $src = $(this).attr('src');
					var $clocks = $(this).attr('clocks')
					
						if ($src == null) {
							$content = $(this).text();
							$DropClass = 'dropTarget';
							$draggEr = 'numbero audioClass';
						} else if ($clocks == "true") {
							$content = '<img src="' +  $(this).attr('src') + '" height=\'95\' width=\'100\' />';
							$DropClass = 'clockDrop';
							$draggEr = 'clockDrag';
						
						} else {
							$content = '<img src="' +  $(this).attr('src') + ' height=\'90\' width=\'90\' />';
							$DropClass = 'dropTargetImage' + $(this).text();
							$draggEr = 'imageDragger';
						}
					
					
					
					var row = [$content , $(this).attr('target')];
					
					tmpArc.push(row);
					
					
	
			})
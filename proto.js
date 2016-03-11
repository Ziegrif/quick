

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
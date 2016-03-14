

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
			
			$('target',returnedXMLResponse).each(function(){
	
					var targetting = [$(this).text() , $(this).attr('id')]
					tmpDrop.push(targetting);
			})
			
			for (var i=0; i<tmpDrop.length; i++) {
				$("<div class=" + $DropClass + ">" + tmpDrop[i][0] + '</div>').data('number', tmpDrop[i][1]).appendTo('.drop').droppable( {
					
					accept: '.block div',
					hoverClass: 'hovered',
					drop: handleCardDrop,
					activate: handleDragEvent
				});
				//console.log(i +  ': data-number ' + $('#item_'+tmpDrop[i]).data('number'));
			}
			//console.log(tmpArc);
			//This here randomizes the draggables and then makes them into different divs with the numbero class.
			
	
			for (var j=0; j<tmpArc.length; j++) {
	
				$("<div class="+ $draggEr +" onclick=\"\" >" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
					containment: '.borderPatrol',
					stack: '.block div',
					cursor: 'move',
					
					//revert: true
				});
				$("div .clockDrag").each(function(i){
					$(this).addClass("S"+(i+1))
				});
			
			}
			}
		
	});
	
			})
//Quick javascript
var correct = 0;
$(document).bind('touchmove', false);
$( init );
$(document).ready(
	function(){
		$("#saving").hide();
		$('div#score').hide();
		$('html, body').css({
			'overflow': 'hidden',
			'height': '100%'
		});
	});
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});


//The initialization function
function init() {
	correct = 0;
	$('.block').html( '' );
	$('.drop').html( '' );
	$("#finale").hide();
	//this generates the draggables from the generate.xml file form the datapoint element
	var tmpArc=[];
	var tmpDrop=[];

	$.ajax({
			url: 'generate.xml',
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				
				$('dataPoint',returnedXMLResponse).each(function(){
					var row = [ $(this).text() , $(this).attr('target'), $(this).attr('src')];
					tmpArc.push(row);
	
			})
			
			$('target',returnedXMLResponse).each(function(){
	
					var targetting = [$(this).text() , $(this).attr('id')]
					tmpDrop.push(targetting);
			})
			
			for (var i=0; i<tmpDrop.length; i++) {
				$("<div class='dropTarget'>" + tmpDrop[i][0] + '</div>').data('number', tmpDrop[i][1]).appendTo('.drop').droppable( {
					accept: '.block div',
					hoverClass: 'hovered',
					drop: handleCardDrop,
					activate: handleDragEvent
				});
				//console.log(i +  ': data-number ' + $('#item_'+tmpDrop[i]).data('number'));
			}
			//console.log(tmpArc);
			//This here randomizes the draggables and then makes them into different divs with the numbero class.
			tmpArc.sort( function() { return Math.random() - .5 } );
	
			for (var j=0; j<tmpArc.length; j++) {
	
				$("<div class='numbero playSound'>" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
					containment: '.borderPatrol',
					stack: '.block div',
					cursor: 'move',
					//revert: true
				});
			}
			}
			
		
	});
	
}

function change() {
	correct = 0;
	$('.block').html( '' );
	$('.drop').html( '' );
	$("#finale").hide();
	//this generates the draggables from the generate.xml file form the datapoint element
	var tmpArc=[];
	var tmpDrop=[];
	var xmlFileName = $("#XmlName").val() + '.xml';

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
	
}

//This function handles what happens when a draggable is put into a droppable
function handleCardDrop(event, ui) {
	var slotNumber = $(this).data('number');
	var cardNumber = ui.draggable.data('number');
	var isImage = $(this).hasClass('dropTargetImage');
	//var isAclock = $(draggEr).hasClass('clockDrag');
	
	//console.log("card " + cardNumber);
	//console.log("slot " + slotNumber);
	if (slotNumber == cardNumber &&  $draggEr == 'clockDrag') {
		ui.draggable.addClass('imageOikein');
		ui.draggable.data("valid", true);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		correct++
	}
	
	else if (slotNumber == cardNumber && $draggEr == 'numbero audioClass') {
		ui.draggable.addClass('oikein');
		ui.draggable.data("valid", true);
		//ui.draggable.draggable('disable');
		//$(this).droppable('disable');
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		//ui.draggable.draggable('option', 'revert', false);
		correct++;
		
		
	} else if (slotNumber !== cardNumber) {
		ui.draggable.data("valid",false);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
	}
	$('div#score').html(correct);
}
// This one handles the dragging event for example when you drag it off a correct square it substracts from the correct pool preventing infinite points
function handleDragEvent(event, ui){
		if(ui.draggable.data("valid")) {
			ui.draggable.removeClass('oikein');
			ui.draggable.removeClass('imageOikein');
			correct--;
			ui.draggable.data("valid",false);
		}
		$('div#score').html(correct);
		
	}
//This function checks for right answers
function validation(){
	if($("div").hasClass("oikein")){
		$(".oikein").toggleClass("finish")
		
	}else if($("div").hasClass("imageOikein")){
	$(".imageOikein").toggleClass("imageFinish")}; 
		
	
}
//Audio worker. It looks bad. Fix it later you dolt.
$(document).ready(function() {
      var obj = document.createElement("audio");
      obj.src="audio/5vaille7.ogg";
        obj.volume=1.0;
        obj.autoPlay=false;
        obj.preLoad=true;       
			$("body").bind('touchstart', '.S1', function(){ 
			obj.play();
			});
		var sound2 = document.createElement("audio");
		sound2.src="audio/tasanKLO10.ogg";
        sound2.volume=1.0;
        sound2.autoPlay=false;
        sound2.preLoad=true;       
			$("body").on('mousedown', '.S2', function(){
			sound2.play();
			});
		var sound3 = document.createElement("audio");
		sound3.src="audio/15vaille5.ogg";
        sound3.volume=1.0;
        sound3.autoPlay=false;
        sound3.preLoad=true;       
			$("body").on('mousedown', '.S3', function(){
			sound3.play();
			});
		var sound4 = document.createElement("audio");
		sound4.src="audio/15yli5.ogg";
        sound4.volume=1.0;
        sound4.autoPlay=false;
        sound4.preLoad=true;       
			$("body").on('mousedown', '.S4', function(){
			sound4.play();
			});
		var sound5 = document.createElement("audio");
		sound5.src="audio/20vaille8.ogg";
        sound5.volume=1.0;
        sound5.autoPlay=false;
        sound5.preLoad=true;       
			$("body").on('mousedown', '.S5', function(){
			sound5.play();
			});
		var sound6 = document.createElement("audio");
		sound6.src="audio/25yli12.ogg";
        sound6.volume=1.0;
        sound6.autoPlay=false;
        sound6.preLoad=true;       
			$("body").on('mousedown', '.S6', function(){
			sound6.play();
			});
		var sound7 = document.createElement("audio");
		sound7.src="audio/20yli8.ogg";
        sound7.volume=1.0;
        sound7.autoPlay=false;
        sound7.preLoad=true;       
			$("body").on('mousedown', '.S7', function(){
			sound7.play();
			});
		var sound8 = document.createElement("audio");
		sound8.src="audio/tasan2.ogg";
        sound8.volume=1.0;
        sound8.autoPlay=false;
        sound8.preLoad=true;       
			$("body").on('mousedown', '.S8', function(){
			sound8.play();
			});
		var sound9 = document.createElement("audio");
		sound9.src="audio/tasan9.ogg";
        sound9.volume=1.0;
        sound9.autoPlay=false;
        sound9.preLoad=true;       
			$("body").on('mousedown', '.S9', function(){
			sound9.play();
			});
		var sound10 = document.createElement("audio");
		sound10.src="audio/puoli4.ogg";
        sound10.volume=1.0;
        sound10.autoPlay=false;
        sound10.preLoad=true;       
			$("body").on('mousedown', '.S10', function(){
			sound10.play();
			});
		var sound11 = document.createElement("audio");
		sound11.src="audio/puoli3.ogg";
        sound11.volume=1.0;
        sound11.autoPlay=false;
        sound11.preLoad=true;       
			$("body").on('mousedown', '.S11', function(){
			sound11.play();
			});
		var sound12 = document.createElement("audio");
		sound12.src="audio/tasan12.ogg";
        sound12.volume=1.0;
        sound12.autoPlay=false;
        sound12.preLoad=true;       
			$("body").on('mousedown', '.S12', function(){
			sound12.play();
			});
		
        });
		
//this one is for generating and editing a newly created XML file.
 
 $(document).ready(function(){
		$('#XMLchanges').click(function(){
		var generatedFile = $('#address').val() + '.xml';
		var dataPointToAdd = $('#dataPointer').val();
		var targetToAdd = $('#targetPointer').val();
		var output = $('#output').val();
		var arrayOfXMLdataPoints = [];
		var arrayOfXMLtargets = [];
		
		$.ajax({
			url: 'changeTheXMLfile.php',
			type: 'GET',
			dataType: 'text',
			cache: false,
			data: { address: generatedFile, dataPointer: dataPointToAdd, targetPointer: targetToAdd },
			error: function(){
				console.log("It didn't work you dolt")
			},
			success: function( data ){
				console.log('success' + data);
				//Below code: Remove the ajax and make it a Json return dealio.
			$.ajax({
				url: generatedFile ,
				type: 'GET',
				datatype: 'xml' ,
				cache: false,
				success: function(returnedXMLResponse) {
					$('dataPoint',returnedXMLResponse).each(function(){
						var $allTheNewData = $(this).text();
						var dataPointarray = [$allTheNewData];
						arrayOfXMLdataPoints.push(dataPointarray);
					});
					console.log(arrayOfXMLdataPoints);
					$('target',returnedXMLResponse).each(function(){
						var $nearlyDoneTar = $(this).text();
						var targetArray1 = [$nearlyDoneTar];
						arrayOfXMLtargets.push(targetArray1);
					});
					for (var o=0; 0<arrayOfXMLdataPoints.length; o++){
						$("<input></input><select id=\'allTargets\'></select>")
							.appendTo("#output");
					};
					console.log(targetArray1);
					for (var p=0; 0<targetArray1.length; p++){
						$('#allTargets')
							.append($("<option></option>")
							.attr("value", targetArray1[i])
							.text(value));
					}
					
					
				}
			})
				
			}
			
		});
		
	});	 
});
  

 

 


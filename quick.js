//Quick javascript
var correct = 0;
$(document).bind('touchmove', false);
$( init );
$(document).ready(
	function(){
		$("#saving").hide()
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
			url: 'quick.xml',
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				console.log (returnedXMLResponse)
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
							$content = '<img src="' +  $(this).attr('src') + '" height=\'90\' width=\'90\' />';
							$DropClass = 'dropTargetImage';
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
			tmpArc.sort( function() { return Math.random() - .5 } );
	
			for (var j=0; j<tmpArc.length; j++) {
	
				$("<div class="+ $draggEr +">" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
					containment: '.borderPatrol',
					stack: '.block div',
					cursor: 'move',
					
					//revert: true
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

//$(document).ready(function() {
 //       var obj = document.createElement("audio");
 //       obj.src="audio/gaster_blaster.mp3";
  //      obj.volume=0.10;
  //      obj.autoPlay=false;
    //    obj.preLoad=true;       
	//		$("body").on('mousedown', '.playSound', function(){
	//		obj.play();
	//		});
	//	var sound2 = document.createElement("audio");
     //   sound2.src="audio/Warframe.mp3";
      //  sound2.volume=0.10;
       // sound2.autoPlay=false;
       // sound2.preLoad=true;  
		//	$("body").on('mousedown', '.testing2', function(){
		//	sound2.play();
		//	});
       // });
 
    


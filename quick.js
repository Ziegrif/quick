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
	
				$("<div class='numbero Play'>" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
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
			success: function(returnedXMLResponse){
				console.log (returnedXMLResponse)
				$('dataPoint',returnedXMLResponse).each(function(){
					var $content;
					var $src = $(this).attr('src');
					
						if ($src == null) {
							$content = $(this).text();
							$DropClass = 'dropTarget';
							$draggEr = 'numbero Play';
						} else {
							$content = '<img src="' +  $(this).attr('src') + '" height=\'75\' width=\'90\' />';
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
	
	//console.log("card " + cardNumber);
	//console.log("slot " + slotNumber);
	
	if (slotNumber == cardNumber) {
		ui.draggable.addClass('oikein');
		ui.draggable.data("valid", true);
		//ui.draggable.draggable('disable');
		//$(this).droppable('disable');
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		//ui.draggable.draggable('option', 'revert', false);
		correct++;
		
		
	} else if (slotNumber != cardNumber) {
		ui.draggable.data("valid",false);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
	}
	$('div#score').html(correct);
}
// This one handles the dragging event for example when you drag it off a correct square it substracts from the correct pool preventing infinite points
function handleDragEvent(event, ui){
		if(ui.draggable.data("valid")) {
			ui.draggable.removeClass('oikein');
			correct--;
			ui.draggable.data("valid",false);
		}
		$('div#score').html(correct);
		
	}
//This function checks for right answers
function validation(){
	if($("div").hasClass("oikein")){
		$(".oikein").toggleClass("finish");
		//$(".oikein .imageDragger .numbero").draggable('disable');
		//e.preventDefault();
		//$("<div class='finalScore'>" + "Your score was! "+ $('div#score').html(correct) + "</div>");
	}
	//$(document).attr('dragabble','false');
	$("#saving").show();
	$("#finale").show();
	$("#finale").text("Your score was " + correct + " !");
	$('#hidScore').val(correct);
	$('.numbero, .dropTargetimage, .dropTarget, .imageDragger').css({
			'z-index':'-1'
		});
}

	$(document).ready(function() {
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
		
		$.get();
		
		audioElement.addEventListener("ended", function(){
			this.currentTime = 0;
			this.Play();
		});
		
		$('.Play').css('cursor', 'pointer').click(function() {
			audioElement.Play();
		});
		
		$('.Stop').click(function() {
			audioElement.Stop();
		});
	});


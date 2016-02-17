<?php
//Quick php
echo	"<div id=\"content\">

		<div id=\"makeMeDraggable\" class=\"block dragging\">
		</div>
		
		<div class=\"drop droppable\" id=\"makeMeDroppable\">
		</div>
		
		</div>
		<div id='score'>0</div>
		
		<div id='finale' class='finalScore'>0</div>
		
		<button onclick='validation()'>Validate</button>
		
		<div id=\"random\">#</div>
		
		<form method=\"get\" action=\"quickSavePlayerScore.php\">
			<input name=\"nimi\" placeholder=\"Nimesi?\" />
			<input name=\"mail\" placeholder=\"Sähköpostisi?\" />
			<input type=\"submit\" value=\"Save the score\" />
			<input id=\"hidScore\" name=\"sentScore\" type=\"text\"/>
		</form>
		
		<button onclick=\"change()\">Try it</button>
		
		<input type=\"text\" id=\"XmlName\"></input>
		
		";
		
		



?>
<?php
if (!empty($_GET['incoming'])) {
$theGameToBeAdded = $_GET['incoming'];
} else {
	$theGameToBeAdded = "";
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Quick</title>
		<link href="BStrapCss/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="quick.css">
		<!-- THIS DISABLES ZOOMING <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">-->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="format-detection" content="telephone=no">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.3.0.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
		<script src="jquery.ui.touch.js"></script>
		<script src="jquery.mobile.custom.min.js"></script>
		<script type="text/javascript" src="quick.js"></script>
	</head>

	<body>
		<div class="container">
			<div class="borderPatrol">
				<?php
					echo	"<div id=\"content\">

				<div id=\"makeMeDraggable\" class=\"block dragging\">
				</div>
				
				<div class=\"drop droppable\" id=\"makeMeDroppable\">
				</div>
			
		</div>
			
		<div id=\"saving\">
			
				<div id=\"actualForm\">
					<h2 id='finale' class='finalScore'>0</h2>
					<form  method=\"get\" action=\"quickSavePlayerScore.php\">
						<fieldset class=\"form-group row col-xs-5 text-center\">
							<input id=\"nameA\" class=\"form-control col-sm-2\" name=\"nimi\" placeholder=\"Nimesi?\" />
							<input id=\"eMail\" class=\"form-control col-sm-2\" name=\"mail\" placeholder=\"Sähköpostisi?\" />
							<input class=\"form-control col-sm-2\" id=\"hidScore\" name=\"sentScore\" readonly>
							<button class=\"form-control col-sm-2 btn-success\" type=\"submit\" value=\"Save the score\" />Save The Score</button>
						</fieldset>
					</form>
				</div>
		</div>
		<footer id=\"footing\">
				<div id='score'>0</div>			
				<button onclick='validation()'>Validate</button>
				<button onclick=\"change()\">Vaihda peliä</button>
				<select type=\"text\" id=\"XmlName\">
					<option value=generate.xml>Alkuperäinen</option>
					<option value=mathProto.xml>Math Prototype</option>
					<option value=mathProto2.xml>Math Prototype 2</option>
					<option value=clocks3.xml>Kellotaulutehtävä 1</option>
					<option value=elementConversion.xml>Mittayksikkö muutoksia</option>
					<option value=whatTime.xml>Aikayksikkö muutoksia</option>
					<option value=division.xml>Jakolaskuja</option>
					<option value=subtraction.xml>Vähennyslaskuja</option>
					<option value=addition.xml>Plus laskuja</option>
					
				</select>
				<input id=\"addIt\" placeholder=\"Pelin nimi\" value=". $theGameToBeAdded ." ></input>
				<button class=\"testing2\" onclick=\"location.href='admin.php'\">Editori</button>
		</footer>
		
		";
				?>
			</div>
		</div>
	</body>
	
</html>
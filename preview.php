<!DOCTYPE html>
<?php
$addressing = $_GET['thing'];
?>
<html>
	<head>
		<title>preview</title>
		<link href="BStrapCss/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="quick.css">
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
		<script type="text/javascript" src="quickJSmin.js"></script>
	</head>
	
	
	<body>
	<div class="container">
			<div class="borderPatrol">
				<?php
				echo "
				<div class=\row\>
					<div class=\"input-group\">
						<input class=\"form-control\" id=\"previewedFileName\" name=\"previewedFileName\" value=". $addressing ."></input>
						<span class=\"input-group-btn\">
						<button  id=\"initPreview\" class=\"btn btn-warning\">Avaa peli</button>
						</span>
						<input class=\"form-control\" id=\"exportName\" name=\"exportingThatName\" placeholder=\"Anna kuvaava nimi pelillesi\"></input>
						<span class=\"input-group-btn\">
						<button id=\"exportNewgame\" class=\"btn btn-success\">Vie peli etusivulle</button>
						</span>
				</div>
					</div>
					
					<div id=\"content\">

					<div id=\"makeMeDraggable\" class=\"block dragging\">
					</div>
					
					<div class=\"drop droppable\" id=\"makeMeDroppable\">
					</div>
					
					</div>
					<button id='validationButton' class='btn btn-info' onclick='validation()'>Tarkista</button>
					<button id='gameChangeButton' class=\"ToFrontPage btn btn-primary\" onclick=\"location.href='index.php'\">Etusivulle</button>
					<button id='editorButton' class=\"ToEditor btn btn-danger\" onclick=\"location.href='admin.php'\">Takaisin Editoriin</button>
					";
				?>
			</div>
		</div>
	
	</body>
	
</html>
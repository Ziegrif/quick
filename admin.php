<!DOCTYPE html>
<html>
	<head>
		<title>Quick</title>
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
		<script type="text/javascript" src="quick.js"></script>
	</head>
	
	<body>
	<form action="genFile.php" method="get">
	<input name="fileName"></input>
	<input type="submit" value="Generate file"></input>
	</form>
	
	<input id="address" name="address" placeholder="Pelin nimi"></input>
	<input id="dataPointer" name="dataPointer" placeholder="datapoint"></input>
	<input id="targetPointer" name="targetPointer" placeholder="target"></input>
	
	<button id="XMLchanges">Upload</button>
	
	<div>
	<p id="output"></p>
	</div>
	

	
		
	</body>
	
</html>
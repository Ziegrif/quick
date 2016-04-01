<?php
if (!empty($_POST["previewedFileName"])){
	$addingNewGameToList = $_POST["previewedFileName"];
} else {
	echo "Didn't Work";
	header("location: preview.php");
}
	$addIt = simplexml_load_file('quick.xml');
	$addition = $addIt->addChild('dataPoint', $addingNewGameToList);
	
$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($addIt->asXML());
	$dom->save("quick.xml");
	
	

?>
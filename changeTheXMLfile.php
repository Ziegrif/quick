<?php
if (!empty($_GET["address"]) && !empty($_GET["dataPointer"]) && !empty($_GET["targetPointer"])){
		$dataPointer = $_GET["dataPointer"];
		$targetPointer = $_GET["targetPointer"];
		$whatWereEditing = $_GET["address"];
	} else {
		header("location: admin.php");
	}
	$theXMLtoEdit = simplexml_load_file($whatWereEditing);
	
	$newData = $theXMLtoEdit->item->addChild('datapoint', $dataPointer);
	$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer);

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($theXMLtoEdit->asXML());
	$dom->save($whatWereEditing);
	echo "jes!";





?>
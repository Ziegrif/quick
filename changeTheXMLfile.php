<?php
if (!empty($_GET["address"]) && !empty($_GET["dataPointer"]) && !empty($_GET["targetPointer"])){
		$dataPointer = $_GET["dataPointer"];
		$targetPointer = $_GET["targetPointer"];
		$whatWereEditing = $_GET["address"];
	} else {
		header("location: admin.php");
	}
	$theXMLtoEdit = simplexml_load_file($whatWereEditing);
	
	$newData = $theXMLtoEdit->item->addChild('dataPoint', $dataPointer);
	$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer);

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($theXMLtoEdit->asXML());
	$dom->save($whatWereEditing);
	//Below code is an example check it before running.
	$myJson = json_encode(array('dataPointer' => $dataPointer,'message'=> 'The group has not been removed'));
	return $myJson;




?>
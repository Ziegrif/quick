<?php
//if (!empty($_GET["address"]) && !empty($_GET["dataPointer"]) && !empty($_GET["targetPointer"]))
if (!empty($_POST["address"])) {
		$array = json_decode($_POST['targetDatapointArray']);
		// print_r($array);
		$whatWereEditing = $_POST["address"];
		$i = 0;
		$s = 0;
		$theXMLtoEdit = simplexml_load_file($whatWereEditing);
		foreach($array as $key => $subArray) {
		
		$dataPointer = array_column($subArray,[0][0]);
		$dataIndex = array_column($subArray,[0][1]);
		$targetPointer = $subArray[1];
		$newData = $theXMLtoEdit->item->addChild('dataPoint', $dataPointer)->addAttribute("target","". $dataIndex . "");
		$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer)->addAttribute("id","". $s++ . "");
		}
		
	} else {
		echo "ei toimi";
		header("location: admin.php");
	}
	
	
	

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($theXMLtoEdit->asXML());
	$dom->save($whatWereEditing);
	//Below code is an example check it before running.
	//$myJson = array('dataPointer' => $dataPointer,'message'=> 'The group has not been removed');
	//echo json_encode($myJson);


?>
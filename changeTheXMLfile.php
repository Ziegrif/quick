<?php
//if (!empty($_GET["address"]) && !empty($_GET["dataPointer"]) && !empty($_GET["targetPointer"]))
if (!empty($_POST["address"])) {
		$array = $_POST['chunk'];
		$targetArray = $_POST['selectTargets'];
		
		
		//print_r($array);
		/* $datap = $array[0];
		$target = $array[1];
		print_r($datap);
		print_r($target);
		echo "böö"; */
		$whatWereEditing = $_POST["address"];
		$s = 1;
		$theXMLtoEdit = simplexml_load_file($whatWereEditing);
		
		
		
		foreach($array as $key => $subArray) {
		
			$dataPointer = $subArray[0];
			$dataIndex = $subArray[1];
			$newData = $theXMLtoEdit->item->addChild('dataPoint', $dataPointer)->addAttribute("target","". $dataIndex . "");
			
		}
		foreach($targetArray as $key => $tarArr){
			$targetPointer = $tarArr;
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
<?php
if (!empty($_POST["address"])) {
		$array = $_POST['chunk'];
		$targetArray = $_POST['selectTargets'];
		
		$whatWereEditing = $_POST["address"];
		
		copy($whatWereEditing , 'oldXMLs/'.time()._.$whatWereEditing);
		
		unlink($whatWereEditing);
		
		$domtree = new DOMDocument('1.0','UTF-8');
	
			$xmlRoot = $domtree->createElement("items");
			$xmlRoot = $domtree->appendChild($xmlRoot);
			
			$item = $domtree->createElement("item");
			$item = $xmlRoot->appendChild($item);
			
			$dropper = $domtree->createElement("Dropper");
			$dropper = $xmlRoot->appendChild($dropper);
	
		$domtree->save($whatWereEditing);
		
		$theXMLtoEdit = simplexml_load_file($whatWereEditing);
		
		
		
		foreach($array as $key => $subArray) {
		
			$dataPointer = $subArray[0];
			$dataIndex = $subArray[1];
			$newData = $theXMLtoEdit->item->addChild('dataPoint', $dataPointer)->addAttribute("target","". $dataIndex . "");
			
		}
		foreach($targetArray as $key => $tarArr){
			$targetPointer = $tarArr[0];
			$targetID = $tarArr[1];
			$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer)->addAttribute("id","". $targetID . "");
		}
		
	} else {
		echo "ei toimi";
		header("location: editing.php");
		die();
	}
	
	
	

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($theXMLtoEdit->asXML());
	$dom->save($whatWereEditing);
	
	

?>
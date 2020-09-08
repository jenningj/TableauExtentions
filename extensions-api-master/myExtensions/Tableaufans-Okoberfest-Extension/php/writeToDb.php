<?php

//CustomerName = Tent_Id
$customerName = $_POST['name'];
$clusterName = $_POST['cluster'];

//UserInput=AvailableSeats
$userInput = $_POST['userinput'];
$tentId = $_POST['tentid'];
$selectedMeasure = $_POST['measure'];



	# Database Access
	$servername = 'localhost';
	$username = 'admin';
	$password = 'admin';
	$dbname = 'tableaufans';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	//$sql = "INSERT INTO `tableaufans-oktoberfest-extension`(`ClusterName`, `CustomerName`,`UserInput`,`CheckBox`,`SelectedMeasure`) VALUES ('".$clusterName."','".$customerName."','".$userInput."','".$checkBox."','".$selectedMeasure."')";
	//$sql = "INSERT INTO `tableaufans-oktoberfest-extension` (`Id_Boxe`, `Tent_Id`, `Available_Seats`, `Tent_Identifier`) VALUES ('".$customerName."', '4', '".$userInput."', 'Hacker-Festzelt')";
	
	
	$sql = "UPDATE `tableaufans-oktoberfest-extension` SET `Available_Seats` = '".$userInput."' WHERE `Id_Boxe` = '".$customerName."' AND `Tent_Id` = '".$tentId."'";
	$result = $conn->query($sql);
	echo "Put ".$customerName." into ".$userInput." successfully!";

	$result = $conn->query($sql);
	$sql = "UPDATE `tableaufans-oktoberfest-extension` SET `Available_Seats` = '".$userInput."' WHERE `Id_Boxe` = 100";
	
?>
<?php

//CustomerName = Tent_Id
$customerName = $_POST['name'];
$clusterName = $_POST['cluster'];

//UserInput=AvailableSeats
$userInput = $_POST['userinput'];
$selectedMeasure = $_POST['measure'];



	# Database Access
	$servername = 'localhost';
	$username = 'admin';
	$password = 'admin';
	$dbname = 'yoursqldb';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	//$sql = "INSERT INTO `oktoberfest_writeback_extension`(`ClusterName`, `CustomerName`,`UserInput`,`CheckBox`,`SelectedMeasure`) VALUES ('".$clusterName."','".$customerName."','".$userInput."','".$checkBox."','".$selectedMeasure."')";
	//$sql = "INSERT INTO `oktoberfest_writeback_extension` (`Id_Boxe`, `Tent_Id`, `Available_Seats`, `Tent_Identifier`) VALUES ('".$customerName."', '4', '".$userInput."', 'Hacker-Festzelt')";
	
	
	$sql = "UPDATE `oktoberfest_writeback_extension` SET `Available_Seats` = '".$userInput."' WHERE `Id_Boxe` = '".$customerName."'";
	$result = $conn->query($sql);
	echo "Put ".$customerName." into ".$userInput." successfully!";

	$result = $conn->query($sql);
	$sql = "UPDATE `oktoberfest_writeback_extension` SET `Available_Seats` = '".$userInput."' WHERE `Id_Boxe` = 100";
	
?>
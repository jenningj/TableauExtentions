<?php

$customerName = $_POST['name'];
$clusterName = $_POST['cluster'];
$userInput = $_POST['userinput'];
$checkBox = $_POST['checkbox'];
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

	$sql = "INSERT INTO `getDataAndWriteBack`(`ClusterName`, `CustomerName`,`UserInput`,`CheckBox`,`SelectedMeasure`) VALUES ('".$clusterName."','".$customerName."','".$userInput."','".$checkBox."','".$selectedMeasure."')";
	$result = $conn->query($sql);
	echo "Put ".$customerName." into ".$clusterName." successfully!";

?>
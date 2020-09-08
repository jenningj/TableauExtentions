<?php

$customerName = $_POST['name'];
//$clusterName = $_POST['cluster'];
$userInput = $_POST['userinput'];
// $checkBox = $_POST['checkbox'];
// $selectedMeasure = $_POST['measure'];



	# Database Access
	$servername = 'azuretabdb.database.windows.net';
	$username = 'jennings_J';
	$password = 'pi8Nabex';
	$dbname = 'tabext_db';

	// Create connection
	$conn = sqlsrv_connect($serverName, $options);
	
	// console.log("Inside PHP Code")
	// Check connection

	if( $conn === false )
     {
     echo "Could not connect.\n";
     die( print_r( sqlsrv_errors(), true));
	 }
	 
	 
	 $query = "INSERT INTO [dbo].[[tbl_writeback]] (ColumnName,TextValue) VALUES(?, ?)";
	 $params1 = array($customerName,$userInput);
	 $result = sqlsrv_query($conn,$query,$params1);
	 
	 sqlsrv_close($conn);



?>
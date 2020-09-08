<?php

$object_id_to_comment_on = $_POST['object_id_to_comment_on'];
$username = $_POST['username'];
$fullname = $_POST['fullname'];
$comment = $_POST['comment'];
$status = $_POST['status'];
$last_status_label = $_POST['last_status_label'];




	// # Database Access
	// $servername = '(localdb)\MSSQLLocalDB';
	// $dbusername = 'Tableau';
	// $password = 'admin';
	// $dbname = 'Test_Dynamic';

	$serverName = "(localdb)\\MSSQLLocalDB";
	$options = array( "UID"=>"Tableau", "PWD"=>"admin", "Database"=>"Test_Dynamic");
	$conn = sqlsrv_connect($serverName, $options);


	if( $conn === false )
	{
	echo "Could not connect.\n";
	die( print_r( sqlsrv_errors(), true));
	}

	$sql = "INSERT INTO `[dbo].[tbl_comment]`(`[ObjectID_to_Comment]`,`[username]`,`[fullname]`,`[comment]`,`[status]`,`[last_status]`) VALUES
														 ('".$object_id_to_comment_on."','".$username."','".$fullname."','".$comment."','".$status."','".$last_status."')";

	$result = $conn->query($sql);
	echo "Put ".$comment." into Object ID to Comment on: '".$object_id_to_comment_on."' successfully!";


?>
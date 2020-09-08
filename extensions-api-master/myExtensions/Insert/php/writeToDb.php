<?php

$object_id_to_comment_on = $_POST['object_id_to_comment_on'];
$username = $_POST['username'];
$fullname = $_POST['fullname'];
$comment = $_POST['comment'];
$status = $_POST['status'];
$last_status_label = $_POST['last_status_label'];




	# Database Access
	$servername = 'localhost';
	$dbusername = 'admin';
	$password = 'admin';
	$dbname = 'tableaufans';

	// Create connection
	$conn = new mysqli($servername, $dbusername, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "INSERT INTO `tableaufans-commenting-extension`(`object_id_to_comment_on`,`username`,`fullname`,`comment`,`status`,`last_status`) VALUES
														 ('".$object_id_to_comment_on."','".$username."','".$fullname."','".$comment."','".$status."','".$last_status."')";

	$result = $conn->query($sql);
	echo "Put ".$comment." into Object ID to Comment on: '".$object_id_to_comment_on."' successfully!";


	//$sql = "UPDATE `tableaufans-commenting-extension-laststatus` SET `last_status_label` = '".$last_status_label."' WHERE `object_id_to_comment_on` = '".$object_id_to_comment_on."'";
	
	
	$sql = "insert into `tableaufans-commenting-extension-laststatus`  (`object_id_to_comment_on`,`last_status_label`) VALUES ('".$object_id_to_comment_on."','".$last_status_label."')
    ON DUPLICATE KEY UPDATE `last_status_label` = '".$last_status_label."'";

	$result = $conn->query($sql);

	echo "Put ".$last_status_label." into tableaufans-commenting-extension-laststatus to Comment on: '".$object_id_to_comment_on."' successfully!";

?>
<?php

$UserID = $_POST['UserID'];
$ScenarioID = $_POST['ScenarioID'];
$Scenario_Description = $_POST['Scenario_Description'];
$Status = $_POST['Status'];
$P1_Name = $_POST['P1_Name'];
$P1_Value = $_POST['P1_Value'];
$P2_Name = $_POST['P2_Name'];
$P2_Value = $_POST['P2_Value'];
$P3_Name = $_POST['P3_Name'];
$P3_Value = $_POST['P3_Value'];
$P4_Name = $_POST['P4_Name'];
$P4_Value = $_POST['P4_Value'];

$serverName = "(localdb)\\MSSQLLocalDB";
$options = array( "UID"=>"Tableau", "PWD"=>"Tabadminleau", "Database"=>"Test_Dynamic");
$conn = sqlsrv_connect($serverName, $options);

if( $conn === false )
     {
     echo "Could not connect.\n";
     die( print_r( sqlsrv_errors(), true));
     }

$query = "INSERT INTO [dbo].[tbl_ScenarioPlanner] (UserID,ScenarioID,Scenario_Description,Status,P1_Name,P1_Value,P2_Name,P2_Value,P3_Name,P3_Value,P4_Name,P4_Value) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$params1 = array($UserID,$ScenarioID,$Scenario_Description,$Status,$P1_Name,$P1_Value,$P2_Name,$P2_Value,$P3_Name,$P3_Value,$P4_Name,$P4_Value);
$result = sqlsrv_query($conn,$query,$params1);

sqlsrv_close($conn);

?>
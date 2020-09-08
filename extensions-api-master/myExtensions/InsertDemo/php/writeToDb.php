<?php
$object_id_to_comment_on = $_POST['object_id_to_comment_on'];
$username = $_POST['username'];
$datetime = $_POST['datetime'];
$p_name = $_POST['name'];
$p_age = $_POST['age'];
$p_sal = $_POST['sal'];


/* Connect to the local server using Windows Authentication and   
specify the AdventureWorks database as the database in use. */  
$serverName = "(localdb)\\MSSQLLocalDB";  
$connectionInfo = array( "Database"=>"Test_Dynamic");  
$conn = sqlsrv_connect( $serverName, $connectionInfo);  
if( $conn === false )  
{  
     echo "Could not connect.\n";  
     die( print_r( sqlsrv_errors(), true));  
}

/* Define the query. */  
// $tsql1 = "UPDATE TabExt.tbl_emp SET Name = ? , Age = ? ,Salary = ? WHERE Personid = ?";
$tsql1 = "INSERT INTO TabExt.tbl_emp (Name,  
                                                        Age,  
                                                        Salary)  
           VALUES (?, ?, ?)";  
  
// /* Construct the parameter array. */  
// $name = "Peter Gordon";  
// $age = 27;  
// $sal = 300000;    
$params1 = array(  
               array($p_name, null),  
               array($p_age, null, null,SQLSRV_SQLTYPE_FLOAT),    
               array($p_sal, null, null,SQLSRV_SQLTYPE_FLOAT)  
           );  
  
/* Execute the INSERT query. */  
$stmt1 = sqlsrv_query($conn, $tsql1, $params1);  
if( $stmt1 === false )  
{  
     echo "Error in execution of INSERT.\n";  
     die( print_r( sqlsrv_errors(), true));  
}  
  

 
/* Free statement and connection resources. */  
sqlsrv_free_stmt($stmt1);  
sqlsrv_free_stmt($stmt2);  
sqlsrv_close($conn);  

// $serverName = "(localdb)\\MSSQLLocalDB";
// $options = array( "UID"=>"Tableau", "PWD"=>"admin", "Database"=>"Test_Dynamic");
// $conn = sqlsrv_connect($serverName, $options);

// if( $conn === false )
//      {
//      echo "Could not connect.\n";
//      die( print_r( sqlsrv_errors(), true));
//      }

// $query = "UPDATE [TabExt].[tbl_emp] SET [Name] = ? , [Age] = ? ,[Salary] = ? WHERE [Personid] = ?";
// $params1 = array($p_name,$p_age,$p_sal, $object_id_to_comment_on);
// $result = sqlsrv_query($conn,$query,$params1);

// sqlsrv_close($conn);

?>
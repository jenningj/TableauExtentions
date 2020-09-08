<?php  
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
$tsql1 = "INSERT INTO TabExt.tbl_emp (Name,  
                                                        Age,  
                                                        Salary)  
           VALUES (?, ?, ?)";  
  
/* Construct the parameter array. */  
$name = "Peter Rabbit";  
$age = 27;  
$sal = 300000;    
$params1 = array(  
               array($name, null),  
               array($age, null),    
               array($sal, null)  
           );  
  
/* Execute the INSERT query. */  
$stmt1 = sqlsrv_query($conn, $tsql1, $params1);  
if( $stmt1 === false )  
{  
     echo "Error in execution of INSERT.\n";  
     die( print_r( sqlsrv_errors(), true));  
}  
  
/* Retrieve the newly inserted data. */  
/* Define the query. */  
$tsql2 = "SELECT Name, Age, Salary  
          FROM  TabExt.tbl_emp  
          WHERE Name = ? ";  
  
/* Construct the parameter array. */  
$params2 = array($name);  
  
/*Execute the SELECT query. */  
$stmt2 = sqlsrv_query($conn, $tsql2, $params2);  
if( $stmt2 === false )  
{  
     echo "Error in execution of SELECT.\n";  
     die( print_r( sqlsrv_errors(), true));  
}  
  
/* Retrieve and display the results. */  
$row = sqlsrv_fetch_array( $stmt2 );  
if( $row === false )  
{  
     echo "Error in fetching data.\n";  
     die( print_r( sqlsrv_errors(), true));  
}  
echo "Name: ".$row['Name']."\n";  
echo "Age: ".$row['Age']."\n";  
echo "Salary: ".$row['Salary']."\n";  
  
/* Free statement and connection resources. */  
sqlsrv_free_stmt($stmt1);  
sqlsrv_free_stmt($stmt2);  
sqlsrv_close($conn);  
?>  
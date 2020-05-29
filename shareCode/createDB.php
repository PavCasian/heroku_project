<?php
include('mysqlLink.php');

$link = connectDB( true, false);
if ($link) {
   $sql = "CREATE DATABASE IF NOT EXISTS myDB";
   $result = mysqli_query($link, $sql);
   echo ($result ? 'Success' : 'Fail') . ": $sql";
   mysqli_close($link);
} else {
	  echo '<h4> No connection to SQL. myDB is not created.</h4>';
}



?>
<?php
  include('shareCode/mysqlLink.php');
  
  $link = connectDB();
  if($link){
$sql = "CREATE TABLE IF NOT EXISTS flank
    (
  flankID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dateTime VARCHAR(200),
  taskTime FLOAT(4, 2),
  rec VARCHAR(2000)  
	)"; //FLOAT( [length, decimals] ) 
   $result = mysqli_query($link, $sql);
   echo ($result ? 'Success' : 'Fail') . ": CREATE flankTable";
   mysqli_close($link);
  }else {
	  echo '<h4> No connection to SQL. flankTable not created.</h4>';
}
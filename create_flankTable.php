<?php
  include('shareCode/pgLink.php');
  
  $link = connectDB();
  if($link){
$sql_table_creation = "CREATE TABLE IF NOT EXISTS flank
    (
  flankID serial PRIMARY KEY,
  dateTime VARCHAR(200),
  taskTime NUMERIC(4, 2),
  rec VARCHAR(2000)  
	)"; //FLOAT( [length, decimals] )
	# serial in the query includes INT NOT NULL AUTO_INCREMENT
	# connection is a pdo object and we are accessing its exec property
   $link->exec($sql_table_creation);
  }else {
	  echo '<h4> No connection to SQL. flankTable not created.</h4>';
}
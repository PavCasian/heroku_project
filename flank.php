<!DOCTYPE html>
<html lang='en'>

  <head>
	     <title>Flank</title>
		 <link type='text/css' rel='stylesheet' href='flank.css'>
  </head>
  <body>
	<div id="myPage"> </div>
	<div id="footer"> </div>
	  
	<script src="flank.js"></script>

<?php
include('shareCode/pgLink.php');

 
if($_SERVER['REQUEST_METHOD']=='POST'){
  /* var_dump($_POST['dateTime']);
   echo '<br>';
   var_dump($_POST['taskTime']);
   echo '<br>';
   var_dump($_POST['rec']); */
 
   if( isset($_POST['taskTime'])){
       $taskTime = filter_var( $_POST['taskTime'], FILTER_VALIDATE_FLOAT); 
    } else { null;
	}
   $dateTime = $_POST['dateTime']; 
   $rec = $_POST['rec'];
   $sql_insert = "INSERT INTO flank
      (dateTime, taskTime, rec)
      VALUES('$dateTime', '$taskTime', '$rec')";
   $link = connectDB();
   $link->exec($sql_insert)
?>
<script>myPage.innerHTML = debrief;</script>
<?php
   } else {
 ?>
     <script>instruction();</script>
<?php
  };
 ?>
  </body>
</html>
<?php
  include('../shareCode/mysqlLink.php');
 
  $link = connectDB();
  
  if ($link):
   @mysqli_close($link);
    header( 'Location: flank.php' );

 else:
 ?>
       <h4> No connection to MySQL server. Please connect to access the task.</h4>
<?php
endif;
?>

<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<html lang="en-US">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>loansum</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content=" ">
	<link href="loansum.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
</head>


<body>
  	  	
	<main>
		<a href="index.php"><img id="logo"  src="images/loansumLogo.png" width="125px"></a>
		<?php include 'includes/nav.html';?>
		<?php include 'includes/intro.html';?>
		<?php include 'includes/newcalculator.html';?>
		<div id="tagline">welcome to <span id="taglineLS">loansum</span></div>
	</main>      
    
   	<script src="https://code.jquery.com/jquery-3.3.1.js"></script> <!--use min for production-->
	<script src="jquery.scrollintoview.js"></script> <!--use min for production-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-smart-table/2.1.11/smart-table.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script>
	$(document).ready(function(){
		$('#introButton').click(function() {
			$('#intro').slideToggle(500);
			$('#newCalculator').slideUp(0);
			$('#tagline').hide(0);
		});
		$('#newCalculatorButton').click(function() {
			$('#newCalculator').slideToggle(500);
			$('#intro').slideUp(0);
			$('#tagline').hide(0);
		});		
	});				
	</script>
	
</body>
</html>

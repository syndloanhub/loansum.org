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

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<!--[if lt IE 8]><!-->
		<link rel="stylesheet" href="ie7/ie7.css">
	<!--<![endif]-->
</head>


<body>
  	  	
	<main>
		<a href="index.php"><img id="logo"  src="images/loansumLogo.png" width="125px"></a>
		<?php include 'includes/nav.html';?>
		<?php include 'includes/intro.html';?>
		<?php include 'includes/calculator.html';?>
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
			$('#calculator').slideUp(0);
			$('#tagline').hide(0);
		});
		$('#calculatorButton').click(function() {
			$('#calculator').slideToggle(500);
			$('#intro').slideUp(0);
			$('#tagline').hide(0);
		});
		$('#filterLoanId').click(function() {
			$('#loanIdFilter').toggle(500);
		});
		$('#loanIdFilter').blur(function(){
			$('#loanIdFilter').toggle(500);
		});	
		$('#filterBorrower').click(function() {
			$('#borrowerFilter').toggle(500);
		});
		$('#borrowerFilter').blur(function(){
			$('#borrowerFilter').toggle(500);
		});		
		$('#filterAgent').click(function() {
			$('#agentFilter').toggle(500);
		});
		$('#agentFilter').blur(function(){
			$('#agentFilter').toggle(500);
		});	
		$('#filterFacilityType').click(function() {
			$('#facilityTypeFilter').toggle(500);
		});
		$('#facilityTypeFilter').blur(function(){
			$('#facilityTypeFilter').toggle(500);
		});	
		$('#filterOriginalCommitmentAmount').click(function() {
			$('#originalCommitmentAmountFilter').toggle(500);
		});
		$('#originalCommitmentAmountFilter').blur(function(){
			$('#originalCommitmentAmountFilter').toggle(500);
		});	
		$('#filterStartDate').click(function() {
			$('#startDateFilter').toggle(500);
		});
		$('#startDateFilter').blur(function(){
			$('#startDateFilter').toggle(500);
		});
		$('#filterMaturityDate').click(function() {
			$('#maturityDateFilter').toggle(500);
		});
		$('#maturityDateFilter').blur(function(){
			$('#maturityDateFilter').toggle(500);
		});	
		$('#filterCurrency').click(function() {
			$('#currencyFilter').toggle(500);
		});
		$('#currencyFilter').blur(function(){
			$('#currencyFilter').toggle(500);
		});			
	});				
	</script>
	
</body>
</html>




 	
 
  
  
  
  
  
  
 


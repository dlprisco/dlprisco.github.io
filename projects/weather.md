<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WeatherApp</title>

	<!-- StyleSheet
	<link href="/assets/css/styles.css" rel="stylesheet">
	 -->
	<!-- Axios -->
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>


  </head>
  
  <body>
  
    <div class="nav" id="nav-bar">
	    <h1>Find weather information of any country:</h1>
	</div>
    <!-- Main section -->

	<div id ="app"> 
		<!-- Search Bar -->
		<div id="search-bar">
			<input type="text" name="fname" class="insearch"><br>
			<button onclick="search_country()">Search</button>
		</div>
	</div>
	
	<br/>
	<!-- Display Information -->
	<div id="main"></div>
	<footer id="foo" class="foo" syle="margin-bot:0;">
		<p>Unexpected country code/state name? <a href="/projects/how-to" style="color:lightblue;">click here</a> to more information on How To Search.</p>
	</footer>
	<script src="/assets/js/script.js"></script>
  </body>
</html>
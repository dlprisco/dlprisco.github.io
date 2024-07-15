<html>

  <head>
    <title# Why I have no add more maps or information on maps</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>

<body>
<br />
<br />
 <p>Why I have no add map corrections to view the covid-19 information is because Venezuela map is stored in <code>/assets/js/map_features.json</code>and the polygons and other features of a valid map in the country.</p>	
<ul>
    <li>
	    <details>
	    	<h1>Guyana Esequibo<h2>
			<br>
			<p>
				This is the map that is missing in the other file.
			</p>


    <div class="container-xl text-secondary bg-dark border border-secondary">
      <h2>Confirmed Cases (country)</h2>
      <div id="mapchart" style="width100%;height:450px;"></div>
    </div>


    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>

    <script src="//cdn.amcharts.com/lib/4/core.js"></script>
    <script src="//cdn.amcharts.com/lib/4/maps.js"></script>
    <script src="//cdn.amcharts.com/lib/5/xy.js"></script>
    <script src="//cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="//cdn.amcharts.com/lib/5/themes/Animated.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="/assets/js/map_features.json"></script>
    <script src="/assets/js/countriesById.js"></script>


    <script>
      var countries = {}

      function fetchCountriesData() {
        axios.get("https://covid19.patria.org.ve/api/v1/summary")
          .then(function(json) {

            countries = json.data.Confirmed.ByState;

            isLoading = false;

            //var root = am5.Root.new("chartdiv");
            //var chart = root.container.children.push( am5map.MapChart.new(root, {}));
            //var x = am5core.create("mapchart", am5maps.MapChart);
            var x = am4core.create("mapchart", am4maps.MapChart);
            
            // Set map definition
            x.geodataSource.url =
              "https://www.amcharts.com/lib/4/geodata/json/venezuelaHigh.json";
            x.geodataSource.events.on("parseended", function(ev) {
              var data = [];
              for (var i = 0; i < ev.target.data.features.length; i++) {
                data.push({
                  id: ev.target.data.features[i].id,
                  value: getCountryData(ev.target.data.features[i].id)
                });
              }
              polygonSeries.data = data;
            });

            x.projection = new am4maps.projections.Mercator();

            var polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
            polygonSeries.dataFields.id = "id";
            polygonSeries.dataFields.value = "confirmedPC";
            polygonSeries.interpolationDuration = 0;

            polygonSeries.useGeodata = true;
            polygonSeries.nonScalingStroke = true;
            polygonSeries.strokeWidth = 0.5;

            // this helps to place bubbles in the visual middle of the area
            polygonSeries.calculateVisualCenter = true;
            polygonSeries.useGeodata = true;

            // Configure series tooltip
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.nonScalingStroke = false;
            polygonTemplate.strokeWidth = 0.5;
            polygonTemplate.fill = am4core.color("#3b3b3b");
            polygonTemplate.stroke = am4core.color("#000000");
            polygonTemplate.strokeOpacity = 0.15;
            polygonTemplate.setStateOnChildren = true;
            polygonTemplate.tooltipPosition = "fixed";

            polygonSeries.heatRules.push({
              target: polygonTemplate,
              property: "fill",
              min: am4core.color("#1c000d"),
              max: am4core.color("#000000"),
              dataField: "value"
            });

            var polygonHoverState = polygonTemplate.states.create("hover");
            polygonHoverState.transitionDuration = 1400;
            polygonHoverState.properties.fill = am4core.color("#1b1b1b");

            var polygonActiveState = polygonTemplate.states.create("active");
            polygonActiveState.properties.fill = am4core.color("#0f0f0f");

            var bubbleSeries = x.series.push(new am4maps.MapImageSeries());

            let bubbleData = [];

            for (var i = 0; i < mapFeatures.features.length; i++) {
              bubbleData.push({
                id: mapFeatures.features[i].id,
                value: getCountryData(mapFeatures.features[i].id)
              });
            }

            bubbleSeries.data = JSON.parse(JSON.stringify(bubbleData));

            bubbleSeries.dataFields.value = "value";
            bubbleSeries.dataFields.id = "id";

            // adjust tooltip
            bubbleSeries.tooltip.animationDuration = 0;
            bubbleSeries.tooltip.showInViewport = false;
            bubbleSeries.tooltip.background.fillOpacity = 0.2;
            bubbleSeries.tooltip.getStrokeFromObject = true;
            bubbleSeries.tooltip.getFillFromObject = false;
            bubbleSeries.tooltip.background.fillOpacity = 0.2;
            bubbleSeries.tooltip.background.fill = am4core.color("#000000");

            var imageTemplate = bubbleSeries.mapImages.template;
            // if you want bubbles to become bigger when zoomed, set this to false
            imageTemplate.nonScaling = true;
            imageTemplate.strokeOpacity = 0;
            imageTemplate.fillOpacity = 0.55;
            imageTemplate.tooltipText = "{value}[/]";
            imageTemplate.applyOnClones = true;
            imageTemplate.fill = am4core.color("red");

            // When hovered, circles become non-opaque
            var imageHoverState = imageTemplate.states.create("hover");
            imageHoverState.properties.fillOpacity = 1;
            // this is needed for the tooltip to point to the top of the circle instead of the middle
            imageTemplate.adapter.add("tooltipY", function(tooltipY, target) {
              return -target.children.getIndex(0).radius;
            });

            // When hovered, circles become non-opaque

            // add circle inside the image
            let circle = imageTemplate.createChild(am4core.Circle);
            // this makes the circle to pulsate a bit when showing it
            circle.hiddenState.properties.scale = 0.0001;
            circle.hiddenState.transitionDuration = 2000;
            circle.defaultState.transitionDuration = 2000;
            circle.defaultState.transitionEasing = am4core.ease.elasticOut;
            // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
            circle.applyOnClones = true;

            // Create hover state and set alternative fill color
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#0f0f0f");

            bubbleSeries.heatRules.push({
              target: circle,
              property: "radius",
              min: 10,
              max: 60,
              dataField: "value"
            });

            // when data items validated, hide 0 value bubbles (because min size is set)
            bubbleSeries.events.on("dataitemsvalidated", function() {
              bubbleSeries.dataItems.each((dataItem) => {
                var mapImage = dataItem.mapImage;
                var circle = mapImage.children.getIndex(0);
                if (mapImage.dataItem.value === 0) {
                  circle.hide(0);
                } else if (circle.isHidden || circle.isHiding) {
                  circle.show();
                }
              });
            });

            // this places bubbles at the visual center of a country
            imageTemplate.adapter.add("latitude", function(latitude, target) {
              var polygon = polygonSeries.getPolygonById(target.dataItem.id);
              if (polygon) {
                target.disabled = false;
                return polygon.visualLatitude;
              } else {
                target.disabled = true;
              }
              return latitude;
            });

            imageTemplate.adapter.add("longitude", function(longitude, target) {
              var polygon = polygonSeries.getPolygonById(target.dataItem.id);
              if (polygon) {
                target.disabled = false;
                return polygon.visualLongitude;
              } else {
                target.disabled = true;
              }
              return longitude;
            });


            function getCountryData(id) {
              if (id === "AW" || id === "BQ" || id === "CW") {
                return NaN;
              }

              return countries[countriesById[id]];
            }

          })
          .catch((err) => {
            console.error(err);
          });


      }
      fetchCountriesData();

    </script>
    
			<p>
				Go to the console and type the following:
			</p>
			<code>
				<pre>python -m pip install upgrade</pre>
				<pre>pip install virtualenv</pre>
				</code>
				this is a simple way to get information about the class you want to request,
				but if you have some experience handling object oriented programming you 
				could try to iterate over class attributes by using a loop and methods like <code><b>dir, getattr and callable</b></code><br><br>
				example:
				<code>
				when calling the first object in <b><code>cosmetics</code></b>
				<br>
				<br>
				Example:
			</p>
			<br>
			<br>
			<p>
			Commonly <b>cosmetics, banners, stats, shop items</b> returns a very large array of different objects, 
			an this will cost too much time consumption and memory resources, so what is highly recommended is 
			to use methods to search each of them by his name, and this is what our bot commands should be composed.
			<br>
			<br>
			first, after you define <b>iter_obj</b> declare a new variable called <b>languages</b>:
			So, getting back to the first defined command:
			</p>
			<br>
			<br>
			<p>example</p>
			<img src="/assets/img/animated.gif" alt="example animated" style="background-color:#000;"/>
			<br>
			<br>
			<p>
			There are no so much differences between the next methods because i'll have defined
			at least very closed to <b><code>cosmetics</code></b>, the following section to request
			is <b>Battle Royale player stats</b>, by using <code><b>fetch_by_name()</b></code>, to get information
			about player account.
			</p>
			<code>
				<pre>>>> player = api.stats.fetch_by_name('playername')
>>> raise NotFound(data.get('error', 'Error message not provided!'))
>>> fortnite_api.errors.NotFound: the requested account does not exist</pre>
			</code>
			<br>
			<p>
			    if the player name introduced does not exist it will raise an error
			</p>
			<br>
			<p>
			ok you guys at this point remember to introduce a correct player account because 
			you will have undesired results
			</p>
			<br>
			<br>
			<p>
			output
			</p>
			<img src="/assets/img/stats.jpeg" alt="top player stats"/>
			<br>
			<br>
			<br>
			<br>
			<h5>Coming soon ;)</h5>
			<ul>
				<li>Shop features</li>
				<li>Banners</li>
				<li>AES Keys</li>
				<li>and more...</li>
			</ul>
			<p> entire code could be found at <a href="https://github.com/dlprisco/discord-bot/tree/main/fortnite">github-repo</a></p>
			<br>
			<br>
			<br>
			<br>
		</details>
	</li>
	<br>
	<br>
	<li>
		<details>
			<summary>
				<a href="#Currency Data Management"></a><h3 style="display:inline;" name="Currency Data Management">Currency Data Management (Feb 5, 2023)</h3>
			</summary>
			<p>
				Video about displaying currency price data in a discord chat by using <b><code>discord</code></b> and <b><code>coinmarketcap-api</code></b> where i think the main focused content is how the data is
				procesed by using <b><code>request</code></b> to get a <code>json</code> formated string to be displayed on any chat by using a determined bot command, i mean the video could be resume to 
				a couple of code statements like:
			</p>
			<p>
				and once we have a well formated string, send as a message
			</p>
			<code>
				<pre>@bot.command(name='bot')
async def _bot(ctx):
    """Is the bot cool?"""
    await ctx.send('Yes, the bot is cool.')
				</pre>
			</code>
			<p>for more information, please check the <a href="https://github.com/dlprisco/discord-bot/blob/main/bot/main.py">repository</a> that i have made some coding bot practices and watch the <a href="https://www.youtube.com/embed/lcVAy7zAubg">video tutorial</a>.</p>
		</details>
	</li>
	<br>
	<br>
	<br>
	<li>
		<details>
			<summary>
				<a href="#Client Setup"></a><h3 style="display:inline;" name="Client Setup">Client Setup and Message Handling (Jan 20, 2023)</h3>
			</summary>
			<p>Basic Discord bot</p>
			<p>
			</p>
		</details>
	</li>
</ul>
</body>
</html>

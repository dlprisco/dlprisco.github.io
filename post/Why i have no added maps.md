<html>
  <head>
    <title> Why I have no add more maps or information on maps</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>

<body>
 <p>Why I have no add map corrections to view the covid-19 information is because Venezuela map is stored in <code>/assets/js/map_features.json</code>and the polygons and other features of a valid map in the country.</p>	
	    	<h2>Guyana Esequibo</h2>
			<p>
				This is the map that is missing in the other file.
			</p>
    <div class="container-xl text-secondary bg-dark border border-secondary">
      <h2>Confirmed Cases (country)</h2>
      <div id="mapchart" style="width:450px;height:450px;"></div>
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
              "https://www.amcharts.com/lib/4/geodata/json/guyanaHigh.json";
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
		   
</body>
</html>

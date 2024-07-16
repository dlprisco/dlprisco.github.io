<html>
  <head>
    <title# Why I have no add more maps or information on maps</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>

<body>
<br />
<br />
 <p>Why I have no add map corrections to view the covid-19 information is because Venezuela map is stored in <code>/assets/js/map_features.json</code>and the polygons and other features of a valid map in the country.</p>	
	    	<h2>Guyana Esequibo</h2>
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
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
		   
</body>
</html>

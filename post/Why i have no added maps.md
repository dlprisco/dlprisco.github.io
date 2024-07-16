<html>
  <head>
    <title> Why I have no add more maps or information on maps</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
    <p>Why I have no add map corrections to view the covid-19 information is because Venezuela map is stored in <code>/assets/js/map_features.json</code>and the polygons and other features of a valid map in the country.</p>
    <h2>missing map</h2>
    <p>
      This is the missing state on the map where the covid-19 data is shown, without many details since it only highlights the name of the capital of its states.
    </p>
    <div class="container-xl text-secondary bg-dark border border-secondary">
      <h2>Guyana Esequibo</h2>
      <div id="mapchart" style="width:450px;height:450px;"></div>
    </div>
    <h2>How to comnine two maps into one</h2>
    <p>A map is just a <code>JSON</code> file that contains coordinate and points to draw a map.</p>
    <p>First, in the main map file we add the second map.</p>
    <pre><code>map = {
  map1: {[

  ]},
  map2: {[
  
  ]}
}
</code></pre>
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
      var x = am4core.create("mapchart", am4maps.MapChart);

      // Set map definition
      x.geodataSource.url = "/assets/js/missingMap.json";

      x.geodataSource.events.on("parseended", function(ev) {
              var data = [];
              for (var i = 0; i < ev.target.data.features.length; i++) {
                data.push({
                  id: ev.target.data.features[i].id,
                  value: getCountryData(ev.target.data.features[i].id)
                });
              }
            });

            x.projection = new am4maps.projections.Mercator();
            function getCountryData(id) {
              if (id === "AW" || id === "BQ" || id === "CW") {
                return NaN;
             }
               return countriesById[id];
            }
    </script>
    <script>
      document.getElementById("myButton").addEventListener("click", function() {
        alert('Button was clicked!');
      });
    </script>
  </body>
</html>

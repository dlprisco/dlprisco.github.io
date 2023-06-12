const nameInput = document.querySelector("input");
/* const APIID = ${{ process.env.token }}; */
var data = {}
var lon = undefined;
var lat = undefined;
var current = {};

function search_country() {
    const city_name = document.querySelector("input").value;
	
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=5a706f4605511ea6ad2c06c7a71d60e2`)
	.then(function (response) {
		data = response.data[0];
		document.getElementById("main").innerHTML = '';
		
		let t = document.createElement('h2');
		t.innerHTML = 'Location'
		document.getElementById("main").appendChild(t)
		//search_results.appendChild()
		for (const key in data) {
			console.log(key)
		
			if (key === 'local_names') {
				names = data[key];
			}
			else {
				let t = document.createElement('p');
				t.innerHTML = `${key}: ${data[key]}`;
				document.getElementById("main").appendChild(t);		
			}
		}
		
		lat = data['lat'];
		lon = data['lon'];
		
		document.getElementById("main").appendChild(document.createElement("hr"));
		document.getElementById("main").appendChild(document.createElement("br"));
		document.getElementById("main").appendChild(document.createElement("br"));
		
		current_weather();
	})
	.catch(function (error) {
		// handle error
		console.log(error);
	})	
}

function current_weather() {
    let t = document.createElement('h2');
    t.innerHTML = 'Current Weather'
    document.getElementById("main").appendChild(t)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a706f4605511ea6ad2c06c7a71d60e2&units=metric`)
	.then(function (response) {
		current = response.data;
		for (const key in current) {
			if (key === 'weather') {	
				let n_l = document.createElement('ul')
				let t = document.createElement('p');
				t.innerHTML = `${key}`;
				document.getElementById("main").appendChild(t);	
				
				for (const nested_key in current[key][0]) {
					let n_li = document.createElement("li");
					n_li.innerHTML = `${nested_key}: ${current[key][0][nested_key]}`;
					n_l.appendChild(n_li);
				}
				let n_li = document.createElement("div")
				n_li.innerHTML = `<img src="https://openweathermap.org/img/wn/${current[key][0]["icon"]}@2x.png" alt="Weather Icon"/>`;
				document.getElementById("main").appendChild(n_li);
				document.getElementById("main").appendChild(n_l);
			}
			
			else if (typeof(current[key]) === 'object') {
				let n_l = document.createElement('ul')
				let t = document.createElement('p');
				t.innerHTML = `${key}`;
				document.getElementById("main").appendChild(t);
				for (const nested_key in current[key]) {
					let n_li = document.createElement("li")
					n_li.innerHTML = `${nested_key} ${current[key][nested_key]}`
					n_l.appendChild(n_li)
				}
				document.getElementById("main").appendChild(n_l);
			}
			else {		
				let t = document.createElement('p');
				t.innerHTML = `${key}: ${current[key]}`;
				document.getElementById("main").appendChild(t);	
			}
		}
		let t = document.createElement('p');
		t.innerHTML = `${new Date(current['dt']*1000)}`;
		document.getElementById("main").appendChild(t);
		
		document.getElementById("main").appendChild(document.createElement("hr"));
		document.getElementById("main").appendChild(document.createElement("br"));
		document.getElementById("main").appendChild(document.createElement("br"));
	})
	.catch(function (error) {
		// handle error
		console.log(error);
	})	
  }

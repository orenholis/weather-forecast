class Forecast extends Sword {
	loadForecast(weather) {
		this.forecastBoxes.innerHTML = '';
		const temperatures = [];
		const days = [];

		const forecast = this.createElement({
			className: 'forecast-table',
			children: weather.daily.map(d => {
				// Multiplied with 1000 because of unix format is in seconds
				const date = new Date(d.dt * 1000);
				const language = navigator.language || navigator.userLanguage;
				const dateFormatted = date.toLocaleDateString(language,  {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour12: false
				})
				const weekDay = date.toLocaleDateString(language,  {weekday: 'long'})
				temperatures.push(d.temp.day)
				days.push(weekDay);

				return {
					className: 'day-forecast',
					children: [{
						textContent: dateFormatted,
						className: 'date'
					},{
						textContent: weekDay,
						className: 'week-day'
					},{
						className: 'temperature',
						textContent: 'Day: ' + d.temp.day + ' °C',
					},{
						className: 'temperature',
						textContent: 'Night: ' + d.temp.night + ' °C',
					}]
				}
			})
		})

		new Chart("forecastGraph", {
			type: "bar",
			data: {
				labels: days,
				datasets: [{
					data: temperatures
				}]
			},
			options: {
				legend: {display: false},
				title: {
					display: true,
					text: "Temperature forecast for next week"
				}
			}
		});

		this.forecastBoxes.appendChild(forecast);
	}

	render() {
		this.el = this.createElement({
			className: 'forecast',
			children: [{
				ref: 'forecastBoxes'
			},{
				children: [{
					id: 'forecastGraph',
					nodeName: 'canvas'
				}]
			}]
		}, this)
	}
}

class CityPicker extends Sword {
	beforeRender() {
		this.cities = new Map();
	}

	render() {
		this.el = this.createElement({
			className: 'city-picker',
			children: [{
				ref: 'citySearch',
				disabled: true,
				nodeName: 'input',
				placeholder: 'List of cities is being loaded...',
				'on:input': e => {
					this.cityList.innerHTML = '';
					this.cityList.className = 'city-list';
					let citiesFiltered = [];

					const inputTextClean = replaceSpecialLetters(e.target.value);

					for (const [k, v] of this.cities) {
						if (citiesFiltered.length === 15) {
							break;
						}

						if (k.startsWith(inputTextClean)) {
							citiesFiltered.push(v)
						}
					}

					for (const city of citiesFiltered) {
						const cityEl = this.createElement({
							textContent: city.name,
							'on:click': () => {
								e.target.value = city.name;
								this.hideWhisperer();
								this.fire('city', city)
							}
						})

						this.cityList.appendChild(cityEl);
					}
				}
			},{
				ref: 'cityList',
				className: 'city-list invisible'
			}]
		}, this);

		readTextFile("city.list.json", (json) => {
			const myWorker = new Worker("scripts/worker.js");
			myWorker.postMessage({
				json,
				replaceSpecialLetters: JSON.stringify(replaceSpecialLetters, (k, v) => {
					return v.toString()
				})
			});

			myWorker.onmessage = function(e) {
				this.cities = e.data;
				this.citySearch.setAttribute('placeholder', 'Enter city name');
				this.citySearch.removeAttribute('disabled');
			}.bind(this);
		});
	}

	hideWhisperer() {
		this.cityList.className = 'invisible';
		this.cityList.innerHTML = '';
	}
}

class App extends Sword {
	API_KEY = '';

	async loadForecast(city) {
		const data = await fetch(`https://api.openweathermap.org/data/2.5/
			onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=${city.part}&units=metric&appid=${this.API_KEY}`)
		const weather = await data.json()

		this.weatherShow.loadForecast(weather);
	}

	render() {
		this.el = this.createElement({
			className: 'app',
			'on:click': () => this.cityPicker.hideWhisperer(),
			children: [{
				nodeName: 'h1',
				textContent: 'Weather forecast'
			},{
				class: CityPicker,
				'on:city': (obj, city) => this.loadForecast(city),
				ref: 'cityPicker'
			},{
				class: Forecast,
				ref: 'weatherShow'
			}]
		}, this)
	}
}

new App(document.body);
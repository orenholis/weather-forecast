class Forecast extends Sword {
	loadForecast(weather) {
		this.el.innerHTML = '';

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

		this.el.appendChild(forecast);
	}

	render() {
		this.el = this.createElement({
			className: 'forecast'
		})
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
				nodeName: 'input',
				placeholder: 'Enter city name',
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

		readTextFile("city.list.json", (text) => {
			const data = JSON.parse(text);

			for (const city of data) {
				this.cities.set(replaceSpecialLetters(city.name), city);
			}
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
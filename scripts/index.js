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
							'on:click': () => this.fire('city', city)
						})

						this.cityList.appendChild(cityEl);
					}
				}
			},{
				ref: 'cityList'
			}]
		}, this);

		readTextFile("city.list.json", (text) => {
			const data = JSON.parse(text);

			for (const city of data) {
				this.cities.set(replaceSpecialLetters(city.name), city);
			}
		});
	}
}

class App extends Sword {
	render() {
		this.el = this.createElement({
			className: 'app',
			children: [{
				nodeName: 'h1',
				textContent: 'Weather forecast'
			},{
				class: CityPicker
			}]
		}, this)
	}
}

new App(document.body);
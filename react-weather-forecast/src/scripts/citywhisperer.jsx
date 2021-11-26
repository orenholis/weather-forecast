import React from "react";
import {readTextFile, replaceSpecialLetters} from "./utils";

export default class CityPicker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cities: [],
			citiesLoaded: new Map(),
			city: ''
		}

		this.filter = this.filterCities.bind(this);
		this.retrieveJSON();
	}

	filterCities(e) {
		let citiesFiltered = [];

		const inputTextClean = replaceSpecialLetters(e.target.value);

		for (const [k, v] of this.state.citiesLoaded) {
			if (citiesFiltered.length === 15) {
				break;
			}

			if (k.startsWith(inputTextClean)) {
				citiesFiltered.push(v)
			}
		}

		this.setState({
			cities: citiesFiltered,
			city: e.target.value
		})
	}

	retrieveJSON() {
		readTextFile("city.list.json", (json) => {
			const myWorker = new Worker("./workers/worker.js");

			myWorker.postMessage({
				json,
				replaceSpecialLetters: JSON.stringify(replaceSpecialLetters, (k, v) => {
					return v.toString().replaceAll('\n', '')
				})
			});

			myWorker.onmessage = function(e) {
				this.setState({citiesLoaded: e.data});
			}.bind(this);
		});
	}

	selectCity(city) {
		this.props.cb(city);
		this.setState({city: city.name});
		this.setState({cities: []})
	}

	render() {
		return (
			<div className={'city-picker'}>
				<input
					disabled={this.state.citiesLoaded.size === 0}
					placeholder={this.state.citiesLoaded.size === 0 ? 'List of cities is being loaded...' : 'Enter city name'}
					onChange={this.filter}
					value={this.state.city}
				/>
				{
					this.state.cities.length > 0 &&
					<div className={'city-list'}>
						{
							this.state.cities.map((c, i) => {
								return (
									<div key={i} onClick={() => this.selectCity(c)}>{c.name}</div>
								)
							})
						}
					</div>
				}
			</div>
		)
	}
}
import React from 'react';
import ReactDOM from 'react-dom';
import CityPicker from "./scripts/citywhisperer";
import './styles/index.css';

class ReactApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forecast: null,
			api_key: 'your api key'
		}

		this.loadForecast = this.handleForecastLoad.bind(this);
	}

	async handleForecastLoad(city) {
		this.setState({forecast: null})
		const data = await fetch(`https://api.openweathermap.org/data/2.5/
			onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=${city.part}&units=metric&appid=${this.state.api_key}`)
		const forecast = await data.json()

		this.setState({forecast})
	}

	render() {
		return(
			<div>
				<CityPicker cb={this.loadForecast}/>
			</div>
		)
	}
}

ReactDOM.render(
	<ReactApp/>,
	document.getElementById("root")
);
import React from 'react';
import ReactDOM from 'react-dom';
import Forecast from "./scripts/forecast";
import CityPicker from "./scripts/citywhisperer";
import './styles/index.css';

class ReactApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forecast: null,
			api_key: 'Your api key',
			wrongApiKey: false
		}

		this.loadForecast = this.handleForecastLoad.bind(this);
	}

	async handleForecastLoad(city) {
		this.setState({forecast: null})
		const data = await fetch(`https://api.openweathermap.org/data/2.5/
			onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=${city.part}&units=metric&appid=${this.state.api_key}`)
		const forecast = await data.json()

		if (!!forecast.cod) {
			this.setState({wrongApiKey: true})
			return;
		}

		this.setState({forecast})
	}

	render() {
		return(
			<div className={'app'}>
				<h1>React weather forecast</h1>
				<CityPicker cb={this.loadForecast}/>
				{
					!!this.state.forecast &&
						<Forecast forecast={this.state.forecast}/>
				}
				{
					!!this.state.wrongApiKey &&
						<h1 className={'wrong-api-key'}>Your api key is wrong</h1>
				}
			</div>
		)
	}
}

ReactDOM.render(
	<ReactApp/>,
	document.getElementById("root")
);
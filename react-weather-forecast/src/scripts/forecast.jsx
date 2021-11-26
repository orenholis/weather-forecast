import React from 'react';
import {Bar} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default class Forecast extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forecast: props.forecast,
			graphData: null
		}
	}

	loadForecastTable() {
		return this.state.forecast.daily.map((d, i) => {
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

			return (
				<div key={i} className={'day-forecast'}>
					<div className={'date'}>{dateFormatted}</div>
					<div className={'week-day'}>{weekDay}</div>
					<div className={'temperature'}>{'Day: ' + d.temp.day + ' °C'}</div>
					<div className={'temperature'}>{'Night: ' + d.temp.night + ' °C'}</div>
				</div>
			)
		})
	}

	loadForecastGraph() {
		const days = [];
		const temperatures = [];

		for (const d of this.state.forecast.daily) {
			const language = navigator.language || navigator.userLanguage;
			const weekDay = new Date(d.dt * 1000).toLocaleDateString(language,  {weekday: 'long'})

			temperatures.push(d.temp.day)
			days.push(weekDay);
		}

		return (
			<div>
				<Bar
					data={{
						labels: days,
						datasets: [{
							data: temperatures
						}]
					}}

					options={{
						title:{
							display:true,
							text:'Temperature forecast for next week',
							fontSize:20
						},
						legend:{
							display:true,
							position:'right'
						}
					}}
				/>
			</div>
		)
	}

	render() {
		return (
			<div className={'forecast'}>
				<div className={'forecast-table'}>
					{
						this.loadForecastTable()
					}
				</div>
				{
					this.loadForecastGraph()
				}
			</div>
		)
	}
}
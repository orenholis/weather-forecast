import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

class ReactApp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				React app
			</div>
		)
	}
}

ReactDOM.render(
	<ReactApp/>,
	document.getElementById("root")
);
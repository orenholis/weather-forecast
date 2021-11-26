onmessage = function(e) {
	const parsedJSON = JSON.parse(e.data.json);
	let cities = new Map();
	const replaceSpecialLetters = JSON.parse(e.data.replaceSpecialLetters,function(k, v){
		return eval(`(${v})`);
	});

	for (const city of parsedJSON) {
		cities.set(replaceSpecialLetters(city.name), city);
	}

	postMessage(cities);
}

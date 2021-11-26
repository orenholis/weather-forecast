export function readTextFile(file, callback) {
	const rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

export function replaceSpecialLetters(word) {
	const letters = {
		'A': '[AaáÁàâãäåæ]',
		'B': '[Bb]',
		'C': '[CcčČç]',
		'D': '[DdĎď]',
		'E': '[EeéÉěĚèêë]',
		'F': '[Ff]',
		'G': '[Gg]',
		'H': '[Hh]',
		'I': '[IiíÍìîï]',
		'J': '[Jj]',
		'K': '[Kk]',
		'L': '[Ll]',
		'M': '[Mm]',
		'N': '[NnňŇñ]',
		'O': '[OoóÓòôöõø]',
		'P': '[Pp]',
		'Q': '[Qq]',
		'R': '[RrŘř]',
		'S': '[SsŠš]',
		'T': '[TtŤť]',
		'U': '[UuÚúůŮüÜùû]',
		'V': '[Vv]',
		'W': '[Ww]',
		'X': '[Xx]',
		'Y': '[YyýÝÿ]',
		'Z': '[ZzŽž]'
	};

	const charArr = word.split("");

	for (let i = 0; i < charArr.length; i++) {
		for (const [k, v] of Object.entries(letters)) {
			if (v.includes(charArr[i])) {
				charArr[i] = k;
			}
		}
	}

	return charArr.join("").toLowerCase();
}
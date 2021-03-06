function throwError(msg) {
	throw msg;
}
function internalError(msg) {
	Swal.fire({
		icon: 'error',
		title: 'Error: ' + msg,
		showConfirmButton: false,
		timer: 3000
	})
	console.log('Error:', msg);
}
function debug(msg) {
	if (debuging) {
		console.log(msg);
	}
}
function say(environment, msg) {
	console.log(SayText + msg);
}
function sign(num) {
	if (num > 0) {
		return 1;
	}else if (num < 0) {
		return -1;
	}else {
		return 0;
	}
}
function WordToNum(word) {
	if (word.indexOf('-') != -1) {
		word = '-' + word.replace('-', '');
	}
	return Number(word);
}
function preAddress(currentAddress, command) {
	if (f0Commands.hasOwnProperty(command) || f1Commands.hasOwnProperty(command)) {
		if (f0Commands.hasOwnProperty(command)) {
			return currentAddress-1;
		}else {
			return currentAddress-3;
		}
	}else {
		return currentAddress;
	}
}
function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}
function download(data) {
	Swal.fire({
		html: `<input type="text" class="file-name" value="${chromeTabs.activeTabEl.querySelector('.chrome-tab-title').textContent}">
		<span style="font-family: system-ui;font-weight: bold;margin: -8px;">.</span>
		<select class="type-selector">
			<option selected="selected">miku</option>
			<option>mik</option>
			<option>mis</option>
			<option>txt</option>
	    </select>`,
		confirmButtonText: 'Экспортировать'
	}).then((result) => {
		if (result.isConfirmed) {
			let type = $('.type-selector').val();
			let filename = $('.file-name').val() + '.' + type;
			console.log(filename);
			switch (type) {
				case 'miku':
					data = data.toString().replaceAll(',', '');
					break;
				case 'mik':
					data = data.toString().replaceAll(',', '');
					break;
				case 'mis':
					data = data.toString().replaceAll(',', '');
					break;
				case 'txt':
					data = data.toString().replaceAll(',', '');
					break;
				default:
			}
		    let file = new Blob([data.toString().replaceAll(',', '')]);
		    if (window.navigator.msSaveOrOpenBlob)
		        window.navigator.msSaveOrOpenBlob(file, filename);
		    else {
		        var a = document.createElement("a"),
		                url = URL.createObjectURL(file);
		        a.href = url;
		        a.download = filename;
		        document.body.appendChild(a);
		        a.click();
		        setTimeout(function() {
		            document.body.removeChild(a);
		            window.URL.revokeObjectURL(url);
		        }, 0);
		    }
		}
	});
}

function open(memory) {
	Swal.fire({
		input: 'file',
		confirmButtonText: 'Импортировать'
	}).then((result) => {
		if (result.isConfirmed) {
			let reader = new FileReader();
			reader.readAsText(result.value);

			reader.onload = function() {
				debug(reader.result);
				let typeOfFile = result.value.name.substring(result.value.name.lastIndexOf('.')+1);
				if (typeOfFile === 'miku') {
					// TODO
				}else if(typeOfFile === 'json'){
					reader.result = JSON.parse(reader.result);
					for (var i = 0; i < reader.result.length; i++) {
						memory.write(i, reader.result[i], false);
					}
				}else {
					for (var i = 0; i < reader.result.length; i+=2) {
						if (reader.result.substring(i, i+2) != memory.line[i/2]) {
							memory.write(i/2, reader.result.substring(i, i+2), false);
						}
					}
				}
			};
			reader.onerror = function() {
				console.log(reader.error);
			};
		}
	});
}

// import * from '../lib';

class RASM {
	constructor(version) {
		if (/%d%.%d+%.%d+/.test(version)) {
			this.version = version;
		} else {
			this.version = "0.0.1"
		}
	}

	async convert(lang, rasm_str) {
		let commands = rasm_str.split(";");
		let source = "";

		let currentIndex = 0;
		let currentToken = commands[currentIndex];

		let advance = () => {
			currentIndex++;
			currentToken = commands[currentIndex];
		}

		while (currentToken) {
			// let passOn = false;

			// if (currentToken.endsWith("+")) {
			// 	passOn = true;
			// 	currentToken = currentToken.slice(currentToken.length - 1, currentToken.length);
			// }

			currentToken = currentToken.trim();

			if (/\x00/.test(currentToken)) { advance(); continue; }

			let command = null;
			let args = [];

			if (currentToken.split(" ").length > 1) {
				let split = currentToken.split(" ");
				command = split[0];
				split.shift();
				args = split;
			} else if (currentToken.split(" ").length == 1) {
				command = currentToken;
			}

			try {
				const { default: foundCommand } = await import(`../lib/${lang.toUpperCase()}_${command.toUpperCase()}.js`);
				source += foundCommand(args);
				source += "\n";
			} catch (e) {
				console.error(e);
				console.log("Error: Command not found\n");
			} finally {
				advance();
			}
		}

		return source;
	}

	async js(rasm_str) {
		return this.convert('js', rasm_str);
	}

	async lua(rasm_str) {
		return this.convert('lua', rasm_str);
	}
}

export default RASM;
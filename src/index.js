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
				let split = currentToken.match(/\w+|"[^"]+"/g);
				command = split[0];
				split.shift();
				args = split;
			} else if (currentToken.split(" ").length == 1) {
				command = currentToken;
			}

			try {
				const { default: foundCommand } = await import(`./converters/${lang.toUpperCase()}_${command.toUpperCase()}.js`);
				let finalizedCommand = foundCommand(args);
				source += finalizedCommand ? finalizedCommand + "\n" : "";
			} catch (e) {
				// console.error(e);
				if (command.trim().length == 0) { return; }
				console.log(`ERROR: Command ${command.toUpperCase()} not found\n`);
			} finally {
				advance();
			}
		}

		return source;
	}

	async js(rasm_str) {
		return this.convert('js', rasm_str);
	}

	async luau(rasm_str) {
		return this.convert('luau', rasm_str);
	}
}

export default RASM;
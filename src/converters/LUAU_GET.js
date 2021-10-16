export default function GET(args) {
	let str = "";
	if (args.length > 1) {
		str += args.shift();
		if (args[0] == "AS" && args[1]) {
			args.shift();
			str = `local ${args[0]} = ` + str.replace(/"([^"]+(?="))"/g, '$1');
		}
	} else {
		return null;
	}

	return str;
}
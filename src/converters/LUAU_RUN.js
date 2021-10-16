export default function RUN(args) {
	let str = "game:GetService(\"";
	if (args[0] && args[1]) {
		str += args.shift();
		str += "\"):";
		str += args.shift();
		str += "(";
		for (var i = 0; i < args.length; i++) {
			str += args[i];
			if (i + 1 !== args.length) {
				str += ", ";
			}
		}
		str += ")";
	} else {
		return null;
	}

	return str;
}
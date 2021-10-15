export default function PRINT(args) {
	let str = "error(";
	for (var i = 0; i < args.length; i++) {
		str += args[i];
		if (i + 1 !== args.length) {
			str += ", ";
		}
	}
	return str + ")";
}
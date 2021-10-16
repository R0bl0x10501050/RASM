export default function SET(args) {
	let str = "local ";
	if (args[0]) {
		str += args[0];
		str += " = ";
		if (args[1]) {
			str += args[1];
		} else {
			str += "nil";
		}
	} else {
		return null;
	}
	return str;
}
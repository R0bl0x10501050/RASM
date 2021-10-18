export default function UPDATE(args) {
	let str = "";
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
export default function WAIT(args) {
	let str = "wait(";
	if (args[0]) {
		str += args[0];
		str += ")";
	} else {
		return null;
	}

	return str;
}
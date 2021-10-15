export default function KICK(args) {
	let str = "do\nlocal AUTO_VARIABLE_PLAYER = game.Players:FindFirstChild(";
	if (args[0]) {
		str += args[0];
		str += ")\n";
		if (args[1]) {
			str += `AUTO_VARIABLE_PLAYER:Kick(${args[1]})\nend`
		} else {
			str += `AUTO_VARIABLE_PLAYER:Kick()\nend`
		}
	} else {
		return null;
	}

	return str;
}
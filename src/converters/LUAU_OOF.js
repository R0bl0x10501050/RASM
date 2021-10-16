export default function OOF(args) {
	let str = "do\nlocal AUTO_VARIABLE_PLAYER = game.Players:FindFirstChild(";
	if (args[0]) {
		str += args[0];
		str += ")\n";
		str += `AUTO_VARIABLE_PLAYER.Character.Humanoid:TakeDamage(math.huge)\nend`;
	} else {
		return null;
	}

	return str;
}
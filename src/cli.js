#! /usr/bin/env node
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as path from 'path';
import * as fs from 'fs';
import RASM from './index.js';

let options = yargs(hideBin(process.argv))
	.command('$0', 'Command to run by default', (yargs_param) => {
		return yargs_param
			.option('l', {
				alias: 'live',
				describe: 'Output live',
				type: 'boolean'
			})
			.option('o', {
				alias: 'out',
				describe: 'Output file path',
				type: 'string'
			})
			.option('r', {
				alias: 'rojo',
				describe: 'Output as rojo file',
				type: 'boolean'
			})
		;
	}, async (argv) => {
		const input = fs.readFileSync(path.join(process.cwd(), argv._[0])).toString();
		let LUAU_RASM = new RASM();
		let res = await LUAU_RASM.luau(input);
		fs.writeFileSync(path.join(process.cwd(), argv.o || argv._[1] || "./" + /[ \w-]+?(?=\.)/g.exec(argv._[0])[0] + (argv.r && ".server.lua" || ".lua")), res || "-- RASM ERROR: Convert failure");
		if (argv.l) {
			console.log(chalk.keyword('green')("🎇 RASM Live Converter - live!"));
			console.log(chalk.keyword('white')("It is recommended that you open a new Terminal window for other needs."));
			let oldCode;
			setInterval(async function () {
				let newCode = fs.readFileSync(path.join(process.cwd(), argv._[0])).toString();
				if (newCode !== oldCode) {
					let res = await LUAU_RASM.luau(newCode);
					fs.writeFileSync(path.join(process.cwd(), argv.o || argv._[1] || "./" + /[ \w-]+?(?=\.)/g.exec(argv._[0])[0] + (argv.r && ".server.lua" || ".lua")), res || "-- RASM ERROR: Convert failure");
					oldCode = newCode;
				}
			}, 500);
		}
	})
	.help(true)
	.usage(chalk.keyword('violet')("\nUsage: rasm FILENAME.rasm [-o OUTPUTPATH] [-r]"))
	.version(true)
	.parse()
;
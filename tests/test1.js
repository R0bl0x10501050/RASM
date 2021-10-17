import RASM from '../src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const str = fs.readFileSync(path.join(__dirname, './testing.rasm')).toString();

let JS_RASM = new RASM();

console.log(await JS_RASM.luau(str));
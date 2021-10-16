import RASM from '../src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const str = fs.readFileSync(path.join(__dirname, './oof.rasm')).toString();

let JS_RASM = new RASM();

console.log(await JS_RASM.luau(str))